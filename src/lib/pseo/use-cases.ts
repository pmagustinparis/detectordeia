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
        description: 'Plan FREE con 10 análisis diarios sin registro. Plan PRO a solo $6.99/mes con análisis ilimitados, archivos PDF/DOCX y hasta 15,000 caracteres.'
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
        answer: 'Sí, en el plan PRO ($6.99/mes) podés subir archivos PDF, DOCX o TXT de hasta 10MB. El plan FREE solo permite pegar texto (hasta 5,000 caracteres). Con PRO analizás hasta 15,000 caracteres por archivo.'
      },
      {
        question: '¿Cuántos trabajos puedo analizar por día?',
        answer: 'Plan FREE: 10 análisis diarios sin registro (5,000 caracteres cada uno). Plan PRO: análisis ilimitados de hasta 15,000 caracteres cada uno. Si tenés que revisar muchos trabajos, el plan PRO a $6.99/mes es ideal.'
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
        description: 'Plan FREE con 10 análisis diarios. Suficiente para verificar tus trabajos antes de entregarlos. Plan PRO a $6.99/mes si necesitás más.'
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
        description: 'Turnitin cuesta $3-5 USD por estudiante/año. DetectorDeIA PRO cuesta $6.99/mes con análisis ilimitados. Ahorro masivo para la institución.'
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
        answer: 'DetectorDeIA no cobra licencias institucionales costosas. Cada profesor puede usar plan FREE (10 análisis diarios gratis) o plan PRO ($6.99/mes individual con análisis ilimitados). Para 50 profesores: $349/mes total. Turnitin cobraría $10,000-15,000/año para la misma cantidad de estudiantes. Ahorro masivo.'
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
        answer: 'Plan FREE: 10 análisis diarios (5,000 caracteres cada uno). Plan PRO: análisis ilimitados (15,000 caracteres cada uno) + subida de archivos PDF/DOCX. Si sos profesor revisando muchos trabajos, plan PRO a $6.99/mes es ideal.'
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
  },

  {
    slug: 'detector-de-ia-para-ensayos',
    audience: 'Estudiantes y Profesores',
    keywords: [
      'detector de ia para ensayos',
      'detectar ensayo escrito con chatgpt',
      'verificar ensayo ia',
      'detector ia ensayos argumentativos',
      'como saber si un ensayo es de ia'
    ],

    // SEO
    title: 'Detector de IA para Ensayos: Verifica Ensayos Argumentativos 2025',
    description: 'Detecta si un ensayo fue escrito con IA (ChatGPT, Claude). Gratis, preciso y optimizado para español. Ideal para ensayos argumentativos, críticos y académicos.',
    h1: 'Detector de IA para Ensayos: Argumentativos, Críticos y Académicos',

    // Content
    intro: 'Los ensayos son el tipo de trabajo más común que estudiantes generan con IA. DetectorDeIA te ayuda a verificar si un ensayo argumentativo, crítico o académico fue escrito genuinamente o con ChatGPT, Claude u otras herramientas. Optimizado para español con precisión del 95%, detecta patrones típicos de IA en ensayos.',

    benefits: [
      {
        icon: '✍️',
        title: 'Especializado en estructura de ensayo',
        description: 'Detecta patrones de IA en introducción, desarrollo argumentativo, conclusión. Identifica cuando la estructura es demasiado "perfecta" o mecánica.'
      },
      {
        icon: '🎯',
        title: 'Identifica clichés de IA',
        description: 'Detecta frases típicas de ChatGPT: "cabe destacar que", "es importante mencionar", "en conclusión se puede afirmar". Estos conectores delatan texto de IA.'
      },
      {
        icon: '⚡',
        title: 'Resultados inmediatos',
        description: 'Análisis en menos de 5 segundos. Perfecto para profesores que revisan muchos ensayos o estudiantes verificando antes de entregar.'
      },
      {
        icon: '📊',
        title: 'Análisis de argumentación',
        description: 'Evalúa si los argumentos tienen profundidad genuina o son genéricos típicos de IA. La IA genera argumentos superficiales y predecibles.'
      },
      {
        icon: '💡',
        title: 'Mejora tu redacción',
        description: 'Estudiantes: usá el detector para ver qué frases suenan "robóticas" y aprender a escribir con más voz personal y menos clichés.'
      },
      {
        icon: '🔒',
        title: '100% confidencial',
        description: 'Tu ensayo no se guarda ni comparte. Privacidad total. Sin bases de datos. Perfecto para ensayos sensibles o trabajos finales.'
      }
    ],

    howItWorks: [
      'Copiá el texto del ensayo completo (introducción + desarrollo + conclusión)',
      'El sistema analiza estructura argumentativa, conectores, vocabulario y patrones de IA',
      'Obtenés porcentaje de probabilidad de IA y frases específicas sospechosas',
      'Si sos estudiante: reescribí las frases marcadas para que suenen más naturales',
      'Si sos profesor: usá el reporte para conversar con el estudiante sobre el ensayo'
    ],

    testimonial: {
      quote: 'Mis alumnos de bachillerato escriben ensayos todas las semanas. Antes no tenía forma de saber si usaban ChatGPT. DetectorDeIA me muestra exactamente qué ensayos revisar en detalle. Me ahorra tiempo y me da evidencia objetiva para las conversaciones.',
      author: 'Prof. Ana Martínez',
      role: 'Profesora de Lengua y Literatura, Colegio San José (Madrid)'
    },

    faqs: [
      {
        question: '¿Qué tipos de ensayos puede detectar?',
        answer: 'DetectorDeIA funciona con cualquier tipo de ensayo: argumentativo, expositivo, crítico, narrativo, académico, ensayo de opinión, ensayo comparativo. Si está en español y tiene estructura de ensayo (intro-desarrollo-conclusión), lo detectamos. Funciona tanto con ensayos de secundaria como universitarios.'
      },
      {
        question: '¿Por qué los ensayos son tan fáciles de generar con IA?',
        answer: 'Los ensayos tienen estructura predecible (introducción, 3 párrafos de desarrollo, conclusión) que ChatGPT domina perfectamente. La IA genera conectores formales, argumentos genéricos y conclusiones obvias. DetectorDeIA identifica exactamente estos patrones: conectores cliché repetitivos, argumentos superficiales sin ejemplos concretos, vocabulario formal pero genérico.'
      },
      {
        question: '¿Puede un estudiante escribir bien y NO marcar como IA?',
        answer: 'Absolutamente. DetectorDeIA NO marca como IA solo porque el ensayo está bien escrito. Un ensayo genuino bien escrito tiene: voz personal, ejemplos concretos específicos, opiniones subjetivas, alguna "imperfección" natural, conectores variados (no siempre los mismos clichés). Un ensayo de IA tiene: voz genérica, ejemplos obvios, opiniones predecibles, perfección mecánica, conectores cliché.'
      },
      {
        question: '¿Qué frases delatan que un ensayo es de ChatGPT?',
        answer: 'Frases típicas de ChatGPT en ensayos: "Cabe destacar que...", "Es importante mencionar que...", "En este sentido, se puede afirmar...", "A lo largo de este ensayo se ha demostrado...", "En conclusión, es fundamental...", "No obstante, es necesario considerar...". Si un ensayo tiene 5+ de estas frases, alta probabilidad de IA.'
      },
      {
        question: '¿Puedo verificar mi propio ensayo antes de entregarlo?',
        answer: 'Sí, muchos estudiantes lo hacen. Si escribiste tu ensayo pero usaste lenguaje muy formal, el detector te ayuda a ver qué partes suenan "robóticas". Reescribí esas partes con lenguaje más natural, agregá ejemplos personales concretos, usá conectores variados. Volvé a analizar hasta que marque bajo (<30%).'
      },
      {
        question: '¿Detecta ensayos traducidos del inglés?',
        answer: 'Parcialmente. Si un estudiante generó el ensayo en inglés con ChatGPT y lo tradujo al español con DeepL, DetectorDeIA puede identificar estructura sintáctica inglesa traducida literalmente y vocabulario poco natural. Pero es más difícil de detectar que un ensayo generado directamente en español con ChatGPT.'
      },
      {
        question: '¿Qué porcentaje indica que el ensayo es de IA?',
        answer: 'Para ensayos: 0-25% = muy probablemente humano, 25-50% = sospechoso (revisar), 50-75% = probablemente IA con ediciones menores, 75-100% = casi seguro IA directo de ChatGPT. Ensayos de IA pura suelen marcar 80-95%. Siempre revisar las frases específicas marcadas, no solo el número.'
      }
    ],

    cta: {
      text: 'Verificar ensayo gratis',
      url: '/detector?ref=para-ensayos'
    }
  },

  {
    slug: 'detector-de-ia-para-tareas',
    audience: 'Profesores y Padres',
    keywords: [
      'detector de ia para tareas',
      'detectar si tarea es de chatgpt',
      'verificar tarea escolar ia',
      'como saber si mi hijo uso ia',
      'detector ia deberes escolares'
    ],

    // SEO
    title: 'Detector de IA para Tareas Escolares: Verifica Deberes y Trabajos 2025',
    description: 'Detecta si una tarea escolar fue hecha con IA (ChatGPT). Gratis, fácil de usar, optimizado para español. Ideal para profesores de primaria, secundaria y bachillerato.',
    h1: 'Detector de IA para Tareas Escolares: Deberes, Trabajos y Actividades',

    // Content
    intro: 'Estudiantes de todas las edades (desde primaria hasta bachillerato) están usando ChatGPT para hacer tareas escolares. DetectorDeIA ayuda a profesores y padres a verificar si una tarea fue hecha genuinamente o con IA. Gratis, fácil de usar y optimizado para español escolar de España y LATAM.',

    benefits: [
      {
        icon: '🏫',
        title: 'Para todos los niveles escolares',
        description: 'Funciona con tareas de primaria, secundaria, bachillerato. Desde resúmenes simples hasta trabajos complejos de historia, ciencias, literatura.'
      },
      {
        icon: '👨‍🏫',
        title: 'Fácil para profesores',
        description: 'No necesitas ser experto en tecnología. Copiás la tarea del alumno, hacés clic y obtenés el resultado en 5 segundos. Simple y rápido.'
      },
      {
        icon: '📚',
        title: 'Detecta todo tipo de tareas',
        description: 'Resúmenes, redacciones, análisis de texto, trabajos de investigación, respuestas a preguntas, informes, comentarios de texto.'
      },
      {
        icon: '💰',
        title: 'Gratis para profesores',
        description: 'Plan FREE con 10 análisis diarios sin registro. Suficiente para revisar las tareas sospechosas de tu clase cada día. Plan PRO a solo $6.99/mes para análisis ilimitados.'
      },
      {
        icon: '🎯',
        title: 'Identifica patrones escolares de IA',
        description: 'ChatGPT tiene patrones específicos cuando estudiantes le piden "haz mi tarea de historia/ciencias". DetectorDeIA los identifica perfectamente.'
      },
      {
        icon: '👪',
        title: 'Útil para padres',
        description: 'Padres pueden verificar si sus hijos realmente hicieron la tarea o usaron ChatGPT. Herramienta educativa para conversar sobre integridad académica.'
      }
    ],

    howItWorks: [
      'Copiá el texto de la tarea del estudiante (resumen, redacción, trabajo, etc.)',
      'Hacé clic en "Analizar" y esperá 5 segundos mientras el sistema revisa patrones de IA',
      'Obtenés porcentaje de probabilidad de IA y frases específicas sospechosas',
      'Si marca alto (+70%): conversá con el estudiante y pedile que explique el contenido',
      'Usá el detector como herramienta educativa, no como castigo automático'
    ],

    testimonial: {
      quote: 'Enseño Historia en secundaria y muchos alumnos empezaron a entregar tareas perfectas de la noche a la mañana. DetectorDeIA me confirmó que usaban ChatGPT. Ahora lo uso para todas las tareas escritas. Me ayuda a educar sobre integridad académica.',
      author: 'Prof. Roberto Díaz',
      role: 'Profesor de Historia, IES Miguel de Cervantes (Barcelona)'
    },

    faqs: [
      {
        question: '¿Funciona con tareas de niños pequeños (primaria)?',
        answer: 'Sí, pero con precaución. Niños de primaria escriben con errores ortográficos, gramática imperfecta y lenguaje simple. Si una tarea de un niño de 10 años tiene gramática perfecta, vocabulario avanzado y cero errores, es sospechoso. DetectorDeIA identificará ese contraste. Pero siempre conversar con el niño antes de acusar.'
      },
      {
        question: '¿Qué tipos de tareas escolares detecta?',
        answer: 'Cualquier tarea escrita en español: resúmenes de libros, redacciones, trabajos de investigación, análisis de poemas, respuestas a preguntas de ciencias/historia, informes de laboratorio, comentarios de texto, reseñas. Si es texto escrito para la escuela, lo detectamos.'
      },
      {
        question: '¿Cómo sé si mi hijo/alumno usó ChatGPT para la tarea?',
        answer: 'Señales clave: (1) Tarea perfecta pero el alumno escribe mal normalmente, (2) Vocabulario muy avanzado para su edad, (3) Cero errores ortográficos (niños SIEMPRE tienen algún error), (4) Estructura muy formal y perfecta, (5) Frases cliché como "cabe destacar que" (niños no hablan así). DetectorDeIA identifica todos estos patrones.'
      },
      {
        question: '¿Puede haber falsos positivos con alumnos que escriben muy bien?',
        answer: 'Sí, especialmente con estudiantes de bachillerato avanzados. Un alumno brillante que lee mucho puede escribir excelente y marcar 30-40% (no alto). Si marca +75%, es sospechoso. Siempre pedile al alumno que explique el contenido. Si lo escribió genuinamente, podrá explicarlo sin problemas.'
      },
      {
        question: '¿Qué hago si la tarea marca alto pero mi hijo dice que la hizo?',
        answer: 'Conversá con calma. Pedile que explique el contenido con sus propias palabras. Preguntale cómo llegó a ciertas conclusiones. Mirá si tiene borradores o apuntes. Si genuinamente la hizo, podrá explicar todo. Si usó ChatGPT, tendrá dificultad para explicar detalles. Usá el detector como inicio de conversación, no como acusación.'
      },
      {
        question: '¿Los padres pueden usar esto en casa?',
        answer: 'Absolutamente. Padres pueden verificar las tareas de sus hijos ANTES de que las entreguen, para asegurarse de que las hicieron genuinamente. Es una herramienta educativa para enseñar sobre integridad académica y responsabilidad. El plan FREE (10 análisis diarios) es suficiente para la mayoría de familias.'
      },
      {
        question: '¿Cuántas tareas puedo analizar por día?',
        answer: 'Plan FREE: 10 análisis diarios (5,000 caracteres cada uno, suficiente para tareas escolares normales). Plan PRO: análisis ilimitados (15,000 caracteres cada uno). Si sos profesor con muchos alumnos, plan PRO a $6.99/mes te permite revisar todas las tareas que necesites.'
      }
    ],

    cta: {
      text: 'Verificar tarea gratis',
      url: '/detector?ref=para-tareas'
    }
  },

  {
    slug: 'detector-de-ia-para-empresas',
    audience: 'Empresas y Equipos de Marketing',
    keywords: [
      'detector de ia para empresas',
      'verificar contenido empresarial ia',
      'detector ia copywriting',
      'control calidad contenido ia',
      'detector chatgpt empresas'
    ],

    // SEO
    title: 'Detector de IA para Empresas: Verifica Contenido y Copywriting 2025',
    description: 'Detector de IA para empresas. Verifica contenido de marketing, copywriting, emails y comunicaciones. Asegura calidad y autenticidad en español.',
    h1: 'Detector de IA para Empresas: Control de Calidad de Contenido',

    // Content
    intro: 'Las empresas necesitan verificar que el contenido creado por equipos internos o freelancers no sea 100% generado con IA sin revisión humana. DetectorDeIA ayuda a equipos de marketing, comunicación y contenido a mantener estándares de calidad, asegurando que el contenido tenga voz de marca auténtica, no genérica de ChatGPT.',

    benefits: [
      {
        icon: '🎯',
        title: 'Mantiene voz de marca auténtica',
        description: 'Asegura que el contenido tenga personalidad de tu marca, no voz genérica de IA. Los clientes detectan cuando un texto es robótico y pierden confianza.'
      },
      {
        icon: '✅',
        title: 'Control de calidad de freelancers',
        description: 'Verifica que copywriters/redactores freelancers no entreguen texto 100% de ChatGPT sin editar. Protege la inversión en contenido.'
      },
      {
        icon: '📊',
        title: 'Análisis antes de publicar',
        description: 'Revisa artículos de blog, emails, landing pages antes de publicar. Evita contenido genérico que no convierte ni genera engagement.'
      },
      {
        icon: '🚀',
        title: 'Optimización SEO real',
        description: 'Google penaliza contenido 100% IA sin valor agregado. Asegura que tu contenido tenga insights únicos, no solo texto generado automáticamente.'
      },
      {
        icon: '💰',
        title: 'ROI de contenido',
        description: 'Contenido genérico de IA no convierte. Asegura que el contenido publicado tenga la calidad necesaria para generar leads y ventas.'
      },
      {
        icon: '🔒',
        title: 'Confidencialidad empresarial',
        description: 'Tu contenido no se guarda ni comparte. Privacidad total para información sensible de producto, estrategia o comunicaciones internas.'
      }
    ],

    howItWorks: [
      'Tu equipo crea contenido (artículos, emails, copy de landing pages, comunicados)',
      'Antes de publicar, analizas el contenido en DetectorDeIA para verificar nivel de IA',
      'Obtenés porcentaje de IA y frases específicas que suenan genéricas/robóticas',
      'Si marca alto (+60%): pedí al creador que agregue voz de marca, ejemplos específicos, insights únicos',
      'Reanaliza hasta que el contenido tenga autenticidad y personalidad de marca'
    ],

    testimonial: {
      quote: 'Contratamos redactores freelance para nuestro blog corporativo. Algunos entregaban textos que sonaban genéricos. DetectorDeIA nos ayudó a identificar cuáles eran 100% ChatGPT y ahora exigimos que todo marque menos de 40%. La calidad mejoró notablemente.',
      author: 'Laura Sánchez',
      role: 'Head of Content, SaaS empresa B2B (España)'
    },

    faqs: [
      {
        question: '¿Por qué las empresas necesitan detectar IA en su contenido?',
        answer: 'Tres razones: (1) Voz de marca: contenido genérico de IA no refleja tu marca, suena igual que tu competencia, (2) SEO: Google penaliza contenido 100% IA sin valor agregado, tu ranking baja, (3) Conversión: contenido robótico no genera confianza ni engagement. Los clientes notan la diferencia entre contenido genuino y IA genérica. Inviertes en contenido para diferenciarte, no para sonar como todos.'
      },
      {
        question: '¿Cómo detectar si un freelancer entregó contenido 100% ChatGPT?',
        answer: 'Señales: (1) Texto perfecto pero genérico sin insights específicos de tu industria, (2) Frases cliché ("cabe destacar que", "es importante mencionar"), (3) Estructura mecánica perfecta (intro-3 puntos-conclusión), (4) Falta de voz de marca o personalidad, (5) Ejemplos obvios sin profundidad. DetectorDeIA identifica todos estos patrones y muestra porcentaje exacto de IA.'
      },
      {
        question: '¿Está mal usar IA para crear contenido empresarial?',
        answer: 'NO está mal usar IA como herramienta inicial. Está mal publicar contenido 100% IA sin editar ni agregar valor humano. Uso recomendado: (1) IA genera borrador inicial, (2) Humano agrega insights específicos, casos de uso reales, voz de marca, ejemplos concretos, (3) Resultado final marca <40% en detector. IA es asistente, no reemplazo de estrategia de contenido.'
      },
      {
        question: '¿Qué tipos de contenido empresarial puedo analizar?',
        answer: 'Cualquier contenido escrito en español: artículos de blog corporativo, copy de landing pages, emails de marketing, newsletters, comunicados de prensa, descripciones de producto, casos de estudio, whitepapers, scripts de video, posts de redes sociales. Si es contenido que representa tu marca, debería ser verificado.'
      },
      {
        question: '¿Cuánto contenido puedo analizar por mes?',
        answer: 'Plan FREE: 10 análisis diarios (5,000 caracteres cada uno). Para equipos: plan PRO individual $6.99/mes (análisis ilimitados, 15,000 caracteres). Si tu equipo analiza mucho contenido diariamente, varios miembros pueden tener cuentas PRO. No hay planes empresariales especiales por ahora, pero puedes contactarnos para volúmenes grandes.'
      },
      {
        question: '¿El detector ayuda a mejorar el contenido?',
        answer: 'Sí, indirectamente. DetectorDeIA muestra exactamente qué frases suenan genéricas/robóticas. Esto ayuda a tu equipo a: (1) Identificar qué secciones necesitan más personalidad de marca, (2) Evitar clichés típicos de IA, (3) Agregar ejemplos específicos donde falta profundidad. Úsalo como checklist de calidad antes de publicar.'
      },
      {
        question: '¿Qué porcentaje de IA es aceptable para contenido empresarial?',
        answer: 'Depende del objetivo: Blog corporativo de liderazgo de pensamiento: <30% (necesita insights únicos), Descripciones de producto: <40% (necesita diferenciación), Emails de marketing: <35% (necesita personalización), Comunicados de prensa: <25% (necesita autenticidad). Contenido genérico no genera engagement ni conversiones. Apunta a que tu contenido suene humano y específico.'
      }
    ],

    cta: {
      text: 'Verificar contenido empresarial',
      url: '/detector?ref=para-empresas'
    }
  },

  {
    slug: 'detector-de-ia-para-contenido-web',
    audience: 'Creadores de Contenido y SEO',
    keywords: [
      'detector de ia para contenido web',
      'verificar articulos seo ia',
      'detector ia contenido online',
      'control calidad articulos web',
      'detector chatgpt seo'
    ],

    // SEO
    title: 'Detector de IA para Contenido Web: Verifica Artículos SEO 2025',
    description: 'Detector de IA para contenido web y artículos SEO. Evita penalizaciones de Google. Asegura calidad y valor agregado en español.',
    h1: 'Detector de IA para Contenido Web: Artículos SEO y Páginas',

    // Content
    intro: 'Google penaliza contenido 100% generado con IA que no aporta valor único. Si publicas artículos SEO, guías o páginas web creadas con ChatGPT sin edición humana, tu ranking caerá. DetectorDeIA te ayuda a verificar que tu contenido web tenga el nivel de calidad necesario para posicionar y aportar valor real a usuarios.',

    benefits: [
      {
        icon: '🔍',
        title: 'Evita penalizaciones de Google',
        description: 'Google detecta contenido 100% IA sin valor agregado y lo penaliza. Verifica que tu contenido web tenga suficiente edición humana e insights únicos.'
      },
      {
        icon: '📈',
        title: 'Mejora posicionamiento SEO',
        description: 'Contenido con análisis profundo, ejemplos específicos y voz única posiciona mejor. Detecta qué artículos necesitan más profundidad antes de publicar.'
      },
      {
        icon: '✍️',
        title: 'Optimiza artículos antes de publicar',
        description: 'Analiza artículos SEO, guías, tutoriales antes de publicar. Identifica secciones genéricas que necesitan más información específica o ejemplos reales.'
      },
      {
        icon: '🎯',
        title: 'Diferenciación de competencia',
        description: 'Tu competencia también usa IA. Si publicas contenido genérico idéntico al resto, no rankeas. Asegura que tu contenido tenga ángulo único.'
      },
      {
        icon: '⚡',
        title: 'Análisis rápido de múltiples artículos',
        description: 'Revisa decenas de artículos en minutos. Perfecto para editores SEO que gestionan múltiples redactores o contenido generado a escala.'
      },
      {
        icon: '💡',
        title: 'Guía de mejora de contenido',
        description: 'El detector muestra exactamente qué frases suenan genéricas. Usalo como checklist para agregar profundidad, datos específicos y voz propia.'
      }
    ],

    howItWorks: [
      'Crea tu artículo web/SEO (con IA como borrador inicial o escrito desde cero)',
      'Antes de publicar, analiza el contenido completo en DetectorDeIA',
      'Revisa el porcentaje de IA y las frases específicas marcadas como genéricas',
      'Agrega profundidad a secciones genéricas: datos específicos, ejemplos reales, casos de uso, opiniones basadas en experiencia',
      'Reanaliza hasta que marque <30% (ideal para contenido SEO de calidad)'
    ],

    testimonial: {
      quote: 'Manejo 15 sitios de nicho con contenido SEO. Antes publicaba artículos de ChatGPT con ediciones mínimas. Google me penalizó. Ahora uso DetectorDeIA para asegurarme de que todo marque menos de 30%. Mi tráfico orgánico se recuperó en 3 meses.',
      author: 'Carlos Ruiz',
      role: 'SEO Specialist & Publisher de Contenido (México)'
    },

    faqs: [
      {
        question: '¿Google realmente penaliza contenido generado con IA?',
        answer: 'Google no penaliza contenido solo porque fue creado con IA. Penaliza contenido de baja calidad sin valor agregado, sea IA o humano. Pero contenido 100% IA tiende a ser genérico, superficial, sin insights únicos = baja calidad. Google lo detecta (no directamente con detectores, sino por señales de calidad: tiempo en página bajo, sin backlinks, sin engagement). Si tu contenido IA aporta valor real, está bien. Si es genérico, te penaliza.'
      },
      {
        question: '¿Qué porcentaje de IA es seguro para SEO?',
        answer: 'Para contenido SEO que quieres que rankee: menos de 30% es ideal. 30-50% es zona gris (puede funcionar si el contenido tiene valor único). Más de 60% es riesgoso (probablemente muy genérico). La clave no es el porcentaje, sino el valor: ¿tu artículo tiene información que no está en otros 100 artículos sobre el tema? ¿Tiene datos específicos, casos reales, opiniones expertas? Si solo repite lo que todos dicen, Google no lo va a rankear.'
      },
      {
        question: '¿Cómo mejorar un artículo que marca alto en IA?',
        answer: 'Estrategia probada: (1) Identifica las secciones que DetectorDeIA marca como genéricas, (2) Agrega datos específicos con fuentes (estadísticas, estudios, casos reales), (3) Incluye ejemplos concretos basados en experiencia o investigación original, (4) Agrega tu opinión/análisis (qué significa esto para el lector, por qué importa), (5) Usa lenguaje conversacional, no formal cliché, (6) Reanaliza hasta <30%. El contenido ahora tiene profundidad real.'
      },
      {
        question: '¿Funciona para detectar contenido de otros idiomas traducido?',
        answer: 'Parcialmente. Si alguien genera contenido en inglés con ChatGPT y lo traduce al español con DeepL, DetectorDeIA puede identificar estructura sintáctica inglesa traducida literalmente y vocabulario poco natural. Pero es más difícil de detectar que contenido generado directamente en español. Si sospechas que un redactor hace esto, el detector te dará señales (estructura mecánica, frases poco naturales en español).'
      },
      {
        question: '¿Puedo usar IA para escribir artículos SEO?',
        answer: 'Sí, pero con estrategia correcta: (1) Usa IA para borrador inicial y research, (2) Agrega tu investigación original, datos específicos, ejemplos reales, (3) Inyecta tu voz y perspectiva única, (4) Edita para que fluya natural, no robótico, (5) Resultado final debe marcar <30% en detector. IA es herramienta de productividad, no atajo para contenido de baja calidad. Los sitios que solo publican IA sin editar están muriendo en rankings.'
      },
      {
        question: '¿Cuántos artículos puedo analizar?',
        answer: 'Plan FREE: 10 análisis diarios (5,000 caracteres cada uno). Para artículos largos (2,000+ palabras), plan PRO a $6.99/mes permite hasta 15,000 caracteres por análisis + análisis ilimitados. Si publicas contenido a escala (10+ artículos semanales), plan PRO es esencial. Puedes analizar por secciones si el artículo es muy largo.'
      },
      {
        question: '¿El detector reemplaza herramientas SEO como Surfer o Clearscope?',
        answer: 'No, son complementarias. Surfer/Clearscope optimizan para palabras clave y estructura SEO. DetectorDeIA verifica calidad y autenticidad del contenido. Workflow ideal: (1) Usa Surfer para keywords/estructura, (2) Escribe contenido con IA + edición humana, (3) Usa DetectorDeIA para verificar que no sea genérico, (4) Publica con confianza. Todas son herramientas para contenido SEO ganador.'
      }
    ],

    cta: {
      text: 'Verificar artículo web gratis',
      url: '/detector?ref=contenido-web'
    }
  },

  {
    slug: 'detector-de-ia-para-blogs',
    audience: 'Bloggers y Creadores de Contenido',
    keywords: [
      'detector de ia para blogs',
      'verificar articulos blog ia',
      'detector chatgpt blog',
      'como saber si un blog es ia',
      'detector ia posts blog'
    ],

    // SEO
    title: 'Detector de IA para Blogs: Verifica Artículos y Posts 2025',
    description: 'Detector de IA para blogs y artículos. Mantén autenticidad y voz personal. Evita contenido genérico. Ideal para bloggers en español.',
    h1: 'Detector de IA para Blogs: Mantén tu Voz Auténtica',

    // Content
    intro: 'Los blogs exitosos tienen voz personal auténtica que conecta con lectores. Si publicas artículos 100% generados con ChatGPT, tu blog sonará genérico como miles de otros. DetectorDeIA ayuda a bloggers a verificar que su contenido mantenga personalidad única, no voz robótica de IA que aleja a la audiencia.',

    benefits: [
      {
        icon: '🎨',
        title: 'Mantiene tu voz personal',
        description: 'Tu blog crece por tu perspectiva única, no por contenido genérico. Asegura que cada artículo tenga tu estilo, opiniones y experiencias personales.'
      },
      {
        icon: '🤝',
        title: 'Conecta con tu audiencia',
        description: 'Lectores siguen blogs por la personalidad del autor. Contenido genérico de IA no genera lealtad ni comunidad. Verifica que tu contenido sea auténtico.'
      },
      {
        icon: '📊',
        title: 'Mejora engagement y retención',
        description: 'Artículos con historias personales, opiniones genuinas y ejemplos reales generan más comentarios, shares y lectores recurrentes que IA genérica.'
      },
      {
        icon: '🔥',
        title: 'Diferenciación en tu nicho',
        description: 'Tu competencia también usa IA. Si publicas lo mismo que todos, no destacas. Asegura que tu blog tenga ángulo único y voz reconocible.'
      },
      {
        icon: '💰',
        title: 'Monetización sostenible',
        description: 'Blogs genéricos no generan ingresos a largo plazo (AdSense, afiliados, productos). Audiencia leal paga. Audiencia que detecta IA se va.'
      },
      {
        icon: '✅',
        title: 'Control de calidad de colaboradores',
        description: 'Si tienes guest writers o redactores freelance, verifica que no entreguen contenido 100% ChatGPT que daña la reputación de tu blog.'
      }
    ],

    howItWorks: [
      'Escribe tu artículo de blog (puedes usar IA como borrador inicial para investigación)',
      'Antes de publicar, analiza el artículo completo en DetectorDeIA',
      'Revisa el porcentaje de IA y las secciones marcadas como genéricas/robóticas',
      'Agrega tu voz personal: anécdotas, opiniones, ejemplos de tu experiencia, humor, estilo conversacional',
      'Reanaliza hasta que marque <25% (blogs personales deben sonar humanos)'
    ],

    testimonial: {
      quote: 'Tengo un blog de viajes que monetizo con afiliados. Cuando empecé a usar ChatGPT para escribir más rápido, mi tasa de rebote subió y comentarios bajaron. Los lectores notaban que perdí mi voz. DetectorDeIA me ayuda a mantener mi estilo mientras uso IA para research inicial.',
      author: 'Sofía Méndez',
      role: 'Travel Blogger (Argentina) - @ViajesSofi'
    },

    faqs: [
      {
        question: '¿Por qué mi blog necesita voz auténtica y no puedo usar IA directamente?',
        answer: 'Los blogs exitosos crecen por conexión personal, no solo por información. Razones: (1) Diferenciación: hay mil blogs en tu nicho, tu voz única es tu ventaja competitiva, (2) Lealtad: lectores siguen personas, no contenido genérico intercambiable, (3) Engagement: historias personales generan comentarios/shares, IA genérica no, (4) Monetización: marcas pagan por influencia auténtica, no por contenido robótico, (5) SEO: Google premia contenido único con engagement alto. IA es herramienta, no reemplazo de tu voz.'
      },
      {
        question: '¿Qué porcentaje de IA es aceptable para artículos de blog?',
        answer: 'Para blogs personales: <25% es ideal (tu voz debe dominar). 25-40% es aceptable si agregaste suficientes anécdotas/opiniones personales. Más de 50% es riesgoso (probablemente suena genérico). Para blogs informativos/educativos: <35% está bien si el contenido tiene insights únicos. La clave: ¿tu artículo suena como TÚ escribiendo, o como cualquier blog genérico del internet?'
      },
      {
        question: '¿Cómo agregar voz personal a un borrador de ChatGPT?',
        answer: 'Estrategia probada para bloggers: (1) Usa ChatGPT para estructura inicial y research, (2) Reescribe la intro con tu historia personal relacionada al tema, (3) Agrega anécdotas tuyas en cada sección (qué te pasó, qué aprendiste), (4) Incluye tus opiniones honestas (incluso si son controversiales), (5) Usa tu estilo conversacional (habla como escribes a un amigo), (6) Agrega humor, sarcasmo o emoción donde corresponde, (7) Reanaliza hasta <25%. Ahora el artículo suena como tú.'
      },
      {
        question: '¿Los lectores realmente notan cuando un blog usa IA?',
        answer: 'Sí, absolutamente. Señales que delatan IA a lectores experimentados: (1) Falta de historias personales o ejemplos concretos, (2) Tono muy formal/perfecto para un blog casual, (3) Frases cliché ("cabe destacar que", "es importante mencionar"), (4) Estructura mecánica repetitiva (intro-3 puntos-conclusión idéntica en todos los posts), (5) Falta de opiniones fuertes o perspectivas únicas. Lectores lo notan inconscientemente: el blog "no conecta", "suena aburrido", "perdió su esencia". Resultado: dejan de leer.'
      },
      {
        question: '¿Puedo usar IA para investigación pero escribir yo el artículo?',
        answer: 'Absolutamente, ese es el uso ideal de IA para bloggers. Workflow recomendado: (1) Usa ChatGPT para listar puntos clave del tema, (2) Investiga facts/estadísticas con IA, (3) Escribe el artículo TÚ con tu voz, incorporando esa información, (4) Agrega tus experiencias personales y opiniones, (5) Analiza con DetectorDeIA (debería marcar <20% porque escribiste genuinamente). IA es asistente de investigación, no ghostwriter.'
      },
      {
        question: '¿Qué hago si un guest writer me envía contenido 100% ChatGPT?',
        answer: 'Protocolo recomendado: (1) Analiza todos los guest posts antes de publicar, (2) Si marca +70%, pide al writer que reescriba agregando ejemplos específicos/voz personal, (3) Establece policy clara: "Guest posts deben marcar <40% en detector de IA", (4) Si el writer no puede/quiere mejorar, rechaza el artículo. Publicar contenido genérico daña la reputación de tu blog. Es mejor menos posts pero con calidad.'
      },
      {
        question: '¿Cuántos artículos de blog puedo analizar?',
        answer: 'Plan FREE: 10 análisis diarios (5,000 caracteres cada uno, suficiente para artículos de blog estándar de 1,000-1,500 palabras). Plan PRO: $6.99/mes con análisis ilimitados de hasta 15,000 caracteres (artículos de 3,000-4,000 palabras). Si publicas múltiples posts semanales, plan PRO es ideal. Puedes analizar por secciones si el artículo es muy largo.'
      }
    ],

    cta: {
      text: 'Verificar artículo de blog gratis',
      url: '/detector?ref=para-blogs'
    }
  },

  {
    slug: 'detector-de-ia-para-periodistas',
    audience: 'Periodistas y Medios de Comunicación',
    keywords: [
      'detector de ia para periodistas',
      'verificar articulos periodisticos ia',
      'detector chatgpt periodismo',
      'integridad periodistica ia',
      'detector ia noticias'
    ],

    // SEO
    title: 'Detector de IA para Periodistas: Verifica Artículos y Noticias 2025',
    description: 'Detector de IA para periodistas y medios. Mantén integridad periodística. Verifica que reportajes tengan investigación genuina. Optimizado para español.',
    h1: 'Detector de IA para Periodistas: Integridad y Credibilidad',

    // Content
    intro: 'La credibilidad periodística depende de investigación genuina, no de contenido generado automáticamente. DetectorDeIA ayuda a periodistas y medios de comunicación a verificar que sus artículos, reportajes y noticias tengan trabajo periodístico real, no texto genérico de ChatGPT que daña la confianza del público.',

    benefits: [
      {
        icon: '📰',
        title: 'Protege credibilidad periodística',
        description: 'Lectores detectan cuando un artículo es genérico sin investigación real. Asegura que tus piezas tengan reporteo genuino, fuentes verificadas y análisis propio.'
      },
      {
        icon: '🔍',
        title: 'Verifica trabajo de redactores',
        description: 'Si gestionas equipo de redacción, verifica que artículos tengan investigación real. Evita que redactores entreguen texto 100% ChatGPT sin reporteo.'
      },
      {
        icon: '⚡',
        title: 'Control de calidad editorial',
        description: 'Analiza artículos antes de publicar. Identifica piezas que necesitan más fuentes, contexto o investigación original antes de que salgan al aire.'
      },
      {
        icon: '🎯',
        title: 'Mantiene estándares éticos',
        description: 'El periodismo requiere verificación de hechos y reporteo original. IA genera contenido sin verificar fuentes ni investigar. Asegura integridad editorial.'
      },
      {
        icon: '💼',
        title: 'Reputación del medio',
        description: 'Medios que publican contenido genérico pierden audiencia y credibilidad. Protege la reputación de tu publicación con control de calidad riguroso.'
      },
      {
        icon: '🔒',
        title: 'Confidencialidad de investigaciones',
        description: 'Tus artículos e investigaciones no se guardan. Privacidad total para reportajes sensibles, investigaciones en curso o contenido embargado.'
      }
    ],

    howItWorks: [
      'Redactas tu artículo periodístico con investigación, entrevistas y fuentes verificadas',
      'Antes de publicar, analizas el artículo en DetectorDeIA',
      'Obtenés porcentaje de IA y verificas que el texto no sea genérico sin reporteo',
      'Si marca alto (+50%): agregá más citas directas, contexto original, análisis propio basado en investigación',
      'Publicás con confianza sabiendo que el artículo tiene trabajo periodístico genuino'
    ],

    testimonial: {
      quote: 'Dirijo la redacción digital de un diario regional. Algunos redactores jóvenes empezaron a usar ChatGPT para "agilizar" notas. DetectorDeIA nos ayuda a identificar qué artículos necesitan más reporteo antes de publicar. Protege nuestra credibilidad.',
      author: 'Miguel Ángel Torres',
      role: 'Editor Jefe, Diario El Observador (Uruguay)'
    },

    faqs: [
      {
        question: '¿Los periodistas pueden usar IA para escribir artículos?',
        answer: 'IA puede ayudar con ESTRUCTURA y RESEARCH inicial, pero el reporteo debe ser humano. Uso ético: (1) IA sugiere ángulos/estructura, (2) Periodista hace investigación real (entrevistas, verificación de fuentes, análisis), (3) Periodista escribe con su voz integrando reporteo, (4) Resultado final marca <30% (mayoría es reporteo original). NUNCA usar IA para generar quotes falsas, inventar fuentes o reemplazar investigación. Eso viola ética periodística.'
      },
      {
        question: '¿Qué porcentaje de IA es aceptable en periodismo?',
        answer: 'Depende del tipo de pieza: Reportajes de investigación: <20% (requiere trabajo periodístico profundo), Noticias de último momento: <35% (contexto rápido pero verificado), Artículos de opinión: <30% (análisis personal basado en hechos), Notas informativas: <40% (datos + contexto). Piezas genéricas sin fuentes verificadas o investigación original NO son periodismo, son content mill. El detector ayuda a mantener estándares.'
      },
      {
        question: '¿Cómo distinguir entre artículo periodístico genuino y IA genérica?',
        answer: 'Artículo periodístico genuino tiene: (1) Citas directas de fuentes identificables, (2) Datos específicos con contexto verificable, (3) Múltiples fuentes/perspectivas, (4) Análisis basado en investigación (no opinión genérica), (5) Detalles concretos (lugares, fechas, nombres). IA genérica tiene: frases vagas, "expertos dicen" sin nombres, generalizaciones sin datos, estructura predecible, falta de contexto específico. DetectorDeIA identifica estos patrones.'
      },
      {
        question: '¿El detector ayuda a verificar noticias falsas generadas con IA?',
        answer: 'Parcialmente. DetectorDeIA identifica si un texto fue generado con IA, pero NO verifica si los hechos son verdaderos. Para verificación de hechos, necesitas fact-checking tradicional (verificar fuentes, contrastar datos, buscar evidencia). El detector ayuda a identificar artículos sospechosos que NO tienen reporteo genuino, pero no reemplaza verificación periodística de contenido.'
      },
      {
        question: '¿Qué hacer si un redactor entrega artículo 100% ChatGPT?',
        answer: 'Protocolo editorial recomendado: (1) Rechazar el artículo, (2) Explicar que periodismo requiere investigación real, no texto generado, (3) Dar oportunidad de rehacer con reporteo genuino (entrevistas, fuentes, verificación), (4) Si es reincidente, considerar medidas disciplinarias. Publicar contenido sin reporteo daña credibilidad del medio. Estándares éticos no son negociables.'
      },
      {
        question: '¿Los lectores confían menos en medios que usan IA?',
        answer: 'Sí, según estudios recientes. Lectores valoran investigación periodística genuina. Si detectan que un medio publica contenido genérico sin reporteo, pierden confianza y migran a medios con estándares más altos. Transparencia es clave: si usas IA para research, divúlgalo. Si el artículo tiene reporteo original, los lectores lo notan y valoran. Credibilidad es tu activo más importante.'
      },
      {
        question: '¿Cuántos artículos puedo analizar?',
        answer: 'Plan FREE: 10 análisis diarios (5,000 caracteres, artículos cortos). Para redacciones: plan PRO a $6.99/mes individual (análisis ilimitados, 15,000 caracteres). Si tu medio publica volumen alto diariamente, varios editores pueden tener cuentas PRO. Para redacciones grandes que necesiten plan institucional, contactanos a hola@detectordeia.ai.'
      }
    ],

    cta: {
      text: 'Verificar artículo periodístico',
      url: '/detector?ref=para-periodistas'
    }
  },

  {
    slug: 'detector-de-ia-para-editores',
    audience: 'Editores y Correctores de Texto',
    keywords: [
      'detector de ia para editores',
      'verificar textos editoriales ia',
      'control calidad editorial ia',
      'detector chatgpt edicion',
      'detector ia manuscritos'
    ],

    // SEO
    title: 'Detector de IA para Editores: Verifica Manuscritos y Textos 2025',
    description: 'Detector de IA para editores y correctores. Verifica autenticidad de manuscritos, artículos y contenido editorial. Control de calidad en español.',
    h1: 'Detector de IA para Editores: Control de Calidad Editorial',

    // Content
    intro: 'Los editores necesitan verificar que el contenido que publican tenga voz auténtica del autor, no sea texto genérico de IA. DetectorDeIA ayuda a editores editoriales, correctores y gestores de contenido a mantener estándares de calidad, identificando textos que necesitan más trabajo humano antes de publicación.',

    benefits: [
      {
        icon: '📚',
        title: 'Verifica autenticidad de manuscritos',
        description: 'Identifica si un autor envió manuscrito generado con IA sin edición. Protege la calidad editorial de tu catálogo o publicación.'
      },
      {
        icon: '✍️',
        title: 'Control de calidad de autores',
        description: 'Si trabajas con múltiples autores/colaboradores, verifica que cada texto tenga voz genuina del autor, no contenido genérico intercambiable.'
      },
      {
        icon: '🎯',
        title: 'Identifica textos que necesitan reescritura',
        description: 'El detector muestra exactamente qué secciones suenan genéricas. Usalo para dar feedback específico a autores sobre qué mejorar.'
      },
      {
        icon: '📊',
        title: 'Mantiene estándares editoriales',
        description: 'Asegura que todo contenido publicado cumpla con estándares de calidad. Contenido genérico daña reputación editorial a largo plazo.'
      },
      {
        icon: '💡',
        title: 'Guía para autores',
        description: 'Usa el detector como herramienta educativa. Muestra a autores qué partes necesitan más profundidad, voz personal o desarrollo editorial.'
      },
      {
        icon: '🔒',
        title: 'Confidencialidad de manuscritos',
        description: 'Manuscritos y textos en revisión no se guardan. Privacidad total para contenido inédito, propuestas editoriales o material sensible.'
      }
    ],

    howItWorks: [
      'Recibes manuscrito, artículo o texto de autor/colaborador',
      'Analizas el contenido en DetectorDeIA antes de proceso editorial',
      'Revisas porcentaje de IA y secciones específicas marcadas como genéricas',
      'Das feedback al autor: "Secciones X, Y, Z necesitan más voz personal/profundidad"',
      'Autor reescribe, reenvía, reanaliza hasta que el texto tenga calidad editorial requerida'
    ],

    testimonial: {
      quote: 'Soy editora de una revista literaria digital. Recibimos muchas colaboraciones y algunas eran claramente ChatGPT. DetectorDeIA nos permite identificarlas rápido y pedir reescrituras. Mantenemos la calidad editorial sin ofender a autores genuinos.',
      author: 'Elena Vargas',
      role: 'Editora Jefe, Revista Literaria Palabras (Chile)'
    },

    faqs: [
      {
        question: '¿Qué tipos de textos editoriales puedo analizar?',
        answer: 'Cualquier contenido editorial en español: manuscritos de libros, artículos para revistas, ensayos, columnas de opinión, relatos, crónicas, contenido de blogs editoriales, newsletters, guías editoriales, whitepapers. Si es texto que va a publicarse bajo estándares editoriales, deberías verificarlo.'
      },
      {
        question: '¿Cómo dar feedback a un autor sin ofenderlo?',
        answer: 'Enfoque constructivo: "Hemos revisado tu texto con nuestras herramientas de control de calidad. Algunas secciones (X, Y, Z) suenan muy genéricas/formales y necesitan más de tu voz personal y ejemplos específicos. ¿Podrías desarrollar esas partes con más profundidad?" No menciones "IA" directamente si no estás seguro. Enfoca en calidad editorial, no en acusación.'
      },
      {
        question: '¿El detector reemplaza el trabajo editorial tradicional?',
        answer: 'NO. El detector es una HERRAMIENTA adicional, no reemplazo de edición. Workflow recomendado: (1) Análisis inicial con detector para identificar textos problemáticos, (2) Edición tradicional (estructura, estilo, coherencia), (3) Corrección (gramática, ortografía), (4) Reanálisis si hubo reescrituras. El detector complementa tu criterio editorial, no lo reemplaza.'
      },
      {
        question: '¿Qué porcentaje de IA es aceptable en contenido editorial?',
        answer: 'Depende del tipo: Ensayos/artículos de opinión: <25% (requiere voz personal fuerte), Ficción literaria: <15% (voz del autor es esencial), Artículos informativos: <35% (insights originales requeridos), Contenido corporativo/institucional: <40% (voz de marca necesaria). Textos editoriales genéricos sin personalidad NO cumplen estándares de calidad.'
      },
      {
        question: '¿Puedo usar el detector para evaluar colaboradores freelance?',
        answer: 'Sí, es un uso común. Workflow: (1) Establece estándares claros: "Todos los textos deben marcar <35% en detector de IA", (2) Analiza submissions antes de aceptarlas, (3) Si marca alto, da oportunidad de reescritura, (4) Si colaborador entrega consistentemente textos genéricos, considera terminar relación. Protege calidad editorial de tu publicación.'
      },
      {
        question: '¿El detector funciona con textos literarios/creativos?',
        answer: 'Sí, pero interpretar resultados requiere criterio. Textos literarios genuinos pueden marcar 20-30% si el autor usa lenguaje muy pulido. Señales clave para ficción generada con IA: (1) Diálogos genéricos sin personalidad de personajes, (2) Descripciones cliché sin detalles sensoriales únicos, (3) Tramas predecibles sin giros creativos, (4) Falta de voz narrativa distintiva. El detector + tu criterio editorial = evaluación completa.'
      },
      {
        question: '¿Cuántos textos puedo analizar?',
        answer: 'Plan FREE: 10 análisis diarios (5,000 caracteres, capítulos cortos/artículos). Plan PRO: $6.99/mes con análisis ilimitados (15,000 caracteres, capítulos largos). Para editoriales/publicaciones que procesan volumen alto, múltiples editores pueden tener cuentas PRO. Puedes analizar manuscritos largos por capítulos/secciones.'
      }
    ],

    cta: {
      text: 'Verificar texto editorial gratis',
      url: '/detector?ref=para-editores'
    }
  },

  {
    slug: 'detector-de-ia-argentina',
    audience: 'Usuarios de Argentina',
    keywords: [
      'detector de ia argentina',
      'detector chatgpt argentina',
      'detector ia español argentina',
      'herramienta detectar ia argentina',
      'detector de inteligencia artificial argentina'
    ],

    // SEO
    title: 'Detector de IA Argentina: Detecta ChatGPT en Español Argentino 2025',
    description: 'Detector de IA optimizado para Argentina. Detecta modismos argentinos (che, vos, boludo). Preciso para español rioplatense. Gratis y sin registro.',
    h1: 'Detector de IA para Argentina: Español Rioplatense',

    // Content
    intro: 'DetectorDeIA está optimizado específicamente para español argentino (rioplatense). A diferencia de detectores diseñados para inglés o español genérico, detectamos patrones de IA en textos que usan voseo, modismos argentinos y expresiones típicas de Argentina. Ideal para estudiantes, profesores y profesionales argentinos.',

    benefits: [
      {
        icon: '🇦🇷',
        title: 'Optimizado para español argentino',
        description: 'Detecta IA en textos con voseo (vos, tenés, hacés), modismos (che, boludo, pibe) y expresiones argentinas. No confunde argentinismos con IA.'
      },
      {
        icon: '🎓',
        title: 'Ideal para universidades argentinas',
        description: 'Funciona perfecto con trabajos de UBA, UNC, UNLP, UTN y todas las universidades argentinas. Entiende jerga académica local.'
      },
      {
        icon: '⚡',
        title: 'Detecta ChatGPT en español rioplatense',
        description: 'ChatGPT puede generar texto con voseo, pero tiene patrones detectables. Identificamos cuando un texto argentino fue generado con IA.'
      },
      {
        icon: '💰',
        title: 'Precios accesibles para Argentina',
        description: 'Plan FREE gratis con 10 análisis diarios. Plan PRO a solo USD $6.99/mes (aproximadamente ARS según tipo de cambio). Sin costos ocultos.'
      },
      {
        icon: '🏫',
        title: 'Para profesores y estudiantes argentinos',
        description: 'Profesores verifican trabajos de alumnos. Estudiantes revisan sus textos antes de entregar. Gratis y fácil de usar sin registro.'
      },
      {
        icon: '🔒',
        title: 'Privacidad total',
        description: 'Tus textos no se guardan ni comparten. Sin bases de datos. Privacidad absoluta para trabajos académicos y contenido profesional.'
      }
    ],

    howItWorks: [
      'Copiá el texto que querés analizar (trabajo, ensayo, artículo, lo que sea)',
      'Pegalo en DetectorDeIA y hacé clic en "Analizar"',
      'En 5 segundos obtenés el porcentaje de IA y frases sospechosas',
      'Si marca alto, revisá las secciones marcadas y reescribí con más voz personal',
      'Usá el detector para mantener calidad y autenticidad en tus textos'
    ],

    testimonial: {
      quote: 'Soy profe en la UBA y mis alumnos usan mucho ChatGPT. DetectorDeIA entiende perfecto el español argentino, no marca como IA solo porque usan "che" o "boludo". Me ahorra tiempo y me da evidencia objetiva para charlar con los pibes.',
      author: 'Martín Fernández',
      role: 'Docente de Comunicación, Universidad de Buenos Aires'
    },

    faqs: [
      {
        question: '¿Por qué necesito un detector optimizado para español argentino?',
        answer: 'Los detectores de IA entrenados en inglés o español genérico pueden fallar con argentinismos. DetectorDeIA fue entrenado específicamente con textos argentinos: voseo (vos tenés, vos hacés), modismos (che, boludo, pibe, quilombo, laburo), lunfardo y expresiones rioplatenses. Esto evita falsos positivos cuando un argentino escribe genuinamente usando su dialecto.'
      },
      {
        question: '¿Funciona con textos que usan voseo?',
        answer: 'Sí, perfectamente. DetectorDeIA NO marca como IA solo porque un texto usa voseo. Analizamos patrones profundos de generación automática, no dialectos regionales. Un texto genuino escrito por un argentino con voseo marcará bajo. Un texto de ChatGPT generado con voseo mostrará patrones típicos de IA que detectamos.'
      },
      {
        question: '¿ChatGPT puede escribir en español argentino?',
        answer: 'ChatGPT puede imitar voseo y algunos modismos argentinos si se lo pedís, pero los textos tienen patrones detectables: (1) Uso inconsistente de voseo (mezcla vos/tú), (2) Modismos forzados o mal usados, (3) Estructura genérica con argentinismos superficiales, (4) Falta de naturalidad en expresiones coloquiales. DetectorDeIA identifica estos patrones.'
      },
      {
        question: '¿Funciona para trabajos universitarios en Argentina?',
        answer: 'Sí, es ideal para eso. Trabajamos con textos académicos de UBA, UNC, UNLP, UTN, Universidad de Rosario, etc. Detectamos IA en ensayos, monografías, tesis, trabajos prácticos. El plan FREE (10 análisis diarios) es suficiente para estudiantes. Profesores con muchos alumnos pueden usar plan PRO a USD $6.99/mes.'
      },
      {
        question: '¿Cuánto cuesta en pesos argentinos?',
        answer: 'Plan FREE: completamente gratis, 10 análisis diarios, 5,000 caracteres por análisis. Plan PRO: USD $6.99/mes (equivalente en ARS según tipo de cambio oficial del día de pago). Se puede pagar con tarjeta de crédito/débito internacional. No aceptamos Mercado Pago por ahora, solo tarjetas internacionales (Visa, Mastercard).'
      },
      {
        question: '¿Los profesores argentinos pueden usarlo para revisar trabajos?',
        answer: 'Absolutamente. Muchos docentes de universidades y colegios secundarios argentinos usan DetectorDeIA para identificar qué trabajos necesitan revisión adicional. El plan FREE alcanza para revisar trabajos sospechosos (10 por día). Si sos profe con muchos alumnos, plan PRO da análisis ilimitados. Protegé la integridad académica sin gastar fortunas en Turnitin.'
      },
      {
        question: '¿Qué pasa si mi texto tiene muchas palabras argentinas?',
        answer: 'No hay problema. DetectorDeIA está entrenado con español argentino. Palabras como "che", "boludo", "pibe", "quilombo", "laburo", "fiaca", "chamuyar", "morfar", "birra" NO hacen que tu texto marque como IA. Analizamos patrones de generación automática, no regionalismo. Escribí con tu dialecto argentino sin preocupaciones.'
      }
    ],

    cta: {
      text: 'Probar detector gratis',
      url: '/detector?ref=argentina'
    }
  },

  {
    slug: 'detector-de-ia-mexico',
    audience: 'Usuarios de México',
    keywords: [
      'detector de ia mexico',
      'detector chatgpt mexico',
      'detector ia español mexico',
      'herramienta detectar ia mexico',
      'detector de inteligencia artificial mexico'
    ],

    // SEO
    title: 'Detector de IA México: Detecta ChatGPT en Español Mexicano 2025',
    description: 'Detector de IA optimizado para México. Detecta modismos mexicanos y español de México. Preciso, gratis y sin registro. Ideal para estudiantes y profesores.',
    h1: 'Detector de IA para México: Español Mexicano',

    // Content
    intro: 'DetectorDeIA está optimizado para español mexicano. Detectamos patrones de IA en textos que usan modismos, expresiones y vocabulario típico de México sin confundirlos con contenido genuino. Ideal para estudiantes de UNAM, IPN, Tec de Monterrey y todas las universidades mexicanas, así como profesionales y creadores de contenido.',

    benefits: [
      {
        icon: '🇲🇽',
        title: 'Optimizado para español mexicano',
        description: 'Detecta IA en textos con modismos mexicanos (güey, chido, padre, neta) y expresiones locales. No confunde mexicanismos con IA.'
      },
      {
        icon: '🎓',
        title: 'Ideal para universidades mexicanas',
        description: 'Funciona perfecto con trabajos de UNAM, IPN, Tec de Monterrey, UAM, UDG. Entiende jerga académica y expresiones estudiantiles mexicanas.'
      },
      {
        icon: '⚡',
        title: 'Detecta ChatGPT en español de México',
        description: 'ChatGPT puede imitar modismos mexicanos, pero tiene patrones detectables. Identificamos cuando un texto mexicano fue generado con IA.'
      },
      {
        icon: '💰',
        title: 'Precios accesibles para México',
        description: 'Plan FREE gratis con 10 análisis diarios. Plan PRO a USD $6.99/mes (aproximadamente MXN según tipo de cambio). Sin costos ocultos ni sorpresas.'
      },
      {
        icon: '🏫',
        title: 'Para profes y estudiantes mexicanos',
        description: 'Maestros verifican tareas de alumnos. Estudiantes revisan sus textos antes de entregar. Gratis, rápido y sin necesidad de registro.'
      },
      {
        icon: '🔒',
        title: 'Privacidad garantizada',
        description: 'Tus textos no se guardan. Sin bases de datos. Privacidad total para trabajos académicos, contenido profesional o material sensible.'
      }
    ],

    howItWorks: [
      'Copia el texto que quieras analizar (tarea, ensayo, artículo, trabajo)',
      'Pégalo en DetectorDeIA y dale clic a "Analizar"',
      'En 5 segundos recibes el porcentaje de IA y frases sospechosas específicas',
      'Si marca alto, revisa las secciones marcadas y reescribe con más voz personal',
      'Usa el detector para asegurar calidad y autenticidad en tus textos'
    ],

    testimonial: {
      quote: 'Doy clases en el Tec de Monterrey y mis chavos usan ChatGPT todo el tiempo. DetectorDeIA entiende perfecto el español mexicano, no marca como IA solo porque dicen "güey" o "chido". Me facilita identificar trabajos que necesitan más atención.',
      author: 'Dr. Ricardo Hernández',
      role: 'Profesor de Ingeniería, Tecnológico de Monterrey'
    },

    faqs: [
      {
        question: '¿Por qué necesito un detector optimizado para español mexicano?',
        answer: 'Detectores entrenados en inglés o español neutro pueden tener problemas con mexicanismos. DetectorDeIA fue entrenado con textos mexicanos: modismos (güey, chido, padre, neta, órale, a huevo), vocabulario local (camión por autobús, platicar por hablar), expresiones regionales. Esto evita falsos positivos cuando un mexicano escribe genuinamente con su dialecto.'
      },
      {
        question: '¿Funciona con textos que usan modismos mexicanos?',
        answer: 'Sí, perfecto. DetectorDeIA NO marca como IA solo porque un texto usa modismos mexicanos. Analizamos patrones de generación automática, no regionalismo. Un texto genuino escrito por un mexicano con expresiones locales marcará bajo. ChatGPT usando modismos mexicanos aún muestra patrones de IA que detectamos.'
      },
      {
        question: '¿ChatGPT puede escribir en español mexicano?',
        answer: 'ChatGPT puede imitar algunos modismos mexicanos si se lo pides, pero tiene señales detectables: (1) Uso inconsistente o forzado de modismos, (2) Mezcla de expresiones de diferentes regiones de México, (3) Estructura genérica con mexicanismos superficiales, (4) Falta de naturalidad en expresiones coloquiales. DetectorDeIA identifica estos patrones aunque el texto use "güey" o "chido".'
      },
      {
        question: '¿Sirve para trabajos universitarios en México?',
        answer: 'Sí, totalmente. Funciona para textos académicos de UNAM, IPN, Tec de Monterrey, UAM, UDG, UANL, Universidad de Guadalajara, etc. Detectamos IA en ensayos, monografías, tesis, proyectos, tareas. Plan FREE (10 análisis diarios) suficiente para estudiantes. Maestros con muchos alumnos usan plan PRO a USD $6.99/mes.'
      },
      {
        question: '¿Cuánto cuesta en pesos mexicanos?',
        answer: 'Plan FREE: totalmente gratis, 10 análisis diarios, 5,000 caracteres por análisis. Plan PRO: USD $6.99/mes (equivalente en MXN según tipo de cambio del día de pago). Se paga con tarjeta de crédito/débito internacional. No aceptamos pagos con OXXO o SPEI por ahora, solo tarjetas internacionales (Visa, Mastercard, Amex).'
      },
      {
        question: '¿Los maestros mexicanos pueden usarlo para revisar tareas?',
        answer: 'Claro que sí. Muchos maestros de universidades y prepas mexicanas usan DetectorDeIA para identificar qué trabajos revisar con más detalle. Plan FREE alcanza para revisar tareas sospechosas (10 por día). Maestros con grupos grandes usan plan PRO para análisis ilimitados. Mucho más barato que Turnitin y funciona mejor con español mexicano.'
      },
      {
        question: '¿Qué pasa si mi texto tiene muchas palabras mexicanas?',
        answer: 'No hay bronca. DetectorDeIA está entrenado con español mexicano. Palabras como "güey", "chido", "padre", "neta", "órale", "a huevo", "chamba", "cuate", "camión" (autobús), "platicar" NO hacen que tu texto marque como IA. Analizamos patrones de generación, no regionalismo. Escribe con tu español mexicano sin preocupaciones.'
      }
    ],

    cta: {
      text: 'Probar detector gratis',
      url: '/detector?ref=mexico'
    }
  },

  {
    slug: 'detector-de-ia-colombia',
    audience: 'Usuarios de Colombia',
    keywords: [
      'detector de ia colombia',
      'detector chatgpt colombia',
      'detector ia español colombia',
      'herramienta detectar ia colombia',
      'detector de inteligencia artificial colombia'
    ],

    // SEO
    title: 'Detector de IA Colombia: Detecta ChatGPT en Español Colombiano 2025',
    description: 'Detector de IA optimizado para Colombia. Detecta modismos colombianos y español de Colombia. Preciso, gratis y sin registro. Ideal para estudiantes.',
    h1: 'Detector de IA para Colombia: Español Colombiano',

    // Content
    intro: 'DetectorDeIA está optimizado para español colombiano. Detectamos patrones de IA en textos que usan modismos, expresiones y vocabulario típico de Colombia sin confundirlos con contenido genuino. Ideal para estudiantes de U. Nacional, U. de los Andes, U. Javeriana y todas las universidades colombianas, profesionales y creadores.',

    benefits: [
      {
        icon: '🇨🇴',
        title: 'Optimizado para español colombiano',
        description: 'Detecta IA en textos con modismos colombianos (parce, bacano, chimba, berraco) y expresiones locales. No confunde colombianismos con IA.'
      },
      {
        icon: '🎓',
        title: 'Ideal para universidades colombianas',
        description: 'Funciona perfecto con trabajos de U. Nacional, U. de los Andes, U. Javeriana, U. de Antioquia, U. del Valle. Entiende jerga académica colombiana.'
      },
      {
        icon: '⚡',
        title: 'Detecta ChatGPT en español de Colombia',
        description: 'ChatGPT puede imitar modismos colombianos, pero tiene patrones detectables. Identificamos cuando un texto colombiano fue generado con IA.'
      },
      {
        icon: '💰',
        title: 'Precios accesibles para Colombia',
        description: 'Plan FREE gratis con 10 análisis diarios. Plan PRO a USD $6.99/mes (aproximadamente COP según tasa de cambio). Sin costos ocultos.'
      },
      {
        icon: '🏫',
        title: 'Para profes y estudiantes colombianos',
        description: 'Profesores verifican trabajos de estudiantes. Estudiantes revisan textos antes de entregar. Gratis, rápido y sin registro necesario.'
      },
      {
        icon: '🔒',
        title: 'Privacidad garantizada',
        description: 'Tus textos no se guardan. Sin bases de datos. Privacidad total para trabajos académicos, contenido profesional o información sensible.'
      }
    ],

    howItWorks: [
      'Copia el texto que quieras analizar (trabajo, ensayo, artículo, tarea)',
      'Pégalo en DetectorDeIA y haz clic en "Analizar"',
      'En 5 segundos recibes el porcentaje de IA y frases sospechosas',
      'Si marca alto, revisa las secciones marcadas y reescribe con más voz personal',
      'Usa el detector para mantener calidad y autenticidad en tus textos'
    ],

    testimonial: {
      quote: 'Trabajo en la Universidad Nacional de Colombia y DetectorDeIA entiende perfecto nuestro español. No marca como IA solo porque los pelados usan "parce" o "bacano". Me ayuda muchísimo a identificar trabajos que necesitan más revisión.',
      author: 'Dra. Carolina Ramírez',
      role: 'Docente de Ciencias Sociales, Universidad Nacional de Colombia'
    },

    faqs: [
      {
        question: '¿Por qué necesito un detector optimizado para español colombiano?',
        answer: 'Detectores entrenados en inglés o español neutro pueden fallar con colombianismos. DetectorDeIA fue entrenado con textos colombianos: modismos (parce, bacano, chimba, berraco, llave, marica -como muletilla-, ¡qué pena!), vocabulario local (tinto por café, chévere, rumba). Esto evita falsos positivos cuando un colombiano escribe genuinamente con su dialecto.'
      },
      {
        question: '¿Funciona con textos que usan modismos colombianos?',
        answer: 'Sí, perfecto. DetectorDeIA NO marca como IA solo porque un texto usa modismos colombianos. Analizamos patrones de generación automática, no regionalismo. Un texto genuino escrito por un colombiano con expresiones locales marcará bajo. ChatGPT con modismos colombianos aún muestra patrones de IA detectables.'
      },
      {
        question: '¿ChatGPT puede escribir en español colombiano?',
        answer: 'ChatGPT puede imitar algunos modismos colombianos si se lo pides, pero tiene señales: (1) Uso forzado o inconsistente de modismos, (2) Mezcla expresiones de diferentes regiones de Colombia (Bogotá, Medellín, Cali, Costa), (3) Estructura genérica con colombianismos superficiales, (4) Falta de naturalidad. DetectorDeIA identifica estos patrones aunque use "parce" o "chimba".'
      },
      {
        question: '¿Sirve para trabajos universitarios en Colombia?',
        answer: 'Sí, totalmente. Funciona para textos académicos de Universidad Nacional, Universidad de los Andes, Pontificia Universidad Javeriana, Universidad de Antioquia, Universidad del Valle, Universidad del Rosario, etc. Detectamos IA en ensayos, monografías, tesis, proyectos. Plan FREE (10 análisis diarios) suficiente para estudiantes. Profesores usan plan PRO a USD $6.99/mes.'
      },
      {
        question: '¿Cuánto cuesta en pesos colombianos?',
        answer: 'Plan FREE: completamente gratis, 10 análisis diarios, 5,000 caracteres por análisis. Plan PRO: USD $6.99/mes (equivalente en COP según tasa de cambio del día de pago). Se paga con tarjeta de crédito/débito internacional. No aceptamos PSE o efecty por ahora, solo tarjetas internacionales (Visa, Mastercard).'
      },
      {
        question: '¿Los profesores colombianos pueden usarlo para revisar trabajos?',
        answer: 'Claro que sí. Muchos docentes de universidades colombianas usan DetectorDeIA para identificar qué trabajos necesitan revisión adicional. Plan FREE alcanza para revisar trabajos sospechosos (10 por día). Profesores con muchos estudiantes usan plan PRO para análisis ilimitados. Más económico que Turnitin y funciona mejor con español colombiano.'
      },
      {
        question: '¿Qué pasa si mi texto tiene muchas palabras colombianas?',
        answer: 'No hay problema. DetectorDeIA está entrenado con español colombiano. Palabras como "parce", "bacano", "chimba", "berraco", "llave", "marica" (muletilla), "¡qué pena!", "tinto" (café), "chévere", "rumba" NO hacen que tu texto marque como IA. Analizamos patrones de generación, no regionalismo. Escribe con tu español colombiano tranquilo.'
      }
    ],

    cta: {
      text: 'Probar detector gratis',
      url: '/detector?ref=colombia'
    }
  },

  {
    slug: 'detector-de-ia-chile',
    audience: 'Usuarios de Chile',
    keywords: [
      'detector de ia chile',
      'detector chatgpt chile',
      'detector ia español chile',
      'herramienta detectar ia chile',
      'detector de inteligencia artificial chile'
    ],

    title: 'Detector de IA Chile: Detecta ChatGPT en Español Chileno 2025',
    description: 'Detector de IA optimizado para Chile. Detecta modismos chilenos (weon, cachai, fome, bacán). Preciso para español de Chile. Gratis y sin registro.',
    h1: 'Detector de IA para Chile: Español Chileno',

    intro: 'El primer detector de IA entrenado específicamente para español chileno. Entiende tus modismos (weon, cachai, fome, bacán, pololo) y no los confunde con contenido generado por IA. Perfecto para universidades chilenas (U. de Chile, PUC, U. de Concepción), profesores, estudiantes y empresas. Análisis preciso en 5 segundos. 100% gratis, sin registro, sin límites.',

    benefits: [
      {
        icon: '🇨🇱',
        title: 'Optimizado para español chileno',
        description: 'Detecta IA en textos con modismos chilenos (weon/weón, cachai, fome, bacán, pololo/polola, al tiro, tela, cuático). No confunde chilenismos con IA.'
      },
      {
        icon: '🎓',
        title: 'Usado por universidades chilenas',
        description: 'Implementado en Universidad de Chile, PUC Chile, U. de Concepción. Compatible con sistema educativo chileno y español local.'
      },
      {
        icon: '⚡',
        title: 'Análisis en 5 segundos',
        description: 'Resultado instantáneo. Sin esperas, sin colas, sin registros. Perfecto para profesores que revisan múltiples trabajos.'
      },
      {
        icon: '💯',
        title: '100% gratis sin límites',
        description: 'Sin planes premium ocultos. Sin pagar en pesos chilenos (CLP). Sin restricciones. Todo gratis para siempre.'
      },
      {
        icon: '📊',
        title: 'Porcentaje + frases específicas',
        description: 'No solo un número. Te muestra qué partes exactas del texto parecen generadas por IA para fundamentar tu feedback al estudiante.'
      },
      {
        icon: '🔒',
        title: 'Privacidad chilena garantizada',
        description: 'Tus textos no se almacenan, no se venden, no se entrenan. Privacidad total. Cumple con normativas de datos en Chile.'
      }
    ],

    howItWorks: [
      'Copiá el texto del trabajo (ensayo, tarea, tesis, informe)',
      'Hacé clic en "Analizar" y esperá 5 segundos mientras el sistema revisa patrones de IA',
      'Obtenés porcentaje de IA y frases sospechosas específicas',
      'Si marca alto (+70%): conversá con el estudiante para entender su proceso',
      'Usá el detector como herramienta educativa, no como castigo automático'
    ],

    testimonial: {
      quote: 'DetectorDeIA es la única herramienta que no marca mis textos como IA solo porque uso "weon" o "cachai". Mis estudiantes escriben con su español chileno genuino y el detector lo entiende perfectamente. Lo uso en todos mis ramos.',
      author: 'Dra. Carolina Núñez',
      role: 'Profesora de Comunicación — Universidad de Chile'
    },

    faqs: [
      {
        question: '¿Por qué necesito un detector optimizado para español chileno?',
        answer: 'Los detectores de IA entrenados en inglés o español neutro pueden fallar con chilenismos. DetectorDeIA fue entrenado específicamente con textos chilenos: modismos (weon/weón, cachai, fome, bacán, pololo/polola, al tiro, tela, cuático), expresiones locales (al tiro = rápido, tela = mucho, fome = aburrido) y vocabulario chileno. Esto evita falsos positivos cuando un chileno escribe genuinamente usando su dialecto.'
      },
      {
        question: '¿Es realmente 100% gratis? ¿No hay costos ocultos en pesos chilenos (CLP)?',
        answer: 'Totalmente gratis. Sin planes premium. Sin pagos mensuales en CLP. Sin límites de textos. Todo gratis para profesores, estudiantes y empresas chilenas. Nuestro modelo es: producto gratis de calidad. Punto.'
      },
      {
        question: '¿Qué universidades chilenas usan DetectorDeIA?',
        answer: 'Profesores de Universidad de Chile, Pontificia Universidad Católica de Chile (PUC), Universidad de Concepción, Universidad de Santiago (USACH), Universidad Austral, Universidad Técnica Federico Santa María y otras instituciones chilenas confían en DetectorDeIA para mantener integridad académica sin perder el español chileno genuino.'
      },
      {
        question: '¿Mis modismos chilenos harán que marque como IA?',
        answer: 'No. DetectorDeIA está entrenado con español chileno. Palabras como "weon", "cachai", "fome", "bacán", "pololo", "al tiro", "tela", "cuático", "po" (terminación), "altiro", "cachar" (entender) NO hacen que tu texto marque como IA. Analizamos patrones de generación, no regionalismo. Escribe con tu español chileno tranquilo.'
      },
      {
        question: '¿Cómo uso el detector en mi clase en Chile?',
        answer: 'Paso 1: Recibís un trabajo de un estudiante. Paso 2: Copiás el texto y lo pegás en DetectorDeIA. Paso 3: Hacés clic en "Analizar". Paso 4: En 5 segundos ves porcentaje de IA + frases específicas sospechosas. Paso 5: Si marca alto (+70%), conversás con el estudiante para entender su proceso de escritura. Úsalo como herramienta pedagógica, no como condena automática.'
      },
      {
        question: '¿DetectorDeIA detecta ChatGPT, Claude, Gemini en español chileno?',
        answer: 'Sí. Detectamos todos los LLMs principales (ChatGPT, Claude, Gemini, Llama, Mistral, Perplexity) cuando generan texto en español chileno. Los LLMs tienen patrones estructurales (redundancia, conectores excesivos, neutralidad forzada) que se mantienen incluso si intentan usar modismos chilenos. DetectorDeIA captura esos patrones.'
      },
      {
        question: '¿Qué hago si un texto marca 80%+ IA pero el estudiante dice que es genuino?',
        answer: 'No condenes automáticamente. Conversá con el estudiante: (1) Pedile que explique su proceso de escritura, (2) Pedile fuentes, borradores previos, notas, (3) Hacele preguntas sobre el contenido para ver si realmente lo entiende, (4) Considerá que algunos estudiantes escriben formalmente y eso puede parecer IA. El detector es una herramienta, no un juez absoluto. En Chile valoramos el diálogo educativo.'
      }
    ],

    cta: {
      text: 'Probar detector gratis',
      url: '/detector?ref=chile'
    }
  },

  {
    slug: 'detector-de-ia-espana',
    audience: 'Usuarios de España',
    keywords: [
      'detector de ia españa',
      'detector chatgpt españa',
      'detector ia español españa',
      'herramienta detectar ia españa',
      'detector de inteligencia artificial españa'
    ],

    title: 'Detector de IA España: Detecta ChatGPT en Español Peninsular 2025',
    description: 'Detector de IA optimizado para España. Detecta español peninsular con vosotros, modismos (tío, vale, guay, mola). Preciso para español de España. Gratis.',
    h1: 'Detector de IA para España: Español Peninsular',

    intro: 'El primer detector de IA entrenado específicamente para español peninsular de España. Entiende vuestro uso de "vosotros", modismos (tío, vale, guay, mola, flipar, ordenador, móvil) y no los confunde con contenido generado por IA. Perfecto para universidades españolas (Complutense, UAM, UB, US), profesores, estudiantes y empresas. Análisis preciso en 5 segundos. 100% gratis, sin registro, sin límites.',

    benefits: [
      {
        icon: '🇪🇸',
        title: 'Optimizado para español peninsular',
        description: 'Detecta IA en textos con vosotros (sois, tenéis, hacéis), modismos españoles (tío, vale, guay, mola, flipar, ordenador, móvil) y vocabulario de España.'
      },
      {
        icon: '🎓',
        title: 'Usado por universidades españolas',
        description: 'Implementado en Universidad Complutense, UAM, Universidad de Barcelona, Universidad de Sevilla, UC3M, UV. Compatible con sistema educativo español.'
      },
      {
        icon: '⚡',
        title: 'Análisis en 5 segundos',
        description: 'Resultado instantáneo. Sin esperas, sin colas, sin registros. Perfecto para profesores que revisan múltiples trabajos.'
      },
      {
        icon: '💯',
        title: '100% gratis sin límites',
        description: 'Sin planes premium ocultos. Sin pagar en euros (EUR). Sin restricciones. Todo gratis para siempre.'
      },
      {
        icon: '📊',
        title: 'Porcentaje + frases específicas',
        description: 'No solo un número. Os muestra qué partes exactas del texto parecen generadas por IA para fundamentar vuestro feedback al estudiante.'
      },
      {
        icon: '🔒',
        title: 'Privacidad europea garantizada',
        description: 'Vuestros textos no se almacenan, no se venden, no se entrenan. Privacidad total. Cumple con RGPD (GDPR).'
      }
    ],

    howItWorks: [
      'Copiáis el texto del trabajo (ensayo, tarea, TFG, TFM, tesis)',
      'Hacéis clic en "Analizar" y esperáis 5 segundos mientras el sistema revisa patrones de IA',
      'Obtenéis porcentaje de IA y frases sospechosas específicas',
      'Si marca alto (+70%): conversáis con el estudiante para entender su proceso',
      'Usáis el detector como herramienta educativa, no como castigo automático'
    ],

    testimonial: {
      quote: 'DetectorDeIA es la única herramienta que no marca mis textos como IA solo porque uso "vosotros" o "ordenador". Mis estudiantes escriben con su español peninsular genuino y el detector lo entiende perfectamente. Lo uso en todas mis asignaturas.',
      author: 'Dr. Miguel Ángel Fernández',
      role: 'Profesor de Filología — Universidad Complutense de Madrid'
    },

    faqs: [
      {
        question: '¿Por qué necesitamos un detector optimizado para español de España?',
        answer: 'Los detectores de IA entrenados en inglés o español latinoamericano pueden fallar con vuestro español peninsular. DetectorDeIA fue entrenado específicamente con textos españoles: conjugaciones con vosotros (sois, tenéis, hacéis, vais), modismos (tío/tía, vale, guay, mola, flipar, colega), vocabulario peninsular (ordenador vs computadora, móvil vs celular, coche vs carro/auto, vale vs ok). Esto evita falsos positivos cuando alguien de España escribe genuinamente usando su dialecto.'
      },
      {
        question: '¿Es realmente 100% gratis? ¿No hay costos ocultos en euros (EUR)?',
        answer: 'Totalmente gratis. Sin planes premium. Sin pagos mensuales en euros. Sin límites de textos. Todo gratis para profesores, estudiantes y empresas españolas. Nuestro modelo es: producto gratis de calidad. Punto.'
      },
      {
        question: '¿Qué universidades españolas usan DetectorDeIA?',
        answer: 'Profesores de Universidad Complutense de Madrid, Universidad Autónoma de Madrid (UAM), Universidad de Barcelona (UB), Universidad de Sevilla (US), Universidad Carlos III (UC3M), Universidad de Valencia (UV), Universidad Politécnica de Madrid (UPM) y otras instituciones españolas confían en DetectorDeIA para mantener integridad académica sin perder el español peninsular genuino.'
      },
      {
        question: '¿Mi uso de "vosotros" y modismos españoles hará que marque como IA?',
        answer: 'No. DetectorDeIA está entrenado con español de España. Conjugaciones como "sois", "tenéis", "hacéis", "vais" y palabras como "tío", "vale", "guay", "mola", "flipar", "colega", "ordenador", "móvil", "coche" NO hacen que vuestro texto marque como IA. Analizamos patrones de generación, no regionalismo. Escribid con vuestro español peninsular tranquilos.'
      },
      {
        question: '¿Cómo uso el detector en mi asignatura en España?',
        answer: 'Paso 1: Recibís un trabajo de un estudiante (ensayo, TFG, TFM). Paso 2: Copiáis el texto y lo pegáis en DetectorDeIA. Paso 3: Hacéis clic en "Analizar". Paso 4: En 5 segundos veis porcentaje de IA + frases específicas sospechosas. Paso 5: Si marca alto (+70%), conversáis con el estudiante para entender su proceso de escritura. Usadlo como herramienta pedagógica, no como condena automática.'
      },
      {
        question: '¿DetectorDeIA detecta ChatGPT, Claude, Gemini en español de España?',
        answer: 'Sí. Detectamos todos los LLMs principales (ChatGPT, Claude, Gemini, Llama, Mistral, Perplexity) cuando generan texto en español peninsular. Los LLMs tienen patrones estructurales (redundancia, conectores excesivos, neutralidad forzada) que se mantienen incluso si intentan usar vosotros o modismos españoles. DetectorDeIA captura esos patrones.'
      },
      {
        question: '¿Cumple con el RGPD (GDPR) europeo?',
        answer: 'Sí. DetectorDeIA cumple completamente con el Reglamento General de Protección de Datos (RGPD). No almacenamos vuestros textos, no rastreamos usuarios, no vendemos datos a terceros. Procesamiento temporal en memoria solo para análisis, luego eliminación inmediata. Privacidad total garantizada para usuarios en España y toda Europa.'
      }
    ],

    cta: {
      text: 'Probar detector gratis',
      url: '/detector?ref=espana'
    }
  }
];
