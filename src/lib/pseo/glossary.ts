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
  }
];
