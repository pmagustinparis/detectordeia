// Lazy imports para evitar problemas con SSR
// Las librerías se cargan dinámicamente solo cuando se necesitan en el cliente

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB en bytes
const SUPPORTED_TYPES = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];

export interface FileParseResult {
  text: string;
  wasTruncated: boolean;
}

/**
 * Valida que el archivo cumpla con los requisitos
 */
function validateFile(file: File): { valid: boolean; error?: string } {
  // Verificar tamaño
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: 'Archivo demasiado grande. El tamaño máximo es 10MB.',
    };
  }

  // Verificar tipo
  if (!SUPPORTED_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: 'Formato no soportado. Solo se aceptan archivos PDF, DOCX o TXT.',
    };
  }

  return { valid: true };
}

/**
 * Extrae texto de un archivo PDF
 */
async function extractTextFromPDF(file: File): Promise<string> {
  try {
    // Dynamic import para evitar problemas con SSR
    const pdfjsLib = await import('pdfjs-dist');

    // Configurar worker
    if (typeof window !== 'undefined') {
      pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
    }

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    let fullText = '';

    // Extraer texto de cada página
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      fullText += pageText + '\n';
    }

    return fullText.trim();
  } catch (error) {
    console.error('Error extracting PDF:', error);
    throw new Error('No se pudo leer el archivo PDF. Asegurate de que no esté corrupto.');
  }
}

/**
 * Extrae texto de un archivo DOCX
 */
async function extractTextFromDOCX(file: File): Promise<string> {
  try {
    // Dynamic import para evitar problemas con SSR
    const mammoth = await import('mammoth');

    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value.trim();
  } catch (error) {
    console.error('Error extracting DOCX:', error);
    throw new Error('No se pudo leer el archivo DOCX. Asegurate de que no esté corrupto.');
  }
}

/**
 * Extrae texto de un archivo TXT
 */
async function extractTextFromTXT(file: File): Promise<string> {
  try {
    const text = await file.text();
    return text.trim();
  } catch (error) {
    console.error('Error extracting TXT:', error);
    throw new Error('No se pudo leer el archivo TXT.');
  }
}

/**
 * Trunca el texto si excede el límite de caracteres
 */
function truncateText(text: string, maxChars: number): FileParseResult {
  if (text.length <= maxChars) {
    return { text, wasTruncated: false };
  }

  // Truncar en el límite exacto
  const truncated = text.substring(0, maxChars);
  return { text: truncated, wasTruncated: true };
}

/**
 * Función principal: extrae texto de cualquier archivo soportado
 */
export async function extractTextFromFile(
  file: File,
  maxChars: number
): Promise<FileParseResult> {
  // Validar archivo
  const validation = validateFile(file);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  // Extraer texto según el tipo de archivo
  let text: string;

  if (file.type === 'application/pdf') {
    text = await extractTextFromPDF(file);
  } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    text = await extractTextFromDOCX(file);
  } else if (file.type === 'text/plain') {
    text = await extractTextFromTXT(file);
  } else {
    throw new Error('Formato no soportado.');
  }

  // Verificar que el archivo no esté vacío
  if (!text || text.length === 0) {
    throw new Error('El archivo está vacío o no contiene texto.');
  }

  // Truncar si es necesario
  return truncateText(text, maxChars);
}
