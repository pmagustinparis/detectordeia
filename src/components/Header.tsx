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
        const response = await fetch('/api/user/plan');
        if (response.ok) {
          const data = await response.json();
          // Check if Express is active
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
      } catch (error) {
        console.error('Error fetching Express status:', error);
      }
    }

    fetchExpressStatus();
  }, [isAuthenticated]);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-900 transition-colors duration-200 group-hover:bg-blue-800">
              <span className="text-white font-black italic text-lg leading-none">D</span>
            </div>
            <span className="hidden sm:block text-base font-bold tracking-tight text-blue-900">
              DetectordeIA<span className="text-blue-500">.ai</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
            >
              Detector
            </Link>
            <Link
              href="/humanizador"
              className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
            >
              Humanizador
            </Link>
            <Link
              href="/parafraseador"
              className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
            >
              Parafraseador
            </Link>
            <Link
              href="/pricing"
              className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
            >
              Planes
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
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
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
          <div className="md:hidden border-t border-gray-100 py-3">
            <nav className="flex flex-col">
              <Link
                href="/"
                className="px-2 py-2.5 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Detector
              </Link>
              <Link
                href="/humanizador"
                className="px-2 py-2.5 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Humanizador
              </Link>
              <Link
                href="/parafraseador"
                className="px-2 py-2.5 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Parafraseador
              </Link>
              <Link
                href="/pricing"
                className="px-2 py-2.5 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Planes
              </Link>
              <div className="px-2 mt-3 border-t border-gray-100 pt-3">
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
