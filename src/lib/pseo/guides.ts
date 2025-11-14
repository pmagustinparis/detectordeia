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
  }
];
