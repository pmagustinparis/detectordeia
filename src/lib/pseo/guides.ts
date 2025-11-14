// Guías prácticas paso a paso (FASE 5 - BLOQUE B)
// Tutoriales tipo "Cómo hacer X" optimizados para SEO

export interface GuidePage {
  slug: string;
  title: string; // Título de la guía
  keywords: string[];
  metaTitle: string; // SEO title
  metaDescription: string; // Meta description
  h1: string;
  intro: string;
  overview: string; // Resumen de qué cubre la guía
  steps: Array<{
    number: number;
    title: string;
    description: string;
    tips?: string[]; // Tips opcionales para este paso
  }>;
  commonMistakes: Array<{
    mistake: string;
    solution: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  relatedGuides: Array<{
    title: string;
    slug: string;
  }>;
  relatedTools: Array<{
    name: string;
    url: string;
  }>;
  cta: {
    text: string;
    url: string;
  };
}

export const guides: GuidePage[] = [
  {
    slug: 'como-usar-ia-eticamente-universidad',
    title: 'Cómo Usar IA Éticamente en la Universidad',
    keywords: [
      'usar ia universidad',
      'chatgpt universidad etico',
      'como usar ia estudios',
      'uso etico ia educacion',
      'ia universidad permitido'
    ],
    metaTitle: 'Cómo Usar IA Éticamente en la Universidad: Guía Completa 2025',
    metaDescription: 'Guía paso a paso para usar ChatGPT y Claude éticamente en universidad. Qué está permitido, cómo citar IA, límites éticos. Para estudiantes universitarios.',
    h1: 'Cómo Usar IA Éticamente en la Universidad: Guía Paso a Paso',
    intro: '¿Puedes usar ChatGPT o Claude en tus trabajos universitarios? Depende de cómo los uses. Mayoría de universidades permiten IA como herramienta de apoyo (tutor, feedback, ideas) pero prohíben usarla para generar trabajos completos sin declarar. Esta guía paso a paso enseña límites éticos claros, cómo usar IA para aprender (no para hacer trampa), políticas comunes de universidades, y cómo declarar uso de IA correctamente.',
    overview: 'Esta guía cubre: (1) Verificar política de tu universidad, (2) Usos legítimos vs plagio, (3) Cómo pedir ayuda a IA sin plagiar, (4) Declaración y citación de uso de IA, (5) Qué hacer si tienes dudas.',
    steps: [
      {
        number: 1,
        title: 'Verifica la Política de IA de Tu Universidad',
        description: 'PRIMER PASO CRÍTICO: Antes de usar IA, consulta política específica de tu institución. Busca en: (1) Syllabus del curso (algunos profesores prohíben IA completamente), (2) Código de honor académico de tu universidad, (3) Sitio web de tu biblioteca/centro de escritura, (4) Pregunta directamente a tu profesor. Políticas varían enormemente: algunas universidades prohíben IA totalmente, otras permiten con declaración, otras dejan decisión a cada profesor.',
        tips: [
          'Si no encuentras política escrita, PREGUNTA al profesor antes de usar IA',
          'Guarda copia de la política (screenshot/PDF) como referencia',
          'Políticas cambian frecuentemente (2023-2025) - verifica cada semestre'
        ]
      },
      {
        number: 2,
        title: 'Entiende la Diferencia: Tutor vs Ghostwriter',
        description: 'USO ÉTICO (IA como tutor): Usas IA para ENTENDER conceptos, generar IDEAS que TÚ desarrollas, recibir FEEDBACK sobre TU trabajo, practicar ejercicios. TÚ haces el trabajo intelectual real. USO PROBLEMÁTICO (IA como ghostwriter): IA genera trabajo sustancial que entregas como tuyo sin declarar, copias texto de IA directamente, IA escribe ensayo/código y tú solo haces edición mínima. REGLA DE ORO: Si IA hiciera el trabajo y tú desaparecieras, ¿el resultado sería básicamente igual? Si sí = uso problemático.',
        tips: [
          'Pregúntate: "¿Estoy aprendiendo algo usando IA así?" Si no, probablemente es uso problemático',
          'Test: ¿Podrías explicar tu trabajo en detalle sin mirar notas? Si no, dependiste demasiado de IA'
        ]
      },
      {
        number: 3,
        title: 'Usa Prompts Éticos para Solicitar Ayuda',
        description: 'PROMPTS LEGÍTIMOS: "Explícame [concepto] con ejemplos simples", "Dame feedback sobre MI argumento: [tu argumento]", "Sugiere estructura para ensayo sobre X (no escribas el ensayo)", "Genera 5 problemas de práctica sobre Y", "¿Mi solución es correcta? Si no, explica mi error". PROMPTS PROBLEMÁTICOS: "Escribe mi ensayo sobre X", "Genera código completo para mi proyecto", "Reformula este trabajo para que pase detector de plagio". DIFERENCIA: Prompts éticos piden AYUDA PARA APRENDER, prompts problemáticos piden que IA HAGA EL TRABAJO.',
        tips: [
          'Agrega a prompts: "No escribas mi trabajo completo, solo ayúdame a entender"',
          'Pide explicaciones paso a paso en lugar de respuestas directas',
          'Usa IA para VERIFICAR tu trabajo, no para GENERAR tu trabajo'
        ]
      },
      {
        number: 4,
        title: 'Declara y Cita Uso de IA Apropiadamente',
        description: 'Si usaste IA significativamente (más que búsqueda Google), DECLARA cómo la usaste. MÉTODOS: (1) NOTA AL PIE/NOTA FINAL: "Usé ChatGPT (OpenAI, 2024) para [propósito específico: generar ideas iniciales sobre X, recibir feedback sobre estructura, verificar solución matemática]. Todo el texto final es mi escritura original." (2) SECCIÓN DECLARACIÓN: Algunos profesores piden sección "Uso de IA" al final. (3) CITACIÓN EN TEXTO: Si usaste idea específica de IA, cita: "Según ChatGPT (OpenAI, 2024), [idea]." REGLA: Cuando dudes si declarar, DECLARA. Sobre-declaración es mucho mejor que sub-declaración.',
        tips: [
          'Sé específico: No digas solo "usé ChatGPT", di "usé ChatGPT para generar 5 ideas iniciales sobre tema X"',
          'Guarda transcripción de conversación con IA como evidencia si profesor pregunta',
          'Formato APA: (OpenAI, 2024) para ChatGPT, (Anthropic, 2024) para Claude'
        ]
      },
      {
        number: 5,
        title: 'Mantén Evidencia de Tu Proceso de Trabajo',
        description: 'DOCUMENTA tu proceso para demostrar que trabajo es tuyo: (1) BORRADORES: Guarda versiones anteriores (Google Docs automáticamente muestra historial), (2) NOTAS: Screenshots de investigación, outline, brainstorming, (3) CONVERSACIONES IA: Copia transcripciones de ChatGPT/Claude que usaste, (4) FUENTES: Lista de artículos/libros que consultaste, (5) TIEMPO: Bitácora simple de cuándo trabajaste (ej: "15 de marzo: 2 horas investigación, outline inicial"). Si profesor sospecha plagio, esta evidencia demuestra tu proceso legítimo.',
        tips: [
          'Google Docs: File → Version History muestra cada edición con timestamp',
          'ChatGPT: Puedes compartir links de conversaciones (Settings → Data Controls)',
          'Toma screenshots de trabajo en progreso periódicamente'
        ]
      },
      {
        number: 6,
        title: 'Desarrolla Independencia Gradual',
        description: 'Objetivo final: usar IA como apoyo ocasional, no muleta constante. ESTRATEGIA: (1) PRIMERAS SEMANAS: Usa IA más frecuentemente para entender materia nueva, (2) MEDIADOS SEMESTRE: Reduce uso - intenta resolver problemas solo primero, usa IA solo cuando estás atascado, (3) ANTES EXÁMENES: Practica SIN IA (exámenes no permiten IA), (4) FIN SEMESTRE: Deberías poder hacer mayoría del trabajo sin IA. SEÑAL DE PROBLEMA: Si dependes de IA para cada tarea pequeña, no estás desarrollando habilidades que necesitas.',
        tips: [
          'Challenge: Intenta una tarea completamente sin IA, luego compara con resultado usando IA',
          'Usa IA para aprender patrones, luego aplica esos patrones tú mismo sin IA',
          'Recuerda: En examen presencial no tendrás IA - prepárate para eso'
        ]
      },
      {
        number: 7,
        title: 'Qué Hacer Cuando Tienes Dudas',
        description: 'Si no estás seguro si uso específico de IA es permitido: (1) PREGUNTA AL PROFESOR: Email simple: "Planeo usar ChatGPT para [propósito específico]. ¿Es esto permitido bajo política del curso?" (2) CONSULTA CENTRO DE ESCRITURA: Personal especializado en integridad académica puede orientarte, (3) APLICA "TEST DE TRANSPARENCIA": ¿Te sentirías cómodo diciéndole al profesor exactamente cómo usaste IA? Si no, probablemente está en zona gris, (4) REGLA CONSERVADORA: Si tienes duda seria, NO uses IA para esa tarea específica. Mejor prevenir que lamentar.',
        tips: [
          'Mayoría de profesores aprecian que preguntes - demuestra integridad',
          'Email al profesor también crea registro escrito de permiso',
          'Evita zona gris: Si no estás 80%+ seguro que está bien, pregunta primero'
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: 'Asumir que si curso no menciona IA, está permitida',
        solution: 'Ausencia de política NO = permiso. Muchas universidades tienen política general en código de honor aunque curso individual no la mencione. Siempre verifica política institucional.'
      },
      {
        mistake: 'Copiar texto de IA con "pequeños cambios" pensando que es suficiente',
        solution: 'Cambiar palabras pero mantener estructura de IA = plagio (patchwriting). Si usas ideas de IA, re-escribe COMPLETAMENTE con tus palabras + cita fuente (IA).'
      },
      {
        mistake: 'No declarar uso de IA porque "todos lo hacen"',
        solution: 'Que otros violen políticas no justifica que tú lo hagas. Si te atrapan, "otros también lo hacen" NO es defensa válida. Sigue reglas independientemente de lo que hagan compañeros.'
      },
      {
        mistake: 'Usar IA para exámenes take-home sin verificar si está permitido',
        solution: 'Exámenes (incluso take-home) generalmente prohíben IA a menos que explícitamente permitan. Pregunta antes del examen si IA está permitida.'
      },
      {
        mistake: 'Pensar que "humanizar" texto de IA con herramientas hace que sea ético',
        solution: 'Usar humanizadores para ocultar que usaste IA = violación de integridad académica. Humanizar NO convierte plagio en trabajo legítimo.'
      }
    ],
    faqs: [
      {
        question: '¿Es plagio usar ChatGPT si declaro que lo usé?',
        answer: 'DEPENDE de cómo lo usaste. DECLARAR USO es necesario pero NO suficiente. ESCENARIOS: (1) Usaste ChatGPT para explicaciones, luego escribiste TODO con tus palabras + declaraste uso = GENERALMENTE OK (verifica política). (2) ChatGPT generó 50% del texto, tú editaste + declaraste = PROBLEMÁTICO en mayoría de universidades (trabajo no es fundamentalmente tuyo). (3) ChatGPT escribió todo, tú copiaste + declaraste = PLAGIO (declarar no excusa copiar). REGLA: Declaración es parte de uso ético, pero no convierte trabajo de IA en trabajo tuyo.'
      },
      {
        question: '¿Qué hago si mi profesor prohíbe IA pero la necesito para entender materia?',
        answer: 'SOLUCIONES LEGÍTIMAS: (1) USA IA SOLO PARA APRENDER: Pide a IA explicar conceptos, generar ejemplos, pero NO para generar trabajo que entregas. (2) SOLICITA RECURSOS ALTERNATIVOS: Pide al profesor tutorías, materiales adicionales, videos educativos. (3) TUTORES HUMANOS: Centro de escritura, grupos de estudio, tutores pagados. (4) SI POLÍTICA ES "NO IA PARA GENERAR TRABAJO": Puedes usar IA como libro de texto (aprender) pero no como ghostwriter (generar entregas). Diferencia clave: usar IA para ENTENDER vs para PRODUCIR.'
      },
      {
        question: '¿Universidades pueden expulsarme por usar IA?',
        answer: 'SÍ, en casos graves. CONSECUENCIAS REALES: (1) PRIMERA OFENSA MENOR: Típicamente reprobar trabajo + advertencia. (2) OFENSA SUSTANCIAL: Reprobar curso + registro permanente en expediente. (3) PLAGIO GRAVE/REPETIDO: Suspensión temporal (1-2 semestres) o expulsión permanente. (4) CASOS DOCUMENTADOS: Universidades han expulsado estudiantes por uso no autorizado de IA en exámenes importantes. FACTORES QUE AGRAVAN: Mentir cuando confrontado, usar herramientas para ocultar uso de IA, infracción repetida. NO vale la pena arriesgar tu carrera universitaria.'
      },
      {
        question: '¿Cómo sé cuánta ayuda de IA es "demasiada"?',
        answer: 'TEST DE "CONTRIBUCIÓN SUSTANCIAL": Pregúntate: (1) ¿IA generó ideas/argumentos principales? (demasiado), (2) ¿IA escribió párrafos completos que usaste? (demasiado), (3) ¿IA solo explicó conceptos y TÚ desarrollaste ideas? (OK), (4) ¿IA dio feedback sobre TU borrador? (OK), (5) ¿IA resolvió problema y TÚ verificaste solución? (zona gris - depende de curso). REGLA 80/20: Si más de 20% del valor intelectual del trabajo vino de IA, probablemente es demasiado. MEJOR INDICADOR: ¿Aprendiste haciendo este trabajo? Si no, usaste IA incorrectamente.'
      },
      {
        question: '¿Debo decirle al profesor exactamente qué prompts usé?',
        answer: 'NO necesariamente prompts exactos, pero SÍ descripción clara de propósito. SUFICIENTE: "Usé ChatGPT para: (1) explicar concepto de X que no entendía del libro, (2) generar 5 ideas iniciales sobre tema (luego seleccioné y desarrollé 2 con mis palabras), (3) recibir feedback sobre estructura de mi outline." NO NECESARIO: Transcript completo o prompts palabra por palabra (a menos que profesor específicamente lo pida). EXCEPCIÓN: Guarda transcripts por si profesor pregunta - demuestra transparencia.'
      }
    ],
    relatedGuides: [
      { title: 'Cómo Citar Fuentes en Formato APA al Parafrasear', slug: 'como-citar-fuentes-apa-parafraseo' },
      { title: 'Cómo Evitar Plagio Académico', slug: 'como-evitar-plagio-academico' },
      { title: 'Mejores Prácticas de Uso de IA para Estudiantes', slug: 'mejores-practicas-uso-ia-estudiantes' }
    ],
    relatedTools: [
      { name: 'Detector de IA Gratis', url: '/?ref=guia-usar-ia-etico' },
      { name: 'Parafrasear Textos Sin Plagio', url: '/parafrasear-sin-plagio?ref=guia-usar-ia-etico' }
    ],
    cta: {
      text: 'Verificar si tu texto usa IA',
      url: '/?ref=guia-usar-ia-etico'
    }
  },

  {
    slug: 'como-citar-fuentes-apa-parafraseo',
    title: 'Cómo Citar Fuentes en Formato APA al Parafrasear',
    keywords: [
      'citar fuentes apa parafraseo',
      'como citar parafrasear apa',
      'formato apa parafrasear',
      'citacion apa parafraseo',
      'apa 7 parafrasear'
    ],
    metaTitle: 'Cómo Citar Fuentes APA al Parafrasear: Guía Completa 2025',
    metaDescription: 'Guía paso a paso de citación APA 7 para paráfrasis. Ejemplos prácticos, errores comunes, cuándo citar. Para estudiantes universitarios.',
    h1: 'Cómo Citar Fuentes en Formato APA al Parafrasear: Guía Paso a Paso',
    intro: 'Parafrasear sin citar la fuente = plagio, incluso si usas 100% tus propias palabras. Error más común de estudiantes: creen que cambiar palabras elimina necesidad de citar. Falso. En formato APA 7, TODA paráfrasis requiere citación porque las IDEAS son ajenas aunque palabras sean tuyas. Esta guía paso a paso enseña cómo citar correctamente paráfrasis en APA, cuándo citar, formato exacto para diferentes tipos de fuentes, y errores comunes que debes evitar.',
    overview: 'Esta guía cubre: (1) Por qué parafrasear requiere cita, (2) Formato básico APA para paráfrasis, (3) Variaciones según tipo de fuente, (4) Dónde colocar la cita en tu texto, (5) Cómo crear entrada de Referencias.',
    steps: [
      {
        number: 1,
        title: 'Entiende Por Qué Parafrasear Requiere Citación',
        description: 'CONCEPTO CLAVE: Citación NO es solo para palabras copiadas, es para IDEAS ajenas. Cuando parafraseas, cambias PALABRAS pero IDEAS siguen siendo del autor original. No citar = te apropias de ideas de otros = plagio. ANALOGÍA: Si alguien te explica solución a problema, luego tú explicas esa solución con tus palabras a otra persona, debes decir "Juan me explicó que...". Mismo principio en escritura académica. ÚNICA EXCEPCIÓN: "Conocimiento común" (ej: "La Tierra gira alrededor del Sol") no requiere cita, pero si aprendiste algo de una fuente específica, cita.',
        tips: [
          'Regla de oro: Si la idea no es tuya (la aprendiste leyendo), CITA',
          'Test: ¿Sabías esto antes de leer la fuente? Si no, necesitas citar',
          'Conocimiento común varía por disciplina - cuando dudes, CITA'
        ]
      },
      {
        number: 2,
        title: 'Aprende el Formato Básico APA 7 para Paráfrasis',
        description: 'FORMATO ESTÁNDAR: Texto parafraseado con tus palabras (Apellido, Año). COMPONENTES: (1) APELLIDO: Apellido del autor (sin nombre de pila), (2) AÑO: Año de publicación, (3) PARÉNTESIS: Siempre entre paréntesis si cita está al final de oración. EJEMPLOS: "La inteligencia artificial transforma educación universitaria (García, 2024)." O: "García (2024) argumenta que inteligencia artificial transforma educación universitaria." DIFERENCIA con cita textual: NO uses comillas, NO necesitas número de página (opcional), SÍ cambias todas las palabras.',
        tips: [
          'Apellido solo (no "Dr. García" o "María García"), solo "García"',
          'Año es año de PUBLICACIÓN, no año actual',
          'Si apellido está en la oración, año va en paréntesis: García (2024)'
        ]
      },
      {
        number: 3,
        title: 'Maneja Variaciones Comunes de Autores',
        description: 'DOS AUTORES: (Apellido1 & Apellido2, Año). Ejemplo: "La IA requiere regulación ética (Smith & Jones, 2023)." TRES+ AUTORES: (Apellido1 et al., Año). Ejemplo: "Estudios muestran efectividad de detectores (García et al., 2024)." Nota: "et al." = "y otros" en latín, siempre con punto. SIN AUTOR: ("Título del artículo", Año). Ejemplo: ("Políticas de IA en universidades", 2024). ORGANIZACIÓN COMO AUTOR: (Nombre Organización, Año). Ejemplo: (UNESCO, 2023).',
        tips: [
          'En lista Referencias, lista TODOS autores; en texto usa "et al." para 3+',
          'Primera mención de organización: (Organización de Naciones Unidas [ONU], 2023), después: (ONU, 2023)',
          'Usa "&" dentro de paréntesis, usa "y" fuera: "Smith y Jones (2023) argumentan..." vs "(Smith & Jones, 2023)"'
        ]
      },
      {
        number: 4,
        title: 'Decide Dónde Colocar la Citación',
        description: 'OPCIÓN 1 - CITA AL FINAL: Texto parafraseado completo (Autor, Año). Usa cuando parafraseas una oración. OPCIÓN 2 - AUTOR EN TEXTO: Autor (Año) argumenta que texto parafraseado. Usa cuando quieres enfatizar autoridad del autor. OPCIÓN 3 - MÚLTIPLES ORACIONES: Si parafraseas párrafo completo de misma fuente, cita al inicio: "Según García (2024), [paráfrasis de 3-4 oraciones]." o cita cada oración si es más claro. REGLA: Lector debe saber exactamente qué texto viene de qué fuente - cuando hay ambigüedad, agrega citas adicionales.',
        tips: [
          'Para párrafo largo de una fuente, menciona autor al inicio + cita completa al final',
          'Si mezclas ideas de múltiples fuentes en un párrafo, cita cada idea por separado',
          'Evita citar cada oración si todo viene de misma fuente - suena repetitivo'
        ]
      },
      {
        number: 5,
        title: 'Agrega Número de Página (Opcional pero Recomendado)',
        description: 'APA 7 NO requiere página para paráfrasis, pero es BUENA PRÁCTICA especialmente para: (1) Textos largos (libros, tesis) donde ayuda a lector localizar info, (2) Paráfrasis de datos/estadísticas específicas, (3) Cuando parafraseas sección específica. FORMATO: (Autor, Año, p. X) para una página, (Autor, Año, pp. X-Y) para rango. EJEMPLO: "Estudios muestran que 85% de universidades usan Turnitin (García, 2024, p. 47)." ARTÍCULOS WEB SIN PÁGINAS: Usa número de párrafo si está numerado: (Autor, Año, párr. 4).',
        tips: [
          '"p." = una página, "pp." = múltiples páginas (con punto después de cada p)',
          'Para fuentes web sin páginas, número de párrafo es opcional',
          'Cuando dudes si agregar página, agrégala - ayuda al lector y demuestra precisión'
        ]
      },
      {
        number: 6,
        title: 'Cita Fuentes Electrónicas y Casos Especiales',
        description: 'ARTÍCULO WEB SIN AUTOR: ("Título del artículo", Año). FUENTE SIN FECHA: (Autor, s.f.) donde "s.f." = sin fecha. COMUNICACIÓN PERSONAL (email, entrevista): NO va en Referencias, solo cita en texto: (J. Smith, comunicación personal, 15 de marzo, 2024). IA (ChatGPT, Claude): (OpenAI, 2024) para ChatGPT, (Anthropic, 2024) para Claude + incluye prompt en apéndice. REDES SOCIALES: (Usuario [@handle], Año). Ejemplo: (@unesco, 2024).',
        tips: [
          'Comunicaciones personales NO van en lista Referencias (no son recuperables por lectores)',
          'Para IA, algunos profesores requieren URL de conversación (si disponible)',
          'Redes sociales: Si usuario tiene nombre real, úsalo: (Smith [@jsmith], 2024)'
        ]
      },
      {
        number: 7,
        title: 'Crea la Entrada en la Lista de Referencias',
        description: 'TODA cita en texto requiere entrada completa en Referencias al final. FORMATO LIBRO: Apellido, I. (Año). Título del libro en cursiva. Editorial. FORMATO ARTÍCULO JOURNAL: Apellido, I. (Año). Título del artículo. Título del Journal en Cursiva, Volumen(Número), páginas. https://doi.org/xx FORMATO WEB: Apellido, I. (Año, Mes Día). Título. Nombre del Sitio. URL. ORDEN: Alfabético por apellido autor. SANGRÍA: Primera línea al margen, líneas siguientes sangradas (hanging indent).',
        tips: [
          'Referencias va en página separada con título "Referencias" centrado',
          'Hanging indent: Primera línea al margen, resto sangrado (0.5 pulgadas)',
          'DOI preferido sobre URL si disponible (DOI es permanente)',
          'Usa herramientas: Zotero, Mendeley, CitationMachine generan Referencias automáticamente'
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: 'Parafrasear sin citar porque "usé mis propias palabras"',
        solution: 'Usar tus palabras NO elimina necesidad de citar. Las IDEAS son ajenas. SIEMPRE cita paráfrasis excepto conocimiento común universalmente aceptado.'
      },
      {
        mistake: 'Citar solo al final del párrafo cuando parafraseas múltiples fuentes',
        solution: 'Si párrafo incluye ideas de 3 fuentes diferentes, cita cada idea por separado. Lector debe saber qué idea viene de qué fuente.'
      },
      {
        mistake: 'Usar formato incorrecto: (Autor, pág. 23, 2024) en lugar de (Autor, 2024, p. 23)',
        solution: 'Orden APA: Apellido, Año, página. NO uses "pág." (español), usa "p." (abreviación APA estándar en inglés, aceptada en español).'
      },
      {
        mistake: 'Omitir entrada en Referencias porque "solo es una paráfrasis"',
        solution: 'TODA cita en texto (paráfrasis o textual) requiere entrada completa en Referencias. Sin excepción (excepto comunicaciones personales).'
      },
      {
        mistake: 'Citar página incorrecta o inventar número de página',
        solution: 'Si incluyes página, verifica que es correcta. Inventar página = deshonestidad académica. Si no tienes página (ej: artículo web), omítela.'
      }
    ],
    faqs: [
      {
        question: '¿Cuándo NO necesito citar al parafrasear?',
        answer: 'ÚNICA EXCEPCIÓN: Conocimiento común. EJEMPLOS DE CONOCIMIENTO COMÚN: "La Tierra gira alrededor del Sol", "El agua hierve a 100°C", "Segunda Guerra Mundial terminó en 1945", "ADN significa ácido desoxirribonucleico". CRITERIOS: (1) Info es ampliamente conocida por público general, (2) Está documentada en múltiples fuentes generales, (3) No es disputada por expertos. ADVERTENCIA: Conocimiento común varía por disciplina - lo que es común en física puede no serlo en general. REGLA SEGURA: Si aprendiste algo específico leyendo una fuente, CITA aunque parezca básico.'
      },
      {
        question: '¿Qué pasa si parafraseo múltiples oraciones de la misma fuente?',
        answer: 'OPCIONES: (1) CITA AL INICIO + AL FINAL: "García (2024) explica que [3 oraciones parafraseadas] (p. 45)." - Deja claro que todo el segmento es de García. (2) CITA CADA ORACIÓN: Solo si quieres enfatizar o si hay riesgo de ambigüedad. (3) NO CITES CADA ORACIÓN si es obvio todo viene de misma fuente (suena repetitivo). CLAVE: Lector nunca debe dudar qué texto es tuyo vs de fuente. Si hay ambigüedad, agrega citas.'
      },
      {
        question: '¿Cómo cito si parafraseo idea de un autor citado por otro autor?',
        answer: 'CITA SECUNDARIA (cuando no leíste fuente original): Formato: Autor Original (citado en Autor que Leíste, Año). EJEMPLO: "Smith argumenta que IA transformará educación (citado en García, 2024)." REFERENCIAS: Solo incluyes García (fuente que leíste), NO Smith. MEJOR PRÁCTICA: Intenta leer fuente original cuando posible. Citas secundarias están OK ocasionalmente pero exceso sugiere investigación superficial.'
      },
      {
        question: '¿Cómo cito ChatGPT/Claude cuando parafraseo sus ideas?',
        answer: 'FORMATO EN TEXTO: Texto parafraseado (OpenAI, 2024) para ChatGPT o (Anthropic, 2024) para Claude. REFERENCIAS: OpenAI. (2024). ChatGPT (versión del [fecha]) [Modelo de lenguaje de gran escala]. https://chat.openai.com/. ADICIONAL: Incluye prompt completo en apéndice. EJEMPLO: "Según ChatGPT, detectores de IA tienen limitaciones de precisión (OpenAI, 2024; ver Apéndice A para prompt)." IMPORTANTE: Verifica política de tu profesor - algunos requieren formato específico para IA.'
      },
      {
        question: '¿Puedo parafrasear sin citar si combino ideas de múltiples fuentes?',
        answer: 'NO. Combinar ideas de múltiples fuentes (síntesis) AÚN requiere citar TODAS las fuentes. FORMATO: (Autor1, Año; Autor2, Año; Autor3, Año). EJEMPLO: "Estudios muestran que detectores de IA tienen precisión variable entre 85-95% (García, 2024; Jones, 2023; Smith, 2024)." ALTERNATIVA: Paráfrasis + análisis tuyo: "Varios estudios documentan limitaciones de detectores (García, 2024; Jones, 2023). Sin embargo, mi análisis sugiere [tu idea original sin cita]." Diferencia entre síntesis (ideas ajenas) vs tu análisis (idea tuya).'
      }
    ],
    relatedGuides: [
      { title: 'Cómo Usar IA Éticamente en la Universidad', slug: 'como-usar-ia-eticamente-universidad' },
      { title: 'Cómo Evitar Plagio Académico', slug: 'como-evitar-plagio-academico' },
      { title: 'Cómo Verificar Originalidad de un Texto', slug: 'como-verificar-originalidad-texto' }
    ],
    relatedTools: [
      { name: 'Parafrasear Textos Sin Plagio', url: '/parafrasear-sin-plagio?ref=guia-citar-apa' },
      { name: 'Detector de IA Gratis', url: '/?ref=guia-citar-apa' }
    ],
    cta: {
      text: 'Parafrasear textos correctamente',
      url: '/parafrasear-textos-online-gratis?ref=guia-citar-apa'
    }
  },

  {
    slug: 'como-evitar-plagio-academico',
    title: 'Cómo Evitar Plagio Académico',
    keywords: [
      'como evitar plagio academico',
      'evitar plagio universidad',
      'prevenir plagio academico',
      'como no plagiar',
      'estrategias evitar plagio'
    ],
    metaTitle: 'Cómo Evitar Plagio Académico: 10 Estrategias Efectivas 2025',
    metaDescription: 'Guía completa con 10 estrategias para evitar plagio académico. Prevención, mejores prácticas, herramientas. Para estudiantes universitarios.',
    h1: 'Cómo Evitar Plagio Académico: Guía Completa y Estrategias',
    intro: 'Plagio académico es la falta más grave en universidades, con consecuencias que van desde reprobar trabajos hasta expulsión permanente. Mayoría de estudiantes que plagian NO lo hacen intencionalmente - simplemente desconocen normas de citación o cometen errores de gestión de fuentes. Esta guía paso a paso enseña 10 estrategias concretas para prevenir plagio (intencional o accidental), mejores prácticas de investigación, herramientas útiles, y cómo gestionar fuentes correctamente desde inicio del proceso de escritura.',
    overview: 'Esta guía cubre: (1) Planificación desde inicio para evitar plagio, (2) Toma de notas correcta, (3) Gestión de fuentes, (4) Cuándo parafrasear vs citar textualmente, (5) Herramientas de verificación.',
    steps: [
      {
        number: 1,
        title: 'Planifica con Tiempo Suficiente',
        description: 'PROBLEMA RAÍZ: Mayoría de plagio ocurre por presión de tiempo. Estudiante espera hasta último momento, entra en pánico, copia para cumplir deadline. SOLUCIÓN: Inicia trabajo 2-3 semanas antes de fecha límite. CRONOGRAMA SUGERIDO: Semana 1: Investigación + outline (30%), Semana 2: Primer borrador completo (60%), Semana 3: Revisión + edición + verificación (100%). Con tiempo suficiente, puedes investigar correctamente, tomar notas organizadas, escribir sin presión. BENEFICIO ADICIONAL: Mejor calidad de trabajo, menos estrés, tiempo para pedir feedback.',
        tips: [
          'Crea calendario inverso: fecha límite → trabaja hacia atrás asignando tareas',
          'Buffer de 2 días antes de deadline para imprevistos',
          'Divide trabajo en tareas pequeñas diarias (más manejable)'
        ]
      },
      {
        number: 2,
        title: 'Toma Notas Distinguiendo Tus Ideas vs Ideas de Fuentes',
        description: 'ERROR COMÚN: Copias párrafos de fuentes en tus notas sin marcar que son citas. Días después, no recuerdas qué es tuyo vs qué copiaste → copias "tus notas" al ensayo → plagio accidental. SISTEMA DE 3 COLORES: (1) NEGRO: Citas textuales con comillas + fuente, (2) AZUL: Paráfrasis con fuente, (3) VERDE: Tus ideas/análisis. ALTERNATIVA: Usa símbolos consistentes. [CITA] para textual, [PARA] para paráfrasis, [MIO] para tus ideas. CLAVE: NUNCA copies texto sin marcarlo inmediatamente como cita.',
        tips: [
          'Software: Evernote, Notion, OneNote permiten tags/colores para organizar notas',
          'Anota SIEMPRE fuente completa inmediatamente (no "buscar después")',
          'Si copias oración textual para recordarla, pon comillas INMEDIATAMENTE'
        ]
      },
      {
        number: 3,
        title: 'Usa Gestor de Referencias desde el Inicio',
        description: 'HERRAMIENTAS: Zotero (gratis, open source), Mendeley (gratis), EndNote (pago, institucional). BENEFICIOS: (1) Guarda info completa de cada fuente automáticamente, (2) Genera citas/bibliografía en formato APA/MLA con 1 click, (3) Organiza PDFs + notas, (4) Previene error de olvidar fuente. FLUJO DE TRABAJO: Encuentras artículo útil → Agregas a Zotero (extensión browser) → Zotero guarda TODO (autores, año, DOI, PDF) → Al escribir, insertas cita con plugin → Al final, generas Referencias automáticamente. TIEMPO AHORRADO: Horas de formatear citas manualmente.',
        tips: [
          'Instala extensión browser de Zotero - agrega fuentes con 1 click',
          'Agrega fuentes MIENTRAS investigas, no al final',
          'Sincroniza entre dispositivos para acceder desde cualquier lugar'
        ]
      },
      {
        number: 4,
        title: 'Escribe Borrador Inicial Sin Ver Fuentes',
        description: 'TÉCNICA ANTI-PLAGIO: Después de investigar, CIERRA todas las fuentes. Escribe borrador usando solo: (1) Tu outline, (2) Tus notas organizadas, (3) Tu memoria de lo que aprendiste. Escribe con TUS palabras naturales como se lo explicarías a amigo. LUEGO, en segunda pasada, agregas citas específicas consultando fuentes. BENEFICIO: Imposible copiar accidentalmente estructura/frases de fuentes si no las estás viendo. Resultado es genuinamente tu voz, tu estructura, tus palabras. EXCEPCIÓN: Está bien consultar fuente para verificar dato específico o agregar cita textual.',
        tips: [
          'Usa placeholder para citas: "Según [AUTOR], IA transforma educación" - llenas después',
          'Si necesitas dato específico, búscalo, úsalo, cierra fuente inmediatamente',
          'Este método también mejora retención - escribir de memoria refuerza aprendizaje'
        ]
      },
      {
        number: 5,
        title: 'Aprende Cuándo Parafrasear vs Citar Textualmente',
        description: 'USA CITA TEXTUAL (comillas) cuando: (1) Definición técnica precisa, (2) Frase memorable/poderosa del autor, (3) Autoridad reconocida haciendo afirmación importante, (4) Quieres analizar lenguaje específico del autor. USA PARÁFRASIS cuando: (1) Idea es importante pero redacción no es especial, (2) Quieres integrar múltiples fuentes fluidamente, (3) Necesitas simplificar/adaptar nivel técnico. EVITA: Ensayo lleno de citas textuales (40%+ del texto) - demuestra poca síntesis propia. BALANCE IDEAL: 10-15% citas textuales, 25-35% paráfrasis, 50-60% tu análisis/argumento original.',
        tips: [
          'Test: Si redacción original es lo importante, cita textual; si idea es lo importante, parafrasea',
          'Máximo 2-3 citas textuales por página de ensayo',
          'Después de cada cita/paráfrasis, agrega TU análisis - no dejes cita sola'
        ]
      },
      {
        number: 6,
        title: 'Parafrasea Correctamente (No Solo Cambies Sinónimos)',
        description: 'PLAGIO COMÚN: "Paráfrasis" que solo cambia palabras pero copia estructura = patchwriting = plagio. MÉTODO CORRECTO DE PARÁFRASIS: (1) Lee fuente 2-3 veces hasta entender completamente, (2) CIERRA la fuente (no la veas), (3) Espera 5 minutos (toma café, camina), (4) Escribe idea con TUS palabras como se la explicarías a amigo, (5) Compara con original - ¿estructura es diferente? (6) Si estructuras son paralelas, re-escribe sin ver original, (7) Agrega cita: (Autor, Año). VERIFICACIÓN: Lee tu paráfrasis y original lado a lado - si orden de ideas/longitud de oraciones son idénticos, es plagio.',
        tips: [
          'Nunca mires fuente MIENTRAS parafraseas - solo antes y después',
          'Cambia voz activa/pasiva, divide/combina oraciones, reordena ideas',
          'Test: ¿Suena como TU forma de hablar? Si suena formal/artificial, probablemente copiaste estructura'
        ]
      },
      {
        number: 7,
        title: 'Cita MIENTRAS Escribes (No al Final)',
        description: 'ERROR FATAL: Escribir todo el ensayo, LUEGO intentar recordar qué ideas vinieron de dónde → olvidas citar fuentes → plagio accidental. MÉTODO CORRECTO: Inserta citas INMEDIATAMENTE cuando usas idea de fuente. Flujo: Escribes oración basada en fuente → Inmediatamente agregas (Autor, Año) → Continúas escribiendo. Si usas gestor referencias (Zotero), insertas cita con plugin mientras escribes. BENEFICIO: Imposible olvidar citar, proceso más rápido (no revisa todo al final), menos estrés. PLACEHOLDER: Si no recuerdas autor exacto, usa [CITA PENDIENTE] y búscalo inmediatamente después.',
        tips: [
          'Nunca digas "agregaré citas al final" - agrégalas AHORA',
          'Si usas idea de fuente sin citar inmediatamente, resalta en amarillo hasta que agregues cita',
          'Revisa que cada párrafo con ideas de fuentes tiene al menos 1 cita'
        ]
      },
      {
        number: 8,
        title: 'Usa Detectores de Plagio ANTES de Entregar',
        description: 'HERRAMIENTAS GRATUITAS: DetectorDeIA.com (detecta IA + plagio), Turnitin (si tu universidad da acceso previo), Duplichecker, Quetext (límites gratuitos). PROCESO: (1) Copia tu ensayo final, (2) Pega en detector, (3) Revisa qué partes marca como similares, (4) Verifica que similitudes son: citas correctas con comillas, terminología técnica estándar, tu bibliografía. (5) Si detector marca paráfrasis como similar, re-escribe con más variación. ADVERTENCIA: Detectores NO son perfectos - úsalos como verificación adicional, no única defensa.',
        tips: [
          'Usa 2-3 detectores diferentes - si todos muestran problemas, definitivamente revisa',
          'No intentes "engañar" detector cambiando letras por caracteres - profesores lo detectan',
          'Si detector marca citas correctas, no te preocupes - profesor verá que están citadas'
        ]
      },
      {
        number: 9,
        title: 'Pide Feedback de Compañero o Centro de Escritura',
        description: 'OJOS FRESCOS: Otra persona puede detectar problemas que tú no ves. OPCIONES: (1) CENTRO DE ESCRITURA: Mayoría de universidades tienen tutores gratis que revisan borradores, señalan áreas con citación insuficiente. (2) COMPAÑERO DE CLASE: Intercambian borradores, revisan mutuamente. (3) PROFESOR: Muchos profesores permiten enviar borrador para feedback preliminar. QUÉ PEDIR: "¿Hay secciones donde no queda claro si idea es mía o de fuente? ¿Necesito más citas?" BENEFICIO: Detectar plagio accidental ANTES de entrega = sin consecuencias.',
        tips: [
          'Centro de escritura NO escribirá tu ensayo, pero señalarán problemas de citación',
          'Al intercambiar con compañero, ambos aprenden de errores del otro',
          'Programa cita con centro escritura 1 semana antes de deadline (se llenan rápido)'
        ]
      },
      {
        number: 10,
        title: 'Cuando Dudes, CITA (Mejor Sobre-Citar que Sub-Citar)',
        description: 'REGLA DE ORO: Si tienes CUALQUIER duda sobre si necesitas citar, CITA. Sobre-citación NO es problema (muestra rigurosidad), sub-citación = plagio. CASOS DE DUDA COMUNES: (1) Idea muy básica pero la aprendiste de fuente específica → CITA, (2) Paráfrasis de oración simple → CITA, (3) Dato que parece común pero no estás seguro → CITA, (4) Idea que combina múltiples fuentes → CITA TODAS. EXCEPCIÓN: Conocimiento verdaderamente común (ej: "La Tierra es redonda") no requiere cita, pero si lo viste en fuente específica, cita.',
        tips: [
          'Profesores NUNCA penalizan por citar demasiado (muestra honestidad)',
          'Profesores SÍ penalizan duramente por citar muy poco',
          'Test: Si no sabías esto antes de investigar, probablemente necesitas citar'
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: 'Copiar "solo un párrafo" de fuente sin citar pensando que es poco',
        solution: 'Incluso 1 oración copiada sin citar es plagio. No existe "cantidad mínima segura". SIEMPRE cita cualquier texto/idea de fuente.'
      },
      {
        mistake: 'Poner bibliografía al final pero no citar en el texto',
        solution: 'Bibliografía sola NO previene plagio. Necesitas citas EN EL TEXTO (Autor, Año) para cada idea de fuente + bibliografía completa al final.'
      },
      {
        mistake: 'Usar traductor para "parafrasear" texto de otro idioma',
        solution: 'Traducir texto ajeno sin citar = plagio (plagias ideas/estructura). Si traduces, debes: (1) Parafrasear correctamente DESPUÉS de traducir, (2) Citar fuente original.'
      },
      {
        mistake: 'Confiar 100% en detector de plagio ("0% similitud = no hay plagio")',
        solution: 'Detectores NO detectan todo (especialmente patchwriting, plagio de libros físicos). 0% similitud NO garantiza ausencia de plagio. Usa detectores como herramienta auxiliar, no única verificación.'
      },
      {
        mistake: 'Reutilizar trabajo propio de otra clase sin permiso (auto-plagio)',
        solution: 'Entregar mismo trabajo en dos clases = auto-plagio (falta académica). Si quieres reutilizar ideas previas: (1) Pide permiso a ambos profesores, (2) Cita tu trabajo previo como fuente.'
      }
    ],
    faqs: [
      {
        question: '¿Qué hago si accidentalmente plagié en trabajo ya entregado?',
        answer: 'ACCIÓN INMEDIATA: (1) Evalúa gravedad: ¿Olvidaste citar 1 fuente o copiaste secciones grandes? (2) SI ES MENOR (1-2 fuentes olvidadas): Email a profesor: "Revisando mi trabajo noté que omití citar [fuente]. Adjunto versión corregida con cita. Fue error no intencional." (3) SI ES GRAVE: Consulta con asesor académico antes de contactar profesor. (4) SÉ HONESTO: Admitir error es mejor que profesor descubra después. PREVENCIÓN: Siempre revisa con detectores ANTES de entregar.'
      },
      {
        question: '¿Tengo que citar información que encontré en Wikipedia?',
        answer: 'IMPORTANTE: NO uses Wikipedia como fuente directa en trabajos universitarios (no es fuente académica revisada por pares). PROCESO CORRECTO: (1) Lee Wikipedia para entender tema básico, (2) Ve a sección "Referencias" de Wikipedia, (3) Busca fuentes originales citadas en Wikipedia, (4) Lee fuentes originales (journals, libros), (5) Cita fuentes originales, NO Wikipedia. EXCEPCIÓN: Si profesor permite Wikipedia explícitamente, cítala: ("Título artículo", s.f.) y en Referencias: Título artículo. (s.f.). En Wikipedia. URL'
      },
      {
        question: '¿Está bien parafrasear múltiples fuentes en el mismo párrafo?',
        answer: 'SÍ, es síntesis (habilidad académica valiosa). CLAVE: Debes citar TODAS las fuentes. FORMATO: (1) OPCIÓN A: Cita cada idea por separado: "Idea 1 (García, 2024). Idea 2 (Smith, 2023)." (2) OPCIÓN B: Lista autores al final si todas apoyan misma idea: "Esta idea está bien documentada (García, 2024; Smith, 2023; Jones, 2022)." (3) AGREGA TU ANÁLISIS: No solo lista ideas de otros, sintetiza + agrega tu perspectiva.'
      },
      {
        question: '¿Puedo usar frases comunes sin citar (ej: "estudios muestran", "es importante")?',
        answer: 'FRASES GENERALES sin contenido específico NO requieren cita: "estudios muestran", "es importante", "en conclusión". PERO: Si dices "estudios muestran que 85% de universidades...", necesitas citar los estudios específicos. REGLA: Frases estructurales/transicionales = OK sin cita. Afirmaciones factuales/ideas = requieren cita. EJEMPLO SIN CITA: "Es importante considerar múltiples perspectivas." EJEMPLO CON CITA: "Es importante considerar múltiples perspectivas (García, 2024 argumenta esto)."'
      },
      {
        question: '¿Qué pasa si dos fuentes dicen lo mismo? ¿Cito ambas?',
        answer: 'OPCIONES: (1) CITA AMBAS si ambas son importantes para tu argumento: "IA transforma educación (García, 2024; Smith, 2023)." (2) CITA SOLO MÁS RELEVANTE/RECIENTE si no hay diferencia significativa entre fuentes. (3) SINTETIZA: "Múltiples estudios documentan transformación de educación por IA (García, 2024; Smith, 2023; Jones, 2022)." BENEFICIO de citar múltiples: Demuestra que leíste ampliamente, refuerza tu argumento (consenso académico).'
      }
    ],
    relatedGuides: [
      { title: 'Cómo Usar IA Éticamente en la Universidad', slug: 'como-usar-ia-eticamente-universidad' },
      { title: 'Cómo Citar Fuentes en Formato APA al Parafrasear', slug: 'como-citar-fuentes-apa-parafraseo' },
      { title: 'Cómo Escribir Ensayos Originales', slug: 'como-escribir-ensayos-originales' }
    ],
    relatedTools: [
      { name: 'Detector de IA Gratis', url: '/?ref=guia-evitar-plagio' },
      { name: 'Parafrasear Sin Plagio', url: '/parafrasear-sin-plagio?ref=guia-evitar-plagio' }
    ],
    cta: {
      text: 'Verificar originalidad de texto',
      url: '/?ref=guia-evitar-plagio'
    }
  },

  {
    slug: 'como-escribir-ensayos-originales',
    title: 'Cómo Escribir Ensayos Originales',
    keywords: [
      'como escribir ensayos originales',
      'escribir ensayos sin plagiar',
      'originalidad ensayos academicos',
      'como escribir original',
      'tecnicas escritura original'
    ],
    metaTitle: 'Cómo Escribir Ensayos Originales Sin Plagiar: Guía 2025',
    metaDescription: 'Aprende a escribir ensayos 100% originales. Proceso paso a paso, técnicas de investigación, desarrollo de voz propia. Para estudiantes universitarios.',
    h1: 'Cómo Escribir Ensayos Originales: Guía Paso a Paso',
    intro: 'Escribir ensayo verdaderamente original NO significa inventar ideas de la nada (investigación académica se construye sobre trabajo previo). Significa: (1) Sintetizar fuentes de forma única, (2) Agregar tu análisis/perspectiva distintiva, (3) Desarrollar tu voz académica, (4) Citar correctamente todas las fuentes. Esta guía paso a paso enseña proceso completo desde brainstorming hasta ensayo final original, técnicas para desarrollar ideas propias, cómo integrar fuentes sin copiar, y métodos para encontrar tu voz académica única.',
    overview: 'Esta guía cubre: (1) Brainstorming y desarrollo de tesis original, (2) Investigación estratégica, (3) Outline que prioriza tu análisis, (4) Escritura con voz propia, (5) Integración ética de fuentes.',
    steps: [
      {
        number: 1,
        title: 'Genera Ideas Propias ANTES de Investigar en Profundidad',
        description: 'PROCESO: (1) Lee prompt/pregunta del ensayo, (2) ANTES de investigar exhaustivamente, escribe 10-15 minutos de brainstorming: ¿Qué SÉ ya sobre este tema? ¿Qué PIENSO? ¿Qué preguntas TENGO? (3) Desarrolla tesis preliminar basada en tu pensamiento inicial, (4) LUEGO investiga para: refinar tu argumento, encontrar evidencia que apoye/desafíe tus ideas, descubrir perspectivas que no consideraste. BENEFICIO: Empezar con TUS ideas previene que simplemente regurgites lo que leyste. Tu ensayo tiene dirección propia desde inicio.',
        tips: [
          'Técnica: Freewriting - escribe sin parar 10 min sobre el tema sin auto-censura',
          'Pregúntate: "Si tuviera que argumentar posición sobre X sin leer nada, ¿qué diría?"',
          'Guarda este brainstorming inicial - compáralo con ensayo final para ver tu crecimiento'
        ]
      },
      {
        number: 2,
        title: 'Desarrolla Tesis Específica y Argumentable',
        description: 'TESIS DÉBIL (genérica): "La IA tiene impacto en educación." TESIS FUERTE (específica, argumentable): "Aunque IA ofrece beneficios de personalización, su adopción sin regulación ética en universidades amenaza desarrollo de pensamiento crítico en estudiantes." CARACTERÍSTICAS DE BUENA TESIS: (1) ESPECÍFICA: No vaga, hace afirmación concreta. (2) ARGUMENTABLE: Alguien podría estar en desacuerdo razonablemente. (3) RESPONDE "¿Y QUÉ?": Explica por qué tu argumento importa. (4) GUÍA TODO EL ENSAYO: Cada párrafo apoya tu tesis. DESARROLLO: Escribe 3-5 versiones de tesis, refina hasta que sea clara y específica.',
        tips: [
          'Test: ¿Alguien podría argumentar lo opuesto? Si no, tu tesis es hecho, no argumento',
          'Evita: "En este ensayo discutiré..." - no anuncies, simplemente argumenta',
          'Tesis puede evolucionar mientras escribes - ajústala según tu pensamiento se desarrolla'
        ]
      },
      {
        number: 3,
        title: 'Crea Outline que Prioriza TU Análisis, No Resumen de Fuentes',
        description: 'ESTRUCTURA DÉBIL: Párrafo 1: García dice X. Párrafo 2: Smith dice Y. Párrafo 3: Jones dice Z. = Resumen de fuentes, no TU ensayo. ESTRUCTURA FUERTE: Cada párrafo desarrolla UN punto de TU argumento, usa fuentes como EVIDENCIA. FORMATO: Punto principal (tu idea) → Evidencia de fuente 1 (cita/paráfrasis) → TU análisis de por qué esa evidencia apoya tu punto → Evidencia de fuente 2 → TU análisis conectando ambas evidencias → TU conclusión del punto. RATIO: Por cada oración de fuente, 2-3 oraciones de TU análisis.',
        tips: [
          'Outline: No pongas "García argumenta X", pon "Mi punto 1: X [apoyo: García]"',
          'Test: ¿Puedes eliminar nombres de autores y ensayo sigue siendo coherente? Si sí, es TU argumento',
          'Después de cada cita/paráfrasis pregúntate: "¿Por qué incluyo esto? ¿Qué demuestra?"'
        ]
      },
      {
        number: 4,
        title: 'Escribe en Bloques Enfocándote en TUS Ideas Primero',
        description: 'MÉTODO: En lugar de escribir lineal (intro→cuerpo→conclusión), escribe en bloques: (1) Escribe párrafos de CUERPO primero (tu argumentación principal), (2) Para cada párrafo: Escribe TU punto en tus palabras naturales ANTES de consultar fuentes, (3) LUEGO agrega evidencia de fuentes que apoya tu punto, (4) Escribe intro y conclusión AL FINAL (cuando sabes exactamente qué argumentaste). BENEFICIO: Ensayo se construye alrededor de TUS ideas, fuentes sirven a TU argumento (no al revés). Resultado es genuinamente original.',
        tips: [
          'Trabaja en documento separado para cada sección mayor - combinas al final',
          'Si te atascas en una sección, sáltala - escribe otra sección primero',
          'Primer borrador: Enfócate en desarrollar ideas, no en gramática perfecta'
        ]
      },
      {
        number: 5,
        title: 'Desarrolla Tu Voz Académica Distintiva',
        description: 'VOZ ACADÉMICA NO significa "sonar inteligente" con palabras complejas. Significa: claridad, precisión, confianza en tus argumentos. COMPONENTES: (1) USA "YO" CUANDO APROPIADO: "Argumento que...", "Mi análisis sugiere..." (algunas disciplinas prefieren tercera persona - verifica). (2) SÉ DIRECTO: "X ocurre porque Y" en lugar de "Parece posible que X podría potencialmente ocurrir debido a Y". (3) TOMA POSICIÓN: "Esta evidencia demuestra X" en lugar de "Esta evidencia quizás sugiere X". (4) USA EJEMPLOS ESPECÍFICOS: Casos concretos en lugar de generalizaciones vagas.',
        tips: [
          'Lee tu ensayo en voz alta - si suena natural (como TÚ hablando), es tu voz',
          'Evita: "Es importante destacar", "Cabe mencionar" (suenan como IA/escritura artificial)',
          'Vocabulario: Usa palabra más simple que comunique idea claramente (no la más compleja)'
        ]
      },
      {
        number: 6,
        title: 'Integra Fuentes Como Conversación, No Lista',
        description: 'INTEGRACIÓN DÉBIL: "García dice X. Pero Smith dice Y. Y Jones dice Z." INTEGRACIÓN FUERTE: "García (2024) argumenta X. Sin embargo, esta perspectiva no considera Y [tu punto], como demuestra Smith (2023). Además, análisis de Jones (2022) revela que ambas posiciones comparten Z [tu síntesis]." TÉCNICAS: (1) USA VERBOS VARIADOS: "argumenta", "demuestra", "sugiere", "cuestiona", "refuta". (2) SINTETIZA: Conecta fuentes entre sí, no las presentes aisladas. (3) CRÍTICA: No todas las fuentes son perfectas - señala limitaciones cuando relevante.',
        tips: [
          'Después de mencionar fuente, SIEMPRE agrega tu interpretación/análisis',
          'Conecta fuentes: "Mientras García argumenta X, Smith sugiere Y alternativo..."',
          'No uses fuente para decir algo obvio - usa fuentes para reforzar puntos complejos/controvertidos'
        ]
      },
      {
        number: 7,
        title: 'Agrega Ejemplos Personales o Experiencias (Cuando Apropiado)',
        description: 'APLICABILIDAD: Depende de disciplina. Humanidades, educación, ciencias sociales frecuentemente permiten ejemplos personales. STEM generalmente no. CÓMO USAR: (1) Como ILUSTRACIÓN de punto teórico: "Este fenómeno se observa incluso en contextos cotidianos. En mi clase de X, noté Y..." (2) Como MOTIVACIÓN en intro: "Mi experiencia con Z motivó esta investigación." (3) NO como EVIDENCIA PRINCIPAL: Anécdotas complementan argumentos basados en fuentes, no los reemplazan. BENEFICIO: Ejemplos personales son inherentemente originales, agregan autenticidad.',
        tips: [
          'Pregunta a profesor si ejemplos personales son apropiados para tu disciplina',
          'Balance: Máximo 1-2 anécdotas breves en ensayo típico (no dominen el texto)',
          'Conecta experiencia personal con literatura: "Mi observación refleja hallazgos de García (2024)"'
        ]
      },
      {
        number: 8,
        title: 'Revisa Priorizando Fortaleza de Argumentos, No Solo Gramática',
        description: 'RONDAS DE REVISIÓN MÚLTIPLES: (1) RONDA 1 - ARGUMENTOS: ¿Cada párrafo apoya tesis? ¿Transiciones lógicas? ¿Evidencia suficiente? ¿Tu análisis es claro? (2) RONDA 2 - ORIGINALIDAD: ¿Suena como TU voz? ¿Ratio fuentes:análisis es 1:2 o mejor? ¿Evitaste resumen vs análisis? (3) RONDA 3 - CLARIDAD: ¿Cada oración es clara? ¿Eliminar jerga innecesaria? (4) RONDA 4 - GRAMÁTICA: Errores, typos, formato. DESCANSO: Deja ensayo 1-2 días entre escritura y revisión - ves errores con ojos frescos.',
        tips: [
          'Imprime ensayo y revisa en papel - detectas más errores que en pantalla',
          'Lee en voz alta - tropiezos al leer = oraciones poco claras',
          'Pide a amigo leer solo tu tesis + conclusiones - ¿Coinciden? Si no, desalineamiento'
        ]
      },
      {
        number: 9,
        title: 'Verifica Que Cada Párrafo Tiene "PIE" (Punto-Info-Evaluación)',
        description: 'ESTRUCTURA PIE PARA ORIGINALIDAD: (1) P - PUNTO: Tu afirmación/argumento (oración temática). (2) I - INFORMACIÓN: Evidencia de fuentes que apoya tu punto (citas/paráfrasis). (3) E - EVALUACIÓN: TU análisis de por qué esa evidencia importa, qué demuestra, cómo se conecta con tesis. VERIFICACIÓN: Lee cada párrafo - si solo tiene P+I sin E, agregas E. Si solo tiene I (resumen de fuentes) sin P ni E, re-escribe para centrar en tu argumento. E debe ser 50%+ del párrafo.',
        tips: [
          'Color-codifica: P en verde, I en azul, E en amarillo - visualmente verificas balance',
          'E común: "Esto sugiere que...", "Por lo tanto...", "Esta evidencia demuestra..."',
          'Test: Elimina todas las I (fuentes) - ¿Argumento sigue siendo coherente? Si sí, es TU ensayo'
        ]
      },
      {
        number: 10,
        title: 'Escribe Conclusión Que Muestra Por Qué Tu Análisis Importa',
        description: 'CONCLUSIÓN DÉBIL: Resumen de lo que ya dijiste. "En este ensayo discutí X, Y, Z." CONCLUSIÓN FUERTE: (1) Reafirma tesis (pero con palabras diferentes, no copia-pega), (2) Sintetiza cómo tus puntos se conectan, (3) Responde "¿Y QUÉ?": ¿Por qué tu argumento importa? ¿Qué implica para campo/sociedad? (4) Deja lector con idea para considerar (pregunta abierta, implicación futura). NO INCLUYAS: Nueva evidencia/citas (van en cuerpo), disculpas ("este ensayo no es perfecto..."), afirmaciones grandiosas no respaldadas.',
        tips: [
          'Conclusión es tu última oportunidad de persuadir - hazla memorable',
          'Técnica: Vuelve a ejemplo/pregunta de intro - cierra el círculo',
          'Longitud: Típicamente 1 párrafo, máximo 10% del ensayo total'
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: 'Investigar excesivamente antes de desarrollar tus propias ideas',
        solution: 'Invertir el proceso: Desarrolla tus ideas primero (brainstorming, tesis preliminar), LUEGO investiga para refinar/apoyar tus argumentos. Previene que solo regurgites lo que leíste.'
      },
      {
        mistake: 'Estructurar ensayo como "reporte de libro" (resumen de cada fuente)',
        solution: 'Estructura alrededor de TUS argumentos. Cada párrafo = un punto TUYO, fuentes son evidencia que apoyan TU punto. Ratio: 1 parte fuentes, 2 partes tu análisis.'
      },
      {
        mistake: 'Usar vocabulario complejo innecesariamente para "sonar académico"',
        solution: 'Claridad > complejidad. Usa palabra más simple que comunica idea efectivamente. Vocabulario rebuscado oscurece argumentos, no los fortalece.'
      },
      {
        mistake: 'Terminar cada párrafo con cita de fuente',
        solution: 'SIEMPRE termina párrafo con TU análisis/conclusión del punto. Cita/paráfrasis van en MEDIO del párrafo, tu interpretación cierra el párrafo.'
      },
      {
        mistake: 'Escribir intro y conclusión primero',
        solution: 'Escribe cuerpo primero (tu argumentación), intro y conclusión AL FINAL cuando sabes exactamente qué argumentaste. Intro/conclusión más precisas y coherentes.'
      }
    ],
    faqs: [
      {
        question: '¿Cómo sé si mi ensayo es "suficientemente original"?',
        answer: 'TESTS DE ORIGINALIDAD: (1) TEST ELIMINACIÓN: Elimina nombres de autores/citas - ¿Argumento sigue siendo coherente? Si sí, es original (tu argumento no depende de solo repetir fuentes). (2) TEST RATIO: Cuenta oraciones con ideas de fuentes vs tu análisis. Ratio debe ser mínimo 1:2 (1 fuente, 2 tuyas). (3) TEST VOZ: Lee en voz alta - ¿Suena como TÚ hablando? Si suena artificial/genérico, necesitas más tu voz. (4) TEST PREGUNTA: ¿Dices algo que NO está en tus fuentes? Tu síntesis/conclusiones deben ir más allá de lo que cualquier fuente individual dice.'
      },
      {
        question: '¿Es posible escribir ensayo 100% original sin usar fuentes?',
        answer: 'EN UNIVERSIDAD: NO. Escritura académica requiere investigación - construyes sobre conocimiento existente. PERO: Tu CONTRIBUCIÓN debe ser original: (1) Tu TESIS específica, (2) Tu SÍNTESIS de múltiples fuentes, (3) Tu ANÁLISIS de evidencia, (4) Tus CONEXIONES entre ideas. ANALOGÍA: Construyes casa (original) con ladrillos existentes (fuentes). Casa es tuya aunque ladrillos no lo sean. EXCEPCIÓN: Ensayos reflexivos/personales pueden ser 100% tu experiencia, pero incluso estos frecuentemente incluyen alguna referencia teórica.'
      },
      {
        question: '¿Qué hago si todas mis fuentes dicen lo mismo?',
        answer: 'SEÑAL DE PROBLEMA: Investigación muy limitada o tema demasiado consensuado. SOLUCIONES: (1) BUSCA PERSPECTIVAS CONTRARIAS: Usa términos como "[tema] criticisms", "[tema] limitations", "[tema] counterarguments". (2) EXPANDE BÚSQUEDA: Diferentes disciplinas (ej: perspectiva psicológica vs sociológica del mismo tema). (3) ANALIZA POR QUÉ HAY CONSENSO: "Mientras todos los autores concuerdan en X, ninguno considera implicación Y [tu contribución]". (4) APLICA A CONTEXTO NUEVO: "Aunque literatura establece X en contexto A, aplicación a contexto B revela Z [tu análisis]".'
      },
      {
        question: '¿Puedo usar IA (ChatGPT) para ayudar a generar ideas originales?',
        answer: 'DEPENDE de política de tu profesor. SI ESTÁ PERMITIDO: USA IA PARA BRAINSTORMING INICIAL, no para escribir ensayo. PROCESO ÉTICO: (1) Pide a IA generar 10 ángulos sobre tema, (2) TÚ seleccionas 2-3 más interesantes, (3) TÚ desarrollas esos ángulos completamente con tus palabras, (4) Declaras uso de IA en nota. ADVERTENCIA: Ideas de IA son genéricas - úsalas como punto de partida, no como tu argumento. MEJOR: Genera ideas tú mismo primero, LUEGO usa IA para ver qué ángulos no consideraste.'
      },
      {
        question: '¿Cómo desarrollo mi "voz académica" si soy estudiante de primer año?',
        answer: 'DESARROLLO DE VOZ (requiere práctica): (1) LEE MUCHO en tu disciplina - absorbes patrones de escritura académica. (2) IMITA CONSCIENTEMENTE: Encuentra artículo bien escrito, analiza cómo estructura argumentos, luego aplica esa estructura (NO palabras) a tu tema. (3) ESCRIBE REGULARMENTE: Más escribes, más natural se vuelve tu voz. (4) PIDE FEEDBACK: Pregunta a profesor "¿Mi voz es apropiadamente académica?" (5) ACEPTA EVOLUCIÓN: Voz de primer año es diferente de tercer año - normal que cambie. NO HAGAS: Usar thesaurus para complicar cada palabra - claridad > complejidad.'
      }
    ],
    relatedGuides: [
      { title: 'Cómo Evitar Plagio Académico', slug: 'como-evitar-plagio-academico' },
      { title: 'Cómo Mejorar Escritura Académica', slug: 'como-mejorar-escritura-academica' },
      { title: 'Cómo Usar IA Éticamente en la Universidad', slug: 'como-usar-ia-eticamente-universidad' }
    ],
    relatedTools: [
      { name: 'Detector de IA Gratis', url: '/?ref=guia-ensayos-originales' },
      { name: 'Parafrasear Textos Online', url: '/parafrasear-textos-online-gratis?ref=guia-ensayos-originales' }
    ],
    cta: {
      text: 'Verificar originalidad de ensayo',
      url: '/?ref=guia-ensayos-originales'
    }
  },

  {
    slug: 'como-mejorar-escritura-academica',
    title: 'Cómo Mejorar Escritura Académica',
    keywords: [
      'como mejorar escritura academica',
      'mejorar redaccion universitaria',
      'escritura academica efectiva',
      'como escribir mejor academicamente',
      'tecnicas escritura academica'
    ],
    metaTitle: 'Cómo Mejorar Escritura Académica: 10 Técnicas Efectivas 2025',
    metaDescription: 'Aprende a mejorar tu escritura académica. 10 técnicas probadas, estructura clara, estilo profesional. Para estudiantes universitarios.',
    h1: 'Cómo Mejorar Escritura Académica: Guía Completa',
    intro: 'Escritura académica efectiva NO es habilidad innata - se desarrolla con práctica deliberada y técnicas específicas. Diferencia entre estudiantes con notas altas vs bajas frecuentemente NO es inteligencia, sino claridad y organización de escritura. Esta guía paso a paso enseña 10 técnicas concretas para mejorar escritura académica: estructura de argumentos, claridad de oraciones, uso de evidencia, transiciones efectivas, revisión estratégica. Aplicable a ensayos, reportes de laboratorio, tesis, papers de investigación.',
    overview: 'Esta guía cubre: (1) Estructura clara de argumentos, (2) Escritura de oraciones concisas, (3) Uso efectivo de evidencia, (4) Transiciones lógicas, (5) Proceso de revisión riguroso.',
    steps: [
      {
        number: 1,
        title: 'Escribe Oraciones Temáticas Claras para Cada Párrafo',
        description: 'ORACIÓN TEMÁTICA: Primera oración del párrafo que anuncia idea principal del párrafo. FUNCIÓN: Lector debe saber de qué trata párrafo leyendo solo primera oración. FORMATO: "Punto principal específico que este párrafo argumentará." MALA ORACIÓN TEMÁTICA: "Hay muchas cosas que considerar." (vaga). BUENA ORACIÓN TEMÁTICA: "Adopción de IA en universidades sin regulación ética amenaza desarrollo de pensamiento crítico en tres formas." (específica, promete desarrollo). VERIFICACIÓN: Lee solo primeras oraciones de todos tus párrafos - deberían formar outline coherente de tu argumento.',
        tips: [
          'Oración temática debe conectar con tesis - lector ve cómo párrafo apoya argumento general',
          'Evita iniciar párrafos con citas/ejemplos - empieza con TU punto, LUEGO evidencia',
          'Test: ¿Esta oración responde a pregunta "De qué trata este párrafo?" claramente?'
        ]
      },
      {
        number: 2,
        title: 'Usa Estructura PEEL para Cada Párrafo',
        description: 'PEEL = Point-Evidence-Explanation-Link. ESTRUCTURA: (1) POINT (2-3 oraciones): Tu argumento/afirmación principal del párrafo. (2) EVIDENCE (2-3 oraciones): Citas, paráfrasis, datos, ejemplos que apoyan tu punto. (3) EXPLANATION (4-5 oraciones): TU análisis detallado - por qué evidencia apoya tu punto, qué significa, implicaciones. (4) LINK (1 oración): Conecta párrafo con tesis general o transición a siguiente punto. RATIO: Explanation debe ser sección más larga (50%+ del párrafo). ERROR COMÚN: Párrafos con solo P+E sin Explanation = resumen, no análisis.',
        tips: [
          'Color-codifica tu borrador: P en verde, E en azul, Ex en amarillo, L en naranja - verifica balance visual',
          'Si párrafo tiene más E que Ex, necesitas agregar más de TU análisis',
          'Link puede anticipar siguiente punto: "Esta limitación revela necesidad de examinar X..."'
        ]
      },
      {
        number: 3,
        title: 'Elimina "Muletillas Académicas" Innecesarias',
        description: 'MULETILLAS: Frases que ocupan espacio sin agregar significado. ELIMINA: "Es importante notar que", "Cabe mencionar que", "En mi opinión personal", "Básicamente", "Realmente", "Muy", "Un poco". EJEMPLO DÉBIL: "Es importante mencionar que la IA realmente está transformando la educación de una manera muy significativa." (18 palabras). EJEMPLO FUERTE: "IA transforma la educación significativamente." (5 palabras, mismo significado). REGLA: Cada palabra debe ganar su lugar - si puedes eliminar palabra sin cambiar significado, elimínala.',
        tips: [
          'Busca en tu documento: Ctrl+F "es importante", "cabe mencionar", "realmente" - elimina',
          'Elimina "muy", "bastante", "algo" - reemplaza con palabra más precisa',
          'Antes: "muy grande" → Después: "masivo". Antes: "muy pequeño" → Después: "minúsculo"'
        ]
      },
      {
        number: 4,
        title: 'Convierte Oraciones Pasivas en Activas (Cuando Apropiado)',
        description: 'VOZ PASIVA: "La encuesta fue conducida por los investigadores." (acción antes de actor). VOZ ACTIVA: "Los investigadores condujeron la encuesta." (actor antes de acción - más directa, clara). BENEFICIO VOZ ACTIVA: Más concisa, más clara, más dinámica. CUÁNDO USAR PASIVA: (1) Actor es desconocido/irrelevante: "Se observó un aumento de temperatura", (2) Quieres enfatizar acción/objeto: "Los datos fueron analizados con SPSS." VERIFICACIÓN: Busca "fue", "fueron", "es", "son" + participio - considera si activa es más clara.',
        tips: [
          'Test: ¿Quién hace la acción? Si es importante, ponlo al inicio (activa)',
          'Ciencias naturales frecuentemente usan pasiva ("Se midió X") - verifica normas de tu disciplina',
          'Balance: No 100% activa ni 100% pasiva - variedad según énfasis'
        ]
      },
      {
        number: 5,
        title: 'Usa Conectores y Transiciones Efectivas',
        description: 'TRANSICIONES: Palabras/frases que conectan ideas entre oraciones y entre párrafos. FUNCIONES: (1) AGREGAR: "Además", "Asimismo", "Por otra parte". (2) CONTRASTAR: "Sin embargo", "No obstante", "Por el contrario". (3) CAUSA/EFECTO: "Por lo tanto", "Como resultado", "Consecuentemente". (4) SECUENCIA: "Primero", "Posteriormente", "Finalmente". (5) EJEMPLO: "Por ejemplo", "Específicamente", "Para ilustrar". SIN TRANSICIONES: Ensayo suena como lista desconectada. CON TRANSICIONES: Argumento fluye lógicamente de idea a idea.',
        tips: [
          'Lee ensayo - ¿Saltos abruptos entre ideas? Agrega transiciones',
          'Varía conectores - no uses "además" 10 veces, alterna: "asimismo", "igualmente"',
          'Transiciones entre párrafos: Última oración de párrafo puede anticipar siguiente tema'
        ]
      },
      {
        number: 6,
        title: 'Integra Evidencia con Verbos de Señalización Variados',
        description: 'VERBOS DE SEÑALIZACIÓN: Introducen citas/paráfrasis. DÉBIL: "García dice que..." (repetido 10 veces). FUERTE: Varía verbos según función. PARA AFIRMAR: "argumenta", "sostiene", "afirma", "demuestra". PARA SUGERIR: "sugiere", "propone", "plantea", "indica". PARA CUESTIONAR: "cuestiona", "refuta", "critica", "desafía". PARA EVIDENCIA: "documenta", "observa", "reporta", "encuentra". TIEMPO VERBAL: APA 7 recomienda pasado para estudios específicos ("García encontró"), presente para consenso ("Investigadores argumentan").',
        tips: [
          'Lista de verbos útiles: argumenta, demuestra, sugiere, plantea, cuestiona, refuta, observa, analiza, examina, revela, señala, sostiene',
          'No uses "menciona" o "habla sobre" - muy débiles, no muestran tipo de argumento',
          'Verbo debe reflejar precisamente lo que autor hace - "refuta" si refuta, "sugiere" si sugiere'
        ]
      },
      {
        number: 7,
        title: 'Escribe Párrafos con Longitud Apropiada (5-8 Oraciones)',
        description: 'PÁRRAFO MUY CORTO (1-2 oraciones): No desarrolla idea completamente, parece lista. PÁRRAFO MUY LARGO (15+ oraciones): Lector se pierde, probablemente contiene múltiples ideas que deberían ser párrafos separados. LONGITUD IDEAL: 5-8 oraciones, 100-200 palabras. ESTRUCTURA: Oración temática + evidencia + análisis extenso + conclusión/transición. VERIFICACIÓN: Si párrafo tiene más de 10 oraciones, busca dónde puedes dividir (probablemente introduces segunda idea a mitad del párrafo).',
        tips: [
          'Divide párrafos largos buscando palabras como "además", "asimismo" - frecuentemente señalan inicio de nueva idea',
          'Combina párrafos muy cortos si desarrollan misma idea',
          'Variación visual ayuda: Alterna párrafos de 5-6 oraciones con alguno de 8-9'
        ]
      },
      {
        number: 8,
        title: 'Revisa Específicamente para Claridad (No Solo Gramática)',
        description: 'PROCESO DE REVISIÓN EN CAPAS: (1) RONDA 1 - ARGUMENTOS: ¿Lógica es clara? ¿Evidencia apoya puntos? (2) RONDA 2 - PÁRRAFOS: ¿Cada párrafo tiene oración temática clara + estructura PEEL? (3) RONDA 3 - ORACIONES: ¿Cada oración es clara? Elimina palabras innecesarias. (4) RONDA 4 - GRAMÁTICA: Typos, puntuación, formato. TÉCNICA: Lee cada oración aislada (cubre oraciones antes/después) - ¿Oración es clara por sí sola? CLARIDAD TEST: ¿Amigo no especialista puede entender tu argumento general?',
        tips: [
          'Deja 24-48 horas entre escritura y revisión - detectas más problemas con mente fresca',
          'Lee en voz alta - tropiezos al leer = oraciones que necesitan re-escribirse',
          'Imprime y revisa en papel - detectas diferentes errores que en pantalla'
        ]
      },
      {
        number: 9,
        title: 'Usa Ejemplos Específicos en Lugar de Generalizaciones',
        description: 'GENERALIZACIÓN DÉBIL: "La tecnología afecta a la sociedad de muchas formas." (vaga, sin substancia). EJEMPLO ESPECÍFICO FUERTE: "Adopción de smartphones transformó comunicación interpersonal: 85% de conversaciones entre amigos jóvenes ahora ocurren vía mensajes de texto en lugar de llamadas (García, 2024)." (concreto, dato preciso, citado). BENEFICIO: Ejemplos específicos son más persuasivos, memorables, demuestran investigación profunda. TIPOS DE EJEMPLOS: Estudios de caso, estadísticas precisas, citas expertas, eventos históricos concretos.',
        tips: [
          'Reemplaza "muchos", "varios", "algunos" con números precisos cuando posible',
          'En lugar de "países europeos", especifica "Alemania, Francia, y Países Bajos"',
          'Test: ¿Puedes visualizar lo que describes? Si no, es muy vago - agrega detalles'
        ]
      },
      {
        number: 10,
        title: 'Pide Feedback y Revisa Basándote en Comentarios',
        description: 'FUENTES DE FEEDBACK: (1) CENTRO DE ESCRITURA universitario (gratis, capacitados), (2) Profesor (office hours o borrador preliminar), (3) Compañeros de clase (intercambio de borradores), (4) Herramientas digitales (Grammarly para gramática, pero NO para contenido). CÓMO USAR FEEDBACK: (1) No te defiendas - escucha/lee con mente abierta, (2) Busca patrones: Si 3 personas señalan misma debilidad, es real, (3) Prioriza feedback sobre claridad/argumentos > gramática. PREGUNTAS ESPECÍFICAS: "¿Mi argumento es claro?", "¿Qué sección es confusa?", "¿Necesito más evidencia en algún punto?"',
        tips: [
          'Pide feedback cuando tienes borrador completo, no outline - revisor necesita ver argumentos desarrollados',
          'Centro de escritura se llena rápido - agenda cita 1-2 semanas antes de deadline',
          'Agradece feedback honesto - crítica constructiva mejora tu escritura más que elogios'
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: 'Escribir oraciones extremadamente largas (25+ palabras) intentando sonar académico',
        solution: 'Claridad > complejidad. Divide oraciones largas en 2-3 oraciones cortas. Longitud ideal: 15-20 palabras por oración. Varía longitudes para ritmo.'
      },
      {
        mistake: 'Usar thesaurus para reemplazar cada palabra simple con sinónimo complejo',
        solution: 'Vocabulario rebuscado oscurece significado. Usa palabra más precisa y clara, NO más compleja. "Usar" es mejor que "utilizar" si comunica igual.'
      },
      {
        mistake: 'Iniciar demasiadas oraciones con "Esto", "Eso", "Esto demuestra" sin referente claro',
        solution: 'Especifica a qué te refieres: "Esta limitación", "Este hallazgo", "Esta tendencia". Lector no debe adivinar qué significa "esto".'
      },
      {
        mistake: 'Escribir intro y conclusión genéricas que funcionan para cualquier ensayo',
        solution: 'Intro/conclusión deben ser específicas a TU argumento. Test: ¿Otra persona podría usar tu intro/conclusión para ensayo diferente? Si sí, es muy genérica.'
      },
      {
        mistake: 'No leer trabajo en voz alta antes de entregar',
        solution: 'Leer en voz alta detecta: oraciones confusas, palabras faltantes, repeticiones, ritmo monótono. Tropiezos al leer = áreas a revisar.'
      }
    ],
    faqs: [
      {
        question: '¿Cuánto tiempo debo dedicar a revisar vs escribir?',
        answer: 'RATIO RECOMENDADO: 60% escritura, 40% revisión. DESGLOSE: Primer borrador (40%), Segunda versión con revisiones mayores (25%), Revisión detallada de claridad (20%), Edición final de gramática (15%). ERROR COMÚN: Estudiantes dedican 90% a escribir, 10% a revisar = ensayo con buenas ideas pero mal ejecutadas. Revisión rigurosa distingue ensayos excelentes de promedio. CRONOGRAMA: Si tienes 2 semanas, 8 días escribir borrador, 6 días revisar.'
      },
      {
        question: '¿Mi escritura debe sonar "formal" o puede ser más conversacional?',
        answer: 'DEPENDE de disciplina y audiencia. HUMANIDADES/CIENCIAS SOCIALES: Permiten tono más personal, uso de "yo", ejemplos personales. STEM: Generalmente más formal, tercera persona, enfoque en datos. REGLA GENERAL: Profesional pero accesible. EVITA: Jerga coloquial ("súper cool"), contracciones en exceso, lenguaje demasiado casual. ESTÁ BIEN: Claridad, concisión, voz activa, cierta personalidad. VERIFICA: Lee trabajos publicados en tu campo (journals académicos) - ese es el tono estándar.'
      },
      {
        question: '¿Cómo desarrollo vocabulario académico sin sonar pretencioso?',
        answer: 'ESTRATEGIAS: (1) LEE AMPLIAMENTE en tu disciplina - absorbes vocabulario contextualizadamente. (2) Haz lista de términos técnicos clave de tu campo (cada disciplina tiene vocabulario específico). (3) Aprende CUÁNDO usar término técnico: Si existe palabra precisa para concepto específico, úsala (ej: "fotosíntesis" en biología). Si palabra simple es igualmente precisa, úsala. (4) EVITA: Usar palabra compleja cuando simple funciona igual ("utilizar" vs "usar"). BALANCE: Vocabulario disciplinario apropiado + claridad general.'
      },
      {
        question: '¿Puedo usar IA (ChatGPT, Claude) para mejorar mi escritura?',
        answer: 'DEPENDE de cómo y política de profesor. USOS ÉTICOS (si permitido): (1) Pedir feedback: "¿Este argumento es claro?", (2) Solicitar sugerencias: "¿Cómo puedo mejorar esta oración?" LUEGO TÚ decides si implementar, (3) Identificar áreas débiles. USOS PROHIBIDOS: (1) IA escribe secciones completas que copias, (2) Parafraseas output de IA sin citarlo. DECLARACIÓN: Si usas IA para feedback, decláralo en nota: "Usé Claude para feedback sobre claridad de argumentos." MEJOR: Desarrolla habilidad propia - IA es herramienta temporal, escritura es habilidad permanente.'
      },
      {
        question: '¿Qué hago si profesor marca mi escritura como "poco clara" pero yo entiendo perfectamente?',
        answer: 'PROBLEMA: "Maldición del conocimiento" - TÚ conoces tu argumento íntimamente, entonces conexiones obvias para ti no son obvias para lector. SOLUCIÓN: (1) Pide a profesor señalar qué secciones específicas son confusas, (2) Lee esas secciones imaginando que NO conoces el tema - ¿Saltas pasos lógicos? (3) Agrega oraciones de transición explicando CÓMO ideas se conectan, (4) Pide a amigo NO especialista leer - si no entienden, claridad es problema. TÉCNICA: Lee cada párrafo preguntándote "¿Por qué esto conecta con lo anterior?" Si no puedes explicarlo, lector tampoco.'
      }
    ],
    relatedGuides: [
      { title: 'Cómo Escribir Ensayos Originales', slug: 'como-escribir-ensayos-originales' },
      { title: 'Cómo Evitar Plagio Académico', slug: 'como-evitar-plagio-academico' },
      { title: 'Cómo Parafrasear Correctamente', slug: 'como-parafrasear-correctamente' }
    ],
    relatedTools: [
      { name: 'Detector de IA Gratis', url: '/?ref=guia-mejorar-escritura' },
      { name: 'Parafrasear Textos Online', url: '/parafrasear-textos-online-gratis?ref=guia-mejorar-escritura' }
    ],
    cta: {
      text: 'Mejorar calidad de textos',
      url: '/parafrasear-textos-online-gratis?ref=guia-mejorar-escritura'
    }
  },

  {
    slug: 'como-parafrasear-correctamente',
    title: 'Cómo Parafrasear Correctamente Sin Plagiar',
    keywords: [
      'como parafrasear correctamente',
      'parafrasear sin plagiar',
      'tecnicas parafraseo academico',
      'parafrasear textos academicos',
      'como parafrasear bien'
    ],
    metaTitle: 'Cómo Parafrasear Correctamente Sin Plagiar: Guía 2025',
    metaDescription: 'Aprende a parafrasear correctamente sin plagiar. Técnicas efectivas, errores comunes, ejemplos. Guía paso a paso para estudiantes.',
    h1: 'Cómo Parafrasear Correctamente: Guía Completa',
    intro: 'Parafrasear correctamente es habilidad académica esencial, pero mayoría de estudiantes lo hacen incorrectamente. "Patchwriting" (cambiar solo palabras sueltas manteniendo estructura original) es forma de plagio, aunque sea no intencional. Paráfrasis correcta requiere: (1) Comprensión profunda de idea original, (2) Re-expresión completa con tus palabras Y estructura diferente, (3) Citación apropiada de fuente. Esta guía paso a paso enseña técnicas específicas para parafrasear efectivamente, cómo evitar patchwriting, cuándo parafrasear vs citar textualmente, y cómo integrar paráfrasis en tu escritura académica.',
    overview: 'Esta guía cubre: (1) Qué es paráfrasis legítima vs patchwriting, (2) Proceso paso a paso para parafrasear, (3) Técnicas específicas de transformación, (4) Cuándo parafrasear vs citar, (5) Cómo citar paráfrasis correctamente.',
    steps: [
      {
        number: 1,
        title: 'Entiende Diferencia: Paráfrasis Correcta vs Patchwriting (Plagio)',
        description: 'PATCHWRITING (plagio): Cambias palabras sueltas con sinónimos pero mantienes estructura de oraciones original. ORIGINAL: "Inteligencia artificial está transformando radicalmente la educación superior mediante personalización del aprendizaje." PATCHWRITING (PLAGIO): "IA está cambiando drásticamente educación universitaria a través de customización del aprendizaje." (misma estructura, solo sinónimos). PARÁFRASIS CORRECTA: "Universidades adaptan pedagogía usando herramientas de IA que ajustan contenido a necesidades individuales de cada estudiante (García, 2024)." (estructura diferente, palabras propias, idea preservada). CLAVE: Longitud, orden de ideas, estructura gramatical deben ser DIFERENTES.',
        tips: [
          'Test: Pon original y tu paráfrasis lado a lado - ¿Longitud similar? ¿Orden de palabras paralelo? Si sí, es patchwriting',
          'Patchwriting incluye cambiar solo 40-50% de palabras - necesitas transformación completa',
          'Profesores y detectores de plagio identifican patchwriting fácilmente'
        ]
      },
      {
        number: 2,
        title: 'Lee y Comprende Completamente ANTES de Parafrasear',
        description: 'ERROR #1: Intentar parafrasear mientras lees por primera vez = copias estructura porque no entiendes profundamente. PROCESO CORRECTO: (1) Lee pasaje 2-3 veces completo, (2) Identifica idea central: ¿Cuál es EL punto principal? (3) Identifica ideas secundarias que apoyan el punto, (4) Si hay términos que no entiendes, búscalos, (5) Explícate idea en voz alta a ti mismo sin ver texto, (6) SOLO ENTONCES intenta parafrasear. ANALOGÍA: No puedes traducir texto a otro idioma si no entiendes el original - parafrasear requiere comprensión igual de profunda.',
        tips: [
          'Si no puedes explicar idea sin ver texto, no la entiendes suficiente para parafrasear',
          'Busca definiciones de términos técnicos - no uses sinónimo si no entiendes concepto',
          'Para textos complejos, haz resumen mental de cada oración antes de parafrasear pasaje completo'
        ]
      },
      {
        number: 3,
        title: 'CIERRA la Fuente Mientras Parafraseas (Técnica "Memoria")',
        description: 'TÉCNICA ANTI-PLAGIO MÁS EFECTIVA: No puedes copiar estructura si no la estás viendo. PROCESO: (1) Lee y comprende pasaje, (2) Cierra libro/PDF o voltea página, (3) Espera 30-60 segundos (toma café, respira), (4) Escribe idea con TUS palabras sin ver original, (5) Compara con original solo DESPUÉS de escribir tu versión, (6) Verifica: ¿Idea es precisa? ¿Estructura es diferente? BENEFICIO: Imposible hacer patchwriting si no ves fuente. Resultado natural es tu estructura, tu vocabulario, tu forma de expresar.',
        tips: [
          'Si no puedes recordar idea sin ver fuente, léela nuevamente hasta internalizarla',
          'Usa timer - obliga 60 segundos sin ver fuente antes de escribir',
          'Si te encuentras tratando de "recordar palabras exactas", estás haciendo mal - recuerda IDEA'
        ]
      },
      {
        number: 4,
        title: 'Usa Técnicas Específicas de Transformación Lingüística',
        description: 'TÉCNICAS para cambiar estructura: (1) CAMBIA VOZ: Activa↔Pasiva. Original: "Investigadores condujeron estudio." → Paráfrasis: "Estudio fue realizado." (2) CAMBIA ORDEN: Original: "A causa B." → Paráfrasis: "B es resultado de A." (3) DIVIDE/COMBINA: 1 oración larga → 2 cortas. O 2 cortas → 1 larga. (4) CAMBIA CATEGORÍA GRAMATICAL: Sustantivo→Verbo. Original: "Transformación de educación." → Paráfrasis: "Educación se transforma." (5) USA SINÓNIMOS (pero no solo eso). (6) CAMBIA ESTRUCTURA: Original: "Debido a X, ocurre Y." → Paráfrasis: "Y sucede. Factor causal es X."',
        tips: [
          'Aplica mínimo 3 técnicas simultáneamente - solo sinónimos NO es paráfrasis',
          'Reordena ideas: Si original menciona A→B→C, parafrasea como C→A→B (si lógico)',
          'Cambia conectores: "debido a" → "como resultado de", "sin embargo" → "no obstante"'
        ]
      },
      {
        number: 5,
        title: 'Escribe Como Si le Explicaras a un Amigo',
        description: 'MENTALIDAD: Imagina que amigo te pregunta "¿Qué dice ese artículo?" - le explicas con TUS palabras naturales, no recitas texto. PROCESO: Después de leer y cerrar fuente, pregúntate: "¿Cómo le explicaría esta idea a alguien que no ha leído esto?" Escribe esa explicación. BENEFICIO: Tu forma natural de hablar es inherentemente diferente de estructura del autor original = paráfrasis genuina. AJUSTE: Después de escribir versión "conversacional", ajusta tono a académico apropiado (elimina coloquialismos pero mantén tu estructura).',
        tips: [
          'Habla en voz alta explicando idea antes de escribirla - captura tu forma natural',
          'Pregúntate: "¿Qué palabras usaría YO para expresar esto?" vs "¿Qué palabras usó el autor?"',
          'Tu paráfrasis puede ser más simple/directa que original - claridad es virtud, no defecto'
        ]
      },
      {
        number: 6,
        title: 'Verifica Precisión: ¿Tu Paráfrasis Conserva Idea Original?',
        description: 'RIESGO: Al parafrasear extensivamente, puedes distorsionar idea original. VERIFICACIÓN: (1) Compara tu paráfrasis con original lado a lado, (2) Verifica que significado esencial es idéntico, (3) No agregues interpretaciones que no están en original, (4) No omitas calificadores importantes ("puede", "algunos", "frecuentemente"). EJEMPLO DISTORSIÓN: Original: "Algunos estudios sugieren posible conexión." → Paráfrasis incorrecta: "Investigación confirma conexión definitiva." (exagera certeza). BALANCE: Cambiar estructura/palabras SIN cambiar significado.',
        tips: [
          'Presta atención a intensidad: "algunos" ≠ "muchos", "sugiere" ≠ "demuestra"',
          'Conserva limitaciones mencionadas por autor original',
          'Si original dice "X en contexto Y", tu paráfrasis debe mencionar contexto Y'
        ]
      },
      {
        number: 7,
        title: 'Decide: ¿Parafrasear o Citar Textualmente?',
        description: 'USA CITA TEXTUAL (comillas) cuando: (1) Redacción es poderosa/memorable, (2) Definición técnica precisa, (3) Quieres analizar lenguaje específico del autor, (4) Parafrasear requeriría mismas palabras (ej: términos técnicos únicos). USA PARÁFRASIS cuando: (1) Idea es importante pero redacción no es especial, (2) Quieres integrar múltiples fuentes fluidamente, (3) Texto original es muy técnico y quieres simplificar. REGLA: Si puedes parafrasear legitimamente, prefiere paráfrasis (muestra comprensión). Si paráfrasis sería forzada/artificial, usa cita textual.',
        tips: [
          'Test: ¿Por qué quiero incluir esto? Si respuesta es "la idea", parafrasea. Si es "cómo lo dijo", cita',
          'Balance en ensayo: ~10% citas textuales, ~30% paráfrasis, ~60% tu análisis original',
          'Evita ensayos con 40%+ citas textuales - demuestra poca síntesis propia'
        ]
      },
      {
        number: 8,
        title: 'Cita Tu Paráfrasis Correctamente (Formato APA 7)',
        description: 'IMPORTANTE: Parafrasear sin citar = PLAGIO. Aunque uses tus palabras, idea vino de fuente → DEBES citar. FORMATO APA BÁSICO: "Idea parafraseada (Apellido, Año)." o "Apellido (Año) argumenta que idea parafraseada." MÚLTIPLES ORACIONES: Si todo un párrafo parafrasea misma fuente, cita al inicio: "Según García (2024), idea 1. Además, idea 2. Finalmente, idea 3." DIFERENCIA CON CITA TEXTUAL: Paráfrasis no usa comillas, pero SÍ requiere (Apellido, Año). Número de página es opcional para paráfrasis, pero recomendado.',
        tips: [
          'Paráfrasis de múltiples oraciones: Cita al inicio del párrafo y al final para claridad',
          'Si parafraseas múltiples fuentes en mismo párrafo, cita cada una claramente',
          'Lista de Referencias al final debe incluir TODAS las fuentes parafraseadas (igual que citas textuales)'
        ]
      },
      {
        number: 9,
        title: 'Practica con Pasajes Cortos Primero',
        description: 'NO intentes parafrasear párrafos completos inmediatamente. PROGRESIÓN: (1) SEMANA 1: Parafrasea oraciones individuales simples. (2) SEMANA 2: Parafrasea 2-3 oraciones relacionadas. (3) SEMANA 3: Parafrasea párrafos completos. EJERCICIO: Toma artículo académico, selecciona 5 oraciones, parafrasea cada una sin ver original, compara. Pide a profesor/tutor feedback: "¿Mi paráfrasis es legítima?" DESARROLLO: Como cualquier habilidad, parafrasear mejora con práctica deliberada. Primeras veces son difíciles/lentas, con tiempo se vuelve natural.',
        tips: [
          'Practica con fuentes que entiendes muy bien primero - más fácil parafrasear',
          'Compara tus paráfrasis con ejemplos de libros de estilo (APA manual tiene ejemplos)',
          'Pide feedback específico: "¿Esto es patchwriting o paráfrasis legítima?"'
        ]
      },
      {
        number: 10,
        title: 'Usa Herramientas para Verificar (Pero No Para Generar)',
        description: 'HERRAMIENTAS DE VERIFICACIÓN: (1) DETECTORES DE PLAGIO: DetectorDeIA.com, Turnitin, Quetext - verifican si tu paráfrasis es muy similar a original. (2) RETROALIMENTACIÓN HUMANA: Centro de escritura, profesores. USO ÉTICO: Usa herramientas para VERIFICAR tu paráfrasis después de escribirla, NO para generar paráfrasis. HERRAMIENTAS PROHIBIDAS: Parafrasear con IA (ChatGPT, QuillBot) y copiar output = plagio (no es TU paráfrasis). PROCESO: Parafraseas manualmente → Verificas con detector → Si marca similar, re-parafraseas con más transformación.',
        tips: [
          'Si detector marca tu paráfrasis como 60%+ similar, es patchwriting - re-escribe completamente',
          'Detectores no son perfectos: 30-40% similitud puede ser OK si son términos técnicos inevitables',
          'No intentes "engañar" detectores cambiando letras por símbolos - enfócate en parafrasear genuinamente'
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: 'Usar herramienta de parafraseo automática (QuillBot, IA) sin hacer trabajo propio',
        solution: 'Output de herramientas automáticas frecuentemente es patchwriting. Si usas herramienta: (1) Genera sugerencia, (2) RE-ESCRIBE completamente con tus palabras (no copies output), (3) Verifica que resultado es diferente de ambas (original Y output de herramienta).'
      },
      {
        mistake: 'Pensar que cambiar 50% de palabras es suficiente',
        solution: 'Paráfrasis NO es porcentaje de palabras cambiadas. Necesitas transformar ESTRUCTURA completa. Puedes usar algunas palabras del original (términos técnicos) si estructura es totalmente diferente.'
      },
      {
        mistake: 'Parafrasear oración por oración manteniendo orden original',
        solution: 'Parafrasear cada oración individualmente pero en mismo orden = patchwriting de párrafo completo. Reorganiza ideas: combina oraciones, divide otras, cambia secuencia si lógico.'
      },
      {
        mistake: 'Omitir citación porque "usé mis propias palabras"',
        solution: 'TUS PALABRAS para expresar IDEAS DE OTRO = paráfrasis que REQUIERE citación. SIEMPRE cita paráfrasis: (Apellido, Año). Única excepción: conocimiento verdaderamente común.'
      },
      {
        mistake: 'Traducir de otro idioma pensando que eso es parafrasear',
        solution: 'Traducir texto = transferir estructura/ideas del original. Para parafrasear texto en otro idioma: (1) Traduce mentalmente, (2) LUEGO parafrasea aplicando técnicas de transformación, (3) Cita fuente original.'
      }
    ],
    faqs: [
      {
        question: '¿Cuántas palabras tengo que cambiar para que sea paráfrasis legítima?',
        answer: 'ERROR: Paráfrasis NO se trata de porcentaje de palabras cambiadas. CORRECTA PREGUNTA: "¿Transformé la estructura suficientemente?" VERIFICACIÓN: (1) ¿Longitud de oraciones es diferente? (2) ¿Orden de ideas es diferente? (3) ¿Estructura gramatical es diferente? (4) ¿Conectores son diferentes? (5) ¿Usé mis palabras naturales? Si 4-5 respuestas son "sí", probablemente es paráfrasis legítima. ESTÁ OK: Usar términos técnicos idénticos (no hay sinónimo para "fotosíntesis"), palabras comunes ("el", "la", "es"), nombres propios.'
      },
      {
        question: '¿Tengo que parafrasear todo o puedo mezclar paráfrasis con citas textuales?',
        answer: 'MEJOR PRÁCTICA: Mezcla según función. TÉCNICA: Parafrasea idea general, cita textualmente frase clave. EJEMPLO: "García (2024) argumenta que adopción de IA en educación requiere regulación ética. Específicamente, advierte que "uso sin límites amenaza desarrollo de pensamiento crítico" (p. 45)." BENEFICIO: Muestra que entiendes idea amplia (paráfrasis) + preservas lenguaje poderoso (cita). BALANCE: En un párrafo típico, puedes tener 3-4 oraciones de paráfrasis + 1 cita textual corta.'
      },
      {
        question: '¿Qué hago si idea requiere vocabulario técnico específico que no puedo cambiar?',
        answer: 'TÉRMINOS TÉCNICOS: Úsalos directamente - no hay sinónimo válido. EJEMPLOS: "fotosíntesis", "inteligencia artificial", "método científico", "estudio doble ciego". SOLUCIÓN: Cambia todo LO DEMÁS alrededor del término. EJEMPLO ORIGINAL: "La fotosíntesis es proceso mediante cual plantas convierten luz solar en energía química." PARÁFRASIS OK: "Plantas generan energía química a partir de luz solar mediante fotosíntesis (García, 2024)." (estructura diferente aunque "fotosíntesis" es idéntico). CLAVE: Transformación de estructura compensa términos técnicos inevitables.'
      },
      {
        question: '¿Cuánto tiempo debe tomar parafrasear un párrafo?',
        answer: 'TIEMPO ESTIMADO: Para estudiantes que están aprendiendo, 10-15 minutos por párrafo (leer→comprender→cerrar fuente→parafrasear→verificar). Con práctica, reduce a 5-7 minutos. COMPARACIÓN: Copiar con patchwriting toma 2 minutos pero arriesgas plagio. Parafrasear correctamente toma más tiempo inicialmente pero: (1) Evitas plagio, (2) Aprendes mejor (procesas profundamente), (3) Desarrollas habilidad valiosa. EFICIENCIA: Mejora con práctica - inversión de tiempo se reduce significativamente después de 4-5 semanas.'
      },
      {
        question: '¿Puedo parafrasear una paráfrasis (fuente secundaria)?',
        answer: 'MEJOR PRÁCTICA: NO. Busca y lee fuente ORIGINAL, parafrasea/cita de allí. PROBLEMA: Parafrasear paráfrasis = teléfono descompuesto, distorsionas idea original. CUANDO NO HAY OPCIÓN (fuente original inaccesible): Usa citación secundaria. FORMATO APA: "García (como se citó en Smith, 2024) argumenta que..." SOLO en Referencias: Smith, A. (2024)... (No incluyes García que no leíste). ADVERTENCIA: Profesores prefieren fuentes primarias - usa secundarias solo cuando primaria es genuinamente inaccesible.'
      }
    ],
    relatedGuides: [
      { title: 'Cómo Evitar Plagio Académico', slug: 'como-evitar-plagio-academico' },
      { title: 'Cómo Citar Fuentes en Formato APA', slug: 'como-citar-fuentes-apa-parafraseo' },
      { title: 'Cómo Mejorar Escritura Académica', slug: 'como-mejorar-escritura-academica' }
    ],
    relatedTools: [
      { name: 'Parafrasear Sin Plagio', url: '/parafrasear-sin-plagio?ref=guia-parafrasear' },
      { name: 'Detector de IA y Plagio', url: '/?ref=guia-parafrasear' }
    ],
    cta: {
      text: 'Parafrasear textos correctamente',
      url: '/parafrasear-sin-plagio?ref=guia-parafrasear'
    }
  },

  {
    slug: 'como-hacer-bibliografia-apa',
    title: 'Cómo Hacer Bibliografía en Formato APA 7',
    keywords: [
      'como hacer bibliografia apa',
      'bibliografia formato apa 7',
      'referencias apa ejemplo',
      'como citar en apa',
      'lista referencias apa'
    ],
    metaTitle: 'Cómo Hacer Bibliografía APA 7: Guía Completa con Ejemplos 2025',
    metaDescription: 'Aprende a hacer bibliografía en formato APA 7. Ejemplos de libros, artículos, sitios web, más. Guía paso a paso para estudiantes.',
    h1: 'Cómo Hacer Bibliografía en Formato APA 7: Guía Completa',
    intro: 'Formato APA 7 (American Psychological Association, 7ª edición) es estándar de citación más usado en ciencias sociales, educación, psicología, negocios. Bibliografía correcta (llamada "Referencias" en APA) NO es simplemente lista de fuentes - tiene formato específico que incluye autores, año, título, fuente, DOI/URL. Errores de formato pueden resultar en pérdida de puntos o acusaciones de plagio. Esta guía paso a paso enseña proceso completo para crear lista de Referencias en APA 7, formatos para tipos de fuentes más comunes, herramientas útiles, y errores frecuentes a evitar.',
    overview: 'Esta guía cubre: (1) Configuración básica de página Referencias, (2) Formato para artículos de journals, (3) Formato para libros, (4) Formato para sitios web, (5) Casos especiales y herramientas.',
    steps: [
      {
        number: 1,
        title: 'Configura Página "Referencias" Correctamente',
        description: 'TÍTULO: Nueva página con título "Referencias" centrado, en negrita, en parte superior. NO uses "Bibliografía" (término incorrecto en APA). FORMATO PÁGINA: (1) Márgenes de 1 pulgada (2.54 cm) en todos lados, (2) Fuente Times New Roman 12pt o Arial 11pt, (3) Doble espacio en TODO (incluyendo entre entradas), (4) Sangría francesa (hanging indent): primera línea al margen, líneas subsiguientes con sangría de 0.5 pulgadas. ORDEN: Alfabético por apellido de primer autor (si no hay autor, usa primera palabra significativa del título, ignorando "El", "La", "Un").',
        tips: [
          'En Word: Sangría francesa = selecciona texto → Párrafo → Sangría especial → Francesa → 1.27 cm',
          'Referencias aparece en nueva página después del texto del ensayo',
          'Si tienes 1 fuente, título sigue siendo "Referencias" (plural), no "Referencia"'
        ]
      },
      {
        number: 2,
        title: 'Formato para Artículos de Journals Académicos',
        description: 'FORMATO BÁSICO: Apellido, Inicial(es). (Año). Título del artículo. Título del Journal, Volumen(Número), páginas. DOI o URL. EJEMPLO: García, M. & López, A. (2024). Inteligencia artificial en educación superior: Desafíos éticos. Revista de Educación Digital, 15(3), 234-251. https://doi.org/10.1234/red.2024.001. DETALLES: (1) Título del artículo: Solo primera palabra y nombres propios en mayúscula. (2) Título del Journal: En Cursiva, Todas las Palabras Principales en Mayúscula. (3) Volumen en cursiva, número entre paréntesis sin cursiva. (4) DOI preferido sobre URL. Formato: https://doi.org/XX no "DOI:" antes.',
        tips: [
          'Si artículo tiene DOI, NO agregues URL adicional - DOI es suficiente',
          'Incluye número de issue entre paréntesis si cada número empieza paginación en 1',
          'Hasta 20 autores: Nombra todos. 21+: Primeros 19, "...", último autor'
        ]
      },
      {
        number: 3,
        title: 'Formato para Libros (Impreso y Electrónico)',
        description: 'LIBRO IMPRESO: Apellido, Inicial(es). (Año). Título del libro en cursiva. Editorial. EJEMPLO: García, M. (2024). Ética de inteligencia artificial. Penguin Random House. LIBRO ELECTRÓNICO: Agrega DOI o URL al final. EJEMPLO: García, M. (2024). Ética de inteligencia artificial. Penguin Random House. https://doi.org/10.1234/libro. CAPÍTULO DE LIBRO: Apellido, Inicial(es). (Año). Título del capítulo. En Inicial(es). Apellido (Ed.), Título del libro en cursiva (pp. XX-XX). Editorial. DETALLES: (1) Título del libro: Primera palabra y nombres propios en mayúscula, todo en cursiva. (2) NO incluyas ciudad de publicación (cambio de APA 6 a APA 7).',
        tips: [
          'Si libro tiene editores en lugar de autores, pon "(Ed.)" o "(Eds.)" después de nombres',
          'Para e-books de Kindle sin DOI, omite URL si versión impresa existe (cita versión impresa)',
          'Edición: Si no es primera, especifica: (3ª ed.) después del título'
        ]
      },
      {
        number: 4,
        title: 'Formato para Sitios Web y Páginas Online',
        description: 'PÁGINA WEB CON AUTOR: Apellido, Inicial(es). (Año, Mes Día). Título de la página. Nombre del Sitio. URL. EJEMPLO: García, M. (2024, enero 15). Cómo usar IA éticamente. DetectorDeIA. https://detectordeia.com/guia-etica. PÁGINA WEB SIN AUTOR: Título de la página. (Año, Mes Día). Nombre del Sitio. URL. EJEMPLO: Cómo usar IA éticamente. (2024, enero 15). DetectorDeIA. https://detectordeia.com/guia-etica. SIN FECHA: Usa (s.f.) en lugar de año. NOTA: Título de página en fuente normal (no cursiva), Nombre del Sitio en cursiva si es diferente del autor.',
        tips: [
          'NO pongas "Recuperado de" antes de URL (cambio de APA 6 a 7) - solo URL directamente',
          'Si URL es muy larga (40+ caracteres), está OK, NO la acortes',
          'Omite URLs que requieren login o son temporales (Ej: URLs de búsqueda en bases de datos)'
        ]
      },
      {
        number: 5,
        title: 'Formato para Artículos de Periódicos y Revistas',
        description: 'PERIÓDICO ONLINE: Apellido, Inicial(es). (Año, Mes Día). Título del artículo. Nombre del Periódico. URL. EJEMPLO: García, M. (2024, marzo 10). Universidades adoptan IA con precaución. El País. https://elpais.com/articulo. REVISTA POPULAR (no académica): Apellido, Inicial(es). (Año, Mes). Título del artículo. Título de la Revista, Volumen(Número), páginas. URL. EJEMPLO: López, A. (2024, febrero). El futuro de la educación. Forbes España, 25(2), 45-48. DIFERENCIA: Periódico incluye fecha completa (Mes Día), revista solo mes. Título de periódico/revista en cursiva.',
        tips: [
          'Periódico sin autor: Empieza con título del artículo (sin cursiva)',
          'Si periódico tiene múltiples ediciones (ej: edición nacional vs local), especifica entre paréntesis',
          'Artículos de blogs siguen mismo formato que páginas web'
        ]
      },
      {
        number: 6,
        title: 'Cita Fuentes con Múltiples Autores Correctamente',
        description: 'UN AUTOR: Apellido, Inicial. (Año). DOS AUTORES: Apellido1, Inicial. & Apellido2, Inicial. (Año). (nota: & en vez de "y"). TRES O MÁS (hasta 20): Lista todos separados por comas, & antes del último. EJEMPLO: García, M., López, A., Martínez, P., & Smith, J. (2024). 21+ AUTORES: Primeros 19 autores, "...", último autor. EJEMPLO: García, M., López, A., Martínez, P., ... & Zhong, Y. (2024). IMPORTANTE: En citas en el texto, 3+ autores se abrevia "García et al. (2024)" pero en Referencias se listan todos (hasta 20).',
        tips: [
          'Usa "&" (ampersand) en Referencias, pero "y" en texto del ensayo',
          'No pongas punto después de iniciales intermedias si hay más de una: García, M. A. ✓, no García, M.A.',
          'Si dos autores tienen mismo apellido e inicial, agrega más iniciales para distinguir'
        ]
      },
      {
        number: 7,
        title: 'Casos Especiales: Videos, Podcasts, Redes Sociales',
        description: 'VIDEO DE YOUTUBE: Apellido, Inicial. [@nombreusuario]. (Año, Mes Día). Título del video [Video]. YouTube. URL. EJEMPLO: García, M. [@profgarcia]. (2024, enero 20). Cómo estudiar efectivamente [Video]. YouTube. https://youtu.be/xxxx. PODCAST: Apellido, Inicial. (Presentador). (Año, Mes Día). Título del episodio (No. #) [Audio podcast]. En Nombre del Podcast. Plataforma. URL. TWEET/POST X: Apellido, Inicial. [@usuario]. (Año, Mes Día). Primeras 20 palabras del post [Tweet]. X. URL. NOTA: Incluye tipo de medio entre corchetes después del título.',
        tips: [
          'Para videos sin autor claro, usa nombre del canal como autor',
          'TikTok, Instagram siguen formato similar a X/Twitter',
          'Si post no tiene título formal, usa primeras 20 palabras del contenido (sin cursiva)'
        ]
      },
      {
        number: 8,
        title: 'Usa Gestores de Referencias para Automatizar',
        description: 'HERRAMIENTAS GRATUITAS: (1) ZOTERO (open source, más flexible), (2) MENDELEY (integrado con Elsevier), (3) ENDNOTE BASIC (gratuito con limitaciones). PROCESO: (1) Instala extensión de browser, (2) Navegas a artículo/libro, click en extensión, (3) Zotero guarda metadatos automáticamente, (4) Al escribir, insertas cita con plugin de Word/Google Docs, (5) Al final, generas Referencias con 1 click (formato APA 7 automático). BENEFICIO: Ahorra horas de formateo manual, previene errores, sincroniza entre dispositivos. ADVERTENCIA: Siempre verifica output - herramientas cometen errores (especialmente con sitios web).',
        tips: [
          'Zotero: Mejor para estudiantes (gratis sin límites, plugins abundantes)',
          'Importa PDFs a Zotero - extrae metadatos automáticamente de DOI',
          'Crea carpetas/etiquetas en gestor para organizar fuentes por proyecto/tema'
        ]
      },
      {
        number: 9,
        title: 'Verifica Errores Comunes Antes de Entregar',
        description: 'CHECKLIST: (1) ¿Sangría francesa en TODAS las entradas? (2) ¿Doble espacio entre TODAS las líneas? (3) ¿Orden alfabético correcto? (4) ¿Todos los autores tienen formato: Apellido, Inicial.? (5) ¿Títulos de journals/libros en cursiva? (6) ¿Títulos de artículos SIN cursiva? (7) ¿DOIs en formato https://doi.org/XX (no "DOI:" antes)? (8) ¿URLs funcionales (no rotas)? (9) ¿Todas las fuentes citadas en texto están en Referencias? (10) ¿Todas las fuentes en Referencias fueron citadas en texto? ERROR FATAL: Fuente en Referencias pero NUNCA citada en texto = punto en contra.',
        tips: [
          'Verifica URLs clickeando cada una - enlaces rotos son error grave',
          'Compara lista de Referencias con citas en texto - deben coincidir exactamente',
          'Usa verificador de formato APA online como complemento (pero no confíes 100%)'
        ]
      },
      {
        number: 10,
        title: 'Casos Complicados y Dónde Buscar Ayuda',
        description: 'FUENTES COMPLICADAS: (1) Informes gubernamentales, (2) Tesis no publicadas, (3) Presentaciones de conferencias, (4) Datasets, (5) Software. RECURSO OFICIAL: Manual APA 7ª edición (libro completo con cientos de ejemplos). ONLINE: APA Style Blog (blog.apastyle.org) con actualizaciones y casos especiales. UNIVERSIDAD: Centro de escritura universitario (tutores capacitados en APA). CUANDO EN DUDA: (1) Busca ejemplo similar en manual APA, (2) Adapta siguiendo principios generales (autor, año, título, fuente), (3) Sé consistente en formato que elijas.',
        tips: [
          'Blog oficial APA responde preguntas comunes sobre casos especiales',
          'Purdue OWL (owl.purdue.edu) tiene guía APA gratuita muy completa',
          'Si dos fuentes contradicen: Manual oficial APA > cualquier otra fuente'
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: 'Usar "Bibliografía" como título en lugar de "Referencias"',
        solution: 'APA 7 usa "Referencias" (no Bibliografía). Referencias incluye SOLO fuentes citadas en texto. Bibliografía incluiría fuentes consultadas pero no citadas (no se usa en APA).'
      },
      {
        mistake: 'Olvidar sangría francesa (hanging indent) en entradas',
        solution: 'Sangría francesa es OBLIGATORIA en APA. Primera línea al margen, líneas subsiguientes con sangría de 0.5 pulgadas. En Word: Párrafo → Sangría especial → Francesa.'
      },
      {
        mistake: 'Poner DOI como "DOI: 10.xxxx" en lugar de URL completa',
        solution: 'APA 7 formato: https://doi.org/10.xxxx (URL completa clickeable). NO uses "DOI:" antes del número. Cambio de APA 6 → 7.'
      },
      {
        mistake: 'Incluir ciudad de publicación para libros',
        solution: 'APA 7 ELIMINÓ ciudad de publicación. Solo incluye: Editorial. (cambio de APA 6). Ciudad ya NO se incluye.'
      },
      {
        mistake: 'Usar cursiva en título de artículo (debe ir en título de journal)',
        solution: 'Título de artículo: Sin cursiva, solo primera palabra en mayúscula. Título de Journal: En Cursiva, Palabras Principales en Mayúscula. No confundas.'
      }
    ],
    faqs: [
      {
        question: '¿Qué diferencia hay entre citas en el texto y Referencias?',
        answer: 'CITAS EN EL TEXTO: Mencionan fuente brevemente donde usas idea. Formato: (Apellido, Año) o (Apellido, Año, p. XX). Van DENTRO del ensayo. REFERENCIAS: Lista completa al final con información detallada de cada fuente (autor, año, título, editorial/journal, DOI/URL). RELACIÓN: Cada cita en texto debe tener entrada correspondiente en Referencias, y viceversa. EJEMPLO: Texto: "García (2024) argumenta que..." → Referencias: García, M. (2024). Ética de inteligencia artificial. Penguin.'
      },
      {
        question: '¿Tengo que incluir número de página en Referencias?',
        answer: 'DEPENDE del tipo de fuente. INCLUYE páginas para: (1) Artículos de journal: páginas completas (234-251), (2) Capítulo de libro: páginas del capítulo (pp. 45-67). NO incluye páginas para: (1) Libros completos, (2) Sitios web (no tienen paginación tradicional), (3) Videos/podcasts. NOTA: En citas en el texto, página es OPCIONAL para paráfrasis, OBLIGATORIA para citas textuales.'
      },
      {
        question: '¿Cómo cito algo que no tiene autor (sitio web, artículo)?',
        answer: 'SIN AUTOR: Empieza entrada con título. EJEMPLO: Cómo usar IA éticamente. (2024, enero 15). DetectorDeIA. https://detectordeia.com/guia. EN TEXTO: Usa primeras palabras del título entre comillas: ("Cómo usar IA", 2024). ORDEN ALFABÉTICO: Usa primera palabra significativa del título (ignora "El", "La", "Un"). NO uses "Anónimo" a menos que literalmente diga "por Anónimo".'
      },
      {
        question: '¿Qué hago si fuente no tiene fecha de publicación?',
        answer: 'USA (s.f.) que significa "sin fecha". EJEMPLO: García, M. (s.f.). Título del artículo. Nombre del Sitio. URL. EN TEXTO: (García, s.f.) o García (s.f.). INTENTA PRIMERO: Busca fecha en página "Acerca de", metadata del sitio, copyright al final. Algunos sitios ocultan fecha pero existe. Si genuinamente no existe, usa s.f.'
      },
      {
        question: '¿Puedo usar Wikipedia en Referencias?',
        answer: 'TÉCNICAMENTE PUEDES, pero NO DEBERÍAS en trabajos universitarios. PROBLEMA: Wikipedia no es fuente académica revisada por pares, contenido puede cambiar. MEJOR PRÁCTICA: (1) Usa Wikipedia para ENTENDER tema, (2) Ve a sección "Referencias" de Wikipedia, (3) Busca y LEE fuentes originales citadas, (4) Cita fuentes originales académicas, NO Wikipedia. EXCEPCIÓN: Si profesor permite explícitamente. FORMATO si debes usarla: Título del artículo. (s.f.). En Wikipedia. URL'
      }
    ],
    relatedGuides: [
      { title: 'Cómo Citar Fuentes en Formato APA al Parafrasear', slug: 'como-citar-fuentes-apa-parafraseo' },
      { title: 'Cómo Evitar Plagio Académico', slug: 'como-evitar-plagio-academico' },
      { title: 'Cómo Parafrasear Correctamente', slug: 'como-parafrasear-correctamente' }
    ],
    relatedTools: [
      { name: 'Detector de IA Gratis', url: '/?ref=guia-bibliografia-apa' },
      { name: 'Parafrasear Textos Online', url: '/parafrasear-textos-online-gratis?ref=guia-bibliografia-apa' }
    ],
    cta: {
      text: 'Verificar originalidad de trabajo',
      url: '/?ref=guia-bibliografia-apa'
    }
  },

  {
    slug: 'como-estructurar-ensayo-argumentativo',
    title: 'Cómo Estructurar un Ensayo Argumentativo',
    keywords: [
      'como estructurar ensayo argumentativo',
      'estructura ensayo argumentativo',
      'como escribir ensayo argumentativo',
      'partes ensayo argumentativo',
      'ensayo argumentativo ejemplo'
    ],
    metaTitle: 'Cómo Estructurar Ensayo Argumentativo: Guía Completa 2025',
    metaDescription: 'Aprende a estructurar ensayo argumentativo efectivo. Introducción, desarrollo, conclusión. Guía paso a paso con ejemplos para estudiantes.',
    h1: 'Cómo Estructurar un Ensayo Argumentativo: Guía Paso a Paso',
    intro: 'Ensayo argumentativo es tipo de escritura académica donde defiendes posición específica usando evidencia y razonamiento lógico. Diferencia con ensayo expositivo (solo informa) o narrativo (cuenta historia): ensayo argumentativo PERSUADE al lector de que tu posición es válida. Estructura correcta es crítica - incluso argumentos brillantes fallan si presentación es desorganizada. Esta guía paso a paso enseña estructura clásica de ensayo argumentativo (introducción con tesis, párrafos de cuerpo con argumentos, contraargumentos, conclusión), cómo desarrollar cada sección, transiciones efectivas, y errores comunes a evitar.',
    overview: 'Esta guía cubre: (1) Estructura general del ensayo argumentativo, (2) Cómo escribir introducción con gancho y tesis, (3) Desarrollo de párrafos de argumentación, (4) Contraargumentos efectivos, (5) Conclusión persuasiva.',
    steps: [
      {
        number: 1,
        title: 'Entiende Estructura de 5 Párrafos (o Expandida)',
        description: 'ESTRUCTURA BÁSICA (5 párrafos): (1) INTRODUCCIÓN: Gancho + contexto + tesis. (2-4) CUERPO: 3 párrafos, cada uno con argumento diferente que apoya tesis. (5) CONCLUSIÓN: Resumen + reformulación de tesis + cierre. ESTRUCTURA EXPANDIDA (ensayos largos): (1) Introducción, (2-5+) Múltiples argumentos (un párrafo por argumento), (6) Contraargumentos + refutación, (7) Conclusión. PRINCIPIO: Cada párrafo = una idea. No mezcles múltiples argumentos en un párrafo. FLEXIBILIDAD: 5 párrafos es plantilla, pero puedes tener 4 argumentos, 6 argumentos, etc. según complejidad del tema.',
        tips: [
          'Ensayos de 500-800 palabras: 5 párrafos funciona bien',
          'Ensayos de 1500+ palabras: Estructura expandida con 5-7 argumentos + contraargumentos',
          'Cada argumento debe ser igualmente fuerte - no pongas argumento débil solo para llenar estructura'
        ]
      },
      {
        number: 2,
        title: 'Escribe Introducción con Gancho, Contexto, y Tesis',
        description: 'ESTRUCTURA DE INTRO (3 partes): (1) GANCHO (1-2 oraciones): Captura atención. Opciones: pregunta provocativa, estadística sorprendente, anécdota breve, cita relevante. (2) CONTEXTO (2-4 oraciones): Información de fondo necesaria, define términos clave, explica por qué tema importa. (3) TESIS (1-2 oraciones): Tu posición específica + preview de argumentos principales. EJEMPLO: [GANCHO] "85% de universidades ahora permiten uso de IA, pero ¿a qué costo? [CONTEXTO] Mientras herramientas de IA ofrecen beneficios de eficiencia, su adopción sin regulación plantea preguntas sobre integridad académica. [TESIS] Universidades deben implementar políticas de IA estrictas porque: (1) preservan pensamiento crítico, (2) mantienen equidad, (3) preparan estudiantes para ética profesional."',
        tips: [
          'Gancho NO debe ser cliché ("Desde tiempos inmemoriales...") - sé específico y relevante',
          'Tesis debe estar al FINAL de introducción (última oración o dos)',
          'Preview de argumentos en tesis es opcional pero ayuda a lector seguir estructura'
        ]
      },
      {
        number: 3,
        title: 'Desarrolla Párrafos de Cuerpo con Estructura TREE',
        description: 'TREE = Topic sentence-Reasoning-Evidence-Explanation. ESTRUCTURA: (1) TOPIC SENTENCE (oración temática): Anuncia argumento del párrafo, conecta con tesis. (2) REASONING (razonamiento): Explica LÓGICA de por qué este argumento apoya tu tesis (2-3 oraciones). (3) EVIDENCE (evidencia): Cita, paráfrasis, estadística, ejemplo que apoya argumento (1-2 oraciones). (4) EXPLANATION (explicación): TU análisis de por qué evidencia valida tu argumento, cómo se conecta con punto mayor (3-4 oraciones). EJEMPLO: [T] "Políticas estrictas de IA preservan desarrollo de pensamiento crítico." [R] "Cuando estudiantes dependen de IA para tareas fundamentales..." [E] "García (2024) encontró que 67% de estudiantes..." [E] "Estos datos demuestran que..."',
        tips: [
          'Topic sentence es como mini-tesis del párrafo - debe ser clara y específica',
          'Reasoning viene ANTES de evidence - explica tu lógica primero',
          'Explanation debe ser sección más larga (40-50% del párrafo) - es TU análisis'
        ]
      },
      {
        number: 4,
        title: 'Ordena Argumentos Estratégicamente (Más Fuerte Primero y Último)',
        description: 'ORDEN ÓPTIMO: Argumento más fuerte PRIMERO, argumentos moderados en medio, segundo más fuerte AL FINAL. RAZÓN: (1) Argumento fuerte al inicio captura atención, establece credibilidad. (2) Argumento fuerte al final queda en memoria del lector (efecto recencia). EVITA: Orden cronológico o aleatorio si no refuerza tu argumento. EVALUACIÓN: ¿Cuál argumento tiene mejor evidencia? ¿Cuál es más difícil de refutar? Esos son tus "argumentos más fuertes". ALTERNATIVA: Si argumento se construye sobre otro, usa orden lógico (incluso si no es el más fuerte primero).',
        tips: [
          'Pregúntate: "Si lector solo lee UN párrafo de cuerpo, ¿cuál querría que sea?" - ponlo primero',
          'Argumentos más débiles van en medio (lector los nota menos)',
          'Transiciones entre argumentos: "Además", "Igualmente importante", "Finalmente"'
        ]
      },
      {
        number: 5,
        title: 'Incluye y Refuta Contraargumentos (Muestra Pensamiento Crítico)',
        description: 'UBICACIÓN: Párrafo separado ANTES de conclusión (después de tus argumentos principales). ESTRUCTURA: (1) RECONOCE contraargumento honestamente: "Críticos argumentan que..." (2-3 oraciones). (2) CONCEDE punto válido SI existe: "Es cierto que X..." (1 oración, opcional). (3) REFUTA explicando por qué limitación/insuficiente: "Sin embargo, este argumento no considera Y..." (3-4 oraciones). BENEFICIO: Demuestra que consideraste múltiples perspectivas, fortalece tu posición al desarmar objeciones previsibles. NO hagas: Strawman (distorsionar contraargumento para facilitar refutación) - usa versión más fuerte de contraargumento.',
        tips: [
          'Identifica contraargumento: ¿Qué diría alguien que NO está de acuerdo contigo?',
          'No dediques demasiado espacio a contraargumento - 1 párrafo de 5-8 oraciones es suficiente',
          'Transición: "Aunque algunos argumentan que X, este análisis pasa por alto..."'
        ]
      },
      {
        number: 6,
        title: 'Usa Transiciones Efectivas Entre Secciones',
        description: 'ENTRE INTRODUCCIÓN Y CUERPO: "Primero", "Para comenzar", "El argumento principal". ENTRE ARGUMENTOS DEL CUERPO: "Además", "Asimismo", "De igual importancia", "Más aún". PARA CONTRAARGUMENTOS: "Algunos podrían argumentar", "Sin embargo", "Por otro lado", "A pesar de". HACIA CONCLUSIÓN: "En conclusión", "En definitiva", "Por lo tanto", "Dados estos argumentos". PROPÓSITO: Transiciones guían al lector a través de tu lógica, muestran cómo ideas se conectan. SIN transiciones, ensayo parece lista desconectada. CON transiciones, ensayo fluye como argumento cohesivo.',
        tips: [
          'No uses misma transición repetidamente - varía: "Además" → "Igualmente" → "Más aún"',
          'Transiciones pueden ser frases completas: "Este análisis revela necesidad de examinar segundo factor..."',
          'Lee ensayo en voz alta - si hay saltos abruptos, necesitas transición'
        ]
      },
      {
        number: 7,
        title: 'Escribe Conclusión Que Cierra con Impacto',
        description: 'ESTRUCTURA DE CONCLUSIÓN (3 partes): (1) REFORMULA TESIS (2-3 oraciones): Di misma idea con palabras diferentes, NO copies-pegues tesis original. (2) SINTETIZA ARGUMENTOS (2-3 oraciones): Resume brevemente cómo tus argumentos apoyan tesis (NO repitas detalles, solo esencia). (3) CIERRE PODEROSO (2-3 oraciones): Call-to-action, implicación más amplia, pregunta para reflexión, o conexión con gancho inicial. EVITA: Nueva evidencia (va en cuerpo), disculpas ("este ensayo no es perfecto"), afirmaciones grandiosas no respaldadas ("esto solucionará todos los problemas").',
        tips: [
          'Longitud: Conclusión típicamente 10-15% del ensayo total',
          'Cierre fuerte regresa a gancho inicial - crea sensación de círculo completo',
          'Test: ¿Conclusión responde "Y entonces qué?" / "Por qué importa?" Si no, fortalécela'
        ]
      },
      {
        number: 8,
        title: 'Mantén Tono Objetivo y Académico',
        description: 'CARACTERÍSTICAS DE TONO ACADÉMICO: (1) OBJETIVO: Basado en evidencia, no emoción. "Estudios demuestran" vs "Obviamente todos saben". (2) FORMAL: Sin jerga coloquial, contracciones mínimas. (3) PRECISO: Palabras específicas, no vagas ("algunos" → "37%"). (4) EQUILIBRADO: Reconoce complejidad, evita absolutos ("siempre", "nunca"). PRIMERA PERSONA: Disciplinas humanísticas frecuentemente permiten "yo argumento", ciencias sociales/STEM prefieren tercera persona - verifica con profesor. EVITA: Lenguaje emotivo excesivo ("horrible", "maravilloso"), ataques personales, sarcasmo.',
        tips: [
          'Reemplaza "Yo creo/pienso" con "Este análisis sugiere" o "Evidencia demuestra"',
          'Test: ¿Usarías este lenguaje en conversación casual? Si sí, probablemente es muy informal',
          'Pasión está bien (muestra interés en tema), pero debe estar respaldada por evidencia, no solo emoción'
        ]
      },
      {
        number: 9,
        title: 'Revisa Específicamente Para Lógica y Coherencia',
        description: 'REVISIÓN DE ARGUMENTACIÓN (no solo gramática): (1) ¿TESIS es clara y argumentable? (2) ¿Cada párrafo de cuerpo APOYA tesis directamente? (3) ¿Evidencia RESPALDA cada argumento? (4) ¿Tu ANÁLISIS conecta evidencia con argumento? (5) ¿TRANSICIONES muestran conexiones lógicas? (6) ¿CONTRAARGUMENTO está refutado efectivamente? (7) ¿CONCLUSIÓN refleja contenido del ensayo? TÉCNICA: Lee solo topic sentences de todos los párrafos - deberían formar outline lógico y coherente. Si outline no tiene sentido, estructura necesita revisión.',
        tips: [
          'Pide a alguien leer solo tu introducción y conclusión - ¿Entienden tu argumento? Si no, revisa',
          'Verifica causalidad: ¿Asumes conexión causa-efecto sin probarla? Demuéstrala',
          'Busca falacias lógicas: ad hominem, falsa dicotomía, generalización, pendiente resbaladiza'
        ]
      },
      {
        number: 10,
        title: 'Verifica Que Evidencia Es Creíble y Relevante',
        description: 'EVALUACIÓN DE FUENTES: (1) AUTORIDAD: ¿Autor tiene credenciales en el tema? ¿Publicado en journal revisado por pares? (2) ACTUALIDAD: ¿Cuán reciente? (Para temas que cambian rápido, prefiere últimos 3-5 años). (3) OBJETIVIDAD: ¿Fuente tiene agenda obvia/bias? (4) RELEVANCIA: ¿Evidencia apoya directamente TU punto específico? CITAS: Cada argumento principal necesita evidencia. NO bases argumento solo en opinión personal. BALANCE: Prefiere fuentes académicas (journals, libros universitarios) sobre blogs, Wikipedia, medios populares. MÍNIMO: Ensayo de 5 páginas típicamente necesita 5-7 fuentes diferentes.',
        tips: [
          'Usa Google Scholar para encontrar fuentes académicas, no solo Google regular',
          'Verifica credenciales de autor: ¿PhD en campo relevante? ¿Afiliación universitaria?',
          'Si evidencia contradice tu argumento, NO la ignores - ajusta tu argumento o explica la discrepancia'
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: 'Tesis vaga que no toma posición clara ("IA tiene pros y contras")',
        solution: 'Tesis debe argumentar posición específica: "Aunque IA ofrece beneficios, universidades deben regular su uso debido a X, Y, Z." Lector debe saber exactamente qué argumentas.'
      },
      {
        mistake: 'Párrafos de cuerpo que solo presentan evidencia sin análisis propio',
        solution: 'Después de CADA cita/estadística, agrega 2-3 oraciones de TU análisis explicando POR QUÉ esa evidencia apoya tu argumento. Análisis debe ser 50%+ del párrafo.'
      },
      {
        mistake: 'Ignorar contraargumentos completamente',
        solution: 'Incluye 1 párrafo que reconoce objeción principal a tu argumento, luego refútala. Demuestra pensamiento crítico y fortalece tu posición al abordar preocupaciones previsibles.'
      },
      {
        mistake: 'Conclusión que solo copia-pega tesis e introducción',
        solution: 'Reformula tesis con palabras diferentes, sintetiza (no repite) argumentos, agrega cierre poderoso que responde "¿Por qué importa?" o propone acción/reflexión.'
      },
      {
        mistake: 'Usar lenguaje absoluto ("siempre", "nunca", "todos") sin matices',
        solution: 'Académicos evitan absolutos. Usa: "frecuentemente", "en muchos casos", "la mayoría". Reconoce excepciones cuando existen - muestra pensamiento sofisticado.'
      }
    ],
    faqs: [
      {
        question: '¿Cuánto debe medir cada sección del ensayo argumentativo?',
        answer: 'PROPORCIONES APROXIMADAS (para ensayo de 1000 palabras): INTRODUCCIÓN: 100-150 palabras (10-15%). CADA PÁRRAFO DE CUERPO: 150-200 palabras. Si tienes 3 argumentos = 450-600 palabras total cuerpo (60-70%). CONTRAARGUMENTOS: 100-150 palabras (10%). CONCLUSIÓN: 100-150 palabras (10-15%). PRINCIPIO: Cuerpo debe ser sección más larga (mayoría del ensayo). Intro y conclusión son importantes pero relativamente breves. FLEXIBILIDAD: Estas son guías, no reglas absolutas.'
      },
      {
        question: '¿Puedo usar "yo" en ensayo argumentativo?',
        answer: 'DEPENDE de disciplina y preferencia del profesor. HUMANIDADES/CIENCIAS SOCIALES: Frecuentemente permiten primera persona ("yo argumento", "mi análisis"). STEM/NEGOCIOS: Generalmente prefieren tercera persona ("este análisis sugiere", "la evidencia demuestra"). PREGUNTA A TU PROFESOR o revisa rúbrica/syllabus. SI USAS PRIMERA PERSONA: Hazlo con propósito, no excesivamente ("yo pienso" cada oración es débil). ALTERNATIVA: "Este ensayo argumenta", "El análisis presentado demuestra".'
      },
      {
        question: '¿Dónde van los contraargumentos - antes o después de mis argumentos?',
        answer: 'DOS OPCIONES VÁLIDAS: OPCIÓN A (más común): DESPUÉS de tus argumentos, ANTES de conclusión. Estableces tu caso primero, luego abordas objeciones. OPCIÓN B: Presenta contraargumento TEMPRANO (después de intro), luego construyes tu caso refutándolo progresivamente. Útil si contraargumento es muy conocido. EVITA: Contraargumento en conclusión (deja impresión negativa) o ignorar contraargumentos completamente. LONGITUD: 1 párrafo típicamente suficiente, máximo 2 para contraargumentos muy complejos.'
      },
      {
        question: '¿Qué diferencia hay entre ensayo argumentativo y ensayo persuasivo?',
        answer: 'TÉRMINOS FRECUENTEMENTE INTERCAMBIABLES en contexto académico, pero diferencia sutil: ENSAYO ARGUMENTATIVO: Énfasis en lógica, evidencia objetiva, razonamiento. Apela a intelecto del lector. Tono académico, formal. ENSAYO PERSUASIVO: Puede usar emoción, narrativas personales, apelaciones éticas (además de lógica). Apela a múltiples dimensiones. Puede ser más creativo. EN UNIVERSIDAD: Mayoría de profesores usan términos intercambiablemente y esperan ensayo argumentativo académico (basado en evidencia, lógica). Verifica con tu profesor si hay distinción específica que quieren.'
      },
      {
        question: '¿Cuántas fuentes necesito para ensayo argumentativo?',
        answer: 'REGLA APROXIMADA: 1-2 fuentes por página escrita. EJEMPLOS: Ensayo de 3-5 páginas: 5-7 fuentes. Ensayo de 8-10 páginas: 10-15 fuentes. CALIDAD > CANTIDAD: Mejor tener 5 fuentes excelentes (journals académicos, libros universitarios) que 15 fuentes débiles (blogs, Wikipedia). TIPOS: Mezcla tipos de evidencia - estudios empíricos, análisis teóricos, datos estadísticos, expertos reconocidos. VERIFICACIÓN: ¿Cada argumento principal tiene al menos 1 fuente respaldándolo? Si no, necesitas más investigación o argumento es solo opinión.'
      }
    ],
    relatedGuides: [
      { title: 'Cómo Escribir Ensayos Originales', slug: 'como-escribir-ensayos-originales' },
      { title: 'Cómo Mejorar Escritura Académica', slug: 'como-mejorar-escritura-academica' },
      { title: 'Cómo Hacer Bibliografía en Formato APA', slug: 'como-hacer-bibliografia-apa' }
    ],
    relatedTools: [
      { name: 'Detector de IA Gratis', url: '/?ref=guia-ensayo-argumentativo' },
      { name: 'Parafrasear Textos Online', url: '/parafrasear-textos-online-gratis?ref=guia-ensayo-argumentativo' }
    ],
    cta: {
      text: 'Verificar originalidad de ensayo',
      url: '/?ref=guia-ensayo-argumentativo'
    }
  }
];
