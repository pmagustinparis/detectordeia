import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    console.log('[create-portal-session] Iniciando...');

    // Verificar que existe la clave de Stripe
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('[create-portal-session] STRIPE_SECRET_KEY no configurada');
      return NextResponse.json(
        { error: 'Configuración de Stripe incompleta. Contacta a soporte.' },
        { status: 500 }
      );
    }

    // Inicializar Stripe
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-10-29.clover',
    });

    // Verificar autenticación
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      console.log('[create-portal-session] Usuario no autenticado');
      return NextResponse.json(
        { error: 'Debes iniciar sesión para acceder al portal de gestión' },
        { status: 401 }
      );
    }

    console.log('[create-portal-session] Usuario autenticado:', user.id);

    // Obtener stripe_customer_id del usuario
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('stripe_customer_id, email, plan_type')
      .eq('auth_id', user.id)
      .single();

    if (userError) {
      console.error('[create-portal-session] Error consultando usuario:', userError);
      return NextResponse.json(
        { error: 'Error al obtener información del usuario. Intenta nuevamente.' },
        { status: 500 }
      );
    }

    if (!userData) {
      console.error('[create-portal-session] Usuario no encontrado en DB');
      return NextResponse.json(
        { error: 'Usuario no encontrado. Contacta a soporte.' },
        { status: 404 }
      );
    }

    console.log('[create-portal-session] Datos usuario:', {
      email: userData.email,
      plan_type: userData.plan_type,
      has_customer_id: !!userData.stripe_customer_id,
    });

    if (!userData.stripe_customer_id) {
      console.error('[create-portal-session] Usuario sin stripe_customer_id');
      return NextResponse.json(
        { error: 'No tienes una suscripción activa. Suscríbete primero en la página de Planes.' },
        { status: 400 }
      );
    }

    // Crear sesión del Customer Portal
    console.log('[create-portal-session] Creando sesión del portal para customer:', userData.stripe_customer_id);

    const origin = request.headers.get('origin') || 'https://detectordeia.ai';
    const returnUrl = `${origin}/dashboard`;

    console.log('[create-portal-session] Return URL:', returnUrl);

    const session = await stripe.billingPortal.sessions.create({
      customer: userData.stripe_customer_id,
      return_url: returnUrl,
    });

    console.log('[create-portal-session] Sesión creada exitosamente:', session.id);

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('[create-portal-session] Error:', error);

    // Mejorar mensajes de error según el tipo
    let errorMessage = 'Error al crear sesión del portal';

    if (error.type === 'StripeInvalidRequestError') {
      errorMessage = 'Error de configuración de Stripe. Verifica que el Customer Portal esté activado en tu cuenta de Stripe.';
    } else if (error.message) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
