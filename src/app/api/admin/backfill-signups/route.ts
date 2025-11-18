/**
 * API Route: Backfill Signup Events
 *
 * POST /api/admin/backfill-signups
 *
 * Ejecuta el backfill de eventos signup para usuarios históricos.
 * EJECUTAR UNA SOLA VEZ.
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Usuarios de prueba que NO queremos backfillear
const INTERNAL_TEST_EMAILS = [
  'parisagustin@gmail.com',
  'latamify@gmail.com',
];

export async function POST(request: NextRequest) {
  try {
    // Verificar autenticación simple
    const authHeader = request.headers.get('authorization');
    if (authHeader !== 'Basic ' + Buffer.from('Agus:1908').toString('base64')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.log('🚀 Iniciando backfill de eventos signup...\n');

    // Verificar variables de entorno
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: 'Faltan variables de entorno NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // 1. Obtener usuarios creados en los últimos 30 días (excluyendo test users)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    console.log(`📅 Buscando usuarios registrados desde: ${thirtyDaysAgo.toISOString()}`);

    const { data: recentUsers, error: usersError } = await supabase
      .from('users')
      .select('id, email, created_at')
      .gte('created_at', thirtyDaysAgo.toISOString())
      .not('email', 'in', `(${INTERNAL_TEST_EMAILS.map(e => `"${e}"`).join(',')})`)
      .order('created_at', { ascending: true });

    if (usersError) {
      console.error('❌ Error obteniendo usuarios:', usersError);
      return NextResponse.json(
        { error: 'Error obteniendo usuarios', details: usersError },
        { status: 500 }
      );
    }

    if (!recentUsers || recentUsers.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No hay usuarios recientes para backfillear (excluyendo test users)',
        backfilledCount: 0,
        skippedCount: 0,
      });
    }

    console.log(`✅ Encontrados ${recentUsers.length} usuarios recientes\n`);

    // 2. Para cada usuario, verificar si ya tiene evento 'signup'
    let backfilledCount = 0;
    let skippedCount = 0;
    const backfilledUsers: string[] = [];
    const skippedUsers: string[] = [];

    for (const user of recentUsers) {
      // Verificar si ya existe evento signup para este usuario
      const { data: existingEvent } = await supabase
        .from('analytics_events')
        .select('id')
        .eq('event_type', 'signup')
        .eq('user_id', user.id)
        .single();

      if (existingEvent) {
        console.log(`⏭️  Skip: ${user.email} (ya tiene evento signup)`);
        skippedCount++;
        skippedUsers.push(user.email);
        continue;
      }

      // 3. Crear evento signup con la fecha de creación del usuario
      const { error: insertError } = await supabase
        .from('analytics_events')
        .insert({
          event_type: 'signup',
          user_id: user.id,
          anonymous_id: null, // No podemos recuperar el anonymousId retroactivamente
          tool_type: 'general',
          metadata: {
            email: user.email,
            backfilled: true, // Marcar que fue backfilled
            original_created_at: user.created_at,
          },
          page_url: null,
          referrer: null,
          created_at: user.created_at, // Usar la fecha original de registro
        });

      if (insertError) {
        console.error(`❌ Error creando evento para ${user.email}:`, insertError);
        continue;
      }

      console.log(`✅ Backfilled: ${user.email} (${new Date(user.created_at).toLocaleDateString()})`);
      backfilledCount++;
      backfilledUsers.push(user.email);
    }

    // 4. Retornar resumen
    return NextResponse.json({
      success: true,
      message: 'Backfill completado exitosamente',
      totalUsersFound: recentUsers.length,
      backfilledCount,
      skippedCount,
      backfilledUsers,
      skippedUsers,
    });

  } catch (error) {
    console.error('[Backfill API] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: String(error) },
      { status: 500 }
    );
  }
}
