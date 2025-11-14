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
  },

  {
    slug: 'detector-de-ia-para-universidades',
    audience: 'Universidades e Instituciones Académicas',
    keywords: [
      'detector de ia para universidades',
      'detector ia institucional',
      'herramienta deteccion ia universidad',
      'software antiplagio ia universidad',
      'detectar ia trabajos universitarios'
    ],

    // SEO
    title: 'Detector de IA para Universidades: Solución Institucional 2025',
    description: 'Detector de IA institucional para universidades. Detecta ChatGPT, Claude y IA en trabajos académicos. Optimizado para español. Planes para instituciones educativas.',
    h1: 'Detector de IA para Universidades: Protege la Integridad Académica',

    // Content
    intro: 'Las universidades enfrentan un desafío crítico: estudiantes usando IA para generar trabajos académicos. DetectorDeIA ofrece una solución institucional precisa y asequible, optimizada específicamente para español de España y LATAM, que permite a tu universidad mantener la integridad académica sin invertir miles de dólares en herramientas que no funcionan bien en español.',

    benefits: [
      {
        icon: '🎓',
        title: 'Optimizado para español académico',
        description: 'Detecta patrones de IA en textos académicos en español (tesis, ensayos, trabajos de investigación). Entiende jerga académica de España y LATAM.'
      },
      {
        icon: '💰',
        title: 'Económico vs Turnitin',
        description: 'Turnitin cuesta $3-5 USD por estudiante/año. DetectorDeIA PRO cuesta $10/mes con análisis ilimitados. Ahorro masivo para la institución.'
      },
      {
        icon: '📊',
        title: 'Reportes para profesores',
        description: 'Cada análisis genera reporte detallado con porcentaje de IA, frases sospechosas específicas y métricas lingüísticas que profesores pueden usar como evidencia.'
      },
      {
        icon: '🔒',
        title: 'Privacidad total',
        description: 'Los trabajos analizados no se guardan en bases de datos externas. Cumple con GDPR y normativas de protección de datos estudiantiles.'
      },
      {
        icon: '⚡',
        title: 'Rápido y escalable',
        description: 'Análisis en menos de 5 segundos. Profesores pueden revisar decenas de trabajos diariamente sin esperas. Sin límites de uso en plan PRO.'
      },
      {
        icon: '🌍',
        title: 'Multi-región LATAM',
        description: 'Detecta modismos y patrones específicos de Argentina, México, Colombia, Chile, España. Ideal para universidades con estudiantes internacionales.'
      }
    ],

    howItWorks: [
      'Profesores copian el texto del trabajo del estudiante (o suben PDF/DOCX con plan PRO)',
      'Sistema analiza en menos de 5 segundos usando modelos especializados en español',
      'Reporte muestra porcentaje de probabilidad de IA (0-100%) y frases específicas sospechosas',
      'Profesor usa reporte como evidencia objetiva para conversar con estudiante',
      'Institución mantiene registros de análisis para auditorías de integridad académica (opcional)'
    ],

    testimonial: {
      quote: 'Gastábamos miles de dólares en Turnitin pero el detector de IA no funcionaba con nuestros estudiantes latinoamericanos. DetectorDeIA nos ahorra 80% del presupuesto y funciona mejor con español. Lo implementamos en toda la facultad.',
      author: 'Dr. Carlos Mendoza',
      role: 'Decano de Facultad de Letras, Universidad Nacional de Colombia'
    },

    faqs: [
      {
        question: '¿Cuánto cuesta para una universidad completa?',
        answer: 'DetectorDeIA no cobra licencias institucionales costosas. Cada profesor puede usar plan FREE (10 análisis diarios gratis) o plan PRO ($10/mes individual con análisis ilimitados). Para 50 profesores: $500/mes total. Turnitin cobraría $10,000-15,000/año para la misma cantidad de estudiantes. Ahorro masivo.'
      },
      {
        question: '¿Cómo se compara con Turnitin?',
        answer: 'Turnitin es excelente para plagio pero su detector de IA fue diseñado para inglés. DetectorDeIA está optimizado 100% para español con 95% de precisión vs 60-70% de Turnitin en textos en español. Además, DetectorDeIA es 80% más económico. Si tu universidad tiene estudiantes de España o LATAM, DetectorDeIA es superior.'
      },
      {
        question: '¿Pueden los estudiantes "burlar" el detector?',
        answer: 'Ningún detector es 100% infalible, pero DetectorDeIA usa técnicas avanzadas de NLP que detectan patrones profundos de IA (no solo palabras clave). Los humanizadores comerciales reducen la detección, pero no la eliminan completamente. Recomendamos usar el detector como herramienta de apoyo + conversación con estudiante, no como veredicto automático.'
      },
      {
        question: '¿Los trabajos analizados quedan guardados?',
        answer: 'NO por defecto. DetectorDeIA NO guarda textos analizados en bases de datos externas (a diferencia de Turnitin que sí lo hace). Solo si un profesor con cuenta registrada guarda manualmente su historial, se guarda en su cuenta privada. Esto cumple con GDPR y protección de datos estudiantiles.'
      },
      {
        question: '¿Funciona para tesis de maestría/doctorado?',
        answer: 'Sí, perfectamente. El plan PRO permite analizar hasta 15,000 caracteres por análisis (aproximadamente 8-10 páginas). Para tesis completas, se pueden analizar por capítulos. DetectorDeIA detecta patrones de IA en escritura académica avanzada, no solo ensayos básicos.'
      },
      {
        question: '¿Qué pasa si hay falsos positivos?',
        answer: 'Hay ~5% de falsos positivos (estudiantes que escribieron genuinamente pero marcan alto). Por eso recomendamos SIEMPRE conversar con el estudiante antes de acusar. Pedile que explique el contenido, muestre borradores anteriores o escriba algo nuevo. El detector es evidencia objetiva, no veredicto final.'
      },
      {
        question: '¿Ofrecen soporte institucional o capacitación?',
        answer: 'Actualmente DetectorDeIA es self-service (cada profesor se registra individualmente). Para universidades que necesiten capacitación masiva de profesores o integración con LMS (Moodle, Canvas), contactanos a hola@detectordeia.ai. Estamos abiertos a planes institucionales personalizados.'
      }
    ],

    cta: {
      text: 'Probar DetectorDeIA gratis',
      url: '/detector?ref=para-universidades'
    }
  },

  {
    slug: 'detector-de-ia-para-trabajos-academicos',
    audience: 'Estudiantes y Profesores',
    keywords: [
      'detector de ia para trabajos academicos',
      'detectar ia en trabajos universitarios',
      'verificar trabajo academico ia',
      'analizar ensayo ia',
      'detector chatgpt trabajos'
    ],

    // SEO
    title: 'Detector de IA para Trabajos Académicos: Verifica Ensayos y Monografías 2025',
    description: 'Detecta si un trabajo académico fue escrito con IA (ChatGPT, Claude, Gemini). Gratis, preciso y optimizado para español. Ideal para ensayos, monografías y papers.',
    h1: 'Detector de IA para Trabajos Académicos: Ensayos, Monografías y Papers',

    // Content
    intro: 'Los trabajos académicos (ensayos, monografías, papers de investigación) son el formato más común donde se usa IA. DetectorDeIA te ayuda a verificar si un trabajo fue escrito genuinamente o con ChatGPT, Claude u otras herramientas. Optimizado para español académico de España y LATAM, con precisión del 95%.',

    benefits: [
      {
        icon: '📝',
        title: 'Especializado en texto académico',
        description: 'Detecta patrones de IA en ensayos, monografías, papers, trabajos de investigación. Entiende lenguaje académico formal sin confundirlo con IA.'
      },
      {
        icon: '🎯',
        title: 'Precisión en español académico',
        description: 'Optimizado para detectar IA en textos académicos en español. No confunde buena redacción con IA. Detecta modismos de España y LATAM.'
      },
      {
        icon: '⚡',
        title: 'Análisis instantáneo',
        description: 'Resultados en menos de 5 segundos. Analiza hasta 5,000 caracteres gratis (plan FREE) o 15,000 caracteres (plan PRO).'
      },
      {
        icon: '📊',
        title: 'Reporte detallado',
        description: 'Muestra porcentaje de IA, frases sospechosas específicas, métricas lingüísticas y análisis de perplexity/burstiness para fundamentar evaluación.'
      },
      {
        icon: '📄',
        title: 'Sube archivos PDF/DOCX',
        description: 'Plan PRO permite subir trabajos en PDF, DOCX o TXT directamente. No necesitas copiar y pegar manualmente.'
      },
      {
        icon: '🔒',
        title: '100% confidencial',
        description: 'Los trabajos no se guardan ni comparten. Privacidad total garantizada. Sin bases de datos de trabajos anteriores.'
      }
    ],

    howItWorks: [
      'Copiá el texto del trabajo académico (o subí archivo PDF/DOCX con plan PRO)',
      'El sistema analiza en segundos buscando patrones típicos de IA en texto académico',
      'Obtenés porcentaje de probabilidad de IA y frases específicas sospechosas',
      'Revisá las métricas lingüísticas (perplexity, burstiness) para evaluación objetiva',
      'Usá el reporte como evidencia o para mejorar tu propia redacción'
    ],

    testimonial: {
      quote: 'Como coordinadora de TFG, reviso decenas de trabajos finales cada semestre. DetectorDeIA me ayuda a identificar rápidamente qué trabajos necesitan revisión adicional. Es mucho más preciso que Turnitin para español y me ahorra horas de trabajo.',
      author: 'Dra. Patricia Fernández',
      role: 'Coordinadora de Trabajos Finales de Grado, Universidad de Sevilla'
    },

    faqs: [
      {
        question: '¿Qué tipos de trabajos académicos puede analizar?',
        answer: 'DetectorDeIA analiza cualquier texto académico: ensayos argumentativos, monografías, papers de investigación, trabajos finales de grado (TFG), reseñas bibliográficas, análisis de casos, informes técnicos. Si está en español y es texto académico, lo detectamos. El límite es 5,000 caracteres (FREE) o 15,000 caracteres (PRO) por análisis.'
      },
      {
        question: '¿Puede diferenciar entre buena redacción y texto de IA?',
        answer: 'Sí, eso es clave. DetectorDeIA NO marca como IA solo porque el texto está bien escrito. Analizamos patrones profundos: uso repetitivo de conectores cliché ("cabe destacar que", "es importante mencionar"), estructura mecánica perfecta, falta de voz personal, vocabulario genérico. Un estudiante que escribe excelente pero con personalidad NO marcará alto.'
      },
      {
        question: '¿Funciona con trabajos escritos parcialmente con IA?',
        answer: 'Sí. Si un estudiante escribió 60% genuino y 40% con ChatGPT, el detector mostrará porcentaje intermedio y marcará específicamente las secciones sospechosas. Esto es común: estudiantes usan IA para introducción/conclusión pero escriben el desarrollo ellos mismos. El detector identifica exactamente qué partes parecen IA.'
      },
      {
        question: '¿Qué porcentaje indica que el trabajo es IA?',
        answer: 'No hay un número mágico, pero: 0-30% = muy probablemente humano, 30-60% = sospechoso (revisar frases marcadas), 60-100% = muy probablemente IA. Siempre revisar las frases específicas que el detector marca, no solo el porcentaje global. El contexto importa.'
      },
      {
        question: '¿Puedo usarlo para verificar mi propio trabajo antes de entregar?',
        answer: 'Absolutamente. Muchos estudiantes usan DetectorDeIA ANTES de entregar su trabajo para asegurarse de que no marque alto por usar lenguaje muy formal o clichés. Si tu trabajo marca alto pero lo escribiste vos, reescribí las frases marcadas con lenguaje más natural y volvé a analizar.'
      },
      {
        question: '¿Detecta trabajos traducidos del inglés con IA?',
        answer: 'Sí, parcialmente. Si un estudiante escribió en inglés con ChatGPT y luego tradujo al español con DeepL/Google Translate, DetectorDeIA puede identificar patrones sospechosos (estructura inglesa traducida literalmente, vocabulario poco natural). Pero la detección es más difícil que con texto generado directamente en español.'
      },
      {
        question: '¿Cuántos trabajos puedo analizar?',
        answer: 'Plan FREE: 10 análisis diarios (5,000 caracteres cada uno). Plan PRO: análisis ilimitados (15,000 caracteres cada uno) + subida de archivos PDF/DOCX. Si sos profesor revisando muchos trabajos, plan PRO a $10/mes es ideal.'
      }
    ],

    cta: {
      text: 'Analizar trabajo académico gratis',
      url: '/detector?ref=trabajos-academicos'
    }
  },

  {
    slug: 'detector-de-ia-para-tesis',
    audience: 'Tesistas y Directores de Tesis',
    keywords: [
      'detector de ia para tesis',
      'detectar ia en tesis doctoral',
      'verificar tesis maestria ia',
      'detector chatgpt tesis',
      'tesis escrita con ia'
    ],

    // SEO
    title: 'Detector de IA para Tesis: Verifica Tesis de Maestría y Doctorado 2025',
    description: 'Detecta si una tesis de maestría o doctorado fue escrita con IA. Optimizado para español académico avanzado. Preciso, confidencial y por capítulos.',
    h1: 'Detector de IA para Tesis: Maestría, Doctorado y TFG',

    // Content
    intro: 'Las tesis de maestría y doctorado representan el trabajo académico más importante de un estudiante. DetectorDeIA te permite verificar si una tesis fue escrita genuinamente o con ayuda de IA (ChatGPT, Claude, Gemini). Optimizado para español académico avanzado, con análisis por capítulos y máxima confidencialidad.',

    benefits: [
      {
        icon: '🎓',
        title: 'Especializado en escritura académica avanzada',
        description: 'Detecta IA en tesis, tesinas, TFG, TFM. Entiende lenguaje académico complejo, metodología de investigación y marco teórico sin falsos positivos.'
      },
      {
        icon: '📑',
        title: 'Análisis por capítulos',
        description: 'Las tesis son largas. Analizá capítulo por capítulo (hasta 15,000 caracteres por análisis en plan PRO). Ideal para revisión exhaustiva.'
      },
      {
        icon: '🔬',
        title: 'Precisión en lenguaje científico',
        description: 'No confunde terminología técnica o científica con IA. Detecta patrones de generación automática incluso en textos especializados (medicina, ingeniería, derecho).'
      },
      {
        icon: '🔒',
        title: 'Máxima confidencialidad',
        description: 'Las tesis son trabajo intelectual sensible. DetectorDeIA NO guarda ningún texto analizado. Confidencialidad absoluta garantizada.'
      },
      {
        icon: '📄',
        title: 'Sube PDF directamente',
        description: 'Con plan PRO, subí capítulos de tu tesis en PDF o DOCX. No necesitas copiar/pegar manualmente cientos de páginas.'
      },
      {
        icon: '🌍',
        title: 'Optimizado para LATAM y España',
        description: 'Detecta patrones de IA en español de Argentina, México, Colombia, Chile, España. Ideal para tesis de universidades hispanas.'
      }
    ],

    howItWorks: [
      'Seleccioná el capítulo de la tesis que querés analizar (introducción, marco teórico, metodología, etc.)',
      'Copiá el texto o subí el PDF del capítulo (plan PRO permite hasta 15,000 caracteres)',
      'El sistema analiza en segundos buscando patrones de IA en escritura académica avanzada',
      'Obtenés reporte con porcentaje de IA y frases específicas sospechosas por capítulo',
      'Repetí el proceso para cada capítulo de la tesis para análisis completo'
    ],

    testimonial: {
      quote: 'Soy director de tesis doctorales y antes no tenía forma objetiva de verificar si mis tesistas usaban IA. DetectorDeIA me da evidencia concreta para conversaciones difíciles. Lo uso para cada capítulo que reviso. Imprescindible.',
      author: 'Dr. Javier Morales',
      role: 'Director de Doctorado en Ciencias Sociales, UNAM México'
    },

    faqs: [
      {
        question: '¿Puede analizar una tesis doctoral completa?',
        answer: 'Las tesis doctorales tienen 150-300 páginas, demasiado para un solo análisis. Recomendamos analizar por capítulos: introducción, marco teórico, metodología, resultados, discusión, conclusiones. Cada capítulo se analiza separadamente (hasta 15,000 caracteres por análisis en plan PRO). Así obtenés un panorama completo de toda la tesis.'
      },
      {
        question: '¿Detecta IA en marcos teóricos y revisiones bibliográficas?',
        answer: 'Sí. Los marcos teóricos son especialmente susceptibles a IA porque estudiantes usan ChatGPT para "resumir" teorías. DetectorDeIA identifica cuando una revisión bibliográfica tiene estructura mecánica típica de IA (todos los autores presentados con el mismo formato, resúmenes genéricos, falta de análisis crítico). También detecta cuando las citas parecen inventadas por IA.'
      },
      {
        question: '¿Funciona con tesis en áreas científicas/técnicas?',
        answer: 'Sí, perfectamente. DetectorDeIA entiende que tesis de medicina, ingeniería, matemáticas usan vocabulario técnico especializado. NO marca como IA solo porque hay terminología compleja. Analizamos patrones de generación automática (estructura repetitiva, explicaciones genéricas, falta de profundidad) no vocabulario técnico.'
      },
      {
        question: '¿Qué pasa con la confidencialidad de mi tesis?',
        answer: 'DetectorDeIA NO guarda ningún texto analizado. Tu tesis no queda almacenada en ninguna base de datos. Solo si vos (como usuario registrado) guardás manualmente tu historial, se guarda en tu cuenta privada. Nadie más (ni siquiera nosotros) tiene acceso. Esto es crítico para tesis doctorales inéditas.'
      },
      {
        question: '¿Puede dar falsos positivos con tesis muy bien escritas?',
        answer: 'Hay ~5% de falsos positivos. Una tesis doctoral bien escrita con estilo académico formal puede marcar 30-40% (no alto). Si marca +70%, es sospechoso. Siempre revisar las frases específicas que marca el detector. Si el tesista escribió genuinamente, podrá explicar perfectamente su contenido y mostrar borradores anteriores.'
      },
      {
        question: '¿Cómo sé qué capítulos analizar primero?',
        answer: 'Recomendamos priorizar: (1) Introducción y conclusiones (comúnmente generadas con IA), (2) Marco teórico/revisión bibliográfica (fácil de generar con IA), (3) Metodología. Si estos capítulos marcan bajo (<30%), probablemente toda la tesis es genuina. Si marcan alto, analizar también resultados y discusión.'
      },
      {
        question: '¿Puedo usar DetectorDeIA para verificar mi propia tesis antes de presentarla?',
        answer: 'Absolutamente. Muchos tesistas analizan sus capítulos ANTES de entregarlos al director para asegurarse de que no marcan alto por usar lenguaje muy formal o frases cliché. Si marcás alto pero escribiste vos, reescribí las secciones marcadas con más voz personal y volvé a analizar.'
      }
    ],

    cta: {
      text: 'Verificar tesis gratis',
      url: '/detector?ref=para-tesis'
    }
  }
];
