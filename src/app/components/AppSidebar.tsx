'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Icon, ProductIcons } from '@/lib/icons';

const tools = [
  {
    name: 'Humanizador',
    path: '/humanizador',
    icon: ProductIcons.Humanizer,
    isPopular: true,
    aliases: ['/convertidor-ia-a-humano', '/transformador-texto-ia'],
  },
  {
    name: 'Detector',
    path: '/',
    icon: ProductIcons.Detector,
    isPopular: false,
    aliases: [
      '/ar', '/cl', '/co', '/es', '/mx', '/pe',
      '/verificador-de-ia', '/comprobador-de-ia',
      '/detector-de-ia-universidad',
    ],
  },
  {
    name: 'Parafraseador',
    path: '/parafraseador',
    icon: ProductIcons.Paraphraser,
    isPopular: false,
    aliases: ['/reescritor-de-textos', '/reformulador-online'],
  },
  {
    name: 'Citador',
    path: '/generador-de-citas',
    icon: ProductIcons.Citation,
    isPopular: false,
    isNew: true,
    aliases: ['/generador-citas-apa', '/generador-citas-apa-7', '/referencias-apa', '/citar-pagina-web-apa', '/citas-bibliograficas', '/generador-citas-mla', '/generador-citas-chicago'],
  },
];

export default function AppSidebar() {
  const pathname = usePathname();

  const isToolActive = (tool: typeof tools[0]) => {
    if (pathname === tool.path) return true;
    return tool.aliases.some((alias) => pathname === alias || pathname.startsWith(alias + '/'));
  };

  return (
    <aside className="hidden md:flex flex-col w-52 shrink-0 sticky top-0 h-screen bg-tinta border-r border-white/10 z-30">
      {/* Logo */}
      <div className="px-4 py-4 border-b border-white/10">
        <Link href="/" className="flex items-center group">
          <Image
            src="/brandidentity-detectordeia/logo-detectordeia-white.svg"
            alt="detectordeIA"
            width={150}
            height={39}
            priority
          />
        </Link>
      </div>

      {/* Tools Navigation */}
      <nav className="flex-1 py-3 px-2 flex flex-col gap-0.5">
        <p className="font-mono text-[10px] font-medium text-white/40 uppercase tracking-wider px-3 mb-1">
          Herramientas
        </p>
        {tools.map((tool) => {
          const isActive = isToolActive(tool);
          return (
            <Link
              key={tool.path}
              href={tool.path}
              className={`relative flex items-center gap-2.5 px-3 py-2.5 rounded-lg font-medium text-sm transition-all duration-150
                ${isActive
                  ? 'bg-white/10 border-l-2 border-verde text-white'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
                }
              `}
            >
              <div className={`shrink-0 ${isActive ? 'text-verde-soft' : 'text-white/50'}`}>
                <Icon icon={tool.icon} size="md" />
              </div>
              <span className="flex-1">{tool.name}</span>
              {tool.isPopular && (
                <span className="text-[9px] font-bold bg-white/15 text-white/70 px-1.5 py-0.5 rounded-full whitespace-nowrap">
                  Popular
                </span>
              )}
              {(tool as any).isNew && !isActive && (
                <span className="text-[9px] font-bold bg-verde text-white px-1.5 py-0.5 rounded-full whitespace-nowrap">
                  Nuevo
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom: Planes */}
      <div className="px-2 py-3 border-t border-white/10">
        <Link
          href="/pricing"
          className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg font-medium text-sm transition-all duration-150
            ${pathname === '/pricing'
              ? 'bg-white/10 border-l-2 border-verde text-white'
              : 'text-white/70 hover:bg-white/10 hover:text-white'
            }
          `}
        >
          <svg className={`w-4 h-4 shrink-0 ${pathname === '/pricing' ? 'text-verde-soft' : 'text-white/50'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
          <span>Planes</span>
        </Link>
      </div>
    </aside>
  );
}
