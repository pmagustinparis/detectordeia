import { ComparisonPage } from './types';

export const comparisons: ComparisonPage[] = [
  {
    slug: 'turnitin',
    competitorName: 'Turnitin',
    competitorWebsite: 'https://www.turnitin.com',
    keywords: [
      'detector de ia vs turnitin',
      'detector de ia turnitin',
      'turnitin detector de ia gratis',
      'alternativa turnitin detector ia'
    ],

    // SEO
    title: 'DetectorDeIA vs Turnitin: Comparación Completa 2025',
    description: 'Comparación detallada entre DetectorDeIA y Turnitin. Descubre cuál detector de IA es mejor para profesores y estudiantes en español.',
    h1: 'DetectorDeIA vs Turnitin: ¿Cuál es el Mejor Detector de IA?',

    // Content
    intro: 'Turnitin es conocido como el líder en detección de plagio académico, pero ¿qué tan efectivo es su detector de IA? DetectorDeIA está optimizado específicamente para español y ofrece ventajas clave para usuarios hispanohablantes.',

    whyBetter: [
      'Optimizado 100% para español (España y LATAM), mientras que Turnitin está diseñado principalmente para inglés',
      'Precio hasta 10x más económico: desde $10/mes vs $100-$300/año de Turnitin institucional',
      'Sin necesidad de licencia institucional - cualquiera puede usar DetectorDeIA',
      'Resultados instantáneos sin espera de procesamiento',
      'Análisis avanzado con métricas lingüísticas específicas para español',
      'Interfaz simple y directa sin curva de aprendizaje',
      'Incluye Humanizador y Parafraseador en el mismo plan'
    ],

    comparisons: [
      { feature: 'Precio individual', detectordeia: '$10/mes o $96/año', competitor: 'Solo institucional ($100-$300/año)' },
      { feature: 'Optimización español', detectordeia: '100% nativo', competitor: 'Limitada' },
      { feature: 'Acceso sin institución', detectordeia: true, competitor: false },
      { feature: 'Tiempo de análisis', detectordeia: 'Instantáneo (<5 seg)', competitor: '5-15 minutos' },
      { feature: 'Detección de IA', detectordeia: 'Multi-pasada con GPT-4o-mini', competitor: 'Modelo propietario' },
      { feature: 'Detección de plagio', detectordeia: false, competitor: true },
      { feature: 'Humanizador incluido', detectordeia: true, competitor: false },
      { feature: 'Parafraseador incluido', detectordeia: true, competitor: false },
      { feature: 'Caracteres por análisis', detectordeia: 'Hasta 15,000 (PRO)', competitor: 'Limitado por créditos' },
      { feature: 'Soporte técnico', detectordeia: 'Email prioritario (PRO)', competitor: 'Solo institucional' }
    ],

    whenToUseCompetitor: 'Turnitin es la mejor opción si necesitás detección de plagio además de IA, o si tu institución ya tiene licencia. Para detección de IA pura en español con presupuesto limitado, DetectorDeIA es superior.',

    pricing: {
      detectordeia: '$10/mes o $96/año (individual)',
      competitor: '$100-$300/año (solo institucional)'
    },

    faqs: [
      {
        question: '¿DetectorDeIA es tan preciso como Turnitin?',
        answer: 'Para textos en español, DetectorDeIA ofrece precisión superior debido a su optimización específica. Turnitin está diseñado principalmente para inglés y puede tener falsos positivos en español. Nuestro sistema multi-pasada con GPT-4o-mini y métricas lingüísticas avanzadas está entrenado específicamente para modismos y patrones del español de España y LATAM.'
      },
      {
        question: '¿Puedo usar DetectorDeIA sin licencia institucional?',
        answer: 'Sí, DetectorDeIA está diseñado para uso individual. Cualquier persona (profesor, estudiante, profesional) puede crear una cuenta gratis y usar el detector. El plan PRO cuesta solo $10/mes, sin necesidad de aprobación institucional.'
      },
      {
        question: '¿DetectorDeIA detecta plagio como Turnitin?',
        answer: 'No. DetectorDeIA se especializa SOLO en detectar si un texto fue generado por IA (ChatGPT, Claude, Gemini, etc.). No compara con bases de datos de trabajos anteriores ni páginas web. Si necesitás detección de plagio, Turnitin es la mejor opción. Si solo necesitás saber si un texto es de IA, DetectorDeIA es más económico y preciso en español.'
      },
      {
        question: '¿Qué ventajas tiene DetectorDeIA sobre Turnitin para profesores?',
        answer: 'Acceso inmediato sin trámites institucionales, precio individual accesible ($10/mes vs $100-$300/año), resultados instantáneos (vs 5-15 minutos), optimización para español con menor tasa de falsos positivos, y herramientas adicionales (Humanizador y Parafraseador) para enseñar a los estudiantes.'
      },
      {
        question: '¿Puedo usar DetectorDeIA si mi universidad usa Turnitin?',
        answer: 'Sí, son herramientas complementarias. Muchos profesores usan DetectorDeIA para verificación rápida de IA y Turnitin para la revisión final de plagio. DetectorDeIA es ideal para feedback rápido a estudiantes durante el proceso de escritura.'
      }
    ],

    cta: {
      text: 'Prueba DetectorDeIA gratis',
      url: '/detector?ref=vs-turnitin'
    }
  },

  {
    slug: 'quillbot',
    competitorName: 'QuillBot',
    competitorWebsite: 'https://quillbot.com',
    keywords: [
      'detector de ia vs quillbot',
      'quillbot detector de ia',
      'alternativa quillbot detector'
    ],

    title: 'DetectorDeIA vs QuillBot: Comparación Detector de IA 2025',
    description: 'Comparación entre DetectorDeIA y QuillBot AI Detector. Descubre cuál es mejor para detectar contenido generado por IA en español.',
    h1: 'DetectorDeIA vs QuillBot: ¿Cuál Detector de IA Elegir?',

    intro: 'QuillBot ofrece un detector de IA como parte de su suite de herramientas, pero está optimizado principalmente para inglés. DetectorDeIA es la alternativa española con mejor precisión para contenido en español.',

    whyBetter: [
      'Especialización 100% en español - QuillBot tiene precisión limitada en idiomas no ingleses',
      'Multi-pasada con GPT-3.5 + GPT-4o-mini vs análisis de una sola pasada',
      'Métricas lingüísticas avanzadas específicas para español',
      'Sin límite mensual de palabras en plan PRO (QuillBot tiene caps)',
      'Precio más económico: $10/mes vs $19.95/mes de QuillBot Premium',
      'Interfaz en español nativo, no traducida',
      'Mejor soporte para modismos de LATAM y España'
    ],

    comparisons: [
      { feature: 'Precio', detectordeia: '$10/mes', competitor: '$19.95/mes' },
      { feature: 'Optimización español', detectordeia: '100% nativo', competitor: 'Traducción automática' },
      { feature: 'Precisión en español', detectordeia: '95%', competitor: '70-80%' },
      { feature: 'Límite de palabras', detectordeia: 'Ilimitado (PRO)', competitor: '5,000 palabras/mes' },
      { feature: 'Modelos IA usados', detectordeia: 'GPT-3.5 + GPT-4o-mini', competitor: 'Modelo propietario' },
      { feature: 'Parafraseador', detectordeia: true, competitor: true },
      { feature: 'Humanizador', detectordeia: true, competitor: true },
      { feature: 'Grammar Checker', detectordeia: false, competitor: true },
      { feature: 'Plagiarism Checker', detectordeia: false, competitor: true },
      { feature: 'Soporte español nativo', detectordeia: true, competitor: false }
    ],

    whenToUseCompetitor: 'QuillBot es mejor si necesitás todas las herramientas en un solo lugar (grammar, plagio, parafraseo) y trabajás principalmente en inglés. Para detección de IA en español, DetectorDeIA es superior.',

    pricing: {
      detectordeia: '$10/mes o $96/año',
      competitor: '$19.95/mes o $99.95/año'
    },

    faqs: [
      {
        question: '¿Por qué DetectorDeIA es mejor que QuillBot para español?',
        answer: 'QuillBot fue diseñado para inglés y usa modelos de traducción para otros idiomas. DetectorDeIA está entrenado específicamente en patrones de IA en español, incluyendo modismos regionales de España, Argentina, México, Colombia, etc. Esto resulta en 95% de precisión vs 70-80% de QuillBot en español.'
      },
      {
        question: '¿DetectorDeIA tiene corrector gramatical como QuillBot?',
        answer: 'No. DetectorDeIA se especializa SOLO en detección de IA, humanización y parafraseo. No incluye corrector gramatical ni detector de plagio. Si necesitás esas features, QuillBot es mejor opción para inglés.'
      },
      {
        question: '¿El parafraseador de DetectorDeIA es mejor que QuillBot?',
        answer: 'Para textos en español, sí. Nuestro parafraseador tiene 5 modos optimizados para español (Estándar, Formal, Creativo, Simplificado, Académico) y respeta modismos regionales. El de QuillBot puede sonar artificial en español por ser traducción del inglés.'
      },
      {
        question: '¿Puedo migrar de QuillBot a DetectorDeIA?',
        answer: 'Sí, fácilmente. DetectorDeIA cubre las funciones de detección de IA, humanización y parafraseo. Si usabas QuillBot solo para estas features, DetectorDeIA te ahorra $9.95/mes con mejor calidad en español.'
      }
    ],

    cta: {
      text: 'Prueba DetectorDeIA gratis',
      url: '/detector?ref=vs-quillbot'
    }
  },

  {
    slug: 'smodin',
    competitorName: 'Smodin',
    competitorWebsite: 'https://smodin.io',
    keywords: [
      'detector de ia vs smodin',
      'smodin detector de ia',
      'alternativa smodin detector'
    ],

    title: 'DetectorDeIA vs Smodin: Comparación Detector de IA 2025',
    description: 'Comparación completa entre DetectorDeIA y Smodin AI Detector. Descubre cuál es mejor para detectar textos generados por IA en español.',
    h1: 'DetectorDeIA vs Smodin: ¿Cuál es el Mejor Detector?',

    intro: 'Smodin es una herramienta multi-idioma que incluye detector de IA, pero su enfoque generalista puede afectar la precisión. DetectorDeIA se especializa únicamente en detección de IA en español con precisión superior.',

    whyBetter: [
      'Especialización en español vs enfoque multi-idioma genérico',
      'Sistema multi-pasada (2-3 análisis) vs análisis único de Smodin',
      'Métricas lingüísticas avanzadas (perplejidad, diversidad léxica, etc.)',
      'Interfaz más limpia y enfocada vs Smodin con muchas features distractoras',
      'Precio transparente ($10/mes) vs modelo de créditos complejo',
      'Sin límites artificiales de caracteres por análisis',
      'Mejor detección de modismos regionales (LATAM + España)'
    ],

    comparisons: [
      { feature: 'Precio', detectordeia: '$10/mes transparente', competitor: 'Sistema de créditos variable' },
      { feature: 'Precisión en español', detectordeia: '95%', competitor: '75-85%' },
      { feature: 'Análisis por texto', detectordeia: 'Multi-pasada (2-3)', competitor: 'Una sola pasada' },
      { feature: 'Métricas avanzadas', detectordeia: '5 métricas lingüísticas', competitor: 'Básicas' },
      { feature: 'Caracteres por análisis', detectordeia: '15,000 (PRO)', competitor: 'Variable por créditos' },
      { feature: 'Idiomas soportados', detectordeia: 'Español (optimizado)', competitor: '100+ idiomas' },
      { feature: 'Velocidad', detectordeia: '< 5 segundos', competitor: '10-20 segundos' },
      { feature: 'Humanizador incluido', detectordeia: true, competitor: true },
      { feature: 'Parafraseador incluido', detectordeia: true, competitor: true },
      { feature: 'Interfaz', detectordeia: 'Simple y enfocada', competitor: 'Compleja con muchas features' }
    ],

    whenToUseCompetitor: 'Smodin puede ser útil si necesitás herramientas en múltiples idiomas (más de 100) o features adicionales como resumen de textos, traductor, etc. Para detección de IA pura en español, DetectorDeIA es más preciso y económico.',

    pricing: {
      detectordeia: '$10/mes o $96/año (ilimitado)',
      competitor: 'Sistema de créditos ($8-$29/mes)'
    },

    faqs: [
      {
        question: '¿Por qué DetectorDeIA es más preciso que Smodin en español?',
        answer: 'Smodin usa el mismo modelo para 100+ idiomas, lo que reduce precisión. DetectorDeIA está entrenado SOLO en español (España y LATAM), con prompts específicos para detectar modismos como "che", "pibe", "tío", etc. Esto resulta en 95% de precisión vs 75-85% de Smodin.'
      },
      {
        question: '¿El sistema de precios de DetectorDeIA es más simple que Smodin?',
        answer: 'Sí. Smodin usa créditos que varían según la feature usada (detector, humanizador, etc.), lo que complica el cálculo. DetectorDeIA tiene precio fijo: $10/mes = usos ilimitados de todas las herramientas. Sin sorpresas ni créditos que contar.'
      },
      {
        question: '¿DetectorDeIA tiene las mismas features que Smodin?',
        answer: 'No. Smodin tiene 15+ herramientas (traductor, resumen, chat, etc.). DetectorDeIA se enfoca en 3 herramientas principales: Detector de IA, Humanizador y Parafraseador. Si solo necesitás estas 3 en español, DetectorDeIA es mejor y más económico.'
      },
      {
        question: '¿Puedo usar DetectorDeIA para otros idiomas además de español?',
        answer: 'DetectorDeIA está optimizado SOLO para español. Si necesitás análisis en inglés, francés, alemán, etc., Smodin es mejor opción por su soporte multi-idioma.'
      }
    ],

    cta: {
      text: 'Prueba DetectorDeIA gratis',
      url: '/detector?ref=vs-smodin'
    }
  }
];
