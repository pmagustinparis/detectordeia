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
  },

  {
    slug: 'como-investigar-fuentes-academicas',
    title: 'Cómo Investigar y Encontrar Fuentes Académicas Confiables',
    keywords: [
      'como investigar fuentes academicas',
      'encontrar fuentes confiables',
      'buscar articulos academicos',
      'fuentes academicas confiables',
      'como investigar para ensayos'
    ],
    metaTitle: 'Cómo Investigar Fuentes Académicas Confiables: Guía 2025',
    metaDescription: 'Aprende a investigar y encontrar fuentes académicas confiables. Google Scholar, bases de datos, evaluación de credibilidad. Guía para estudiantes.',
    h1: 'Cómo Investigar y Encontrar Fuentes Académicas Confiables',
    intro: 'Investigación efectiva NO es simplemente "googlear" tema y usar primeros resultados. Fuentes académicas confiables (journals revisados por pares, libros universitarios, estudios empíricos) son fundamentales para ensayos de calidad. Diferencia entre usar Wikipedia/blogs vs journals académicos puede significar diferencia entre nota aprobatoria y excelente. Esta guía paso a paso enseña dónde buscar fuentes académicas (Google Scholar, bases de datos universitarias), cómo evaluar credibilidad de fuentes, estrategias de búsqueda efectivas, cómo acceder a artículos detrás de paywalls, y cómo organizar investigación eficientemente.',
    overview: 'Esta guía cubre: (1) Dónde buscar fuentes académicas, (2) Cómo usar Google Scholar efectivamente, (3) Evaluación de credibilidad de fuentes, (4) Estrategias de búsqueda avanzada, (5) Organización de investigación.',
    steps: [
      {
        number: 1,
        title: 'Empieza con Google Scholar (No Google Regular)',
        description: 'GOOGLE SCHOLAR (scholar.google.com): Motor de búsqueda ESPECÍFICO para literatura académica. Indexa journals, libros académicos, tesis, conferencias. BENEFICIOS vs Google regular: (1) Solo fuentes académicas (filtra blogs, Wikipedia, contenido comercial), (2) Muestra citaciones (cuántas veces artículo fue citado = indicador de influencia), (3) Enlaces a PDFs gratuitos cuando disponibles, (4) "Cited by" permite seguir cadena de investigación. CÓMO USAR: Busca término clave → Resultados muestran artículos más relevantes/citados primero → Click "[PDF]" si disponible o "All X versions" para encontrar versión accesible.',
        tips: [
          'Configura Google Scholar con tu universidad: Settings → Library links → Agrega tu universidad (acceso a suscripciones)',
          'Usa filtro de fecha: Tools → Desde 2020 (para investigación actual)',
          'Busca "Cited by" para encontrar investigación más reciente que cita el artículo original'
        ]
      },
      {
        number: 2,
        title: 'Usa Bases de Datos Especializadas de Tu Universidad',
        description: 'BASES DE DATOS PRINCIPALES: (1) JSTOR (humanidades, ciencias sociales), (2) PubMed (medicina, ciencias de la salud), (3) IEEE Xplore (ingeniería, tecnología), (4) PsycINFO (psicología), (5) EBSCOhost (multidisciplinario), (6) ProQuest (tesis, disertaciones). ACCESO: Biblioteca universitaria → Bases de datos → Busca por disciplina o nombre. VENTAJA vs Google Scholar: Artículos completos disponibles (universidad paga suscripciones), búsqueda más refinada por disciplina, menos "ruido" (solo contenido académico de calidad).',
        tips: [
          'Pregunta a bibliotecario cuáles bases de datos son mejores para tu disciplina específica',
          'Acceso remoto: Usa VPN universitaria o proxy para acceder desde casa',
          'Muchas bases permiten crear alertas - te notifican cuando se publica nuevo contenido sobre tu tema'
        ]
      },
      {
        number: 3,
        title: 'Aprende Búsqueda Avanzada con Operadores Booleanos',
        description: 'OPERADORES BOOLEANOS: Refinan búsquedas para resultados precisos. (1) AND: Ambos términos deben aparecer. "inteligencia artificial" AND "educación superior" = solo artículos que mencionan AMBOS. (2) OR: Cualquiera de los términos. "universidad" OR "college" = artículos con cualquier término. (3) NOT: Excluye término. "IA" NOT "medicina" = IA pero no en contexto médico. (4) Comillas "": Frase exacta. "pensamiento crítico" = esas palabras juntas, en ese orden. (5) Asterisco *: Comodín. "educat*" = education, educational, educator. COMBINACIONES: ("inteligencia artificial" OR "IA") AND (universidad* OR college*) AND ética.',
        tips: [
          'Paréntesis agrupan operadores: (A OR B) AND C es diferente de A OR B AND C',
          'Prueba múltiples combinaciones - primera búsqueda rara vez es óptima',
          'Si obtienes demasiados resultados (1000+), agrega más términos específicos con AND'
        ]
      },
      {
        number: 4,
        title: 'Evalúa Credibilidad con Criterio CRAAP',
        description: 'CRITERIO CRAAP (Currency-Relevance-Authority-Accuracy-Purpose): (1) CURRENCY (Actualidad): ¿Cuán reciente? Para tecnología/ciencia: últimos 3-5 años. Para historia/filosofía: más flexible. (2) RELEVANCE (Relevancia): ¿Apoya directamente tu argumento? ¿Nivel apropiado (no muy técnico ni muy simple)? (3) AUTHORITY (Autoridad): ¿Autor tiene credenciales (PhD, afiliación universitaria)? ¿Publicado en journal revisado por pares? (4) ACCURACY (Precisión): ¿Cita fuentes? ¿Metodología clara? ¿Revisado por pares? (5) PURPOSE (Propósito): ¿Objetivo es informar/educar? ¿O vender/persuadir con agenda obvia? VERIFICACIÓN: Fuente debe pasar 4-5/5 criterios para ser confiable.',
        tips: [
          'Verifica autor en Google - ¿Tiene otros artículos académicos? ¿Afiliación universitaria?',
          'Journal revisado por pares > libro académico > capítulo editado > blog de experto > sitio web general',
          'Si fuente tiene agenda política/comercial obvia, úsala con precaución o busca fuente más neutral'
        ]
      },
      {
        number: 5,
        title: 'Identifica Journals Revisados Por Pares (Peer-Reviewed)',
        description: 'PEER-REVIEWED (revisión por pares): Artículos evaluados por expertos en el campo ANTES de publicación = garantía de calidad. CÓMO IDENTIFICAR: (1) Búsqueda en Ulrichsweb (ulrichsweb.com) - indica si journal es peer-reviewed, (2) Página del journal dice "peer-reviewed" o "refereed", (3) Google Scholar filtra por tipo (en Settings → Advanced search → Return articles authored by), (4) Base de datos universitaria frecuentemente tiene filtro "peer-reviewed". SEÑALES: Artículos largos (8+ páginas), referencias extensas, metodología detallada, lenguaje técnico. NO PEER-REVIEWED: Revistas populares (Time, Forbes), blogs, Wikipedia, sitios de noticias.',
        tips: [
          'No todos los artículos en journal peer-reviewed son peer-reviewed (editoriales, cartas no lo son)',
          'Pregunta a profesor: "¿Necesito solo fuentes peer-reviewed?" - algunos permiten mezcla',
          'Para proyectos avanzados (tesis, capstone), prefiere journals con alto "impact factor"'
        ]
      },
      {
        number: 6,
        title: 'Accede a Artículos Detrás de Paywalls Legalmente',
        description: 'MÉTODOS LEGALES: (1) ACCESO UNIVERSITARIO: Usa proxy/VPN de universidad - mayoría de journals están incluidos en suscripción. (2) GOOGLE SCHOLAR: Click "All versions" - frecuentemente encuentra PDF en repositorio universitario del autor (legal). (3) RESEARCHGATE / ACADEMIA.EDU: Autores suben sus artículos (legal si autor lo comparte). (4) EMAIL AL AUTOR: Busca email del autor, pide copia - mayoría responden positivamente. (5) INTERLIBRARY LOAN: Biblioteca solicita artículo de otra biblioteca. (6) OPEN ACCESS JOURNALS: Muchos journals son gratis (PLOS ONE, arXiv). EVITA: Sci-Hub (ilegal en muchos países, violaciones de copyright).',
        tips: [
          'Email a autor: "Estimado Dr. García, soy estudiante trabajando en X. ¿Podría compartir su artículo Y?" - tasa de respuesta alta',
          'Browser extension "Unpaywall" automáticamente busca versiones legales gratuitas',
          'Muchas universidades pagan por "instant article delivery" - artículo llega en 24-48 horas'
        ]
      },
      {
        number: 7,
        title: 'Usa "Snowballing" Para Encontrar Más Fuentes',
        description: 'SNOWBALLING (bola de nieve): Técnica para expandir investigación usando fuentes existentes. DOS DIRECCIONES: (1) BACKWARD SNOWBALLING: Lee Referencias de artículo útil → Busca fuentes citadas más relevantes → Léelas → Repite. (2) FORWARD SNOWBALLING: En Google Scholar, click "Cited by X" en artículo útil → Ve artículos MÁS RECIENTES que citan este → Encuentra investigación actual. BENEFICIO: Encuentras fuentes que autores expertos consideran importantes = mayor probabilidad de ser relevantes/confiables. PROCESO: 1 artículo clave → 10 fuentes en Referencias → 5 relevantes → 20 fuentes adicionales → Repite.',
        tips: [
          'Empieza con 2-3 artículos clave muy relevantes - snowballing desde ahí',
          'Review articles (artículos de revisión) son GOLD - resumen campo completo, citan 50-100+ fuentes',
          'Sigue cadena de citación 2-3 niveles profundo, no más (puedes perderte en tangentes)'
        ]
      },
      {
        number: 8,
        title: 'Organiza Investigación con Gestor de Referencias',
        description: 'HERRAMIENTAS: (1) ZOTERO (recomendado para estudiantes - gratis, open source), (2) MENDELEY (gratis), (3) ENDNOTE (pago, institucional). PROCESO: (1) Instala extensión browser, (2) Al encontrar artículo útil, click en extensión → Guarda automáticamente en biblioteca, (3) Agrega notas, tags, organiza en carpetas por tema/proyecto, (4) Cuando escribes ensayo, insertas citas con plugin → Genera bibliografía automáticamente. BENEFICIO: Nunca pierdes track de fuentes, ahorras horas formateando referencias, acceso a PDFs desde un lugar, sincroniza entre dispositivos.',
        tips: [
          'Agrega notas MIENTRAS lees artículo: "Argumento principal: X", "Útil para sección Y de mi ensayo"',
          'Usa tags/etiquetas para categorizar: #metodología, #contraargumento, #estadísticas-clave',
          'Backup regular - exporta biblioteca como archivo (en caso de que pierdas acceso a cuenta)'
        ]
      },
      {
        number: 9,
        title: 'Lee Estratégicamente (No Necesitas Leer Todo Completo)',
        description: 'LECTURA ESTRATÉGICA: Artículos académicos son densos - no necesitas leer palabra por palabra. PROCESO: (1) ABSTRACT (resumen): 2 min - ¿Es relevante? (2) INTRODUCCIÓN + CONCLUSIÓN: 5 min - ¿Argumento principal apoya tu punto? (3) METHODOLOGY: Solo si es estudio empírico - ¿Metodología es sólida? (4) FIGURAS/TABLAS: Frecuentemente muestran hallazgos clave visualmente. (5) LECTURA PROFUNDA: Solo secciones directamente relevantes. SEÑALES DE IRRELEVANCIA: Si después de abstract + intro no ves conexión clara con tu tema, descarta y busca siguiente. OBJETIVO: Identificar 5-7 fuentes REALMENTE útiles, no acumular 30 que no leerás.',
        tips: [
          'Ctrl+F términos clave en PDF - encuentra secciones relevantes rápidamente',
          'Lee "Discussion" section de estudios empíricos - autores interpretan hallazgos (útil para entender implicaciones)',
          'Si artículo es muy técnico, busca "review article" sobre mismo tema (más accesible)'
        ]
      },
      {
        number: 10,
        title: 'Verifica Que Tienes Balance y Diversidad de Fuentes',
        description: 'BALANCE: Ensayo fuerte usa MEZCLA de tipos de evidencia. TIPOS: (1) ESTUDIOS EMPÍRICOS: Investigación con datos/experimentos (muy fuerte). (2) TEORÍA/ANÁLISIS: Argumentos conceptuales de expertos. (3) REVISIONES SISTEMÁTICAS: Resumen múltiples estudios (muy útiles para overview). (4) DATOS ESTADÍSTICOS: Census, informes gubernamentales, organizaciones internacionales. DIVERSIDAD: No uses solo 1 autor o 1 journal - muestra que investigaste ampliamente. VERIFICACIÓN: ¿Todas tus fuentes apoyan tu argumento? Si sí, busca perspectivas contrarias (contraargumentos) - fortalece credibilidad.',
        tips: [
          'Regla 50-70-100: Mínimo 50% estudios empíricos, 70% últimos 5 años, 100% académicos',
          'Si encuentras 10 estudios que dicen lo mismo, no cites todos - cita 2-3 mejores',
          'Incluye 1-2 fuentes que NO están completamente de acuerdo contigo - úsalas para contraargumento'
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: 'Usar solo Google regular y confiar en Wikipedia/blogs como fuentes principales',
        solution: 'USA Google Scholar y bases de datos universitarias. Wikipedia OK para entender básicos, pero cita fuentes ACADÉMICAS (journals, libros universitarios) en ensayo.'
      },
      {
        mistake: 'Tomar primer 5 resultados de búsqueda sin evaluar credibilidad',
        solution: 'Aplica criterio CRAAP a cada fuente: ¿Autor tiene credenciales? ¿Publicado en journal peer-reviewed? ¿Reciente? ¿Relevante? Descarta fuentes débiles.'
      },
      {
        mistake: 'Intentar leer cada artículo completo palabra por palabra',
        solution: 'Lee estratégicamente: Abstract + Intro + Conclusión primero. Lee profundo solo secciones directamente relevantes. Objetivo es encontrar información útil, no leer todo.'
      },
      {
        mistake: 'No organizar fuentes - perder track de dónde encontraste qué',
        solution: 'Usa gestor de referencias (Zotero) desde INICIO de investigación. Agrega notas sobre por qué cada fuente es útil mientras investigas.'
      },
      {
        mistake: 'Usar solo fuentes que apoyan tu argumento, ignorar evidencia contraria',
        solution: 'Busca activamente perspectivas contrarias - fortalece ensayo al mostrar que consideraste múltiples ángulos. Usa evidencia contraria para contraargumento.'
      }
    ],
    faqs: [
      {
        question: '¿Cuántas fuentes necesito para mi ensayo?',
        answer: 'REGLA APROXIMADA: 1-2 fuentes por página escrita. EJEMPLOS: Ensayo 3-5 páginas: 5-7 fuentes. Ensayo 8-10 páginas: 10-15 fuentes. PERO: Calidad > cantidad. Mejor 5 fuentes excelentes (journals peer-reviewed, estudios empíricos recientes) que 15 fuentes débiles. TIPOS: Mezcla tipos - no uses 10 artículos del mismo journal o mismo autor. VERIFICACIÓN: ¿Cada argumento principal tiene al menos 1-2 fuentes respaldándolo? Si no, necesitas más investigación.'
      },
      {
        question: '¿Puedo usar fuentes que tienen más de 10 años?',
        answer: 'DEPENDE de disciplina y tema. TEMAS QUE CAMBIAN RÁPIDO (tecnología, medicina, ciencias sociales): Prefiere últimos 3-5 años. TEMAS ESTABLES (historia, filosofía, teoría clásica): Fuentes más antiguas OK. FUENTES SEMINALES: Estudios clásicos/fundacionales pueden ser antiguos pero siguen siendo relevantes (ej: teorías de Piaget en psicología). BALANCE: Mayoría de fuentes recientes (70%+), algunas clásicas/históricas si relevantes (30%). VERIFICA: Si usas fuente de 2010, ¿hay investigación más reciente que la actualiza/refuta?'
      },
      {
        question: '¿Cómo sé si journal es confiable o "predatorio"?',
        answer: 'JOURNALS PREDATORIOS: Publican cualquier cosa sin revisión por pares real (cobran a autores por publicar). SEÑALES DE ALARMA: (1) Email spam invitándote a publicar, (2) Prometen publicación rápida (días/semanas), (3) Nombre genérico similar a journal legítimo, (4) No aparece en bases de datos reconocidas (JSTOR, PubMed), (5) No lista proceso de peer review. VERIFICACIÓN: Busca journal en Ulrichsweb o Directory of Open Access Journals (DOAJ). PREGUNTA: A bibliotecario o profesor "¿Conoces este journal?" CONSEJO: Si duda, usa journal establecido con años de historia y alto impact factor.'
      },
      {
        question: '¿Qué hago si no encuentro fuentes sobre mi tema específico?',
        answer: 'ESTRATEGIAS: (1) AMPLÍA búsqueda: Términos más generales. Ej: "IA en universidades argentinas" → "IA en educación superior latinoamericana". (2) BUSCA temas RELACIONADOS: Investigación sobre tema similar puede aplicar. (3) USA SINÓNIMOS: "inteligencia artificial", "IA", "machine learning", "aprendizaje automatizado". (4) CAMBIA idioma búsqueda: Busca en inglés (más investigación disponible). (5) CONTACTA EXPERTO: Profesor o investigador en campo puede sugerir fuentes. (6) CONSIDERA ajustar tema: Si genuinamente no hay investigación, quizás tema es demasiado específico o nuevo.'
      },
      {
        question: '¿Puedo usar videos de YouTube, podcasts, o TikTok como fuentes?',
        answer: 'DEPENDE de contenido y política del profesor. VIDEOS ACADÉMICOS (conferencias TED, charlas universitarias, documentales educativos): Frecuentemente OK como fuente COMPLEMENTARIA. VIDEOS CASUALES/OPINIÓN: Generalmente NO para ensayos académicos. CÓMO USAR: (1) Verifica si creador tiene credenciales (profesor, experto reconocido), (2) Úsalos como fuentes SECUNDARIAS (no principales), (3) Balance: Máximo 10-20% de tus fuentes deben ser multimedia. (4) CITA correctamente en APA 7 (incluye [Video], [Podcast], etc.). PREGUNTA primero: ¿Profesor permite fuentes multimedia? Algunos solo permiten texto académico tradicional.'
      }
    ],
    relatedGuides: [
      { title: 'Cómo Evitar Plagio Académico', slug: 'como-evitar-plagio-academico' },
      { title: 'Cómo Hacer Bibliografía en Formato APA', slug: 'como-hacer-bibliografia-apa' },
      { title: 'Cómo Escribir Ensayos Originales', slug: 'como-escribir-ensayos-originales' }
    ],
    relatedTools: [
      { name: 'Detector de IA Gratis', url: '/?ref=guia-investigar-fuentes' },
      { name: 'Parafrasear Textos Online', url: '/parafrasear-textos-online-gratis?ref=guia-investigar-fuentes' }
    ],
    cta: {
      text: 'Verificar originalidad de investigación',
      url: '/?ref=guia-investigar-fuentes'
    }
  },

  {
    slug: 'como-gestionar-tiempo-proyectos-academicos',
    title: 'Cómo Gestionar Tiempo y Proyectos Académicos',
    keywords: [
      'como gestionar tiempo universidad',
      'gestion tiempo estudiantes',
      'organizar proyectos academicos',
      'como organizarse en universidad',
      'productividad academica'
    ],
    metaTitle: 'Cómo Gestionar Tiempo y Proyectos Académicos: Guía 2025',
    metaDescription: 'Aprende a gestionar tiempo y proyectos académicos efectivamente. Planificación, priorización, técnicas de productividad. Guía para estudiantes.',
    h1: 'Cómo Gestionar Tiempo y Proyectos Académicos: Guía Completa',
    intro: 'Gestión de tiempo efectiva NO es cuestión de trabajar más horas - es trabajar más inteligentemente. Estudiantes frecuentemente sienten abrumados por múltiples deadlines, pero problema rara vez es falta de tiempo sino falta de planificación y priorización. Diferencia entre estudiante estresado que entrega trabajos de última hora vs estudiante organizado que trabaja sin pánico es sistema de gestión, no inteligencia o capacidad. Esta guía paso a paso enseña técnicas probadas de gestión de tiempo: planificación inversa desde deadlines, matriz de priorización, técnica Pomodoro, prevención de procrastinación, balance entre múltiples proyectos.',
    overview: 'Esta guía cubre: (1) Planificación de proyectos académicos, (2) Priorización de tareas, (3) Técnicas de productividad, (4) Prevención de procrastinación, (5) Balance y evitar burnout.',
    steps: [
      {
        number: 1,
        title: 'Planifica Desde Deadline Hacia Atrás (Backward Planning)',
        description: 'BACKWARD PLANNING: Empieza con fecha límite, trabaja hacia atrás asignando tareas. PROCESO: (1) Identifica deadline (ej: Ensayo due 15 de marzo), (2) Resta 2-3 días buffer (fecha real: 12 de marzo), (3) Divide proyecto en fases: Investigación (3 días), Outline (1 día), Primer borrador (3 días), Revisión (2 días), Edición final (1 día) = 10 días total, (4) Cuenta hacia atrás: Inicio debe ser 2 de marzo. CALENDARIO: Marca cada fase en calendario. BENEFICIO: Visualizas exactamente cuánto tiempo necesitas, previene pánico de última hora, crea accountability.',
        tips: [
          'Buffer de 2-3 días es CRÍTICO - siempre surgen imprevistos (enfermarte, problema técnico)',
          'Divide tareas grandes en subtareas diarias manejables: "Investigar" → "Encontrar 5 fuentes día 1, Leer día 2"',
          'Usa calendario digital (Google Calendar) con recordatorios - notificación 1 día antes de cada fase'
        ]
      },
      {
        number: 2,
        title: 'Prioriza con Matriz de Eisenhower (Urgente vs Importante)',
        description: 'MATRIZ 2x2: Clasifica tareas en 4 cuadrantes. CUADRANTE 1 (Urgente + Importante): Hacer AHORA. Ej: Ensayo due mañana, examen en 2 días. CUADRANTE 2 (No urgente + Importante): PLANIFICAR/PROGRAMAR. Ej: Ensayo due en 3 semanas, estudiar para examen del mes próximo. ESTE es más importante - trabajo aquí previene crisis. CUADRANTE 3 (Urgente + No importante): DELEGAR o minimizar. Ej: Emails, reuniones opcionales. CUADRANTE 4 (No urgente + No importante): ELIMINAR. Ej: Redes sociales, Netflix. OBJETIVO: Pasar máximo tiempo en Cuadrante 2 (planificación proactiva), mínimo en Cuadrante 1 (apagar fuegos).',
        tips: [
          'Revisa matriz cada domingo - planifica semana priorizando tareas Cuadrante 2',
          'Si mayoría de tiempo está en Cuadrante 1, estás en modo reactivo - necesitas más planificación anticipada',
          'Test: Pregúntate "Si no hago esto, ¿qué consecuencia?" Si consecuencia es seria, es importante'
        ]
      },
      {
        number: 3,
        title: 'Usa Técnica Pomodoro Para Trabajo Enfocado',
        description: 'TÉCNICA POMODORO: Trabajo en bloques de 25 min + 5 min descanso. PROCESO: (1) Elige tarea específica (ej: "Escribir introducción de ensayo"), (2) Configura timer 25 min, (3) Trabaja SIN distracciones (cierra redes sociales, notificaciones, WhatsApp), (4) Timer suena → Descanso 5 min (levántate, estira, camina), (5) Repite. Después de 4 pomodoros, descanso largo (15-30 min). BENEFICIO: 25 min es manejable (menos tentación de procrastinar), descansos previenen fatiga mental, crea urgencia artificial (timer motiva), trackea productividad (completé 6 pomodoros hoy).',
        tips: [
          'Apps: Forest (gamifica focus), Pomofocus (web gratis), Focus To-Do (integra pomodoro + lista tareas)',
          'Ajusta según capacidad: Algunos prefieren 50 min + 10 min descanso (técnica 52/17)',
          'Durante pomodoro: Si idea no relacionada surge, anótala en papel y retoma DESPUÉS del pomodoro'
        ]
      },
      {
        number: 4,
        title: 'Crea "Time Blocking" en Tu Calendario Semanal',
        description: 'TIME BLOCKING: Asigna bloques específicos de tiempo a tipos de tareas. EJEMPLO DE SEMANA: Lunes 9-11am: Clases. 11am-1pm: Bloque de escritura (trabajos). 2-4pm: Lectura/investigación. 4-5pm: Admin (emails, organizar). Martes 9-12pm: Clases. 1-3pm: Estudio individual. 3-5pm: Proyecto X. BENEFICIO: Elimina decisión diaria "¿qué hago ahora?" (ya está decidido), crea rutina, protege tiempo para trabajo profundo. TIPOS DE BLOQUES: (1) Bloques de trabajo profundo (sin distracciones, tareas complejas), (2) Bloques de admin (emails, organizar, tareas mecánicas), (3) Bloques de descanso (ejercicio, socializar, hobbies).',
        tips: [
          'Respeta bloques como compromisos reales - no canceles "bloque de escritura" por Netflix',
          'Bloquea trabajo profundo en TUS horas más productivas (mañana vs noche - depende de ti)',
          'Deja 20-30% de semana sin bloquear - para imprevistos, flexibilidad'
        ]
      },
      {
        number: 5,
        title: 'Previene Procrastinación con "Regla de 2 Minutos"',
        description: 'REGLA DE 2 MINUTOS: Si tarea toma <2 minutos, hazla INMEDIATAMENTE. No postergues. Ej: Responder email simple, agregar fecha a calendario, guardar lectura en Zotero. BENEFICIO: Previene acumulación de microtareas que generan estrés mental. PARA TAREAS GRANDES: Aplica variación - "empieza por 2 minutos". Ej: No quieres empezar ensayo → "Solo abriré documento y escribiré título" (2 min). Frecuentemente, empezar es parte más difícil - después de 2 min, momentum hace que continúes. TRUCO: Rompe inercia inicial con tarea ridículamente pequeña (abrir archivo = éxito).',
        tips: [
          'Identifica tu patrón de procrastinación: ¿Pospones tareas aburridas? ¿Difíciles? ¿Vagas? Adapta estrategia',
          'Usa "productive procrastination": Si no quieres hacer tarea A, haz tarea B (ambas productivas)',
          'Elimina fricción: Si procrastinas estudiar porque buscar materiales es tedioso, prepara materiales ANTES'
        ]
      },
      {
        number: 6,
        title: 'Establece "Deadline Personales" Antes de Deadlines Reales',
        description: 'DEADLINE PERSONAL: Fecha límite propia 2-3 días antes de deadline real. EJEMPLO: Ensayo due viernes 11:59pm → Tu deadline personal: miércoles 11:59pm. BENEFICIO: (1) Buffer para imprevistos (enfermarte, problema técnico, fecha que olvidaste), (2) Tiempo para revisión calmada (vs editar frenéticamente 1 hora antes), (3) Opción de pedir feedback preliminar a profesor/compañero, (4) Reduces estrés - trabajas sin pánico. IMPLEMENTACIÓN: En calendario, marca deadline personal en ROJO, deadline real en amarillo. Trata deadline personal como si fuera real.',
        tips: [
          'Comunica deadline personal a amigo/compañero - accountability externo aumenta cumplimiento',
          'Si consistentemente cumples deadlines personales, acorta buffer (3 días → 2 días)',
          'Para proyectos grupales, propón deadline de grupo 3-4 días antes de real (compensa retrasos)'
        ]
      },
      {
        number: 7,
        title: 'Gestiona Energía, No Solo Tiempo (Match Tasks to Energy)',
        description: 'PRINCIPIO: No todas las horas son iguales - productividad depende de nivel de energía. ALTA ENERGÍA (típicamente mañana para mayoría): Tareas complejas que requieren pensamiento profundo - escribir secciones clave de ensayo, resolver problemas difíciles, aprender conceptos nuevos. ENERGÍA MEDIA (típicamente tarde): Tareas moderadas - investigar, leer artículos, revisar notas. BAJA ENERGÍA (típicamente noche): Tareas mecánicas - formatear bibliografía, organizar archivos, responder emails simples. ESTRATEGIA: Track tu energía por 1 semana - identifica patrones - programa tareas según nivel de energía.',
        tips: [
          'No fuerces trabajo creativo/complejo cuando energía está baja - resultados son pobres',
          'Triggers de energía: Ejercicio, luz natural, descanso adecuado, hidratación, comida balanceada',
          'Si energía cae a media tarde, toma "power nap" (20 min) o camina 10 min - recarga significativa'
        ]
      },
      {
        number: 8,
        title: 'Usa Sistema de Listas: Master List + Lista Diaria',
        description: 'DOS LISTAS: (1) MASTER LIST: Todo lo que necesitas hacer eventualmente (ensayos, proyectos, lecturas, admin). Vive en app/cuaderno, actualizas constantemente. (2) LISTA DIARIA: 3-5 tareas específicas para HOY (extraídas de master list). PROCESO DIARIO: Cada mañana (o noche anterior), revisa master list → Elige 3-5 tareas más importantes/urgentes → Crea lista diaria → Enfócate SOLO en esas tareas. BENEFICIO: Master list previene olvidos, lista diaria previene overwhelm (no ves 50 tareas pendientes, solo 3-5 de hoy). SATISFACCIÓN: Completar lista diaria genera sensación de logro.',
        tips: [
          'Formato lista diaria: #1 Most Important Task (MIT) - si solo completas 1, debe ser esta',
          'Apps: Todoist, Microsoft To Do, Things, o simple papel y lápiz (satisfacción de tachar)',
          'No agregues tareas a lista diaria durante el día - si surge algo urgente, reemplaza (no agregues indefinidamente)'
        ]
      },
      {
        number: 9,
        title: 'Programa Descansos y Tiempo Libre Explícitamente',
        description: 'ERROR COMÚN: Trabajar "hasta terminar", sin descansos programados → Agotamiento, productividad cae, burnout. SOLUCIÓN: PROGRAMA descansos como programas trabajo. DESCANSOS CORTOS: Cada 1-2 horas, 10-15 min (camina, estira, snack). DESCANSOS LARGOS: Almuerzo 30-60 min lejos de escritorio. DÍA LIBRE: Mínimo 1 día completo/semana SIN trabajo académico (recarga mental). ACTIVIDADES DE RECARGA: Ejercicio, socializar, hobbies, dormir adecuado (7-9 horas). PRINCIPIO: Descanso NO es pérdida de tiempo - es inversión en productividad futura.',
        tips: [
          'Marca día libre en calendario como "compromiso" - no lo canceles por trabajo académico',
          'Señal de burnout: Constantemente cansado, motivación baja, trabajo toma 2x más tiempo. Solución: Descanso, no más trabajo',
          'Balance: Semester tiene ritmo - semanas de exámenes requieren más trabajo, pero DESPUÉS descansa'
        ]
      },
      {
        number: 10,
        title: 'Revisa y Ajusta Sistema Semanalmente (Weekly Review)',
        description: 'WEEKLY REVIEW: Cada domingo (o viernes), 30-60 min para revisar semana pasada y planificar próxima. PROCESO: (1) REVISAR: ¿Qué completé esta semana? ¿Qué quedó pendiente? ¿Por qué? (2) REFLEXIONAR: ¿Qué funcionó bien? ¿Qué puedo mejorar? ¿Subestimé tiempo para alguna tarea? (3) PLANIFICAR: Próxima semana - ¿Qué deadlines? ¿Qué tareas priorizar? Calendario de time blocking. (4) ACTUALIZAR: Master list, calendario, metas. BENEFICIO: Visibilidad de progreso (motivador), ajustes constantes previenen problemas grandes, sensación de control.',
        tips: [
          'Usa misma hora/lugar cada semana - crea ritual (ej: domingo 6pm con café)',
          'Celebra logros - no solo focuses en lo que falta. "Completé ensayo" = éxito, no solo "falta revisar"',
          'Pregunta clave: "Si repitiera esta semana, ¿qué haría diferente?" - aprende de experiencia'
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: 'Empezar proyectos demasiado cerca del deadline (1-2 días antes)',
        solution: 'Usa backward planning - empieza proyectos 2-3 semanas antes de deadline. Divide en fases diarias. Buffer de 2-3 días previene pánico si surgen problemas.'
      },
      {
        mistake: 'Trabajar sin descansos hasta estar exhausto',
        solution: 'Programa descansos cada 1-2 horas (técnica Pomodoro). Productividad cae dramáticamente después de 2 horas sin descanso. Descanso = inversión, no pérdida de tiempo.'
      },
      {
        mistake: 'Intentar hacer multitasking (estudiar + Netflix + chat simultáneamente)',
        solution: 'Multitasking reduce productividad 40%. Focus en UNA tarea a la vez (técnica Pomodoro, time blocking). Terminas más rápido con mejor calidad.'
      },
      {
        mistake: 'No tener sistema de organización - depender de memoria',
        solution: 'Usa sistema externo: Master list + lista diaria + calendario. Cerebro es malo recordando deadlines - calendario digital con recordatorios es confiable.'
      },
      {
        mistake: 'Decir "sí" a todo - sobrecomprometerse',
        solution: 'Aprende a decir "no" o "déjame verificar mi calendario". Cada "sí" a algo nuevo es "no" a otra cosa (posiblemente más importante). Prioriza.'
      }
    ],
    faqs: [
      {
        question: '¿Cuántas horas debo estudiar por día en universidad?',
        answer: 'REGLA GENERAL: 2-3 horas de estudio FUERA de clase por cada hora EN clase. EJEMPLO: 15 horas de clase/semana → 30-45 horas estudio/semana = 4-6 horas/día (7 días) o 6-9 horas/día (5 días). PERO: Varía según dificultad de materias, tus habilidades, calidad de estudio (1 hora enfocada > 3 horas distraído). MEJOR MÉTRICA: ¿Entiendes material? ¿Completas trabajo a tiempo sin pánico? Si sí, tiempo es suficiente. Si no, aumenta. CALIDAD > CANTIDAD: 3 horas enfocadas (técnica Pomodoro) > 6 horas con distracciones.'
      },
      {
        question: '¿Cómo manejo múltiples deadlines en misma semana?',
        answer: 'ESTRATEGIA: (1) LISTA TODO: Escribe cada deadline con fecha exacta. (2) PRIORIZA: ¿Cuál vale más % de nota? ¿Cuál necesita más tiempo? (3) BACKWARD PLANNING: Para cada uno, trabaja hacia atrás asignando tiempo necesario. (4) TIME BLOCKING: Asigna bloques específicos a cada proyecto. Ej: Lunes AM: Proyecto A, Lunes PM: Proyecto B. (5) EMPIEZA temprano: 2-3 semanas antes, no 2-3 días. (6) COMUNICA: Si genuinamente imposible (3 exámenes + 2 ensayos mismo día), habla con profesores - algunos dan extensión.'
      },
      {
        question: '¿Qué hago si constantemente subestimo cuánto tiempo necesito?',
        answer: 'SOLUCIÓN: TRACK tiempo por 2 semanas. Anota tiempo estimado vs tiempo real para cada tarea. PATRÓN COMÚN: Estudiantes subestiman 50-100% (piensan 2 horas, toma 4). AJUSTE: Multiplica tu estimado x 2 (si pensabas 3 horas, programa 6). CAUSAS de subestimación: (1) Olvidas incluir tiempo de setup/distracción, (2) No considerás interrupciones, (3) Optimismo excesivo. MEJORA: Con experiencia, estimados mejoran. Data histórica ("último ensayo tomó 15 horas") es mejor que guess.'
      },
      {
        question: '¿Cómo evito burnout durante época de exámenes?',
        answer: 'PREVENCIÓN (mejor que cura): (1) EMPIEZA temprano: Estudia consistentemente durante semester, no cramming última semana. (2) DUERME 7-9 horas: Privación de sueño empeora memoria, enfoque. (3) EJERCICIO: 20-30 min/día reduce estrés significativamente. (4) COME BIEN: Comida rápida/azúcar causa crashes de energía. (5) DESCANSOS: Técnica Pomodoro, no maratones de 8 horas seguidas. SI YA ESTÁS EN BURNOUT: (1) Toma 1 día completo OFF (contraintuitivo pero recarga), (2) Pide ayuda (amigos, familia, counselor universitario), (3) Prioriza: ¿Qué puedes postponer/reducir? No todo es igualmente importante.'
      },
      {
        question: '¿Cuál es mejor app/herramienta para gestión de tiempo?',
        answer: 'NO HAY "mejor" universal - depende de tu estilo. MINIMALISTA: Papel + lápiz (bullet journal). BÁSICO DIGITAL: Google Calendar + Google Tasks (gratis, simple). AVANZADO: Notion (todo-en-uno), Todoist (listas sofisticadas), Trello (visual/kanban). ACADÉMICO: MyStudyLife (diseñado para estudiantes, track classes + tareas + exámenes). ENFOQUE: Forest, Focus@Will. PRINCIPIO: Herramienta no importa tanto como CONSISTENCIA de uso. Usa sistema que realmente usarás, no más complejo/fancy que abandones en 1 semana. PRUEBA 2-3 semanas antes de decidir.'
      }
    ],
    relatedGuides: [
      { title: 'Cómo Investigar Fuentes Académicas', slug: 'como-investigar-fuentes-academicas' },
      { title: 'Cómo Usar IA Éticamente en la Universidad', slug: 'como-usar-ia-eticamente-universidad' },
      { title: 'Cómo Evitar Plagio Académico', slug: 'como-evitar-plagio-academico' }
    ],
    relatedTools: [
      { name: 'Detector de IA Gratis', url: '/?ref=guia-gestion-tiempo' },
      { name: 'Parafrasear Textos Online', url: '/parafrasear-textos-online-gratis?ref=guia-gestion-tiempo' }
    ],
    cta: {
      text: 'Verificar calidad de trabajos',
      url: '/?ref=guia-gestion-tiempo'
    }
  },

  {
    slug: 'mejores-practicas-uso-ia-estudiantes',
    title: 'Mejores Prácticas de Uso de IA para Estudiantes',
    keywords: [
      'mejores practicas ia estudiantes',
      'como usar ia correctamente estudiantes',
      'guia ia universitarios',
      'ia estudios practicas recomendadas',
      'uso responsable ia educacion'
    ],
    metaTitle: 'Mejores Prácticas de IA para Estudiantes Universitarios 2025',
    metaDescription: 'Guía completa de mejores prácticas para usar IA en tus estudios: qué hacer, qué evitar, cómo mejorar tu rendimiento sin comprometer tu integridad académica.',
    h1: 'Mejores Prácticas de Uso de IA para Estudiantes: Guía Completa',
    intro: 'La IA es ya una herramienta cotidiana en la vida estudiantil. La pregunta no es si usarla, sino cómo usarla bien. Esta guía reúne las mejores prácticas comprobadas para que los estudiantes universitarios saquen el máximo provecho de herramientas como ChatGPT, Claude o Gemini sin poner en riesgo su integridad académica ni su aprendizaje real.',
    overview: 'Esta guía cubre: (1) Principios base del uso ético de IA, (2) Qué usos potencian tu aprendizaje, (3) Qué usos te perjudican a largo plazo, (4) Cómo documentar y declarar uso de IA, (5) Cómo mantener tu autonomía intelectual.',
    steps: [
      {
        number: 1,
        title: 'Conoce la Política de IA de Tu Institución Antes de Empezar',
        description: 'Cada universidad y cada profesor tiene una política diferente sobre IA. Antes de usar cualquier herramienta de IA en una tarea, verifica: (1) El syllabus del curso — ¿menciona IA?, (2) El código de honor académico de tu universidad, (3) Pregunta directamente al profesor si hay ambigüedad. No asumas que lo que está permitido en un curso lo está en otro.',
        tips: [
          'Guarda capturas de pantalla de las políticas como referencia',
          'Si el syllabus no menciona IA, pregunta explícitamente al profesor',
          'Las políticas cambian cada semestre — verifica al inicio de cada curso'
        ]
      },
      {
        number: 2,
        title: 'Usa IA como Tutor, No como Ghostwriter',
        description: 'La distinción más importante: IA como tutor te ayuda a APRENDER (explica conceptos, da feedback, sugiere recursos). IA como ghostwriter HACE el trabajo por ti. El primer uso desarrolla tus habilidades. El segundo las atrofia y viola la integridad académica. Pregúntate siempre: "¿Estoy aprendiendo algo con este uso de IA?" Si la respuesta es no, reconsidéralo.',
        tips: [
          'Pide a IA que te explique por qué algo es correcto, no solo que te dé la respuesta',
          'Usa IA para verificar TU trabajo, no para generar el trabajo',
          'Si IA hace el ensayo y tú solo lo copias, no aprenderás para el examen'
        ]
      },
      {
        number: 3,
        title: 'Aplica la Regla de la Transparencia',
        description: 'Antes de usar IA de cualquier forma para una tarea, hazte esta pregunta: "¿Me sentiría cómodo diciendo exactamente cómo usé IA a mi profesor?" Si la respuesta es NO, ese uso probablemente no es apropiado. Si la respuesta es SÍ, probablemente estás en terreno ético. Esta regla simple elimina la mayoría de los dilemas.',
        tips: [
          'La transparencia es el principio más robusto de la integridad académica',
          'Cuando dudes, declara. Sobre-declarar siempre es mejor que sub-declarar',
          'Documenta siempre para qué usaste IA (aunque no te lo pidan)'
        ]
      },
      {
        number: 4,
        title: 'Practica el "Primero Yo, Luego IA"',
        description: 'Para tareas importantes, intenta primero sin IA: escribe el borrador, resuelve el problema, construye el argumento. DESPUÉS usa IA para mejorar, verificar o recibir feedback. Este orden garantiza que el trabajo intelectual fundamental es tuyo. Si empiezas con IA, dependes de su estructura y pierdes la oportunidad de desarrollar tu propio pensamiento.',
        tips: [
          'Programa 30 minutos de trabajo propio antes de abrir cualquier herramienta de IA',
          'Comparar tu borrador con la sugerencia de IA enseña mucho sobre escritura',
          'En la metodología "primero yo" el trabajo es genuinamente tuyo aunque uses IA después'
        ]
      },
      {
        number: 5,
        title: 'Verifica Siempre la Información que Genera la IA',
        description: 'Los modelos de IA cometen errores llamados "alucinaciones": inventan citas, estadísticas, fechas o datos que suenan plausibles pero son falsos. NUNCA uses información de IA sin verificarla en fuentes primarias. Especialmente: (1) citas bibliográficas (inventadas con frecuencia), (2) estadísticas y porcentajes, (3) nombres de autores o expertos, (4) fechas históricas.',
        tips: [
          'Pide a IA que cite sus fuentes — luego búscalas tú para verificar que existen',
          'Usa IA para encontrar pistas sobre dónde buscar, no como fuente final',
          'Nunca cites a ChatGPT como fuente en un trabajo académico sin verificar los datos'
        ]
      },
      {
        number: 6,
        title: 'Mantén tu Voz y Desarrolla Tu Pensamiento Propio',
        description: 'El mayor riesgo del uso excesivo de IA es la uniformización del pensamiento. Si todos usan IA para redactar, todos producen textos que suenan igual. Desarrolla tu voz académica propia: tu manera de argumentar, tu estilo de escritura, tus perspectivas originales. Usa IA para refinamiento, no para construcción desde cero. Tus profesores notarán la diferencia.',
        tips: [
          'Lee mucho en tu campo — es la mejor manera de desarrollar voz propia',
          'Escribe borradores sin corrección inmediata de IA para desarrollar fluidez',
          'El pensamiento crítico propio es lo que diferencia a los buenos estudiantes'
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: 'Copiar respuestas de IA sin procesar ni verificar',
        solution: 'Usa las respuestas de IA como punto de partida, no como producto final. Reformula, verifica hechos, agrega tu perspectiva. El texto final debe ser tuyo.'
      },
      {
        mistake: 'Usar IA para todo, incluso tareas simples que podrías hacer en 10 minutos',
        solution: 'La IA no es necesaria para cada tarea. Para tareas breves o de bajo riesgo, hacerlas tú mismo fortalece habilidades y es más rápido que iterar con IA.'
      },
      {
        mistake: 'Confiar en que la IA sabe más que los recursos académicos especializados',
        solution: 'Para investigación académica seria, usa bases de datos especializadas (Google Scholar, JSTOR, Scopus). La IA tiene conocimiento general, no acceso a papers recientes ni datos actualizados.'
      },
      {
        mistake: 'Ignorar las alucinaciones y citar datos de IA sin verificar',
        solution: 'Verifica SIEMPRE los datos específicos que genera la IA (citas, estadísticas, fechas). Los errores factuales de IA en trabajos académicos pueden afectar gravemente tu nota.'
      },
      {
        mistake: 'Usar IA justo antes del deadline en lugar de durante el proceso',
        solution: 'Integra IA en el proceso temprano: para brainstorming inicial, para entender conceptos, para revisar borradores. Usarla solo al final genera trabajo de menor calidad.'
      }
    ],
    faqs: [
      {
        question: '¿Cuáles son los usos de IA más recomendados para estudiantes?',
        answer: 'USOS DE ALTO VALOR: (1) Explicar conceptos difíciles con ejemplos adaptados a tu nivel, (2) Generar preguntas de práctica sobre un tema para autoevaluarte, (3) Recibir feedback sobre estructura y claridad de tus borradores, (4) Resumir textos largos para decidir si vale la pena leer el original completo, (5) Traducir o clarificar terminología técnica en idioma extranjero, (6) Brainstorming de ideas que luego TÚ desarrollas y filtras.'
      },
      {
        question: '¿Qué usos de IA debo evitar como estudiante?',
        answer: 'USOS DE ALTO RIESGO: (1) Generar ensayos completos que entregas como tuyos, (2) Resolver exámenes o ejercicios evaluados sin declaración, (3) Copiar código generado por IA en proyectos de programación sin entenderlo, (4) Usar humanizadores para disfrazar texto de IA como propio, (5) Citar fuentes que IA inventó sin verificar que existen. Estos usos violan integridad académica Y te impiden aprender las habilidades que evaluarán después.'
      },
      {
        question: '¿Cómo declaro el uso de IA en mis trabajos?',
        answer: 'FORMATO RECOMENDADO: Añade una nota al final del trabajo: "Declaración de uso de IA: Utilicé [herramienta] para [propósito específico: p.ej., recibir feedback sobre estructura del borrador, explicar el concepto X, generar ideas iniciales]. Todo el contenido final fue escrito y verificado por mí." Sé específico sobre qué usaste y para qué. Si no sabes qué formato pide tu institución, usa este y ajusta si el profesor lo solicita.'
      },
      {
        question: '¿Usar IA me hace menos competitivo en el mercado laboral?',
        answer: 'AL CONTRARIO: Saber usar IA efectivamente es ya una habilidad laboral valorada. La clave es que seas competente CON IA, no que IA reemplace tu competencia. Quien sepa hacer las preguntas correctas a IA, verificar sus outputs, y combinar sus capacidades con pensamiento propio tendrá ventaja. Lo que NO quieres es depender tanto de IA que no puedas trabajar sin ella — eso sí limita tu valor profesional.'
      },
      {
        question: '¿Es diferente usar IA para código que para texto en humanidades?',
        answer: 'SÍ, con matices. En PROGRAMACIÓN: Usar IA para generar código es más aceptado si entiendes el código y puedes explicarlo. Muchos profesores permiten IA para código siempre que entiendas cada línea. En HUMANIDADES: La producción de ideas y argumentos propios es central — IA como ayuda en redacción es más común, pero la sustancia intelectual debe ser tuya. En ambos casos: entiende lo que entregas y sé capaz de defenderlo.'
      }
    ],
    relatedGuides: [
      { title: 'Cómo Usar IA Éticamente en la Universidad', slug: 'como-usar-ia-eticamente-universidad' },
      { title: 'Cómo Evitar Plagio Académico', slug: 'como-evitar-plagio-academico' },
      { title: 'Cómo Verificar la Originalidad de un Texto', slug: 'como-verificar-originalidad-texto' }
    ],
    relatedTools: [
      { name: 'Detector de IA Gratis', url: '/?ref=guia-mejores-practicas-ia' },
      { name: 'Humanizador de Texto IA', url: '/humanizador?ref=guia-mejores-practicas-ia' }
    ],
    cta: {
      text: 'Verificar si tu texto parece escrito por IA',
      url: '/?ref=guia-mejores-practicas-ia'
    }
  },

  {
    slug: 'como-verificar-originalidad-texto',
    title: 'Cómo Verificar la Originalidad de un Texto',
    keywords: [
      'verificar originalidad texto',
      'como comprobar originalidad texto',
      'verificar plagio texto online',
      'comprobar originalidad trabajo academico',
      'herramientas verificar originalidad'
    ],
    metaTitle: 'Cómo Verificar la Originalidad de un Texto: Guía Completa 2025',
    metaDescription: 'Guía paso a paso para verificar la originalidad de cualquier texto. Herramientas gratuitas y de pago, cómo interpretar los resultados, qué hacer si se detecta plagio o IA.',
    h1: 'Cómo Verificar la Originalidad de un Texto: Métodos y Herramientas',
    intro: '¿Cómo saber si un texto es original? Tanto si eres estudiante que quiere verificar su propio trabajo antes de entregarlo, como si eres profesor que necesita evaluar la autenticidad de un texto, o un editor que quiere asegurarse de que el contenido es genuino, esta guía cubre todos los métodos y herramientas disponibles para verificar la originalidad de un texto en 2025.',
    overview: 'Esta guía cubre: (1) Qué significa "originalidad" en el contexto académico y editorial, (2) Herramientas gratuitas para verificar plagio, (3) Herramientas para detectar texto generado por IA, (4) Cómo interpretar los resultados, (5) Qué hacer si se detecta plagio o IA.',
    steps: [
      {
        number: 1,
        title: 'Entiende Qué Significa Originalidad en Tu Contexto',
        description: 'La "originalidad" tiene diferentes significados según el contexto: (1) ACADÉMICO: El texto fue escrito por ti, las ideas son tuyas o están correctamente atribuidas, y no fue generado por IA sin declarar. (2) EDITORIAL/SEO: El contenido no aparece publicado en otro sitio web (contenido duplicado). (3) PERIODÍSTICO: Las ideas y la expresión son del autor, no copiadas de otros medios. Define qué tipo de originalidad necesitas verificar antes de elegir herramienta.',
        tips: [
          'Para académico: necesitas verificar tanto plagio como detección de IA',
          'Para SEO: lo importante es la unicidad del contenido en la web',
          'Para editorial: combina herramientas de plagio con revisión humana'
        ]
      },
      {
        number: 2,
        title: 'Usa un Detector de IA para Identificar Contenido Generado por Inteligencia Artificial',
        description: 'Si tu preocupación es si el texto fue generado total o parcialmente por IA (ChatGPT, Claude, Gemini, etc.), necesitas un detector de IA específico. Estos analizan patrones lingüísticos — fluidez artificial, uniformidad de estructura, ausencia de marcadores de autenticidad humana — para determinar la probabilidad de que el texto sea de IA. Los detectores de IA son diferentes a los detectores de plagio.',
        tips: [
          'Pega el texto completo para mejor precisión — fragmentos cortos son menos fiables',
          'Ningún detector es 100% preciso — úsalos como indicador, no como veredicto definitivo',
          'Los textos humanizados con herramientas específicas pueden engañar algunos detectores'
        ]
      },
      {
        number: 3,
        title: 'Verifica el Plagio Textual con Herramientas Especializadas',
        description: 'El plagio textual (copiar texto de otras fuentes sin citar) se detecta con herramientas como Turnitin (institucional), Copyscape (web), o buscadores específicos. Estas herramientas comparan el texto contra bases de datos de contenido existente. Son diferentes a los detectores de IA. Un texto puede ser original (no plagio) pero generado por IA, o puede ser plagio de un texto humano. Verifica ambas dimensiones por separado.',
        tips: [
          'Turnitin es el estándar institucional pero no todas las universidades lo tienen',
          'Google "buscar imagen" también detecta texto duplicado en imágenes',
          'Para webs: Copyscape o Siteliner son efectivos para detectar contenido duplicado'
        ]
      },
      {
        number: 4,
        title: 'Interpreta los Resultados Correctamente',
        description: 'Los resultados de los detectores de originalidad requieren interpretación: (1) DETECCIÓN DE IA: Un 70% de probabilidad de IA no significa necesariamente que el texto fue generado por IA. Textos muy técnicos, listas o contenido formal puntúan más alto. Usa como indicador, no como prueba. (2) PLAGIO: Un 15% de similitud puede ser aceptable si incluye citas y referencias bibliográficas estándar. Analiza QUÉ partes coinciden — citas propias y terminología técnica no son plagio. (3) CONTEXTO: Siempre interpreta en contexto del tipo de texto.',
        tips: [
          'Los falsos positivos en detección de IA son comunes en textos técnicos y académicos',
          'Similitud en detectores de plagio ≠ plagio si son citas correctamente atribuidas',
          'Solicita siempre un reporte detallado, no solo el porcentaje'
        ]
      },
      {
        number: 5,
        title: 'Actúa Según los Resultados',
        description: 'Si tu propio texto muestra señales de plagio o IA: (1) REVISA FUENTES: Identifica qué fragmentos coinciden y por qué. Si son citas legítimas, asegúrate de que están correctamente formateadas. (2) PARAFRASEA: Si copiaste sin querer, reescribe el fragmento con tus propias palabras y cita la fuente. (3) HUMANIZA LEGÍTIMAMENTE: Si el detector de IA señala tu trabajo como artificial, revisa si tu escritura es demasiado formal o mecánica. Agrega variaciones de estilo y marcadores de autenticidad. (4) DECLARA: Si usaste IA, decláralo según las pautas de tu institución.',
        tips: [
          'La herramienta Parafraseador puede ayudarte a reescribir fragmentos problemáticos con tus palabras',
          'Revisa tu texto en voz alta — el texto de IA suena diferente al leerse en voz alta',
          'Pide feedback a un compañero antes de entregarlo — los humanos detectan IA intuitivamente'
        ]
      },
      {
        number: 6,
        title: 'Establece un Proceso de Verificación Rutinario',
        description: 'No esperes a tener problemas para verificar originalidad. Establece una rutina: (1) ANTES DE ENTREGAR: Pasa el detector de IA + revisor de plagio a cada trabajo final. (2) MIENTRAS ESCRIBES: Anota las fuentes que consultas para no olvidar citar. (3) DESPUÉS DE REVISAR: Si editaste con ayuda de IA, vuelve a verificar el resultado. Un flujo de trabajo consistente elimina los accidentes y genera hábitos de integridad académica.',
        tips: [
          'Crea un checklist pre-entrega: originalidad, citas, formato, longitud',
          'Los 5 minutos de verificación pueden evitar consecuencias académicas graves',
          'Guarda los reportes de originalidad como evidencia de tu buena fe'
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: 'Creer que cambiar palabras sinónimas es suficiente para evitar el plagio',
        solution: 'El plagio de ideas (patchwriting) existe aunque cambies palabras. Si reproduces la estructura argumentativa de otro sin citar, es plagio. Reformula completamente las ideas y cita la fuente original.'
      },
      {
        mistake: 'Usar solo un tipo de herramienta (solo detector de plagio O solo detector de IA)',
        solution: 'Plagio e IA son problemas diferentes. Un texto puede ser original (no está copiado de ningún lado) pero generado por IA. Usa ambos tipos de herramientas para una verificación completa.'
      },
      {
        mistake: 'Confiar ciegamente en el porcentaje sin leer el reporte detallado',
        solution: 'Un 20% de similitud puede ser completamente legítimo si son citas bibliográficas y referencias estándar. Un 5% puede ser problemático si ese 5% es el argumento central copiado literalmente. Lee el reporte completo.'
      },
      {
        mistake: 'Verificar solo antes de entregar, no durante el proceso de escritura',
        solution: 'Verifica parcialmente mientras escribes, especialmente si consultas muchas fuentes. Es más fácil corregir un problema de citación cuando el texto es fresco que revisar todo al final.'
      },
      {
        mistake: 'Pensar que los detectores de IA son infalibles',
        solution: 'Los detectores de IA tienen tasas de error (falsos positivos y falsos negativos). Úsalos como una señal de alerta, no como un veredicto definitivo. La evaluación humana sigue siendo necesaria.'
      }
    ],
    faqs: [
      {
        question: '¿Qué herramientas gratuitas existen para verificar originalidad de texto?',
        answer: 'DETECTORES DE IA GRATUITOS: DetectordeIA.ai (optimizado para español), ZeroGPT (gratuito, inglés principalmente), GPTZero (plan gratuito limitado). VERIFICADORES DE PLAGIO GRATUITOS: Duplichecker, Small SEO Tools, PaperRater (para trabajos académicos), Plagiarism Detector. OPCIONES DE PAGO CON PRUEBA GRATUITA: Turnitin (institucional, no individual), Copyscape (web), Copyleaks. Para uso académico en español, DetectordeIA.ai es la opción más recomendada por su optimización para el idioma.'
      },
      {
        question: '¿Qué porcentaje de similitud es aceptable en un trabajo académico?',
        answer: 'DEPENDE DE LA INSTITUCIÓN: No hay un estándar universal. TÍPICAMENTE ACEPTABLE: <15-20% de similitud cuando incluye citas, bibliografía y terminología técnica. ZONA GRIS: 20-30%, requiere análisis de qué partes coinciden. PROBLEMÁTICO: >30% sin justificación clara. IMPORTANTE: El porcentaje no lo es todo. Un 5% de similitud puede ser grave si ese fragmento es el argumento central sin citar. Un 25% puede ser aceptable si son citas legítimas y referencias. Consulta la política específica de tu institución.'
      },
      {
        question: '¿Puede un texto escrito por humano salir con alta probabilidad de IA en los detectores?',
        answer: 'SÍ, especialmente: textos técnicos muy formales, listas y enumeraciones, instrucciones paso a paso, textos de traducción directa, textos de autores no nativos que usan estructuras muy formales, resúmenes ejecutivos. Los detectores de IA tienen falsos positivos. Si tu texto es humano y sale con alta probabilidad de IA, añade más variación en estructura de oraciones, usa vocabulario más personal, incluye anécdotas o ejemplos específicos, y diversifica la longitud de tus oraciones.'
      },
      {
        question: '¿Cómo verifico la originalidad de un texto en español?',
        answer: 'Para ESPAÑOL ESPECÍFICAMENTE: DetectordeIA.ai está optimizado para español y detecta tanto patrones de IA como plagio en texto en español. Para plagio: Duplichecker y Small SEO Tools funcionan en español. Para plagio académico institucional: Turnitin (si tu institución lo tiene) es el estándar. CONSEJO: Las herramientas optimizadas para inglés son menos precisas en español — usa siempre herramientas que declaren soporte explícito para español.'
      },
      {
        question: '¿Puedo verificar la originalidad de un PDF?',
        answer: 'DEPENDE DE LA HERRAMIENTA: Turnitin acepta PDF directamente. DetectordeIA.ai actualmente requiere pegar el texto (copia el texto del PDF y pégalo). Alternativa: usa herramientas de extracción de texto de PDF (Adobe Reader, Smallpdf) y luego pega el texto en el detector. Para PDFs escaneados (imágenes de texto): necesitas primero un OCR (reconocimiento óptico de caracteres) como Adobe Acrobat Pro o Google Drive que puede abrir PDFs escaneados y extraer texto.'
      }
    ],
    relatedGuides: [
      { title: 'Cómo Evitar Plagio Académico', slug: 'como-evitar-plagio-academico' },
      { title: 'Mejores Prácticas de IA para Estudiantes', slug: 'mejores-practicas-uso-ia-estudiantes' },
      { title: 'Cómo Citar Fuentes en Formato APA al Parafrasear', slug: 'como-citar-fuentes-apa-parafraseo' }
    ],
    relatedTools: [
      { name: 'Detector de IA Gratis', url: '/?ref=guia-verificar-originalidad' },
      { name: 'Parafraseador sin Plagio', url: '/parafrasear-textos-online-gratis?ref=guia-verificar-originalidad' }
    ],
    cta: {
      text: 'Verificar originalidad ahora — gratis',
      url: '/?ref=guia-verificar-originalidad'
    }
  },

  {
    slug: 'como-detectar-texto-ia-sin-herramientas',
    title: 'Cómo Detectar Texto de IA Sin Herramientas',
    keywords: [
      'detectar texto ia sin herramientas',
      'como saber si texto es ia',
      'identificar chatgpt sin detector',
      'señales texto generado ia',
      'detectar ia manualmente'
    ],
    metaTitle: 'Cómo Detectar Texto de IA Sin Herramientas: Señales y Técnicas 2025',
    metaDescription: 'Aprende a identificar texto generado por IA (ChatGPT, Claude, Gemini) sin usar herramientas. Señales lingüísticas, patrones estructurales y técnicas para detectar IA manualmente.',
    h1: 'Cómo Detectar Texto de IA Sin Herramientas: Guía Visual y Práctica',
    intro: 'Los detectores de IA automáticos son útiles, pero saber leer los patrones del texto te da una capa adicional de comprensión. Tanto si eres profesor, editor o simplemente curioso, estas técnicas te permiten identificar texto generado por IA observando sus características lingüísticas y estructurales características.',
    overview: 'Esta guía cubre: (1) Las señales lingüísticas más reveladoras del texto de IA, (2) Patrones estructurales típicos de ChatGPT y otros modelos, (3) Cómo distinguir texto de IA en diferentes contextos académicos, (4) Qué hacer cuando detectas posible texto de IA, (5) Cuándo usar herramientas automáticas en complemento.',
    steps: [
      {
        number: 1,
        title: 'Identifica las Señales Lingüísticas Más Comunes',
        description: 'El texto generado por IA tiene patrones lingüísticos reconocibles: (1) FRASES DE TRANSICIÓN FORMULAICAS: "En resumen", "Es importante destacar", "Cabe mencionar", "En conclusión" usadas de forma mecánica. (2) ORACIONES PERFECTAMENTE BALANCEADAS: Párrafos con longitud casi idéntica, sin variación natural. (3) VOCABULARIO CONSISTENTEMENTE FORMAL: Sin coloquialismos, jerga o variaciones de registro. (4) AUSENCIA DE OPINIONES PERSONALES: Texto que evita tomar posición o que cuando lo hace lo hace de forma genérica. (5) PRECISIÓN UNIFORME: No hay partes donde el autor "no esté seguro" o use aproximaciones.',
        tips: [
          'Lee el texto en voz alta — el texto de IA tiene un ritmo artificial que se percibe al leerlo',
          'Compara con textos conocidos del mismo autor — ¿el estilo es consistente?',
          'Busca ausencia de anécdotas personales o ejemplos específicos de experiencia propia'
        ]
      },
      {
        number: 2,
        title: 'Analiza la Estructura del Texto',
        description: 'La estructura es uno de los indicadores más fiables: (1) ESTRUCTURA DE LISTA PERFECTA: La IA tiende a organizar todo en puntos numerados o con viñetas, incluso cuando no es necesario. (2) SECCIONES EQUILIBRADAS: Cada sección tiene aproximadamente la misma longitud y desarrollo, sin áreas donde el autor tiene más profundidad que otras. (3) COBERTURA AMPLIA SIN PROFUNDIDAD: El texto menciona muchos aspectos pero no profundiza genuinamente en ninguno. (4) CONCLUSIÓN QUE RESUME LITERALMENTE: Las conclusiones de IA frecuentemente resumen punto por punto lo ya dicho, sin agregar perspectiva nueva.',
        tips: [
          'Un texto humano experto tiene desequilibrios: se extiende en lo que le apasiona o conoce mejor',
          'La IA raramente dice "No lo sé" o "Es un tema complejo sin respuesta clara"',
          'Los textos de IA típicamente responden todas las preguntas con seguridad excesiva'
        ]
      },
      {
        number: 3,
        title: 'Busca Ausencia de Especificidad',
        description: 'Los textos humanos de calidad tienen detalles específicos; los de IA tienden a la generalización: (1) CIFRAS Y DATOS: La IA inventa estadísticas que suenan plausibles pero son vagas ("Según estudios, el 70% de los estudiantes..."). Un humano citaría la fuente específica. (2) NOMBRES PROPIOS: Los textos humanos referencian personas, lugares, instituciones concretas. La IA usa referencias genéricas. (3) FECHAS Y TIEMPO: La IA tiende a decir "recientemente" o "en los últimos años" en lugar de fechas específicas. (4) EJEMPLOS: Los ejemplos de IA son genéricos y "de manual"; los humanos usan casos reales y experiencias propias.',
        tips: [
          'Busca un dato específico y verifica si existe — la IA frecuentemente inventa estadísticas',
          'Pregunta: ¿Cuándo fue escrito esto? Si no hay ninguna pista temporal específica, es señal',
          'La ausencia de citas concretas verificables es un indicador importante'
        ]
      },
      {
        number: 4,
        title: 'Evalúa la Voz y el Tono',
        description: 'La voz humana tiene irregularidades que la IA difícilmente replica: (1) HUMOR Y IRONÍA: La IA tiene dificultad con el humor sutil, la ironía y el sarcasmo contextual. Si el texto pretende ser informal pero el humor suena forzado, es señal. (2) EMOCIONES AUTÉNTICAS: Los textos humanos tienen momentos de entusiasmo real, frustración o duda que se perciben. La IA simula emociones de forma uniforme. (3) DIGRESIONES CONTROLADAS: Los humanos se desvían brevemente y vuelven al tema; la IA mantiene foco perfecto en todo momento. (4) CONTRADICCIONES MENORES: Los humanos a veces se contradicen ligeramente al hablar. La IA es internamente perfectamente consistente.',
        tips: [
          'Un buen texto humano tiene "personalidad" — reconocerías al autor entre 100 textos',
          'El texto de IA suena "neutral" de forma artificial — no tiene preferencias ni vicios de estilo',
          'La ausencia total de errores tipográficos menores también puede ser señal en textos informales'
        ]
      },
      {
        number: 5,
        title: 'Usa el Test de la Pregunta Incómoda',
        description: 'Una técnica efectiva: imagina una pregunta incómoda relacionada con el tema y verifica si el texto la aborda. Los textos humanos de calidad suelen anticipar objeciones y abordarlas; los de IA tienden a evitar la complejidad. También puedes buscar: (1) POSICIONES CLARAS: ¿El autor toma una posición definitiva sobre algo controvertido, o evita el debate? La IA tiende a presentar "todos los lados" sin comprometerse. (2) CONOCIMIENTO IMPLÍCITO: Los textos humanos expertos asumen cierto conocimiento del lector y usan jerga de campo correctamente. La IA sobreexplica todo. (3) ACTUALIZACIONES: ¿El texto menciona eventos o contexto muy reciente? La IA tiene fechas de corte de conocimiento.',
        tips: [
          'Pregunta algo que requiera opinión personal — si la respuesta es perfectamente equilibrada y diplomática, sospecha',
          'Busca términos muy específicos del campo — la IA los usa correctamente pero a veces sin el matiz que tendría un experto',
          'Los expertos humanos saben cuándo simplificar y cuándo no — la IA simplifica siempre'
        ]
      },
      {
        number: 6,
        title: 'Confirma con Herramientas Automáticas',
        description: 'La detección manual es complementaria, no sustituta. Una vez que tus sospechas están activadas por las señales anteriores, confirma con un detector de IA automático para tener una segunda opinión cuantificada. Los detectores automáticos son especialmente útiles para textos largos donde la lectura atenta manual consume mucho tiempo. Combinar intuición entrenada con herramientas automáticas da los mejores resultados.',
        tips: [
          'Usa detectores optimizados para español — los orientados a inglés son menos precisos en nuestro idioma',
          'Si el detector da 60-80% de probabilidad de IA, combina con tu análisis manual para decidir',
          'Ningún método (manual ni automático) es 100% definitivo — sirven como indicadores'
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: 'Asumir que texto gramaticalmente perfecto = texto de IA',
        solution: 'Muchos escritores nativos y editores producen texto sin errores. La perfección gramatical es indicio, no prueba. Evalúa en conjunto con otras señales.'
      },
      {
        mistake: 'Creer que textos técnicos o académicos formales son siempre de IA',
        solution: 'Los textos académicos son formales por naturaleza. La formalidad sola no es indicador. Busca las otras señales: ausencia de especificidad, estructura mecánica, voz neutral artificial.'
      },
      {
        mistake: 'Basar la conclusión en una sola señal',
        solution: 'Ninguna señal individual es suficiente. Necesitas múltiples indicadores convergentes. Un texto puede tener una señal por motivos legítimos (el autor es formal, o es un texto instruccional). La convergencia de varias señales es lo que importa.'
      },
      {
        mistake: 'Ignorar el contexto del autor',
        solution: 'Si conoces textos anteriores del autor y el estilo es dramáticamente diferente, eso es más significativo que cualquier señal individual. La inconsistencia de estilo entre textos del mismo autor es una de las señales más fuertes.'
      }
    ],
    faqs: [
      {
        question: '¿Cuáles son las señales más confiables de texto generado por IA?',
        answer: 'Las más confiables en español: (1) Frases de transición formulaicas ("Es importante destacar que", "Cabe mencionar", "En este sentido") usadas mecánicamente. (2) Párrafos perfectamente balanceados en longitud. (3) Ausencia total de anécdotas personales o ejemplos específicos verificables. (4) Posición neutra artificial ante temas donde un humano tendría opinión. (5) Listas de puntos para explicar casi todo. Cuantas más señales convergen, más confiable es el diagnóstico.'
      },
      {
        question: '¿Los detectores automáticos son más fiables que la detección manual?',
        answer: 'Son complementarios. Los detectores automáticos son más rápidos y consistentes para textos largos. La detección manual es mejor para entender el contexto y para casos ambiguos. Los mejores resultados se obtienen combinando ambos: el detector automático da un primer indicador, y el análisis manual ayuda a interpretar los resultados en contexto.'
      },
      {
        question: '¿Puede un texto humano ser marcado incorrectamente como IA?',
        answer: 'SÍ, especialmente en: textos académicos muy formales, instrucciones paso a paso, textos técnicos con terminología estándar, textos de autores no nativos que usan estructuras formales, resúmenes ejecutivos. Los falsos positivos son un problema real. Por eso la detección nunca debe ser el único factor en una decisión académica — siempre debe combinarse con otros elementos de evaluación.'
      },
      {
        question: '¿Los modelos de IA más recientes son más difíciles de detectar?',
        answer: 'SÍ, los modelos más avanzados (GPT-4o, Claude 3.5, Gemini 1.5 Pro) producen texto más naturales y difíciles de detectar que modelos anteriores. Dicho esto, incluso los mejores modelos presentan patrones reconocibles: la perfección excesiva, la cobertura equilibrada de todos los aspectos, la neutralidad artificial. Los detectores automáticos también mejoran continuamente.'
      }
    ],
    relatedGuides: [
      { title: 'Cómo Verificar la Originalidad de un Texto', slug: 'como-verificar-originalidad-texto' },
      { title: 'Mejores Prácticas de IA para Estudiantes', slug: 'mejores-practicas-uso-ia-estudiantes' },
      { title: 'Cómo Evitar Plagio Académico', slug: 'como-evitar-plagio-academico' }
    ],
    relatedTools: [
      { name: 'Detector de IA Gratis', url: '/?ref=guia-detectar-ia-sin-herramientas' },
      { name: 'Verificador de IA', url: '/verificador-de-ia?ref=guia-detectar-ia-sin-herramientas' }
    ],
    cta: {
      text: 'Confirmar con detector automático — gratis',
      url: '/?ref=guia-detectar-ia-sin-herramientas'
    }
  },

  {
    slug: 'como-citar-ia-en-trabajos-academicos',
    title: 'Cómo Citar IA en Trabajos Académicos',
    keywords: [
      'como citar ia trabajos academicos',
      'citar chatgpt apa',
      'citar inteligencia artificial apa',
      'formato citacion ia',
      'referencias chatgpt trabajos'
    ],
    metaTitle: 'Cómo Citar IA en Trabajos Académicos: Guía APA, MLA y Chicago 2025',
    metaDescription: 'Aprende a citar ChatGPT, Claude y otros modelos de IA en trabajos académicos. Formatos APA 7, MLA y Chicago con ejemplos reales. Cuándo citar y cómo declarar uso de IA.',
    h1: 'Cómo Citar IA en Trabajos Académicos: Formatos APA, MLA y Chicago',
    intro: 'Citar herramientas de IA en trabajos académicos es una práctica relativamente nueva y las guías de estilo están evolucionando. Esta guía compila las recomendaciones actuales de APA 7, MLA y Chicago para citar ChatGPT, Claude, Gemini y otros modelos, con ejemplos concretos que puedes copiar y adaptar.',
    overview: 'Esta guía cubre: (1) Cuándo es necesario citar el uso de IA, (2) Formato de cita en APA 7 con ejemplos, (3) Formato en MLA con ejemplos, (4) Formato en Chicago con ejemplos, (5) Cómo declarar el uso de IA cuando no hay formato de cita establecido.',
    steps: [
      {
        number: 1,
        title: 'Determina Cuándo Debes Citar el Uso de IA',
        description: 'No todo uso de IA requiere cita formal. Debes citar cuando: (1) USAS TEXTO GENERADO POR IA directamente (aunque sea parafraseado), (2) USAS IDEAS o argumentos que obtuviste de la IA, (3) PRESENTAS DATOS o estadísticas que la IA te proporcionó, (4) BASAS UNA CONCLUSIÓN en lo que la IA te dijo. No necesitas citar cuando: usas IA solo para corregir gramática/ortografía, para entender conceptos (como usarías un diccionario), para práctica o aprendizaje sin incluir nada en el trabajo final.',
        tips: [
          'Regla práctica: Si usaste la IA como fuente de información o ideas, cítala',
          'Si solo usaste IA para mejorar TU texto (estilo, gramática), no es necesaria la cita formal pero sí la declaración',
          'Siempre verifica qué requiere específicamente tu institución'
        ]
      },
      {
        number: 2,
        title: 'Formato APA 7 para Citar IA',
        description: 'La APA (7ma edición) publicó directrices en 2023 para citar modelos de lenguaje. FORMATO BÁSICO: Autor/Empresa. (Año). Nombre del modelo (versión) [Modelo de lenguaje grande]. URL\n\nEJEMPLOS COMPLETOS:\n\n• ChatGPT: OpenAI. (2024). ChatGPT (versión GPT-4o) [Modelo de lenguaje grande]. https://chat.openai.com\n\n• Claude: Anthropic. (2024). Claude (claude-3-5-sonnet) [Modelo de lenguaje grande]. https://claude.ai\n\n• Gemini: Google. (2024). Gemini (versión 1.5 Pro) [Modelo de lenguaje grande]. https://gemini.google.com\n\nEN TEXTO: (OpenAI, 2024) / (Anthropic, 2024)\n\nADEMÁS del formato de referencia, APA recomienda incluir en el texto el prompt que usaste o describir cómo usaste la herramienta.',
        tips: [
          'Guarda la conversación que usaste — en ChatGPT puedes compartir el link',
          'APA sugiere incluir el prompt en el texto del trabajo o como apéndice',
          'La fecha debe ser la del acceso/conversación, no la del modelo'
        ]
      },
      {
        number: 3,
        title: 'Formato MLA para Citar IA',
        description: 'MLA (Modern Language Association) actualizó sus guías en 2023. FORMATO: "Respuesta a [descripción del prompt]." Nombre del programa, empresa desarrolladora, fecha de la respuesta, URL.\n\nEJEMPLO ChatGPT:\n"Explica las causas de la Primera Guerra Mundial en 300 palabras." ChatGPT, OpenAI, 15 de marzo de 2024, chat.openai.com.\n\nEJEMPLO Claude:\n"Resume los principales argumentos sobre el cambio climático." Claude, Anthropic, 10 de febrero de 2024, claude.ai.\n\nEN TEXTO: Citar con comillas o integrar en la prosa, luego la cita al pie o en el listado de obras citadas.',
        tips: [
          'MLA pone énfasis en incluir el prompt específico que usaste',
          'Trata la IA como tratarías cualquier fuente: con la información necesaria para localizarla',
          'Consulta el MLA Handbook más reciente — las directrices siguen evolucionando'
        ]
      },
      {
        number: 4,
        title: 'Formato Chicago para Citar IA',
        description: 'Chicago tiene dos sistemas: Notas al pie (humanities) y Autor-Fecha (sciences). SISTEMA NOTAS AL PIE:\n1. OpenAI, "Respuesta a pregunta sobre [tema]," ChatGPT, 15 de marzo de 2024, https://chat.openai.com.\n\nBIBLIOGRAFÍA:\nOpenAI. "ChatGPT, 15 de marzo de 2024." https://chat.openai.com.\n\nSISTEMA AUTOR-FECHA:\nEn texto: (OpenAI 2024)\nBibliografía: OpenAI. 2024. ChatGPT. Acceso 15 de marzo. https://chat.openai.com.',
        tips: [
          'Chicago recomienda guardar transcripciones ya que las conversaciones con IA no son permanentemente accesibles',
          'Consulta el Chicago Manual of Style (17ma edición o más reciente) para actualizaciones',
          'En disciplinas de humanidades, añade descripción del uso en nota al pie'
        ]
      },
      {
        number: 5,
        title: 'Declara el Uso de IA Aunque No Haya Cita Formal',
        description: 'Más allá del formato de cita, muchas instituciones requieren una declaración explícita del uso de IA aunque no haya una "cita" en el sentido tradicional. EJEMPLO DE DECLARACIÓN: "Declaración de uso de IA: Utilicé ChatGPT (OpenAI, 2024) para [finalidad específica: p.ej., generar ideas iniciales sobre el tema X, recibir feedback sobre la estructura del borrador]. Todo el contenido escrito en este trabajo es de mi autoría y fue verificado por mí." Esta declaración va al final del trabajo, antes de la bibliografía.',
        tips: [
          'Sé específico: menciona exactamente para qué usaste la IA',
          'Si tu institución tiene plantilla específica de declaración, úsala',
          'La declaración protege tu integridad — es mejor declarar de más que de menos'
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: 'No citar la IA porque "no es una fuente real"',
        solution: 'La IA es una fuente de información y debe citarse cuando influye en el contenido. Las guías APA, MLA y Chicago ya tienen formatos para ello. No citar es engaño académico.'
      },
      {
        mistake: 'Usar la misma cita genérica para todas las conversaciones con IA',
        solution: 'Cada conversación/prompt es diferente. La fecha, el modelo y el contenido específico del intercambio deben reflejarse en la cita. No uses una cita genérica de "ChatGPT, 2024" sin contexto.'
      },
      {
        mistake: 'Creer que citar la IA justifica cualquier uso',
        solution: 'Citar es necesario pero no suficiente. Si tu institución no permite usar IA para generar trabajo, citarla no lo hace legítimo. La cita es parte de la transparencia, no una exención de las reglas.'
      },
      {
        mistake: 'No guardar el registro de la conversación',
        solution: 'Los revisores pueden pedir ver la conversación original. Guarda siempre un screenshot o link compartible de la conversación que usaste.'
      }
    ],
    faqs: [
      {
        question: '¿Es obligatorio citar ChatGPT si lo usé para ideas pero escribí todo yo mismo?',
        answer: 'DEPENDE: Si las ideas que obtuviste de ChatGPT influenciaron directamente el argumento o contenido de tu trabajo, sí debes citar o al menos declarar el uso. Si solo usaste ChatGPT para entender conceptos básicos que ya sabías pero querías clarificar (como harías con Wikipedia para un trasfondo), puede ser suficiente la declaración sin cita formal. Ante la duda, declara. Es mejor declarar demás que tener que explicar por qué no declaraste.'
      },
      {
        question: '¿Qué hago si mi profesor no acepta citas de IA?',
        answer: 'Si tu profesor no acepta IA como fuente, lo mejor es no usar IA para obtener información que incluirás en el trabajo. Puedes usar IA para aprender y entender (como usarías cualquier recurso educativo) pero asegúrate de que todo el contenido final de tu trabajo provenga de fuentes académicas tradicionales. Si ya usaste IA y el trabajo está hecho, habla con el profesor — la honestidad es siempre mejor que el ocultamiento.'
      },
      {
        question: '¿Las guías de citación de IA cambiarán en el futuro?',
        answer: 'SÍ, es muy probable. APA, MLA y Chicago actualizaron sus guías en 2023 precisamente porque no existían antes. A medida que el uso de IA se normalice en contextos académicos, las guías de estilo seguirán refinando los formatos. Siempre verifica la versión más reciente de la guía de estilo que uses.'
      },
      {
        question: '¿Cómo cito a Claude de Anthropic específicamente?',
        answer: 'APA 7: Anthropic. (2024). Claude (claude-3-5-sonnet-20241022) [Modelo de lenguaje grande]. https://claude.ai\n\nMLA: "Descripción del prompt." Claude, Anthropic, [fecha], claude.ai.\n\nChicago: Anthropic, "Respuesta a [tema]," Claude, [fecha], https://claude.ai.\n\nIncluye la versión específica del modelo si la conoces (puedes verla en la configuración de Claude). La fecha debe ser la de tu conversación específica.'
      }
    ],
    relatedGuides: [
      { title: 'Cómo Citar Fuentes en Formato APA al Parafrasear', slug: 'como-citar-fuentes-apa-parafraseo' },
      { title: 'Cómo Usar IA Éticamente en la Universidad', slug: 'como-usar-ia-eticamente-universidad' },
      { title: 'Cómo Evitar Plagio Académico', slug: 'como-evitar-plagio-academico' }
    ],
    relatedTools: [
      { name: 'Detector de IA Gratis', url: '/?ref=guia-citar-ia' },
      { name: 'Parafraseador sin Plagio', url: '/parafrasear-textos-online-gratis?ref=guia-citar-ia' }
    ],
    cta: {
      text: 'Verificar si tu texto necesita declaración de IA',
      url: '/?ref=guia-citar-ia'
    }
  },

  {
    slug: 'diferencia-plagio-uso-ia-trabajos',
    title: 'Diferencia entre Plagio y Uso de IA en Trabajos',
    keywords: [
      'diferencia plagio uso ia',
      'plagio vs inteligencia artificial trabajos',
      'es plagio usar chatgpt',
      'plagio con ia diferencias',
      'uso ia academico plagio'
    ],
    metaTitle: 'Diferencia entre Plagio y Uso de IA en Trabajos Académicos 2025',
    metaDescription: '¿Usar ChatGPT es lo mismo que plagiar? Explicamos las diferencias y similitudes entre plagio tradicional y uso no declarado de IA en trabajos académicos.',
    h1: '¿Es Plagio Usar IA? Diferencias entre Plagio y Uso de Inteligencia Artificial',
    intro: '¿Usar ChatGPT en un trabajo es lo mismo que copiar de Wikipedia sin citar? La respuesta es más matizada de lo que parece. Aunque ambos vulneran la integridad académica cuando no se declaran, el plagio tradicional y el uso indebido de IA son problemas distintos con implicaciones diferentes. Esta guía clarifica las diferencias para que entiendas exactamente a qué te enfrentas.',
    overview: 'Esta guía cubre: (1) Definición técnica de plagio y uso de IA, (2) En qué se parecen y en qué se diferencian, (3) Por qué las universidades los tratan de forma diferente, (4) Cómo evitar ambos problemas, (5) Qué pasa si te atrapan con uno o con otro.',
    steps: [
      {
        number: 1,
        title: 'Qué es el Plagio Tradicional',
        description: 'El plagio académico es presentar ideas, palabras o trabajos de otra persona como propios sin la debida atribución. TIPOS: (1) PLAGIO DIRECTO: Copiar texto literalmente sin comillas ni cita. (2) PATCHWRITING: Cambiar algunas palabras del original pero mantener la estructura. (3) PLAGIO DE IDEAS: Tomar argumentos o teorías de otro autor sin citarlos, aunque los escribas con tus palabras. (4) AUTOPLAGIAR: Presentar tu propio trabajo previo como nuevo (entregarlo en dos cursos sin permiso). El denominador común del plagio: existe una FUENTE IDENTIFICABLE — un texto, un autor, una obra — que se está usando sin crédito.',
        tips: [
          'El plagio puede ser intencional o accidental — ambos tienen consecuencias',
          'El autoplagiar es una forma de plagio que muchos estudiantes desconocen',
          'El patchwriting es la forma más común de plagio accidental'
        ]
      },
      {
        number: 2,
        title: 'Qué es el Uso Indebido de IA',
        description: 'El uso indebido de IA en contextos académicos es presentar texto generado por inteligencia artificial como propio sin declararlo. DIFERENCIA CLAVE CON EL PLAGIO: No hay un autor humano específico que estés copiando. La IA genera contenido nuevo basado en patrones estadísticos, no copia de una fuente identificable. SIN EMBARGO, el efecto es similar al plagio: estás presentando trabajo que no hiciste tú como si lo hubieras hecho. FORMAS DE USO INDEBIDO: Copiar respuesta de ChatGPT sin citar, hacer que IA genere un ensayo completo, usar humanizadores para ocultar que un texto es de IA.',
        tips: [
          'El texto de IA no tiene "dueño" en el sentido legal (actualmente), pero viola integridad académica si no se declara',
          'Algunos llaman al uso de IA "plagio de sí mismo" (de tu propio trabajo que no hiciste)',
          'La distinción legal vs. académica es importante: puede no ser plagio legal pero sí falta académica'
        ]
      },
      {
        number: 3,
        title: 'Diferencias Clave entre Plagio y Uso de IA',
        description: 'ASPECTO | PLAGIO | USO NO DECLARADO DE IA\nFuente original | Existe (texto/autor identificable) | No existe (generado, no copiado)\nDetección | Turnitin, Google | Detectores específicos de IA\nEvidencia | Coincidencia textual | Patrones estadísticos\nIntención típica | Puede ser accidental | Generalmente intencional\nCita posible | Sí, cita al autor | Sí, cita a la herramienta de IA\nReputación dañada | Del autor copiado | Nadie en particular\nEfecto en aprendizaje | Malo: no aprendes | Malo: no aprendes\n\nCOINCIDENCIA FUNDAMENTAL: Ambos implican presentar como propio trabajo que no es tuyo.',
        tips: [
          'En muchas políticas universitarias ya se tratan como infracciones equivalentes',
          'La detección usa herramientas diferentes — un texto puede estar libre de plagio pero ser detectado como IA',
          'Es posible combinar ambas infracciones: copiar y modificar con IA'
        ]
      },
      {
        number: 4,
        title: 'Consecuencias y Tratamiento Institucional',
        description: 'Históricamente el plagio tiene consecuencias más establecidas (décadas de precedente). Las políticas sobre IA son más recientes (mayoría establecidas 2023-2025) y están evolucionando. ESTADO ACTUAL: (1) Algunas universidades tratan uso de IA igual que plagio — mismas consecuencias. (2) Otras tienen categoría separada para "uso no autorizado de IA" con proceso diferente. (3) Muchas están en proceso de actualizar sus políticas. RECOMENDACIÓN: Consulta específicamente la política de IA de tu institución — no asumas que el tratamiento es idéntico al plagio.',
        tips: [
          'Las políticas de IA son muy dinámicas — verifica cada semestre si han cambiado',
          'Algunas instituciones son más estrictas con IA que con plagio porque lo consideran más difícil de detectar',
          'El historial importa: primera vez vs. reincidencia siempre afecta las consecuencias'
        ]
      },
      {
        number: 5,
        title: 'Cómo Evitar Ambos Problemas',
        description: 'PARA EVITAR PLAGIO: (1) Cita siempre que uses ideas o palabras de otros. (2) Usa comillas para citas textuales. (3) Parafrasea con tus palabras y cita igualmente. (4) Usa un verificador de plagio antes de entregar. PARA EVITAR USO INDEBIDO DE IA: (1) Conoce la política de tu institución sobre IA. (2) Si usas IA, decláralo explícitamente. (3) Asegúrate de que el trabajo intelectual principal es tuyo. (4) Usa un detector de IA para ver cómo se percibe tu texto. REGLA GENERAL: Si no puedes defender cada parte de tu trabajo en una conversación con tu profesor, necesitas revisar.',
        tips: [
          'La verificación previa a la entrega es la mejor protección contra accidentes',
          'Documenta tu proceso de trabajo — borradores, notas, fuentes — como evidencia',
          'La transparencia desde el inicio es más fácil que explicaciones después'
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: 'Pensar que usar IA no es plagio porque no copias de ninguna persona',
        solution: 'Aunque técnicamente no es "plagio" en el sentido legal estricto, el uso no declarado de IA viola la integridad académica de la misma manera. Las universidades lo tratan como infracción equivalente o comparable.'
      },
      {
        mistake: 'Creer que humanizar el texto de IA lo convierte en trabajo propio',
        solution: 'Pasar texto de IA por un humanizador para ocultarlo es una infracción adicional (intento de engaño). El trabajo sigue sin ser tuyo. Si el texto original fue de IA, debe declararse independientemente de cómo fue modificado después.'
      },
      {
        mistake: 'Asumir que los detectores de plagio también detectan IA',
        solution: 'Son herramientas diferentes. Turnitin busca coincidencias con textos existentes; los detectores de IA analizan patrones estadísticos del texto. Un texto de IA puede pasar Turnitin perfectamente y al mismo tiempo ser claramente identificado como IA por un detector específico.'
      }
    ],
    faqs: [
      {
        question: '¿Usar ChatGPT para hacer un trabajo es plagio?',
        answer: 'Técnicamente, no es "plagio" en el sentido clásico (copiar de un autor identificable). Pero sí es una violación de integridad académica equivalente: presentas como propio un trabajo que no hiciste. Las universidades lo llaman "uso no autorizado de herramientas de IA" o lo incluyen directamente en sus definiciones ampliadas de plagio. El resultado práctico es el mismo: consecuencias académicas y falta de aprendizaje real.'
      },
      {
        question: '¿Turnitin detecta texto de ChatGPT?',
        answer: 'Turnitin ha incorporado funcionalidades de detección de IA (Turnitin AI Detector), pero son herramientas separadas a su detección de plagio tradicional. La función de detección de IA de Turnitin está disponible según la configuración de tu institución — no todas las universidades la activan. Además, los detectores de IA tienen tasas de error (falsos positivos y negativos), por lo que Turnitin recomienda usarlos como indicador, no como prueba definitiva.'
      },
      {
        question: '¿Qué es más grave: plagiar o usar IA sin declarar?',
        answer: 'DEPENDE DE LA INSTITUCIÓN y el contexto. Históricamente el plagio tiene consecuencias más establecidas. Pero algunas instituciones consideran el uso no declarado de IA más grave porque: (1) es difícil de detectar, (2) implica mayor intencionalidad (es difícil usar IA "accidentalmente"), (3) escala fácilmente. No hay una respuesta universal — consulta la política específica de tu institución.'
      }
    ],
    relatedGuides: [
      { title: 'Cómo Evitar Plagio Académico', slug: 'como-evitar-plagio-academico' },
      { title: 'Cómo Usar IA Éticamente en la Universidad', slug: 'como-usar-ia-eticamente-universidad' },
      { title: 'Mejores Prácticas de IA para Estudiantes', slug: 'mejores-practicas-uso-ia-estudiantes' }
    ],
    relatedTools: [
      { name: 'Detector de IA Gratis', url: '/?ref=guia-plagio-vs-ia' },
      { name: 'Verificador de Originalidad', url: '/verificador-de-ia?ref=guia-plagio-vs-ia' }
    ],
    cta: {
      text: 'Detectar si tu texto parece IA — gratis',
      url: '/?ref=guia-plagio-vs-ia'
    }
  },

  {
    slug: 'chatgpt-para-trabajos-universitarios-guia',
    title: 'ChatGPT para Trabajos Universitarios: Guía Completa',
    keywords: [
      'chatgpt trabajos universitarios',
      'usar chatgpt trabajos universidad',
      'chatgpt trabajos academicos como usar',
      'guia chatgpt estudiantes universitarios',
      'chatgpt ayuda trabajos uni'
    ],
    metaTitle: 'ChatGPT para Trabajos Universitarios: Guía Completa 2025',
    metaDescription: 'Cómo usar ChatGPT éticamente para trabajos universitarios. Usos permitidos, cómo declararlo, cómo evitar el plagio y verificar la originalidad. Guía práctica para estudiantes.',
    h1: 'ChatGPT para Trabajos Universitarios: Guía Ética y Práctica',
    intro: 'ChatGPT es ya una herramienta cotidiana para millones de estudiantes universitarios. El problema no es usarlo — el problema es usarlo mal. Esta guía te enseña exactamente cómo aprovechar ChatGPT para mejorar tu rendimiento académico sin comprometer tu integridad ni tu aprendizaje real.',
    overview: 'Esta guía cubre: (1) Usos legítimos y problemáticos de ChatGPT para trabajos universitarios, (2) Cómo solicitar ayuda sin que IA haga el trabajo por ti, (3) Cómo verificar y declarar el uso, (4) Qué hacer antes de entregar, (5) Herramientas para verificar si tu trabajo parece IA.',
    steps: [
      {
        number: 1,
        title: 'Conoce qué Permite tu Universidad (Antes de Usar ChatGPT)',
        description: 'Esta es la pregunta más importante. Las políticas varían enormemente: (1) UNIVERSIDADES PERMISIVAS: Permiten ChatGPT con declaración explícita. (2) UNIVERSIDADES RESTRICTIVAS: Prohíben cualquier uso de IA en trabajos evaluados. (3) POLÍTICA POR PROFESOR: El profesor de cada curso decide. Cómo verificar: Lee el syllabus del curso, revisa el código de honor de tu universidad, y si no queda claro, pregunta directamente al profesor. No asumas nada.',
        tips: [
          'Guarda la respuesta del profesor por escrito (email) como protección',
          'Las políticas cambian rápidamente — verifica cada semestre',
          'Si el syllabus dice "no IA", es no IA — sin excepciones'
        ]
      },
      {
        number: 2,
        title: 'Los 5 Usos Legítimos de ChatGPT para Trabajos',
        description: 'USO 1 — COMPRENSIÓN DE CONCEPTOS: Pide a ChatGPT que explique algo que no entendiste en clase. "Explícame el concepto de _____ con ejemplos simples." USO 2 — BRAINSTORMING: Genera ideas iniciales que TÚ luego desarrollas y filtras. "Dame 10 enfoques posibles para un ensayo sobre _____." USO 3 — FEEDBACK EN BORRADORES: Comparte TU borrador y pide crítica. "¿Qué partes de este texto están poco claras?" USO 4 — PRÁCTICA DE EJEMPLOS: Pide problemas de práctica para estudiar. "Genera 5 ejercicios de cálculo sobre derivadas." USO 5 — COMPRENSIÓN DE FUENTES: Pide que resuma un texto académico complejo para decidir si vale la pena leerlo completo.',
        tips: [
          'El criterio: ¿El trabajo intelectual final es tuyo? Si sí, el uso probablemente es legítimo',
          'Usa ChatGPT como punto de partida, no como punto de llegada',
          'Los mejores usos son los que te hacen aprender más, no los que te hacen trabajar menos'
        ]
      },
      {
        number: 3,
        title: 'Los 5 Usos Problemáticos que Debes Evitar',
        description: 'USO 1 — GENERAR EL ENSAYO COMPLETO: "Escribe un ensayo de 2000 palabras sobre X para mi clase de Y." Esto es uso indebido claro. USO 2 — CÓDIGO SIN ENTENDER: Hacer que ChatGPT resuelva un ejercicio de programación que presentas sin entender. USO 3 — COPIAR SIN DECLARAR: Tomar una respuesta de ChatGPT y pegarla sin declaración. USO 4 — USAR HUMANIZADORES: Pasar texto de IA por un humanizador para hacerlo pasar como tuyo. USO 5 — EN EXÁMENES: Usar ChatGPT durante un examen o prueba (aunque sea remoto), a menos que esté explícitamente permitido.',
        tips: [
          'Test sencillo: "¿Podría explicar este trabajo sin mirar notas si el profesor me preguntara?" Si no, hay problema',
          'Usar humanizadores para ocultar IA es considerado intento de engaño — consecuencias más graves',
          'Los exámenes online también tienen reglas — lee las instrucciones antes'
        ]
      },
      {
        number: 4,
        title: 'Cómo Verificar que Tu Trabajo No Parece Generado por IA',
        description: 'Antes de entregar, verifica que tu trabajo sea percibido como genuinamente tuyo: (1) USA UN DETECTOR DE IA: Pega tu texto en DetectordeIA.ai o una herramienta similar. Un trabajo que escribiste tú mismo con ayuda de ChatGPT como herramienta de apoyo debería tener baja probabilidad de IA. (2) LEE EN VOZ ALTA: El texto de IA suena diferente al leerlo en voz alta — mecánico, sin variación natural. (3) REVISIÓN DE ESPECIFICIDAD: ¿Tu trabajo tiene ejemplos concretos, datos reales con fuentes, argumentos propios? Si todo es genérico, probablemente recibió demasiado apoyo de IA.',
        tips: [
          'Si el detector de IA marca tu trabajo con alta probabilidad, revisa qué secciones y reescríbelas con tu voz',
          'Añadir tus propias opiniones y experiencias baja dramáticamente la probabilidad de IA',
          'Un trabajo con algunas imperfecciones estilísticas tuyas suena más humano que uno perfecto de IA'
        ]
      },
      {
        number: 5,
        title: 'Cómo Declarar Correctamente el Uso de ChatGPT',
        description: 'Si usaste ChatGPT de forma legítima, decláralo así: FORMATO ESTÁNDAR (al final del trabajo, antes de bibliografía):\n\n"Declaración de uso de IA: Utilicé ChatGPT (OpenAI, marzo 2025) para [especifica exactamente qué]: [ej: generar una lista inicial de argumentos posibles sobre el tema, de los cuales seleccioné y desarrollé 3 con mis propias palabras / recibir feedback sobre la claridad de mi argumento principal en el borrador]. Todo el contenido escrito en este trabajo es de mi autoría, basado en fuentes académicas, y fue verificado por mí."\n\nSé específico sobre el uso — "usé ChatGPT" es vago. "Usé ChatGPT para X finalidad concreta" es lo correcto.',
        tips: [
          'Guarda el link o screenshot de la conversación con ChatGPT que usaste',
          'Si tu universidad tiene formato específico de declaración, úsalo',
          'Incluye la fecha de la conversación y la versión de ChatGPT si la conoces'
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: 'Usar ChatGPT para todo el trabajo y luego cambiar "algunas palabras"',
        solution: 'Cambiar palabras del texto de ChatGPT es patchwriting, que sigue siendo uso indebido. El trabajo intelectual de análisis, argumentación y síntesis debe ser tuyo. ChatGPT puede ayudarte con el proceso, no hacer el proceso por ti.'
      },
      {
        mistake: 'Confiar en los "hechos" que da ChatGPT sin verificar',
        solution: 'ChatGPT alucina: inventa citas que parecen reales, estadísticas falsas, autores inexistentes. Verifica SIEMPRE cualquier dato, cita o estadística específica en fuentes primarias antes de incluirlos en tu trabajo.'
      },
      {
        mistake: 'Usar ChatGPT para escribir la introducción y conclusión (porque son "solo formato")',
        solution: 'La introducción y conclusión son parte esencial del trabajo académico. Si las genera IA, el trabajo intelectual de definir tu argumento central y sintetizarlo es de la IA, no tuyo. Son secciones donde tu voz debe estar presente especialmente.'
      },
      {
        mistake: 'No declarar porque "el profesor nunca lo va a saber"',
        solution: 'Los detectores de IA cada vez son más precisos. Pero más allá de eso: no declarar cuando usaste IA es engaño — independientemente de si te atrapen. El riesgo reputacional de ser descubierto es mucho mayor que el beneficio de ahorrar tiempo.'
      }
    ],
    faqs: [
      {
        question: '¿Está permitido usar ChatGPT en trabajos universitarios?',
        answer: 'DEPENDE de tu universidad y tu profesor. No hay una regla universal. Algunos cursos y universidades lo permiten con declaración explícita; otros lo prohíben completamente. Verifica el syllabus de tu curso y la política de tu institución. Si no queda claro, pregunta directamente al profesor antes de usarlo — siempre es mejor preguntar que asumir.'
      },
      {
        question: '¿Puede el profesor saber que usé ChatGPT?',
        answer: 'SÍ, con creciente probabilidad. Los profesores están entrenando su intuición para detectar texto de IA, y muchas instituciones ya tienen acceso a detectores como Turnitin AI Detector. Los detectores no son perfectos pero identifican patrones estadísticos. Además, si el estilo de tu trabajo es drásticamente diferente a tus trabajos anteriores, eso por sí solo levanta sospechas. No asumas que "nadie va a saber".'
      },
      {
        question: '¿Es lo mismo usar ChatGPT que copiar de Wikipedia?',
        answer: 'No exactamente. Wikipedia es una fuente identificable — si copias de ella sin citar, hay plagio clásico con fuente verificable. ChatGPT genera texto nuevo sin fuente identificable, lo que lo hace diferente técnicamente. Sin embargo, el efecto académico es similar: presentas trabajo no original como propio. Ambos requieren declaración y cita si los usas; ambos son problemáticos si no declara.'
      },
      {
        question: '¿Cómo verifico si mi trabajo parece de IA antes de entregarlo?',
        answer: 'Usa DetectordeIA.ai — es gratuito, está optimizado para español y te da un porcentaje de probabilidad de que el texto sea de IA. Pega tu trabajo completo para mejor precisión. Si el resultado es alto, revisa las secciones marcadas: típicamente son las más formales o más genéricas. Añade tu voz personal, ejemplos específicos y opiniones propias para bajar la probabilidad.'
      }
    ],
    relatedGuides: [
      { title: 'Cómo Usar IA Éticamente en la Universidad', slug: 'como-usar-ia-eticamente-universidad' },
      { title: 'Cómo Citar IA en Trabajos Académicos', slug: 'como-citar-ia-en-trabajos-academicos' },
      { title: 'Diferencia entre Plagio y Uso de IA', slug: 'diferencia-plagio-uso-ia-trabajos' }
    ],
    relatedTools: [
      { name: 'Detector de IA Gratis', url: '/?ref=guia-chatgpt-trabajos-uni' },
      { name: 'Humanizador de Texto', url: '/humanizador?ref=guia-chatgpt-trabajos-uni' }
    ],
    cta: {
      text: 'Verificar si tu trabajo parece IA — gratis',
      url: '/?ref=guia-chatgpt-trabajos-uni'
    }
  },

  {
    slug: 'politica-ia-universidades-latam-2025',
    title: 'Política de IA en Universidades de LATAM 2025',
    keywords: [
      'politica ia universidades latam',
      'universidades permitido chatgpt latam',
      'normas ia universidades latinoamerica',
      'reglamento ia universitarios',
      'politica inteligencia artificial universidades'
    ],
    metaTitle: 'Política de IA en Universidades de LATAM 2025: Guía Actualizada',
    metaDescription: 'Qué permiten y prohíben las principales universidades de América Latina y España sobre el uso de IA. UBA, UNAM, UCM, Javeriana y más. Actualizado 2025.',
    h1: 'Política de IA en Universidades de LATAM y España 2025: Qué Permiten',
    intro: 'Las universidades latinoamericanas y españolas están adaptando sus políticas al uso de inteligencia artificial a diferente ritmo. Esta guía resume el estado actual de las políticas en las principales instituciones y ofrece orientación para estudiantes que necesitan entender qué está permitido y qué no.',
    overview: 'Esta guía cubre: (1) El panorama general de políticas de IA en universidades de LATAM, (2) Posiciones de las principales universidades por país, (3) Cómo encontrar la política específica de tu universidad, (4) Qué hacer cuando la política no está clara, (5) Tendencias para 2025-2026.',
    steps: [
      {
        number: 1,
        title: 'El Panorama General de Políticas en LATAM y España',
        description: 'A 2025, las universidades latinoamericanas se dividen en tres grupos: (1) UNIVERSIDADES CON POLÍTICA CLARA PRO-REGULACIÓN: Han publicado guías específicas sobre uso de IA, generalmente permiten usos de apoyo con declaración obligatoria. Incluyen universidades como la UNAM (México), UBA (Argentina) y Complutense de Madrid. (2) UNIVERSIDADES EN PROCESO DE DEFINICIÓN: La mayoría están elaborando o actualizando sus políticas. Tienen lineamientos generales pero sin guías detalladas de IA. (3) UNIVERSIDADES SIN POLÍTICA ESPECÍFICA DE IA: Aplican sus políticas generales de integridad académica, que tipicamente incluyen el uso de IA como una forma de plagio.',
        tips: [
          'No asumas que si no hay política específica de IA, está todo permitido — lo contrario es más probable',
          'Las políticas pueden cambiar durante el semestre — verifica periódicamente',
          'La política de la institución es el mínimo; cada profesor puede ser más restrictivo'
        ]
      },
      {
        number: 2,
        title: 'Políticas por País: México y Argentina',
        description: 'MÉXICO — UNAM: Ha emitido orientaciones que permiten el uso de IA como herramienta de apoyo al aprendizaje, requiriendo declaración explícita. Cada facultad tiene margen para ser más restrictiva. IPN y universidades estatales generalmente siguen políticas similares aunque no siempre actualizadas. ARGENTINA — UBA: Ha adoptado una postura de regulación con transparencia — permite usos de apoyo con declaración, prohíbe sustitución del trabajo del estudiante. UNC y UNLP están en proceso de actualizar sus políticas. TENDENCIA EN AMBOS PAÍSES: Hacia la regulación con declaración obligatoria, no hacia la prohibición total.',
        tips: [
          'Verifica siempre la política actualizada en el sitio web oficial de tu institución',
          'Las resoluciones del Consejo Académico de tu facultad tienen fuerza vinculante',
          'Algunos programas de posgrado tienen políticas más estrictas que los de grado'
        ]
      },
      {
        number: 3,
        title: 'Políticas por País: Colombia, Chile y Perú',
        description: 'COLOMBIA — UNIVERSIDADES JAVERIANA Y UNIANDES: Entre las más avanzadas en políticas de IA en la región. Generalmente permiten uso con declaración en cursos donde el profesor lo autoriza. Los sílabos de cada curso especifican los alcances. UdeA y UNAL están desarrollando políticas institucionales. CHILE — PUC Y UNIVERSIDAD DE CHILE: Han emitido orientaciones generales que permiten usos de apoyo con declaración. Cada escuela puede tener políticas propias. PERÚ — PUCP Y UNM: En desarrollo de políticas. La PUCP ha emitido orientaciones que requieren transparencia en el uso. TENDENCIA REGIONAL: Las universidades privadas están siendo más ágiles en definir políticas claras que las públicas.',
        tips: [
          'El centro de escritura de tu universidad suele tener información actualizada sobre políticas de IA',
          'Los programas con acreditación internacional (AACSB, EQUIS) tienen sus propias normas adicionales',
          'Pregunta directamente a tu director de carrera si tienes dudas sobre la política'
        ]
      },
      {
        number: 4,
        title: 'España: UCM, UAB, UPV y Otras',
        description: 'España ha avanzado más rápido que LATAM en regularizar el uso de IA. ESTADO GENERAL: La CRUE (Conferencia de Rectores de Universidades Españolas) emitió en 2023 orientaciones sobre IA en educación. La mayoría de universidades españolas permiten uso de IA como herramienta con: (1) Declaración explícita del uso, (2) Autorización expresa del profesor, (3) Verificación de originalidad intelectual del estudiante. UCM, UAB, UPV y UAM tienen políticas más desarrolladas. Las universidades online (UNED, OBS, UNIR) tienen políticas específicas adaptadas a su modalidad.',
        tips: [
          'En España, la LOMLOE y el Pacto de Estado de la Educación incluyen referencias a IA',
          'Los Trabajos de Fin de Grado y Máster tienen restricciones adicionales en la mayoría de universidades',
          'El uso de IA en TFG/TFM puede requerir aprobación específica del tutor'
        ]
      },
      {
        number: 5,
        title: 'Cómo Encontrar la Política Específica de Tu Universidad',
        description: 'PASOS PARA ENCONTRAR LA POLÍTICA: (1) Busca en el sitio web de tu universidad: "política inteligencia artificial", "uso ChatGPT", "normativa IA". (2) Revisa el reglamento académico — puede incluir IA bajo "integridad académica" o "plagio". (3) Busca en el sitio web de tu facultad/escuela — muchas tienen normas propias. (4) Revisa el syllabus de cada curso — el profesor puede tener política específica. (5) Pregunta en la secretaría académica de tu departamento. SEÑAL DE ALERTA: Si no encuentras ninguna mención de IA, aplica la política más conservadora hasta preguntar explícitamente.',
        tips: [
          'Algunas universidades tienen un "chatbot de políticas" en su web — pregúntale sobre IA',
          'Los decanos y directores de carrera pueden explicar el estado actual aunque no haya documento público',
          'Formar parte de un comité estudiantil que trabaje en la política de IA es una manera de influir en ella'
        ]
      },
      {
        number: 6,
        title: 'Tendencias para 2025-2026',
        description: 'HACIA DÓNDE VA EL PANORAMA: (1) REGULACIÓN, NO PROHIBICIÓN: La tendencia mayoritaria es hacia permitir IA con transparencia y regulación, no hacia prohibirla. (2) DISTINCIÓN POR TIPO DE EVALUACIÓN: Exámenes presenciales = sin IA. Trabajos escritos = con declaración. (3) COMPETENCIAS DE IA COMO OBJETIVO: Algunas universidades ya incluyen "uso ético de IA" como competencia que los estudiantes deben desarrollar. (4) DETECCIÓN AUTOMATIZADA: Los sistemas como Turnitin incorporarán cada vez más capacidades de detección de IA. (5) ACTUALIZACIÓN CONTINUA: Las políticas se actualizarán con más frecuencia conforme evolucionen los modelos de IA.',
        tips: [
          'Desarrollar habilidades de uso ético de IA ahora es una ventaja competitiva real',
          'Las empresas están empezando a pedir competencias de IA — las universidades lo sabrán adaptar',
          'Participa en consultas sobre política de IA en tu universidad si las hay'
        ]
      }
    ],
    commonMistakes: [
      {
        mistake: 'Asumir que la política de otra universidad aplica a la tuya',
        solution: 'Cada institución tiene su propia política. Que la UBA permita X no significa que tu universidad también lo permita. Siempre verifica en tu institución específica.'
      },
      {
        mistake: 'Creer que la ausencia de política significa permiso total',
        solution: 'La ausencia de política específica de IA generalmente significa que aplica la política general de integridad académica, que suele incluir el uso de IA como forma de plagio. Siempre pregunta explícitamente antes de usar IA.'
      },
      {
        mistake: 'No actualizarse cuando la política cambia',
        solution: 'Las políticas de IA están cambiando frecuentemente. Verifica la política al inicio de cada semestre y cada vez que tengas un trabajo importante. Lo que era permitido hace 6 meses puede no serlo ahora.'
      }
    ],
    faqs: [
      {
        question: '¿Qué pasa si mi universidad no tiene política de IA definida?',
        answer: 'Aplica el principio de transparencia: si usas IA, decláralo aunque no haya política específica. Esto te protege si después se establece una política retroactiva. Además, pregunta explícitamente al profesor de cada curso — muchos tienen posición clara aunque la institución no haya publicado una política formal. En caso de duda extrema, no uses IA para ese trabajo específico.'
      },
      {
        question: '¿Las universidades van a prohibir definitivamente el uso de IA?',
        answer: 'NO parece ser la tendencia dominante. La mayoría de expertos en educación y las propias universidades están apostando por la regulación con transparencia, no por la prohibición total. La IA ya es una herramienta del mercado laboral y las universidades necesitan preparar a los estudiantes para usarla responsablemente. Lo que sí continuará son restricciones en evaluaciones específicas (exámenes, TFG) donde se quiere medir las capacidades individuales del estudiante.'
      },
      {
        question: '¿Puedo pedir a mi universidad que actualice su política de IA?',
        answer: 'SÍ, y es recomendable. Los consejos de estudiantes, asociaciones estudiantiles y delegados pueden elevar peticiones formales para que la institución defina políticas claras de IA. Una política clara beneficia a todos — estudiantes saben qué está permitido, profesores saben qué evaluar, y la institución tiene protección legal. La presión estudiantil organizada ha sido efectiva en varias universidades para acelerar este proceso.'
      }
    ],
    relatedGuides: [
      { title: 'Cómo Usar IA Éticamente en la Universidad', slug: 'como-usar-ia-eticamente-universidad' },
      { title: 'Mejores Prácticas de IA para Estudiantes', slug: 'mejores-practicas-uso-ia-estudiantes' },
      { title: 'ChatGPT para Trabajos Universitarios', slug: 'chatgpt-para-trabajos-universitarios-guia' }
    ],
    relatedTools: [
      { name: 'Detector de IA Gratis', url: '/?ref=guia-politica-ia-latam' },
      { name: 'Humanizador de Texto IA', url: '/humanizador?ref=guia-politica-ia-latam' }
    ],
    cta: {
      text: 'Verificar originalidad de tu trabajo — gratis',
      url: '/?ref=guia-politica-ia-latam'
    }
  },

  // ── SPRINT 3 + 4 GUIDES ──────────────────────────────────────────────────

  {
    slug: 'como-hacer-resumen-ejecutivo-sin-ia',
    title: 'Cómo Hacer un Resumen Ejecutivo Sin IA',
    keywords: ['resumen ejecutivo', 'como hacer resumen ejecutivo', 'resumen ejecutivo sin chatgpt', 'resumen ejecutivo ejemplo', 'estructura resumen ejecutivo'],
    metaTitle: 'Cómo Hacer un Resumen Ejecutivo Sin IA: Guía Paso a Paso 2025',
    metaDescription: 'Aprende a redactar un resumen ejecutivo profesional sin depender de ChatGPT. Estructura, ejemplos y técnicas para que sea tuyo 100%.',
    h1: 'Cómo Hacer un Resumen Ejecutivo Sin IA: Guía Completa',
    intro: 'Un resumen ejecutivo es la primera impresión de cualquier informe, tesis o proyecto empresarial. Generarlo con IA parece tentador, pero los evaluadores detectan fácilmente el tono genérico. Esta guía te enseña a redactarlo tú mismo en menos de 30 minutos con una estructura probada.',
    overview: 'Cubre: (1) qué es y para qué sirve, (2) estructura estándar en 5 bloques, (3) cómo resumir sin perder el mensaje clave, (4) errores que delatan el texto generado por IA, (5) checklist final.',
    steps: [
      { number: 1, title: 'Lee el documento completo antes de escribir', description: 'Nunca resumas lo que no has leído. Lee una vez para entender el conjunto, luego anota los 3-5 puntos más importantes.' },
      { number: 2, title: 'Identifica: problema, solución, resultados y llamada a la acción', description: 'Todo buen resumen ejecutivo responde 4 preguntas: ¿cuál es el problema? ¿qué propones? ¿qué resultados obtienes? ¿qué pedís al lector?' },
      { number: 3, title: 'Escribe primero el borrador a mano o en texto plano', description: 'Escribe sin editar. El objetivo es verter las ideas clave en un párrafo por bloque. No te preocupes por la perfección todavía.' },
      { number: 4, title: 'Revisa con la regla del "lector en 90 segundos"', description: 'El resumen ejecutivo debe comunicar el núcleo del documento en 90 segundos de lectura. Si tardas más, está demasiado largo o demasiado denso.' },
      { number: 5, title: 'Ajusta el tono al destinatario', description: 'Un resumen para un profesor difiere del de un inversor. Adapta el vocabulario técnico, la extensión y el énfasis según quién lo leerá.' }
    ],
    commonMistakes: [
      { mistake: 'Copiar frases del texto original', solution: 'Reformula con tus propias palabras. El resumen ejecutivo no es un collage de fragmentos.' },
      { mistake: 'Incluir detalles que no son esenciales', solution: 'Si un dato no cambia la decisión del lector, no va en el resumen ejecutivo.' },
      { mistake: 'Usar lenguaje genérico ("en el presente trabajo se analizó...")', solution: 'Usa voz activa: "Este proyecto propone...", "Los resultados muestran..."' }
    ],
    faqs: [
      { question: '¿Cuánto debe medir un resumen ejecutivo?', answer: 'Entre el 5% y el 10% del documento original. Para una tesis de 50 páginas, el resumen ejecutivo ideal tiene 1-2 páginas.' },
      { question: '¿Se puede usar IA para revisar (no para generar) el resumen?', answer: 'Sí, siempre que el texto base sea tuyo. Usar IA para revisar gramática o claridad es legítimo; usarla para generarlo es lo que se sanciona.' },
      { question: '¿El resumen ejecutivo va al principio o al final?', answer: 'Siempre al principio del documento, después del título y antes del índice. Se escribe al final del proceso pero se ubica al inicio.' }
    ],
    relatedGuides: [
      { title: 'Cómo Estructurar un Ensayo Argumentativo', slug: 'como-estructurar-ensayo-argumentativo' },
      { title: 'Cómo Mejorar la Escritura Académica', slug: 'como-mejorar-escritura-academica' },
      { title: 'Técnicas de Escritura Académica Sin IA', slug: 'tecnicas-de-escritura-academica-sin-ia' }
    ],
    relatedTools: [
      { name: 'Parafraseador Online', url: '/parafraseador?ref=guia-resumen-ejecutivo' },
      { name: 'Detector de IA Gratis', url: '/?ref=guia-resumen-ejecutivo' }
    ],
    cta: { text: 'Verificar que tu resumen es 100% original', url: '/?ref=guia-resumen-ejecutivo' }
  },

  {
    slug: 'como-usar-chatgpt-para-investigar-sin-plagiar',
    title: 'Cómo Usar ChatGPT para Investigar Sin Plagiar',
    keywords: ['chatgpt investigar', 'usar chatgpt investigacion', 'chatgpt sin plagiar', 'chatgpt trabajo universitario sin plagio', 'chatgpt buscar informacion'],
    metaTitle: 'Cómo Usar ChatGPT para Investigar Sin Plagiar: Guía 2025',
    metaDescription: 'Usa ChatGPT como asistente de investigación sin riesgo de plagio. Técnicas concretas para estudiantes universitarios que quieren aprovechar la IA éticamente.',
    h1: 'Cómo Usar ChatGPT para Investigar Sin Plagiar: Técnicas Paso a Paso',
    intro: 'ChatGPT puede ser un asistente de investigación potente si sabes usarlo correctamente. El problema no es usarlo — es no saber cuándo empieza el plagio. Esta guía traza la línea con ejemplos concretos.',
    overview: 'Aprende: (1) usos legítimos de ChatGPT en investigación, (2) cuándo el uso se convierte en plagio, (3) cómo generar ideas sin copiar, (4) cómo verificar lo que ChatGPT dice, (5) cómo declarar el uso correctamente.',
    steps: [
      { number: 1, title: 'Usa ChatGPT para generar preguntas de investigación, no respuestas', description: 'Pídele que te ayude a formular el problema de investigación o que proponga ángulos que no has considerado. Las preguntas son tuyas; las respuestas las construyes tú con fuentes reales.' },
      { number: 2, title: 'Verifica SIEMPRE las afirmaciones de ChatGPT con fuentes primarias', description: 'ChatGPT alucina datos, citas y estadísticas. Antes de incluir cualquier dato en tu trabajo, confírmalo en Google Scholar, bases de datos académicas o fuentes oficiales.' },
      { number: 3, title: 'Usa ChatGPT para entender conceptos, no para explicarlos en tu trabajo', description: 'Pídele que te explique un concepto difícil como si tuvieras 15 años. Una vez que lo entiendes, explícalo tú con tus palabras. Eso sí es aprendizaje.' },
      { number: 4, title: 'Cita las fuentes que encontraste por tu cuenta, no a ChatGPT', description: 'Si ChatGPT te dirigió hacia un autor o un estudio, busca ese artículo original y cítalo directamente. La referencia debe ser la fuente primaria, no el chatbot.' },
      { number: 5, title: 'Declara el uso de ChatGPT en la sección de metodología', description: 'Una frase como "Se utilizó ChatGPT (OpenAI, 2025) como herramienta exploratoria para identificar áreas temáticas, no como fuente de información primaria" es suficiente y honesta.' }
    ],
    commonMistakes: [
      { mistake: 'Incluir estadísticas que ChatGPT "inventó"', solution: 'Verifica todo número, porcentaje o dato en una fuente citable antes de incluirlo.' },
      { mistake: 'Pegar respuestas de ChatGPT directamente en el trabajo', solution: 'Usa sus respuestas como punto de partida para tu propia investigación, nunca como el destino.' },
      { mistake: 'No declarar el uso de ChatGPT por miedo a penalizaciones', solution: 'La transparencia protege más que el silencio. La mayoría de universidades penalizan el uso no declarado, no el declarado.' }
    ],
    faqs: [
      { question: '¿Puedo citar a ChatGPT como fuente en mi bibliografía?', answer: 'Técnicamente sí (APA 7ª edición incluye formato para citar software de IA), pero no deberías usarlo como fuente principal de información. ChatGPT no es una fuente académica — es un generador de texto que puede o no basarse en información correcta.' },
      { question: '¿ChatGPT puede ayudarme a encontrar papers académicos?', answer: 'Con cuidado. ChatGPT puede sugerir autores relevantes o títulos de áreas, pero inventa referencias frecuentemente. Úsalo para orientarte, luego busca los artículos tú mismo en Google Scholar, Scopus o PubMed.' },
      { question: '¿Usar ChatGPT para buscar es igual que plagiar?', answer: 'No, buscar ideas no es plagiar. Plagiar es presentar como tuyo el texto que generó ChatGPT. Si usas ChatGPT como motor de búsqueda conceptual y construyes tu trabajo con fuentes reales y argumentos propios, no hay plagio.' }
    ],
    relatedGuides: [
      { title: 'Cómo Investigar con Fuentes Académicas', slug: 'como-investigar-fuentes-academicas' },
      { title: 'Cómo Evitar el Plagio Académico', slug: 'como-evitar-plagio-academico' },
      { title: 'ChatGPT para Trabajos Universitarios', slug: 'chatgpt-para-trabajos-universitarios-guia' }
    ],
    relatedTools: [
      { name: 'Detector de IA Gratis', url: '/?ref=guia-chatgpt-investigar' },
      { name: 'Verificador de Originalidad', url: '/?ref=guia-chatgpt-investigar' }
    ],
    cta: { text: 'Verificar que tu trabajo no parece generado por IA', url: '/?ref=guia-chatgpt-investigar' }
  },

  {
    slug: 'herramientas-ia-para-estudiantes-universitarios',
    title: 'Las Mejores Herramientas de IA para Estudiantes Universitarios',
    keywords: ['herramientas ia estudiantes', 'ia para estudiar', 'mejores ia universitarios', 'apps ia estudiantes 2025', 'ia gratis estudiantes'],
    metaTitle: 'Las Mejores Herramientas de IA para Estudiantes en 2025 (Gratis y de Pago)',
    metaDescription: 'Las 10 mejores herramientas de IA para estudiantes universitarios en 2025. Cuáles son gratis, para qué sirve cada una y cómo usarlas sin violar las normas de tu universidad.',
    h1: 'Las Mejores Herramientas de IA para Estudiantes Universitarios en 2025',
    intro: 'Hay docenas de herramientas de IA para estudiantes, pero no todas son útiles, seguras o permitidas. Esta guía filtra las mejores por categoría, explica para qué sirve cada una y advierte cuándo su uso puede generarte problemas académicos.',
    overview: 'Cubre: (1) detector de IA para verificar tus textos, (2) asistentes de escritura, (3) herramientas de investigación, (4) organizadores de notas con IA, (5) cómo usarlas sin violar políticas universitarias.',
    steps: [
      { number: 1, title: 'Primero verifica qué herramientas permite tu universidad', description: 'Antes de adoptar cualquier herramienta, consulta la política de IA de tu institución. Algunas universidades listan explícitamente herramientas permitidas; otras prohíben categorías enteras.' },
      { number: 2, title: 'Para detectar IA en tus propios textos: DetectordeIA.ai', description: 'Antes de entregar cualquier trabajo donde hayas usado IA de apoyo, verifica que el resultado no sea detectado como generado por IA. Gratis, en español, sin registro.' },
      { number: 3, title: 'Para investigación: Perplexity AI y Connected Papers', description: 'Perplexity cita fuentes en tiempo real (reduce el riesgo de alucinaciones). Connected Papers muestra el grafo de papers relacionados con cualquier artículo académico.' },
      { number: 4, title: 'Para organizar notas y resumir: NotebookLM (Google)', description: 'Carga tus PDFs, apuntes y libros — NotebookLM genera resúmenes, preguntas de estudio y mapas conceptuales. Todo sobre tus propias fuentes, sin inventar datos.' },
      { number: 5, title: 'Para escritura y revisión: Claude o ChatGPT (con límites claros)', description: 'Úsalos para feedback ("¿Este argumento es claro?"), para encontrar inconsistencias, o para generar primeros borradores que después reescribes completamente. Nunca para texto final.' }
    ],
    commonMistakes: [
      { mistake: 'Usar herramientas de IA sin saber si tu universidad las permite', solution: 'Consulta el reglamento o pregunta directamente al profesor antes de usar cualquier herramienta en un trabajo evaluable.' },
      { mistake: 'Confundir "IA para aprender" con "IA para hacer el trabajo"', solution: 'Una herramienta que explica conceptos es legítima. Una herramienta que genera el trabajo entregable sin declarar es problemática.' },
      { mistake: 'No verificar la información que proporciona la IA', solution: 'Todas las herramientas de IA pueden generar errores. Siempre contrasta con fuentes primarias antes de incluir datos en tu trabajo.' }
    ],
    faqs: [
      { question: '¿Cuál es la mejor IA gratuita para estudiantes en 2025?', answer: 'Para investigación: Perplexity AI (gratis, cita fuentes). Para escritura y comprensión: Claude.ai (versión gratuita). Para organizar materiales propios: Google NotebookLM (gratuito). Para detectar si tu texto parece IA: DetectordeIA.ai (gratuito, en español).' },
      { question: '¿Es legal usar herramientas de IA en la universidad?', answer: 'Depende de cada institución y de cómo las uses. El uso no está prohibido por ley, pero puede violar los reglamentos académicos de tu universidad. La clave es la declaración y la honestidad sobre el uso.' },
      { question: '¿Las herramientas de IA guardan mis trabajos?', answer: 'La mayoría sí guardan conversaciones para mejorar sus modelos, salvo que lo configures de otra manera. Si tu trabajo contiene información confidencial o de investigación inédita, desactiva el historial o usa versiones de pago con privacidad mejorada.' }
    ],
    relatedGuides: [
      { title: 'Cómo Usar IA Éticamente en la Universidad', slug: 'como-usar-ia-eticamente-universidad' },
      { title: 'ChatGPT para Trabajos Universitarios', slug: 'chatgpt-para-trabajos-universitarios-guia' },
      { title: 'Cómo Usar ChatGPT para Investigar Sin Plagiar', slug: 'como-usar-chatgpt-para-investigar-sin-plagiar' }
    ],
    relatedTools: [
      { name: 'Detector de IA Gratis', url: '/?ref=guia-herramientas-ia' },
      { name: 'Humanizador de Texto', url: '/humanizador?ref=guia-herramientas-ia' }
    ],
    cta: { text: 'Probar el detector de IA gratuito para estudiantes', url: '/?ref=guia-herramientas-ia' }
  },

  {
    slug: 'ia-en-educacion-ventajas-y-riesgos',
    title: 'IA en la Educación: Ventajas, Riesgos y el Debate Real',
    keywords: ['ia en educacion', 'inteligencia artificial educacion', 'ventajas ia educacion', 'riesgos ia educacion', 'chatgpt en escuelas'],
    metaTitle: 'IA en la Educación: Ventajas y Riesgos en 2025 — Guía Completa',
    metaDescription: 'El debate real sobre IA en la educación: qué beneficios aporta, qué riesgos genera y qué dicen los expertos e instituciones en 2025.',
    h1: 'IA en la Educación: Ventajas, Riesgos y lo que Dicen los Expertos',
    intro: 'La IA está transformando la educación más rápido que las políticas de las instituciones. Estudiantes la usan para estudiar, para hacer trampa y para aprender más rápido — a veces todo al mismo tiempo. Esta guía analiza el fenómeno sin tomar partido pero con evidencia.',
    overview: 'Cubre: (1) beneficios documentados, (2) riesgos identificados, (3) qué dicen las investigaciones, (4) posición de las universidades, (5) cómo navegar el cambio como estudiante.',
    steps: [
      { number: 1, title: 'Entiende qué puede y qué no puede hacer la IA en educación', description: 'La IA puede personalizar el ritmo de aprendizaje, dar feedback inmediato y explicar conceptos de múltiples maneras. No puede reemplazar el pensamiento crítico, la creatividad genuina ni la comprensión profunda.' },
      { number: 2, title: 'Conoce los riesgos documentados para estudiantes', description: 'Dependencia cognitiva (se reduce el esfuerzo de pensar), dificultad para desarrollar escritura propia, alucinaciones tomadas como verdad, y riesgo de sanciones académicas por uso no declarado.' },
      { number: 3, title: 'Aprende qué dicen las investigaciones sobre IA y aprendizaje', description: 'Estudios de MIT y Stanford (2024) muestran que estudiantes que usan IA para completar tareas retienen menos conocimiento. El esfuerzo es parte del aprendizaje — la IA puede saltarse el proceso.' },
      { number: 4, title: 'Conoce la posición de tu institución', description: 'Las universidades están en tres posiciones: prohibición total, regulación con declaración, o integración activa en el currículo. Saber dónde está tu institución define lo que puedes hacer.' },
      { number: 5, title: 'Desarrolla una estrategia personal de uso ético', description: 'Usa IA para explorar, preguntar y verificar. No la uses para producir tu trabajo final. El conocimiento que construyes hoy es la competencia que te diferencia mañana.' }
    ],
    commonMistakes: [
      { mistake: 'Creer que la IA en educación es solo positiva o solo negativa', solution: 'El impacto depende del uso. Hay usos que aceleran el aprendizaje y usos que lo evitan. La diferencia está en si el estudiante procesa o solo consume.' },
      { mistake: 'Ignorar el debate sobre la IA en tu propia universidad', solution: 'Participar en el debate institucional te protege y posiciona como estudiante proactivo ante las nuevas normas.' }
    ],
    faqs: [
      { question: '¿La IA va a reemplazar a los profesores?', answer: 'Según el consenso actual de investigadores en educación: no. La IA puede automatizar partes de la enseñanza rutinaria, pero el rol del docente como guía, mentor y evaluador de pensamiento crítico es irreemplazable.' },
      { question: '¿Es malo que los estudiantes usen IA para estudiar?', answer: 'No intrínsecamente. Lo que importa es si el uso de IA produce aprendizaje real. Un estudiante que usa IA para entender mejor un concepto está aprendiendo; uno que la usa para saltarse el proceso de pensar, no.' },
      { question: '¿Qué ventajas concretas tiene la IA para estudiantes universitarios?', answer: 'Explicaciones personalizadas a cualquier nivel de comprensión, feedback inmediato sobre escritura, generación de ejemplos y contraejemplos, síntesis de bibliografía extensa, y práctica de exámenes con corrección automática.' }
    ],
    relatedGuides: [
      { title: 'Cómo Usar IA Éticamente en la Universidad', slug: 'como-usar-ia-eticamente-universidad' },
      { title: 'Política de IA en Universidades LATAM 2025', slug: 'politica-ia-universidades-latam-2025' },
      { title: 'Mejores Prácticas de IA para Estudiantes', slug: 'mejores-practicas-uso-ia-estudiantes' }
    ],
    relatedTools: [
      { name: 'Detector de IA Gratis', url: '/?ref=guia-ia-educacion' }
    ],
    cta: { text: 'Analizar originalidad de tu texto — gratis', url: '/?ref=guia-ia-educacion' }
  },

  {
    slug: 'tecnicas-de-escritura-academica-sin-ia',
    title: 'Técnicas de Escritura Académica Sin IA',
    keywords: ['escritura academica sin ia', 'como escribir academicamente', 'tecnicas escritura universitaria', 'redaccion academica sin chatgpt', 'mejorar escritura academica'],
    metaTitle: 'Técnicas de Escritura Académica Sin IA: Guía Práctica 2025',
    metaDescription: 'Domina la escritura académica sin depender de ChatGPT. Técnicas probadas para estudiantes universitarios: estructura, argumentación, estilo y originalidad.',
    h1: 'Técnicas de Escritura Académica Sin IA: Lo que los Profesores Quieren Leer',
    intro: 'La escritura académica tiene reglas propias que la IA imita mal. Saber escribir con rigor y originalidad es la habilidad que separa a los estudiantes destacados de los que aprueban raspando. Esta guía reúne las técnicas que funcionan.',
    overview: 'Cubre: (1) estructura básica del texto académico, (2) cómo desarrollar un argumento propio, (3) técnicas de estilo académico, (4) cómo referenciar sin interrumpir el flujo, (5) checklist de revisión final.',
    steps: [
      { number: 1, title: 'Empieza con una tesis clara y defendible', description: 'Todo texto académico gira alrededor de una tesis. No una pregunta, no un tema — una posición que puedes defender con evidencia. "La IA generativa reduce la originalidad del pensamiento estudiantil" es una tesis. "La IA en educación" es un tema.' },
      { number: 2, title: 'Estructura cada párrafo con el modelo PEEL', description: 'Point (idea del párrafo), Evidence (evidencia que la sostiene), Explanation (explicación de por qué la evidencia apoya la idea), Link (transición al siguiente párrafo). Un párrafo = una idea.' },
      { number: 3, title: 'Usa el lenguaje académico sin exagerar el tecnicismo', description: 'El buen texto académico es preciso, no oscuro. Evita los gerundios encadenados ("cabe destacar que se ha venido observando que..."). Escribe oraciones directas: sujeto + verbo + complemento.' },
      { number: 4, title: 'Integra fuentes sin perder tu propia voz', description: 'Cuando citas, primero da tu interpretación, luego la cita, luego explica por qué esa cita apoya tu argumento. Tu voz encuadra la evidencia; la evidencia no reemplaza tu argumento.' },
      { number: 5, title: 'Revisa en al menos dos pasadas separadas', description: 'Primera pasada: argumentación y estructura (¿cada párrafo apoya la tesis? ¿fluye la lógica?). Segunda pasada: estilo y gramática. Revisarlas juntas es menos efectivo.' }
    ],
    commonMistakes: [
      { mistake: 'Escribir sin haber leído suficiente sobre el tema', solution: 'La escritura académica es la destilación de la lectura. Escribe solo sobre lo que has leído; cita solo lo que has leído directamente.' },
      { mistake: 'Usar sinónimos para variar ("asimismo", "cabe señalar", "en este sentido")', solution: 'Estas muletillas son señales de texto de IA. En escritura real, cada palabra tiene una razón. Si no la tiene, elimínala.' },
      { mistake: 'Confundir longitud con calidad', solution: 'Un argumento bien desarrollado en 300 palabras supera a uno diluido en 1000. La densidad conceptual es lo que se evalúa.' }
    ],
    faqs: [
      { question: '¿Cómo desarrollo mi propio estilo de escritura académica?', answer: 'Lee mucho en tu disciplina — los textos más citados, no los más accesibles. Escribe regularmente aunque no sea para notas. Pide feedback específico sobre claridad y lógica, no solo sobre corrección gramatical.' },
      { question: '¿Cómo sé si mi texto "suena" demasiado a IA?', answer: 'Señales de alerta: oraciones de longitud uniforme, ausencia de especificidad, muletillas de transición ("en este sentido", "cabe destacar"), ausencia de citas concretas, y argumentos que funcionarían igual en cualquier disciplina. Pasa tu texto por DetectordeIA.ai.' },
      { question: '¿Puedo usar IA para corregir gramática de mi texto?', answer: 'Sí, con precaución. Las herramientas de corrección gramatical están permitidas en casi todas las universidades. El problema empieza cuando la herramienta reescribe párrafos enteros — ahí ya no es tu texto.' }
    ],
    relatedGuides: [
      { title: 'Cómo Estructurar un Ensayo Argumentativo', slug: 'como-estructurar-ensayo-argumentativo' },
      { title: 'Cómo Mejorar la Escritura Académica', slug: 'como-mejorar-escritura-academica' },
      { title: 'Cómo Parafrasear Correctamente', slug: 'como-parafrasear-correctamente' }
    ],
    relatedTools: [
      { name: 'Detector de IA Gratis', url: '/?ref=guia-escritura-academica' },
      { name: 'Parafraseador Online', url: '/parafraseador?ref=guia-escritura-academica' }
    ],
    cta: { text: 'Verificar que tu texto no parece generado por IA', url: '/?ref=guia-escritura-academica' }
  },

  {
    slug: 'como-presentar-tesis-con-integridad-academica',
    title: 'Cómo Presentar tu Tesis con Integridad Académica en la Era de la IA',
    keywords: ['tesis integridad academica', 'tesis sin plagio ia', 'como presentar tesis ia', 'tesis chatgpt permitido', 'defensa tesis ia'],
    metaTitle: 'Cómo Presentar tu Tesis con Integridad Académica: Guía 2025',
    metaDescription: 'Todo lo que necesitas saber sobre integridad académica en la tesis: qué uso de IA está permitido, cómo declararlo y cómo defender tu investigación.',
    h1: 'Cómo Presentar tu Tesis con Integridad Académica en 2025',
    intro: 'La tesis es el trabajo académico con más consecuencias — y también el que más scrutinio recibe en la era de la IA. Cometer una falta de integridad puede invalidar años de trabajo. Esta guía es tu mapa para evitarlo.',
    overview: 'Cubre: (1) qué usos de IA están generalmente permitidos en tesis, (2) cómo declarar herramientas en la metodología, (3) qué buscan los detectores en trabajos de grado, (4) cómo preparar la defensa, (5) qué hacer si tienes dudas sobre un uso previo.',
    steps: [
      { number: 1, title: 'Consulta el reglamento específico de tu institución antes de empezar', description: 'Muchas universidades tienen normativas específicas para TFG/TFM/tesis doctorales que difieren de las generales. La inversión de 30 minutos en leer el reglamento puede ahorrarte años de retraso.' },
      { number: 2, title: 'Documenta cada uso de IA desde el primer día', description: 'Mantén un registro: fecha, herramienta usada, prompt enviado, output recibido y cómo lo usaste. Este registro te protege si hay una auditoría y te ayuda a redactar la declaración metodológica.' },
      { number: 3, title: 'Redacta la sección de declaración de uso de IA en metodología', description: 'Incluye: qué herramientas usaste, para qué tareas específicas, cómo verificaste los outputs, y cómo la responsabilidad final sobre el contenido es tuya. Esta transparencia es tu principal protección.' },
      { number: 4, title: 'Prepara la defensa sabiendo explicar todo el contenido', description: 'En la defensa, el tribunal puede preguntarte por cualquier párrafo. Si usaste IA para redactar secciones, asegúrate de entenderlas a fondo y poder explicar, ampliar y defender cada argumento con tus propias palabras.' },
      { number: 5, title: 'Verifica el texto final con detector de IA antes de entregar', description: 'Aunque hayas sido ético en tu proceso, algunas frases pueden haber quedado con patrones asociados a texto generado por IA. Verifica y reescribe las secciones que el detector marque con alta probabilidad.' }
    ],
    commonMistakes: [
      { mistake: 'Usar IA para la revisión de literatura y no verificar las citas', solution: 'ChatGPT inventa referencias. Cada cita debe ser verificada directamente en la fuente original antes de incluirla.' },
      { mistake: 'Creer que la declaración de uso de IA es opcional en tesis', solution: 'En posgrado especialmente, la metodología de investigación incluye las herramientas utilizadas. Omitir herramientas de IA relevantes puede considerarse falta de transparencia.' },
      { mistake: 'No saber defender una sección generada con ayuda de IA', solution: 'Si no puedes explicar y defender un párrafo de tu propia tesis, no debería estar ahí. Reescríbelo desde tu comprensión real del tema.' }
    ],
    faqs: [
      { question: '¿Puedo usar ChatGPT para revisar el estilo de mi tesis?', answer: 'En la mayoría de instituciones sí, con declaración. La revisión de estilo y gramática es diferente a la generación de contenido. Cita el uso en la metodología para mayor seguridad.' },
      { question: '¿Los directores de tesis saben detectar texto de IA?', answer: 'Muchos sí, especialmente con experiencia. Además, cada vez más instituciones pasan los TFG/TFM por detectores de IA como parte del proceso de evaluación. La consistencia de estilo entre secciones también delata un uso no homogéneo de IA.' },
      { question: '¿Qué pasa si declaré un uso de IA que mi director no esperaba?', answer: 'Generalmente, la honestidad es valorada. Un director puede pedirte que revises secciones, pero es mucho menos grave que no declarar y ser descubierto. Habla con tu director antes de entregar si tienes dudas.' }
    ],
    relatedGuides: [
      { title: 'Diferencia entre Plagio y Uso de IA', slug: 'diferencia-plagio-uso-ia-trabajos' },
      { title: 'Cómo Evitar el Plagio Académico', slug: 'como-evitar-plagio-academico' },
      { title: 'Cómo Citar IA en Trabajos Académicos', slug: 'como-citar-ia-en-trabajos-academicos' }
    ],
    relatedTools: [
      { name: 'Detector de IA Gratis', url: '/?ref=guia-tesis-integridad' },
      { name: 'Verificador de Originalidad', url: '/?ref=guia-tesis-integridad' }
    ],
    cta: { text: 'Verificar originalidad de tu tesis — gratis', url: '/?ref=guia-tesis-integridad' }
  },

  {
    slug: 'que-hace-exactamente-turnitin-con-ia',
    title: 'Qué Hace Exactamente Turnitin con la IA en 2025',
    keywords: ['turnitin ia deteccion', 'turnitin detecta chatgpt', 'como funciona turnitin ia', 'turnitin porcentaje ia', 'turnitin similarity ia'],
    metaTitle: 'Qué Hace Turnitin con la IA en 2025: Cómo Funciona su Detector',
    metaDescription: 'Explicación técnica y práctica de cómo Turnitin detecta texto generado por IA en 2025, qué porcentaje es preocupante y cómo interpretar los informes.',
    h1: 'Qué Hace Exactamente Turnitin con la IA: Guía Completa 2025',
    intro: 'Turnitin añadió detección de IA en 2023 y desde entonces es el estándar en universidades de todo el mundo. Pero ¿cómo funciona realmente? ¿Puede distinguir texto de ChatGPT del tuyo? Esta guía lo explica sin tecnicismos.',
    overview: 'Cubre: (1) cómo funciona el detector de IA de Turnitin, (2) qué significa el porcentaje de IA, (3) falsos positivos y sus causas, (4) diferencia entre similitud y detección de IA, (5) cómo interpretar el informe.',
    steps: [
      { number: 1, title: 'Entiende que Turnitin tiene dos sistemas separados', description: 'El indicador de similitud (porcentaje rojo/amarillo) detecta plagio de fuentes conocidas. El indicador de IA (separado, generalmente en porcentaje azul) detecta si el texto parece generado por IA. Son independientes: puedes tener 0% similitud y alto porcentaje de IA.' },
      { number: 2, title: 'El detector de IA de Turnitin analiza patrones estadísticos del texto', description: 'Turnitin usa modelos entrenados para detectar la distribución probabilística de palabras que caracteriza el texto generado por GPT y similares. No tiene acceso a los prompts ni al historial de uso de ChatGPT.' },
      { number: 3, title: 'Aprende a interpretar el porcentaje de IA en el informe', description: 'Turnitin reporta el porcentaje de texto que considera probablemente generado por IA. Por encima del 20% muchas instituciones piden explicaciones. Por encima del 50% suele activar procesos disciplinarios. Pero cada institución define sus umbrales.' },
      { number: 4, title: 'Conoce los casos de falsos positivos documentados', description: 'Turnitin puede marcar como IA textos muy técnicos (especialmente en ciencias e ingeniería), textos en idiomas distintos del inglés, textos con estructura muy formulaica (como reportes financieros) y textos de escritores con estilo muy uniforme.' },
      { number: 5, title: 'Si obtienes un porcentaje inesperado, documenta tu proceso', description: 'Si tu texto es genuinamente tuyo y Turnitin lo marca, reúne evidencia de tu proceso: borradores, notas, historial de edición del documento, capturas de búsquedas. La mayoría de instituciones aceptan el proceso como defensa ante falsos positivos.' }
    ],
    commonMistakes: [
      { mistake: 'Creer que 0% de similitud garantiza que no detectará IA', solution: 'Son dos indicadores separados. Puedes no haber copiado de ninguna fuente conocida y aún así tener alto porcentaje de detección de IA.' },
      { mistake: 'Confiar en que Turnitin no detecta Claude o Gemini', solution: 'El detector de Turnitin está entrenado para texto generado por IA en general, no solo ChatGPT. Claude, Gemini y otros modelos también producen texto con patrones que Turnitin detecta.' }
    ],
    faqs: [
      { question: '¿Puede Turnitin identificar qué modelo de IA generó el texto?', answer: 'No. Turnitin detecta si el texto parece generado por IA, pero no puede decir si fue ChatGPT, Claude, Gemini u otro modelo. Solo indica la probabilidad de que sea texto generado por IA.' },
      { question: '¿El humanizador de texto engaña a Turnitin?', answer: 'Algunos humanizadores reducen la señal de IA, pero Turnitin actualiza sus modelos regularmente. La estrategia más fiable no es evadir el detector sino escribir el trabajo genuinamente. Si lo usas como apoyo y reescribes con tus palabras, el resultado suele pasar sin problemas.' },
      { question: '¿Qué porcentaje de IA en Turnitin es preocupante?', answer: 'Depende de la institución. Muchas universidades no tienen umbral definido y evalúan caso por caso. Como referencia, Turnitin considera que por encima del 20% hay "señales significativas" que justifican revisión. Pero algunos profesores actúan ante cualquier porcentaje por encima de 0%.' }
    ],
    relatedGuides: [
      { title: 'Diferencia entre Plagio y Uso de IA', slug: 'diferencia-plagio-uso-ia-trabajos' },
      { title: 'Cómo Presentar tu Tesis con Integridad Académica', slug: 'como-presentar-tesis-con-integridad-academica' },
      { title: 'Cómo Detectar Texto IA Sin Herramientas', slug: 'como-detectar-texto-ia-sin-herramientas' }
    ],
    relatedTools: [
      { name: 'Detector de IA Gratis', url: '/?ref=guia-turnitin-ia' },
      { name: 'vs Turnitin — Comparativa', url: '/detector-de-ia-vs/turnitin?ref=guia-turnitin-ia' }
    ],
    cta: { text: 'Verificar tu texto con nuestro detector gratuito', url: '/?ref=guia-turnitin-ia' }
  },

  {
    slug: 'guia-politica-ia-para-profesores',
    title: 'Guía de Política de IA para Profesores Universitarios',
    keywords: ['politica ia profesores', 'como detectar ia en trabajos', 'guia ia para docentes', 'deteccion ia estudiantes', 'profesor chatgpt trabajos'],
    metaTitle: 'Guía de Política de IA para Profesores: Cómo Detectar y Gestionar el Uso 2025',
    metaDescription: 'Guía práctica para profesores sobre cómo redactar políticas de IA, detectar uso no declarado y diseñar evaluaciones resistentes al fraude con IA.',
    h1: 'Guía de Política de IA para Profesores Universitarios en 2025',
    intro: 'Los profesores están en primera línea del debate sobre IA en la educación sin que nadie les haya dado un manual. Esta guía reúne lo que funciona: desde redactar una política clara hasta diseñar evaluaciones que la IA no puede completar.',
    overview: 'Cubre: (1) cómo redactar una política de IA para tu asignatura, (2) herramientas para detectar uso de IA, (3) señales textuales de texto generado por IA, (4) cómo diseñar evaluaciones resilientes, (5) cómo gestionar casos de sospecha.',
    steps: [
      { number: 1, title: 'Redacta una política de IA clara al inicio del semestre', description: 'Una política efectiva especifica: qué herramientas están permitidas (si hay alguna), para qué tareas, cómo declarar el uso, y cuáles son las consecuencias del uso no declarado. La ambigüedad no protege al profesor — protege al estudiante que hace trampa.' },
      { number: 2, title: 'Usa detectores de IA como primera línea de análisis', description: 'Herramientas como DetectordeIA.ai, GPTZero o el módulo de Turnitin son el primer filtro. No son infalibles, pero señalan trabajos que merecen revisión adicional. Úsalos como punto de partida, no como juez final.' },
      { number: 3, title: 'Aprende las señales textuales de escritura generada por IA', description: 'Uniformidad en longitud de oraciones, vocabulario omnidisciplinar sin especificidad, transiciones formulaicas ("en este contexto", "cabe destacar"), ausencia de opinión personal, y ausencia de referencias a contextos concretos del curso.' },
      { number: 4, title: 'Diseña evaluaciones que la IA no puede completar sin ser detectada', description: 'Usa preguntas que requieren ejemplos concretos de clase, reflexión sobre experiencias personales, análisis de materiales específicos del curso, o posiciones sobre debates no resueltos. La IA no sabe qué pasó en tu aula.' },
      { number: 5, title: 'Gestiona los casos de sospecha con proceso, no con certeza', description: 'Ante sospecha, solicita al estudiante que explique su trabajo en conversación directa. Si no puede defender su propio texto, eso es más evidencia que cualquier porcentaje de detector. Sigue el procedimiento disciplinario de tu institución.' }
    ],
    commonMistakes: [
      { mistake: 'Prohibir la IA sin dar alternativas claras o formación', solution: 'La prohibición sin educación genera ansiedad y creatividad en la evasión. Es más efectivo enseñar uso ético que solo prohibir.' },
      { mistake: 'Usar detectores de IA como prueba definitiva para sanciones', solution: 'Los detectores tienen falsos positivos. Úsalos como indicador de revisión adicional, no como evidencia suficiente por sí sola para sanciones.' }
    ],
    faqs: [
      { question: '¿Qué herramientas de detección de IA son las más fiables?', answer: 'Para texto en español: DetectordeIA.ai. Para inglés: GPTZero y el módulo de Turnitin. Ninguna es 100% fiable; la combinación de varios indicadores (detector + análisis textual + entrevista) es lo más sólido.' },
      { question: '¿Cómo pido a un estudiante que explique su trabajo sin acusarlo?', answer: 'Formula preguntas abiertas en positivo: "Me interesa tu argumento sobre X, ¿puedes ampliarlo?" o "¿Cómo llegaste a esta conclusión?" Si el trabajo es genuino, el estudiante puede responder. Si no, la dificultad para responder es información relevante.' },
      { question: '¿Debo permitir el uso de IA si mi institución no tiene política?', answer: 'Es tu prerrogativa definir las reglas de tu asignatura mientras la institución no lo haga. Comunicar una política clara al inicio del semestre es legalmente más sólido que actuar ad hoc cuando surja un caso.' }
    ],
    relatedGuides: [
      { title: 'Qué Hace Exactamente Turnitin con la IA', slug: 'que-hace-exactamente-turnitin-con-ia' },
      { title: 'Cómo Detectar Texto IA Sin Herramientas', slug: 'como-detectar-texto-ia-sin-herramientas' },
      { title: 'Política de IA en Universidades LATAM 2025', slug: 'politica-ia-universidades-latam-2025' }
    ],
    relatedTools: [
      { name: 'Detector de IA Gratis para Profesores', url: '/?ref=guia-ia-profesores' }
    ],
    cta: { text: 'Analizar textos de estudiantes — gratis', url: '/?ref=guia-ia-profesores' }
  },

  // ── SPRINT 4A ────────────────────────────────────────────────────────────

  {
    slug: 'como-revisar-ortografia-sin-ia',
    title: 'Cómo Revisar la Ortografía Sin Depender de IA',
    keywords: ['revisar ortografia sin ia', 'corrector ortografia sin chatgpt', 'revisar texto sin ia', 'ortografia academica', 'como mejorar ortografia'],
    metaTitle: 'Cómo Revisar la Ortografía Sin IA: Métodos y Herramientas 2025',
    metaDescription: 'Métodos probados para revisar la ortografía de tus textos académicos sin depender de ChatGPT. Herramientas, técnicas manuales y hábitos que funcionan.',
    h1: 'Cómo Revisar la Ortografía Sin Depender de IA: Guía Práctica',
    intro: 'El corrector automático y la IA se han convertido en el primer recurso para revisar ortografía, pero depender de ellos tiene un precio: el texto pierde tu voz y puede quedar marcado como generado por IA. Esta guía te enseña métodos que mejoran tu ortografía de verdad.',
    overview: 'Cubre: (1) por qué la IA no es la mejor herramienta para ortografía académica, (2) correctores no-IA recomendados, (3) técnica de revisión en frío, (4) errores ortográficos más frecuentes en español académico, (5) hábitos para mejorar a largo plazo.',
    steps: [
      { number: 1, title: 'Usa correctores ortográficos tradicionales, no IA generativa', description: 'LanguageTool (gratuito, open-source) y el corrector integrado de Word/Google Docs detectan errores ortográficos sin reescribir tu texto. Son herramientas de corrección, no de generación — no alteran tu voz ni producen señales de IA.' },
      { number: 2, title: 'Aplica la técnica de lectura en frío', description: 'Deja el texto reposar al menos 2 horas antes de revisar. Tu cerebro leerá lo que escribiste en lugar de lo que querías escribir. Lee en voz alta: el oído detecta errores que el ojo omite.' },
      { number: 3, title: 'Lee de atrás hacia adelante párrafo por párrafo', description: 'Para la revisión ortográfica pura, leer desde el último párrafo al primero rompe el flujo narrativo y te fuerza a ver palabras en lugar de frases. Detectas tildes, concordancias y erratas que el modo de lectura normal omite.' },
      { number: 4, title: 'Ten a mano una lista de tus errores frecuentes', description: 'Todos cometemos los mismos errores recurrentes: "haber/a ver", "hay/ahí/ay", "porqué/porque/por qué/por que", "así mismo/asimismo". Crea tu lista personal y búscalos explícitamente en cada revisión.' },
      { number: 5, title: 'Usa el buscador de tu procesador de texto', description: 'Ctrl+F es tu aliado: busca "que" para verificar si necesita tilde, busca "cion" para revisar que tengas "ción" donde corresponde, busca "mas" para verificar si debería ser "más". Rápido, preciso y sin IA.' }
    ],
    commonMistakes: [
      { mistake: 'Confiar únicamente en el subrayado rojo del procesador de texto', solution: 'Los correctores integrados no detectan errores contextuales ("tubo" en lugar de "tuvo"). Complementa con lectura manual.' },
      { mistake: 'Pedir a ChatGPT que corrija la ortografía', solution: 'ChatGPT no solo corrige — reescribe. El texto resultante puede perder tu voz y generar señales de IA. Para ortografía usa LanguageTool o revisión manual.' }
    ],
    faqs: [
      { question: '¿LanguageTool es bueno para español académico?', answer: 'Sí, es el mejor corrector no-IA gratuito para español. Detecta errores ortográficos, gramaticales, de concordancia y de estilo. La versión premium mejora la detección de errores de estilo académico.' },
      { question: '¿Puedo usar el corrector de Word sin que reescriba mi texto?', answer: 'Sí. El corrector de Word en modo ortografía y gramática (F7) señala errores pero no los corrige automáticamente — tú decides qué cambiar. No genera señales de IA en tu texto.' },
      { question: '¿Cómo sé si mejoré mi ortografía o solo la delegué?', answer: 'Si puedes escribir sin corrector y luego verificar con él encontrando pocos errores, mejoraste. Si el corrector siempre encuentra los mismos errores, los estás delegando. El objetivo es que la lista de errores frecuentes se acorte con el tiempo.' }
    ],
    relatedGuides: [
      { title: 'Técnicas de Escritura Académica Sin IA', slug: 'tecnicas-de-escritura-academica-sin-ia' },
      { title: 'Cómo Mejorar la Escritura Académica', slug: 'como-mejorar-escritura-academica' },
      { title: 'Cómo Parafrasear Correctamente', slug: 'como-parafrasear-correctamente' }
    ],
    relatedTools: [
      { name: 'Detector de IA Gratis', url: '/?ref=guia-ortografia-sin-ia' },
      { name: 'Parafraseador Online', url: '/parafraseador?ref=guia-ortografia-sin-ia' }
    ],
    cta: { text: 'Verificar que tu texto no parece generado por IA', url: '/?ref=guia-ortografia-sin-ia' }
  },

  {
    slug: 'como-argumentar-ensayo-sin-ia',
    title: 'Cómo Argumentar en un Ensayo Sin Usar IA',
    keywords: ['como argumentar ensayo', 'argumentacion academica sin ia', 'como hacer argumentos ensayo', 'argumentar sin chatgpt', 'tecnicas argumentacion'],
    metaTitle: 'Cómo Argumentar en un Ensayo Sin IA: Técnicas de Argumentación 2025',
    metaDescription: 'Aprende a construir argumentos sólidos en ensayos académicos sin depender de ChatGPT. Técnicas de argumentación que los profesores valoran.',
    h1: 'Cómo Argumentar en un Ensayo Sin IA: Técnicas que Funcionan',
    intro: 'El mayor problema de los ensayos generados por IA no es la ortografía — es que los argumentos son genéricos, no toman posición real y no conectan con el contexto específico del curso. Argumentar bien es la habilidad que la IA no puede reemplazar. Esta guía te enseña a hacerlo.',
    overview: 'Cubre: (1) qué hace a un argumento sólido, (2) estructura de argumentación en 3 niveles, (3) cómo anticipar objeciones, (4) cómo usar evidencia sin perder tu posición, (5) errores de argumentación que delatan uso de IA.',
    steps: [
      { number: 1, title: 'Define tu posición antes de buscar evidencia', description: 'La IA genera argumentos buscando el consenso. Tú debes hacer lo contrario: define tu posición primero, luego busca evidencia. Una posición es una respuesta concreta y defendible a la pregunta del ensayo, no una enumeración de perspectivas.' },
      { number: 2, title: 'Estructura cada argumento con CLAIM + WARRANT + EVIDENCE', description: 'Claim: tu afirmación. Warrant: por qué esa afirmación es relevante para la tesis. Evidence: la evidencia concreta que la respalda. Sin los tres, no es un argumento — es una opinión o una descripción.' },
      { number: 3, title: 'Anticipa y responde la objeción más fuerte', description: 'Un argumento académico que no considera la contraparte más sólida es débil. Identifica la objeción principal a tu posición ("Sin embargo, podría objetarse que...") y respóndela. Esto demuestra dominio del tema que la IA no puede fingir.' },
      { number: 4, title: 'Conecta la evidencia con tu contexto específico', description: 'La IA usa evidencia de forma genérica. Tú debes conectarla con el contexto del curso, el autor visto en clase, o los debates específicos de tu disciplina. Esa especificidad es imposible de generar para un modelo sin contexto.' },
      { number: 5, title: 'Cierra cada argumento volviendo a la tesis', description: 'Cada párrafo argumentativo debe terminar mostrando cómo ese argumento apoya la tesis central. No dejes que la evidencia hable sola — tú la interpretas y la conectas.' }
    ],
    commonMistakes: [
      { mistake: 'Presentar múltiples perspectivas sin tomar posición', solution: 'Mostrar "por un lado... por otro lado..." sin concluir es lo que hace la IA para evitar conflictos. Los profesores valoran la posición. Toma partido y defiéndelo.' },
      { mistake: 'Usar citas largas como sustituto del argumento propio', solution: 'Una cita larga no es un argumento. Es evidencia. Tu argumentación es la interpretación que haces de esa evidencia y por qué apoya tu tesis.' }
    ],
    faqs: [
      { question: '¿Cómo sé si mi argumento es original o genérico?', answer: 'Hazte esta pregunta: ¿podría este argumento aparecer en cualquier ensayo sobre este tema, o solo en el mío? Si cualquier estudiante podría haberlo escrito, es genérico. La originalidad viene de la posición específica, los ejemplos propios y la conexión con el contexto del curso.' },
      { question: '¿Es malo usar estructuras de argumentación conocidas como Toulmin o PEEL?', answer: 'No. Las estructuras son andamiaje, no contenido. Usar el modelo Toulmin para organizar un argumento genuinamente tuyo es escribura académica correcta. El problema es cuando el contenido también es genérico.' },
      { question: '¿Puede la IA ayudarme a argumentar mejor sin generar el texto?', answer: 'Sí. Puedes pedirle a la IA que te señale las debilidades de tu argumento, que te proponga objeciones a tu posición, o que te liste fuentes donde buscar evidencia. Eso es usar la IA como espejo crítico, no como ghostwriter.' }
    ],
    relatedGuides: [
      { title: 'Cómo Estructurar un Ensayo Argumentativo', slug: 'como-estructurar-ensayo-argumentativo' },
      { title: 'Cómo Escribir Ensayos Originales', slug: 'como-escribir-ensayos-originales' },
      { title: 'Técnicas de Escritura Académica Sin IA', slug: 'tecnicas-de-escritura-academica-sin-ia' }
    ],
    relatedTools: [
      { name: 'Detector de IA Gratis', url: '/?ref=guia-argumentar-sin-ia' },
      { name: 'Humanizador de Texto', url: '/humanizador?ref=guia-argumentar-sin-ia' }
    ],
    cta: { text: 'Verificar que tu ensayo es 100% tuyo', url: '/?ref=guia-argumentar-sin-ia' }
  },

  {
    slug: 'como-hacer-introduccion-trabajo-academico',
    title: 'Cómo Hacer una Introducción para un Trabajo Académico',
    keywords: ['como hacer introduccion trabajo academico', 'introduccion ensayo universidad', 'como empezar trabajo academico', 'introduccion tesis ejemplo', 'estructura introduccion academica'],
    metaTitle: 'Cómo Hacer una Introducción Académica: Guía Paso a Paso 2025',
    metaDescription: 'Aprende a redactar la introducción perfecta para trabajos universitarios, ensayos y tesis. Estructura, ejemplos y errores que delatan uso de IA.',
    h1: 'Cómo Hacer una Introducción para un Trabajo Académico: Guía Completa',
    intro: 'La introducción es lo primero que lee el profesor y lo que determina la primera impresión. Una introducción generada por IA se reconoce al instante por su vaguedad y por empezar siempre con la misma fórmula. Esta guía te enseña a escribir una que funcione.',
    overview: 'Cubre: (1) estructura en 3 bloques de toda buena introducción, (2) cómo abrir sin clichés, (3) cómo plantear el problema de forma precisa, (4) cómo terminar con una tesis clara, (5) longitud y proporciones correctas.',
    steps: [
      { number: 1, title: 'El bloque de apertura: contextualiza el tema sin ser vago', description: 'La IA abre con frases como "En el mundo actual..." o "Desde tiempos inmemoriales...". Tú debes abrir con algo concreto: un dato, un problema específico, una pregunta real o una afirmación que tu texto va a defender. El contexto debe ser el mínimo necesario para que el lector entienda la relevancia.' },
      { number: 2, title: 'El bloque del problema: define qué está en juego', description: 'Explica qué problema, pregunta o debate motiva tu trabajo. Cuanto más específico, mejor. No "el impacto de la IA en la educación" sino "la ausencia de políticas institucionales claras sobre IA en universidades latinoamericanas entre 2023 y 2025".' },
      { number: 3, title: 'El bloque de la tesis: di qué vas a argumentar', description: 'La tesis va al final de la introducción y es una oración que resume tu posición o argumento principal. Debe ser una afirmación que tu trabajo puede defender con evidencia, no una descripción de lo que vas a hacer.' },
      { number: 4, title: 'La hoja de ruta (opcional pero útil en trabajos largos)', description: 'En trabajos de más de 10 páginas, añade una oración que anticipe la estructura: "El primer capítulo... el segundo... la conclusión...". No es necesario en ensayos cortos.' },
      { number: 5, title: 'Revisa que tu introducción cumpla la promesa del título', description: 'El título del trabajo y la introducción deben hacer la misma promesa. Si el título dice "Análisis del impacto de la IA en la evaluación universitaria", la introducción debe llevar al lector exactamente ahí.' }
    ],
    commonMistakes: [
      { mistake: 'Abrir con una definición de diccionario', solution: '"Según la Real Academia Española, la inteligencia artificial es..." es el inicio más predecible y aburrido posible. Reserva las definiciones para el cuerpo si son necesarias.' },
      { mistake: 'Hacer la introducción demasiado larga', solution: 'La introducción no debe superar el 10-15% del total del trabajo. Si tienes 2000 palabras, la introducción debería tener 200-300 palabras. La información de fondo va en el marco teórico, no en la introducción.' }
    ],
    faqs: [
      { question: '¿La introducción se escribe al principio o al final del proceso?', answer: 'Al final, idealmente. Escribe el cuerpo del trabajo primero — así sabrás exactamente qué prometiste y puedes hacer que la introducción refleje con precisión lo que el trabajo entrega.' },
      { question: '¿Cómo sé si mi introducción parece de IA?', answer: 'Señales de alerta: abre con generalidad ("En el contexto actual..."), usa muchos gerundios seguidos, no hay una tesis clara, y la longitud es desproporcionada. Pasa tu introducción por DetectordeIA.ai y revisa esos patrones.' },
      { question: '¿Puedo usar una cita famosa para abrir la introducción?', answer: 'Con cuidado. Una cita puede funcionar si está directamente conectada con tu argumento y no es genérica. Abrir con una cita de Einstein en un trabajo sobre integridad académica es un cliché. Abrir con una cita del rectorado de tu universidad sobre IA podría ser específica y relevante.' }
    ],
    relatedGuides: [
      { title: 'Cómo Estructurar un Ensayo Argumentativo', slug: 'como-estructurar-ensayo-argumentativo' },
      { title: 'Cómo Hacer una Conclusión de Ensayo', slug: 'como-hacer-conclusion-ensayo' },
      { title: 'Técnicas de Escritura Académica Sin IA', slug: 'tecnicas-de-escritura-academica-sin-ia' }
    ],
    relatedTools: [
      { name: 'Detector de IA Gratis', url: '/?ref=guia-introduccion-academica' },
      { name: 'Humanizador de Texto', url: '/humanizador?ref=guia-introduccion-academica' }
    ],
    cta: { text: 'Verificar que tu introducción no parece de IA', url: '/?ref=guia-introduccion-academica' }
  },

  {
    slug: 'como-hacer-conclusion-ensayo',
    title: 'Cómo Hacer una Conclusión de Ensayo que Impresione',
    keywords: ['como hacer conclusion ensayo', 'conclusion trabajo academico', 'como terminar un ensayo', 'conclusion tesis ejemplo', 'conclusion sin ia'],
    metaTitle: 'Cómo Hacer una Conclusión de Ensayo: Guía con Ejemplos 2025',
    metaDescription: 'Aprende a redactar conclusiones académicas que cierren con fuerza sin repetir ni depender de IA. Estructura, errores comunes y ejemplos concretos.',
    h1: 'Cómo Hacer una Conclusión de Ensayo que Cierre con Fuerza',
    intro: 'La conclusión es donde el lector decide si el trabajo valió la pena. Las conclusiones generadas por IA son fácilmente detectables: resumen lo dicho sin añadir nada, usan fórmulas como "En conclusión, podemos afirmar que..." y no dejan al lector con nada nuevo. Esta guía te enseña a hacerlo diferente.',
    overview: 'Cubre: (1) qué debe hacer una conclusión académica, (2) estructura en 3 movimientos, (3) cómo ir más allá del resumen, (4) errores que delatan uso de IA, (5) longitud y tono correcto.',
    steps: [
      { number: 1, title: 'Sintetiza (no resumas): muestra cómo los argumentos se conectan', description: 'Hay diferencia entre resumir (repetir lo dicho) y sintetizar (mostrar cómo las partes forman un todo mayor). Tu conclusión debe mostrar el patrón que emerge de los argumentos, no listarlos de nuevo.' },
      { number: 2, title: 'Responde la pregunta implícita: "¿y entonces qué?"', description: 'Todo argumento debería llevar a algo. La conclusión responde por qué importa tu tesis más allá del trabajo en sí: qué implica para la práctica, qué contradice una creencia extendida, qué debería cambiar.' },
      { number: 3, title: 'Abre hacia futuro sin prometer lo que no puedes entregar', description: 'Una buena conclusión señala lo que queda por investigar, las limitaciones del análisis o las preguntas que el trabajo abre. Esto muestra madurez académica. La IA suele ignorar las limitaciones porque nadie se las pide.' },
      { number: 4, title: 'Evita las fórmulas de cierre predecibles', description: 'Frases prohibidas: "En conclusión...", "Para concluir...", "En resumen..." al inicio del párrafo. Son señales automáticas de texto genérico o de IA. Empieza la conclusión directamente con la síntesis.' },
      { number: 5, title: 'Conecta con la introducción sin copiarla', description: 'La conclusión y la introducción deben hacer eco. Si la introducción planteó una pregunta o un problema, la conclusión debe responderlo explícitamente. Esto crea un cierre narrativo que la IA rara vez logra.' }
    ],
    commonMistakes: [
      { mistake: 'Introducir información nueva en la conclusión', solution: 'La conclusión no es el lugar para nuevos datos o argumentos. Si tienes algo importante que decir, ve al cuerpo del trabajo.' },
      { mistake: 'Hacer una conclusión más larga que la introducción', solution: 'La conclusión debe ser más corta que la introducción (10% del total o menos). Si te está quedando larga, estás metiendo información que debería estar en el cuerpo.' }
    ],
    faqs: [
      { question: '¿Puedo poner recomendaciones en la conclusión?', answer: 'Depende del tipo de trabajo. En informes técnicos y trabajos aplicados, las recomendaciones son parte esperada de la conclusión. En ensayos teóricos, son opcionales y deben presentarse como derivaciones lógicas del análisis, no como prescripciones externas al trabajo.' },
      { question: '¿Cómo sé si mi conclusión suena a IA?', answer: 'Si empieza con "En conclusión" o "Para concluir", si repite literalmente frases del cuerpo, si no añade nada nuevo al lector y si usa muletillas de transición excesivas, probablemente tiene patrones de texto generado por IA. Pásala por DetectordeIA.ai.' },
      { question: '¿La conclusión debe tener citas bibliográficas?', answer: 'Generalmente no. La conclusión es el espacio de tu voz — síntesis e interpretación propias. Incluir citas en la conclusión puede indicar que todavía estás dependiendo de fuentes en lugar de consolidar tu propio argumento.' }
    ],
    relatedGuides: [
      { title: 'Cómo Hacer una Introducción para un Trabajo Académico', slug: 'como-hacer-introduccion-trabajo-academico' },
      { title: 'Cómo Argumentar en un Ensayo Sin IA', slug: 'como-argumentar-ensayo-sin-ia' },
      { title: 'Cómo Estructurar un Ensayo Argumentativo', slug: 'como-estructurar-ensayo-argumentativo' }
    ],
    relatedTools: [
      { name: 'Detector de IA Gratis', url: '/?ref=guia-conclusion-ensayo' },
      { name: 'Humanizador de Texto', url: '/humanizador?ref=guia-conclusion-ensayo' }
    ],
    cta: { text: 'Verificar que tu conclusión es original', url: '/?ref=guia-conclusion-ensayo' }
  },

  {
    slug: 'como-estudiar-con-ia-eticamente',
    title: 'Cómo Estudiar con IA de Forma Ética y Efectiva',
    keywords: ['estudiar con ia etico', 'ia para estudiar bien', 'chatgpt para estudiar', 'como usar ia estudiar sin hacer trampa', 'ia estudio universitario'],
    metaTitle: 'Cómo Estudiar con IA de Forma Ética: Guía para Universitarios 2025',
    metaDescription: 'Aprende a usar ChatGPT, Claude y otras IAs para estudiar mejor sin hacer trampa. Técnicas concretas que mejoran el aprendizaje real.',
    h1: 'Cómo Estudiar con IA de Forma Ética y Efectiva en la Universidad',
    intro: 'Usar IA para estudiar no es lo mismo que usar IA para hacer trampa. La diferencia está en el proceso: si la IA reemplaza tu esfuerzo cognitivo, no estás aprendiendo. Si lo amplifica, sí. Esta guía traza la línea con ejemplos concretos.',
    overview: 'Cubre: (1) usos de IA que aceleran el aprendizaje genuino, (2) usos que lo evitan, (3) técnicas concretas por tipo de materia, (4) cómo estudiar para exámenes con IA como tutor, (5) señales de que tu uso se está volviendo dependencia.',
    steps: [
      { number: 1, title: 'Usa la IA como tutor socrático, no como oráculo', description: 'En lugar de preguntar "¿Cuál es la respuesta de X?", pregunta "¿Qué preguntas debería poder responder para demostrar que entiendo X?" o "Dame un problema de práctica sobre X y no me des la solución todavía". El esfuerzo de resolver es donde ocurre el aprendizaje.' },
      { number: 2, title: 'Pídele que te explique de múltiples formas hasta que entiendas', description: 'Una ventaja real de la IA sobre los libros: puede explicar el mismo concepto con analogías distintas hasta que una haga clic. "Explícame la teoría de juegos como si fuera un partido de fútbol" o "dame otro ejemplo más concreto" son usos legítimos y efectivos.' },
      { number: 3, title: 'Genera preguntas de examen con IA y respóndelas tú', description: 'Dale el programa o el tema al modelo y pídele que genere 10 preguntas de examen tipo múltiple choice y 3 preguntas de desarrollo. Luego respóndelas sin mirar apuntes. Eso es práctica activa de recuperación — una de las técnicas de estudio más efectivas documentadas.' },
      { number: 4, title: 'Usa IA para identificar tus brechas de conocimiento', description: 'Explícale un concepto a la IA como si fuera un estudiante nuevo. Donde te quedes sin palabras o donde corrija algo que dijiste es exactamente donde tienes una brecha. La IA como espejo de tu propio conocimiento es un uso poderoso.' },
      { number: 5, title: 'Nunca uses la IA para completar tareas evaluables sin declarar', description: 'Todo lo anterior es estudio. Usar IA para generar la respuesta de un trabajo o examen sin declararlo es trampa — independientemente de que hayas estudiado con IA. La línea es clara: el trabajo evaluable es tuyo.' }
    ],
    commonMistakes: [
      { mistake: 'Copiar explicaciones de IA en tus apuntes como si fueran tuyas', solution: 'Los apuntes son para ti, no para el profesor, pero copiar sin procesar no genera aprendizaje. Reformula con tus propias palabras lo que la IA explicó antes de anotarlo.' },
      { mistake: 'Usar IA como primer recurso antes de intentar el problema', solution: 'El esfuerzo de intentar primero, aunque falles, es parte del aprendizaje. Usa la IA después del primer intento, no antes.' }
    ],
    faqs: [
      { question: '¿Es ético usar IA para preparar un examen?', answer: 'Sí, completamente. Usar IA como tutor, generador de preguntas de práctica o explicador de conceptos para preparar un examen es equivalente a usar una guía de estudio o Khan Academy. Lo que no es ético es usar IA durante el examen sin autorización.' },
      { question: '¿La IA puede reemplazar la lectura del libro de texto?', answer: 'Parcialmente y con riesgo. La IA puede resumir y explicar, pero puede omitir matices o cometer errores factuales. Para fundamentos conceptuales, leer la fuente primaria sigue siendo más confiable. Usa la IA para complementar la lectura, no para saltarla.' },
      { question: '¿Cómo sé si me estoy volviendo dependiente de la IA para estudiar?', answer: 'Señales de dependencia: no puedes empezar a estudiar sin tener la IA abierta, te cuesta más recordar cosas que antes, y cuando estudias sin IA rindes peor en los exámenes. Si lo notas, practica sesiones de estudio sin IA para recuperar la autonomía cognitiva.' }
    ],
    relatedGuides: [
      { title: 'Cómo Usar IA Éticamente en la Universidad', slug: 'como-usar-ia-eticamente-universidad' },
      { title: 'Herramientas de IA para Estudiantes', slug: 'herramientas-ia-para-estudiantes-universitarios' },
      { title: 'Mejores Prácticas de IA para Estudiantes', slug: 'mejores-practicas-uso-ia-estudiantes' }
    ],
    relatedTools: [
      { name: 'Detector de IA Gratis', url: '/?ref=guia-estudiar-ia-etico' }
    ],
    cta: { text: 'Verificar originalidad de tu trabajo', url: '/?ref=guia-estudiar-ia-etico' }
  },

  {
    slug: 'como-reducir-porcentaje-ia-turnitin',
    title: 'Cómo Reducir el Porcentaje de IA en Turnitin de Forma Ética',
    keywords: ['reducir porcentaje ia turnitin', 'bajar deteccion ia turnitin', 'turnitin ia alto porcentaje', 'como pasar turnitin ia', 'porcentaje ia turnitin alto'],
    metaTitle: 'Cómo Reducir el Porcentaje de IA en Turnitin (Forma Ética) 2025',
    metaDescription: 'Si tu trabajo propio tiene alto porcentaje de IA en Turnitin, esta guía explica por qué pasa y cómo reescribir éticamente para reducirlo.',
    h1: 'Cómo Reducir el Porcentaje de IA en Turnitin: Guía Ética',
    intro: 'Turnitin marca tu trabajo con alto porcentaje de IA y es tuyo. Pasa más de lo que crees — el texto técnico muy uniforme, el español muy formal o ciertas estructuras académicas pueden disparar falsos positivos. Esta guía explica qué hacer, éticamente.',
    overview: 'Cubre: (1) por qué Turnitin puede marcar texto humano como IA, (2) cómo identificar qué secciones activan el detector, (3) técnicas de reescritura ética para añadir variación natural, (4) qué no hacer, (5) cuándo impugnar el resultado.',
    steps: [
      { number: 1, title: 'Identifica primero qué secciones activan el detector', description: 'Antes de reescribir todo, sube el texto a DetectordeIA.ai para ver qué secciones tienen mayor señal de IA. Muchas veces es solo una o dos secciones con estructura muy formulaica — el resumen, la metodología o los párrafos de transición.' },
      { number: 2, title: 'Añade variación natural en longitud de oraciones', description: 'El texto de IA tiende a tener oraciones de longitud similar. Mezcla oraciones cortas con largas. Usa puntos donde la IA usaría coma. Fragmenta párrafos largos y une algunos cortos. Esta variación es la señal más importante de texto humano.' },
      { number: 3, title: 'Incorpora tu voz: opiniones, dudas, especificidades del contexto', description: 'Agrega elementos que la IA no puede generar sin contexto: referencias a lo visto en clase, a tu propia experiencia, al contexto regional o institucional. "En el caso de [mi universidad]..." o "Como señaló [el profesor] en clase..." son marcadores de autoría humana.' },
      { number: 4, title: 'Reformula las transiciones formulaicas', description: 'Frases como "Cabe destacar que", "En este sentido", "Asimismo", "Por otro lado" en exceso son señales de IA. Reemplázalas con transiciones específicas al argumento: "Este dato contradice lo que...", "A diferencia de lo anterior..."' },
      { number: 5, title: 'Si el texto es genuinamente tuyo, documenta el proceso y considera impugnar', description: 'Si reescribiste y el porcentaje sigue alto, reúne evidencia: borradores con historial de edición, notas de investigación, capturas de búsquedas. La mayoría de instituciones tienen proceso de apelación y aceptan evidencia de proceso.' }
    ],
    commonMistakes: [
      { mistake: 'Usar humanizadores de texto para "burlar" el detector', solution: 'Los humanizadores que solo cambian palabras son detectados por versiones actualizadas de Turnitin. La reescritura genuina — añadir tu voz y variación natural — es más efectiva y no plantea problemas éticos.' },
      { mistake: 'Reescribir sin entender por qué el detector marca el texto', solution: 'Si no entiendes qué produce la señal de IA en tu texto, reescribirás al azar. Identifica primero el patrón (oraciones uniformes, transiciones formulaicas, ausencia de especificidad) y después actúa sobre eso.' }
    ],
    faqs: [
      { question: '¿Es ético usar herramientas para reducir el porcentaje de IA si el texto es mío?', answer: 'Sí, si el texto es genuinamente tuyo. Mejorar la naturalidad de tu escritura y reducir patrones que activan falsos positivos es legítimo. Lo que no es ético es intentar disfrazar texto generado por IA como si fuera tuyo.' },
      { question: '¿Por qué mi texto propio tiene 30% de IA en Turnitin?', answer: 'Los falsos positivos ocurren con texto técnico muy formulaico (ciencias, ingeniería), texto en español muy formal y uniforme, traducciones directas del inglés, y texto que sigue plantillas estrictas (informes, protocolos). No significa que hayas hecho trampa.' },
      { question: '¿Cuánto tarda en actualizarse el porcentaje si resub el texto corregido?', answer: 'Inmediatamente en la mayoría de plataformas con Turnitin. Puedes subir el texto corregido y obtener un nuevo análisis en minutos. Verifica con tu institución si el reenvío está permitido antes de la fecha de entrega definitiva.' }
    ],
    relatedGuides: [
      { title: 'Qué Hace Exactamente Turnitin con la IA', slug: 'que-hace-exactamente-turnitin-con-ia' },
      { title: 'Técnicas de Escritura Académica Sin IA', slug: 'tecnicas-de-escritura-academica-sin-ia' },
      { title: 'Diferencia entre Plagio y Uso de IA', slug: 'diferencia-plagio-uso-ia-trabajos' }
    ],
    relatedTools: [
      { name: 'Detector de IA Gratis (verificar antes de Turnitin)', url: '/?ref=guia-reducir-ia-turnitin' },
      { name: 'Humanizador de Texto', url: '/humanizador?ref=guia-reducir-ia-turnitin' }
    ],
    cta: { text: 'Verificar tu texto antes de subir a Turnitin', url: '/?ref=guia-reducir-ia-turnitin' }
  },

  // ── SPRINT 4B ────────────────────────────────────────────────────────────

  {
    slug: 'como-hacer-marco-teorico',
    title: 'Cómo Hacer un Marco Teórico para tu Investigación',
    keywords: ['como hacer marco teorico', 'marco teorico ejemplo', 'marco teorico tesis', 'estructura marco teorico', 'marco teorico sin ia'],
    metaTitle: 'Cómo Hacer un Marco Teórico: Guía Paso a Paso con Ejemplos 2025',
    metaDescription: 'Aprende a construir el marco teórico de tu tesis o investigación paso a paso. Qué incluir, cómo estructurarlo y cómo evitar que parezca generado por IA.',
    h1: 'Cómo Hacer un Marco Teórico: Guía Completa para Investigadores',
    intro: 'El marco teórico es la sección más importante de una investigación y la que más fácilmente delata el uso de IA — porque la IA tiende a hacer resúmenes genéricos de teorías en lugar de argumentar por qué esas teorías son relevantes para tu pregunta específica. Esta guía te enseña a hacerlo bien.',
    overview: 'Cubre: (1) qué es y para qué sirve el marco teórico, (2) cómo seleccionar las teorías relevantes, (3) estructura interna del marco teórico, (4) cómo conectar la teoría con tu pregunta de investigación, (5) errores que delatan uso de IA.',
    steps: [
      { number: 1, title: 'Define qué necesita explicar tu marco teórico', description: 'El marco teórico no es un catálogo de teorías — es un andamiaje conceptual que explica tu fenómeno. Pregúntate: ¿qué conceptos necesito definir para que mi análisis tenga sentido? Solo incluye teorías que usarás directamente en el análisis.' },
      { number: 2, title: 'Selecciona fuentes primarias, no explicaciones secundarias', description: 'Si trabajas con Bourdieu, lee a Bourdieu — no un artículo que explica a Bourdieu. El marco teórico construido sobre fuentes primarias es más sólido y menos propenso a errores de interpretación que propaga la literatura secundaria.' },
      { number: 3, title: 'Organiza el marco de lo general a lo específico', description: 'Empieza con el marco conceptual más amplio (el campo disciplinar), avanza a las teorías de alcance medio relevantes, y termina con los conceptos operacionales que usarás directamente. Esta estructura muestra dominio del campo.' },
      { number: 4, title: 'Argumenta por qué cada teoría es la adecuada', description: 'No basta con describir las teorías — debes justificar por qué las elegiste sobre otras. "Se utiliza el enfoque de Bourdieu porque permite analizar las prácticas sin reducirlas a intenciones individuales" es argumentación teórica. "Bourdieu propuso que..." es descripción.' },
      { number: 5, title: 'Cierra el marco conectándolo explícitamente con tu pregunta', description: 'El último párrafo del marco teórico debe mostrar cómo los conceptos presentados configuran el lente con el que analizarás tus datos. Esta conexión explícita es lo que más frecuentemente falta en marcos teóricos generados con IA.' }
    ],
    commonMistakes: [
      { mistake: 'Incluir todo lo que existe sobre el tema', solution: 'El marco teórico no es una revisión exhaustiva — es una selección argumentada. Más no es mejor. Cada teoría debe ganarse su lugar justificando su relevancia.' },
      { mistake: 'Describir las teorías sin conectarlas entre sí', solution: 'El marco teórico debe mostrar cómo las teorías dialogan, se complementan o se tensionan. Un listado de resúmenes de teorías no es un marco teórico.' }
    ],
    faqs: [
      { question: '¿Cuánto debe medir el marco teórico?', answer: 'Depende del tipo de investigación. En una tesis de grado, entre 10-20% del total. En un paper académico, puede ser más breve (2-4 páginas). Lo importante es que sea suficiente para sustentar el análisis, sin extenderse en teorías que no usarás.' },
      { question: '¿Puedo usar IA para construir el marco teórico?', answer: 'Puedes usarla para explorar qué autores son relevantes en tu campo o para entender conceptos difíciles. No debes usarla para generar las secciones del marco — tiende a hacer resúmenes correctos pero genéricos que no se conectan con tu pregunta específica.' },
      { question: '¿El marco teórico es lo mismo que el estado del arte?', answer: 'No. El estado del arte (o revisión de literatura) mapea qué se ha investigado sobre el tema. El marco teórico define los conceptos y teorías con los que analizarás. En muchas tesis ambos son secciones separadas; en papers cortos pueden integrarse.' }
    ],
    relatedGuides: [
      { title: 'Cómo Hacer un Estado del Arte', slug: 'como-hacer-estado-del-arte' },
      { title: 'Cómo Investigar con Fuentes Académicas', slug: 'como-investigar-fuentes-academicas' },
      { title: 'Cómo Presentar tu Tesis con Integridad Académica', slug: 'como-presentar-tesis-con-integridad-academica' }
    ],
    relatedTools: [
      { name: 'Detector de IA Gratis', url: '/?ref=guia-marco-teorico' }
    ],
    cta: { text: 'Verificar que tu marco teórico no parece de IA', url: '/?ref=guia-marco-teorico' }
  },

  {
    slug: 'como-hacer-estado-del-arte',
    title: 'Cómo Hacer el Estado del Arte de una Investigación',
    keywords: ['como hacer estado del arte', 'estado del arte tesis', 'revision de literatura investigacion', 'estado del arte ejemplo', 'estado del arte sin ia'],
    metaTitle: 'Cómo Hacer el Estado del Arte: Guía Completa para Tesis y Papers 2025',
    metaDescription: 'Aprende a construir el estado del arte de tu investigación paso a paso. Cómo buscar, seleccionar y sintetizar literatura académica sin depender de IA.',
    h1: 'Cómo Hacer el Estado del Arte de tu Investigación: Guía Paso a Paso',
    intro: 'El estado del arte (o revisión de literatura) es la prueba de que conoces tu campo. Un estado del arte generado por IA se reconoce porque describe estudios sin tensionarlos, no identifica brechas reales y cita fuentes que a veces no existen. Esta guía te enseña a hacerlo con rigor.',
    overview: 'Cubre: (1) diferencia entre estado del arte y marco teórico, (2) cómo buscar literatura sistemáticamente, (3) cómo seleccionar qué incluir, (4) cómo organizar y sintetizar, (5) cómo identificar la brecha que justifica tu investigación.',
    steps: [
      { number: 1, title: 'Define los términos de búsqueda antes de empezar', description: 'Identifica 5-8 términos clave en tu idioma y en inglés. Busca en Google Scholar, Scopus o WoS con operadores booleanos: ("detección de IA" OR "AI detection") AND ("educación universitaria" OR "higher education"). Filtra por los últimos 5-10 años salvo que necesites antecedentes históricos.' },
      { number: 2, title: 'Organiza los estudios encontrados en una tabla antes de escribir', description: 'Para cada artículo relevante: autor, año, pregunta de investigación, metodología, hallazgos principales, limitaciones. Esta tabla te muestra los patrones del campo antes de escribir una sola línea del estado del arte.' },
      { number: 3, title: 'Organiza la revisión temáticamente, no cronológicamente', description: 'Un estado del arte cronológico ("En 2018 X encontró... en 2020 Y demostró...") es difícil de leer y fácil de generar con IA. Organiza por subtemas o tensiones conceptuales: los estudios que apoyan la hipótesis A, los que la cuestionan, y los que proponen alternativas.' },
      { number: 4, title: 'Sintetiza: muestra convergencias y divergencias entre estudios', description: 'El valor del estado del arte no está en resumir estudios uno por uno — está en mostrar dónde convergen, dónde se contradicen y qué preguntas quedan sin responder. Esas preguntas sin respuesta son la brecha que justifica tu investigación.' },
      { number: 5, title: 'Cierra identificando explícitamente la brecha que llena tu estudio', description: 'El último párrafo del estado del arte debe decir, con precisión, qué no se ha investigado todavía o qué limitación de los estudios previos tu investigación viene a superar. Eso justifica la existencia de tu trabajo.' }
    ],
    commonMistakes: [
      { mistake: 'Incluir artículos que no leíste completos', solution: 'Solo incluye en el estado del arte estudios que hayas leído al menos en su abstract, metodología y conclusiones. Citar solo por el título es fácilmente detectable para un especialista del tribunal.' },
      { mistake: 'No actualizar la revisión antes de la entrega final', solution: 'El estado del arte puede quedar desactualizado si tu investigación tarda. Verifica que no hayan aparecido publicaciones clave en los últimos 6 meses antes de la entrega definitiva.' }
    ],
    faqs: [
      { question: '¿Cuántos estudios debe incluir el estado del arte?', answer: 'No hay número mágico. Para una tesis de grado: 15-30 fuentes bien analizadas. Para una tesis doctoral: 50-100+. Para un paper corto: 10-20. Lo que importa es la calidad de la síntesis, no la cantidad de referencias.' },
      { question: '¿Puedo usar IA para encontrar artículos para el estado del arte?', answer: 'Sí, con precaución. Herramientas como Perplexity o Connected Papers pueden orientarte, pero verifica cada referencia en las bases de datos originales. ChatGPT inventa referencias con frecuencia — nunca incluyas una cita sin verificarla directamente.' },
      { question: '¿El estado del arte va antes o después del marco teórico?', answer: 'Depende de la disciplina y del formato requerido. En ciencias sociales y humanidades, el marco teórico suele ir primero. En ciencias exactas, la revisión de literatura puede integrarse. Consulta el reglamento de tu institución o el estilo de los papers de tu campo.' }
    ],
    relatedGuides: [
      { title: 'Cómo Hacer un Marco Teórico', slug: 'como-hacer-marco-teorico' },
      { title: 'Cómo Investigar con Fuentes Académicas', slug: 'como-investigar-fuentes-academicas' },
      { title: 'Cómo Usar ChatGPT para Investigar Sin Plagiar', slug: 'como-usar-chatgpt-para-investigar-sin-plagiar' }
    ],
    relatedTools: [
      { name: 'Detector de IA Gratis', url: '/?ref=guia-estado-del-arte' }
    ],
    cta: { text: 'Verificar originalidad de tu revisión de literatura', url: '/?ref=guia-estado-del-arte' }
  },

  {
    slug: 'como-escribir-tesis-sin-chatgpt',
    title: 'Cómo Escribir tu Tesis Sin Usar ChatGPT',
    keywords: ['escribir tesis sin chatgpt', 'tesis sin ia', 'como hacer tesis original', 'tesis sin inteligencia artificial', 'escribir tesis universitaria'],
    metaTitle: 'Cómo Escribir tu Tesis Sin ChatGPT: Guía Completa 2025',
    metaDescription: 'Guía paso a paso para escribir una tesis universitaria sin depender de ChatGPT ni IA. Técnicas de productividad, escritura y organización que funcionan.',
    h1: 'Cómo Escribir tu Tesis Sin ChatGPT: De la Idea a la Defensa',
    intro: 'Escribir una tesis es el mayor proyecto de escritura que enfrenta un estudiante universitario. La tentación de delegar partes a ChatGPT es enorme — pero las consecuencias de ser descubierto lo son más. Esta guía te muestra cómo producir una tesis genuinamente tuya, con mayor eficiencia de la que crees posible.',
    overview: 'Cubre: (1) planificación del proyecto de tesis sin IA, (2) sistema de toma de notas para investigación, (3) técnica de escritura por bloques, (4) cómo superar el bloqueo del escritor académico, (5) uso ético de herramientas digitales en el proceso.',
    steps: [
      { number: 1, title: 'Construye tu sistema de notas antes de escribir una sola palabra', description: 'La tesis se escribe desde las notas, no desde cero. Usa Zotero (gratuito) para gestionar fuentes y anota en tus propias palabras lo que cada fuente aporta a tu argumento. Cuando llegue el momento de escribir, tendrás material propio, no texto ajeno para copiar.' },
      { number: 2, title: 'Escribe por bloques de 25 minutos (técnica Pomodoro)', description: 'La tesis intimida cuando la ves completa. Descomponla en tareas de 25 minutos: "escribir la primera mitad del párrafo introductorio del capítulo 2". El progreso diario en bloques acumulados es más sostenible que sesiones largas de escritura.' },
      { number: 3, title: 'Escribe borradores sin editar en la misma sesión', description: 'La mayor trampa de la tesis es editar mientras escribís. Desactiva el corrector mientras escribes el borrador. Poner palabras en la página — aunque imperfectas — es mucho más valioso que la página en blanco perfecta.' },
      { number: 4, title: 'Reúnete con tu director cada 2-3 semanas con material escrito', description: 'Los directores no pueden ayudarte si no tienen nada que leer. Lleva siempre páginas escritas, aunque sean borradores. El feedback sobre texto concreto es infinitamente más útil que las conversaciones abstractas sobre el plan.' },
      { number: 5, title: 'Usa herramientas digitales para organización, no para generación', description: 'Scrivener o Notion para organizar capítulos. Zotero para fuentes. LanguageTool para ortografía. El calendario digital para planificación. Estas herramientas apoyan tu proceso sin generar contenido por ti.' }
    ],
    commonMistakes: [
      { mistake: 'Intentar escribir la tesis en orden cronológico', solution: 'Empieza por la sección que mejor conoces, no por la introducción. Muchos tesistas escriben la metodología primero porque es la más concreta. La introducción se escribe al final.' },
      { mistake: 'Esperar tener todo leído antes de empezar a escribir', solution: 'Escribir y leer deben ocurrir en paralelo. Las preguntas que surgen al escribir te dicen exactamente qué falta leer. El ciclo escritura-lectura-escritura es más eficiente que leer todo primero.' }
    ],
    faqs: [
      { question: '¿Cuánto tarda en promedio escribir una tesis de grado?', answer: 'La escritura en sí (con el material ya recopilado) toma entre 2-6 meses dependiendo de la extensión, la disciplina y la dedicación. El proceso completo (desde la definición del tema hasta la defensa) suele ser de 6 meses a 2 años.' },
      { question: '¿Qué usos de IA están generalmente permitidos al escribir una tesis?', answer: 'Con declaración: IA para entender conceptos difíciles, generar preguntas de investigación, revisar estilo y coherencia (no generar el texto), y explorar bibliografía. Sin declaración: ninguno que afecte el texto entregable.' },
      { question: '¿Cómo sé si mi tesis tiene secciones que parecen de IA aunque no las generé así?', answer: 'Las secciones de transición, las introducciones de capítulo y los resúmenes son las más propensas a sonar genéricas. Pásalas por DetectordeIA.ai antes de la entrega. Si detecta señal alta, revisa si usaste frases formulaicas que puedes humanizar.' }
    ],
    relatedGuides: [
      { title: 'Cómo Presentar tu Tesis con Integridad Académica', slug: 'como-presentar-tesis-con-integridad-academica' },
      { title: 'Cómo Hacer un Marco Teórico', slug: 'como-hacer-marco-teorico' },
      { title: 'Cómo Hacer el Estado del Arte', slug: 'como-hacer-estado-del-arte' }
    ],
    relatedTools: [
      { name: 'Detector de IA Gratis', url: '/?ref=guia-tesis-sin-chatgpt' },
      { name: 'Verificador de Originalidad', url: '/verificador-de-ia?ref=guia-tesis-sin-chatgpt' }
    ],
    cta: { text: 'Verificar tu tesis antes de la entrega — gratis', url: '/?ref=guia-tesis-sin-chatgpt' }
  },

  {
    slug: 'como-hacer-abstract-investigacion',
    title: 'Cómo Hacer el Abstract de una Investigación',
    keywords: ['como hacer abstract', 'abstract investigacion ejemplo', 'resumen abstract tesis', 'estructura abstract cientifico', 'como escribir abstract'],
    metaTitle: 'Cómo Hacer el Abstract de una Investigación: Guía con Ejemplos 2025',
    metaDescription: 'Aprende a redactar el abstract de tu tesis, paper o investigación en 5 pasos. Estructura, extensión, errores comunes y diferencias con el resumen ejecutivo.',
    h1: 'Cómo Hacer el Abstract de una Investigación: Guía Paso a Paso',
    intro: 'El abstract es el texto más leído y más exigente de una investigación científica. En 150-300 palabras debe comunicar el problema, la metodología, los hallazgos y la contribución. Es también la sección donde el uso de IA es más detectable por su tendencia a ser vago donde el abstract debe ser preciso.',
    overview: 'Cubre: (1) estructura estándar del abstract científico, (2) diferencia entre abstract y resumen ejecutivo, (3) cómo condensar sin perder precisión, (4) cuándo se escribe, (5) errores que lo invalidan.',
    steps: [
      { number: 1, title: 'El abstract tiene 4 componentes obligatorios', description: 'Problema (qué pregunta o gap existe), Metodología (cómo lo investigaste), Resultados (qué encontraste, con datos concretos), Conclusión/Contribución (qué aporta al campo). Cada componente debe estar presente aunque sea en una sola oración.' },
      { number: 2, title: 'Empieza con el problema, no con el contexto', description: 'La IA tiende a abrir el abstract con contexto general. El abstract científico abre con el problema específico: "Este estudio examina..." o "Se analiza la relación entre..." El contexto es opcional en el abstract; la pregunta de investigación no lo es.' },
      { number: 3, title: 'Incluye números concretos en los resultados', description: '"Los resultados muestran un aumento significativo" es vago. "Los resultados muestran un aumento del 23% (p<0.05)" es preciso. La especificidad numérica es la diferencia entre un abstract que informa y uno que no dice nada.' },
      { number: 4, title: 'No incluyas citas bibliográficas en el abstract', description: 'El abstract se lee de forma aislada — sin acceso a la bibliografía del paper. Por eso, las citas dentro del abstract están prohibidas en la mayoría de estilos académicos (APA, Vancouver, IEEE). Toda afirmación del abstract debe ser resultado de tu propia investigación.' },
      { number: 5, title: 'Escríbelo al final, cuando ya conoces todos los resultados', description: 'El abstract se posiciona al inicio del documento pero se escribe al final. Es un destilado del trabajo completo — no puedes destilarlo antes de tenerlo. Los abstracts escritos antes de terminar la investigación son inevitablemente vagos.' }
    ],
    commonMistakes: [
      { mistake: 'Confundir abstract con introducción', solution: 'La introducción contextualiza y plantea la pregunta. El abstract condensa todo el paper incluyendo resultados. El abstract es independiente; la introducción forma parte del cuerpo.' },
      { mistake: 'Superar el límite de palabras', solution: 'La mayoría de journals y programas de posgrado tienen límites estrictos: 150-250 palabras para papers, hasta 350 para tesis doctorales. Superar el límite puede llevar al rechazo automático.' }
    ],
    faqs: [
      { question: '¿El abstract va en español o en inglés?', answer: 'Depende del destino. Para revistas internacionales en inglés, el abstract va en inglés. Para tesis en universidades latinoamericanas, generalmente va en español con una versión en inglés opcional o requerida (según el reglamento). Algunos journals piden abstract en ambos idiomas.' },
      { question: '¿Puedo usar IA para revisar mi abstract?', answer: 'Sí, para feedback sobre claridad y completitud: "¿Está claro el problema que estudié?", "¿Los resultados son suficientemente específicos?". No para generar el abstract — el texto final debe ser tuyo y reflejar con precisión tus resultados reales.' },
      { question: '¿Qué es el abstract estructurado?', answer: 'El abstract estructurado es un formato con secciones explícitas con títulos: Objetivo, Métodos, Resultados, Conclusiones. Es más común en ciencias de la salud y medicina. La mayoría de journals de ciencias sociales y humanidades usan abstract no estructurado (texto continuo).' }
    ],
    relatedGuides: [
      { title: 'Cómo Hacer un Resumen Ejecutivo Sin IA', slug: 'como-hacer-resumen-ejecutivo-sin-ia' },
      { title: 'Cómo Presentar tu Tesis con Integridad Académica', slug: 'como-presentar-tesis-con-integridad-academica' },
      { title: 'Cómo Hacer el Estado del Arte', slug: 'como-hacer-estado-del-arte' }
    ],
    relatedTools: [
      { name: 'Detector de IA Gratis', url: '/?ref=guia-abstract' },
      { name: 'Parafraseador Online', url: '/parafraseador?ref=guia-abstract' }
    ],
    cta: { text: 'Verificar que tu abstract es original', url: '/?ref=guia-abstract' }
  },

  {
    slug: 'como-mejorar-coherencia-texto',
    title: 'Cómo Mejorar la Coherencia de un Texto Académico',
    keywords: ['coherencia texto academico', 'como mejorar coherencia', 'texto coherente universitario', 'mejorar cohesion texto', 'coherencia sin ia'],
    metaTitle: 'Cómo Mejorar la Coherencia de un Texto Académico: Técnicas 2025',
    metaDescription: 'Aprende a mejorar la coherencia y cohesión de tus textos académicos sin depender de IA. Técnicas de revisión que los profesores valoran.',
    h1: 'Cómo Mejorar la Coherencia de un Texto Académico: Guía Práctica',
    intro: 'Un texto coherente no es el que usa muchas palabras de transición — es el que lleva al lector de una idea a la siguiente sin esfuerzo. Paradójicamente, el texto de IA tiene coherencia local (cada párrafo tiene sentido) pero falla en la coherencia global (los argumentos no construyen hacia la tesis).',
    overview: 'Cubre: (1) diferencia entre coherencia y cohesión, (2) técnica del hilo argumentativo, (3) cómo revisar la progresión temática, (4) errores de coherencia que delatan IA, (5) herramientas de revisión sin IA.',
    steps: [
      { number: 1, title: 'Extrae la idea central de cada párrafo para ver el esqueleto', description: 'Lee solo la primera oración de cada párrafo en secuencia. Si juntas forman una progresión lógica que cuenta la historia del argumento, tu texto es coherente. Si no tiene sentido o se repite, hay un problema de estructura.' },
      { number: 2, title: 'Verifica que cada párrafo avanza, no solo añade', description: 'El problema de coherencia más común en textos de IA: los párrafos añaden perspectivas sin avanzar el argumento. Cada párrafo debe dejar al lector más cerca de entender la tesis que el anterior.' },
      { number: 3, title: 'Usa transiciones que explican la relación lógica, no solo la secuencia', description: '"Además" indica adición. "Sin embargo" indica contraste. "Por tanto" indica consecuencia. "Lo que demuestra que" indica interpretación. Elige la transición según la relación real entre los párrafos — no la que suena más académica.' },
      { number: 4, title: 'Revisa que los pronombres referencien sin ambigüedad', description: '"Este", "ello", "esto" son fuentes frecuentes de incoherencia cuando referencian un antecedente ambiguo. Si no está claro a qué refiere el pronombre, reemplázalo con el sustantivo correspondiente.' },
      { number: 5, title: 'Lee el texto en voz alta para detectar incoherencias', description: 'El cerebro omite errores al leer en silencio porque completa lo que falta. La lectura en voz alta fuerza el procesamiento completo. Los saltos de lógica y las transiciones forzadas se escuchan antes de verse.' }
    ],
    commonMistakes: [
      { mistake: 'Usar muchas palabras de transición para simular coherencia', solution: 'Las muletillas de transición ("Asimismo", "En este sentido", "Cabe destacar") no crean coherencia — la disfrazan temporalmente. La coherencia viene de la organización lógica de las ideas, no de los conectores.' },
      { mistake: 'Confundir coherencia con longitud', solution: 'Un texto largo no es más coherente que uno corto. A menudo, acortar y eliminar párrafos que no avanzan el argumento mejora más la coherencia que añadir transiciones.' }
    ],
    faqs: [
      { question: '¿Cuál es la diferencia entre coherencia y cohesión?', answer: 'Coherencia es la organización lógica de las ideas (el texto tiene sentido como totalidad). Cohesión es los mecanismos lingüísticos que conectan las partes (pronombres, conectores, repetición controlada). Un texto puede tener buena cohesión gramatical y mala coherencia conceptual.' },
      { question: '¿El texto de IA es coherente?', answer: 'Localmente sí, globalmente no siempre. Los LLMs son muy buenos generando párrafos coherentes en sí mismos, pero fallan cuando el argumento requiere progresión estratégica hacia una tesis específica. La coherencia global es la debilidad del texto de IA.' },
      { question: '¿Puede LanguageTool o Word detectar problemas de coherencia?', answer: 'No. Los correctores automáticos detectan errores gramaticales y ortográficos, no problemas conceptuales de coherencia. La revisión de coherencia es necesariamente manual o requiere feedback humano (tutor, compañero, director).' }
    ],
    relatedGuides: [
      { title: 'Técnicas de Escritura Académica Sin IA', slug: 'tecnicas-de-escritura-academica-sin-ia' },
      { title: 'Cómo Argumentar en un Ensayo Sin IA', slug: 'como-argumentar-ensayo-sin-ia' },
      { title: 'Cómo Estructurar un Ensayo Argumentativo', slug: 'como-estructurar-ensayo-argumentativo' }
    ],
    relatedTools: [
      { name: 'Detector de IA Gratis', url: '/?ref=guia-coherencia-texto' },
      { name: 'Humanizador de Texto', url: '/humanizador?ref=guia-coherencia-texto' }
    ],
    cta: { text: 'Verificar que tu texto no parece generado por IA', url: '/?ref=guia-coherencia-texto' }
  },

  {
    slug: 'como-hacer-informe-tecnico-sin-ia',
    title: 'Cómo Hacer un Informe Técnico Sin IA',
    keywords: ['como hacer informe tecnico', 'informe tecnico sin ia', 'estructura informe tecnico', 'informe tecnico universitario', 'redactar informe tecnico'],
    metaTitle: 'Cómo Hacer un Informe Técnico Sin IA: Estructura y Guía 2025',
    metaDescription: 'Aprende a redactar informes técnicos universitarios y profesionales sin usar IA. Estructura estándar, secciones obligatorias y errores que debes evitar.',
    h1: 'Cómo Hacer un Informe Técnico Sin IA: Guía Completa',
    intro: 'El informe técnico es el formato de escritura más común en ingeniería, ciencias y áreas aplicadas. A diferencia de un ensayo, tiene estructura fija y exige precisión factual. Aquí no caben opiniones vagas — y aquí la IA se equivoca más fácilmente con los datos específicos.',
    overview: 'Cubre: (1) estructura estándar del informe técnico, (2) qué va en cada sección, (3) normas de presentación de datos y figuras, (4) cómo redactar la sección de resultados, (5) errores técnicos que delatan uso de IA.',
    steps: [
      { number: 1, title: 'Estructura obligatoria: portada, resumen, índice, introducción, desarrollo, resultados, conclusiones, bibliografía', description: 'El informe técnico tiene secciones estándar en la mayoría de disciplinas. Consulta si tu institución tiene una plantilla específica — muchas facultades de ingeniería tienen formatos propios que deben seguirse exactamente.' },
      { number: 2, title: 'La introducción técnica: contexto + objetivo + alcance', description: 'La introducción del informe técnico tiene tres partes: el contexto del problema, el objetivo específico del informe (medible y concreto), y el alcance (qué incluye y qué no). Sin el alcance, el lector no sabe qué esperar.' },
      { number: 3, title: 'El desarrollo: describir procedimientos con suficiente detalle para replicar', description: 'El desarrollo de un informe técnico debe permitir que otro profesional replique lo que hiciste. Incluye materiales, equipos (con especificaciones), procedimientos paso a paso y condiciones del experimento o análisis.' },
      { number: 4, title: 'Resultados: datos primero, interpretación después', description: 'Primero presentas los datos (tablas, gráficos, mediciones) sin interpretación. Luego, en una subsección separada o en la discusión, los interpretas. Mezclar presentación e interpretación es un error técnico frecuente.' },
      { number: 5, title: 'Verifica que todas las figuras y tablas tienen título, unidades y fuente', description: 'Cada figura y tabla debe ser autoexplicativa: título descriptivo, unidades en los ejes, y fuente si no es propia. Las figuras sin unidades o con títulos vagos ("Figura 1") son errores técnicos que reducen la calidad del informe.' }
    ],
    commonMistakes: [
      { mistake: 'Usar lenguaje subjetivo en la sección de resultados', solution: 'Los resultados se presentan en términos objetivos y cuantitativos. "La temperatura fue alta" no es un resultado técnico. "La temperatura alcanzó 87°C ± 2°C a los 30 minutos" sí lo es.' },
      { mistake: 'No distinguir entre resultados y conclusiones', solution: 'Los resultados son hechos medidos. Las conclusiones son la interpretación de esos hechos en relación con el objetivo del informe. Son secciones diferentes con roles diferentes.' }
    ],
    faqs: [
      { question: '¿Puedo usar IA para generar partes de un informe técnico?', answer: 'Con declaración y cuidado. La sección de procedimientos o la revisión de literatura pueden tener apoyo de IA si lo declaras. Los resultados NUNCA — deben ser tus datos reales. Las conclusiones deben ser tuyas porque requieren interpretar tus resultados específicos.' },
      { question: '¿Cómo sé si mi informe técnico parece generado por IA?', answer: 'Señales: resultados presentados en términos vagos sin datos concretos, secciones genéricas que podrían aplicar a cualquier experimento, ausencia de especificidades del laboratorio o contexto real, y muletillas de transición excesivas. DetectordeIA.ai puede ayudar a identificar secciones problemáticas.' },
      { question: '¿El informe técnico debe tener abstract?', answer: 'Depende del destino. Los informes técnicos para uso interno a veces no lo tienen. Los que se presentan como papers o a clientes importantes sí. Si el informe supera 10 páginas, el abstract o resumen ejecutivo es recomendable para facilitar la lectura rápida.' }
    ],
    relatedGuides: [
      { title: 'Cómo Hacer un Resumen Ejecutivo Sin IA', slug: 'como-hacer-resumen-ejecutivo-sin-ia' },
      { title: 'Cómo Hacer el Abstract de una Investigación', slug: 'como-hacer-abstract-investigacion' },
      { title: 'Técnicas de Escritura Académica Sin IA', slug: 'tecnicas-de-escritura-academica-sin-ia' }
    ],
    relatedTools: [
      { name: 'Detector de IA Gratis', url: '/?ref=guia-informe-tecnico' }
    ],
    cta: { text: 'Verificar que tu informe no parece de IA', url: '/?ref=guia-informe-tecnico' }
  }
];
