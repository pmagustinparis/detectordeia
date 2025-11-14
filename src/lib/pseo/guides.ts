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
  }
];
