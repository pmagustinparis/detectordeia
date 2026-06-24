'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Icon, ProductIcons } from '@/lib/icons';

const tabs = [
  {
    name: 'Humanizador',
    path: '/humanizador',
    icon: ProductIcons.Humanizer,
    aliases: ['/convertidor-ia-a-humano', '/transformador-texto-ia'],
  },
  {
    name: 'Detector',
    path: '/',
    icon: ProductIcons.Detector,
    aliases: [
      '/ar', '/cl', '/co', '/es', '/mx', '/pe',
      '/verificador-de-ia', '/comprobador-de-ia',
    ],
  },
  {
    name: 'Parafraseador',
    path: '/parafraseador',
    icon: ProductIcons.Paraphraser,
    aliases: ['/reescritor-de-textos', '/reformulador-online'],
  },
  {
    name: 'Citador',
    path: '/generador-de-citas',
    icon: ProductIcons.Citation,
    aliases: ['/generador-citas-apa', '/generador-citas-apa-7', '/referencias-apa', '/citar-pagina-web-apa', '/citas-bibliograficas', '/generador-citas-mla', '/generador-citas-chicago'],
  },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  const isTabActive = (tab: typeof tabs[0]) => {
    if (pathname === tab.path) return true;
    return tab.aliases.some((alias) => pathname === alias || pathname.startsWith(alias + '/'));
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-papel border-t border-line flex safe-area-inset-bottom">
      {tabs.map((tab) => {
        const isActive = isTabActive(tab);
        return (
          <Link
            key={tab.path}
            href={tab.path}
            className={`flex-1 flex flex-col items-center justify-center py-2 gap-0.5 text-[11px] font-medium transition-colors
              ${isActive ? 'text-verde' : 'text-mute'}
            `}
          >
            <div className={isActive ? 'text-verde' : 'text-mute'}>
              <Icon icon={tab.icon} size="md" />
            </div>
            <span>{tab.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
