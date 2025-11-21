/**
 * Métricas lingüísticas avanzadas para análisis de texto
 * Estas métricas ayudan a determinar si un texto fue generado por IA
 */

interface AdvancedMetrics {
  perplexity: number;
  lexicalDiversity: number;
  ngramRepetition: number;
  sentenceVariance: number;
  punctuationConsistency: number;
}

/**
 * Calcula la perplejidad del texto
 * Perplejidad baja = texto predecible (típico de IA)
 * Perplejidad alta = texto variado (típico de humanos)
 */
export function calculatePerplexity(text: string): number {
  const words = text.toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length < 10) return 5; // Default para textos muy cortos

  // Calcular frecuencias de bigramas
  const bigramFreq: Record<string, number> = {};
  const bigramCounts: Record<string, number> = {};

  for (let i = 0; i < words.length - 1; i++) {
    const bigram = `${words[i]} ${words[i + 1]}`;
    bigramFreq[bigram] = (bigramFreq[bigram] || 0) + 1;
    bigramCounts[words[i]] = (bigramCounts[words[i]] || 0) + 1;
  }

  // Calcular probabilidades condicionales
  let logProbSum = 0;
  let count = 0;

  for (let i = 0; i < words.length - 1; i++) {
    const bigram = `${words[i]} ${words[i + 1]}`;
    const prob = bigramFreq[bigram] / bigramCounts[words[i]];
    if (prob > 0) {
      logProbSum += Math.log2(prob);
      count++;
    }
  }

  if (count === 0) return 5;

  const perplexity = Math.pow(2, -logProbSum / count);
  return Math.min(10, Math.max(0, perplexity)); // Normalizar entre 0-10
}

/**
 * Calcula Type-Token Ratio (TTR)
 * TTR bajo = vocabulario repetitivo (típico de IA)
 * TTR alto = vocabulario diverso (típico de humanos)
 */
export function calculateTTR(text: string): number {
  const words = text.toLowerCase()
    .replace(/[.,!?;:()"']/g, '') // Eliminar puntuación
    .split(/\s+/)
    .filter(Boolean);

  if (words.length < 10) return 0.5; // Default para textos muy cortos

  const uniqueWords = new Set(words);
  const ttr = uniqueWords.size / words.length;

  return parseFloat(ttr.toFixed(3));
}

/**
 * Detecta repetición de n-gramas
 * Alta repetición = patrones mecánicos (típico de IA)
 * Retorna score 0-10 (10 = muy repetitivo)
 */
export function detectNgramRepetition(text: string): number {
  const words = text.toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length < 20) return 0;

  let totalRepetitions = 0;

  // Analizar bigramas (2 palabras)
  const bigramCounts: Record<string, number> = {};
  for (let i = 0; i < words.length - 1; i++) {
    const bigram = `${words[i]} ${words[i + 1]}`;
    bigramCounts[bigram] = (bigramCounts[bigram] || 0) + 1;
  }
  totalRepetitions += Object.values(bigramCounts).filter(c => c > 2).length;

  // Analizar trigramas (3 palabras)
  const trigramCounts: Record<string, number> = {};
  for (let i = 0; i < words.length - 2; i++) {
    const trigram = `${words[i]} ${words[i + 1]} ${words[i + 2]}`;
    trigramCounts[trigram] = (trigramCounts[trigram] || 0) + 1;
  }
  totalRepetitions += Object.values(trigramCounts).filter(c => c > 1).length * 2;

  // Normalizar a escala 0-10
  const repetitionScore = Math.min(10, (totalRepetitions / words.length) * 50);
  return parseFloat(repetitionScore.toFixed(2));
}

/**
 * Calcula la varianza en longitud de oraciones
 * Varianza baja = longitud uniforme (típico de IA)
 * Varianza alta = longitud variada (típico de humanos)
 */
export function calculateSentenceVariance(text: string): number {
  const sentences = text
    .split(/[.!?]+/)
    .map(s => s.trim())
    .filter(s => s.length > 0);

  if (sentences.length < 3) return 5; // Default para pocos datos

  const lengths = sentences.map(s => s.split(/\s+/).length);
  const mean = lengths.reduce((a, b) => a + b, 0) / lengths.length;

  const squaredDiffs = lengths.map(len => Math.pow(len - mean, 2));
  const variance = squaredDiffs.reduce((a, b) => a + b, 0) / lengths.length;
  const stdDev = Math.sqrt(variance);

  // Normalizar: stdDev > 5 es alta varianza (humano), < 2 es baja (IA)
  return parseFloat(stdDev.toFixed(2));
}

/**
 * Analiza consistencia de puntuación
 * Consistencia muy alta = mecánico (típico de IA)
 * Retorna score 0-10 (10 = muy consistente)
 */
export function analyzePunctuationConsistency(text: string): number {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);

  if (sentences.length < 3) return 5;

  // Contar comas por oración
  const commasPerSentence = sentences.map(s => (s.match(/,/g) || []).length);

  // Calcular desviación estándar
  const mean = commasPerSentence.reduce((a, b) => a + b, 0) / commasPerSentence.length;
  const variance = commasPerSentence.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / commasPerSentence.length;
  const stdDev = Math.sqrt(variance);

  // Consistencia alta (stdDev bajo) = más sospechoso de IA
  // Invertir la escala: stdDev bajo = score alto
  const consistencyScore = Math.max(0, 10 - stdDev * 2);
  return parseFloat(consistencyScore.toFixed(2));
}

/**
 * Detecta frases cliché típicas de IA en español
 */
export function detectAIClichePatterns(text: string): number {
  const lowerText = text.toLowerCase();

  const aiCliches = [
    'cabe destacar',
    'es importante mencionar',
    'en conclusión',
    'a continuación',
    'cabe señalar',
    'es fundamental',
    'sin lugar a dudas',
    'en este sentido',
    'de esta manera',
    'por lo tanto',
    'en primer lugar',
    'en segundo lugar',
    'en tercer lugar',
    'por otro lado',
    'por un lado',
    'en última instancia',
    'resulta evidente',
    'es preciso señalar',
    'conviene destacar',
    'vale la pena mencionar'
  ];

  let clicheCount = 0;
  aiCliches.forEach(cliche => {
    const regex = new RegExp(cliche, 'gi');
    const matches = lowerText.match(regex);
    if (matches) {
      clicheCount += matches.length;
    }
  });

  // Normalizar: score 0-10 basado en densidad de clichés
  const words = text.split(/\s+/).length;
  const density = (clicheCount / words) * 100;
  const score = Math.min(10, density * 3);

  return parseFloat(score.toFixed(2));
}

/**
 * Calcula todas las métricas avanzadas
 */
export function calculateAdvancedMetrics(text: string): AdvancedMetrics {
  return {
    perplexity: calculatePerplexity(text),
    lexicalDiversity: calculateTTR(text),
    ngramRepetition: detectNgramRepetition(text),
    sentenceVariance: calculateSentenceVariance(text),
    punctuationConsistency: analyzePunctuationConsistency(text),
  };
}

/**
 * Ajusta la probabilidad de IA basándose en métricas avanzadas
 * Retorna un ajuste entre -20 y +20 puntos porcentuales
 */
export function getMetricsAdjustment(metrics: AdvancedMetrics): number {
  let adjustment = 0;

  // Perplejidad: <3 muy IA, >7 muy humano
  if (metrics.perplexity < 3) {
    adjustment += 15; // Muy probable IA
  } else if (metrics.perplexity > 7) {
    adjustment -= 15; // Muy probable humano
  } else if (metrics.perplexity < 4) {
    adjustment += 8;
  } else if (metrics.perplexity > 6) {
    adjustment -= 8;
  }

  // Diversidad léxica: <0.4 repetitivo (IA), >0.6 diverso (humano)
  if (metrics.lexicalDiversity < 0.4) {
    adjustment += 10;
  } else if (metrics.lexicalDiversity > 0.6) {
    adjustment -= 10;
  }

  // N-gramas: >6 muy repetitivo (IA)
  if (metrics.ngramRepetition > 6) {
    adjustment += 12;
  } else if (metrics.ngramRepetition < 2) {
    adjustment -= 5;
  }

  // Varianza de oraciones: <2 uniforme (IA), >5 variado (humano)
  if (metrics.sentenceVariance < 2) {
    adjustment += 8;
  } else if (metrics.sentenceVariance > 5) {
    adjustment -= 8;
  }

  // Consistencia de puntuación: >7 muy consistente (IA)
  if (metrics.punctuationConsistency > 7) {
    adjustment += 5;
  } else if (metrics.punctuationConsistency < 3) {
    adjustment -= 5;
  }

  // Limitar ajuste total a ±20 puntos
  return Math.max(-20, Math.min(20, adjustment));
}

/**
 * Genera interpretación textual de las métricas
 */
export function interpretMetrics(metrics: AdvancedMetrics): string[] {
  const insights: string[] = [];

  if (metrics.perplexity < 3) {
    insights.push('El texto es extremadamente predecible, característico de IA.');
  } else if (metrics.perplexity > 7) {
    insights.push('El texto muestra alta variabilidad, típico de escritura humana.');
  }

  if (metrics.lexicalDiversity < 0.4) {
    insights.push('Vocabulario muy repetitivo, común en textos generados por IA.');
  } else if (metrics.lexicalDiversity > 0.6) {
    insights.push('Vocabulario diverso y rico, característico de autores humanos.');
  }

  if (metrics.ngramRepetition > 6) {
    insights.push('Patrones de frases muy repetitivos detectados.');
  }

  if (metrics.sentenceVariance < 2) {
    insights.push('Longitud de oraciones muy uniforme, típico de IA.');
  } else if (metrics.sentenceVariance > 5) {
    insights.push('Gran variación en longitud de oraciones, estilo humano natural.');
  }

  if (metrics.punctuationConsistency > 7) {
    insights.push('Uso de puntuación extremadamente consistente.');
  }

  return insights;
}
