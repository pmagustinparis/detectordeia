/**
 * Iconos centralizados para todo el sitio
 * Reemplaza emojis por iconos profesionales de Lucide React
 */

import {
  Bot,
  Brain,
  User,
  Users,
  Target,
  Lightbulb,
  BarChart3,
  Search,
  Star,
  Zap,
  Unlock,
  Lock,
  Rocket,
  GraduationCap,
  FileText,
  PenTool,
  Building2,
  Briefcase,
  Sparkles,
  RefreshCw,
  Shield,
  Gauge,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  TrendingUp,
  Activity,
  type LucideIcon
} from 'lucide-react';

// Tamaños estándar para consistencia
export const iconSizes = {
  xs: 14,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
  '2xl': 40,
} as const;

// Iconos del producto
export const ProductIcons = {
  // Herramientas principales
  Detector: Search,
  Humanizer: Sparkles,
  Paraphraser: RefreshCw,

  // IA vs Humano
  AI: Bot,
  Human: User,
  Brain: Brain,

  // Métricas y análisis
  Analytics: BarChart3,
  Metrics: Activity,
  Trending: TrendingUp,
  Confidence: Target,
  Quality: Gauge,

  // Estados
  Success: CheckCircle2,
  Error: XCircle,
  Warning: AlertTriangle,
  Info: Lightbulb,

  // Acciones
  Premium: Unlock,
  Locked: Lock,
  Upgrade: Rocket,
  Fast: Zap,
  Secure: Shield,
  Star: Star,

  // Tipos de usuario
  Student: GraduationCap,
  Professional: Briefcase,
  Teacher: Users,
  Writer: PenTool,
  Company: Building2,
  Document: FileText,

  // Aliases para compatibilidad directa con nombres de Lucide
  GraduationCap: GraduationCap,
  Briefcase: Briefcase,
  Users: Users,
  PenTool: PenTool,
  Building2: Building2,
  FileText: FileText,
} as const;

// Componente wrapper para iconos con props consistentes
interface IconProps {
  icon: LucideIcon;
  size?: keyof typeof iconSizes;
  className?: string;
  strokeWidth?: number;
}

export function Icon({ icon: IconComponent, size = 'md', className = '', strokeWidth = 2 }: IconProps) {
  return (
    <IconComponent
      size={iconSizes[size]}
      strokeWidth={strokeWidth}
      className={className}
    />
  );
}

// Exports directos para uso rápido
export {
  Bot,
  Brain,
  User,
  Users,
  Target,
  Lightbulb,
  BarChart3,
  Search,
  Star,
  Zap,
  Unlock,
  Lock,
  Rocket,
  GraduationCap,
  FileText,
  PenTool,
  Building2,
  Briefcase,
  Sparkles,
  RefreshCw,
  Shield,
  Gauge,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  TrendingUp,
  Activity,
};
