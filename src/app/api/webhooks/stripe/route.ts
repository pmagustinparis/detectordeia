import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

// Inicializar Stripe
function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-10-29.clover',
  });
}

// Inicializar Supabase con service role (para bypasear RLS)
function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function POST(request: Request) {
  const stripe = getStripe();
  const supabase = getSupabaseAdmin();

  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature provided' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    // Verificar firma del webhook
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  // Manejar diferentes tipos de eventos
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(session, supabase);
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdated(subscription, supabase);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(subscription, supabase);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        await handlePaymentFailed(invoice, supabase);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

// Manejar checkout completado (primera suscripción)
async function handleCheckoutCompleted(
  session: Stripe.Checkout.Session,
  supabase: ReturnType<typeof getSupabaseAdmin>
) {
  const userId = session.metadata?.supabase_user_id;
  const planInterval = session.metadata?.plan_interval;

  if (!userId) {
    console.error('No user_id in checkout session metadata');
    return;
  }

  // Obtener la suscripción de Stripe
  const subscriptionId = session.subscription as string;
  const stripe = getStripe();
  const subscription: any = await stripe.subscriptions.retrieve(subscriptionId, {
    expand: ['items.data.price'],
  });

  // Crear registro de suscripción en Supabase
  const { error: subscriptionError } = await supabase
    .from('subscriptions')
    .upsert({
      user_id: userId,
      stripe_customer_id: session.customer as string,
      stripe_subscription_id: subscriptionId,
      stripe_price_id: subscription.items.data[0].price.id,
      plan_interval: planInterval,
      status: subscription.status,
      current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      cancel_at_period_end: subscription.cancel_at_period_end,
    });

  if (subscriptionError) {
    console.error('Error creating subscription:', subscriptionError);
    throw subscriptionError;
  }

  // Actualizar plan del usuario a premium
  const { error: userError } = await supabase
    .from('users')
    .update({ plan_type: 'premium' })
    .eq('id', userId);

  if (userError) {
    console.error('Error updating user plan:', userError);
    throw userError;
  }

  console.log(`✅ User ${userId} upgraded to premium (${planInterval})`);
}

// Manejar actualización de suscripción
async function handleSubscriptionUpdated(
  subscription: Stripe.Subscription,
  supabase: ReturnType<typeof getSupabaseAdmin>
) {
  const { error } = await supabase
    .from('subscriptions')
    .update({
      status: subscription.status,
      current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      cancel_at_period_end: subscription.cancel_at_period_end,
    })
    .eq('stripe_subscription_id', subscription.id);

  if (error) {
    console.error('Error updating subscription:', error);
    throw error;
  }

  console.log(`✅ Subscription ${subscription.id} updated`);
}

// Manejar cancelación de suscripción
async function handleSubscriptionDeleted(
  subscription: Stripe.Subscription,
  supabase: ReturnType<typeof getSupabaseAdmin>
) {
  // Obtener el user_id desde la suscripción
  const { data: subscriptionData } = await supabase
    .from('subscriptions')
    .select('user_id')
    .eq('stripe_subscription_id', subscription.id)
    .single();

  if (!subscriptionData) {
    console.error('Subscription not found in database');
    return;
  }

  // Actualizar status de la suscripción
  await supabase
    .from('subscriptions')
    .update({ status: 'canceled' })
    .eq('stripe_subscription_id', subscription.id);

  // Downgrade usuario a free
  await supabase
    .from('users')
    .update({ plan_type: 'free' })
    .eq('id', subscriptionData.user_id);

  console.log(`✅ User ${subscriptionData.user_id} downgraded to free`);
}

// Manejar fallo de pago
async function handlePaymentFailed(
  invoice: Stripe.Invoice,
  supabase: ReturnType<typeof getSupabaseAdmin>
) {
  const subscriptionId = invoice.subscription as string;

  // Marcar suscripción como past_due
  await supabase
    .from('subscriptions')
    .update({ status: 'past_due' })
    .eq('stripe_subscription_id', subscriptionId);

  console.log(`⚠️ Payment failed for subscription ${subscriptionId}`);
}
