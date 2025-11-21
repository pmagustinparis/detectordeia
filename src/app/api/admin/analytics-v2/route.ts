/**
 * API Route: Elite Analytics Dashboard V2
 * GET /api/admin/analytics-v2
 *
 * Nuevo endpoint modular usando queries optimizadas
 * Reemplaza el endpoint monolítico analytics-data
 * Requires basic authentication
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import {
  fetchNorthStarMetrics,
  fetchRevenueHealth,
  fetchConversionFunnel,
  fetchHotLeads,
  fetchProductEngagement,
  fetchCohortAnalysis,
  fetchUserInsights,
  getQueryTimeframe,
} from '@/lib/analytics/queries';
import { AnalyticsDashboardData, TimeframeOption } from '@/lib/analytics/types';

export async function GET(request: NextRequest) {
  try {
    // 1. Verificar autenticación
    const authHeader = request.headers.get('authorization');
    if (authHeader !== 'Basic ' + Buffer.from('Agus:1908').toString('base64')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Obtener timeframe del query param (default: 30d)
    const { searchParams } = new URL(request.url);
    const timeframeParam = (searchParams.get('timeframe') || '30d') as TimeframeOption;

    // Validar timeframe
    const validTimeframes: TimeframeOption[] = ['7d', '14d', '30d', '90d'];
    if (!validTimeframes.includes(timeframeParam)) {
      return NextResponse.json(
        { error: 'Invalid timeframe. Valid options: 7d, 14d, 30d, 90d' },
        { status: 400 }
      );
    }

    // 3. Cliente Supabase con service role
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    const supabase = createSupabaseClient(supabaseUrl, supabaseServiceKey);

    // 4. Calcular timeframe
    const timeframeDays = parseInt(timeframeParam);
    const queryTimeframe = getQueryTimeframe(timeframeDays);

    console.log(`[Analytics V2] Fetching data for timeframe: ${timeframeParam}`);
    const startTime = Date.now();

    // 5. Ejecutar todas las queries en paralelo
    const [
      northStar,
      revenueHealth,
      conversionFunnel,
      hotLeads,
      productEngagement,
      cohortAnalysis,
      userInsights,
    ] = await Promise.all([
      fetchNorthStarMetrics(supabase, queryTimeframe),
      fetchRevenueHealth(supabase, queryTimeframe),
      fetchConversionFunnel(supabase, queryTimeframe),
      fetchHotLeads(supabase, queryTimeframe),
      fetchProductEngagement(supabase, queryTimeframe),
      fetchCohortAnalysis(supabase, queryTimeframe),
      fetchUserInsights(supabase, queryTimeframe),
    ]);

    // 6. Obtener total de eventos para meta
    const { count: totalEvents } = await supabase
      .from('analytics_events')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', queryTimeframe.startDate.toISOString())
      .lte('created_at', queryTimeframe.endDate.toISOString());

    const executionTime = Date.now() - startTime;
    console.log(`[Analytics V2] Data fetched in ${executionTime}ms`);

    // 7. Ensamblar respuesta completa
    const dashboardData: AnalyticsDashboardData = {
      timeframe: timeframeParam,
      generatedAt: new Date().toISOString(),
      northStar,
      revenueHealth,
      conversionFunnel,
      hotLeads,
      productEngagement,
      cohortAnalysis,
      userInsights,
      meta: {
        totalEvents: totalEvents || 0,
        dateRange: {
          start: queryTimeframe.startDate.toISOString(),
          end: queryTimeframe.endDate.toISOString(),
        },
      },
    };

    return NextResponse.json(dashboardData);
  } catch (error) {
    console.error('[Analytics V2] Error fetching dashboard data:', error);
    return NextResponse.json(
      {
        error: 'Error fetching analytics data',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
