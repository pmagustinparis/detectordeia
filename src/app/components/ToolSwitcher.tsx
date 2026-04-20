'use client';

import { usePathname } from 'next/navigation';
import { Icon, ProductIcons } from '@/lib/icons';
import type { LucideIcon } from 'lucide-react';

interface Tool {
  name: string;
  path: string;
  icon: LucideIcon;
  isPopular?: boolean;
}

const tools: Tool[] = [
  { name: 'Detector', path: '/', icon: ProductIcons.Detector },
  { name: 'Humanizador', path: '/humanizador', icon: ProductIcons.Humanizer, isPopular: true },
  { name: 'Parafraseador', path: '/parafraseador', icon: ProductIcons.Paraphraser },
];

export default function ToolSwitcher() {
  const pathname = usePathname();

  return (
    <div className="sticky top-0 z-40 bg-white border-b border-gray-200 mb-6">
      <div className="max-w-5xl mx-auto px-4 py-3">
        <div className="flex items-center justify-center gap-2 md:gap-4">
          {tools.map((tool) => {
            const isActive = pathname === tool.path;

            return (
              <a
                key={tool.path}
                href={tool.path}
                className={`
                  relative flex items-center gap-2 px-4 md:px-6 py-2.5 rounded-lg font-semibold text-sm md:text-base
                  transition-colors
                  ${isActive
                    ? 'bg-blue-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }
                `}
              >
                {tool.isPopular && !isActive && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    Popular
                  </span>
                )}
                <div className={`hidden md:block ${isActive ? 'text-white' : 'text-blue-900'}`}>
                  <Icon icon={tool.icon} size="lg" />
                </div>
                <span className="whitespace-nowrap">{tool.name}</span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
