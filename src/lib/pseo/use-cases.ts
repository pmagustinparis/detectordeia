import { UseCasePage } from './types';

export const useCases: UseCasePage[] = [
  {
    slug: 'detector-de-ia-para-profesores',
    audience: 'Profesores y Docentes',
    keywords: [
      'detector de ia para profesores',
      'detector de ia para docentes',
      'como detectar si un alumno uso chatgpt',
      'detectar trabajos con ia',
      'herramienta para profesores detectar ia'
    ],

    // SEO
    title: 'Detector de IA para Profesores: Verifica Trabajos de Estudiantes 2025',
    description: 'Herramienta gratis para profesores y docentes. Detecta si tus alumnos usaron ChatGPT, Claude o IA en trabajos. Optimizado para español. Sin registro.',
    h1: 'Detector de IA para Profesores: Verifica la Autenticidad de Trabajos',

    // Content
    intro: 'Como profesor, necesitás saber si tus estudiantes están usando ChatGPT, Claude o herramientas de IA para hacer sus trabajos. DetectorDeIA te ayuda a identificar contenido generado por IA de forma rápida, precisa y gratuita, optimizado específicamente para español de España y LATAM.',

    benefits: [
      {
        icon: '🎯',
        title: 'Precisión en español',
        description: 'Detecta modismos y patrones de IA específicos del español (España, Argentina, México, Colombia, Chile). No confundas buena redacción con IA.'
      },
      {
        icon: '⚡',
        title: 'Resultados en segundos',
        description: 'Análisis instantáneo en menos de 5 segundos. No pierdas tiempo esperando. Ideal para revisar múltiples trabajos rápidamente.'
      },
      {
        icon: '📊',
        title: 'Reportes detallados',
        description: 'Obtén porcentaje de probabilidad, frases sospechosas específicas y métricas lingüísticas avanzadas para fundamentar tu evaluación.'
      },
      {
        icon: '💰',
        title: 'Gratis para empezar',
        description: 'Plan FREE con 10 análisis diarios sin registro. Plan PRO a solo $10/mes con análisis ilimitados, archivos PDF/DOCX y hasta 15,000 caracteres.'
      },
      {
        icon: '🔒',
        title: '100% privado',
        description: 'Los trabajos de tus estudiantes nunca se guardan ni comparten. Privacidad total garantizada. Sin bases de datos de trabajos anteriores.'
      },
      {
        icon: '✨',
        title: 'Incluye Humanizador',
        description: 'Enseñá a tus estudiantes cómo mejorar su redacción. El plan PRO incluye Humanizador y Parafraseador como herramienta educativa.'
      }
    ],

    howItWorks: [
      'Copiá el texto del trabajo del estudiante (o subí PDF/DOCX en plan PRO)',
      'Hacé clic en "Analizar" y esperá 5 segundos',
      'Obtené el porcentaje de probabilidad de IA (0-100%)',
      'Revisá las frases específicas que parecen generadas por IA',
      'Usá el reporte para conversar con el estudiante sobre integridad académica'
    ],

    testimonial: {
      quote: 'Antes usaba Turnitin pero el detector de IA no funcionaba bien con textos en español de mis alumnos argentinos. DetectorDeIA entiende perfectamente el español de LATAM y me ahorra tiempo. Lo uso todos los días.',
      author: 'María González',
      role: 'Profesora de Literatura, Universidad de Buenos Aires'
    },

    faqs: [
      {
        question: '¿Cómo puedo saber si mi estudiante usó ChatGPT?',
        answer: 'DetectorDeIA analiza el texto buscando patrones típicos de IA: frases cliché como "cabe destacar que", estructura mecánica perfecta, falta de errores naturales, vocabulario genérico sin personalidad. Si el análisis muestra +70% de probabilidad y marca múltiples frases sospechosas, es probable que usó IA. El plan PRO muestra exactamente qué frases son sospechosas.'
      },
      {
        question: '¿Es confiable para evaluar trabajos académicos?',
        answer: 'Sí, pero usalo como una herramienta de apoyo, no como veredicto absoluto. DetectorDeIA tiene 95% de precisión en español, pero ningún detector es 100% infalible. Recomendamos: (1) Usar el detector para identificar trabajos sospechosos, (2) Conversar con el estudiante, (3) Pedir que explique el contenido. El detector te da evidencia objetiva para la conversación.'
      },
      {
        question: '¿Puedo subir archivos PDF o Word directamente?',
        answer: 'Sí, en el plan PRO ($10/mes) podés subir archivos PDF, DOCX o TXT de hasta 10MB. El plan FREE solo permite pegar texto (hasta 5,000 caracteres). Con PRO analizás hasta 15,000 caracteres por archivo.'
      },
      {
        question: '¿Cuántos trabajos puedo analizar por día?',
        answer: 'Plan FREE: 10 análisis diarios sin registro (5,000 caracteres cada uno). Plan PRO: análisis ilimitados de hasta 15,000 caracteres cada uno. Si tenés que revisar muchos trabajos, el plan PRO a $10/mes es ideal.'
      },
      {
        question: '¿Los trabajos de mis estudiantes quedan guardados?',
        answer: 'NO. DetectorDeIA NO guarda ningún texto analizado. Solo usuarios registrados pueden guardar su propio historial de análisis en su cuenta privada. Los textos analizados sin registro se borran inmediatamente después del análisis. Privacidad total garantizada.'
      },
      {
        question: '¿Qué hago si un estudiante dice que no usó IA pero el detector marca alto?',
        answer: 'Pueden haber falsos positivos (5% de los casos). Recomendamos: (1) Pedile que explique el contenido en sus propias palabras, (2) Compará con trabajos anteriores del estudiante, (3) Pedile que escriba un párrafo nuevo sobre el tema frente a vos. Si escribió el trabajo genuinamente, podrá explicarlo sin problemas. El detector es una herramienta, no un juez.'
      },
      {
        question: '¿Funciona con textos en inglés u otros idiomas?',
        answer: 'DetectorDeIA está optimizado SOLO para español (España y LATAM). No funciona con inglés, francés u otros idiomas. Si necesitás detectar textos en inglés, recomendamos usar herramientas como GPTZero o Originality.ai.'
      }
    ],

    cta: {
      text: 'Probar el Detector gratis',
      url: '/detector?ref=para-profesores'
    }
  },

  {
    slug: 'detector-de-ia-para-estudiantes',
    audience: 'Estudiantes',
    keywords: [
      'detector de ia para estudiantes',
      'como saber si mi texto parece ia',
      'verificar que mi texto no sea ia',
      'pasar detector de ia',
      'humanizar texto para no ser detectado'
    ],

    // SEO
    title: 'Detector de IA para Estudiantes: Verifica tu Trabajo Antes de Entregar 2025',
    description: 'Gratis para estudiantes. Verifica que tu texto no parezca escrito por IA antes de entregar. Evita malentendidos con profesores. Optimizado para español.',
    h1: 'Detector de IA para Estudiantes: Asegurate que tu Trabajo No Parezca IA',

    // Content
    intro: '¿Escribiste tu trabajo pero te preocupa que parezca generado por IA? DetectorDeIA te permite verificar tu propio texto ANTES de entregarlo al profesor, para asegurarte de que no sea confundido con contenido de ChatGPT o Claude. Gratis, privado y en español.',

    benefits: [
      {
        icon: '✅',
        title: 'Verifica antes de entregar',
        description: 'Analizá tu trabajo antes de entregarlo al profesor. Si el detector marca alto, reescribí las partes sospechosas para evitar malentendidos.'
      },
      {
        icon: '🎓',
        title: 'Aprende a escribir mejor',
        description: 'El detector te muestra qué frases suenan "robóticas" o genéricas. Mejorá tu redacción evitando clichés como "cabe destacar que" o "es importante mencionar".'
      },
      {
        icon: '🔒',
        title: '100% privado',
        description: 'Tu texto nunca se guarda ni comparte. Nadie (ni siquiera nosotros) ve lo que analizás. Sin registro, sin cuenta, sin riesgo.'
      },
      {
        icon: '💸',
        title: 'Gratis para siempre',
        description: 'Plan FREE con 10 análisis diarios. Suficiente para verificar tus trabajos antes de entregarlos. Plan PRO a $10/mes si necesitás más.'
      },
      {
        icon: '✨',
        title: 'Humanizador incluido',
        description: 'Si usaste IA como ayuda (permitido por tu profesor), usá el Humanizador PRO para reescribir el texto y que suene más natural.'
      },
      {
        icon: '⚡',
        title: 'Resultados al instante',
        description: 'Menos de 5 segundos por análisis. Podés revisar todo tu trabajo en minutos antes de entregarlo.'
      }
    ],

    howItWorks: [
      'Escribí tu trabajo como siempre (o usá IA como ayuda inicial si tu profesor lo permite)',
      'Antes de entregar, copiá el texto en DetectorDeIA',
      'Hacé clic en "Analizar" y fijate el porcentaje',
      'Si marca más de 70%: reescribí las frases marcadas con tus propias palabras',
      'Volvé a analizar hasta que el porcentaje baje a menos de 40%',
      'Entrega tu trabajo con confianza sabiendo que no parecerá IA'
    ],

    testimonial: {
      quote: 'Escribí mi ensayo yo misma pero usé palabras muy formales y mi profesora sospechó que era IA. Ahora uso DetectorDeIA antes de entregar todo. Me ayuda a ver qué partes suenan muy "perfectas" y las reescribo más natural. Re útil.',
      author: 'Lucía Ramírez',
      role: 'Estudiante de Comunicación, Universidad Complutense de Madrid'
    },

    faqs: [
      {
        question: '¿Por qué mi texto marca alto si lo escribí yo?',
        answer: 'Puede pasar si usaste un estilo muy formal, vocabulario técnico, frases cliché ("cabe destacar que", "en conclusión") o estructura muy perfecta. La IA escribe así por defecto. Solución: reescribí las partes marcadas con un lenguaje más natural, como hablarías vos. Agregá opiniones personales, ejemplos concretos o incluso alguna "imperfección" natural.'
      },
      {
        question: '¿Puedo usar IA para ayudarme si mi profesor no me deja?',
        answer: 'NO recomendamos hacerlo si tu profesor lo prohíbe. Esto es una violación de integridad académica. DetectorDeIA es para VERIFICAR tu propio texto escrito por vos, no para "engañar" detectores. Si usaste IA sin permiso y tu profesor usa un detector, es probable que te descubran. Mejor escribir vos desde cero.'
      },
      {
        question: '¿El Humanizador me ayuda a "pasar" los detectores?',
        answer: 'El Humanizador está diseñado para reescribir texto que YA escribiste vos pero que por casualidad suena muy formal. NO está diseñado para "burlar" detectores si copiaste de ChatGPT. Si tu profesor prohíbe IA, no uses IA punto. Si tu profesor permite IA como ayuda inicial, entonces sí, el Humanizador te ayuda a personalizar el texto.'
      },
      {
        question: '¿Mi profesor puede ver que usé DetectorDeIA?',
        answer: 'NO. DetectorDeIA es completamente privado. No guardamos textos ni creamos ningún registro. Tu profesor no tiene forma de saber que analizaste tu texto acá. Usalo con tranquilidad para verificar tu trabajo antes de entregar.'
      },
      {
        question: '¿Qué porcentaje de IA es "seguro" para entregar?',
        answer: 'No hay un número mágico, pero generalmente: menos de 30% = muy seguro (parece humano), 30-60% = zona gris (puede generar sospechas), más de 70% = riesgoso (muy probable que tu profesor sospeche). Apuntá a menos de 40% reescribiendo las frases marcadas.'
      },
      {
        question: '¿Puedo analizar mi trabajo por partes?',
        answer: 'Sí. El plan FREE permite 5,000 caracteres por análisis (aproximadamente 2-3 páginas). Si tu trabajo es más largo, analizalo por secciones. El plan PRO permite hasta 15,000 caracteres (8-10 páginas) y podés subir archivos PDF/DOCX directamente.'
      },
      {
        question: '¿Qué hago si mi trabajo marca 80% pero lo escribí yo?',
        answer: 'Probablemente tu estilo de escritura es muy formal o estructurado. Solución: (1) Mirá qué frases específicas marcó el detector, (2) Reescribí esas frases con lenguaje más coloquial, (3) Agregá ejemplos personales o opiniones subjetivas, (4) Rompé la estructura muy "perfecta" (no sigas introducción-desarrollo-conclusión exacta), (5) Volvé a analizar hasta que baje.'
      }
    ],

    cta: {
      text: 'Verificar mi texto gratis',
      url: '/detector?ref=para-estudiantes'
    }
  }
];
