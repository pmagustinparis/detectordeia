// Glosario de términos de IA para educación (FASE 5 - BLOQUE A)
// Páginas tipo "Qué es X" optimizadas para SEO

export interface GlossaryPage {
  slug: string;
  term: string; // Nombre del término
  keywords: string[];
  title: string; // SEO title
  description: string; // Meta description
  h1: string;
  intro: string;
  definition: string; // Definición formal del término
  characteristics: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  examples: string[]; // Ejemplos prácticos
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  relatedTerms: Array<{
    term: string;
    slug: string;
  }>; // Enlaces a otros términos del glosario
  relatedTools: Array<{
    name: string;
    url: string;
  }>; // Enlaces a herramientas
  cta: {
    text: string;
    url: string;
  };
}

export const glossary: GlossaryPage[] = [
  {
    slug: 'que-es-chatgpt',
    term: 'ChatGPT',
    keywords: [
      'que es chatgpt',
      'chatgpt explicacion',
      'como funciona chatgpt',
      'chatgpt para estudiantes',
      'chatgpt español'
    ],
    title: '¿Qué es ChatGPT? Explicación Completa 2025 | Guía para Estudiantes',
    description: 'Descubre qué es ChatGPT, cómo funciona, sus capacidades y limitaciones. Guía completa para estudiantes universitarios sobre uso ético de ChatGPT en educación.',
    h1: '¿Qué es ChatGPT? Guía Completa para Estudiantes',
    intro: 'ChatGPT es el modelo de inteligencia artificial conversacional más popular del mundo, creado por OpenAI. Lanzado en noviembre 2022, revolucionó la educación permitiendo a estudiantes generar textos, resolver problemas y obtener explicaciones instantáneas. Esta guía explica qué es ChatGPT, cómo funciona, sus capacidades, limitaciones, y cómo usarlo éticamente en contextos académicos.',
    definition: 'ChatGPT (Chat Generative Pre-trained Transformer) es un modelo de lenguaje de gran escala (LLM) entrenado con billones de palabras de internet. Usa arquitectura "transformer" para predecir la siguiente palabra más probable en una secuencia, generando respuestas coherentes y contextuales a preguntas de usuarios.',
    characteristics: [
      {
        icon: '🤖',
        title: 'Modelo de Lenguaje Conversacional',
        description: 'ChatGPT mantiene contexto de conversación, recuerda mensajes anteriores, y genera respuestas naturales como si fuera un humano. Versiones: GPT-3.5 (gratis), GPT-4 (pago, más preciso).'
      },
      {
        icon: '📚',
        title: 'Entrenamiento Masivo',
        description: 'Entrenado con textos de libros, artículos, Wikipedia, código, sitios web hasta septiembre 2021 (GPT-3.5) o abril 2023 (GPT-4). No tiene acceso a internet en tiempo real (versión base).'
      },
      {
        icon: '✍️',
        title: 'Generación de Texto',
        description: 'Puede escribir ensayos, emails, código, poemas, resúmenes, traducciones. NO es buscador (no verifica hechos en tiempo real), es generador probabilístico de texto.'
      },
      {
        icon: '🎓',
        title: 'Aplicaciones Educativas',
        description: 'Estudiantes lo usan para: explicar conceptos, generar ideas, corregir gramática, practicar idiomas, resolver problemas matemáticos, escribir borradores.'
      },
      {
        icon: '⚠️',
        title: 'Limitaciones Críticas',
        description: 'Genera "alucinaciones" (inventa hechos falsos con confianza), comete errores matemáticos, no entiende realmente (solo predice patrones), puede generar plagio si se copia directamente.'
      },
      {
        icon: '🔍',
        title: 'Detectable por Herramientas de IA',
        description: 'Texto de ChatGPT tiene patrones reconocibles: vocabulario sofisticado uniforme, estructura predecible, transiciones formulaicas. DetectorDeIA.com puede identificar contenido generado por ChatGPT.'
      }
    ],
    examples: [
      '**Uso legítimo:** "ChatGPT, explícame el teorema de Pitágoras con ejemplos" → Usa explicación para entender concepto, luego escribes ensayo con tus palabras.',
      '**Uso problemático:** "ChatGPT, escribe mi ensayo de 2000 palabras sobre Revolución Francesa" → Copias directamente sin citar = plagio.',
      '**Uso ético:** "ChatGPT, dame feedback sobre mi borrador de ensayo" → Usas sugerencias para mejorar TU trabajo.',
      '**Uso académico correcto:** Citas a ChatGPT como fuente si usas sus ideas: "Según ChatGPT (OpenAI, 2024), el teorema establece que..." + verificas información con fuentes académicas.'
    ],
    faqs: [
      {
        question: '¿Qué significa GPT en ChatGPT?',
        answer: 'GPT = Generative Pre-trained Transformer. "Generative" = genera texto nuevo. "Pre-trained" = entrenado previamente con billones de palabras. "Transformer" = arquitectura de red neuronal que procesa secuencias de texto usando mecanismo de "atención" (attention mechanism) para entender contexto.'
      },
      {
        question: '¿ChatGPT tiene acceso a internet?',
        answer: 'Depende de la versión. ChatGPT base (GPT-3.5/GPT-4) NO tiene acceso a internet, solo conocimiento hasta su fecha de corte de entrenamiento. ChatGPT Plus con "Browse with Bing" SÍ puede buscar en internet en tiempo real. Si usas versión gratis, no tiene información posterior a septiembre 2021 (GPT-3.5).'
      },
      {
        question: '¿Es legal usar ChatGPT en la universidad?',
        answer: 'Depende de la política de tu institución. Muchas universidades permiten usar ChatGPT como herramienta de apoyo (generar ideas, explicaciones) PERO prohíben copiar texto directamente sin citar. SIEMPRE: (1) Verifica política de tu universidad, (2) Cita a ChatGPT como fuente si usas sus ideas, (3) No copies texto directamente sin modificar. Usar ChatGPT sin citarlo = plagio en muchas instituciones.'
      },
      {
        question: '¿Los profesores pueden detectar si usé ChatGPT?',
        answer: 'SÍ, con herramientas especializadas como DetectorDeIA.com. ChatGPT genera patrones reconocibles: vocabulario uniformemente sofisticado, estructura predecible, frases como "es importante destacar", "cabe mencionar", transiciones formulaicas. Profesores experimentados también detectan cambios en estilo de escritura del estudiante. Detectores tienen ~85-95% precisión, pero pueden dar falsos positivos.'
      },
      {
        question: '¿ChatGPT comete errores?',
        answer: 'SÍ, frecuentemente. ChatGPT genera "alucinaciones" (inventa hechos, citas, estudios inexistentes), comete errores matemáticos, confunde fechas/nombres, genera código con bugs. NO es oráculo de verdad, es modelo probabilístico que predice texto plausible. CRÍTICO: Siempre verifica información de ChatGPT con fuentes confiables (libros, journals, bases de datos académicas).'
      },
      {
        question: '¿Qué diferencia hay entre ChatGPT y buscadores como Google?',
        answer: 'DIFERENCIA CLAVE: Google busca y muestra información existente de sitios web. ChatGPT GENERA texto nuevo basado en patrones aprendidos. Google te da fuentes verificables. ChatGPT genera respuestas sin fuentes (puede inventar hechos). Usa Google para investigar hechos verificables, usa ChatGPT para explicaciones conceptuales (pero verifica con fuentes reales).'
      },
      {
        question: '¿Cómo citar a ChatGPT en formato APA?',
        answer: 'Formato APA 7 para citar ChatGPT: OpenAI. (2024). ChatGPT (versión del 14 de noviembre) [Modelo de lenguaje de gran escala]. https://chat.openai.com/. En el texto: (OpenAI, 2024). IMPORTANTE: Incluye el prompt completo que usaste en un apéndice o nota al pie. Muchos profesores requieren que documentes cómo usaste ChatGPT.'
      },
      {
        question: '¿ChatGPT reemplazará a los escritores humanos?',
        answer: 'NO en el corto plazo. ChatGPT carece de: (1) Pensamiento crítico real, (2) Experiencias personales auténticas, (3) Creatividad genuina, (4) Verificación de hechos, (5) Comprensión profunda. Puede generar borradores decentes, pero escritura de calidad requiere expertise humano, originalidad, verificación. En educación, ChatGPT es herramienta de apoyo, NO reemplazo del aprendizaje.'
      }
    ],
    relatedTerms: [
      { term: 'Claude AI', slug: 'que-es-claude-ai' },
      { term: 'Inteligencia Artificial Generativa', slug: 'que-es-inteligencia-artificial-generativa' },
      { term: 'Detector de IA', slug: 'que-es-detector-de-ia' },
      { term: 'Prompt', slug: 'que-es-un-prompt' }
    ],
    relatedTools: [
      { name: 'Detector de ChatGPT Gratis', url: '/detector-de-chatgpt-gratis?ref=glosario-chatgpt' },
      { name: 'Humanizar ChatGPT Gratis', url: '/humanizar-chatgpt-gratis?ref=glosario-chatgpt' },
      { name: 'Detector de IA Gratis', url: '/?ref=glosario-chatgpt' }
    ],
    cta: {
      text: 'Detectar texto de ChatGPT gratis',
      url: '/detector-de-chatgpt-gratis?ref=glosario-chatgpt'
    }
  },

  {
    slug: 'que-es-claude-ai',
    term: 'Claude AI',
    keywords: [
      'que es claude ai',
      'claude anthropic',
      'claude vs chatgpt',
      'claude inteligencia artificial',
      'claude ai español'
    ],
    title: '¿Qué es Claude AI? Guía Completa 2025 | Claude vs ChatGPT',
    description: 'Descubre qué es Claude AI de Anthropic, cómo se diferencia de ChatGPT, sus capacidades y limitaciones. Guía completa para estudiantes sobre Claude.',
    h1: '¿Qué es Claude AI? Todo lo que Necesitas Saber',
    intro: 'Claude es un modelo de inteligencia artificial conversacional creado por Anthropic (fundada por ex-empleados de OpenAI en 2021). Lanzado en 2023, Claude compite directamente con ChatGPT ofreciendo conversaciones más naturales, respuestas más largas, y enfoque en "IA constitucional" (IA segura y ética). Esta guía explica qué es Claude, cómo se diferencia de ChatGPT, y cómo usarlo en contextos académicos.',
    definition: 'Claude es un asistente de IA basado en modelos de lenguaje de gran escala (LLM) entrenados con técnicas de "Constitutional AI" (IA Constitucional). A diferencia de ChatGPT, Claude puede procesar documentos más largos (hasta 200.000 tokens = ~150.000 palabras), mantener conversaciones más extensas, y genera respuestas menos sesgadas y más matizadas.',
    characteristics: [
      {
        icon: '🧠',
        title: 'IA Constitucional (Constitutional AI)',
        description: 'Claude está entrenado con principios éticos explícitos ("constitución") que guían sus respuestas. Resultado: Respuestas más equilibradas, menos tendenciosas, reconoce incertidumbres, evita contenido dañino sin censura excesiva.'
      },
      {
        icon: '📄',
        title: 'Contexto Ultra-largo (200K tokens)',
        description: 'Claude procesa hasta 200.000 tokens (~150.000 palabras = 500 páginas). Puedes subir papers completos, libros, tesis y hacer preguntas sobre todo el contenido. ChatGPT procesa solo ~25.000 palabras (GPT-4 Turbo).'
      },
      {
        icon: '💬',
        title: 'Conversaciones Más Naturales',
        description: 'Claude genera respuestas que suenan menos "robóticas" que ChatGPT. Usa vocabulario variado, estructura menos predecible, tono más conversacional. Hace preguntas de clarificación antes de responder.'
      },
      {
        icon: '🔍',
        title: 'Pensamiento Más Reflexivo',
        description: 'Claude tiende a explorar múltiples perspectivas, reconoce limitaciones de su conocimiento, sugiere verificación de fuentes. Menos propenso a "alucinar" (inventar hechos) que ChatGPT, aunque aún ocurre.'
      },
      {
        icon: '🎓',
        title: 'Uso en Educación',
        description: 'Estudiantes usan Claude para: analizar textos largos, resumir papers académicos, discutir ideas complejas, recibir feedback detallado. Especialmente útil para humanidades (filosofía, literatura, derecho).'
      },
      {
        icon: '⚠️',
        title: 'Detección y Limitaciones',
        description: 'Claude tiene patrones distintivos: respuestas estructuradas con headers, uso frecuente de listas, tono reflexivo, vocabulario académico. DetectorDeIA.com puede identificar texto generado por Claude.'
      }
    ],
    examples: [
      '**Claude vs ChatGPT para análisis:** Subes paper de 50 páginas a Claude → Claude analiza TODO el paper, cita secciones específicas. ChatGPT solo procesa resumen o partes (límite de contexto menor).',
      '**Uso académico legítimo:** "Claude, analiza mi borrador de tesis y dame feedback sobre argumentos" → Usas feedback para mejorar TU trabajo.',
      '**Diferencia en respuestas:** Pregunta: "¿Es ético usar IA en educación?" → ChatGPT: respuesta directa. Claude: explora pros/contras, reconoce matices, pregunta "¿En qué contexto específico?"',
      '**Uso problemático:** "Claude, escribe mi ensayo completo de 3000 palabras" → Copias directamente = plagio (igual que con ChatGPT).'
    ],
    faqs: [
      {
        question: '¿Qué diferencia a Claude de ChatGPT?',
        answer: 'Diferencias principales: (1) CONTEXTO: Claude procesa hasta 200K tokens (~150K palabras) vs ChatGPT ~25K palabras. (2) ESTILO: Claude es más conversacional y reflexivo; ChatGPT más directo y estructurado. (3) ENTRENAMIENTO: Claude usa "IA Constitucional" (principios éticos explícitos); ChatGPT usa RLHF estándar. (4) PRECISIÓN: Claude comete menos "alucinaciones" según benchmarks, pero ambos pueden inventar hechos. (5) VELOCIDAD: ChatGPT generalmente responde más rápido.'
      },
      {
        question: '¿Cuál es mejor para estudiantes: Claude o ChatGPT?',
        answer: 'Depende de la tarea: CLAUDE mejor para: Analizar textos largos (papers, libros), discutir ideas complejas, recibir feedback detallado, humanidades (filosofía, literatura). CHATGPT mejor para: Respuestas rápidas, resolver problemas matemáticos, generar código, tareas STEM. RECOMENDACIÓN: Usa ambos, compara respuestas, verifica con fuentes académicas reales.'
      },
      {
        question: '¿Claude también "alucina" como ChatGPT?',
        answer: 'SÍ, aunque con menor frecuencia. Claude puede inventar citas inexistentes, confundir fechas, generar "hechos" falsos. Ningún LLM actual es 100% confiable. SIEMPRE verifica información de Claude (o cualquier IA) con fuentes académicas reales: journals, libros, bases de datos universitarias.'
      },
      {
        question: '¿Los detectores de IA identifican texto de Claude?',
        answer: 'SÍ. DetectorDeIA.com y otros detectores pueden identificar texto de Claude. Patrones distintivos: uso frecuente de headers/listas, vocabulario académico consistente, estructura reflexiva ("Por un lado... por otro lado..."), transiciones elaboradas. Claude es MÁS difícil de detectar que ChatGPT porque su estilo es menos formulaico, pero aún detectable.'
      },
      {
        question: '¿Claude tiene acceso a internet?',
        answer: 'Depende de la versión. Claude base NO tiene acceso a internet, solo conocimiento hasta su fecha de corte de entrenamiento (generalmente varios meses antes del lanzamiento). Anthropic puede habilitar búsqueda web en versiones futuras. Si necesitas información actualizada, verifica con fuentes reales.'
      },
      {
        question: '¿Es gratis usar Claude?',
        answer: 'Claude tiene plan gratuito limitado (Claude 2) y plan pago "Claude Pro" (~$20/mes, acceso a Claude 3 Opus/Sonnet). Plan gratis tiene límites de mensajes diarios y acceso a modelos menos potentes. ChatGPT también tiene estructura similar (gratis vs Plus $20/mes).'
      },
      {
        question: '¿Cómo citar a Claude en formato APA?',
        answer: 'Formato APA 7: Anthropic. (2024). Claude [Modelo de lenguaje de gran escala]. https://claude.ai/. En el texto: (Anthropic, 2024). Incluye el prompt completo que usaste en un apéndice. IMPORTANTE: Verifica política de tu universidad sobre citar IA - algunas instituciones tienen formatos específicos.'
      },
      {
        question: '¿Qué significa "Constitutional AI" (IA Constitucional)?',
        answer: 'Constitutional AI es método de entrenamiento de Anthropic donde el modelo aprende de principios éticos explícitos (la "constitución"). Proceso: (1) Claude genera múltiples respuestas, (2) Claude mismo evalúa cuál respuesta cumple mejor los principios, (3) Claude aprende de su autoevaluación. Resultado: IA que es útil pero rechaza requests dañinos sin censura excesiva, reconoce incertidumbres.'
      }
    ],
    relatedTerms: [
      { term: 'ChatGPT', slug: 'que-es-chatgpt' },
      { term: 'Inteligencia Artificial Generativa', slug: 'que-es-inteligencia-artificial-generativa' },
      { term: 'Detector de IA', slug: 'que-es-detector-de-ia' }
    ],
    relatedTools: [
      { name: 'Detector de Claude Gratis', url: '/detector-de-claude-gratis?ref=glosario-claude' },
      { name: 'Detector de IA Gratis', url: '/?ref=glosario-claude' }
    ],
    cta: {
      text: 'Detectar texto de Claude gratis',
      url: '/detector-de-claude-gratis?ref=glosario-claude'
    }
  },

  {
    slug: 'que-es-inteligencia-artificial-generativa',
    term: 'Inteligencia Artificial Generativa',
    keywords: [
      'que es inteligencia artificial generativa',
      'ia generativa explicacion',
      'generative ai español',
      'ia generativa ejemplos',
      'diferencia ia tradicional generativa'
    ],
    title: '¿Qué es Inteligencia Artificial Generativa? Guía Completa 2025',
    description: 'Descubre qué es IA generativa, cómo funciona, diferencias con IA tradicional, ejemplos (ChatGPT, DALL-E, Midjourney). Guía completa para estudiantes.',
    h1: '¿Qué es Inteligencia Artificial Generativa? Explicación Completa',
    intro: 'La Inteligencia Artificial Generativa (Generative AI) es tecnología que crea contenido nuevo (texto, imágenes, audio, video, código) en lugar de solo analizar datos existentes. Modelos como ChatGPT, Claude, DALL-E, Midjourney, Stable Diffusion revolucionaron la creación de contenido desde 2022. Esta guía explica qué es IA generativa, cómo funciona, diferencias con IA tradicional, aplicaciones en educación, y consideraciones éticas.',
    definition: 'Inteligencia Artificial Generativa es un tipo de IA que aprende patrones de datos existentes (textos, imágenes, audio) y usa ese aprendizaje para GENERAR contenido nuevo similar pero original. A diferencia de IA discriminativa (que clasifica/predice), IA generativa CREA. Tecnologías clave: modelos de lenguaje (LLMs como GPT), modelos de difusión (imágenes), GANs (Generative Adversarial Networks).',
    characteristics: [
      {
        icon: '🎨',
        title: 'Creación de Contenido Nuevo',
        description: 'IA generativa NO copia contenido existente, sino que genera contenido nuevo basado en patrones aprendidos. Ejemplo: ChatGPT no busca ensayos en internet, genera texto nuevo palabra por palabra prediciendo siguiente token más probable.'
      },
      {
        icon: '🧠',
        title: 'Aprendizaje de Patrones Masivos',
        description: 'Modelos generativos entrenan con cantidades masivas de datos: GPT-4 entrenó con billones de palabras, DALL-E con millones de imágenes. Aprenden patrones estadísticos, estructuras, estilos, relaciones entre conceptos.'
      },
      {
        icon: '⚡',
        title: 'Generación Probabilística',
        description: 'IA generativa NO entiende realmente contenido (no tiene consciencia), solo predice patrones probables. ChatGPT predice palabra siguiente más probable basándose en contexto. DALL-E predice pixeles probables basándose en descripción.'
      },
      {
        icon: '🔄',
        title: 'Modalidades Múltiples',
        description: 'IA generativa crea múltiples tipos de contenido: TEXTO (ChatGPT, Claude, Gemini), IMÁGENES (DALL-E, Midjourney, Stable Diffusion), AUDIO (ElevenLabs, Synthesia), VIDEO (Sora, Runway), CÓDIGO (GitHub Copilot).'
      },
      {
        icon: '🎓',
        title: 'Impacto en Educación',
        description: 'Revolución en educación: Estudiantes generan ensayos, resúmenes, código en segundos. Profesores enfrentan desafíos de detección de plagio. Universidades crean políticas de uso ético. Debate: ¿IA como herramienta o trampa?'
      },
      {
        icon: '⚠️',
        title: 'Riesgos y Limitaciones',
        description: 'IA generativa puede: generar desinformación (deepfakes, fake news), "alucinar" hechos falsos, perpetuar sesgos de datos de entrenamiento, facilitar plagio académico, generar contenido dañino. Requiere uso responsable.'
      }
    ],
    examples: [
      '**Generación de texto:** ChatGPT escribe ensayo sobre cambio climático → genera texto nuevo palabra por palabra, NO copia de Wikipedia.',
      '**Generación de imágenes:** Prompt "astronauta en caballo en estilo Van Gogh" → DALL-E genera imagen nueva que nunca existió, combinando conceptos.',
      '**Generación de código:** GitHub Copilot completa función Python → predice líneas de código basándose en contexto y millones de repositorios.',
      '**Generación de audio:** ElevenLabs clona voz con 1 minuto de audio → genera nuevo discurso con esa voz (riesgo: deepfakes).',
      '**Uso educativo legítimo:** Estudiante usa ChatGPT para explicar concepto complejo → usa explicación para entender, luego escribe con sus palabras.',
      '**Uso problemático:** Estudiante genera ensayo completo con ChatGPT, copia sin modificar = plagio académico.'
    ],
    faqs: [
      {
        question: '¿Cuál es la diferencia entre IA generativa e IA tradicional?',
        answer: 'IA TRADICIONAL (discriminativa): Analiza, clasifica, predice datos existentes. Ejemplos: detector de spam (clasifica emails), recomendador de Netflix (predice qué te gustará), reconocimiento facial (identifica personas). IA GENERATIVA: CREA contenido nuevo. Ejemplos: ChatGPT (genera texto), DALL-E (genera imágenes), Copilot (genera código). Analogía: IA tradicional es crítico de arte (analiza), IA generativa es artista (crea).'
      },
      {
        question: '¿Cómo funciona técnicamente la IA generativa?',
        answer: 'Tecnologías principales: (1) TRANSFORMERS (GPT, Claude): Arquitectura de redes neuronales que procesa secuencias usando "atención" (attention mechanism) para entender contexto. Predice siguiente token (palabra/parte de palabra) más probable. (2) DIFFUSION MODELS (DALL-E, Stable Diffusion): Aprenden a eliminar ruido de imágenes gradualmente, luego invierten proceso para generar imágenes de ruido. (3) GANs: Dos redes compiten - una genera, otra discrimina - hasta que generador produce contenido realista.'
      },
      {
        question: '¿La IA generativa "entiende" lo que crea?',
        answer: 'NO. IA generativa es modelo estadístico sofisticado que predice patrones probables, pero NO tiene consciencia, comprensión real, o intención. ChatGPT no "entiende" ensayos que genera, solo predice palabras probables basándose en patrones de billones de textos. Analogía: loro que repite frases complejas - suena inteligente, pero no entiende significado.'
      },
      {
        question: '¿La IA generativa reemplazará a escritores/artistas humanos?',
        answer: 'NO en el corto-mediano plazo. IA generativa carece de: (1) Creatividad genuina (solo recombina patrones existentes), (2) Experiencias humanas auténticas, (3) Pensamiento crítico profundo, (4) Contexto cultural/histórico, (5) Intención artística, (6) Originalidad radical. IA es herramienta poderosa para asistir creatividad humana, NO reemplazo. Debate continúa en industrias creativas.'
      },
      {
        question: '¿Es legal usar IA generativa en la universidad?',
        answer: 'DEPENDE de la política de tu institución. TENDENCIAS: (1) Muchas universidades permiten IA como herramienta de apoyo (generar ideas, explicaciones), (2) Prohíben copiar contenido generado sin citar, (3) Requieren declaración de uso de IA. SIEMPRE: Verifica política específica de tu universidad, cita cuando uses IA, no copies texto generado sin modificar. Copiar sin citar = plagio académico.'
      },
      {
        question: '¿Los detectores de IA son precisos?',
        answer: 'PARCIALMENTE. Detectores modernos (como DetectorDeIA.com) tienen ~85-95% precisión, pero NO son infalibles. FUNCIONAN detectando patrones estadísticos de IA (vocabulario uniforme, estructura predecible). LIMITACIONES: (1) Falsos positivos (marcan texto humano como IA), (2) Falsos negativos (no detectan IA editada), (3) Difícil detectar IA + edición humana. NO confíes 100% en detectores - usa como herramienta auxiliar, no evidencia absoluta.'
      },
      {
        question: '¿Qué son las "alucinaciones" en IA generativa?',
        answer: 'ALUCINACIONES = cuando IA genera información falsa con total confianza. Ejemplos: ChatGPT inventa citas de estudios inexistentes, DALL-E genera texto ilegible en imágenes, IA legal inventa casos judiciales falsos. CAUSA: IA predice patrones probables, no verifica hechos. No distingue verdad de plausibilidad. SOLUCIÓN: Siempre verifica información de IA con fuentes confiables (journals, libros, bases de datos académicas).'
      },
      {
        question: '¿Cuáles son los riesgos éticos de IA generativa?',
        answer: 'Riesgos principales: (1) DESINFORMACIÓN: Generación masiva de fake news, deepfakes de políticos. (2) PLAGIO: Facilita plagio académico a escala industrial. (3) SESGOS: Perpetúa sesgos raciales/género de datos de entrenamiento. (4) PROPIEDAD INTELECTUAL: Debate sobre si IA "roba" de artistas/escritores. (5) DESPLAZAMIENTO LABORAL: Amenaza trabajos creativos. (6) PRIVACIDAD: IA entrenada con datos sin consentimiento. Requiere regulación, uso responsable.'
      }
    ],
    relatedTerms: [
      { term: 'ChatGPT', slug: 'que-es-chatgpt' },
      { term: 'Claude AI', slug: 'que-es-claude-ai' },
      { term: 'Detector de IA', slug: 'que-es-detector-de-ia' },
      { term: 'Prompt', slug: 'que-es-un-prompt' }
    ],
    relatedTools: [
      { name: 'Detector de IA Gratis', url: '/?ref=glosario-ia-generativa' },
      { name: 'Humanizador de IA Gratis', url: '/humanizador-de-ia-gratis?ref=glosario-ia-generativa' }
    ],
    cta: {
      text: 'Detectar contenido generado por IA',
      url: '/?ref=glosario-ia-generativa'
    }
  },

  {
    slug: 'que-es-plagio-academico',
    term: 'Plagio Académico',
    keywords: [
      'que es plagio academico',
      'plagio universidad',
      'tipos de plagio',
      'consecuencias plagio academico',
      'como evitar plagio'
    ],
    title: '¿Qué es Plagio Académico? Tipos, Consecuencias y Cómo Evitarlo 2025',
    description: 'Descubre qué es plagio académico, tipos (textual, paráfrasis, mosaico), consecuencias legales y académicas, cómo evitarlo. Guía completa para estudiantes.',
    h1: '¿Qué es Plagio Académico? Guía Completa para Estudiantes',
    intro: 'Plagio académico es apropiarse de ideas, palabras, o trabajo de otros sin dar crédito adecuado. Es la falta académica más grave en universidades, con consecuencias que van desde reprobar trabajos hasta expulsión permanente. Con la explosión de IA generativa (ChatGPT, Claude), el plagio evolucionó: ahora incluye copiar texto de IA sin citar. Esta guía explica qué es plagio, tipos, consecuencias, diferencia entre plagio intencional vs accidental, y cómo evitarlo.',
    definition: 'Plagio académico es presentar trabajo, ideas, palabras, datos, o creaciones de otros como propias sin atribución adecuada. Incluye: copiar texto sin comillas/citas, parafrasear sin citar fuente, comprar ensayos, usar IA sin declarar, auto-plagio (reutilizar trabajo propio sin permiso). Es violación de integridad académica y, en muchos casos, violación de derechos de autor (delito legal).',
    characteristics: [
      {
        icon: '📝',
        title: 'Plagio Textual (Copiar Directamente)',
        description: 'Copiar texto palabra por palabra sin comillas ni cita. Ejemplo: Copias párrafo de Wikipedia, lo pegas en tu ensayo sin citar. SOLUCIÓN: Usa comillas + cita: "Texto copiado" (Autor, Año, p. X). Regla: 3+ palabras consecutivas de fuente = requiere comillas.'
      },
      {
        icon: '🔄',
        title: 'Plagio de Paráfrasis (Sin Citar)',
        description: 'Cambias palabras de texto ajeno pero NO citas la fuente original. Ejemplo: Original: "La IA transforma educación." Tú: "La inteligencia artificial revoluciona la enseñanza" SIN citar = PLAGIO. SOLUCIÓN: Parafrasea + SIEMPRE cita fuente.'
      },
      {
        icon: '🧩',
        title: 'Plagio Mosaico (Patchwriting)',
        description: 'Combinas frases de múltiples fuentes cambiando palabras, sin citar. Parece original pero es collage de fuentes ajenas. Detectores de similitud (Turnitin) NO lo detectan siempre, pero ES plagio. SOLUCIÓN: Sintetiza ideas con TUS palabras + cita todas las fuentes.'
      },
      {
        icon: '🤖',
        title: 'Plagio de IA (ChatGPT/Claude sin Citar)',
        description: 'Usas ChatGPT/Claude para generar ensayo, copias sin declarar uso de IA = PLAGIO en mayoría de universidades. Políticas varían: algunas prohíben IA completamente, otras permiten si citas. SOLUCIÓN: Verifica política de tu institución, SIEMPRE declara uso de IA.'
      },
      {
        icon: '♻️',
        title: 'Auto-plagio (Reutilizar Trabajo Propio)',
        description: 'Entregas mismo trabajo en dos clases diferentes sin permiso. Aunque es TU trabajo, es falta académica (no demuestras aprendizaje nuevo). SOLUCIÓN: Pide permiso al profesor antes de reutilizar trabajo, o cita tu trabajo previo.'
      },
      {
        icon: '⚖️',
        title: 'Consecuencias Graves',
        description: 'ACADÉMICAS: Reprobar trabajo (0 puntos), reprobar curso, suspensión temporal, expulsión permanente, revocación de título. LEGALES: Violación de derechos de autor (multas, demandas). PROFESIONALES: Récord permanente, daño a reputación, imposibilidad de ingresar a posgrados.'
      }
    ],
    examples: [
      '**Plagio textual:** Copias 2 párrafos de paper sin comillas ni cita = PLAGIO GRAVE.',
      '**Plagio de paráfrasis:** Lees artículo, reformulas con tus palabras, NO citas fuente = PLAGIO (error común).',
      '**Plagio mosaico:** Combinas frases de 5 fuentes diferentes cambiando palabras, no citas ninguna = PLAGIO.',
      '**Plagio de IA:** ChatGPT genera tu ensayo completo, lo entregas sin declarar = PLAGIO en mayoría de universidades.',
      '**NO es plagio:** Lees 10 fuentes, sintetizas ideas con TUS palabras, citas todas las fuentes = TRABAJO LEGÍTIMO.',
      '**Auto-plagio:** Entregas ensayo de clase A en clase B sin permiso = FALTA ACADÉMICA.'
    ],
    faqs: [
      {
        question: '¿Parafrasear sin citar es plagio?',
        answer: 'SÍ, ES PLAGIO. Este es el error más común de estudiantes. Paráfrasis significa reformular ideas AJENAS con tus palabras, pero las ideas siguen siendo AJENAS. Si no citas la fuente original, estás apropiándote de ideas de otros. REGLA DE ORO: Si la idea no es tuya (la aprendiste de una fuente), CITA aunque uses tus propias palabras. Formato APA: (Autor, Año). Único caso que no requiere cita: conocimiento común (ej: "La Tierra es redonda").'
      },
      {
        question: '¿Usar ChatGPT es plagio?',
        answer: 'DEPENDE de la política de tu universidad y cómo lo uses. ESCENARIOS: (1) Generas ensayo con ChatGPT, copias sin declarar = PLAGIO en mayoría de instituciones. (2) Usas ChatGPT para explicaciones, escribes con tus palabras, declaras uso = GENERALMENTE PERMITIDO (verifica política). (3) Universidad prohíbe IA completamente = cualquier uso es violación. SOLUCIÓN: (a) Lee política de IA de tu institución, (b) Si usas IA, SIEMPRE declara cómo la usaste, (c) Cita a ChatGPT si usas sus ideas.'
      },
      {
        question: '¿Cuáles son las consecuencias del plagio en la universidad?',
        answer: 'Consecuencias varían según gravedad y universidad: PRIMER INCIDENTE MENOR: Reprobar trabajo (0 puntos) + advertencia. PLAGIO SUSTANCIAL: Reprobar curso completo + registro en expediente académico. PLAGIO GRAVE/REPETIDO: Suspensión temporal (1-2 semestres), expulsión permanente, revocación de título si se descubre después. CONSECUENCIAS LEGALES: Si plagias obra protegida por copyright (libro, artículo publicado), autor puede demandarte (multas, daños). CONSECUENCIAS PROFESIONALES: Récord permanente impide ingreso a posgrados, empleadores pueden verificar historial.'
      },
      {
        question: '¿Cómo detectan plagio los profesores?',
        answer: 'Métodos de detección: (1) SOFTWARE: Turnitin, SafeAssign, Unicheck comparan tu trabajo con billones de documentos, detectan texto copiado. (2) DETECTORES DE IA: DetectorDeIA.com, GPTZero identifican patrones de ChatGPT/Claude. (3) CAMBIOS DE ESTILO: Profesores notan si tu ensayo tiene estilo diferente a trabajos previos (vocabulario más sofisticado, estructura diferente). (4) BÚSQUEDA MANUAL: Copian frases sospechosas en Google, encuentran fuente original. (5) CONOCIMIENTO DEL TEMA: Profesores expertos detectan errores factuales típicos de IA.'
      },
      {
        question: '¿Qué es plagio accidental y cómo evitarlo?',
        answer: 'Plagio accidental = plagias sin intención por desconocimiento de normas de citación. CAUSAS COMUNES: (1) No sabías que parafrasear requiere cita, (2) Olvidaste citar una fuente, (3) Citaste incorrectamente (formato erróneo), (4) No pusiste comillas en cita textual. CONSECUENCIAS: Universidades generalmente NO excusan plagio accidental (ignorancia no es defensa), pero pueden ser más indulgentes en primera vez. PREVENCIÓN: (a) Aprende formato APA/MLA, (b) Cita MIENTRAS investigas (no al final), (c) Usa gestores de referencias (Zotero, Mendeley), (d) Cuando dudes, CITA (mejor citar de más que de menos).'
      },
      {
        question: '¿Cuántas palabras puedo copiar sin que sea plagio?',
        answer: 'NO existe número mágico "seguro". REGLA GENERAL: 3+ palabras consecutivas idénticas a fuente = requiere comillas + cita. PERO: Incluso 1 oración copiada sin comillas es plagio. Incluso cambiar 1-2 palabras sin citar es plagio. PRINCIPIO: No importa CUÁNTO copias, sino que SIEMPRE des crédito. FORMATO CORRECTO: Si copias 1 frase: "Texto copiado" (Autor, Año). Si parafraseas: Texto parafraseado (Autor, Año). Si copias >40 palabras (APA): Bloque de cita indentado sin comillas + cita.'
      },
      {
        question: '¿Auto-plagio es realmente plagio?',
        answer: 'SÍ, en contexto académico. Auto-plagio es reutilizar tu propio trabajo previo sin declararlo. EJEMPLOS: (1) Entregas mismo ensayo en dos clases, (2) Reciclas párrafos de trabajo previo sin citar tu trabajo anterior. POR QUÉ ES FALTA: (1) No demuestras nuevo aprendizaje, (2) Incumples contrato implícito de originalidad de cada tarea, (3) Es deshonesto (profesor asume trabajo es nuevo). SOLUCIÓN: Pide permiso explícito al profesor antes de reutilizar trabajo. Si reutilizas ideas propias, cita tu trabajo previo como fuente.'
      },
      {
        question: '¿Cómo citar correctamente para evitar plagio?',
        answer: 'FORMATO APA 7 (más común en universidades): CITA TEXTUAL: "Texto copiado exactamente" (Apellido, Año, p. X). PARÁFRASIS: Texto parafraseado con tus palabras (Apellido, Año). MÚLTIPLES AUTORES: (Apellido1 & Apellido2, Año). WEB SIN AUTOR: ("Título artículo", Año). IA: (OpenAI, 2024) para ChatGPT, (Anthropic, 2024) para Claude. REFERENCIAS: Lista alfabética al final con información completa. HERRAMIENTAS: Usa Zotero, Mendeley, CitationMachine para generar citas automáticamente. REGLA: Si dudas si citar, CITA.'
      }
    ],
    relatedTerms: [
      { term: 'Parafrasear', slug: 'que-es-parafrasear' },
      { term: 'Patchwriting (Plagio Mosaico)', slug: 'que-es-patchwriting' },
      { term: 'Turnitin', slug: 'que-es-turnitin' },
      { term: 'ChatGPT', slug: 'que-es-chatgpt' }
    ],
    relatedTools: [
      { name: 'Detector de IA Gratis', url: '/?ref=glosario-plagio' },
      { name: 'Parafrasear Textos Sin Plagio', url: '/parafrasear-sin-plagio?ref=glosario-plagio' }
    ],
    cta: {
      text: 'Verificar originalidad de texto',
      url: '/?ref=glosario-plagio'
    }
  },

  {
    slug: 'que-es-parafrasear',
    term: 'Parafrasear',
    keywords: [
      'que es parafrasear',
      'como parafrasear correctamente',
      'parafrasear sin plagiar',
      'parafrasear apa',
      'diferencia parafrasear resumir'
    ],
    title: '¿Qué es Parafrasear? Guía Completa y Técnicas Correctas 2025',
    description: 'Aprende qué es parafrasear, cómo hacerlo correctamente sin plagiar, diferencia con resumir, formato APA. Guía completa con ejemplos para estudiantes.',
    h1: '¿Qué es Parafrasear? Técnicas y Ejemplos para Estudiantes',
    intro: 'Parafrasear es reformular ideas de otros autores usando tus propias palabras y estructura, manteniendo el significado original. Es habilidad esencial en escritura académica: permite integrar fuentes sin copiar textualmente. CRÍTICO: Parafrasear sin citar la fuente = PLAGIO. Esta guía explica qué es parafrasear, diferencia con resumir/citar, cómo parafrasear correctamente, errores comunes, y formato APA para paráfrasis.',
    definition: 'Parafrasear (del griego "para" = al lado de, "phrasis" = expresión) es reformular ideas de un texto fuente usando vocabulario y estructura sintáctica diferentes, manteniendo el mismo significado. Requiere: (1) Comprender profundamente el texto original, (2) Expresar ideas con TUS palabras (no solo cambiar sinónimos), (3) SIEMPRE citar la fuente original (aunque cambies todas las palabras). NO es copiar + cambiar palabras, es re-conceptualizar ideas.',
    characteristics: [
      {
        icon: '🔄',
        title: 'Reformulación Total, No Solo Sinónimos',
        description: 'Parafrasear NO es cambiar "grande" por "enorme". Requiere re-estructurar completamente: cambiar orden de ideas, usar voz activa/pasiva diferente, dividir/combinar oraciones. Debes procesar la idea y expresarla como TÚ la explicarías.'
      },
      {
        icon: '📏',
        title: 'Longitud Similar al Original',
        description: 'Paráfrasis mantiene extensión similar al texto original (condensar significativamente = resumen, no paráfrasis). Si original tiene 100 palabras, paráfrasis tendrá ~80-120 palabras. Captura TODA la idea, no solo puntos principales.'
      },
      {
        icon: '✅',
        title: 'Siempre Requiere Citación',
        description: 'REGLA DE ORO: Parafrasear NO elimina necesidad de citar. Aunque uses 100% tus palabras, las IDEAS son ajenas. Formato APA: Paráfrasis (Autor, Año). Sin cita = plagio de paráfrasis (falta grave).'
      },
      {
        icon: '🎯',
        title: 'Mantiene Significado Original',
        description: 'Paráfrasis debe ser fiel al significado original. NO agregues interpretaciones, opiniones, o información extra. NO omitas puntos importantes. Si cambias el significado = distorsión de fuente (también es falta académica).'
      },
      {
        icon: '🧠',
        title: 'Requiere Comprensión Profunda',
        description: 'No puedes parafrasear texto que no entiendes. Proceso: (1) Lee varias veces hasta entender completamente, (2) Cierra el texto fuente, (3) Escribe la idea como se la explicarías a un amigo, (4) Verifica que mantienes significado original.'
      },
      {
        icon: '📚',
        title: 'Usos en Escritura Académica',
        description: 'Parafraseas cuando: (1) Idea de fuente es importante pero redacción original no es memorable, (2) Quieres integrar múltiples fuentes fluidamente, (3) Necesitas adaptar nivel técnico para tu audiencia. NO parafrasees: definiciones clave, datos específicos, frases memorables (usa citas textuales).'
      }
    ],
    examples: [
      '**Original:** "La inteligencia artificial generativa revolucionó la educación superior, permitiendo a estudiantes generar ensayos completos en minutos, lo que plantea desafíos éticos sin precedentes." (García, 2024)',
      '**PARÁFRASIS CORRECTA:** García (2024) señala que la IA generativa transformó las universidades al facilitar la creación rápida de trabajos académicos, generando dilemas morales nunca antes vistos.',
      '**PARÁFRASIS INCORRECTA (solo sinónimos):** "La IA generativa revolucionó la educación universitaria, habilitando a alumnos generar trabajos completos en minutos, planteando retos éticos inéditos." → Estructura idéntica, solo cambió palabras = PLAGIO.',
      '**ERROR COMÚN (sin cita):** "La IA generativa transformó las universidades facilitando creación rápida de trabajos." → Aunque cambió palabras, NO citó = PLAGIO.',
      '**Diferencia con RESUMEN:** Resumen condensa: "Según García (2024), la IA generativa genera desafíos éticos en educación." (De 30 palabras a 12).',
      '**Diferencia con CITA TEXTUAL:** "La inteligencia artificial generativa revolucionó la educación superior" (García, 2024, p. 45) → Usa comillas, copia exactamente.'
    ],
    faqs: [
      {
        question: '¿Cuál es la diferencia entre parafrasear y resumir?',
        answer: 'PARAFRASEAR: Reformulas idea completa con tus palabras, mantienes extensión similar, capturas TODA la información. RESUMIR: Condensas idea a puntos principales, reduces significativamente extensión, omites detalles. EJEMPLO: Original (50 palabras) → Paráfrasis (45-55 palabras, todos los detalles) vs Resumen (15 palabras, solo idea principal). CUÁNDO USAR: Parafrasea si todos los detalles son importantes. Resume si solo necesitas idea general. Ambos requieren cita.'
      },
      {
        question: '¿Cómo parafrasear correctamente sin plagiar?',
        answer: 'MÉTODO DE 5 PASOS: (1) LEE texto original varias veces hasta entender completamente. (2) CIERRA el texto (no lo veas mientras parafraseas). (3) ESCRIBE la idea como se la explicarías a un amigo (usa TUS palabras naturales). (4) COMPARA con original: ¿Cambiaste estructura, no solo palabras? ¿Mantuviste significado? (5) AGREGA CITA: (Autor, Año). VERIFICACIÓN: Si >3 palabras consecutivas son idénticas al original, re-escribe o usa comillas.'
      },
      {
        question: '¿Necesito citar si parafraseo con mis propias palabras?',
        answer: 'SÍ, SIEMPRE. Este es el error #1 de estudiantes. Parafrasear significa usar TUS palabras para expresar IDEAS AJENAS. Las ideas siguen siendo ajenas aunque cambies todas las palabras. No citar paráfrasis = plagio de paráfrasis (falta grave). FORMATO APA: Texto parafraseado (Autor, Año). EXCEPCIÓN: Conocimiento común (ej: "La Tierra gira alrededor del Sol") no requiere cita, pero si lo aprendiste de una fuente específica, cita.'
      },
      {
        question: '¿Cambiar palabras por sinónimos es parafrasear?',
        answer: 'NO. Cambiar solo sinónimos manteniendo estructura original es "patchwriting" (plagio mosaico), NO paráfrasis legítima. EJEMPLO INCORRECTO: Original: "Los estudiantes usan IA frecuentemente." → "Los alumnos utilizan inteligencia artificial seguido." (Solo cambió sinónimos = PLAGIO). PARÁFRASIS CORRECTA: "El uso de IA es común entre universitarios." (Cambió estructura completa). REGLA: Si alguien compara tu paráfrasis con original línea por línea y estructuras coinciden, es plagio aunque palabras sean diferentes.'
      },
      {
        question: '¿Puedo usar herramientas de parafraseo automático?',
        answer: 'SÍ, PERO CON PRECAUCIONES: (1) Herramientas automáticas (Quillbot, ChatGPT, etc.) generalmente hacen "patchwriting" (cambio de sinónimos, no paráfrasis real). (2) Muchas universidades consideran paráfrasis automática sin edición humana = plagio. (3) Herramientas pueden cambiar significado original. USO CORRECTO: Usa herramienta para generar borrador → EDITA manualmente para re-estructurar completamente → VERIFICA que mantiene significado → CITA la fuente. Nunca copies paráfrasis automática directamente.'
      },
      {
        question: '¿Cómo citar paráfrasis en formato APA?',
        answer: 'FORMATO APA 7: Texto parafraseado con tus palabras (Apellido, Año). VARIACIONES: Varios autores: (Apellido1 & Apellido2, Año). Tres+ autores: (Apellido1 et al., Año). Sin autor: ("Título", Año). PÁGINA OPCIONAL: (Autor, Año, p. X) si quieres ayudar a lectores localizar info. INTEGRACIÓN EN TEXTO: "Según García (2024), [paráfrasis]" o "[Paráfrasis] (García, 2024)". REFERENCIAS: Agrega entrada completa en lista de Referencias al final.'
      },
      {
        question: '¿Cuándo debo parafrasear vs citar textualmente?',
        answer: 'USA CITA TEXTUAL cuando: (1) Redacción original es memorable/poderosa, (2) Definición técnica precisa, (3) Frase de autoridad reconocida, (4) Datos/estadísticas específicas, (5) Lenguaje único que no puedes mejorar. USA PARÁFRASIS cuando: (1) Idea es importante pero redacción no es especial, (2) Quieres integrar múltiples fuentes fluidamente, (3) Necesitas adaptar nivel técnico, (4) Evitar ensayo lleno de comillas. BALANCE: Ensayo académico típico ~10-15% citas textuales, 30-40% paráfrasis, 50-60% análisis propio.'
      },
      {
        question: '¿Qué es paráfrasis inaceptable (patchwriting)?',
        answer: 'Patchwriting (también "plagio mosaico") es paráfrasis deficiente que cambia palabras pero mantiene estructura original. EJEMPLO: Original: "La IA generativa (ChatGPT, Claude) revolucionó educación porque facilita generar ensayos rápidamente." Patchwriting: "La inteligencia artificial generativa (ChatGPT, Claude) transformó la educación porque permite crear trabajos velozmente." → Estructura idéntica, solo cambió sinónimos = PLAGIO. CAUSA: Estudiante mira texto original mientras parafrasea. SOLUCIÓN: Cierra texto fuente, escribe de memoria con tus palabras.'
      }
    ],
    relatedTerms: [
      { term: 'Plagio Académico', slug: 'que-es-plagio-academico' },
      { term: 'Patchwriting', slug: 'que-es-patchwriting' },
      { term: 'ChatGPT', slug: 'que-es-chatgpt' }
    ],
    relatedTools: [
      { name: 'Parafrasear Textos Online Gratis', url: '/parafrasear-textos-online-gratis?ref=glosario-parafrasear' },
      { name: 'Parafrasear Sin Plagio', url: '/parafrasear-sin-plagio?ref=glosario-parafrasear' },
      { name: 'Detector de IA', url: '/?ref=glosario-parafrasear' }
    ],
    cta: {
      text: 'Parafrasear textos gratis',
      url: '/parafrasear-textos-online-gratis?ref=glosario-parafrasear'
    }
  },

  {
    slug: 'que-es-patchwriting',
    term: 'Patchwriting (Plagio Mosaico)',
    keywords: [
      'que es patchwriting',
      'plagio mosaico',
      'patchwriting plagio',
      'parafrasear incorrectamente',
      'plagio patchwriting'
    ],
    title: '¿Qué es Patchwriting? Plagio Mosaico Explicado 2025',
    description: 'Descubre qué es patchwriting (plagio mosaico), por qué es plagio académico, ejemplos, cómo evitarlo. Guía completa para estudiantes universitarios.',
    h1: '¿Qué es Patchwriting? Guía del Plagio Mosaico',
    intro: 'Patchwriting (también llamado "plagio mosaico" o "plagio de paráfrasis") es forma común de plagio donde estudiantes copian estructura de texto fuente pero cambian palabras por sinónimos. Es error frecuente porque estudiantes creen que cambiar palabras = parafrasear correctamente. En realidad, es plagio académico que detectores de similitud a veces NO identifican. Esta guía explica qué es patchwriting, por qué es problemático, diferencia con paráfrasis legítima, y cómo evitarlo.',
    definition: 'Patchwriting es tipo de plagio donde estudiante copia estructura sintáctica y secuencia de ideas de texto fuente, pero reemplaza palabras con sinónimos. Resultado: "mosaico" de palabras propias en estructura ajena. Término acuñado por Rebecca Moore Howard (1992). Ejemplo: Original "La IA revoluciona educación" → Patchwriting "La inteligencia artificial transforma la enseñanza" (misma estructura, sinónimos). Es plagio porque apropiación intelectual no es solo palabras, sino organización de ideas.',
    characteristics: [
      {
        icon: '🧩',
        title: 'Copia Estructura, Cambia Palabras',
        description: 'Característica definitoria: Mantiene esqueleto sintáctico del original (sujeto-verbo-objeto, orden de ideas, longitud de oraciones) pero sustituye palabras clave por sinónimos. Estudiante "calca" estructura del texto fuente.'
      },
      {
        icon: '🔍',
        title: 'Difícil de Detectar Automáticamente',
        description: 'Turnitin y detectores de similitud comparan palabras, no estructuras. Patchwriting puede pasar detectores (0% similitud) porque palabras son diferentes, PERO sigue siendo plagio. Profesores entrenados lo detectan comparando estructuras lado a lado.'
      },
      {
        icon: '📖',
        title: 'Ocurre Cuando Miras el Original',
        description: 'Causa principal: Estudiante mira texto fuente MIENTRAS escribe paráfrasis. Inconscientemente copia estructura aunque cambie palabras. Solución: Cierra texto fuente, escribe de memoria con TUS palabras naturales.'
      },
      {
        icon: '⚠️',
        title: 'Es Plagio Académico',
        description: 'Aunque estudiantes lo hacen sin intención maliciosa (creen estar parafraseando), patchwriting es plagio según políticas universitarias. Puede resultar en reprobar trabajo, curso, o sanciones más graves. Ignorancia no es defensa.'
      },
      {
        icon: '🎓',
        title: 'Señal de Comprensión Superficial',
        description: 'Patchwriting indica que estudiante NO entendió profundamente el texto (si entendieras, podrías explicarlo con tus palabras). Es "imitación" de paráfrasis real. Profesores lo ven como falta de procesamiento crítico.'
      },
      {
        icon: '🔗',
        title: 'Frecuente en Estudiantes Novatos',
        description: 'Común en primeros años de universidad cuando estudiantes aún no dominan escritura académica. Transición difícil de secundaria (donde copiar+cambiar palabras era aceptable) a universidad (donde requiere re-conceptualización completa).'
      }
    ],
    examples: [
      '**TEXTO ORIGINAL:** "La inteligencia artificial generativa, como ChatGPT, ha revolucionado la educación superior al permitir a los estudiantes generar ensayos completos en cuestión de minutos." (Martínez, 2024)',
      '**PATCHWRITING (PLAGIO MOSAICO):** "La IA generativa, como ChatGPT, ha transformado la enseñanza universitaria al habilitar a los alumnos crear trabajos completos en solo minutos." → Estructura idéntica, solo cambió sinónimos = PLAGIO.',
      '**PARÁFRASIS LEGÍTIMA:** "Martínez (2024) observa que herramientas como ChatGPT facilitaron a universitarios producir trabajos académicos con velocidad sin precedentes, transformando dinámicas educativas." → Estructura completamente diferente.',
      '**OTRO EJEMPLO DE PATCHWRITING:** Original: "Los detectores de IA analizan patrones estadísticos del texto." → Patchwriting: "Las herramientas de detección de IA examinan los patrones estadísticos del contenido." (Orden idéntico, sinónimos).',
      '**PARÁFRASIS CORRECTA:** "Software especializado identifica texto generado por IA mediante análisis de características estadísticas." (Re-estructurado completamente).'
    ],
    faqs: [
      {
        question: '¿Por qué patchwriting es considerado plagio?',
        answer: 'Patchwriting es plagio porque: (1) APROPIACIÓN INTELECTUAL: Copias organización de ideas, estructura argumentativa, y flujo lógico del autor original (no solo palabras). (2) FALTA DE PROCESAMIENTO: No demuestras comprensión propia - solo imitas superficie del texto. (3) DESHONESTIDAD: Presentas estructura ajena como tuya. (4) POLÍTICAS ACADÉMICAS: Mayoría de universidades lo definen explícitamente como plagio. Analogía: Si copias arquitectura de casa pero cambias colores de pintura, sigue siendo copia de diseño ajeno.'
      },
      {
        question: '¿Cómo detectan patchwriting los profesores?',
        answer: 'Métodos de detección: (1) COMPARACIÓN LADO A LADO: Ponen tu texto y fuente original juntos, observan si estructuras coinciden (mismo orden de ideas, longitud similar de oraciones, paralelos sintácticos). (2) TURNITIN AVANZADO: Versiones recientes detectan similitud estructural, no solo textual. (3) CAMBIOS DE ESTILO: Patchwriting produce estilo inconsistente (partes suenan como tú, partes como fuente). (4) VOCABULARIO: Uso de sinónimos sofisticados que no usas normalmente. (5) EXPERIENCIA: Profesores veteranos reconocen patrones de patchwriting.'
      },
      {
        question: '¿Cuál es la diferencia entre patchwriting y paráfrasis legítima?',
        answer: 'PATCHWRITING: (1) Miras texto original mientras escribes, (2) Copias estructura/orden de ideas, (3) Cambias solo palabras por sinónimos, (4) Resultado suena forzado/poco natural. PARÁFRASIS LEGÍTIMA: (1) Cierras texto original, escribes de memoria, (2) Re-estructuras completamente (cambias orden, combinas/divides ideas), (3) Usas TUS palabras naturales, (4) Resultado suena como tu estilo de escritura. TEST: Si alguien compara tu texto con original frase por frase y estructuras son paralelas, es patchwriting.'
      },
      {
        question: '¿Cómo evitar patchwriting?',
        answer: 'MÉTODO ANTI-PATCHWRITING: (1) LEE texto fuente varias veces hasta entender completamente. (2) CIERRA el texto (no lo veas). (3) ESPERA 5-10 minutos (toma café, camina). (4) ESCRIBE la idea como se la explicarías a un amigo sin conocimiento del tema (usa tus palabras más simples y naturales). (5) COMPARA con original: ¿Estructuras son diferentes? ¿Orden de ideas cambió? (6) Si estructuras son paralelas, RE-ESCRIBE sin mirar original. (7) AGREGA CITA. CLAVE: Nunca mires texto original mientras parafraseas.'
      },
      {
        question: '¿Las herramientas de parafraseo automático generan patchwriting?',
        answer: 'SÍ, FRECUENTEMENTE. Herramientas como Quillbot, Spinbot, parafrasers básicos funcionan principalmente cambiando palabras por sinónimos (definición de patchwriting). Resultado: mantienen estructura original pero con vocabulario diferente = plagio mosaico. ADEMÁS: (1) Muchas universidades consideran uso de parafrasers automáticos = plagio independientemente de resultado. (2) ChatGPT/Claude también pueden hacer patchwriting si les pides parafrasear. USO SEGURO: Usa herramienta solo como punto de partida → Re-escribe completamente manualmente → Verifica estructura es diferente → Cita fuente.'
      },
      {
        question: '¿Turnitin detecta patchwriting?',
        answer: 'DEPENDE. Turnitin tradicional detecta similitud TEXTUAL (palabras idénticas). Patchwriting bien hecho puede mostrar 0% similitud en Turnitin porque TODAS las palabras son diferentes. PERO: (1) Turnitin reciente incluye "Similarity 2.0" que detecta similitud estructural. (2) Profesores pueden activar "detect text manipulation" que identifica uso de parafrasers. (3) Profesores experimentados comparan manualmente tu texto con fuentes sospechosas. NO CONFÍES EN: "Si Turnitin no lo detecta, no es plagio" - patchwriting es plagio independientemente de lo que diga Turnitin.'
      },
      {
        question: '¿Patchwriting siempre es intencional?',
        answer: 'NO, generalmente es accidental. Mayoría de estudiantes hacen patchwriting sin intención de plagiar - creen estar parafraseando correctamente. CAUSAS: (1) EDUCACIÓN INSUFICIENTE: En secundaria, cambiar palabras era aceptable. Universidad requiere re-conceptualización completa. (2) COMPRENSIÓN SUPERFICIAL: Si no entiendes profundamente, solo puedes imitar estructura. (3) PRESIÓN DE TIEMPO: Patchwriting es más rápido que paráfrasis real. CONSECUENCIAS: Aunque sea accidental, sigue siendo plagio con mismas sanciones (universidades no excusan ignorancia).'
      },
      {
        question: '¿Es patchwriting si cito la fuente?',
        answer: 'SÍ, SIGUE SIENDO PROBLEMÁTICO. Citar fuente es necesario PERO no suficiente. Patchwriting con cita muestra: (1) Falta de procesamiento crítico (solo imitas, no sintetizas), (2) Habilidad de escritura deficiente, (3) Posible incomprensión del material. ADEMÁS: Algunos profesores consideran patchwriting citado = plagio de todas formas (políticas varían). SOLUCIÓN: Si no puedes parafrasear sin copiar estructura, usa CITA TEXTUAL con comillas: "Texto original exacto" (Autor, Año, p. X). Demuestra honestidad y evita patchwriting.'
      }
    ],
    relatedTerms: [
      { term: 'Plagio Académico', slug: 'que-es-plagio-academico' },
      { term: 'Parafrasear', slug: 'que-es-parafrasear' },
      { term: 'Turnitin', slug: 'que-es-turnitin' }
    ],
    relatedTools: [
      { name: 'Detector de IA Gratis', url: '/?ref=glosario-patchwriting' },
      { name: 'Parafrasear Sin Plagio', url: '/parafrasear-sin-plagio?ref=glosario-patchwriting' }
    ],
    cta: {
      text: 'Verificar originalidad de texto',
      url: '/?ref=glosario-patchwriting'
    }
  },

  {
    slug: 'que-es-turnitin',
    term: 'Turnitin',
    keywords: [
      'que es turnitin',
      'turnitin detector plagio',
      'como funciona turnitin',
      'turnitin porcentaje similitud',
      'pasar turnitin'
    ],
    title: '¿Qué es Turnitin? Cómo Funciona el Detector de Plagio 2025',
    description: 'Descubre qué es Turnitin, cómo funciona, qué porcentaje de similitud es aceptable, limitaciones, y cómo interpretar reportes. Guía completa para estudiantes.',
    h1: '¿Qué es Turnitin? Guía Completa del Detector de Plagio',
    intro: 'Turnitin es el software de detección de plagio más usado en universidades del mundo. Compara trabajos estudiantiles con billones de documentos (páginas web, artículos académicos, trabajos previos) para identificar texto copiado. 15,000+ instituciones educativas lo usan para verificar originalidad. Esta guía explica qué es Turnitin, cómo funciona, qué significa el "porcentaje de similitud", limitaciones del sistema, y cómo interpretar correctamente los reportes.',
    definition: 'Turnitin es software anti-plagio desarrollado por empresa estadounidense (fundada 1998) que detecta similitud textual entre documento del estudiante y base de datos masiva. Funcionalidades principales: (1) Similarity Report: compara texto con 70+ billones de páginas web, 200+ millones de trabajos estudiantiles, 170+ millones de artículos académicos. (2) AI Detection: detecta texto generado por IA (ChatGPT, etc.). (3) Feedback Studio: herramientas para profesores comentar trabajos.',
    characteristics: [
      {
        icon: '🔍',
        title: 'Base de Datos Masiva',
        description: 'Turnitin compara tu trabajo con: 70+ billones de páginas web actuales y archivadas, 200+ millones de trabajos estudiantiles previos enviados a Turnitin, 170+ millones de artículos académicos de journals, libros, publicaciones. Base de datos crece constantemente.'
      },
      {
        icon: '📊',
        title: 'Porcentaje de Similitud (No es % de Plagio)',
        description: 'Turnitin genera "Similarity Index" (% de texto que coincide con fuentes). CRÍTICO: Similitud NO = plagio. 30% similitud puede ser legítimo (muchas citas correctas). 5% similitud puede ser plagio (copiaste 1 párrafo sin citar). Profesores interpretan contexto.'
      },
      {
        icon: '🤖',
        title: 'Detección de IA (AI Writing Detection)',
        description: 'Turnitin agregó detector de IA en 2023 para identificar texto de ChatGPT/Claude. Precisión declarada: ~98% (estudios independientes sugieren 85-90%). Genera falsos positivos (marca texto humano como IA), especialmente con escritores no-nativos de inglés.'
      },
      {
        icon: '📝',
        title: 'Almacena Trabajos Permanentemente',
        description: 'Cuando envías trabajo a Turnitin, se almacena permanentemente en base de datos. Trabajos futuros de otros estudiantes se comparan con el tuyo. CONTROVERSIA: Algunos argumentan que Turnitin "roba" propiedad intelectual sin compensación.'
      },
      {
        icon: '⚖️',
        title: 'Limitaciones Importantes',
        description: 'Turnitin NO detecta: (1) Plagio de libros físicos no digitalizados, (2) Paráfrasis (patchwriting con palabras cambiadas), (3) Plagio de contenido detrás de paywalls, (4) Trabajos comprados de sitios que no están en su base de datos. NO es infalible.'
      },
      {
        icon: '🎓',
        title: 'Uso en Universidades',
        description: 'Mayoría de universidades requieren enviar trabajos a Turnitin. Profesores revisan Similarity Report para decidir si hay plagio. Estudiantes generalmente pueden ver su reporte antes de entrega final (depende de configuración del profesor).'
      }
    ],
    examples: [
      '**Similitud alta legítima:** Tu ensayo tiene 35% similitud porque incluyes 10 citas textuales correctamente entrecomilladas y citadas = NO es plagio, Turnitin solo resalta coincidencias.',
      '**Similitud baja con plagio:** Tu ensayo tiene 8% similitud pero ese 8% es 1 párrafo completo copiado de Wikipedia sin citar = ES plagio aunque porcentaje sea bajo.',
      '**Falso positivo común:** Tu introducción usa frases estándar ("Este ensayo analiza...", "El objetivo es...") = Turnitin lo marca como similar a miles de ensayos, pero son frases comunes, no plagio.',
      '**Auto-plagio detectado:** Entregas mismo ensayo en dos clases. Turnitin lo detecta porque trabajo anterior está en base de datos. Muestra 100% similitud con "trabajo previo de mismo autor".',
      '**Detección de IA:** Usaste ChatGPT para escribir. Turnitin marca secciones como "AI: 95% probability". Profesor investiga y confirma uso de IA no declarado.',
      '**Patchwriting no detectado:** Copiaste estructura de paper pero cambiaste todas las palabras. Turnitin muestra 0% similitud, pero profesor compara manualmente y detecta patchwriting = plagio.'
    ],
    faqs: [
      {
        question: '¿Qué porcentaje de similitud en Turnitin es aceptable?',
        answer: 'NO existe regla universal. Depende de: (1) DISCIPLINA: Humanidades (muchas citas) pueden tener 20-30% legítimo. STEM (menos citas) esperan <10%. (2) TIPO DE TRABAJO: Ensayos con bibliografía extensa tendrán mayor %. (3) POLÍTICA DEL PROFESOR: Algunos aceptan hasta 25%, otros investigan cualquier cosa >15%. REGLA GENERAL: <15% raramente es problema SI similitudes son citas correctas. >25% requiere revisión cuidadosa. >40% es sospechoso. IMPORTANTE: % NO es lo único - profesores revisan QUÉ texto está marcado (citas vs contenido original).'
      },
      {
        question: '¿Cómo funciona técnicamente Turnitin?',
        answer: 'PROCESO: (1) FRAGMENTACIÓN: Turnitin divide tu documento en "strings" (secuencias de 8+ palabras consecutivas). (2) COMPARACIÓN: Compara cada string con billones de documentos en su base de datos usando algoritmos de coincidencia de texto. (3) IDENTIFICACIÓN: Marca coincidencias de 8+ palabras idénticas consecutivas (o similares con variaciones menores). (4) REPORTE: Genera mapa de calor mostrando qué texto coincide con qué fuentes, asigna % de similitud. (5) REVISIÓN HUMANA: Profesor interpreta reporte - Turnitin solo detecta similitud, humano decide si es plagio.'
      },
      {
        question: '¿Turnitin detecta texto traducido de otro idioma?',
        answer: 'PARCIALMENTE. Turnitin NO detecta traducciones directamente (traducir paper de inglés a español generalmente pasa Turnitin). PERO: (1) Turnitin tiene bases de datos en múltiples idiomas, (2) Si traduces de fuente en español que ya está en Turnitin, lo detectará, (3) Versiones recientes usan IA para detectar patrones de traducción automática, (4) Google Translate deja patrones reconocibles. CONSECUENCIA: Traducir sin citar SIGUE SIENDO PLAGIO aunque Turnitin no lo detecte (es plagio de ideas/estructura).'
      },
      {
        question: '¿Puedo ver mi reporte de Turnitin antes de entregarlo al profesor?',
        answer: 'DEPENDE de configuración del profesor. Opciones: (1) ACCESO INMEDIATO: Profesor permite que veas reporte apenas lo envías, puedes reenviar versión corregida (límite de reenvíos varía, típicamente 3-5 intentos). (2) ACCESO DESPUÉS DE FECHA LÍMITE: Solo ves reporte después de que todos entregaron (previene que "optimices" trabajo para engañar Turnitin). (3) SIN ACCESO: Solo profesor ve reporte. RECOMENDACIÓN: Si tienes acceso previo, úsalo para verificar que citas estén correctas, no para eliminar marcas legítimas.'
      },
      {
        question: '¿Cómo reducir el porcentaje de similitud en Turnitin éticamente?',
        answer: 'MÉTODOS ÉTICOS: (1) VERIFICA CITAS: Asegura que todas las citas textuales tengan comillas (Turnitin excluye texto entrecomillado si activas esa opción). (2) PARAFRASEA CORRECTAMENTE: Re-escribe con TUS palabras (no solo cambies sinónimos), SIEMPRE cita fuente. (3) REDUCE CITAS TEXTUALES: Pregúntate si realmente necesitas citar textualmente o puedes parafrasear. (4) EXCLUYE BIBLIOGRAFÍA: Configuración de Turnitin permite excluir referencias (pide a profesor). MÉTODOS NO ÉTICOS (NO USES): Cambiar letras por caracteres especiales, insertar caracteres blancos, usar imágenes de texto = profesores lo detectan fácilmente, resulta en sanciones graves.'
      },
      {
        question: '¿Qué significa cada color en el reporte de Turnitin?',
        answer: 'CÓDIGO DE COLORES del Similarity Index: AZUL (0%): Sin similitudes detectadas. VERDE (1-24%): Similitud baja, generalmente aceptable. AMARILLO (25-49%): Similitud media, requiere revisión. NARANJA (50-74%): Similitud alta, sospechoso. ROJO (75-100%): Similitud muy alta, probable plagio. IMPORTANTE: Color es solo indicador inicial. Debes ABRIR el reporte y revisar QUÉ texto está marcado. Verde puede incluir plagio (si el poco texto marcado es copia sin citar). Rojo puede ser legítimo (si es todo bibliografía o citas correctas).'
      },
      {
        question: '¿Turnitin guarda mi trabajo para siempre?',
        answer: 'SÍ, permanentemente. Cuando envías trabajo a Turnitin, aceptas (generalmente en términos de servicio de tu universidad) que: (1) Tu trabajo se almacena en base de datos de Turnitin indefinidamente, (2) Se usa para comparar con trabajos futuros de otros estudiantes, (3) Turnitin NO publica tu trabajo (solo almacena), (4) NO puedes pedir que lo eliminen (es parte del acuerdo institucional). CONTROVERSIA: Estudiantes demandaron a Turnitin argumentando violación de copyright. Cortes fallaron a favor de Turnitin (uso educativo = "fair use").'
      },
      {
        question: '¿Cómo interpretar el AI Writing Detection de Turnitin?',
        answer: 'Turnitin muestra porcentaje de probabilidad de IA: 0-20%: Bajo, probablemente humano. 21-80%: Medio, mixto o incierto. 81-100%: Alto, probablemente IA. CRÍTICO: NO es evidencia definitiva. FALSOS POSITIVOS comunes: (1) Escritores no-nativos de inglés, (2) Escritura formal/académica (sigue patrones estructurados), (3) Textos sobre temas técnicos. RECOMENDACIÓN: Detector de IA es herramienta auxiliar, NO prueba absoluta. Si te acusan falsamente, pide segunda opinión con DetectorDeIA.com u otros detectores, muestra borradores/notas.'
      }
    ],
    relatedTerms: [
      { term: 'Plagio Académico', slug: 'que-es-plagio-academico' },
      { term: 'Patchwriting', slug: 'que-es-patchwriting' },
      { term: 'Detector de IA', slug: 'que-es-detector-de-ia' }
    ],
    relatedTools: [
      { name: 'Detector de IA Gratis', url: '/?ref=glosario-turnitin' },
      { name: 'Pasar Detector Turnitin', url: '/pasar-detector-turnitin?ref=glosario-turnitin' }
    ],
    cta: {
      text: 'Verificar texto antes de Turnitin',
      url: '/?ref=glosario-turnitin'
    }
  },

  {
    slug: 'que-es-detector-de-ia',
    term: 'Detector de IA',
    keywords: [
      'que es detector de ia',
      'detector chatgpt',
      'como funciona detector ia',
      'detector de inteligencia artificial',
      'precisión detector ia'
    ],
    title: '¿Qué es un Detector de IA? Cómo Funciona y Precisión 2025',
    description: 'Descubre qué es un detector de IA, cómo identifica texto de ChatGPT/Claude, precisión real, limitaciones, falsos positivos. Guía completa para estudiantes.',
    h1: '¿Qué es un Detector de IA? Guía Completa para Estudiantes',
    intro: 'Detector de IA es software que analiza texto para determinar si fue generado por inteligencia artificial (ChatGPT, Claude, Gemini) o escrito por humanos. Con explosión de IA generativa en educación (2022-2025), universidades adoptaron detectores para identificar uso no autorizado de IA. Esta guía explica cómo funcionan técnicamente los detectores, qué precisión tienen realmente, diferencia entre detectores (GPTZero, Turnitin, DetectorDeIA.com), y por qué falsos positivos son problema grave.',
    definition: 'Detector de IA es herramienta que usa modelos de machine learning para analizar patrones estadísticos de texto y predecir probabilidad de que sea generado por IA. Analiza: perplexidad (predictibilidad del texto), burstiness (variación en longitud de oraciones), vocabulario (distribución de palabras), coherencia estructural, transiciones entre ideas. Resultado: porcentaje de probabilidad (ej: "85% IA, 15% humano").',
    characteristics: [
      {
        icon: '📊',
        title: 'Análisis de Perplexidad (Predictibilidad)',
        description: 'PERPLEXIDAD mide qué tan predecible es el texto. IA generativa predice palabra siguiente más probable → texto con baja perplexidad (muy predecible). Humanos usan giros inesperados, vocabulario variado → alta perplexidad. Detectores analizan perplexidad de cada oración para identificar patrones de IA.'
      },
      {
        icon: '📈',
        title: 'Análisis de Burstiness (Variación)',
        description: 'BURSTINESS mide variación en longitud/complejidad de oraciones. Humanos alternan oraciones cortas y largas naturalmente. IA tiende a uniformidad (oraciones de longitud similar, complejidad constante). Alta uniformidad = sospecha de IA.'
      },
      {
        icon: '🎯',
        title: 'Precisión Real: 85-95% (No 100%)',
        description: 'Detectores modernos (GPTZero, Turnitin, DetectorDeIA.com) tienen ~85-95% precisión según estudios independientes. SIGNIFICA: 5-15% de clasificaciones son ERRÓNEAS. Pueden generar falsos positivos (marcan humano como IA) y falsos negativos (no detectan IA editada).'
      },
      {
        icon: '⚠️',
        title: 'Falsos Positivos Comunes',
        description: 'Detectores marcan texto HUMANO como IA cuando: (1) Escritor no-nativo de inglés (usa construcciones simples/predecibles), (2) Escritura formal/académica (sigue estructuras estándar), (3) Temas técnicos (vocabulario especializado limitado), (4) Estudiantes con escritura "pulida". PROBLEMA: Acusaciones injustas.'
      },
      {
        icon: '🔍',
        title: 'Tipos de Detectores',
        description: 'DETECTORES ESPECIALIZADOS: GPTZero (educación), DetectorDeIA.com (español + LATAM), Originality.AI (contenido web). DETECTORES INTEGRADOS: Turnitin AI Detection (universidades), Copyleaks. GRATUITOS vs PAGOS: Gratuitos tienen límites (caracteres, usos diarios), pagos ofrecen análisis detallado + reportes.'
      },
      {
        icon: '🧠',
        title: 'Limitaciones Técnicas',
        description: 'Detectores NO pueden identificar con certeza: (1) Texto de IA + edición humana significativa, (2) IA con instrucciones de "escribir como humano", (3) Mezcla de texto humano + IA (párrafos alternados), (4) Nuevos modelos de IA no incluidos en entrenamiento del detector. NO son prueba definitiva de plagio.'
      }
    ],
    examples: [
      '**Detección correcta de IA:** Texto tiene vocabulario uniformemente sofisticado, oraciones de longitud similar, transiciones formulaicas ("es importante destacar", "cabe mencionar") → Detector: "95% IA".',
      '**Falso positivo:** Estudiante internacional escribe ensayo en inglés con estructuras simples y vocabulario básico → Detector marca "80% IA" aunque sea 100% escrito por humano.',
      '**Detección fallida (falso negativo):** Estudiante usa ChatGPT pero edita manualmente, cambia estructuras, agrega anécdotas personales → Detector: "20% IA" aunque base sea generada por IA.',
      '**Texto mixto:** Estudiante escribe introducción y conclusión, ChatGPT escribe cuerpo. Detector muestra "60% IA" (detecta secciones de IA pero no todas).',
      '**Texto académico legítimo:** Estudiante escribe paper con estructura estándar de papers académicos (intro-método-resultados-discusión) → Detector marca "40% IA" por formalidad estructurada = falso positivo.'
    ],
    faqs: [
      {
        question: '¿Cómo funcionan técnicamente los detectores de IA?',
        answer: 'PROCESO: (1) ENTRENAMIENTO: Detector entrena con millones de textos etiquetados (humanos vs IA) para aprender patrones. (2) ANÁLISIS: Cuando analizas texto, detector calcula múltiples métricas: perplexidad (predictibilidad), burstiness (variación de oraciones), distribución de palabras, coherencia, n-gramas (secuencias de palabras comunes en IA). (3) CLASIFICACIÓN: Modelo de ML combina métricas y genera probabilidad (ej: "85% IA"). (4) REPORTE: Muestra % general + análisis por oración/párrafo (algunos detectores). LIMITACIÓN: Es predicción estadística, NO prueba definitiva.'
      },
      {
        question: '¿Cuál es el mejor detector de IA en 2025?',
        answer: 'DEPENDE del idioma y uso: INGLÉS: GPTZero (educación, ~90% precisión, usado por universidades), Originality.AI (content creators, detección + plagio). ESPAÑOL/LATAM: DetectorDeIA.com (optimizado para español, dialectos LATAM, 15 usos gratis diarios). INTEGRADO: Turnitin AI Detection (si tu universidad usa Turnitin). GRATUITO CON LÍMITES: GPTZero (10,000 palabras/mes gratis), DetectorDeIA.com (15 usos diarios gratis). RECOMENDACIÓN: Usa 2-3 detectores diferentes para comparar resultados (si todos coinciden, más confiable).'
      },
      {
        question: '¿Por qué los detectores de IA generan falsos positivos?',
        answer: 'CAUSAS de falsos positivos: (1) ESCRITURA PREDECIBLE: Texto humano que sigue patrones estructurados (papers académicos, ensayos formales) se parece estadísticamente a IA. (2) VOCABULARIO LIMITADO: Temas técnicos tienen vocabulario especializado repetitivo que IA también usa. (3) NO-NATIVOS: Estudiantes internacionales usan inglés más simple/predecible (similar a output de IA). (4) SESGO DEL DETECTOR: Entrenado principalmente con inglés nativo, no reconoce variaciones legítimas. FRECUENCIA: Estudios muestran 5-15% de textos humanos marcados como IA.'
      },
      {
        question: '¿Los detectores de IA son evidencia legal de plagio?',
        answer: 'NO, generalmente NO son evidencia suficiente por sí solos. RAZONES: (1) TASA DE ERROR: 5-15% falsos positivos = razonable duda. (2) POLÍTICAS UNIVERSITARIAS: Mayoría de universidades requieren evidencia adicional (entrevista con estudiante, revisar borradores, análisis de estilo vs trabajos previos). (3) CASOS LEGALES: Estudiantes han apelado acusaciones basadas solo en detectores, ganando cuando prueban falso positivo. USO CORRECTO: Detectores son herramienta de screening inicial, NO prueba definitiva. Profesor debe investigar más antes de acusar plagio.'
      },
      {
        question: '¿Cómo evitar falsos positivos en detectores de IA?',
        answer: 'ESTRATEGIAS si escribes texto humano pero detector lo marca como IA: (1) USA VARIEDAD: Alterna oraciones cortas y largas, vocabulario diverso, evita estructuras repetitivas. (2) AGREGA PERSONALIZACIÓN: Incluye anécdotas personales, opiniones, ejemplos específicos (IA generaliza). (3) EVITA FRASES FORMULAICAS: "Es importante destacar", "cabe mencionar", "en conclusión" son banderas rojas (IA las usa mucho). (4) MUESTRA PROCESO: Guarda borradores, notas, outline para demostrar proceso de escritura. (5) PIDE SEGUNDA OPINIÓN: Usa 2-3 detectores diferentes; si solo uno marca como IA, probablemente es falso positivo.'
      },
      {
        question: '¿Pueden detectores identificar IA "humanizada"?',
        answer: 'DEPENDE del grado de humanización. EDICIÓN SUPERFICIAL (cambiar palabras, añadir frases): Detectores modernos aún identifican ~70-80%. EDICIÓN PROFUNDA (re-estructurar párrafos, cambiar orden de ideas, agregar contenido original): Detectores fallan frecuentemente, marcan como humano. HERRAMIENTAS DE HUMANIZACIÓN (Undetectable.ai, etc.): Efectividad varía (30-70% pasan detectores según herramienta). TENDENCIA: Carrera armamentística - detectores mejoran, humanizadores mejoran, ciclo continúa. ÉTICA: Usar humanizadores para engañar detectores = violación de integridad académica en mayoría de universidades.'
      },
      {
        question: '¿Qué hacer si un detector marca mi trabajo humano como IA?',
        answer: 'PASOS si te acusan falsamente: (1) MANTÉN CALMA: Falsos positivos son comunes, tienes derecho a apelar. (2) USA OTROS DETECTORES: Prueba tu texto en 2-3 detectores diferentes (GPTZero, DetectorDeIA.com, Originality.AI) - si resultados varían, refuerza argumento de falso positivo. (3) MUESTRA EVIDENCIA: Borradores, notas, outline, historial de ediciones (Google Docs muestra historial), emails con profesor discutiendo ideas. (4) SOLICITA ENTREVISTA: Demuestra conocimiento profundo del tema que escribiste. (5) CONSULTA POLÍTICAS: Revisa si tu universidad permite acusaciones basadas solo en detectores. (6) APELA FORMALMENTE: Si necesario, usa proceso de apelación académica.'
      },
      {
        question: '¿Los detectores de IA violan privacidad?',
        answer: 'DEPENDE del detector. PRIVACIDAD: (1) ALGUNOS ALMACENAN TEXTO: Turnitin, Copyleaks almacenan texto analizado en sus bases de datos. (2) OTROS NO ALMACENAN: GPTZero, DetectorDeIA.com declaran que no guardan texto después de análisis (verifica políticas de privacidad). (3) DATOS DE ENTRENAMIENTO: Algunos detectores entrenan modelos con textos analizados (anonimizados). RECOMENDACIÓN: Si texto contiene información sensible/privada, usa detectores que declaren "no almacenamiento" o elimina información identificable antes de analizar.'
      }
    ],
    relatedTerms: [
      { term: 'ChatGPT', slug: 'que-es-chatgpt' },
      { term: 'Claude AI', slug: 'que-es-claude-ai' },
      { term: 'Turnitin', slug: 'que-es-turnitin' },
      { term: 'Inteligencia Artificial Generativa', slug: 'que-es-inteligencia-artificial-generativa' }
    ],
    relatedTools: [
      { name: 'Detector de IA Gratis', url: '/?ref=glosario-detector-ia' },
      { name: 'Detector de ChatGPT', url: '/detector-de-chatgpt-gratis?ref=glosario-detector-ia' },
      { name: 'Humanizador de IA Gratis', url: '/humanizador-de-ia-gratis?ref=glosario-detector-ia' }
    ],
    cta: {
      text: 'Analizar texto con detector de IA',
      url: '/?ref=glosario-detector-ia'
    }
  },

  {
    slug: 'que-es-un-prompt',
    term: 'Prompt (Ingeniería de Prompts)',
    keywords: [
      'que es un prompt',
      'prompt ia',
      'ingenieria de prompts',
      'como escribir prompts',
      'prompt engineering'
    ],
    title: '¿Qué es un Prompt? Guía de Ingeniería de Prompts 2025',
    description: 'Descubre qué es un prompt, cómo escribir prompts efectivos para ChatGPT/Claude, técnicas de prompt engineering. Guía completa con ejemplos.',
    h1: '¿Qué es un Prompt? Guía Completa de Ingeniería de Prompts',
    intro: 'Prompt es instrucción o pregunta que das a modelo de IA (ChatGPT, Claude, Gemini) para obtener respuesta específica. Calidad del prompt determina calidad de respuesta: prompt vago genera respuesta genérica, prompt detallado genera respuesta útil y específica. Ingeniería de prompts (prompt engineering) es disciplina emergente que estudia cómo escribir prompts efectivos para maximizar utilidad de IA. Esta guía explica qué son prompts, tipos, técnicas avanzadas, y mejores prácticas para estudiantes.',
    definition: 'Prompt es texto que envías a modelo de lenguaje de IA para generar respuesta. Puede ser: pregunta ("¿Qué es fotosíntesis?"), instrucción ("Explica fotosíntesis en 100 palabras"), solicitud compleja ("Analiza este ensayo y dame feedback sobre argumentación"). Ingeniería de prompts es práctica de diseñar prompts optimizados para obtener mejores resultados de IA, usando técnicas específicas como few-shot learning, chain-of-thought, role prompting.',
    characteristics: [
      {
        icon: '💬',
        title: 'Tipos de Prompts',
        description: 'PREGUNTA SIMPLE: "¿Qué es X?" INSTRUCCIÓN: "Explica X paso a paso." ROLE PROMPT: "Eres profesor de física. Explica X a estudiante de secundaria." CONTEXTO + TAREA: "Dado este contexto [contexto], realiza [tarea]." CHAIN-OF-THOUGHT: "Explica tu razonamiento paso a paso antes de dar respuesta final." FEW-SHOT: "Aquí hay 3 ejemplos [ejemplos]. Ahora haz esto [tarea]."'
      },
      {
        icon: '🎯',
        title: 'Especificidad = Mejor Resultado',
        description: 'Prompt vago: "Ayúdame con ensayo" → IA no sabe qué hacer. Prompt específico: "Revisa este ensayo de 500 palabras sobre cambio climático. Dame feedback sobre: (1) claridad de tesis, (2) solidez de argumentos, (3) gramática" → IA sabe exactamente qué analizar.'
      },
      {
        icon: '🧠',
        title: 'Chain-of-Thought (Cadena de Pensamiento)',
        description: 'Técnica donde pides a IA "pensar en voz alta" antes de responder. Ejemplo: "Resuelve este problema. Primero, explica tu razonamiento paso a paso. Luego, da respuesta final." Resultado: Respuestas más precisas, especialmente en matemáticas/lógica.'
      },
      {
        icon: '🎭',
        title: 'Role Prompting (Asignar Rol)',
        description: 'Das a IA un "rol" para obtener respuestas especializadas. Ejemplo: "Eres tutor universitario experto en biología. Explica mitosis a estudiante que no entiende concepto después de leer libro de texto. Usa analogías simples." IA adapta tono y complejidad.'
      },
      {
        icon: '📚',
        title: 'Few-Shot Learning (Aprendizaje con Ejemplos)',
        description: 'Proporcionas 2-3 ejemplos de lo que quieres, luego pides a IA hacer similar. Ejemplo: "Resume en 1 oración: [Paper 1] → [Resumen 1]. [Paper 2] → [Resumen 2]. Ahora resume: [Tu paper]." IA aprende formato deseado de ejemplos.'
      },
      {
        icon: '⚙️',
        title: 'Parámetros de Control',
        description: 'Instrucciones que controlan output: longitud ("en 100 palabras"), formato ("en lista con bullets"), tono ("tono formal académico"), nivel ("para estudiante de secundaria"), restricciones ("sin usar jerga técnica"). Guían cómo IA estructura respuesta.'
      }
    ],
    examples: [
      '**Prompt básico:** "Explica cambio climático" → Respuesta genérica de 3 párrafos.',
      '**Prompt mejorado:** "Explica cambio climático a estudiante de 15 años que nunca estudió ciencia. Usa 3 analogías simples. Máximo 200 palabras." → Respuesta específica, apropiada para audiencia.',
      '**Role prompt:** "Eres profesor de historia especializado en América Latina. Explica Revolución Mexicana enfocándote en causas económicas. Audiencia: universitarios de primer año." → Respuesta especializada.',
      '**Chain-of-thought:** "Problema: Juan tiene 3 manzanas, María tiene el doble. ¿Cuántas tienen juntos? IMPORTANTE: Primero explica paso a paso tu razonamiento, luego da respuesta." → IA muestra trabajo.',
      '**Few-shot:** "Transforma a pregunta: Afirmación: El cielo es azul. Pregunta: ¿De qué color es el cielo? Ahora: Afirmación: ChatGPT fue lanzado en 2022. Pregunta:" → IA aprende patrón de ejemplos.',
      '**Prompt para uso académico ético:** "Tengo dificultad entendiendo [concepto]. NO escribas mi ensayo. En cambio: (1) Explica concepto con ejemplos, (2) Sugiere estructura para organizar ideas, (3) Recomienda fuentes académicas." → Ayuda sin plagio.'
    ],
    faqs: [
      {
        question: '¿Qué hace un buen prompt?',
        answer: 'Un buen prompt tiene: (1) CLARIDAD: Instrucción específica y sin ambigüedad. (2) CONTEXTO: Información necesaria para respuesta relevante. (3) CONSTRAINTS: Limitaciones (longitud, formato, tono). (4) AUDIENCIA: Para quién es la respuesta. (5) FORMATO DESEADO: Cómo estructurar output (lista, párrafos, tabla). EJEMPLO COMPLETO: "Contexto: Soy estudiante de biología estudiando ecosistemas. Tarea: Explica sucesión ecológica. Formato: 3 párrafos (primario, secundario, clímax). Audiencia: compañero de clase. Tono: informal pero preciso. Usa ejemplo concreto de bosque después de incendio."'
      },
      {
        question: '¿Qué es ingeniería de prompts (prompt engineering)?',
        answer: 'Ingeniería de prompts es disciplina que estudia cómo diseñar prompts optimizados para obtener mejores respuestas de modelos de IA. Incluye técnicas como: few-shot learning (aprender de ejemplos), chain-of-thought (razonamiento paso a paso), role prompting (asignar roles), prompt chaining (secuencia de prompts), retrieval-augmented generation (prompts con documentos externos). APLICACIONES: Empresas contratan "prompt engineers" para optimizar uso de IA. EDUCACIÓN: Estudiantes que dominan prompting obtienen mejores resultados de ChatGPT/Claude.'
      },
      {
        question: '¿Cómo escribir prompts para ChatGPT/Claude sin plagiar?',
        answer: 'PROMPTS ÉTICOS para uso académico: (1) PIDE EXPLICACIONES, NO TRABAJOS COMPLETOS: "Explícame [concepto] con ejemplos" NO "Escribe mi ensayo sobre [tema]". (2) SOLICITA GUÍA DE ESTRUCTURA: "Sugiere outline para ensayo sobre X" NO "Genera ensayo completo". (3) PIDE FEEDBACK: "Revisa mi borrador y sugiere mejoras" NO "Re-escribe mi trabajo". (4) SOLICITA FUENTES: "Recomienda 5 fuentes académicas sobre X" NO "Escribe bibliografía ficticia". (5) PIDE IDEAS, TÚ DESARROLLAS: "Dame 3 argumentos sobre X" luego TÚ los desarrollas con tus palabras. REGLA: IA como tutor, no ghostwriter.'
      },
      {
        question: '¿Cuál es la diferencia entre prompt simple y prompt avanzado?',
        answer: 'PROMPT SIMPLE: Pregunta directa sin contexto. "Explica fotosíntesis." Resultado: Respuesta genérica de Wikipedia-style. PROMPT AVANZADO: Incluye contexto, rol, formato, audiencia. "Eres tutor de biología. Estudiante de 16 años no entendió fotosíntesis después de leer libro. Explica usando: (1) analogía con cocina, (2) diagrama verbal paso a paso, (3) ejemplo con planta específica (no rosa genérica). Máximo 250 palabras. Termina con 2 preguntas para verificar comprensión." Resultado: Respuesta personalizada, específica, útil. DIFERENCIA: Especificidad + estructura = mejor output.'
      },
      {
        question: '¿Qué es "temperatura" en prompts?',
        answer: 'TEMPERATURA es parámetro (0.0-1.0) que controla "creatividad" vs "predictibilidad" de respuestas de IA. BAJA TEMPERATURA (0.0-0.3): Respuestas predecibles, consistentes, conservadoras. Útil para: tareas factuales, matemáticas, código. MEDIA TEMPERATURA (0.4-0.7): Balance creatividad-precisión (default en ChatGPT). ALTA TEMPERATURA (0.8-1.0): Respuestas creativas, variadas, "arriesgadas". Útil para: brainstorming, escritura creativa, ideas originales. EN PROMPTS: Algunos sistemas permiten especificar "Usa temperatura baja para precisión" aunque mayoría de interfaces (ChatGPT, Claude) no exponen este control directamente.'
      },
      {
        question: '¿Cómo usar prompts para aprender (no para hacer trampa)?',
        answer: 'USO LEGÍTIMO DE PROMPTS en educación: (1) TUTOR PERSONAL: "Explícame [concepto difícil] con múltiples analogías hasta que entienda." (2) FEEDBACK ITERATIVO: "Revisa mi argumento: [argumento]. ¿Tiene huecos lógicos?" (3) PREGUNTAS SOCRÁTICAS: "No me des respuesta. Hazme preguntas que me guíen a descubrir solución de [problema]." (4) PRÁCTICA: "Dame 5 problemas de práctica sobre [tema] con dificultad creciente. NO des respuestas aún." (5) VERIFICACIÓN: "Resolví [problema]. Mi respuesta: [respuesta]. ¿Es correcta? Si no, explica mi error." CLAVE: Usas IA para ENTENDER, no para COPIAR.'
      },
      {
        question: '¿Los profesores pueden detectar que usaste prompts?',
        answer: 'SÍ, indirectamente. Profesores detectan: (1) TRABAJO INCONSISTENTE: Si tu ensayo tiene nivel de vocabulario/complejidad que no coincide con trabajos previos. (2) FALTA DE PERSONALIZACIÓN: Respuestas genéricas sin ejemplos personales/específicos del curso. (3) PATRONES DE IA: Frases formulaicas, estructura predecible típica de ChatGPT. (4) ERRORES TÍPICOS DE IA: Inventa citas, confunde fechas/nombres. (5) ENTREVISTAS: Profesor pregunta sobre tu trabajo; si no puedes explicar ideas = sospecha. PREVENCIÓN: Si usas IA éticamente (para entender, no copiar), puedes explicar perfectamente tu trabajo porque realmente aprendiste.'
      },
      {
        question: '¿Debo citar a ChatGPT si usé prompts para generar ideas?',
        answer: 'DEPENDE de política de tu universidad y cómo usaste IA: DEBES CITAR si: (1) Copiaste texto generado (aunque sea reformulado), (2) Usaste ideas/argumentos específicos generados por IA, (3) IA generó estructura/outline que seguiste. NO NECESITAS CITAR si: (1) Solo usaste IA para entender concepto (como usar libro de texto), (2) IA te dio feedback sobre tu propio borrador. REGLA SEGURA: Cuando dudes, CITA. Formato APA: (OpenAI, 2024) o declara en nota al pie: "Usé ChatGPT para [propósito específico: generar ideas iniciales, feedback sobre borrador, etc.]". MEJOR: Verifica política específica de tu institución.'
      }
    ],
    relatedTerms: [
      { term: 'ChatGPT', slug: 'que-es-chatgpt' },
      { term: 'Claude AI', slug: 'que-es-claude-ai' },
      { term: 'Inteligencia Artificial Generativa', slug: 'que-es-inteligencia-artificial-generativa' }
    ],
    relatedTools: [
      { name: 'Detector de IA Gratis', url: '/?ref=glosario-prompt' },
      { name: 'Humanizador de IA Gratis', url: '/humanizador-de-ia-gratis?ref=glosario-prompt' }
    ],
    cta: {
      text: 'Verificar si texto es de IA',
      url: '/?ref=glosario-prompt'
    }
  },

  {
    slug: 'diferencia-entre-ia-y-texto-humano',
    term: 'Diferencia entre IA y Texto Humano',
    keywords: [
      'diferencia ia texto humano',
      'como distinguir ia de humano',
      'texto ia vs humano',
      'identificar texto ia',
      'patrones texto ia'
    ],
    title: 'Diferencia entre IA y Texto Humano: Cómo Distinguirlos 2025',
    description: 'Aprende las diferencias clave entre texto de IA (ChatGPT, Claude) y texto humano. Patrones detectables, señales lingüísticas, cómo identificar contenido generado por IA.',
    h1: 'Diferencia entre IA y Texto Humano: Guía Completa',
    intro: 'Texto generado por IA (ChatGPT, Claude, Gemini) tiene patrones distintivos que lo diferencian de escritura humana, aunque IA mejora constantemente en imitar estilo humano. Diferencias clave incluyen: uniformidad en vocabulario, estructura predecible, falta de experiencias personales auténticas, uso excesivo de transiciones formulaicas. Esta guía explica cómo profesores, detectores, y lectores entrenados identifican texto de IA, qué señales buscar, y por qué distinción es importante en contexto académico.',
    definition: 'Texto de IA es generado por modelos de lenguaje que predicen palabra siguiente más probable basándose en patrones de billones de textos. Resultado: escritura estadísticamente "perfecta" pero carente de elementos humanos auténticos (experiencias personales únicas, voz individual consistente, imperfecciones naturales). Texto humano incluye variabilidad natural, giros inesperados, anécdotas específicas, errores ocasionales, estilo personal reconocible. Detectores usan estas diferencias para clasificar texto.',
    characteristics: [
      {
        icon: '📊',
        title: 'Uniformidad vs Variabilidad',
        description: 'IA: Vocabulario uniformemente sofisticado, oraciones de longitud similar, complejidad constante. Humano: Vocabulario varía (palabras simples + complejas), oraciones cortas y largas alternadas, niveles de complejidad fluctúan. IA es "demasiado consistente" - humanos tienen más variación natural (burstiness).'
      },
      {
        icon: '🎭',
        title: 'Genericidad vs Especificidad',
        description: 'IA: Ejemplos genéricos ("Por ejemplo, en muchos casos..."), afirmaciones amplias, citas comunes. Humano: Ejemplos específicos concretos ("En mi clase de física el martes pasado..."), detalles únicos, referencias personales. IA generaliza porque no tiene experiencias reales.'
      },
      {
        icon: '🔄',
        title: 'Patrones Estructurales Predecibles',
        description: 'IA: Estructura formulaica (intro estándar, 3 párrafos de cuerpo balanceados, conclusión que resume). Transiciones mecánicas ("En primer lugar...", "Por otro lado...", "En conclusión..."). Humano: Estructura más orgánica, transiciones variadas, párrafos de longitud irregular, tangentes ocasionales.'
      },
      {
        icon: '💬',
        title: 'Frases Formulaicas (Banderas Rojas)',
        description: 'IA usa frecuentemente: "Es importante destacar", "Cabe mencionar", "Vale la pena señalar", "En el contexto de", "A lo largo de la historia", "En el ámbito de", "Resulta fundamental". Humanos usan estas frases ocasionalmente, IA las usa excesivamente porque son "seguras" estadísticamente.'
      },
      {
        icon: '🧠',
        title: 'Coherencia Perfecta vs Imperfecciones Naturales',
        description: 'IA: Coherencia impecable, sin contradicciones, flujo lógico perfecto, gramática perfecta. Humano: Ocasionales inconsistencias, divagaciones, errores tipográficos/gramática, pensamiento que evoluciona durante escritura. Perfección sostenida es sospechosa.'
      },
      {
        icon: '❤️',
        title: 'Ausencia vs Presencia de Voz Personal',
        description: 'IA: Voz neutral, objetiva, sin personalidad distintiva. No toma posiciones fuertes, evita controversia. Humano: Voz única, opiniones matizadas, humor personal, frustración/entusiasmo visible, estilo reconocible. IA suena como "comité escribiendo documento corporativo".'
      }
    ],
    examples: [
      '**IA:** "La inteligencia artificial ha revolucionado diversos sectores de la sociedad. Es importante destacar que su implementación presenta tanto beneficios como desafíos. En primer lugar, cabe mencionar que la automatización..." → Genérico, frases formulaicas.',
      '**Humano:** "Cuando usé ChatGPT por primera vez en octubre, me sorprendió. Pero después de una semana noté algo raro: todos mis ensayos sonaban igual. Mi profesora también lo notó..." → Específico, experiencia personal, fecha concreta.',
      '**IA detectando IA:** "El texto presenta perplexidad baja (oraciones muy predecibles), burstiness bajo (poca variación en longitud de oraciones), y vocabulario uniformemente avanzado. Probabilidad IA: 92%."',
      '**Patrón de IA:** Ensayo de 1000 palabras con 5 párrafos exactos de ~200 palabras cada uno, cada párrafo con estructura idéntica (afirmación + elaboración + ejemplo + conclusión). Demasiado balanceado = sospechoso.',
      '**Patrón humano:** Ensayo de 980 palabras con 7 párrafos irregulares (120, 200, 95, 250, 180, 85, 50 palabras). Introducción más larga que conclusión. Un párrafo es tangente sobre anécdota personal. Más natural.',
      '**Mezcla IA + Humano:** Introducción genérica (IA), cuerpo con ejemplos específicos de clase (humano), conclusión formulaica (IA). Detectores muestran "60% IA" - detectan secciones generadas.'
    ],
    faqs: [
      {
        question: '¿Cuáles son las señales más obvias de texto de IA?',
        answer: 'TOP 10 SEÑALES de texto generado por IA: (1) Frases "es importante destacar", "cabe mencionar", "vale la pena señalar" usadas 3+ veces. (2) Estructura perfectamente balanceada (3-5 párrafos de igual longitud). (3) Vocabulario uniformemente sofisticado (sin palabras simples/coloquiales). (4) Ejemplos genéricos sin detalles específicos. (5) Ausencia total de experiencias/opiniones personales. (6) Transiciones mecánicas ("En primer lugar", "Por otro lado", "En conclusión"). (7) Sin errores tipográficos/gramática (perfección sospechosa). (8) Lista de 3-5 puntos para cada tema. (9) Evita tomar posiciones controversiales. (10) Conclusión que repite introducción casi literalmente.'
      },
      {
        question: '¿Por qué el texto de IA es tan "perfecto"?',
        answer: 'IA genera texto "perfecto" porque: (1) PREDICCIÓN ESTADÍSTICA: Selecciona palabras/estructuras más probables (evita riesgos). (2) ENTRENAMIENTO CON TEXTO EDITADO: Aprende de contenido publicado/editado (no borradores con errores). (3) NO HAY FATIGA: No comete errores de cansancio/distracción que humanos hacen. (4) OPTIMIZACIÓN: Entrenada para coherencia, claridad, gramática correcta. IRONÍA: Perfección sostenida es antinatural - humanos cometen errores ocasionales incluso cuando escriben bien. Ensayo de 2000 palabras sin UN SOLO error es sospechoso.'
      },
      {
        question: '¿Puede IA escribir con estilo "humano" imperfecto?',
        answer: 'SÍ, si se lo instruyes con prompts específicos. PROMPTS HUMANIZADORES: "Escribe como estudiante universitario real, incluye: (1) Variación en longitud de oraciones, (2) 1-2 errores menores gramática, (3) Tangente personal breve, (4) Evita frases formulaicas, (5) Usa palabras simples ocasionalmente." IA puede imitar imperfecciones. PERO: (1) Difícil lograr autenticidad completa, (2) "Errores" de IA suenan artificiales, (3) Falta experiencias personales reales verificables. TENDENCIA: Carrera armamentística - IA mejora imitando humanos, detectores mejoran identificando IA humanizada.'
      },
      {
        question: '¿Cómo distinguen los profesores texto de IA vs humano?',
        answer: 'MÉTODOS DE PROFESORES: (1) COMPARACIÓN CON TRABAJOS PREVIOS: Cambio drástico en estilo/nivel = sospecha. (2) BÚSQUEDA DE ESPECIFICIDAD: Marcan afirmaciones genéricas, piden ejemplos concretos. (3) ENTREVISTA ORAL: Preguntan sobre argumentos del ensayo - si estudiante no puede explicar = sospecha. (4) FRASES BANDERAS ROJAS: "Es importante destacar" 5+ veces = probable IA. (5) VERIFICACIÓN DE CITAS: IA inventa estudios/citas - profesor verifica que existan. (6) ANÁLISIS DE ESTRUCTURA: Párrafos perfectamente balanceados = sospecha. (7) DETECTORES: Usan GPTZero, Turnitin AI como herramienta auxiliar.'
      },
      {
        question: '¿Qué es "perplexidad" y cómo identifica IA?',
        answer: 'PERPLEXIDAD mide predictibilidad del texto. ALTA PERPLEXIDAD (humano): Elecciones de palabras sorprendentes, giros inesperados, vocabulario variado. Ejemplo: "Pensé que entendía IA. Spoiler: no entendía nada. La realidad es más rara." BAJA PERPLEXIDAD (IA): Elecciones de palabras predecibles, flujo esperado. Ejemplo: "La inteligencia artificial es un campo importante de estudio. Presenta numerosas aplicaciones en diversos sectores." IA predice palabra siguiente más probable → genera texto con baja perplexidad. DETECTORES: Calculan perplexidad de cada oración; perplexidad consistentemente baja en todo texto = probable IA.'
      },
      {
        question: '¿Por qué IA no incluye experiencias personales auténticas?',
        answer: 'IA NO tiene experiencias personales porque: (1) NO TIENE CONSCIENCIA: Es modelo estadístico, no ser consciente con memoria episódica. (2) NO VIVE EVENTOS: No asiste a clases, no tiene conversaciones reales, no experimenta emociones. (3) GENERALIZA DE DATOS: Cuando genera "anécdota personal" sintetiza patrones de millones de anécdotas (resulta genérico). EJEMPLO IA: "Como muchos estudiantes, enfrenté desafíos al estudiar este tema." (vago). EJEMPLO HUMANO: "El martes en laboratorio de química, mezclé reactivos en orden incorrecto. Mi compañera Sara me detuvo segundos antes de crear reacción peligrosa." (específico, verificable, memorable).'
      },
      {
        question: '¿Texto mixto (IA + edición humana) es detectable?',
        answer: 'DEPENDE del grado de edición. EDICIÓN SUPERFICIAL (cambiar palabras, añadir frases): Detectores identifican ~70-80%. EDICIÓN PROFUNDA (re-estructurar, agregar anécdotas personales, variar estilo): Detectores fallan frecuentemente. TEXTO MIXTO COMÚN: Estudiante usa ChatGPT para cuerpo, escribe intro/conclusión propio. Detectores muestran "60% IA". Profesores detectan inconsistencia de estilo entre secciones. DIFICULTAD: Diferencia entre (1) usar IA como herramienta legítima (feedback, ideas) vs (2) usar IA para generar sustancia del trabajo. Línea puede ser borrosa.'
      },
      {
        question: '¿Por qué importa distinguir IA de humano en educación?',
        answer: 'IMPORTANCIA de distinción: (1) EVALUACIÓN DE APRENDIZAJE: Profesores evalúan comprensión del estudiante, no capacidad de usar ChatGPT. (2) DESARROLLO DE HABILIDADES: Escritura desarrolla pensamiento crítico - copiar de IA previene desarrollo. (3) INTEGRIDAD ACADÉMICA: Presentar trabajo ajeno (incluido IA) como propio = plagio. (4) EQUIDAD: Si algunos usan IA sin declarar, tienen ventaja injusta sobre quienes no usan. (5) PREPARACIÓN PROFESIONAL: Habilidades de escritura/pensamiento son esenciales en carreras - saltarlas con IA perjudica futuro. NO es "IA vs humanos", es garantizar que educación cumpla su propósito: desarrollar capacidades.'
      }
    ],
    relatedTerms: [
      { term: 'ChatGPT', slug: 'que-es-chatgpt' },
      { term: 'Detector de IA', slug: 'que-es-detector-de-ia' },
      { term: 'Inteligencia Artificial Generativa', slug: 'que-es-inteligencia-artificial-generativa' },
      { term: 'Prompt', slug: 'que-es-un-prompt' }
    ],
    relatedTools: [
      { name: 'Detector de IA Gratis', url: '/?ref=glosario-diferencia-ia-humano' },
      { name: 'Detector de ChatGPT', url: '/detector-de-chatgpt-gratis?ref=glosario-diferencia-ia-humano' },
      { name: 'Humanizador de IA Gratis', url: '/humanizador-de-ia-gratis?ref=glosario-diferencia-ia-humano' }
    ],
    cta: {
      text: 'Analizar texto con detector de IA',
      url: '/?ref=glosario-diferencia-ia-humano'
    }
  }
];
