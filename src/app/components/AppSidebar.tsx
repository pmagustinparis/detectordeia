'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
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
      '/identificador-de-ia', '/verificador-de-ia', '/comprobador-de-ia',
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
];

export default function AppSidebar() {
  const pathname = usePathname();

  const isToolActive = (tool: typeof tools[0]) => {
    if (pathname === tool.path) return true;
    return tool.aliases.some((alias) => pathname === alias || pathname.startsWith(alias + '/'));
  };

  return (
    <aside className="hidden md:flex flex-col w-48 shrink-0 sticky top-0 h-screen bg-blue-900 border-r border-blue-800 z-30">
      {/* Logo */}
      <div className="px-4 py-4 border-b border-blue-800">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-blue-800 flex items-center justify-center shrink-0">
            <span className="text-white font-black italic text-base leading-none">D</span>
          </div>
          <span className="text-sm font-black tracking-tight text-white leading-tight">
            Detector<span className="text-blue-300">deIA</span>
          </span>
        </Link>
      </div>

      {/* Tools Navigation */}
      <nav className="flex-1 py-3 px-2 flex flex-col gap-0.5">
        <p className="text-[10px] font-semibold text-blue-300 uppercase tracking-wider px-3 mb-1">
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
                  ? 'bg-blue-800 border-l-2 border-white text-white'
                  : 'text-blue-100 hover:bg-blue-800 hover:text-white'
                }
              `}
            >
              <div className={`shrink-0 ${isActive ? 'text-white' : 'text-blue-300'}`}>
                <Icon icon={tool.icon} size="md" />
              </div>
              <span className="flex-1">{tool.name}</span>
              {tool.isPopular && (
                <span className="text-[9px] font-bold bg-white/20 text-white px-1.5 py-0.5 rounded-full whitespace-nowrap">
                  Popular
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom: Planes */}
      <div className="px-2 py-3 border-t border-blue-800">
        <Link
          href="/pricing"
          className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg font-medium text-sm transition-all duration-150
            ${pathname === '/pricing'
              ? 'bg-blue-800 border-l-2 border-white text-white'
              : 'text-blue-200 hover:bg-blue-800 hover:text-white'
            }
          `}
        >
          <span className="text-sm shrink-0">💎</span>
          <span>Planes</span>
        </Link>
      </div>
    </aside>
  );
}
