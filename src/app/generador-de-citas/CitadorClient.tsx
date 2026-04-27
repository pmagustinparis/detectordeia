'use client';

import { useState } from 'react';
import { formatCitation } from '@/lib/citation/formatter';
import type { CitationData, CitationStyle, SourceType, Author } from '@/lib/citation/formatter';

// ─── Types ────────────────────────────────────────────────────────────────

type InputMode = 'auto' | 'manual';
type LookupType = 'doi' | 'isbn' | 'url';

const STYLES: { id: CitationStyle; label: string }[] = [
  { id: 'apa7', label: 'APA 7ª' },
  { id: 'mla9', label: 'MLA 9' },
  { id: 'chicago', label: 'Chicago' },
];

const SOURCE_TYPES: { id: SourceType; label: string; icon: string }[] = [
  { id: 'article', label: 'Artículo', icon: '📄' },
  { id: 'book', label: 'Libro', icon: '📚' },
  { id: 'website', label: 'Sitio web', icon: '🌐' },
];

const LOOKUP_LABELS: Record<SourceType, { type: LookupType; placeholder: string; label: string }> = {
  article: { type: 'doi', placeholder: 'Ej: 10.1038/nature12345 o https://doi.org/...', label: 'DOI' },
  book:    { type: 'isbn', placeholder: 'Ej: 978-0-14-312755-0', label: 'ISBN' },
  website: { type: 'url', placeholder: 'Ej: https://example.com/articulo', label: 'URL' },
};

const EMPTY_DATA = (type: SourceType): CitationData => ({
  type,
  authors: [{ firstName: '', lastName: '' }],
  title: '',
  year: '',
  month: '',
  day: '',
  journal: '',
  volume: '',
  issue: '',
  pages: '',
  doi: '',
  publisher: '',
  city: '',
  edition: '',
  siteName: '',
  url: '',
  accessDate: '',
});

// ─── Sub-components ──────────────────────────────────────────────────────

function AuthorFields({
  authors,
  onChange,
}: {
  authors: Author[];
  onChange: (authors: Author[]) => void;
}) {
  const update = (i: number, field: keyof Author, val: string) => {
    const next = authors.map((a, idx) => idx === i ? { ...a, [field]: val } : a);
    onChange(next);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Autores</label>
      {authors.map((a, i) => (
        <div key={i} className="flex gap-2 items-center">
          <input
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Apellido"
            value={a.lastName}
            onChange={e => update(i, 'lastName', e.target.value)}
          />
          <input
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nombre"
            value={a.firstName}
            onChange={e => update(i, 'firstName', e.target.value)}
          />
          {authors.length > 1 && (
            <button
              onClick={() => onChange(authors.filter((_, idx) => idx !== i))}
              className="text-gray-400 hover:text-red-500 text-lg leading-none px-1"
              title="Eliminar autor"
            >×</button>
          )}
        </div>
      ))}
      {authors.length < 6 && (
        <button
          onClick={() => onChange([...authors, { firstName: '', lastName: '' }])}
          className="text-sm text-blue-700 hover:text-blue-900 font-medium"
        >
          + Agregar autor
        </button>
      )}
    </div>
  );
}

function Field({
  label, value, onChange, placeholder, required,
}: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────

export default function CitadorClient() {
  const [sourceType, setSourceType] = useState<SourceType>('article');
  const [citationStyle, setCitationStyle] = useState<CitationStyle>('apa7');
  const [inputMode, setInputMode] = useState<InputMode>('auto');
  const [lookupValue, setLookupValue] = useState('');
  const [manualData, setManualData] = useState<CitationData>(EMPTY_DATA('article'));
  const [citation, setCitation] = useState<{ html: string; text: string } | null>(null);
  const [bibliography, setBibliography] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);

  const updateField = (field: keyof CitationData, value: any) => {
    setManualData(prev => ({ ...prev, [field]: value }));
  };

  const handleSourceTypeChange = (type: SourceType) => {
    setSourceType(type);
    setManualData(EMPTY_DATA(type));
    setCitation(null);
    setError(null);
    setLookupValue('');
  };

  const handleLookup = async () => {
    if (!lookupValue.trim()) return;
    setLoading(true);
    setError(null);
    setCitation(null);

    try {
      const lookupInfo = LOOKUP_LABELS[sourceType];
      const res = await fetch('/api/citar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lookupType: lookupInfo.type, value: lookupValue }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'No se encontró la fuente.');
      setManualData(data.data);
      setInputMode('manual');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = () => {
    if (!manualData.title.trim()) {
      setError('El título es requerido.');
      return;
    }
    setError(null);
    const result = formatCitation(manualData, citationStyle);
    setCitation(result);
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!citation) return;
    await navigator.clipboard.writeText(citation.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddToBibliography = () => {
    if (!citation) return;
    setBibliography(prev => [...prev, citation.text]);
  };

  const handleCopyAll = async () => {
    const text = bibliography.join('\n\n');
    await navigator.clipboard.writeText(text);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const lookupInfo = LOOKUP_LABELS[sourceType];

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="max-w-3xl mx-auto px-4 pt-8 pb-4 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Generador de Citas Bibliográficas
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          Generá citas en APA, MLA o Chicago al instante. Gratis, sin registro.
        </p>
        <div className="flex items-center justify-center gap-4 mt-3 text-xs text-gray-500">
          <span>✓ Gratis</span>
          <span>✓ Sin registro</span>
          <span>✓ Ilimitado</span>
          <span>✓ APA · MLA · Chicago</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4">

        {/* Style selector */}
        <div className="mb-5">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Estilo de cita</p>
          <div className="flex gap-2">
            {STYLES.map(s => (
              <button
                key={s.id}
                onClick={() => { setCitationStyle(s.id); setCitation(null); }}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                  citationStyle === s.id
                    ? 'bg-blue-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Source type */}
        <div className="mb-5">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Tipo de fuente</p>
          <div className="flex gap-2">
            {SOURCE_TYPES.map(s => (
              <button
                key={s.id}
                onClick={() => handleSourceTypeChange(s.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  sourceType === s.id
                    ? 'bg-blue-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{s.icon}</span>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input mode toggle */}
        <div className="flex gap-2 mb-4 border-b border-gray-200">
          <button
            onClick={() => setInputMode('auto')}
            className={`pb-2 px-1 text-sm font-semibold border-b-2 transition-colors ${
              inputMode === 'auto'
                ? 'border-blue-900 text-blue-900'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Búsqueda automática
          </button>
          <button
            onClick={() => setInputMode('manual')}
            className={`pb-2 px-1 text-sm font-semibold border-b-2 transition-colors ${
              inputMode === 'manual'
                ? 'border-blue-900 text-blue-900'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Ingresar manualmente
          </button>
        </div>

        {/* Auto lookup */}
        {inputMode === 'auto' && (
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {lookupInfo.label}
            </label>
            <div className="flex gap-2">
              <input
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={lookupInfo.placeholder}
                value={lookupValue}
                onChange={e => setLookupValue(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleLookup()}
              />
              <button
                onClick={handleLookup}
                disabled={loading || !lookupValue.trim()}
                className="bg-blue-900 hover:bg-blue-800 disabled:opacity-50 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors whitespace-nowrap"
              >
                {loading ? 'Buscando...' : 'Buscar'}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1.5">
              {sourceType === 'article' && 'Ingresá el DOI del artículo para completar los datos automáticamente.'}
              {sourceType === 'book' && 'Ingresá el ISBN para buscar datos del libro en Open Library.'}
              {sourceType === 'website' && 'Ingresá la URL para extraer el título, autor y fecha automáticamente.'}
            </p>
          </div>
        )}

        {/* Manual form */}
        {inputMode === 'manual' && (
          <div className="space-y-4 mb-5">
            <AuthorFields
              authors={manualData.authors}
              onChange={authors => updateField('authors', authors)}
            />

            <Field
              label="Título"
              value={manualData.title}
              onChange={v => updateField('title', v)}
              placeholder={sourceType === 'article' ? 'Título del artículo' : sourceType === 'book' ? 'Título del libro' : 'Título de la página'}
              required
            />

            <div className="grid grid-cols-2 gap-3">
              <Field label="Año" value={manualData.year || ''} onChange={v => updateField('year', v)} placeholder="2024" />
              {sourceType === 'website' && (
                <>
                  <Field label="Mes" value={manualData.month || ''} onChange={v => updateField('month', v)} placeholder="03" />
                  <Field label="Día" value={manualData.day || ''} onChange={v => updateField('day', v)} placeholder="15" />
                </>
              )}
            </div>

            {sourceType === 'article' && (
              <>
                <Field label="Revista / Journal" value={manualData.journal || ''} onChange={v => updateField('journal', v)} placeholder="Nature, Science, etc." />
                <div className="grid grid-cols-3 gap-3">
                  <Field label="Volumen" value={manualData.volume || ''} onChange={v => updateField('volume', v)} placeholder="10" />
                  <Field label="Número" value={manualData.issue || ''} onChange={v => updateField('issue', v)} placeholder="2" />
                  <Field label="Páginas" value={manualData.pages || ''} onChange={v => updateField('pages', v)} placeholder="1–20" />
                </div>
                <Field label="DOI (opcional)" value={manualData.doi || ''} onChange={v => updateField('doi', v)} placeholder="10.xxxx/xxxxx" />
              </>
            )}

            {sourceType === 'book' && (
              <>
                <Field label="Editorial" value={manualData.publisher || ''} onChange={v => updateField('publisher', v)} placeholder="Penguin, Paidós, etc." />
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Ciudad" value={manualData.city || ''} onChange={v => updateField('city', v)} placeholder="Buenos Aires" />
                  <Field label="Edición (opcional)" value={manualData.edition || ''} onChange={v => updateField('edition', v)} placeholder="3ª" />
                </div>
              </>
            )}

            {sourceType === 'website' && (
              <>
                <Field label="Nombre del sitio" value={manualData.siteName || ''} onChange={v => updateField('siteName', v)} placeholder="Wikipedia, BBC, etc." />
                <Field label="URL" value={manualData.url || ''} onChange={v => updateField('url', v)} placeholder="https://..." />
                <Field label="Fecha de acceso" value={manualData.accessDate || ''} onChange={v => updateField('accessDate', v)} placeholder="DD/MM/AAAA" />
              </>
            )}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Generate button */}
        {inputMode === 'manual' && (
          <button
            onClick={handleGenerate}
            disabled={!manualData.title.trim()}
            className="w-full bg-blue-900 hover:bg-blue-800 disabled:opacity-40 text-white font-bold py-3 rounded-xl text-base transition-colors mb-6"
          >
            Generar cita
          </button>
        )}

        {/* Citation result */}
        {citation && (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {STYLES.find(s => s.id === citationStyle)?.label}
              </span>
              <span className="text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                Verificá mayúsculas e itálicas antes de entregar
              </span>
            </div>
            <p
              className="text-sm text-gray-800 leading-relaxed mb-4"
              dangerouslySetInnerHTML={{ __html: citation.html }}
            />
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-2 rounded-lg text-sm transition-colors"
              >
                {copied ? '✓ Copiado' : '📋 Copiar cita'}
              </button>
              <button
                onClick={handleAddToBibliography}
                className="flex-1 bg-blue-900 hover:bg-blue-800 text-white font-semibold py-2 rounded-lg text-sm transition-colors"
              >
                + Agregar a bibliografía
              </button>
            </div>
          </div>
        )}

        {/* Bibliography */}
        {bibliography.length > 0 && (
          <div className="border border-gray-200 rounded-xl p-5 mb-8">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">
                Bibliografía ({bibliography.length} {bibliography.length === 1 ? 'fuente' : 'fuentes'})
              </h3>
              <button
                onClick={() => setBibliography([])}
                className="text-xs text-gray-400 hover:text-red-500"
              >
                Limpiar
              </button>
            </div>
            <ol className="space-y-3 mb-4">
              {bibliography.map((cit, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-xs text-gray-400 mt-0.5 w-5 shrink-0">{i + 1}.</span>
                  <p className="text-sm text-gray-700 leading-relaxed flex-1">{cit}</p>
                  <button
                    onClick={() => setBibliography(prev => prev.filter((_, idx) => idx !== i))}
                    className="text-gray-300 hover:text-red-400 text-lg leading-none shrink-0"
                  >×</button>
                </li>
              ))}
            </ol>
            <button
              onClick={handleCopyAll}
              className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 rounded-xl text-sm transition-colors"
            >
              {copiedAll ? '✓ Bibliografía copiada' : '📋 Copiar bibliografía completa'}
            </button>
          </div>
        )}

        {/* FAQ */}
        <div className="border-t border-gray-100 pt-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Preguntas frecuentes</h2>
          <div className="space-y-5">
            {[
              {
                q: '¿Qué es una cita bibliográfica?',
                a: 'Una cita bibliográfica es la referencia formal a una fuente consultada en un trabajo académico. Incluye datos como el autor, año, título y editorial, organizados según el estilo (APA, MLA, Chicago, etc.).',
              },
              {
                q: '¿Cuál es la diferencia entre APA, MLA y Chicago?',
                a: 'APA (American Psychological Association) se usa en ciencias sociales y educación. MLA (Modern Language Association) es estándar en humanidades y literatura. Chicago se usa en historia y algunos campos de ciencias sociales. Cada estilo tiene reglas específicas para el orden y formato de los elementos.',
              },
              {
                q: '¿Qué es un DOI?',
                a: 'Un DOI (Digital Object Identifier) es un código único que identifica permanentemente un artículo académico. Lo encontrás en la página del artículo o en la base de datos donde lo descargaste. Ejemplo: 10.1038/nature12345.',
              },
              {
                q: '¿Qué es un ISBN?',
                a: 'El ISBN (International Standard Book Number) es el código de 10 o 13 dígitos que identifica un libro. Está en la contratapa o en la página de créditos. Ejemplo: 978-0-14-312755-0.',
              },
              {
                q: '¿Debo verificar la cita generada?',
                a: 'Sí. Aunque el generador aplica las reglas correctamente, siempre verificá que el título esté en cursiva donde corresponde, que las mayúsculas sean las adecuadas según el estilo, y que los datos de la fuente original sean correctos.',
              },
            ].map((item, i) => (
              <div key={i}>
                <h3 className="font-semibold text-gray-800 mb-1">{item.q}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
