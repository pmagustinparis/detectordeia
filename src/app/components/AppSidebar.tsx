'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Icon, ProductIcons } from '@/lib/icons';

const tools = [
  {
    name: 'Humanizador',
    path: '/humanizador',
    icon: ProductIcons.Humanizer,
    color: 'text-violet-600',
    activeText: 'text-violet-700',
    activeBg: 'bg-violet-50 border-l-2 border-violet-600',
    isPopular: true,
    aliases: ['/convertidor-ia-a-humano', '/transformador-texto-ia'],
  },
  {
    name: 'Detector',
    path: '/',
    icon: ProductIcons.Detector,
    color: 'text-blue-900',
    activeText: 'text-blue-900',
    activeBg: 'bg-blue-50 border-l-2 border-blue-900',
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
    color: 'text-purple-600',
    activeText: 'text-purple-700',
    activeBg: 'bg-purple-50 border-l-2 border-purple-600',
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
    <aside className="hidden md:flex flex-col w-48 shrink-0 sticky top-0 h-screen bg-white border-r border-gray-200 z-30">
      {/* Logo */}
      <div className="px-4 py-4 border-b border-gray-100">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-blue-900 flex items-center justify-center shrink-0 group-hover:bg-blue-800 transition-colors">
            <span className="text-white text-sm">🤖</span>
          </div>
          <span
            className="text-sm font-bold text-blue-900 leading-tight"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            DetectordeIA
          </span>
        </Link>
      </div>

      {/* Tools Navigation */}
      <nav className="flex-1 py-3 px-2 flex flex-col gap-0.5">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-3 mb-1">
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
                  ? `${tool.activeBg} ${tool.activeText}`
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }
              `}
            >
              <div className={`shrink-0 ${isActive ? tool.color : 'text-gray-400'}`}>
                <Icon icon={tool.icon} size="md" />
              </div>
              <span className="flex-1">{tool.name}</span>
              {tool.isPopular && (
                <span className="text-[9px] font-bold bg-violet-100 text-violet-600 px-1.5 py-0.5 rounded-full whitespace-nowrap">
                  Popular
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom: Planes */}
      <div className="px-2 py-3 border-t border-gray-100">
        <Link
          href="/pricing"
          className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg font-medium text-sm transition-all duration-150
            ${pathname === '/pricing'
              ? 'bg-blue-50 border-l-2 border-blue-900 text-blue-900'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
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
