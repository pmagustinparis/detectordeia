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
  },

  {
    slug: 'que-es-deepseek',
    term: 'DeepSeek',
    keywords: [
      'que es deepseek',
      'deepseek ia',
      'deepseek vs chatgpt',
      'deepseek modelo ia chino',
      'deepseek r1 explicacion'
    ],
    title: '¿Qué es DeepSeek? El Modelo de IA Chino que Revolucionó 2025',
    description: 'Descubre qué es DeepSeek, el modelo de inteligencia artificial chino que compite con ChatGPT. Cómo funciona, diferencias con otros modelos y uso para estudiantes.',
    h1: '¿Qué es DeepSeek? El Modelo de IA que Sacudió al Mundo en 2025',
    intro: 'DeepSeek es un modelo de inteligencia artificial desarrollado por una empresa china que causó sensación a principios de 2025 al demostrar capacidades comparables a los mejores modelos de OpenAI y Google, pero a una fracción del costo de desarrollo. Su aparición generó un debate global sobre el futuro de la IA y provocó caídas en las bolsas de valores de empresas tecnológicas occidentales.',
    definition: 'DeepSeek es una familia de modelos de lenguaje de gran escala (LLM) desarrollados por la empresa china DeepSeek AI. El modelo más destacado, DeepSeek-R1, es un modelo de razonamiento que compite directamente con o1 de OpenAI y otros modelos frontier, destacándose por su eficiencia: fue entrenado con significativamente menos recursos computacionales y a menor costo que los modelos equivalentes occidentales.',
    characteristics: [
      {
        icon: '🇨🇳',
        title: 'Origen Chino',
        description: 'Desarrollado en China por DeepSeek AI, representa el avance de la IA china hasta el nivel de los mejores modelos globales.'
      },
      {
        icon: '💰',
        title: 'Eficiencia de Costo',
        description: 'Fue entrenado a una fracción del costo de modelos equivalentes de OpenAI o Google, demostrando que no se necesita tanto capital para desarrollar IA de frontera.'
      },
      {
        icon: '🧠',
        title: 'Capacidad de Razonamiento',
        description: 'DeepSeek-R1 es especialmente bueno en matemáticas, ciencias y razonamiento lógico, áreas donde compite directamente con o1 de OpenAI.'
      },
      {
        icon: '🔓',
        title: 'Código Abierto',
        description: 'A diferencia de ChatGPT o Claude, DeepSeek ha publicado los pesos de algunos de sus modelos como open source, permitiendo su uso y modificación.'
      },
      {
        icon: '📱',
        title: 'Interfaz Accesible',
        description: 'Disponible en web y aplicación móvil, con interfaz en múltiples idiomas incluyendo español.'
      }
    ],
    examples: [
      'Un estudiante de ingeniería puede usar DeepSeek-R1 para resolver problemas de cálculo paso a paso, ya que es especialmente bueno en matemáticas',
      'Un investigador puede usar DeepSeek para analizar textos científicos y obtener resúmenes en español',
      'DeepSeek puede usarse como alternativa gratuita a ChatGPT Plus para tareas de escritura y análisis',
      'Programadores lo utilizan para debugging de código, área donde tiene rendimiento comparable a GPT-4'
    ],
    faqs: [
      {
        question: '¿Es DeepSeek seguro para usar?',
        answer: 'Hay consideraciones de privacidad: DeepSeek es una empresa china sujeta a la legislación de China, lo que significa que sus datos pueden ser accesibles al gobierno chino si se lo requieren. Para uso académico general con información no sensible, el riesgo práctico es bajo. Sin embargo, para información sensible, personal o confidencial, se recomienda usar alternativas como ChatGPT o Claude con políticas de privacidad más claras para usuarios europeos y latinoamericanos.'
      },
      {
        question: '¿DeepSeek es mejor que ChatGPT?',
        answer: 'En algunas tareas sí, en otras no. DeepSeek-R1 es especialmente competitivo en matemáticas, ciencias y razonamiento lógico — algunos benchmarks lo colocan al nivel de o1 de OpenAI. Para escritura creativa y conversación general en español, ChatGPT 4o sigue siendo superior. La ventaja de DeepSeek es el precio: su uso básico es gratuito y los costos de API son mucho menores.'
      },
      {
        question: '¿Puede un detector de IA detectar texto de DeepSeek?',
        answer: 'Sí. Los detectores de IA como DetectordeIA.ai detectan patrones estadísticos del texto generado por modelos de lenguaje, independientemente de qué modelo específico lo generó. Un texto de DeepSeek presenta los mismos patrones lingüísticos (uniformidad, formalidad artificial, estructura balanceada) que texto de ChatGPT o Claude. La detección no es por "huella" de un modelo específico sino por características del texto de IA en general.'
      },
      {
        question: '¿Por qué DeepSeek causó tanto revuelo en enero 2025?',
        answer: 'DeepSeek demostró que podía entrenarse un modelo de IA de frontera por aproximadamente 6 millones de dólares, comparado con los miles de millones invertidos por OpenAI, Google y Anthropic. Esto sugirió que las "ventajas" de las empresas occidentales (acceso a chips avanzados, capital masivo) no eran tan determinantes como se creía. El mercado reaccionó con caídas en acciones de Nvidia y otras empresas de IA, y detonó un debate sobre la estrategia global de IA.'
      }
    ],
    relatedTerms: [
      { term: 'ChatGPT', slug: 'que-es-chatgpt' },
      { term: '¿Qué es Gemini de Google?', slug: 'que-es-gemini-google' },
      { term: 'Integridad Académica', slug: 'que-es-integridad-academica' }
    ],
    relatedTools: [
      { name: 'Detector de IA Gratis', url: '/?ref=glosario-deepseek' },
      { name: 'Detector de ChatGPT', url: '/detector-de-chatgpt-gratis?ref=glosario-deepseek' }
    ],
    cta: {
      text: 'Detectar si un texto fue escrito por DeepSeek o IA',
      url: '/?ref=glosario-deepseek'
    }
  },

  {
    slug: 'que-es-gemini-google',
    term: 'Gemini de Google',
    keywords: [
      'que es gemini google',
      'gemini ia google',
      'gemini vs chatgpt',
      'google gemini explicacion',
      'gemini estudiantes'
    ],
    title: '¿Qué es Gemini de Google? Guía Completa 2025',
    description: 'Descubre qué es Gemini, el modelo de IA de Google. Cómo se compara con ChatGPT, sus capacidades para estudiantes, y cómo detectar texto generado por Gemini.',
    h1: '¿Qué es Gemini de Google? Todo lo que Necesitas Saber',
    intro: 'Gemini es el modelo de inteligencia artificial más avanzado de Google, sucesor de Bard. Lanzado en 2023 y significativamente mejorado en 2024-2025, Gemini es el principal competidor de ChatGPT y el segundo modelo más usado globalmente. Su integración con el ecosistema de Google (Workspace, Search, YouTube) lo hace especialmente relevante para estudiantes que ya usan herramientas de Google.',
    definition: 'Gemini es una familia de modelos de lenguaje multimodal desarrollados por Google DeepMind. "Multimodal" significa que puede procesar y generar no solo texto sino también imágenes, audio, video y código. Existe en varias versiones: Gemini Ultra (el más potente), Gemini Pro (equilibrio rendimiento/costo) y Gemini Nano (para dispositivos móviles).',
    characteristics: [
      {
        icon: '🔍',
        title: 'Integración con Búsqueda',
        description: 'Gemini está integrado en Google Search, apareciendo como "AI Overview" en los resultados de búsqueda. Esto lo hace omnipresente para cualquier usuario de Google.'
      },
      {
        icon: '📁',
        title: 'Google Workspace',
        description: 'Disponible en Gmail, Google Docs, Sheets y Slides como "Gemini in Google Workspace", permitiendo generar y editar documentos directamente.'
      },
      {
        icon: '👁️',
        title: 'Multimodal',
        description: 'Puede analizar imágenes, documentos PDF, hojas de cálculo y videos, no solo texto. Esto lo diferencia de modelos solo-texto.'
      },
      {
        icon: '🔗',
        title: 'Acceso a Internet en Tiempo Real',
        description: 'A diferencia de versiones de ChatGPT sin plugins, Gemini tiene acceso a información actualizada de internet en tiempo real.'
      },
      {
        icon: '🆓',
        title: 'Plan Gratuito Robusto',
        description: 'El plan gratuito de Gemini es más generoso que el de ChatGPT, incluyendo acceso a Gemini 1.5 Flash sin límites estrictos.'
      }
    ],
    examples: [
      'Un estudiante puede pedir a Gemini que analice una imagen de un diagrama de su libro de biología y explique qué representa',
      'Gemini en Google Docs puede ayudar a mejorar la redacción de un trabajo directamente mientras lo escribes',
      'Puedes usar Gemini para buscar información actualizada sobre eventos recientes, ya que tiene acceso a internet',
      'Gemini puede resumir un PDF de un paper académico que subas directamente a la conversación'
    ],
    faqs: [
      {
        question: '¿Gemini es mejor que ChatGPT para estudiantes?',
        answer: 'DEPENDE del uso. VENTAJAS DE GEMINI: acceso a internet en tiempo real, integración con Google Workspace, capacidad multimodal robusta, plan gratuito más generoso. VENTAJAS DE CHATGPT: mejor razonamiento complejo, escritura creativa más natural, ecosistema de plugins más desarrollado, historial más largo de afinamiento para conversación. Para tareas académicas que requieren información actualizada o análisis de documentos, Gemini puede ser mejor. Para ensayos y razonamiento profundo, ChatGPT suele ser superior.'
      },
      {
        question: '¿Puede un detector de IA detectar texto de Gemini?',
        answer: 'Sí. Los detectores de IA como DetectordeIA.ai detectan los patrones estadísticos del texto generado por modelos de lenguaje, independientemente del modelo específico. El texto de Gemini presenta las mismas características del texto de IA en general: estructura uniforme, vocabulario consistentemente formal, ausencia de marcadores de autenticidad humana. La detección funciona por características del texto, no por "firma" del modelo.'
      },
      {
        question: '¿Es Gemini la misma herramienta que Bard?',
        answer: 'Sí y no. Bard fue el primer chatbot de IA de Google, lanzado en 2023. En 2024, Google renombró Bard a Gemini y simultáneamente lanzó modelos Gemini 1.0 y 1.5 significativamente más avanzados. Si usaste Bard, ya conoces la interfaz básica de Gemini — pero las capacidades del modelo son muy superiores.'
      },
      {
        question: '¿Cómo se llama Gemini cuando está en Google Docs?',
        answer: '"Gemini in Google Workspace" o simplemente "Gemini" dentro de las aplicaciones de Google. Aparece como un botón de estrella (✦) en la interfaz de Google Docs, Gmail y otras aplicaciones de Workspace. Funciones: ayudar a redactar, resumir, reformular texto, o responder preguntas sobre el documento.'
      }
    ],
    relatedTerms: [
      { term: 'ChatGPT', slug: 'que-es-chatgpt' },
      { term: 'DeepSeek', slug: 'que-es-deepseek' },
      { term: 'Integridad Académica', slug: 'que-es-integridad-academica' }
    ],
    relatedTools: [
      { name: 'Detector de IA Gratis', url: '/?ref=glosario-gemini' },
      { name: 'Detector de Gemini', url: '/detector-de-gemini-gratis?ref=glosario-gemini' }
    ],
    cta: {
      text: 'Detectar si un texto fue escrito por Gemini o IA',
      url: '/?ref=glosario-gemini'
    }
  },

  {
    slug: 'que-es-integridad-academica',
    term: 'Integridad Académica',
    keywords: [
      'que es integridad academica',
      'integridad academica definicion',
      'integridad academica universidad',
      'importancia integridad academica',
      'integridad academica e ia'
    ],
    title: '¿Qué es la Integridad Académica? Definición y Ejemplos 2025',
    description: 'Qué es la integridad académica, por qué importa y cómo mantenerla en la era de la IA. Ejemplos prácticos, consecuencias del plagio y uso de ChatGPT para estudiantes.',
    h1: '¿Qué es la Integridad Académica? Guía Completa para Estudiantes',
    intro: 'La integridad académica es el conjunto de valores y principios que guían el comportamiento honesto en entornos educativos. En la era de ChatGPT y la IA generativa, estos principios se han vuelto más complejos pero también más importantes. Esta guía define qué es, qué la viola y cómo mantenerla en el contexto actual.',
    definition: 'La integridad académica es el compromiso con los valores fundamentales de honestidad, confianza, equidad, respeto y responsabilidad en el trabajo académico. Implica que el trabajo presentado por un estudiante representa genuinamente su propio esfuerzo intelectual, y que el uso de cualquier fuente o herramienta (incluyendo IA) se declara apropiadamente.',
    characteristics: [
      {
        icon: '🎯',
        title: 'Honestidad',
        description: 'Presentar trabajo propio como propio, y trabajo ajeno o generado por herramientas como tal, con la atribución correspondiente.'
      },
      {
        icon: '🤝',
        title: 'Confianza',
        description: 'La relación entre estudiante y profesor requiere confianza mutua: el profesor confía en que el trabajo es del estudiante; el estudiante confía en que será evaluado justamente.'
      },
      {
        icon: '⚖️',
        title: 'Equidad',
        description: 'Todos los estudiantes deben ser evaluados bajo las mismas condiciones. El plagio y el uso no declarado de IA crean ventajas injustas sobre quienes trabajan honestamente.'
      },
      {
        icon: '📚',
        title: 'Responsabilidad',
        description: 'Cada estudiante es responsable de conocer y seguir las reglas de integridad académica de su institución, incluyendo las políticas sobre uso de IA.'
      },
      {
        icon: '🌱',
        title: 'Aprendizaje Real',
        description: 'La integridad académica es condición para el aprendizaje genuino. Saltarla con IA o plagio puede dar buenas notas a corto plazo pero perjudica el desarrollo de habilidades reales.'
      }
    ],
    examples: [
      'Un estudiante cita correctamente todas las fuentes que usó en su trabajo, incluyendo una conversación con ChatGPT',
      'Una estudiante declara en su trabajo que usó Gemini para recibir feedback sobre el borrador',
      'Un grupo de trabajo divide las tareas equitativamente y cada miembro contribuye genuinamente a su parte',
      'Un profesor diseña evaluaciones donde los estudiantes explican su proceso de pensamiento, no solo el resultado final',
      'Una universidad publica una política clara sobre uso de IA que los estudiantes pueden consultar antes de cada trabajo'
    ],
    faqs: [
      {
        question: '¿Qué acciones violan la integridad académica?',
        answer: 'Las violaciones más comunes son: (1) PLAGIO: copiar texto de otros sin citar, sea de libros, internet o compañeros. (2) USO NO DECLARADO DE IA: usar ChatGPT, Gemini u otras IA para generar trabajo sin declararlo. (3) TRAMPA EN EXÁMENES: usar materiales no permitidos, copiar de compañeros. (4) FALSIFICACIÓN: alterar notas, documentos o resultados de investigación. (5) AUTOPLAGIAR: presentar trabajo propio anterior sin declararlo. (6) COLABORACIÓN NO AUTORIZADA: trabajar con otros cuando la tarea es individual. Cada institución puede tener categorías adicionales.'
      },
      {
        question: '¿La integridad académica aplica también cuando uso IA?',
        answer: 'SÍ, absolutamente. La integridad académica no es específica del plagio tradicional — aplica a cualquier situación donde el trabajo presentado no represente fielmente el esfuerzo y capacidad del estudiante. El uso no declarado de IA viola el principio de honestidad (presentas como tuyo un trabajo que no es del todo tuyo) y el de equidad (obtienes ventaja sobre quienes no usan IA). Las políticas de las universidades están actualizando sus definiciones para incluir explícitamente el uso de IA.'
      },
      {
        question: '¿Cuáles son las consecuencias de violar la integridad académica?',
        answer: 'CONSECUENCIAS TÍPICAS (de menor a mayor gravedad): (1) Advertencia y oportunidad de corregir el trabajo. (2) Calificación de cero en el trabajo o examen específico. (3) Reprobar el curso completo. (4) Registro permanente en el expediente académico. (5) Suspensión temporal (un semestre o año académico). (6) Expulsión definitiva de la institución. (7) En posgrado: retiro del título si la violación se descubre después de graduarse. La gravedad depende del tipo de violación, intencionalidad y si es primera vez o reincidencia.'
      },
      {
        question: '¿Es posible usar IA y mantener la integridad académica?',
        answer: 'SÍ, absolutamente. La integridad académica no implica no usar IA — implica ser transparente sobre cómo la usas. Si tu institución permite el uso de IA con declaración, y usas IA de forma que el trabajo intelectual fundamental siga siendo tuyo (IA como herramienta de apoyo, no como ghostwriter), estás manteniendo tu integridad académica. La clave: transparencia total sobre el uso y asegurarte de que realmente aprendiste.'
      }
    ],
    relatedTerms: [
      { term: 'ChatGPT', slug: 'que-es-chatgpt' },
      { term: 'Patchwriting', slug: 'que-es-patchwriting' },
      { term: 'DeepSeek', slug: 'que-es-deepseek' }
    ],
    relatedTools: [
      { name: 'Detector de IA Gratis', url: '/?ref=glosario-integridad-academica' },
      { name: 'Verificador de Originalidad', url: '/verificador-de-ia?ref=glosario-integridad-academica' }
    ],
    cta: {
      text: 'Verificar la originalidad de tu trabajo',
      url: '/?ref=glosario-integridad-academica'
    }
  },

  {
    slug: 'que-es-hallucination-ia',
    term: 'Alucinación de IA (Hallucination)',
    keywords: [
      'que es alucinacion ia',
      'hallucination ia',
      'ia inventa informacion',
      'chatgpt errores informacion falsa',
      'alucinaciones modelos lenguaje'
    ],
    title: '¿Qué es la Alucinación de IA? Cuando ChatGPT Inventa Información',
    description: 'Qué son las alucinaciones en modelos de IA: cuando ChatGPT, Gemini o DeepSeek inventan datos, citas o hechos que no existen. Cómo detectarlas y evitar errores académicos.',
    h1: '¿Qué es la Alucinación de IA? Cuando la IA Inventa Información',
    intro: 'Una de las limitaciones más peligrosas de los modelos de lenguaje como ChatGPT es su tendencia a "alucinar": inventar información, citas, estadísticas o hechos que suenan completamente plausibles pero son completamente falsos. Entender qué es la alucinación de IA y cómo detectarla es fundamental para cualquier estudiante o profesional que use IA.',
    definition: 'Una alucinación de IA (del inglés "hallucination") es cuando un modelo de lenguaje genera información factualmente incorrecta con aparente seguridad y coherencia. El modelo no está "mintiendo" intencionalmente — simplemente predice la próxima palabra más probable basándose en patrones estadísticos, sin acceso a la verdad factual. El resultado puede ser una cita inexistente, un autor inventado, una fecha incorrecta o un hecho completamente falso presentado como cierto.',
    characteristics: [
      {
        icon: '🎭',
        title: 'Confianza Aparente',
        description: 'La IA presenta información falsa con el mismo tono seguro que información verdadera. No hay señal visible de que el dato sea inventado.'
      },
      {
        icon: '📚',
        title: 'Citas Inventadas',
        description: 'Uno de los problemas más comunes: la IA genera referencias bibliográficas completamente fabricadas — autores reales con títulos inexistentes, o autores y obras totalmente inventados.'
      },
      {
        icon: '📊',
        title: 'Estadísticas Falsas',
        description: 'La IA puede generar estadísticas que suenan específicas y creíbles ("el 73.4% de...") pero que no tienen ninguna base en estudios reales.'
      },
      {
        icon: '🗓️',
        title: 'Fechas Incorrectas',
        description: 'Eventos históricos con fechas incorrectas, leyes que no existen en la forma descrita, o precedentes judiciales inventados son formas frecuentes de alucinación.'
      },
      {
        icon: '⚠️',
        title: 'Riesgo para Trabajos Académicos',
        description: 'Usar datos alucinados sin verificar puede resultar en trabajos con información falsa, lo que afecta la nota y la credibilidad académica.'
      }
    ],
    examples: [
      'ChatGPT cita un paper de "García y López (2019)" publicado en "Nature Medicine" que cuando buscas no existe en ninguna base de datos',
      'Un modelo de IA afirma que "según el estudio de Harvard de 2021, el 82% de los estudiantes..." pero ese estudio no puede encontrarse',
      'La IA describe el contenido de un libro real pero atribuye ideas que el autor nunca escribió',
      'Un modelo asegura que una ley o normativa específica dice algo que en realidad no dice cuando lees el texto original',
      'La IA menciona que una persona famosa dijo una cita que en realidad no dijo o nunca existió'
    ],
    faqs: [
      {
        question: '¿Por qué los modelos de IA alucinan?',
        answer: 'Los LLM (modelos de lenguaje) no "saben" hechos — predicen qué palabras vienen después de otras basándose en patrones estadísticos de los textos con los que fueron entrenados. No tienen acceso a una base de datos de verdad factual. Cuando generan información específica (una cita, una estadística), están produciendo el tipo de texto que estadísticamente suele aparecer en ese contexto — pero sin verificar si ese contenido específico es real. El resultado es texto que suena correcto pero puede ser completamente inventado.'
      },
      {
        question: '¿Cómo puedo detectar si la IA me dio información alucinada?',
        answer: 'MÉTODOS DE VERIFICACIÓN: (1) Busca la cita/referencia específica en Google Scholar, PubMed o Scopus — si no aparece, es probablemente inventada. (2) Busca el libro o artículo mencionado en el catálogo de una biblioteca universitaria. (3) Busca la estadística + su fuente supuesta — ¿existe ese estudio? (4) Para leyes o sentencias, busca el texto original en fuentes oficiales. REGLA DE ORO: Nunca incluyas en un trabajo académico datos, citas o estadísticas que obtuviste de IA sin verificarlos en fuentes primarias.'
      },
      {
        question: '¿Todos los modelos de IA alucinan igualmente?',
        answer: 'NO. Las tasas de alucinación varían significativamente. Los modelos más recientes y grandes (GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro) alucinan menos que modelos más pequeños o antiguos. Los modelos con acceso a internet en tiempo real (Gemini, ChatGPT con búsqueda) alucinan menos en hechos recientes. Sin embargo, NINGÚN modelo está libre de alucinaciones — todos pueden inventar información en algún momento, especialmente para datos específicos como citas bibliográficas.'
      },
      {
        question: '¿Qué pasa si entrego un trabajo con información alucinada?',
        answer: 'CONSECUENCIAS POSIBLES: (1) El profesor puede verificar las fuentes y encontrar que no existen — esto levanta sospecha de plagio o uso indebido de IA. (2) Las inexactitudes factuales afectan la calidad y nota del trabajo. (3) En disciplinas como medicina, derecho o ingeniería, la información falsa puede tener implicaciones más serias. PROTECCIÓN: Verifica SIEMPRE cualquier dato, cita o estadística que obtuviste de IA antes de incluirlo en un trabajo académico.'
      }
    ],
    relatedTerms: [
      { term: 'ChatGPT', slug: 'que-es-chatgpt' },
      { term: 'Integridad Académica', slug: 'que-es-integridad-academica' },
      { term: 'DeepSeek', slug: 'que-es-deepseek' }
    ],
    relatedTools: [
      { name: 'Detector de IA Gratis', url: '/?ref=glosario-hallucination' },
      { name: 'Verificador de Originalidad', url: '/verificador-de-ia?ref=glosario-hallucination' }
    ],
    cta: {
      text: 'Verificar si un texto fue generado por IA',
      url: '/?ref=glosario-hallucination'
    }
  },

  {
    slug: 'que-es-perplexity-ai',
    term: 'Perplexity AI',
    keywords: [
      'que es perplexity ai',
      'perplexity ai explicacion',
      'perplexity vs chatgpt',
      'perplexity buscador ia',
      'perplexity ai estudiantes'
    ],
    title: '¿Qué es Perplexity AI? El Motor de Búsqueda con IA 2025',
    description: 'Qué es Perplexity AI, cómo funciona como motor de búsqueda con IA, cómo se diferencia de ChatGPT y cómo usarlo responsablemente para investigación académica.',
    h1: '¿Qué es Perplexity AI? El Buscador con IA que Usan los Estudiantes',
    intro: 'Perplexity AI es una herramienta que combina la búsqueda en internet con la síntesis de inteligencia artificial. A diferencia de ChatGPT, Perplexity siempre accede a internet en tiempo real y cita sus fuentes, lo que lo hace especialmente útil para investigación académica. Sin embargo, sus limitaciones y riesgos son importantes de entender antes de usarlo.',
    definition: 'Perplexity AI es un motor de búsqueda conversacional impulsado por inteligencia artificial, fundado en 2022. Funciona realizando búsquedas en internet en tiempo real, sintetizando la información encontrada y presentándola en forma de respuestas conversacionales con citas de las fuentes originales. A diferencia de los chatbots de IA tradicionales, no depende exclusivamente de su entrenamiento previo sino que accede a información actualizada.',
    characteristics: [
      {
        icon: '🔍',
        title: 'Búsqueda en Tiempo Real',
        description: 'Accede a internet en tiempo real para responder preguntas, por lo que puede dar información actualizada sobre eventos recientes.'
      },
      {
        icon: '📎',
        title: 'Citas de Fuentes',
        description: 'Cada respuesta incluye las fuentes donde encontró la información, permitiendo verificar y profundizar. Esto lo diferencia de ChatGPT sin búsqueda.'
      },
      {
        icon: '💬',
        title: 'Interfaz Conversacional',
        description: 'A diferencia de Google, puedes hacer preguntas en lenguaje natural y hacer seguimiento con preguntas adicionales.'
      },
      {
        icon: '🆓',
        title: 'Plan Gratuito Funcional',
        description: 'El plan gratuito permite búsquedas ilimitadas, aunque con algunas limitaciones en modelos avanzados.'
      },
      {
        icon: '⚠️',
        title: 'Alucinaciones Posibles',
        description: 'A pesar de citar fuentes, Perplexity puede cometer errores al sintetizar la información. Las citas no garantizan que la síntesis sea precisa.'
      }
    ],
    examples: [
      'Un estudiante usa Perplexity para hacer una búsqueda rápida sobre las últimas investigaciones sobre cambio climático, con fuentes incluidas',
      'Una estudiante pregunta "¿cuáles son los requisitos para el TFG en España 2025?" y obtiene respuesta actualizada con referencias',
      'Un investigador usa Perplexity para encontrar papers recientes sobre su tema antes de hacer la búsqueda formal en Google Scholar',
      'Perplexity puede usarse para verificar si una estadística que dio ChatGPT es real buscándola en fuentes actuales'
    ],
    faqs: [
      {
        question: '¿Perplexity AI es mejor que ChatGPT para investigación académica?',
        answer: 'Para INVESTIGACIÓN que requiere información actualizada: Perplexity tiene ventajas claras por su acceso a internet en tiempo real y la inclusión de citas. Para RAZONAMIENTO COMPLEJO, escritura o análisis: ChatGPT (especialmente GPT-4o) sigue siendo superior. La estrategia óptima para muchos investigadores: usar Perplexity para encontrar fuentes actuales, luego usar ChatGPT o Claude para análisis y síntesis más profundos.'
      },
      {
        question: '¿Las fuentes que cita Perplexity son confiables?',
        answer: 'PARCIALMENTE. Perplexity cita las fuentes que encuentra en internet — que pueden incluir artículos académicos revisados por pares, pero también blogs, noticias o Wikipedia. ADEMÁS, el modelo puede malinterpretar o sintetizar incorrectamente lo que esas fuentes dicen. RECOMENDACIÓN: Siempre haz clic en las fuentes citadas y lee el texto original antes de usarlo en un trabajo académico. Las fuentes son el punto de partida, no la verificación final.'
      },
      {
        question: '¿Un detector de IA detecta texto de Perplexity?',
        answer: 'SÍ. Aunque Perplexity accede a internet y cita fuentes, el texto que genera sigue siendo texto de IA con los patrones estadísticos característicos. Los detectores como DetectordeIA.ai analizan los patrones lingüísticos del texto, no su origen. Si copias una respuesta de Perplexity como tu propio texto, un detector de IA lo identificará con alta probabilidad.'
      },
      {
        question: '¿Puedo citar a Perplexity AI como fuente en mis trabajos?',
        answer: 'NO directamente. Las respuestas de Perplexity no son fuentes académicas — son síntesis de otras fuentes. Lo que SÍ debes hacer: citar las fuentes originales que Perplexity citó (que puedes verificar haciendo clic en ellas). Si usaste Perplexity para encontrar esas fuentes, puedes mencionarlo en tu declaración de uso de herramientas de IA, pero las referencias de tu trabajo deben ser las fuentes primarias, no Perplexity.'
      }
    ],
    relatedTerms: [
      { term: 'ChatGPT', slug: 'que-es-chatgpt' },
      { term: 'Alucinación de IA', slug: 'que-es-hallucination-ia' },
      { term: 'Integridad Académica', slug: 'que-es-integridad-academica' }
    ],
    relatedTools: [
      { name: 'Detector de IA Gratis', url: '/?ref=glosario-perplexity' },
      { name: 'Verificador de Originalidad', url: '/verificador-de-ia?ref=glosario-perplexity' }
    ],
    cta: {
      text: 'Verificar si un texto fue generado por IA',
      url: '/?ref=glosario-perplexity'
    }
  },

  // ── SPRINT 3 + 4 GLOSSARY TERMS ───────────────────────────────────────

  {
    slug: 'que-es-patchwriting',
    term: 'Patchwriting',
    keywords: ['que es patchwriting', 'patchwriting plagio', 'patchwriting ejemplo', 'parafraseo incorrecto', 'plagio encubierto'],
    title: '¿Qué es el Patchwriting? Plagio Encubierto en Trabajos Académicos',
    description: 'El patchwriting es una forma de plagio sutil que consiste en modificar levemente el texto de una fuente. Aprende a identificarlo y evitarlo en tus trabajos.',
    h1: '¿Qué es el Patchwriting? La Forma de Plagio que Muchos No Reconocen',
    intro: 'El patchwriting es uno de los tipos de plagio más comunes en universidades — y uno de los menos reconocidos como tal por los propios estudiantes. Consiste en tomar un texto de otra fuente y cambiarlo ligeramente: sinónimos, orden de palabras, cambios superficiales. El resultado sigue siendo plagio aunque no sea una copia exacta.',
    definition: 'El patchwriting es la práctica de modificar superficialmente el texto de una fuente (cambiando palabras por sinónimos, alterando la estructura de las frases o reorganizando el orden) sin citar adecuadamente ni transformar genuinamente las ideas. Es una forma de plagio que puede ser intencional o no, y que los detectores modernos identifican con alta precisión.',
    characteristics: [
      { icon: '✂️', title: 'Modificación superficial', description: 'Se cambian palabras sueltas o estructura pero se mantiene la lógica y flujo del texto original.' },
      { icon: '🔍', title: 'Detectable por IA y herramientas', description: 'Turnitin y otros detectores identifican patchwriting por similitud semántica, no solo por coincidencia exacta de palabras.' },
      { icon: '📚', title: 'Frecuente en trabajos académicos', description: 'Muy común en traducciones de fuentes en inglés a español y en resúmenes de papers científicos.' },
      { icon: '⚠️', title: 'Puede ser no intencional', description: 'Muchos estudiantes hacen patchwriting creyendo que están parafraseando correctamente.' }
    ],
    examples: [
      'Original: "La inteligencia artificial generativa está transformando la educación superior." → Patchwriting: "La IA generativa está cambiando la educación universitaria." (Solo cambió dos palabras)',
      'Original: "Students who use AI tools perform better on short-term tasks." → Patchwriting: "Los alumnos que emplean herramientas de IA obtienen mejores resultados en tareas a corto plazo." (Traducción directa sin citar)',
      'Paráfrasis correcta: Tomar la idea, cerrar el texto, escribir con tus propias palabras y citar: "Según García (2024), las herramientas de IA mejoran el rendimiento a corto plazo, aunque sus efectos a largo plazo en el aprendizaje están menos documentados."'
    ],
    faqs: [
      { question: '¿El patchwriting es lo mismo que parafrasear?', answer: 'No. Parafrasear correctamente implica comprender la idea original y expresarla con tus propias palabras y estructura, conservando el significado pero sin seguir el texto original. El patchwriting es una modificación superficial del texto original que no demuestra comprensión real.' },
      { question: '¿Turnitin detecta el patchwriting?', answer: 'Sí, aunque con variación según el grado de modificación. Turnitin usa análisis semántico que detecta similitudes de significado, no solo de palabras. Las versiones recientes con IA son especialmente efectivas para identificar parafraseos superficiales.' },
      { question: '¿Cómo evito hacer patchwriting sin darme cuenta?', answer: 'Técnica del "cierre y escritura": lee el texto original, ciérralo o quítalo de la vista, espera 5 minutos y entonces escribe el concepto con tus propias palabras. Si no puedes explicarlo sin mirar el original, todavía no lo has comprendido suficientemente.' }
    ],
    relatedTerms: [
      { term: 'ChatGPT', slug: 'que-es-chatgpt' },
      { term: 'Integridad Académica', slug: 'que-es-integridad-academica' },
      { term: 'Texto Sintético', slug: 'que-es-texto-sintetico' }
    ],
    relatedTools: [
      { name: 'Detector de IA Gratis', url: '/?ref=glosario-patchwriting' },
      { name: 'Parafraseador Online', url: '/parafraseador?ref=glosario-patchwriting' }
    ],
    cta: { text: 'Verificar originalidad de tu texto', url: '/?ref=glosario-patchwriting' }
  },

  {
    slug: 'que-es-texto-sintetico',
    term: 'Texto Sintético',
    keywords: ['que es texto sintetico', 'texto generado por ia', 'contenido sintetico ia', 'texto artificial ia', 'synthetic text ia'],
    title: '¿Qué es un Texto Sintético? La IA y el Contenido Artificial',
    description: 'Un texto sintético es contenido generado por IA en lugar de por humanos. Aprende cómo funciona, cómo detectarlo y por qué importa en educación.',
    h1: '¿Qué es un Texto Sintético? Contenido Generado por IA Explicado',
    intro: 'Un texto sintético es cualquier texto generado por un sistema de inteligencia artificial en lugar de un ser humano. Con la proliferación de ChatGPT, Claude y otros modelos, el texto sintético es hoy más común que nunca — y difícil de distinguir del texto humano a simple vista.',
    definition: 'El texto sintético es contenido textual generado automáticamente por modelos de lenguaje (LLMs) como GPT-4, Claude, Gemini u otros sistemas de IA. A diferencia del texto escrito por humanos, el texto sintético se produce mediante predicción estadística de la siguiente palabra más probable dado un contexto. Sus características estadísticas son detectables por herramientas especializadas.',
    characteristics: [
      { icon: '🤖', title: 'Generado por predicción probabilística', description: 'Los LLMs generan texto prediciendo la secuencia más probable de palabras, lo que produce patrones estadísticos distintivos.' },
      { icon: '📊', title: 'Detectable por análisis estadístico', description: 'La distribución de vocabulario, la longitud de oraciones y la entropía del texto sintético difieren del texto humano de formas medibles.' },
      { icon: '🌐', title: 'Fluido y gramaticalmente correcto', description: 'El texto sintético moderno es gramaticalmente impecable, coherente y puede imitar distintos estilos — lo que lo hace difícil de detectar visualmente.' },
      { icon: '⚡', title: 'Producido a escala y velocidad', description: 'Un LLM puede generar miles de palabras en segundos, lo que cambia radicalmente la dinámica de producción de contenido.' }
    ],
    examples: [
      'Un ensayo académico completo generado con ChatGPT a partir de un prompt como "Escribe un ensayo sobre el cambio climático de 1000 palabras".',
      'Un artículo de noticias generado automáticamente por IA para cubrir resultados deportivos o financieros.',
      'Respuestas de soporte al cliente generadas por un chatbot basado en LLM.',
      'Código de programación generado por GitHub Copilot o similares a partir de comentarios en lenguaje natural.'
    ],
    faqs: [
      { question: '¿Cómo se detecta si un texto es sintético?', answer: 'Los detectores de texto sintético (como DetectordeIA.ai) analizan patrones estadísticos del texto: distribución de vocabulario, variabilidad en longitud de oraciones, nivel de entropía léxica y probabilidad de cada palabra en contexto. Los textos sintéticos tienden a ser estadísticamente más predecibles que los textos humanos.' },
      { question: '¿Todo el texto generado por IA es sintético?', answer: 'Sí, por definición. El término "sintético" en este contexto significa "generado artificialmente por un sistema de IA en lugar de un humano". Aunque el texto sea útil, correcto y bien escrito, sigue siendo sintético si lo generó una IA.' },
      { question: '¿El texto sintético es siempre incorrecto o de mala calidad?', answer: 'No. El texto sintético moderno puede ser de alta calidad, informativo y bien estructurado. El problema en contextos académicos no es la calidad sino la autoría: presentar texto sintético como trabajo propio sin declararlo constituye deshonestidad académica.' }
    ],
    relatedTerms: [
      { term: 'ChatGPT', slug: 'que-es-chatgpt' },
      { term: 'Alucinación de IA', slug: 'que-es-hallucination-ia' },
      { term: 'Patchwriting', slug: 'que-es-patchwriting' }
    ],
    relatedTools: [
      { name: 'Detector de IA Gratis', url: '/?ref=glosario-texto-sintetico' },
      { name: 'Verificador de Originalidad', url: '/verificador-de-ia?ref=glosario-texto-sintetico' }
    ],
    cta: { text: 'Detectar si tu texto es sintético — gratis', url: '/?ref=glosario-texto-sintetico' }
  },

  {
    slug: 'que-es-copyleaks',
    term: 'Copyleaks',
    keywords: ['que es copyleaks', 'copyleaks detector ia', 'copyleaks plagio', 'copyleaks vs turnitin', 'copyleaks gratis'],
    title: '¿Qué es Copyleaks? Detector de Plagio e IA Explicado 2025',
    description: 'Copyleaks es una plataforma de detección de plagio e IA usada por universidades. Descubre cómo funciona, qué detecta y en qué se diferencia de Turnitin.',
    h1: '¿Qué es Copyleaks? Guía Completa del Detector de Plagio e IA',
    intro: 'Copyleaks es una de las principales plataformas de detección de plagio y texto generado por IA, utilizada por universidades, empresas editoriales y equipos de contenido. A diferencia de Turnitin, tiene un plan gratuito limitado y está disponible directamente para estudiantes.',
    definition: 'Copyleaks es una plataforma SaaS de detección de plagio y contenido generado por IA que combina análisis de similitud con fuentes conocidas (similar a Turnitin) con detección de patrones de texto de IA. Soporta más de 100 idiomas, incluido el español, y tiene integraciones con LMS como Canvas y Moodle.',
    characteristics: [
      { icon: '🔍', title: 'Doble detección: plagio + IA', description: 'Analiza tanto similitud con fuentes conocidas como probabilidad de que el texto sea generado por IA, en un solo informe.' },
      { icon: '🌐', title: 'Multilingüe con buen soporte en español', description: 'A diferencia de algunos competidores, Copyleaks tiene cobertura sólida para texto en español, lo que lo hace relevante para universidades de España y LATAM.' },
      { icon: '💰', title: 'Plan gratuito disponible', description: 'Ofrece créditos gratuitos que permiten analizar textos sin pagar, aunque con límites mensuales.' },
      { icon: '🔗', title: 'Integración con LMS', description: 'Se integra con Canvas, Moodle, Blackboard y Google Classroom, lo que facilita su adopción institucional.' }
    ],
    examples: [
      'Una universidad usa Copyleaks como complemento a Turnitin para verificar trabajos finales con su módulo de detección de IA.',
      'Un estudiante usa el plan gratuito de Copyleaks para verificar que su TFG no tenga similitudes no intencionadas antes de entregarlo.',
      'Un editor de contenido usa Copyleaks AI Detector para verificar que los artículos de su equipo no contienen texto generado por IA sin declarar.'
    ],
    faqs: [
      { question: '¿Copyleaks detecta ChatGPT y otros modelos de IA?', answer: 'Sí. El módulo de detección de IA de Copyleaks está entrenado para identificar texto generado por los principales LLMs: ChatGPT (GPT-3.5 y GPT-4), Claude, Gemini, LLaMA y otros. Como todos los detectores, tiene un porcentaje de error que varía según el idioma y el tipo de texto.' },
      { question: '¿Copyleaks es gratuito?', answer: 'Parcialmente. Tiene un plan gratuito con créditos limitados que permiten analizar textos cortos. Para uso intensivo o institucional requiere suscripción de pago. DetectordeIA.ai ofrece detección ilimitada gratuita específicamente optimizada para español.' },
      { question: '¿Es mejor Copyleaks o Turnitin?', answer: 'Depende del caso de uso. Turnitin es el estándar en educación superior y tiene la mayor base de datos de trabajos académicos para comparación. Copyleaks es más accesible para estudiantes (plan gratuito), multilingüe y tiene buena detección de IA. Para texto en español, ambos funcionan, aunque con distintas fortalezas.' }
    ],
    relatedTerms: [
      { term: 'ChatGPT', slug: 'que-es-chatgpt' },
      { term: 'Integridad Académica', slug: 'que-es-integridad-academica' },
      { term: 'Texto Sintético', slug: 'que-es-texto-sintetico' }
    ],
    relatedTools: [
      { name: 'Detector de IA en Español (Gratis)', url: '/?ref=glosario-copyleaks' },
      { name: 'vs Copyleaks — Comparativa', url: '/detector-de-ia-vs/copyleaks?ref=glosario-copyleaks' }
    ],
    cta: { text: 'Probar detector de IA gratuito en español', url: '/?ref=glosario-copyleaks' }
  },

  {
    slug: 'que-es-originality-ai',
    term: 'Originality.ai',
    keywords: ['que es originality ai', 'originality ai detector', 'originality ai vs gptzero', 'originality ai precio', 'detector ia originality'],
    title: '¿Qué es Originality.ai? El Detector de IA para Contenido Web',
    description: 'Originality.ai es un detector de IA y plagio diseñado principalmente para creadores de contenido. Aprende cómo funciona, su precisión y para qué sirve.',
    h1: '¿Qué es Originality.ai? Detector de IA para Contenido y SEO',
    intro: 'Originality.ai es una herramienta de detección de contenido generado por IA orientada principalmente a agencias de contenido, freelancers y equipos SEO. A diferencia de Turnitin (académico) o GPTZero (académico/general), Originality.ai está diseñada para el contexto de producción de contenido web.',
    definition: 'Originality.ai es una plataforma de detección de IA y plagio que combina análisis de texto con IA para identificar contenido generado por modelos como GPT-4, Claude o Gemini. Está orientada al mercado de contenido web y SEO, con integración de API para flujos de trabajo a escala.',
    characteristics: [
      { icon: '🎯', title: 'Orientada a contenido web y SEO', description: 'Su diseño y marketing están enfocados en agencias de contenido y freelancers, no en el mercado académico.' },
      { icon: '🔌', title: 'API disponible para integraciones', description: 'Permite verificar contenido a escala mediante API, útil para agencias que producen cientos de artículos.' },
      { icon: '💵', title: 'Modelo de pago por uso (créditos)', description: 'No tiene plan gratuito significativo; funciona con créditos de pago. Precio competitivo para uso profesional.' },
      { icon: '📊', title: 'Análisis de legibilidad integrado', description: 'Incluye métricas de legibilidad (Flesch-Kincaid) junto con la detección de IA en un solo informe.' }
    ],
    examples: [
      'Una agencia de contenido usa Originality.ai para verificar que los textos producidos por su equipo (que puede usar IA como herramienta) no superen ciertos umbrales de detección antes de publicarlos.',
      'Un freelancer de SEO lo usa para garantizar a sus clientes que el contenido entregado es predominantemente humano.',
      'Un departamento editorial lo usa via API para procesar cientos de artículos automáticamente.'
    ],
    faqs: [
      { question: '¿Originality.ai funciona bien en español?', answer: 'Con limitaciones. Originality.ai está principalmente entrenado en inglés. Para texto en español, la precisión es menor que para inglés, con más falsos positivos. Para detección en español, DetectordeIA.ai está específicamente optimizado para el idioma.' },
      { question: '¿Es Originality.ai más preciso que GPTZero?', answer: 'Las comparativas independientes muestran resultados mixtos. Originality.ai tiende a tener menos falsos negativos (detecta más IA real), pero más falsos positivos en texto humano técnico. GPTZero tiene mejor cobertura académica. Para texto en español, ninguno es el estándar.' },
      { question: '¿Cuándo usar Originality.ai vs un detector académico como Turnitin?', answer: 'Originality.ai es ideal para verificar contenido web antes de publicar. Turnitin es el estándar para entornos académicos. Si eres estudiante y quieres verificar tu trabajo antes de entregarlo, DetectordeIA.ai (gratuito, en español) o GPTZero son más adecuados.' }
    ],
    relatedTerms: [
      { term: 'ChatGPT', slug: 'que-es-chatgpt' },
      { term: 'Copyleaks', slug: 'que-es-copyleaks' },
      { term: 'Texto Sintético', slug: 'que-es-texto-sintetico' }
    ],
    relatedTools: [
      { name: 'Detector de IA Gratis en Español', url: '/?ref=glosario-originality' }
    ],
    cta: { text: 'Probar detector de IA optimizado para español', url: '/?ref=glosario-originality' }
  },

  {
    slug: 'que-es-claude-anthropic',
    term: 'Claude (Anthropic)',
    keywords: ['que es claude ia', 'claude anthropic', 'claude vs chatgpt', 'claude ai estudiantes', 'anthropic claude'],
    title: '¿Qué es Claude de Anthropic? IA para Estudiantes 2025',
    description: 'Claude es el modelo de IA de Anthropic, alternativa a ChatGPT. Descubre sus características, cómo usarlo éticamente en la universidad y en qué se diferencia de GPT.',
    h1: '¿Qué es Claude de Anthropic? Guía para Estudiantes 2025',
    intro: 'Claude es el modelo de inteligencia artificial desarrollado por Anthropic, una empresa fundada por ex-investigadores de OpenAI. Es el principal competidor de ChatGPT y se caracteriza por ser más cauteloso, tener ventanas de contexto más largas y enfocarse especialmente en la seguridad y la honestidad.',
    definition: 'Claude es una familia de modelos de lenguaje grande (LLM) desarrollados por Anthropic. La versión actual (Claude 3.5/4) destaca por su capacidad para analizar documentos extensos, razonar con precisión y mantener conversaciones largas. Está entrenado con Constitutional AI, un método que enfatiza la honestidad y la reducción de respuestas dañinas.',
    characteristics: [
      { icon: '📄', title: 'Ventana de contexto muy larga', description: 'Claude puede procesar documentos de cientos de páginas en una sola conversación, ideal para análisis de tesis, papers o libros completos.' },
      { icon: '🛡️', title: 'Enfoque en seguridad y honestidad', description: 'Anthropic ha priorizado que Claude diga "no sé" cuando no sabe, en lugar de inventar respuestas, lo que lo hace relativamente más fiable en temas académicos.' },
      { icon: '✍️', title: 'Excelente en escritura y análisis', description: 'Claude es especialmente bueno para análisis de textos, redacción de feedback estructurado y explicación de conceptos complejos.' },
      { icon: '🆓', title: 'Plan gratuito disponible en claude.ai', description: 'Accesible gratuitamente con límites de uso en claude.ai, sin necesidad de crear cuenta en algunos contextos.' }
    ],
    examples: [
      'Un estudiante sube su borrador de tesis a Claude y le pide feedback sobre la coherencia argumentativa de cada capítulo.',
      'Un profesor usa Claude para generar preguntas de examen a partir del programa de su asignatura, ahorrando tiempo en el diseño de evaluaciones.',
      'Un investigador usa la ventana de contexto larga para analizar 50 papers a la vez y pedir a Claude que identifique patrones comunes y divergencias.'
    ],
    faqs: [
      { question: '¿Claude es mejor que ChatGPT para trabajos académicos?', answer: 'Depende de la tarea. Claude tiene ventajas en análisis de documentos largos y razonamiento paso a paso. ChatGPT tiene mayor integración con herramientas externas (GPT-4o con internet, Dall-E para imágenes). Para análisis de textos académicos extensos, Claude suele ser la elección preferida de investigadores.' },
      { question: '¿Los detectores de IA detectan texto generado por Claude?', answer: 'Sí. Los detectores de IA analizan patrones estadísticos del texto, no la marca del modelo. El texto generado por Claude tiene patrones similares a otros LLMs que los detectores identifican. DetectordeIA.ai está entrenado para detectar texto de Claude, ChatGPT, Gemini y otros.' },
      { question: '¿Es ético usar Claude para estudiar?', answer: 'Usar Claude para entender conceptos, generar preguntas de práctica o recibir feedback sobre borradores es ético y beneficioso. Usarlo para generar trabajos entregables sin declararlo es deshonestidad académica, independientemente del modelo.' }
    ],
    relatedTerms: [
      { term: 'ChatGPT', slug: 'que-es-chatgpt' },
      { term: 'Gemini (Google)', slug: 'que-es-gemini-google' },
      { term: 'DeepSeek', slug: 'que-es-deepseek' }
    ],
    relatedTools: [
      { name: 'Detector de IA Gratis', url: '/?ref=glosario-claude' }
    ],
    cta: { text: 'Verificar si un texto fue generado por Claude u otra IA', url: '/?ref=glosario-claude' }
  },

  {
    slug: 'que-es-llm-large-language-model',
    term: 'LLM (Large Language Model)',
    keywords: ['que es llm', 'large language model', 'modelo de lenguaje grande', 'llm ia', 'como funciona llm'],
    title: '¿Qué es un LLM o Modelo de Lenguaje Grande? Guía Sencilla 2025',
    description: 'Un LLM (Large Language Model) es la tecnología detrás de ChatGPT, Claude y Gemini. Explicación clara para estudiantes sin conocimientos técnicos.',
    h1: '¿Qué es un LLM? Los Modelos de Lenguaje que Explican la IA Generativa',
    intro: 'LLM significa Large Language Model (Modelo de Lenguaje Grande). Es la tecnología que está detrás de ChatGPT, Claude, Gemini y prácticamente toda IA generativa de texto. Entender qué es un LLM te ayuda a entender por qué la IA hace lo que hace — y por qué se equivoca.',
    definition: 'Un Large Language Model (LLM) es un sistema de inteligencia artificial entrenado con enormes cantidades de texto para predecir la probabilidad de la siguiente palabra en una secuencia. A partir de esta tarea aparentemente simple, los LLMs desarrollan capacidades emergentes como escritura, traducción, razonamiento y código. Contienen miles de millones de parámetros que capturan patrones estadísticos del lenguaje humano.',
    characteristics: [
      { icon: '📚', title: 'Entrenados en billones de palabras', description: 'Los LLMs más grandes se entrenan con una fracción significativa del texto disponible en internet, libros digitalizados y otras fuentes.' },
      { icon: '🎲', title: 'Funcionan por predicción de probabilidad', description: 'No "saben" nada en el sentido humano: predicen cuál es la continuación más probable dado el texto anterior. Por eso pueden alucinar.' },
      { icon: '⚡', title: 'Capacidades emergentes no programadas', description: 'Algunas capacidades como la traducción o el razonamiento matemático no se programaron explícitamente — emergieron del entrenamiento a escala.' },
      { icon: '🔄', title: 'Se refinan con feedback humano (RLHF)', description: 'Después del entrenamiento inicial, se afinan con retroalimentación humana para hacer las respuestas más útiles, honestas y seguras.' }
    ],
    examples: [
      'GPT-4 (OpenAI), Claude 3.5 (Anthropic) y Gemini Ultra (Google) son LLMs de alto rendimiento.',
      'LLaMA (Meta) es un LLM de código abierto que puede ejecutarse localmente en hardware potente.',
      'Los asistentes de código como GitHub Copilot están basados en LLMs especializados en código de programación.'
    ],
    faqs: [
      { question: '¿Cuál es la diferencia entre un LLM y la inteligencia artificial general?', answer: 'Un LLM es IA especializada en lenguaje — extraordinariamente buena en procesar y generar texto, pero no tiene comprensión real del mundo ni conciencia. La Inteligencia Artificial General (AGI) sería un sistema con capacidades cognitivas comparables o superiores a las humanas en todos los dominios. Los LLMs actuales no son AGI.' },
      { question: '¿Por qué los LLMs inventan información (alucinan)?', answer: 'Porque su objetivo de entrenamiento es predecir texto plausible, no verificar la verdad. Cuando el LLM no tiene información precisa, genera la continuación estadísticamente más probable, que puede ser incorrecta. La "alucinación" es una consecuencia directa de cómo funcionan.' },
      { question: '¿Los detectores de IA detectan texto de cualquier LLM?', answer: 'Los detectores de IA están entrenados para identificar los patrones estadísticos que comparten los textos de LLMs en general. Funcionan bien con los modelos más usados (GPT-4, Claude, Gemini). Modelos menos conocidos o muy especializados pueden ser más difíciles de detectar.' }
    ],
    relatedTerms: [
      { term: 'ChatGPT', slug: 'que-es-chatgpt' },
      { term: 'IA Generativa', slug: 'que-es-ia-generativa' },
      { term: 'Alucinación de IA', slug: 'que-es-hallucination-ia' }
    ],
    relatedTools: [
      { name: 'Detector de IA Gratis', url: '/?ref=glosario-llm' }
    ],
    cta: { text: 'Detectar texto generado por LLMs — gratis', url: '/?ref=glosario-llm' }
  },

  {
    slug: 'que-es-ia-generativa',
    term: 'IA Generativa',
    keywords: ['que es ia generativa', 'inteligencia artificial generativa', 'ia generativa ejemplos', 'ia generativa educacion', 'generative ai español'],
    title: '¿Qué es la IA Generativa? Guía Completa para Estudiantes 2025',
    description: 'La IA generativa es la tecnología que crea texto, imágenes y código desde cero. Guía clara sobre qué es, cómo funciona y su impacto en la educación.',
    h1: '¿Qué es la IA Generativa? De ChatGPT a Midjourney Explicado',
    intro: 'La inteligencia artificial generativa es la categoría de IA que puede crear contenido nuevo — texto, imágenes, código, audio — en lugar de solo clasificar o analizar datos existentes. Es la tecnología detrás de ChatGPT, Midjourney, Suno y cientos de otras herramientas que están cambiando cómo creamos.',
    definition: 'La IA generativa es un subconjunto de la inteligencia artificial que utiliza modelos (principalmente LLMs para texto, modelos de difusión para imágenes) entrenados en grandes volúmenes de datos para generar contenido nuevo y original. A diferencia de la IA discriminativa (que clasifica o predice), la IA generativa produce outputs que no existían previamente.',
    characteristics: [
      { icon: '✨', title: 'Crea contenido original a demanda', description: 'Puede generar texto, imágenes, código, música o video que no existen previamente, a partir de instrucciones en lenguaje natural.' },
      { icon: '🧠', title: 'Aprende patrones de datos de entrenamiento', description: 'Los modelos generativos aprenden la distribución estadística de sus datos de entrenamiento y pueden generar muestras de esa distribución.' },
      { icon: '🌍', title: 'Accesible para no-técnicos', description: 'A diferencia de la IA anterior, la IA generativa se controla en lenguaje natural, lo que la hace accesible para cualquier persona.' },
      { icon: '⚡', title: 'Velocidad de adopción sin precedentes', description: 'ChatGPT alcanzó 100 millones de usuarios en 2 meses, la adopción tecnológica más rápida de la historia.' }
    ],
    examples: [
      'ChatGPT, Claude y Gemini son IA generativa de texto — generan respuestas, ensayos, código y análisis.',
      'Midjourney, Stable Diffusion y DALL-E 3 son IA generativa de imágenes.',
      'Suno y Udio generan música completa a partir de descripciones en texto.',
      'GitHub Copilot genera código de programación a partir de comentarios o contexto del archivo.'
    ],
    faqs: [
      { question: '¿Cuál es la diferencia entre IA generativa e IA tradicional?', answer: 'La IA tradicional (antes de 2020) se especializaba en tareas específicas: clasificar imágenes, detectar fraude, recomendar películas. La IA generativa puede crear contenido nuevo en múltiples dominios a partir de instrucciones en lenguaje natural. Es más flexible pero también más difícil de controlar.' },
      { question: '¿La IA generativa entiende lo que produce?', answer: 'No en el sentido humano. Los modelos generativos producen outputs estadísticamente coherentes con su entrenamiento, pero no tienen comprensión semántica real. Por eso pueden generar texto que "suena" bien pero es factualmente incorrecto (alucinaciones).' },
      { question: '¿Cómo cambia la IA generativa la educación?', answer: 'Permite personalizar el aprendizaje a nivel individual, generar material de estudio bajo demanda y automatizar tareas rutinarias de los docentes. Al mismo tiempo, plantea desafíos de evaluación (¿cómo saber si el trabajo es del estudiante?) e integridad académica que las instituciones están resolviendo progresivamente.' }
    ],
    relatedTerms: [
      { term: 'LLM (Large Language Model)', slug: 'que-es-llm-large-language-model' },
      { term: 'ChatGPT', slug: 'que-es-chatgpt' },
      { term: 'Alucinación de IA', slug: 'que-es-hallucination-ia' }
    ],
    relatedTools: [
      { name: 'Detector de IA Generativa Gratis', url: '/?ref=glosario-ia-generativa' }
    ],
    cta: { text: 'Detectar texto generado por IA generativa', url: '/?ref=glosario-ia-generativa' }
  },

  {
    slug: 'que-es-prompt-engineering',
    term: 'Prompt Engineering',
    keywords: ['que es prompt engineering', 'prompt engineering ia', 'como hacer buenos prompts', 'prompts para chatgpt', 'ingenieria de prompts'],
    title: '¿Qué es el Prompt Engineering? Cómo Escribir Mejores Prompts en 2025',
    description: 'El prompt engineering es el arte de escribir instrucciones efectivas para modelos de IA. Guía práctica para estudiantes que quieren mejores resultados de ChatGPT y Claude.',
    h1: '¿Qué es el Prompt Engineering? Guía Práctica para Mejores Resultados',
    intro: 'Prompt engineering es la práctica de diseñar instrucciones (prompts) para modelos de IA de forma que obtengas los resultados que necesitas. Con los mismos modelos, un buen prompt puede darte resultados 10 veces mejores que uno malo.',
    definition: 'El prompt engineering es la disciplina de diseñar, optimizar y estructurar las instrucciones (prompts) que se envían a modelos de IA para obtener outputs específicos y de alta calidad. Combina conocimiento del comportamiento del modelo con técnicas como chain-of-thought, few-shot learning y role prompting para maximizar la utilidad de los LLMs.',
    characteristics: [
      { icon: '🎯', title: 'Especificidad sobre generalidad', description: 'Los prompts específicos producen mejores resultados. "Explica la fotosíntesis para un estudiante de 16 años con analogía del automóvil" supera a "explica la fotosíntesis".' },
      { icon: '🔄', title: 'Iterativo por naturaleza', description: 'El buen prompt engineering es un proceso de refinamiento: el primer prompt rara vez es el mejor.' },
      { icon: '📋', title: 'Contexto, tarea, formato y audiencia', description: 'Los cuatro elementos de un buen prompt: contexto (quién eres), tarea (qué quieres), formato (cómo lo quieres), audiencia (para quién).' },
      { icon: '🧪', title: 'Técnicas avanzadas probadas', description: 'Chain-of-thought (pedir razonamiento paso a paso), few-shot (dar ejemplos), role prompting (asignar un rol al modelo) y tree-of-thought mejoran resultados en tareas complejas.' }
    ],
    examples: [
      'Prompt básico: "Explica la democracia". Prompt mejorado: "Explica el concepto de democracia representativa en 200 palabras para un estudiante de bachillerato, usando una analogía con la elección de un representante de clase."',
      'Chain-of-thought: "Resuelve este problema matemático paso a paso, explicando tu razonamiento en cada paso antes de dar el resultado."',
      'Role prompting: "Actúa como un profesor universitario de filosofía. Revisa este párrafo de mi ensayo y dime qué argumentos necesitan más sustento y por qué."'
    ],
    faqs: [
      { question: '¿El prompt engineering es una habilidad valiosa para estudiantes?', answer: 'Sí, cada vez más. Saber extraer el máximo valor de las herramientas de IA es una competencia digital relevante en casi cualquier carrera. Al mismo tiempo, es una herramienta que facilita el estudio — no lo reemplaza.' },
      { question: '¿Usar buenos prompts hace el texto más o menos detectable como IA?', answer: 'Paradójicamente, los textos generados con prompts muy específicos y contextualizados pueden ser más difíciles de detectar porque se parecen más al estilo del escritor. Sin embargo, los patrones estadísticos del LLM persisten independientemente del prompt. Un buen detector analiza esos patrones, no el contenido.' },
      { question: '¿Dónde aprendo prompt engineering de forma gratuita?', answer: 'Anthropic y OpenAI tienen guías gratuitas. "Prompt Engineering Guide" de dair.ai es el recurso de referencia open-source. Para uso académico, el punto clave es aprender a obtener feedback y explicaciones útiles de la IA, no a generar contenido para entregar.' }
    ],
    relatedTerms: [
      { term: 'ChatGPT', slug: 'que-es-chatgpt' },
      { term: 'LLM (Large Language Model)', slug: 'que-es-llm-large-language-model' },
      { term: 'IA Generativa', slug: 'que-es-ia-generativa' }
    ],
    relatedTools: [
      { name: 'Detector de IA Gratis', url: '/?ref=glosario-prompt-engineering' },
      { name: 'Humanizador de Texto IA', url: '/humanizador?ref=glosario-prompt-engineering' }
    ],
    cta: { text: 'Verificar si tu texto parece generado por IA', url: '/?ref=glosario-prompt-engineering' }
  },

  {
    slug: 'que-es-turnitin-ia-detector',
    term: 'Turnitin AI Detector',
    keywords: ['turnitin ia detector', 'turnitin deteccion ia', 'turnitin ai writing detector', 'turnitin porcentaje ia', 'turnitin chatgpt'],
    title: '¿Qué es el Detector de IA de Turnitin? Cómo Funciona en 2025',
    description: 'Turnitin AI Detector analiza trabajos académicos para detectar texto generado por IA. Aprende cómo funciona, su precisión y cómo interpretar sus informes.',
    h1: '¿Qué es el Detector de IA de Turnitin? Guía Completa 2025',
    intro: 'Desde 2023, Turnitin incorporó un módulo específico de detección de texto generado por IA a su plataforma de antiplagio. Es hoy el detector de IA más usado en universidades de todo el mundo, y entender cómo funciona es esencial para cualquier estudiante.',
    definition: 'El Turnitin AI Writing Detector es un módulo integrado en la plataforma Turnitin que analiza trabajos académicos para determinar qué porcentaje del texto tiene probabilidad de haber sido generado por IA. Funciona mediante modelos de aprendizaje automático entrenados para identificar los patrones estadísticos del texto generado por LLMs como GPT-4, Claude y similares.',
    characteristics: [
      { icon: '📊', title: 'Reporta porcentaje de "probabilidad de IA"', description: 'A diferencia del indicador de similitud (plagio), el indicador de IA muestra qué porcentaje del texto es probablemente generado por IA, no qué fuente.' },
      { icon: '🔵', title: 'Indicador visual separado del de plagio', description: 'En el informe de Turnitin, la detección de IA aparece en azul, separada del indicador de similitud en rojo/amarillo.' },
      { icon: '🔄', title: 'Actualizado regularmente', description: 'Turnitin actualiza sus modelos para seguir el ritmo de los nuevos LLMs y de las técnicas de evasión.' },
      { icon: '⚠️', title: 'No es infalible — tiene falsos positivos', description: 'Texto humano muy técnico, formulaico o en idiomas distintos del inglés puede ser marcado incorrectamente como IA.' }
    ],
    examples: [
      'Un estudiante entrega un trabajo con 40% de texto generado por ChatGPT — Turnitin AI Detector lo marca con alto porcentaje de IA.',
      'Un estudiante con escritura muy uniforme y técnica recibe un falso positivo de 20% de IA cuando su texto es 100% humano.',
      'Un profesor ve un informe Turnitin con 0% similitud pero 65% IA — el texto no está copiado de ninguna fuente conocida pero es mayoritariamente generado por IA.'
    ],
    faqs: [
      { question: '¿Qué porcentaje en Turnitin AI es preocupante?', answer: 'No existe un umbral universal. Cada institución define sus propios umbrales. Como referencia: 0-10% rara vez activa procesos; 20-40% puede justificar una conversación con el estudiante; >50% es señal de alerta significativa en la mayoría de instituciones. Pero la interpretación siempre debe ser contextual.' },
      { question: '¿Turnitin AI Detector detecta Claude y Gemini además de ChatGPT?', answer: 'Sí. Turnitin detecta texto de todos los principales LLMs, no solo ChatGPT. El modelo está entrenado en los patrones estadísticos comunes a los LLMs en general, independientemente del proveedor.' },
      { question: '¿Puede un estudiante impugnar un resultado de Turnitin AI?', answer: 'Sí, y en muchas instituciones se puede. La evidencia más efectiva es demostrar el proceso: borradores previos, historial de edición, notas de investigación. Turnitin misma indica en su documentación que el indicador de IA no debe usarse como única evidencia para sanciones.' }
    ],
    relatedTerms: [
      { term: 'Texto Sintético', slug: 'que-es-texto-sintetico' },
      { term: 'Integridad Académica', slug: 'que-es-integridad-academica' },
      { term: 'Copyleaks', slug: 'que-es-copyleaks' }
    ],
    relatedTools: [
      { name: 'Detector de IA Gratis (alternativa)', url: '/?ref=glosario-turnitin-detector' },
      { name: 'vs Turnitin — Comparativa', url: '/detector-de-ia-vs/turnitin?ref=glosario-turnitin-detector' }
    ],
    cta: { text: 'Verificar tu trabajo antes de entregarlo en Turnitin', url: '/?ref=glosario-turnitin-detector' }
  },

  {
    slug: 'que-es-plagio-de-ideas',
    term: 'Plagio de Ideas',
    keywords: ['que es plagio de ideas', 'plagio ideas academico', 'plagio sin copiar texto', 'como evitar plagio de ideas', 'tipos de plagio'],
    title: '¿Qué es el Plagio de Ideas? El Plagio que Muchos Desconocen',
    description: 'El plagio de ideas es usar las ideas de otro sin citarlo, aunque no copies sus palabras exactas. Aprende a identificarlo, evitarlo y diferenciarlo del conocimiento común.',
    h1: '¿Qué es el Plagio de Ideas? Más Allá de Copiar y Pegar',
    intro: 'La mayoría de estudiantes sabe que copiar texto es plagio. Menos saben que usar las ideas, argumentos o estructuras conceptuales de otro sin citarlo también lo es, aunque uses tus propias palabras. El plagio de ideas es una de las formas más frecuentes de deshonestidad académica no intencional.',
    definition: 'El plagio de ideas (también llamado plagio conceptual o plagio de pensamiento) ocurre cuando se utilizan las ideas, argumentos, teorías, estructuras de análisis o conclusiones originales de otra persona sin atribuírselos con una cita adecuada. No requiere copiar palabras textuales — basta con apropiarse del pensamiento sin reconocerlo.',
    characteristics: [
      { icon: '💭', title: 'Ideas, no palabras', description: 'Se puede parafrrasear perfectamente y aun así plagiar si no se cita la fuente de la idea original.' },
      { icon: '🔍', title: 'Difícil de detectar automáticamente', description: 'Los detectores de plagio como Turnitin no lo detectan si se han cambiado las palabras. Requiere que el corrector conozca la literatura.' },
      { icon: '📚', title: 'Especialmente relevante en humanidades y ciencias sociales', description: 'Donde las ideas y los argumentos son la contribución principal, el plagio de ideas es particularmente grave.' },
      { icon: '⚖️', title: 'Igual de sancionable que el plagio textual', description: 'Los reglamentos académicos no distinguen entre plagio textual e intelectual en las sanciones.' }
    ],
    examples: [
      'Usar la tesis central de un artículo (que el cambio climático afecta desproporcionalmente a países en desarrollo) en tu trabajo sin citar al autor, aunque uses palabras completamente diferentes.',
      'Adoptar la estructura de análisis que un autor desarrolló (por ejemplo, el marco de las "cinco fuerzas" de Porter sin citarlo) como si fuera tu propio enfoque analítico.',
      'Presentar las conclusiones de una investigación como propias en un resumen, cuando en realidad son del investigador original que resumiste.'
    ],
    faqs: [
      { question: '¿Cómo distinguir entre plagio de ideas y conocimiento común?', answer: 'Una idea es "conocimiento común" si aparece en múltiples fuentes sin atribución a un origen específico (ej: "la Tierra orbita alrededor del Sol"). Una idea original atribuible a un autor específico (ej: la "disonancia cognitiva" de Festinger) siempre debe citarse. Si dudas, cita.' },
      { question: '¿Puede la IA ayudarme a plagiar ideas sin saberlo?', answer: 'Sí. ChatGPT y otros LLMs pueden parafrasear ideas de textos de su entrenamiento sin indicar la fuente. Si usas las ideas que la IA genera sin verificar su origen, podrías estar plagiando sin saberlo. Siempre verifica las ideas originales contra fuentes primarias.' },
      { question: '¿El plagio de ideas se puede probar?', answer: 'Sí, aunque es más difícil. Requiere que el corrector conozca la literatura original. Los académicos especializados reconocen las ideas de su campo. En tesis y trabajos de posgrado, los directores e investigadores del tribunal pueden identificar plagio conceptual que los detectores automáticos no encuentran.' }
    ],
    relatedTerms: [
      { term: 'Patchwriting', slug: 'que-es-patchwriting' },
      { term: 'Integridad Académica', slug: 'que-es-integridad-academica' },
      { term: 'Texto Sintético', slug: 'que-es-texto-sintetico' }
    ],
    relatedTools: [
      { name: 'Detector de IA Gratis', url: '/?ref=glosario-plagio-ideas' },
      { name: 'Verificador de Originalidad', url: '/verificador-de-ia?ref=glosario-plagio-ideas' }
    ],
    cta: { text: 'Verificar originalidad de tu texto', url: '/?ref=glosario-plagio-ideas' }
  },

  // ── SPRINT 4D ────────────────────────────────────────────────────────────

  {
    slug: 'que-es-gpt-4',
    term: 'GPT-4',
    keywords: ['que es gpt-4', 'gpt4 ia', 'gpt-4 vs gpt-3', 'gpt-4 openai', 'gpt4 estudiantes'],
    title: '¿Qué es GPT-4? El Modelo Detrás de ChatGPT Explicado 2025',
    description: 'GPT-4 es el modelo de lenguaje de OpenAI que potencia ChatGPT Plus. Aprende cómo funciona, qué lo diferencia de versiones anteriores y cómo detectar texto que genera.',
    h1: '¿Qué es GPT-4? El Modelo que Cambió la IA Explicado',
    intro: 'GPT-4 es el modelo de lenguaje de OpenAI lanzado en 2023, el más usado en el mundo académico a través de ChatGPT Plus. Entender qué es y cómo funciona te ayuda a usarlo mejor — y a entender por qué los detectores de IA lo identifican.',
    definition: 'GPT-4 (Generative Pre-trained Transformer 4) es un modelo de lenguaje grande multimodal desarrollado por OpenAI. Puede procesar texto e imágenes como entrada y generar texto como salida. Se lanzó en marzo de 2023 y es la base de ChatGPT Plus y la API de OpenAI. Tiene capacidad para razonar, escribir código, analizar documentos y generar texto en más de 50 idiomas.',
    characteristics: [
      { icon: '🧠', title: 'Multimodal: procesa texto e imágenes', description: 'A diferencia de GPT-3.5, GPT-4 puede analizar imágenes además de texto, lo que lo hace útil para analizar gráficos, diagramas o fotografías.' },
      { icon: '📏', title: 'Ventana de contexto extendida', description: 'La versión GPT-4 Turbo puede procesar hasta 128,000 tokens (aproximadamente 100,000 palabras) en una sola conversación.' },
      { icon: '🎯', title: 'Mayor precisión en razonamiento complejo', description: 'GPT-4 supera significativamente a GPT-3.5 en tareas de razonamiento matemático, análisis jurídico y comprensión de textos científicos.' },
      { icon: '🔄', title: 'Sucesor de GPT-3.5 (que alimenta la versión gratuita de ChatGPT)', description: 'ChatGPT gratuito usa GPT-3.5 Turbo. ChatGPT Plus (de pago) usa GPT-4 y sus variantes.' }
    ],
    examples: [
      'ChatGPT Plus usa GPT-4 para responder preguntas, escribir ensayos y analizar documentos.',
      'La API de OpenAI permite a empresas integrar GPT-4 en sus propias aplicaciones.',
      'GPT-4o (2024) es una versión optimizada de GPT-4 con mayor velocidad y menor coste por token.'
    ],
    faqs: [
      { question: '¿GPT-4 es mejor que GPT-3.5 para trabajos académicos?', answer: 'En general sí: GPT-4 tiene mayor precisión, menos alucinaciones y mejor razonamiento en tareas complejas. Sin embargo, en textos cortos y simples la diferencia es menor. Para trabajos largos, con análisis complejos o en disciplinas técnicas, GPT-4 produce outputs más confiables.' },
      { question: '¿Los detectores de IA detectan texto de GPT-4?', answer: 'Sí. Los detectores como DetectordeIA.ai están entrenados para identificar los patrones estadísticos comunes a los textos de GPT-4, GPT-3.5 y otros modelos. GPT-4 genera texto de alta calidad pero con patrones reconocibles de baja perplejidad y uniformidad.' },
      { question: '¿GPT-4 puede equivocarse?', answer: 'Sí, y lo hace. GPT-4 tiene menor tasa de alucinaciones que GPT-3.5, pero sigue inventando citas, datos y afirmaciones con confianza. Nunca incluyas información de GPT-4 en un trabajo académico sin verificarla en una fuente primaria.' }
    ],
    relatedTerms: [
      { term: 'ChatGPT', slug: 'que-es-chatgpt' },
      { term: 'LLM (Large Language Model)', slug: 'que-es-llm-large-language-model' },
      { term: 'Claude (Anthropic)', slug: 'que-es-claude-anthropic' }
    ],
    relatedTools: [
      { name: 'Detector de IA Gratis', url: '/?ref=glosario-gpt4' }
    ],
    cta: { text: 'Detectar si tu texto fue generado por GPT-4', url: '/?ref=glosario-gpt4' }
  },

  {
    slug: 'que-es-chatbot',
    term: 'Chatbot',
    keywords: ['que es un chatbot', 'chatbot ia', 'chatbot definicion', 'chatbot vs ia generativa', 'chatbot educacion'],
    title: '¿Qué es un Chatbot? Diferencias con la IA Generativa 2025',
    description: 'Un chatbot es un programa que simula conversación. Descubre qué es, cómo difiere de la IA generativa moderna y por qué importa en educación.',
    h1: '¿Qué es un Chatbot? De los Bots Simples a ChatGPT',
    intro: 'Chatbot es un término genérico para cualquier programa que simula conversación con humanos. ChatGPT es un chatbot — pero no todos los chatbots son como ChatGPT. La diferencia técnica es importante para entender qué pueden y qué no pueden hacer.',
    definition: 'Un chatbot es un programa de software diseñado para simular conversaciones con usuarios humanos, especialmente a través de interfaces de texto o voz. Los chatbots van desde sistemas basados en reglas simples (respuestas predefinidas para palabras clave) hasta sistemas avanzados basados en LLMs que pueden mantener conversaciones complejas y generar respuestas originales.',
    characteristics: [
      { icon: '🔄', title: 'Dos tipos: basados en reglas y basados en IA', description: 'Los chatbots de reglas responden con scripts predefinidos. Los basados en IA generativa (como ChatGPT) generan respuestas originales en tiempo real.' },
      { icon: '💬', title: 'Interfaz conversacional', description: 'La interacción principal es en lenguaje natural — texto o voz — en lugar de menús o formularios.' },
      { icon: '🎯', title: 'Propósitos variados', description: 'Atención al cliente, educación, entretenimiento, salud mental (con limitaciones), asistencia académica.' },
      { icon: '⚡', title: 'Disponibilidad 24/7', description: 'Los chatbots no tienen horario, lo que los hace útiles para soporte continuo y asistencia fuera de horario de atención humana.' }
    ],
    examples: [
      'ChatGPT, Claude y Gemini son chatbots basados en LLMs con capacidad generativa.',
      'Los chatbots de atención al cliente de bancos y aerolíneas suelen ser de reglas o híbridos.',
      'Duolingo usa chatbots para práctica conversacional de idiomas.',
      'Muchas universidades experimentan con chatbots para responder preguntas frecuentes de estudiantes.'
    ],
    faqs: [
      { question: '¿Cuál es la diferencia entre un chatbot y ChatGPT?', answer: 'ChatGPT es un chatbot, pero de nueva generación. Los chatbots tradicionales responden con frases predefinidas para palabras clave. ChatGPT usa un LLM que genera respuestas originales, mantiene el contexto de la conversación y puede razonar sobre temas complejos. Es la diferencia entre un menú de opciones y una conversación real.' },
      { question: '¿Los chatbots de IA pueden reemplazar a los profesores?', answer: 'No. Pueden complementar la enseñanza respondiendo preguntas frecuentes, generando ejercicios de práctica y dando feedback inmediato sobre tareas concretas. Pero el rol del docente como guía, evaluador del pensamiento crítico y constructor de relaciones pedagógicas no es reemplazable.' },
      { question: '¿Es seguro usar chatbots de IA para preguntas sobre salud?', answer: 'Con precaución. Los chatbots de IA pueden dar información general útil, pero no reemplazan la consulta médica. Pueden cometer errores factuales o no considerar el contexto individual del paciente. Para decisiones de salud, siempre consultar un profesional.' }
    ],
    relatedTerms: [
      { term: 'ChatGPT', slug: 'que-es-chatgpt' },
      { term: 'LLM (Large Language Model)', slug: 'que-es-llm-large-language-model' },
      { term: 'IA Generativa', slug: 'que-es-ia-generativa' }
    ],
    relatedTools: [
      { name: 'Detector de IA Gratis', url: '/?ref=glosario-chatbot' }
    ],
    cta: { text: 'Verificar si un texto fue generado por un chatbot de IA', url: '/?ref=glosario-chatbot' }
  },

  {
    slug: 'que-es-aprendizaje-automatico',
    term: 'Aprendizaje Automático (Machine Learning)',
    keywords: ['que es aprendizaje automatico', 'machine learning definicion', 'aprendizaje automatico ejemplos', 'ml ia diferencia', 'machine learning educacion'],
    title: '¿Qué es el Aprendizaje Automático? Guía Clara 2025',
    description: 'El aprendizaje automático (machine learning) es la base de la IA moderna. Explicación sencilla para estudiantes de qué es, cómo funciona y para qué sirve.',
    h1: '¿Qué es el Aprendizaje Automático? Machine Learning Explicado',
    intro: 'El aprendizaje automático (o machine learning) es la tecnología que permite a las máquinas aprender de datos sin ser programadas explícitamente para cada tarea. Es la base de los detectores de spam, los sistemas de recomendación de Netflix — y de los detectores de IA.',
    definition: 'El aprendizaje automático (Machine Learning o ML) es una rama de la inteligencia artificial que desarrolla algoritmos capaces de aprender patrones a partir de datos y mejorar su rendimiento con la experiencia, sin ser programados con reglas explícitas para cada caso. Los LLMs como GPT-4 son un tipo de sistema de aprendizaje automático.',
    characteristics: [
      { icon: '📊', title: 'Aprende de datos, no de reglas', description: 'En lugar de programar "si el email contiene X palabras entonces es spam", el modelo aprende de miles de emails etiquetados como spam o no spam.' },
      { icon: '🔄', title: 'Mejora con más datos', description: 'Cuantos más datos de entrenamiento, mejor el rendimiento — hasta cierto punto. Esta es una diferencia fundamental con el software tradicional.' },
      { icon: '🎯', title: 'Tres tipos principales', description: 'Supervisado (aprende con ejemplos etiquetados), no supervisado (encuentra patrones sin etiquetas), y por refuerzo (aprende de recompensas y penalizaciones).' },
      { icon: '🌐', title: 'Base de la IA moderna', description: 'Los detectores de spam, los sistemas de recomendación, los traductores automáticos y los LLMs son todos sistemas de aprendizaje automático.' }
    ],
    examples: [
      'El detector de spam de Gmail usa ML para clasificar correos como spam o no spam.',
      'Los detectores de IA como DetectordeIA.ai usan ML para clasificar texto como humano o de IA.',
      'Los sistemas de recomendación de Spotify y Netflix usan ML para predecir qué te gustará.',
      'El reconocimiento facial de tu teléfono usa ML para identificar tu cara.'
    ],
    faqs: [
      { question: '¿Cuál es la diferencia entre ML e inteligencia artificial?', answer: 'La IA es el campo general (crear máquinas que se comporten inteligentemente). El ML es una técnica dentro de la IA (aprender de datos). Todo ML es IA, pero no toda IA es ML — hay sistemas de IA basados en reglas que no aprenden de datos.' },
      { question: '¿Los detectores de IA usan machine learning?', answer: 'Sí. Los detectores de texto de IA son clasificadores de ML entrenados para distinguir texto humano de texto generado por LLMs. Analizan patrones estadísticos aprendidos de ejemplos etiquetados de texto humano y texto de IA.' },
      { question: '¿Necesito saber programar para usar machine learning?', answer: 'Para usar herramientas basadas en ML (como ChatGPT o DetectordeIA.ai), no. Para desarrollar tus propios modelos de ML, sí necesitas conocimientos de programación (Python principalmente) y matemáticas (álgebra lineal, estadística).' }
    ],
    relatedTerms: [
      { term: 'LLM (Large Language Model)', slug: 'que-es-llm-large-language-model' },
      { term: 'Red Neuronal', slug: 'que-es-red-neuronal' },
      { term: 'IA Generativa', slug: 'que-es-ia-generativa' }
    ],
    relatedTools: [
      { name: 'Detector de IA (basado en ML)', url: '/?ref=glosario-ml' }
    ],
    cta: { text: 'Probar el detector de IA basado en machine learning', url: '/?ref=glosario-ml' }
  },

  {
    slug: 'que-es-red-neuronal',
    term: 'Red Neuronal',
    keywords: ['que es una red neuronal', 'red neuronal artificial', 'red neuronal ia', 'como funciona red neuronal', 'red neuronal deep learning'],
    title: '¿Qué es una Red Neuronal? Explicación Simple 2025',
    description: 'Una red neuronal es la arquitectura que hace posible la IA moderna. Explicación sin fórmulas para entender qué son, cómo aprenden y por qué importan.',
    h1: '¿Qué es una Red Neuronal? La Arquitectura detrás de la IA Moderna',
    intro: 'Las redes neuronales son la arquitectura computacional que hace posibles ChatGPT, los detectores de imágenes y los sistemas de reconocimiento de voz. No son neuronas reales — son unidades matemáticas organizadas en capas que aprenden a reconocer patrones.',
    definition: 'Una red neuronal artificial es un sistema computacional inspirado en la estructura del cerebro humano, compuesto por capas de nodos (neuronas artificiales) interconectados que procesan información. Las redes neuronales aprenden ajustando los pesos de las conexiones entre nodos a través del proceso de entrenamiento con datos. Las redes profundas (deep learning) tienen muchas capas ocultas entre la entrada y la salida.',
    characteristics: [
      { icon: '🧱', title: 'Organización en capas', description: 'Capa de entrada (recibe los datos), capas ocultas (procesan la información), capa de salida (produce el resultado). El "deep" en deep learning se refiere a tener muchas capas ocultas.' },
      { icon: '⚖️', title: 'Aprenden ajustando pesos', description: 'El entrenamiento ajusta los pesos de las conexiones para minimizar el error. Después de millones de ajustes, la red aprende a reconocer patrones.' },
      { icon: '🌐', title: 'Base de los LLMs', description: 'Los modelos de lenguaje como GPT-4 y Claude están basados en redes neuronales transformer — una arquitectura específica de red neuronal diseñada para texto.' },
      { icon: '📸', title: 'Versátiles por diseño', description: 'La misma arquitectura básica (con variaciones) funciona para texto, imágenes, audio y video.' }
    ],
    examples: [
      'El reconocimiento de voz de Siri y Alexa usa redes neuronales para convertir audio en texto.',
      'ChatGPT está basado en una red neuronal transformer con miles de millones de parámetros.',
      'Los detectores de IA usan redes neuronales para clasificar si un texto es humano o de IA.',
      'Tesla Autopilot usa redes neuronales para interpretar imágenes de cámaras y tomar decisiones de conducción.'
    ],
    faqs: [
      { question: '¿Las redes neuronales artificiales funcionan como el cerebro humano?', answer: 'Están inspiradas en él, pero son muy diferentes. El cerebro tiene ~86 mil millones de neuronas con conexiones extremadamente complejas y mecanismos que aún no comprendemos completamente. Las redes neuronales artificiales son simplificaciones matemáticas que capturan algunos principios de aprendizaje, no réplicas del cerebro.' },
      { question: '¿Cuántos parámetros tiene GPT-4?', answer: 'OpenAI no ha revelado oficialmente el número, pero se estima en alrededor de 1 billón de parámetros. Cada parámetro es un número que puede ajustarse durante el entrenamiento. El número enorme de parámetros es lo que le da a GPT-4 su capacidad de generalización.' },
      { question: '¿Qué es el deep learning?', answer: 'Deep learning es el uso de redes neuronales con muchas capas (profundas) para aprender representaciones complejas de los datos. Es la tecnología que habilitó el salto cualitativo en IA de los últimos 10 años, especialmente para imágenes, audio y texto.' }
    ],
    relatedTerms: [
      { term: 'Aprendizaje Automático', slug: 'que-es-aprendizaje-automatico' },
      { term: 'LLM (Large Language Model)', slug: 'que-es-llm-large-language-model' },
      { term: 'Transformers (Arquitectura)', slug: 'que-es-transformers-arquitectura' }
    ],
    relatedTools: [
      { name: 'Detector de IA Gratis', url: '/?ref=glosario-red-neuronal' }
    ],
    cta: { text: 'Probar el detector de IA', url: '/?ref=glosario-red-neuronal' }
  },

  {
    slug: 'que-es-sesgo-ia',
    term: 'Sesgo en la IA (AI Bias)',
    keywords: ['que es sesgo ia', 'bias ia', 'sesgo inteligencia artificial', 'ia discriminacion', 'sesgo algoritmos ia'],
    title: '¿Qué es el Sesgo en la IA? AI Bias Explicado 2025',
    description: 'El sesgo en la IA ocurre cuando los modelos perpetúan discriminaciones presentes en los datos de entrenamiento. Aprende qué es, por qué importa y cómo afecta a los estudiantes.',
    h1: '¿Qué es el Sesgo en la IA? Por Qué los Algoritmos Discriminan',
    intro: 'Los sistemas de IA no son neutrales — heredan los sesgos de los datos con los que se entrenaron. Si los datos de entrenamiento reflejan desigualdades históricas, el modelo las reproducirá y amplificará. Esto tiene consecuencias reales en educación, contratación y justicia.',
    definition: 'El sesgo en la IA (AI bias) es la tendencia de los sistemas de inteligencia artificial a producir resultados sistemáticamente injustos, inexactos o discriminatorios debido a suposiciones sesgadas en el proceso de diseño, datos de entrenamiento no representativos, o la amplificación de desigualdades históricas presentes en los datos.',
    characteristics: [
      { icon: '📊', title: 'Origen en los datos de entrenamiento', description: 'Si el texto de entrenamiento de un LLM asocia ciertos términos con ciertos grupos de manera desigual, el modelo reproducirá esas asociaciones.' },
      { icon: '🔄', title: 'Amplificación de desigualdades', description: 'Los modelos no solo reproducen sesgos — los pueden amplificar al escalar el problema a millones de interacciones.' },
      { icon: '👁️', title: 'Difícil de detectar sin pruebas específicas', description: 'El sesgo en la IA puede ser invisible hasta que se prueban casos concretos con grupos diferentes.' },
      { icon: '⚖️', title: 'Consecuencias reales', description: 'Sistemas de contratación, crédito, reconocimiento facial y detección de IA pueden discriminar sin que nadie lo haya programado explícitamente.' }
    ],
    examples: [
      'Sistemas de reconocimiento facial con mayor tasa de error en personas de piel oscura debido a entrenamiento con datos predominantemente de personas blancas.',
      'LLMs que asocian ciertos trabajos con géneros específicos cuando se les pide describir profesionales.',
      'Detectores de IA con mayor tasa de falsos positivos en textos de escritores no nativos de inglés.'
    ],
    faqs: [
      { question: '¿Los detectores de IA tienen sesgo racial o lingüístico?', answer: 'Sí, se han documentado casos. Detectores entrenados principalmente en inglés tienen mayor tasa de falsos positivos con texto de hablantes no nativos de inglés, ya que su estilo puede parecerse estadísticamente al texto generado por IA. DetectordeIA.ai está específicamente entrenado en español para reducir este sesgo.' },
      { question: '¿Cómo puedo saber si la IA que uso tiene sesgo?', answer: 'Prueba con casos específicos de distintos grupos, géneros, regiones y lenguas. Observa si las respuestas son consistentes o varían según el grupo de referencia. Los investigadores usan técnicas como "auditorías algorítmicas" para detectar sesgos sistemáticos.' },
      { question: '¿Se puede eliminar el sesgo de la IA?', answer: 'No completamente — pero sí reducirse con datos de entrenamiento más diversos, técnicas de debiasing durante el entrenamiento, y auditorías regulares. Es un problema activo de investigación en IA responsable.' }
    ],
    relatedTerms: [
      { term: 'IA Responsable', slug: 'que-es-ia-responsable' },
      { term: 'Datos de Entrenamiento', slug: 'que-es-datos-entrenamiento' },
      { term: 'LLM (Large Language Model)', slug: 'que-es-llm-large-language-model' }
    ],
    relatedTools: [
      { name: 'Detector de IA en Español (optimizado para reducir sesgo)', url: '/?ref=glosario-sesgo-ia' }
    ],
    cta: { text: 'Probar el detector de IA en español', url: '/?ref=glosario-sesgo-ia' }
  },

  {
    slug: 'que-es-fine-tuning',
    term: 'Fine-Tuning (Ajuste Fino)',
    keywords: ['que es fine tuning ia', 'fine tuning llm', 'ajuste fino modelo ia', 'fine tuning chatgpt', 'fine tuning definicion'],
    title: '¿Qué es el Fine-Tuning en IA? Ajuste Fino Explicado 2025',
    description: 'El fine-tuning permite personalizar modelos de IA para tareas específicas. Aprende qué es, cómo funciona y cómo afecta a la detección de texto generado por IA.',
    h1: '¿Qué es el Fine-Tuning? Cómo se Especializan los Modelos de IA',
    intro: 'El fine-tuning (ajuste fino) es la técnica que permite tomar un modelo de IA general y especializarlo para una tarea específica sin entrenarlo desde cero. Es la razón por la que existen versiones de ChatGPT especializadas en código, medicina o servicio al cliente.',
    definition: 'El fine-tuning es un proceso de entrenamiento adicional de un modelo de IA pre-entrenado usando un dataset específico y más pequeño para adaptar el modelo a una tarea, dominio o estilo de respuesta particular. En lugar de entrenar desde cero (costoso y lento), el fine-tuning ajusta los parámetros existentes del modelo base con datos específicos.',
    characteristics: [
      { icon: '🎯', title: 'Especialización eficiente', description: 'Permite adaptar un modelo generalista a una tarea específica con mucho menos datos y cómputo que entrenar desde cero.' },
      { icon: '📚', title: 'Requiere datos etiquetados específicos', description: 'El fine-tuning necesita ejemplos del comportamiento deseado: pares de pregunta-respuesta, ejemplos de estilo, o texto en el dominio específico.' },
      { icon: '⚡', title: 'Preserva el conocimiento general', description: 'El modelo mantiene su conocimiento general del pre-entrenamiento mientras adquiere habilidades específicas.' },
      { icon: '🔧', title: 'Disponible en la API de OpenAI', description: 'OpenAI permite hacer fine-tuning de GPT-3.5 y GPT-4 con datos propios, lo que empresas usan para crear versiones personalizadas.' }
    ],
    examples: [
      'GitHub Copilot es GPT con fine-tuning específico en código de programación.',
      'ChatGPT fue ajustado con fine-tuning para ser más útil y seguro mediante RLHF.',
      'Los modelos médicos como Med-PaLM son LLMs con fine-tuning en literatura médica.',
      'Un detector de IA puede hacer fine-tuning para mejorar en un idioma específico como el español.'
    ],
    faqs: [
      { question: '¿El fine-tuning cambia cómo los detectores identifican el texto?', answer: 'Potencialmente sí. Un modelo con fine-tuning intensivo en un estilo específico puede producir texto con patrones diferentes al modelo base. Sin embargo, los patrones estadísticos fundamentales de los LLMs (baja perplejidad, uniformidad) tienden a persistir.' },
      { question: '¿Puedo hacer fine-tuning de ChatGPT para mi uso personal?', answer: 'A través de la API de OpenAI, sí. Tiene un coste económico por los recursos de cómputo. Para uso personal casual, no suele ser necesario — el modelo base de ChatGPT ya es muy versátil. Es más útil para empresas que necesitan comportamientos muy específicos y consistentes.' },
      { question: '¿Es lo mismo fine-tuning que prompt engineering?', answer: 'No. El prompt engineering cambia la instrucción que le das al modelo sin modificar sus parámetros. El fine-tuning modifica los parámetros del modelo mismo. El prompt engineering es más flexible y accesible; el fine-tuning produce cambios más profundos y consistentes.' }
    ],
    relatedTerms: [
      { term: 'LLM (Large Language Model)', slug: 'que-es-llm-large-language-model' },
      { term: 'Prompt Engineering', slug: 'que-es-prompt-engineering' },
      { term: 'Datos de Entrenamiento', slug: 'que-es-datos-entrenamiento' }
    ],
    relatedTools: [
      { name: 'Detector de IA Gratis', url: '/?ref=glosario-fine-tuning' }
    ],
    cta: { text: 'Probar el detector de IA', url: '/?ref=glosario-fine-tuning' }
  },

  {
    slug: 'que-es-rag-retrieval',
    term: 'RAG (Retrieval-Augmented Generation)',
    keywords: ['que es rag ia', 'retrieval augmented generation', 'rag llm', 'rag chatgpt', 'ia con fuentes externas'],
    title: '¿Qué es RAG (Retrieval-Augmented Generation)? Guía 2025',
    description: 'RAG permite a los LLMs acceder a información actualizada y citar fuentes reales. Aprende cómo funciona y por qué reduce las alucinaciones de la IA.',
    h1: '¿Qué es RAG? La Técnica que Hace a la IA Citar Fuentes Reales',
    intro: 'RAG (Retrieval-Augmented Generation) es la técnica que permite a un LLM buscar información en documentos externos antes de responder, en lugar de depender solo de lo que aprendió durante el entrenamiento. Es la base de herramientas como Perplexity AI y NotebookLM.',
    definition: 'RAG (Retrieval-Augmented Generation) es una arquitectura que combina un sistema de recuperación de información (que busca documentos relevantes en una base de datos) con un modelo de lenguaje generativo (que produce la respuesta final). El LLM recibe tanto la pregunta del usuario como los documentos recuperados, y genera una respuesta basada en esa información concreta.',
    characteristics: [
      { icon: '🔍', title: 'Recupera información antes de generar', description: 'En lugar de generar desde la memoria del modelo, RAG primero busca información relevante en documentos, páginas web o bases de datos.' },
      { icon: '📎', title: 'Permite citar fuentes reales', description: 'Como la respuesta se basa en documentos específicos, el sistema puede citar las fuentes exactas de donde tomó la información.' },
      { icon: '🔄', title: 'Reduce alucinaciones', description: 'Al basar las respuestas en documentos reales en lugar de memoria del modelo, RAG reduce (aunque no elimina) las alucinaciones.' },
      { icon: '⚡', title: 'Actualizable sin reentrenamiento', description: 'Para actualizar el conocimiento, solo hay que actualizar la base de documentos — no reentrenar el modelo completo.' }
    ],
    examples: [
      'Perplexity AI usa RAG para buscar en internet en tiempo real antes de responder.',
      'Google NotebookLM usa RAG con tus propios documentos como base de conocimiento.',
      'Los chatbots de empresas con documentación interna usan RAG para responder con información actualizada de la empresa.'
    ],
    faqs: [
      { question: '¿El texto generado con RAG es detectable como IA?', answer: 'Sí. RAG cambia qué información usa el modelo para responder, pero no cambia cómo el modelo genera texto. Los patrones estadísticos del LLM (baja perplejidad, uniformidad) persisten independientemente de si usó RAG o no.' },
      { question: '¿Por qué RAG reduce las alucinaciones?', answer: 'Porque el modelo genera la respuesta basándose en documentos concretos en lugar de en su memoria probabilística. Si la respuesta no está en los documentos recuperados, el sistema puede decir "no lo sé" en lugar de inventar.' },
      { question: '¿Perplexity AI usa RAG?', answer: 'Sí. Perplexity busca páginas web relevantes en tiempo real (recuperación) y luego usa un LLM para sintetizar la respuesta basándose en esos resultados (generación). Por eso puede citar fuentes actualizadas, a diferencia de ChatGPT estándar.' }
    ],
    relatedTerms: [
      { term: 'LLM (Large Language Model)', slug: 'que-es-llm-large-language-model' },
      { term: 'Alucinación de IA', slug: 'que-es-hallucination-ia' },
      { term: 'Perplexity AI', slug: 'que-es-perplexity-ai' }
    ],
    relatedTools: [
      { name: 'Detector de IA Gratis', url: '/?ref=glosario-rag' }
    ],
    cta: { text: 'Verificar si un texto fue generado por IA', url: '/?ref=glosario-rag' }
  },

  {
    slug: 'que-es-temperatura-ia',
    term: 'Temperatura en IA',
    keywords: ['temperatura ia', 'temperatura llm', 'temperatura chatgpt', 'que es temperatura modelo ia', 'temperature parameter ia'],
    title: '¿Qué es la Temperatura en los Modelos de IA? Guía 2025',
    description: 'La temperatura controla qué tan "creativo" o "predecible" es el texto de un modelo de IA. Aprende cómo funciona y cómo afecta a la detección de IA.',
    h1: '¿Qué es la Temperatura en la IA? El Parámetro que Controla la Creatividad',
    intro: 'Cuando usás la API de ChatGPT o cualquier LLM, hay un parámetro llamado "temperatura" que determina qué tan predecible o creativo es el output. Es uno de los factores que más afecta si el texto parece de IA o de humano.',
    definition: 'La temperatura es un parámetro de los modelos de lenguaje que controla la aleatoriedad de las predicciones de texto. Una temperatura baja (cercana a 0) hace al modelo predecible y conservador (siempre elige las palabras más probables). Una temperatura alta (cercana a 1 o más) hace al modelo más variado y "creativo" (introduce más aleatoriedad en la selección de palabras).',
    characteristics: [
      { icon: '🌡️', title: 'Escala de 0 a 2 (aproximadamente)', description: 'Temperatura 0: muy determinístico. Temperatura 0.7: balance entre coherencia y variedad. Temperatura 1.5+: muy variado, puede volverse incoherente.' },
      { icon: '🎯', title: 'Temperatura baja = más detectable como IA', description: 'Con temperatura baja, el modelo siempre elige las palabras más probables, produciendo texto muy uniforme y estadísticamente predecible — exactamente lo que detectan los detectores.' },
      { icon: '🔀', title: 'Temperatura alta = más variado pero posibles errores', description: 'Con temperatura alta, el modelo puede producir texto más creativo pero también más propenso a errores y contradicciones.' },
      { icon: '⚙️', title: 'Los usuarios de API pueden ajustarlo', description: 'A través de la API de OpenAI, Anthropic y otros, es posible ajustar la temperatura. ChatGPT consumer usa una temperatura fija predeterminada.' }
    ],
    examples: [
      'Temperatura 0.0: el modelo siempre da la misma respuesta al mismo prompt. Útil para tareas de extracción de datos.',
      'Temperatura 0.7: el default de ChatGPT. Balance entre coherencia y variedad natural.',
      'Temperatura 1.5: el modelo puede producir poesía creativa o texto muy variado pero también incoherencias.'
    ],
    faqs: [
      { question: '¿La temperatura afecta si el texto es detectable como IA?', answer: 'Sí, pero no lo suficiente para engañar a los detectores modernos. Temperatura más alta produce texto más variado, lo que puede reducir la señal de IA. Sin embargo, los patrones estadísticos fundamentales del LLM (distribución de vocabulario, estructura) persisten incluso con temperatura alta.' },
      { question: '¿Qué temperatura usa ChatGPT por defecto?', answer: 'OpenAI no lo publica oficialmente, pero se estima que ChatGPT consumer usa algo cercano a 0.7 para conversación general. Para la API, el default es 1.0.' },
      { question: '¿Los usuarios pueden cambiar la temperatura en ChatGPT?', answer: 'En ChatGPT consumer (web y app), no directamente. En la API de OpenAI sí. Algunos clientes de API de terceros exponen este parámetro al usuario.' }
    ],
    relatedTerms: [
      { term: 'LLM (Large Language Model)', slug: 'que-es-llm-large-language-model' },
      { term: 'Prompt Engineering', slug: 'que-es-prompt-engineering' },
      { term: 'Tokens en IA', slug: 'que-es-tokens-ia' }
    ],
    relatedTools: [
      { name: 'Detector de IA Gratis', url: '/?ref=glosario-temperatura-ia' }
    ],
    cta: { text: 'Verificar si un texto fue generado con IA', url: '/?ref=glosario-temperatura-ia' }
  },

  {
    slug: 'que-es-tokens-ia',
    term: 'Tokens en IA',
    keywords: ['que son tokens ia', 'tokens llm', 'tokens chatgpt', 'token ia definicion', 'como funcionan tokens ia'],
    title: '¿Qué son los Tokens en IA? Cómo los LLMs Procesan el Texto',
    description: 'Los tokens son las unidades básicas con las que los LLMs procesan el texto. Aprende qué son, cuántos hay en un texto típico y por qué afectan el coste de usar IA.',
    h1: '¿Qué son los Tokens en IA? Las Unidades que Procesan el Texto',
    intro: 'Cuando envías un texto a ChatGPT, no lo procesa palabra por palabra — lo procesa en tokens. Entender qué son los tokens te ayuda a entender los límites de los modelos, su coste y por qué algunos textos "caben" en una conversación y otros no.',
    definition: 'En el contexto de los modelos de lenguaje, un token es la unidad básica de texto que el modelo procesa. Los tokens pueden ser palabras completas, partes de palabras, signos de puntuación o espacios. En inglés, un token equivale aproximadamente a 4 caracteres o 0.75 palabras. En español, los tokens suelen ser ligeramente diferentes por la morfología del idioma.',
    characteristics: [
      { icon: '🔤', title: 'No equivalen a palabras exactamente', description: '"Universidad" puede ser 1-3 tokens dependiendo del tokenizador. "ChatGPT" puede ser 1-2 tokens. Las palabras raras o en idiomas con menos representación pueden fraccionarse en más tokens.' },
      { icon: '📏', title: 'Los modelos tienen límite de tokens', description: 'GPT-4 Turbo: 128,000 tokens de contexto (~96,000 palabras). GPT-3.5: 16,000 tokens. Claude 3: hasta 200,000 tokens.' },
      { icon: '💰', title: 'El coste de la API se mide en tokens', description: 'OpenAI cobra por millones de tokens procesados. El coste de tokens de entrada (tu prompt) y tokens de salida (la respuesta del modelo) pueden ser diferentes.' },
      { icon: '⚡', title: 'La "ventana de contexto" es el límite de tokens activos', description: 'La ventana de contexto es la cantidad de tokens que el modelo puede "recordar" en una conversación. Cuando se supera, el modelo pierde acceso a las partes más antiguas de la conversación.' }
    ],
    examples: [
      '"Hola mundo" ≈ 3 tokens. "Inteligencia artificial generativa" ≈ 5-7 tokens.',
      'Un ensayo de 1000 palabras en español ≈ 1,300-1,500 tokens.',
      'GPT-4 Turbo con 128K tokens puede procesar un libro de ~300 páginas en una sola conversación.'
    ],
    faqs: [
      { question: '¿Por qué importa conocer los tokens si solo uso ChatGPT gratis?', answer: 'Para el usuario casual de ChatGPT web, los tokens son transparentes. Importan más si usas la API (pagas por tokens), si trabajas con textos muy largos que pueden superar la ventana de contexto, o si desarrollas aplicaciones con IA.' },
      { question: '¿El idioma afecta cuántos tokens usa un texto?', answer: 'Sí. Los tokenizadores están optimizados principalmente para inglés. El español y otros idiomas con morfología más compleja tienden a usar más tokens para el mismo contenido semántico. Esto tiene implicaciones de coste y límite de contexto para usuarios hispanohablantes.' },
      { question: '¿Cómo saber cuántos tokens tiene mi texto?', answer: 'OpenAI tiene un tokenizador online (Tokenizer en platform.openai.com) que muestra exactamente cómo se tokeniza cualquier texto. También hay bibliotecas de Python (tiktoken) para calcularlo programáticamente.' }
    ],
    relatedTerms: [
      { term: 'LLM (Large Language Model)', slug: 'que-es-llm-large-language-model' },
      { term: 'Ventana de Contexto', slug: 'que-es-ventana-contexto-ia' },
      { term: 'Temperatura en IA', slug: 'que-es-temperatura-ia' }
    ],
    relatedTools: [
      { name: 'Detector de IA Gratis', url: '/?ref=glosario-tokens' }
    ],
    cta: { text: 'Verificar tu texto con el detector de IA', url: '/?ref=glosario-tokens' }
  },

  {
    slug: 'que-es-datos-entrenamiento',
    term: 'Datos de Entrenamiento',
    keywords: ['datos de entrenamiento ia', 'training data ia', 'como se entrena ia', 'datos entrenamiento llm', 'dataset ia'],
    title: '¿Qué son los Datos de Entrenamiento en IA? Guía 2025',
    description: 'Los datos de entrenamiento son la base de todo modelo de IA. Aprende qué son, de dónde vienen, y por qué determinan las capacidades y limitaciones de los LLMs.',
    h1: '¿Qué son los Datos de Entrenamiento en IA? La Base de Todo Modelo',
    intro: 'Los modelos de IA son tan buenos como los datos con los que se entrenaron. Los datos de entrenamiento determinan qué sabe la IA, qué sesgos tiene, hasta cuándo tiene información actualizada y en qué idiomas funciona bien. Entender esto es fundamental para usar la IA de forma crítica.',
    definition: 'Los datos de entrenamiento son el conjunto de información (texto, imágenes, código, audio u otros tipos según el modelo) con el que se entrena un sistema de IA. Para los LLMs como GPT-4 o Claude, los datos de entrenamiento son principalmente texto: páginas web, libros digitalizados, artículos académicos, código y otros corpus de texto. La calidad, diversidad y volumen de estos datos determina en gran medida las capacidades del modelo resultante.',
    characteristics: [
      { icon: '📚', title: 'Escala masiva para LLMs', description: 'GPT-4 se entrenó con billones de palabras de texto de internet, libros y otras fuentes. La escala de los datos es una de las razones del salto cualitativo en capacidades.' },
      { icon: '📅', title: 'Fecha de corte (knowledge cutoff)', description: 'Los datos de entrenamiento tienen una fecha de corte. ChatGPT no sabe nada de lo que ocurrió después de su fecha de corte — por eso puede dar información desactualizada.' },
      { icon: '⚖️', title: 'Determinan los sesgos del modelo', description: 'Si los datos sobrerepresentan ciertos grupos, idiomas o perspectivas, el modelo los sobrerepresenta también.' },
      { icon: '🔒', title: 'Fuente de controversia legal', description: 'El uso de texto con copyright para entrenar modelos está bajo litigio en varios países. Autores y periódicos han demandado a OpenAI y otros por este motivo.' }
    ],
    examples: [
      'Common Crawl: un snapshot de gran parte de internet, usado como base de entrenamiento por muchos LLMs.',
      'The Pile: dataset de código abierto con diversas fuentes académicas, libros y código.',
      'LAION: dataset masivo de imágenes y texto, base de modelos como Stable Diffusion.'
    ],
    faqs: [
      { question: '¿ChatGPT fue entrenado con mis conversaciones?', answer: 'Depende de la configuración. Por defecto, OpenAI puede usar conversaciones para mejorar el modelo, pero permite optar por no participar en la configuración de privacidad. Las conversaciones de pago (Plus, API) tienen mayor protección. Lee la política de privacidad de cada plataforma.' },
      { question: '¿Por qué ChatGPT no sabe sobre eventos recientes?', answer: 'Porque su conocimiento termina en la fecha de corte del entrenamiento. Lo que ocurrió después simplemente no está en sus datos. GPT-4o con acceso a internet (la versión con "búsqueda") puede acceder a información más reciente, pero usando RAG, no memoria del modelo.' },
      { question: '¿Los datos de entrenamiento incluyen textos académicos?', answer: 'Sí, en general. Muchos LLMs incluyen arXiv (preprints científicos), Wikipedia, y otros corpus académicos. Algunos modelos especializados (como Med-PaLM) se entrenan específicamente con literatura médica. Sin embargo, los artículos detrás de paywalls pueden no estar incluidos.' }
    ],
    relatedTerms: [
      { term: 'LLM (Large Language Model)', slug: 'que-es-llm-large-language-model' },
      { term: 'Sesgo en la IA', slug: 'que-es-sesgo-ia' },
      { term: 'Fine-Tuning', slug: 'que-es-fine-tuning' }
    ],
    relatedTools: [
      { name: 'Detector de IA Gratis', url: '/?ref=glosario-datos-entrenamiento' }
    ],
    cta: { text: 'Verificar si un texto fue generado por IA', url: '/?ref=glosario-datos-entrenamiento' }
  }
];
