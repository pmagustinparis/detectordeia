'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AuthButton from './AuthButton';
import { useAuth } from '@/lib/hooks/useAuth';
import ExpressTimer from './ExpressTimer';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const [expressExpiresAt, setExpressExpiresAt] = useState<string | null>(null);

  // Fetch Express status if authenticated
  useEffect(() => {
    async function fetchExpressStatus() {
      if (!isAuthenticated) {
        setExpressExpiresAt(null);
        return;
      }

      try {
        const response = await fetch('/api/user/status');
        if (response.ok) {
          const data = await response.json();
          // Use consolidated response structure
          if (data.express?.is_active && data.express?.expires_at) {
            setExpressExpiresAt(data.express.expires_at);
          } else {
            setExpressExpiresAt(null);
          }
        }
      } catch (error) {
        console.error('Error fetching Express status:', error);
      }
    }

    fetchExpressStatus();
  }, [isAuthenticated]);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-violet-100 shadow-sm animate-slide-in-top">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 shadow-lg group-hover:shadow-xl transition-all duration-300">
              <span className="text-white font-bold text-lg">🤖</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-cyan-500 bg-clip-text text-transparent hidden sm:block">
              DetectordeIA.ai
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/#detector"
              className="text-gray-700 hover:text-violet-600 font-medium transition-colors duration-200"
            >
              Detector
            </Link>
            <Link
              href="/humanizador"
              className="text-gray-700 hover:text-violet-600 font-medium transition-colors duration-200"
            >
              Humanizador
            </Link>
            <Link
              href="/parafraseador"
              className="text-gray-700 hover:text-violet-600 font-medium transition-colors duration-200"
            >
              Parafraseador
            </Link>
            <Link
              href="/pricing"
              className="text-gray-700 hover:text-violet-600 font-medium transition-colors duration-200"
            >
              Precios
            </Link>
          </nav>

          {/* Auth & CTA */}
          <div className="hidden md:flex items-center gap-4">
            {expressExpiresAt && (
              <ExpressTimer expiresAt={expressExpiresAt} compact={true} />
            )}
            <AuthButton />
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-violet-50 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <nav className="flex flex-col gap-3">
              <Link
                href="/#detector"
                className="px-4 py-2 text-gray-700 hover:text-violet-600 hover:bg-violet-50 rounded-lg font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Detector
              </Link>
              <Link
                href="/humanizador"
                className="px-4 py-2 text-gray-700 hover:text-violet-600 hover:bg-violet-50 rounded-lg font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Humanizador
              </Link>
              <Link
                href="/parafraseador"
                className="px-4 py-2 text-gray-700 hover:text-violet-600 hover:bg-violet-50 rounded-lg font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Parafraseador
              </Link>
              <Link
                href="/pricing"
                className="px-4 py-2 text-gray-700 hover:text-violet-600 hover:bg-violet-50 rounded-lg font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Precios
              </Link>
              <div className="px-4 mt-4 border-t border-gray-200 pt-4">
                {expressExpiresAt && (
                  <div className="mb-3">
                    <ExpressTimer expiresAt={expressExpiresAt} compact={false} />
                  </div>
                )}
                <AuthButton />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
