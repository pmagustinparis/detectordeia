import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import SuccessClient from './SuccessClient';

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/');
  }

  // Await searchParams (Next.js 15 requirement)
  const params = await searchParams;

  // Obtener datos del usuario actualizado
  const { data: userData } = await supabase
    .from('users')
    .select('plan_type, email')
    .eq('auth_id', user.id)
    .single();

  return (
    <SuccessClient
      sessionId={params.session_id}
      userEmail={userData?.email || user.email || ''}
      planType={userData?.plan_type || 'free'}
    />
  );
}
