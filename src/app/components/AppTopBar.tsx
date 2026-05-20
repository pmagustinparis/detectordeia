'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AuthButton from '@/components/AuthButton';
import ExpressTimer from '@/components/ExpressTimer';
import { useAuth } from '@/lib/hooks/useAuth';

export default function AppTopBar() {
  const { isAuthenticated } = useAuth();
  const [expressExpiresAt, setExpressExpiresAt] = useState<string | null>(null);

  useEffect(() => {
    async function fetchExpressStatus() {
      if (!isAuthenticated) {
        setExpressExpiresAt(null);
        return;
      }
      try {
        const response = await fetch('/api/user/plan');
        if (response.ok) {
          const data = await response.json();
          if (data.express_expires_at) {
            const expiresAt = new Date(data.express_expires_at);
            if (expiresAt > new Date()) {
              setExpressExpiresAt(data.express_expires_at);
            } else {
              setExpressExpiresAt(null);
            }
          } else {
            setExpressExpiresAt(null);
          }
        }
      } catch {
        // silently fail
      }
    }
    fetchExpressStatus();
  }, [isAuthenticated]);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-blue-900/20 h-14 flex items-center px-4 gap-4">
      {/* Logo — visible on mobile only (desktop has it in sidebar) */}
      <Link href="/" className="md:hidden flex items-center gap-2 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-blue-900 flex items-center justify-center">
          <span className="text-white font-black italic text-base leading-none">D</span>
        </div>
        <span className="text-sm font-black tracking-tight text-blue-900">
          Detector<span className="text-blue-600">deIA</span><span className="text-blue-400 font-semibold">.ai</span>
        </span>
      </Link>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Right side: Express timer, Planes, Auth */}
      <div className="flex items-center gap-3">
        {expressExpiresAt && (
          <ExpressTimer expiresAt={expressExpiresAt} compact={true} />
        )}
        <Link
          href="/pricing"
          className="inline-flex items-center px-3 py-1.5 text-xs md:text-sm font-bold bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors"
        >
          Planes
        </Link>
        <AuthButton />
      </div>
    </header>
  );
}
