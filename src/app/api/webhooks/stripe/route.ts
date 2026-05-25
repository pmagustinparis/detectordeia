import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

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
  console.log('🔔 Webhook received:', request.method, request.url);
  console.log('🔔 Headers:', JSON.stringify({
    'stripe-signature': request.headers.get('stripe-signature') ? 'present' : 'missing',
    'content-type': request.headers.get('content-type'),
    'user-agent': request.headers.get('user-agent'),
  }));

  const stripe = getStripe();
  const supabase = getSupabaseAdmin();

  let body: string;
  try {
    body = await request.text();
    console.log('🔔 Body length:', body.length);
  } catch (err: any) {
    console.error('❌ Error reading request body:', err);
    return NextResponse.json({ error: 'Could not read body' }, { status: 400 });
  }

  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    console.error('❌ No stripe-signature header');
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
    console.log('✅ Signature verified. Event type:', event.type);
  } catch (err: any) {
    console.error('❌ Webhook signature verification failed:', err.message);
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

// Manejar checkout completado (suscripción o pago único Express)
async function handleCheckoutCompleted(
  session: Stripe.Checkout.Session,
  supabase: ReturnType<typeof getSupabaseAdmin>
) {
  console.log('🔔 Processing checkout.session.completed:', {
    session_id: session.id,
    customer: session.customer,
    mode: session.mode,
    metadata: session.metadata,
  });

  let userId = session.metadata?.supabase_user_id;
  const planType = session.metadata?.plan_type;
  const isGuest = session.metadata?.guest_checkout === 'true';

  // Guest checkout: encontrar o crear el usuario a partir del email de Stripe
  if (isGuest || !userId) {
    const email = session.customer_details?.email;
    if (!email) {
      console.error('No email in guest checkout session');
      return;
    }

    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      userId = existingUser.id;
      console.log(`♻️ Guest checkout: found existing user ${userId} for ${email}`);
    } else {
      // Crear cuenta via invitación — Supabase envía el email automáticamente
      const { data: inviteData, error: inviteError } = await supabase.auth.admin.inviteUserByEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`,
      });
      if (inviteError || !inviteData?.user) {
        console.error('❌ Error inviting guest user:', inviteError);
        return;
      }
      const { error: insertError } = await supabase.from('users').insert({
        auth_id: inviteData.user.id,
        email,
        plan_type: 'free',
      });
      if (insertError) {
        console.error('❌ Error inserting guest user:', insertError);
        return;
      }
      const { data: newUser } = await supabase.from('users').select('id').eq('auth_id', inviteData.user.id).single();
      userId = newUser?.id;
      console.log(`✨ Guest checkout: created user ${userId} for ${email}`);
    }

    if (!userId) {
      console.error('❌ Could not resolve userId for guest checkout');
      return;
    }
  }

  // CASO 1: Pago único Express (24h, 7 días) o Semestral (6 meses)
  if (planType === 'express' || planType === 'express_semanal' || planType === 'semestral' || session.mode === 'payment') {
    console.log('🚀 Processing Express checkout:', {
      plan_type: planType,
      user_id: userId,
      session_id: session.id,
    });

    // Validación
    if (!userId) {
      console.error('❌ Missing user_id in Express checkout');
      throw new Error('Missing user_id');
    }

    // Determinar duración según tipo
    const hours = planType === 'semestral' ? 4380  // 6 meses = 183 días = 4380 horas
      : planType === 'express_semanal' ? 168       // 7 días
      : 24;                                        // 24 horas
    const expressPlanValue = planType === 'semestral' ? 'semestral'
      : planType === 'express_semanal' ? '7d'
      : '24h';
    console.log(`⏱️ Duration: ${hours} hours (${planType})`);

    // Leer estado actual del usuario con manejo de errores
    const { data: currentUser, error: fetchError } = await supabase
      .from('users')
      .select('express_expires_at')
      .eq('id', userId)
      .single();

    if (fetchError) {
      console.error('❌ Error fetching current user:', fetchError);
      throw fetchError;
    }

    // Calcular nueva fecha de expiración
    let expiresAt: Date;
    const now = new Date();
    const currentExpires = currentUser?.express_expires_at
      ? new Date(currentUser.express_expires_at)
      : null;

    // Logging del estado actual
    console.log('📅 Current state:', {
      now: now.toISOString(),
      current_expires_at: currentExpires?.toISOString() || 'none',
      is_active: currentExpires && currentExpires > now,
    });

    // Lógica de extensión vs nuevo
    if (currentExpires && currentExpires > now) {
      // EXTENDER: Tiene Express activo, sumar horas
      expiresAt = new Date(currentExpires.getTime() + hours * 60 * 60 * 1000);
      console.log(`⏰ EXTENDING Express: ${currentExpires.toISOString()} → ${expiresAt.toISOString()} (+${hours}h)`);
    } else {
      // NUEVO: No tiene activo o ya expiró, empezar desde ahora
      expiresAt = new Date(now.getTime() + hours * 60 * 60 * 1000);
      console.log(`✨ NEW Express: ${now.toISOString()} → ${expiresAt.toISOString()} (${hours}h)`);
    }

    // Update con validación
    const { error: updateError } = await supabase
      .from('users')
      .update({
        express_expires_at: expiresAt.toISOString(),
        express_plan: expressPlanValue,
        // plan_type se mantiene 'free' - Express no cambia el plan base
      })
      .eq('id', userId);

    if (updateError) {
      console.error('❌ Error updating Express expiration:', updateError);
      throw updateError;
    }

    console.log(`✅ Express activated successfully for user ${userId} - expires: ${expiresAt.toISOString()}`);

    await supabase.from('analytics_events').insert({
      event_type: 'checkout_completed',
      user_id: userId,
      tool_type: 'general',
      metadata: {
        plan_type: planType,
        express_plan: expressPlanValue,
        session_id: session.id,
        hours,
      },
    });

    return;
  }

  // CASO 2: Suscripción Premium (mensual o anual)
  const subscriptionId = session.subscription as string;
  if (!subscriptionId) {
    console.error('No subscription ID in session');
    return;
  }

  const stripe = getStripe();
  const subscription: any = await stripe.subscriptions.retrieve(subscriptionId, {
    expand: ['items.data.price'],
  });

  // Los period dates están en subscription_item, no en el nivel raíz
  const subscriptionItem = subscription.items?.data?.[0];

  console.log('📦 Subscription retrieved:', {
    id: subscription.id,
    status: subscription.status,
    current_period_start: subscriptionItem?.current_period_start,
    current_period_end: subscriptionItem?.current_period_end,
    items_count: subscription.items?.data?.length,
    has_price: !!subscriptionItem?.price?.id,
  });

  const planInterval = session.metadata?.plan_interval;

  // Verificar que tenemos los datos necesarios
  if (!subscriptionItem?.price?.id) {
    console.error('❌ Missing price data in subscription:', JSON.stringify(subscription, null, 2));
    throw new Error('Missing price data in subscription');
  }

  if (!subscriptionItem.current_period_start || !subscriptionItem.current_period_end) {
    console.error('❌ Missing period dates. Subscription data:', JSON.stringify(subscription, null, 2));
    throw new Error('Missing period dates in subscription');
  }

  // Crear registro de suscripción en Supabase
  const { error: subscriptionError } = await supabase
    .from('subscriptions')
    .upsert(
      {
        user_id: userId,
        stripe_customer_id: session.customer as string,
        stripe_subscription_id: subscriptionId,
        stripe_price_id: subscriptionItem.price.id,
        plan_interval: planInterval,
        status: subscription.status,
        current_period_start: new Date(subscriptionItem.current_period_start * 1000).toISOString(),
        current_period_end: new Date(subscriptionItem.current_period_end * 1000).toISOString(),
        cancel_at_period_end: subscription.cancel_at_period_end || false,
      },
      {
        onConflict: 'stripe_subscription_id',
      }
    );

  if (subscriptionError) {
    console.error('Error creating subscription:', subscriptionError);
    throw subscriptionError;
  }

  // Actualizar plan del usuario a premium
  const { error: userError } = await supabase
    .from('users')
    .update({
      plan_type: 'premium',
      stripe_customer_id: session.customer as string,
    })
    .eq('id', userId);

  if (userError) {
    console.error('Error updating user plan:', userError);
    throw userError;
  }

  await supabase.from('analytics_events').insert({
    event_type: 'checkout_completed',
    user_id: userId,
    tool_type: 'general',
    metadata: {
      plan_type: 'premium',
      plan_interval: planInterval,
      session_id: session.id,
    },
  });

  console.log(`✅ User ${userId} upgraded to premium (${planInterval})`);
}

// Manejar actualización de suscripción
async function handleSubscriptionUpdated(
  subscription: any,
  supabase: ReturnType<typeof getSupabaseAdmin>
) {
  console.log('🔔 Processing customer.subscription.updated:', {
    subscription_id: subscription.id,
    status: subscription.status,
    cancel_at_period_end: subscription.cancel_at_period_end,
  });

  // Los period dates están en subscription_item, igual que en checkout
  const subscriptionItem = subscription.items?.data?.[0];

  if (!subscriptionItem) {
    console.error('❌ No subscription items found');
    throw new Error('Missing subscription items');
  }

  // Validar que tenemos las fechas
  if (!subscriptionItem.current_period_start || !subscriptionItem.current_period_end) {
    console.error('❌ Missing period dates in subscription item:', {
      subscription_id: subscription.id,
      has_items: !!subscription.items?.data?.length,
    });
    throw new Error('Missing period dates in subscription item');
  }

  const { error } = await supabase
    .from('subscriptions')
    .update({
      status: subscription.status,
      current_period_start: new Date(subscriptionItem.current_period_start * 1000).toISOString(),
      current_period_end: new Date(subscriptionItem.current_period_end * 1000).toISOString(),
      cancel_at_period_end: subscription.cancel_at_period_end || false,
    })
    .eq('stripe_subscription_id', subscription.id);

  if (error) {
    console.error('Error updating subscription:', error);
    throw error;
  }

  console.log(`✅ Subscription ${subscription.id} updated (cancel_at_period_end: ${subscription.cancel_at_period_end})`);
}

// Manejar cancelación de suscripción
async function handleSubscriptionDeleted(
  subscription: any,
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
  invoice: any,
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
