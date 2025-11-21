/**
 * Tipos para páginas programáticas (pSEO)
 */

export interface FAQ {
  question: string;
  answer: string;
}

export interface Benefit {
  icon: string;
  title: string;
  description: string;
}

export interface CTA {
  text: string;
  url: string;
}

export interface Comparison {
  feature: string;
  detectordeia: string | boolean;
  competitor: string | boolean;
}

// Página comparativa (vs competidores)
export interface ComparisonPage {
  slug: string;
  competitorName: string;
  competitorWebsite?: string;
  keywords: string[];

  // SEO
  title: string;
  description: string;
  h1: string;

  // Content
  intro: string;
  whyBetter: string[];
  comparisons: Comparison[];
  whenToUseCompetitor?: string;
  pricing: {
    detectordeia: string;
    competitor: string;
  };

  faqs: FAQ[];
  cta: CTA;
}

// Página de caso de uso
export interface UseCasePage {
  slug: string;
  audience: string;
  keywords: string[];

  // SEO
  title: string;
  description: string;
  h1: string;

  // Content
  intro: string;
  benefits: Benefit[];
  howItWorks: string[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };

  faqs: FAQ[];
  cta: CTA;
}

// Página de feature
export interface FeaturePage {
  slug: string;
  featureName: string;
  keywords: string[];

  // SEO
  title: string;
  description: string;
  h1: string;

  // Content
  intro: string;
  benefits: Benefit[];
  howToUse: string[];

  faqs: FAQ[];
  cta: CTA;
}
