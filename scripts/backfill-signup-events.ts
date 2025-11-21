/**
 * Script de Backfill: Signup Events
 *
 * Genera eventos 'signup' retroactivos para usuarios que se registraron
 * pero no tienen el evento en analytics_events (porque se agregó después).
 *
 * USO:
 * npx tsx scripts/backfill-signup-events.ts
 *
 * IMPORTANTE: Ejecutar UNA SOLA VEZ
 */

import { createClient } from '@supabase/supabase-js';

// Usuarios de prueba que NO queremos backfillear
const INTERNAL_TEST_EMAILS = [
  'parisagustin@gmail.com',
  'latamify@gmail.com',
];

async function backfillSignupEvents() {
  console.log('🚀 Iniciando backfill de eventos signup...\n');

  // Verificar variables de entorno
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Error: Faltan variables de entorno NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
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
    process.exit(1);
  }

  if (!recentUsers || recentUsers.length === 0) {
    console.log('✅ No hay usuarios recientes para backfillear (excluyendo test users)');
    return;
  }

  console.log(`✅ Encontrados ${recentUsers.length} usuarios recientes\n`);

  // 2. Para cada usuario, verificar si ya tiene evento 'signup'
  let backfilledCount = 0;
  let skippedCount = 0;

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
  }

  // 4. Resumen
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📊 RESUMEN DEL BACKFILL');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Total usuarios encontrados: ${recentUsers.length}`);
  console.log(`✅ Eventos creados: ${backfilledCount}`);
  console.log(`⏭️  Eventos saltados: ${skippedCount}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  if (backfilledCount > 0) {
    console.log('🎉 ¡Backfill completado! Ahora tu dashboard mostrará los registros históricos.');
    console.log('💡 Tip: Refresca el dashboard de analytics para ver los datos actualizados.\n');
  } else {
    console.log('ℹ️  No se crearon eventos nuevos (todos los usuarios ya tenían su evento signup).\n');
  }
}

// Ejecutar
backfillSignupEvents()
  .then(() => {
    console.log('✅ Script finalizado exitosamente');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Error fatal:', error);
    process.exit(1);
  });
