'use client';

import { usePathname } from 'next/navigation';
import { Icon, ProductIcons } from '@/lib/icons';
import type { LucideIcon } from 'lucide-react';

interface Tool {
  name: string;
  path: string;
  icon: LucideIcon;
  color: string;
  gradient: string;
  isPopular?: boolean;
}

const tools: Tool[] = [
  {
    name: 'Detector',
    path: '/',
    icon: ProductIcons.Detector,
    color: 'text-violet-600',
    gradient: 'from-violet-500 to-purple-500',
  },
  {
    name: 'Humanizador',
    path: '/humanizador',
    icon: ProductIcons.Humanizer,
    color: 'text-emerald-600',
    gradient: 'from-emerald-500 to-teal-500',
    isPopular: true,
  },
  {
    name: 'Parafraseador',
    path: '/parafraseador',
    icon: ProductIcons.Paraphraser,
    color: 'text-purple-600',
    gradient: 'from-purple-500 to-pink-500',
  },
];

export default function ToolSwitcher() {
  const pathname = usePathname();

  return (
    <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm shadow-md border-b border-gray-200 mb-6">
      <div className="max-w-5xl mx-auto px-4 py-3">
        <div className="flex items-center justify-center gap-2 md:gap-4">
          {tools.map((tool) => {
            const isActive = pathname === tool.path;

            return (
              <a
                key={tool.path}
                href={tool.path}
                className={`
                  relative flex items-center gap-2 px-4 md:px-6 py-2.5 rounded-xl font-semibold text-sm md:text-base
                  transition-all duration-200
                  ${
                    isActive
                      ? `bg-gradient-to-r ${tool.gradient} text-white shadow-lg scale-105`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-102'
                  }
                `}
              >
                {/* Badge "Popular" */}
                {tool.isPopular && !isActive && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md">
                    ⭐
                  </span>
                )}

                {/* Icon */}
                <div className={`hidden md:block ${isActive ? 'text-white' : tool.color}`}>
                  <Icon icon={tool.icon} size="lg" />
                </div>

                {/* Name */}
                <span className="whitespace-nowrap">{tool.name}</span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
