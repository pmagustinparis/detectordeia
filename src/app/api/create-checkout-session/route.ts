import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    // Inicializar Stripe (dentro de la función para evitar errores en build time)
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2025-10-29.clover',
    });

    const { plan_type, plan_interval } = await request.json();

    // Validar plan_type (express o premium)
    if (!plan_type || !['express', 'premium'].includes(plan_type)) {
      return NextResponse.json(
        { error: 'plan_type debe ser "express" o "premium"' },
        { status: 400 }
      );
    }

    // Si es premium, validar plan_interval
    if (plan_type === 'premium' && (!plan_interval || !['month', 'year'].includes(plan_interval))) {
      return NextResponse.json(
        { error: 'Para premium, plan_interval debe ser "month" o "year"' },
        { status: 400 }
      );
    }

    // Verificar autenticación
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Debes iniciar sesión para suscribirte' },
        { status: 401 }
      );
    }

    // Obtener datos del usuario de nuestra base de datos
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id, email, stripe_customer_id')
      .eq('auth_id', user.id)
      .single();

    if (userError || !userData) {
      return NextResponse.json(
        { error: 'Error al obtener datos del usuario' },
        { status: 500 }
      );
    }

    // Seleccionar el Price ID según el plan
    let priceId: string;
    let mode: 'payment' | 'subscription';

    if (plan_type === 'express') {
      // Express Pass - Pago único ($3.99)
      priceId = process.env.STRIPE_PRICE_EXPRESS || 'price_1ScR9nR5MbTVVQlk2oIBvATK';
      mode = 'payment';
    } else {
      // Premium - Suscripción ($12.99/mes o $124.68/año)
      priceId = plan_interval === 'month'
        ? (process.env.STRIPE_PRICE_MONTHLY || 'price_1ScRCOR5MbTVVQlkQkuJDJxi')
        : (process.env.STRIPE_PRICE_ANNUAL || 'price_1ScUSzR5MbTVVQlklglZnaQp');
      mode = 'subscription';
    }

    if (!priceId) {
      return NextResponse.json(
        { error: 'Price ID no configurado' },
        { status: 500 }
      );
    }

    let customerId = userData.stripe_customer_id;

    // Crear Stripe Customer si no existe
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: userData.email,
        metadata: {
          supabase_user_id: userData.id,
        },
      });

      customerId = customer.id;

      // Guardar el customer_id en nuestra base de datos
      await supabase
        .from('users')
        .update({ stripe_customer_id: customerId })
        .eq('id', userData.id);
    }

    // Crear Checkout Session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: mode,
      success_url: `${request.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin')}/pricing`,
      metadata: {
        supabase_user_id: userData.id,
        plan_type: plan_type,
        ...(plan_interval && { plan_interval }),
      },
    });

    return NextResponse.json({ url: session.url, sessionId: session.id });

  } catch (error: any) {
    console.error('Error creando checkout session:', error);
    return NextResponse.json(
      { error: error.message || 'Error al crear sesión de pago' },
      { status: 500 }
    );
  }
}
