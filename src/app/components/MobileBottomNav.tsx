'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Icon, ProductIcons } from '@/lib/icons';

const tabs = [
  {
    name: 'Humanizador',
    path: '/humanizador',
    icon: ProductIcons.Humanizer,
    color: 'text-violet-600',
    aliases: ['/convertidor-ia-a-humano', '/transformador-texto-ia'],
  },
  {
    name: 'Detector',
    path: '/',
    icon: ProductIcons.Detector,
    color: 'text-blue-900',
    aliases: [
      '/ar', '/cl', '/co', '/es', '/mx', '/pe',
      '/identificador-de-ia', '/verificador-de-ia', '/comprobador-de-ia',
    ],
  },
  {
    name: 'Parafraseador',
    path: '/parafraseador',
    icon: ProductIcons.Paraphraser,
    color: 'text-purple-600',
    aliases: ['/reescritor-de-textos', '/reformulador-online'],
  },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  const isTabActive = (tab: typeof tabs[0]) => {
    if (pathname === tab.path) return true;
    return tab.aliases.some((alias) => pathname === alias || pathname.startsWith(alias + '/'));
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 flex safe-area-inset-bottom">
      {tabs.map((tab) => {
        const isActive = isTabActive(tab);
        return (
          <Link
            key={tab.path}
            href={tab.path}
            className={`flex-1 flex flex-col items-center justify-center py-2 gap-0.5 text-[11px] font-medium transition-colors
              ${isActive ? tab.color : 'text-gray-500'}
            `}
          >
            <div className={`${isActive ? tab.color : 'text-gray-400'}`}>
              <Icon icon={tab.icon} size="md" />
            </div>
            <span>{tab.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
