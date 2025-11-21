import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { getUserUsageStats, getUserHistory } from '@/lib/queries/usageStats';
import DashboardClient from './DashboardClient';

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/');
  }

  // Obtener stats de uso
  const usageStats = await getUserUsageStats(user.id);

  // Obtener historial
  const history = await getUserHistory(user.id);

  // Obtener plan del usuario
  const { data: userData } = await supabase
    .from('users')
    .select('plan_type, stripe_customer_id')
    .eq('auth_id', user.id)
    .single();

  const planType = userData?.plan_type || 'free';
  const hasStripeCustomer = !!userData?.stripe_customer_id;

  return (
    <DashboardClient
      user={user}
      usageStats={usageStats}
      history={history}
      planType={planType}
      hasStripeCustomer={hasStripeCustomer}
    />
  );
}
