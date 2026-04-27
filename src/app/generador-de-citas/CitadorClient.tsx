'use client';

import { useState } from 'react';
import { Icon, ProductIcons } from '@/lib/icons';
import { formatCitation } from '@/lib/citation/formatter';
import type { CitationData, CitationStyle, SourceType, Author } from '@/lib/citation/formatter';

type InputMode = 'auto' | 'manual';
type LookupType = 'doi' | 'isbn' | 'url';

const STYLES: { id: CitationStyle; label: string; desc: string }[] = [
  { id: 'apa7', label: 'APA 7ª', desc: 'Ciencias sociales, educación' },
  { id: 'mla9', label: 'MLA 9', desc: 'Humanidades, literatura' },
  { id: 'chicago', label: 'Chicago', desc: 'Historia, ciencias sociales' },
];

const SOURCE_TYPES: { id: SourceType; label: string; icon: string }[] = [
  { id: 'article', label: 'Artículo', icon: '📄' },
  { id: 'book', label: 'Libro', icon: '📚' },
  { id: 'website', label: 'Sitio web', icon: '🌐' },
];

const LOOKUP_INFO: Record<SourceType, { type: LookupType; placeholder: string; label: string; hint: string }> = {
  article: {
    type: 'doi', label: 'DOI del artículo',
    placeholder: 'Ej: 10.1038/nature12345 o https://doi.org/...',
    hint: 'El DOI lo encontrás en la página del artículo o en la base de datos donde lo descargaste.',
  },
  book: {
    type: 'isbn', label: 'ISBN del libro',
    placeholder: 'Ej: 978-0-14-312755-0',
    hint: 'El ISBN está en la contratapa del libro o en la página de derechos de autor.',
  },
  website: {
    type: 'url', label: 'URL de la página',
    placeholder: 'Ej: https://www.ejemplo.com/articulo',
    hint: 'Pegá la URL completa para extraer título, autor y fecha automáticamente.',
  },
};

const EMPTY = (type: SourceType): CitationData => ({
  type, authors: [{ firstName: '', lastName: '' }],
  title: '', year: '', month: '', day: '',
  journal: '', volume: '', issue: '', pages: '', doi: '',
  publisher: '', city: '', edition: '',
  siteName: '', url: '', accessDate: '',
});

function AuthorRows({ authors, onChange }: { authors: Author[]; onChange: (a: Author[]) => void }) {
  const upd = (i: number, f: keyof Author, v: string) =>
    onChange(authors.map((a, idx) => idx === i ? { ...a, [f]: v } : a));
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">Autores</label>
      <div className="space-y-2">
        {authors.map((a, i) => (
          <div key={i} className="flex gap-2 items-center">
            <input className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/30 bg-white" placeholder="Apellido" value={a.lastName} onChange={e => upd(i, 'lastName', e.target.value)} />
            <input className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/30 bg-white" placeholder="Nombre(s)" value={a.firstName} onChange={e => upd(i, 'firstName', e.target.value)} />
            {authors.length > 1 && (
              <button onClick={() => onChange(authors.filter((_, j) => j !== i))} className="text-gray-300 hover:text-red-400 text-xl leading-none w-6 shrink-0">×</button>
            )}
          </div>
        ))}
      </div>
      {authors.length < 6 && (
        <button onClick={() => onChange([...authors, { firstName: '', lastName: '' }])} className="mt-2 text-xs font-semibold text-blue-900 hover:text-blue-700">
          + Agregar autor
        </button>
      )}
    </div>
  );
}

function Field({ label, value, onChange, placeholder, required, half }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; required?: boolean; half?: boolean;
}) {
  return (
    <div className={half ? '' : 'col-span-2'}>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/30 bg-white"
        value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      />
    </div>
  );
}

interface CitadorClientProps {
  defaultStyle?: CitationStyle;
  defaultSourceType?: SourceType;
  h1?: string;
  subtitle?: string;
  extraFaqs?: { q: string; a: string }[];
}

export default function CitadorClient({
  defaultStyle = 'apa7',
  defaultSourceType = 'article',
  h1 = 'Generador de Citas Bibliográficas',
  subtitle = 'Generá citas en APA, MLA o Chicago al instante, sin registro.',
  extraFaqs = [],
}: CitadorClientProps) {
  const [sourceType, setSourceType] = useState<SourceType>(defaultSourceType);
  const [style, setStyle] = useState<CitationStyle>(defaultStyle);
  const [mode, setMode] = useState<InputMode>('auto');
  const [lookupVal, setLookupVal] = useState('');
  const [data, setData] = useState<CitationData>(EMPTY('article'));
  const [citation, setCitation] = useState<{ html: string; text: string } | null>(null);
  const [bibliography, setBibliography] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);
  const [addedFeedback, setAddedFeedback] = useState(false);

  const upd = (f: keyof CitationData, v: any) => setData(p => ({ ...p, [f]: v }));

  const changeSource = (t: SourceType) => {
    setSourceType(t); setData(EMPTY(t)); setCitation(null); setError(null); setLookupVal('');
  };

  const handleLookup = async () => {
    if (!lookupVal.trim()) return;
    setLoading(true); setError(null); setCitation(null);
    try {
      const res = await fetch('/api/citar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lookupType: LOOKUP_INFO[sourceType].type, value: lookupVal }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || 'No se encontró la fuente.');
      setData(json.data);
      setMode('manual');
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = () => {
    if (!data.title.trim()) { setError('El título es requerido.'); return; }
    setError(null);
    setCitation(formatCitation(data, style));
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!citation) return;
    await navigator.clipboard.writeText(citation.text);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleAdd = () => {
    if (!citation) return;
    setBibliography(p => [...p, citation.text]);
    setAddedFeedback(true); setTimeout(() => setAddedFeedback(false), 1500);
  };

  const handleCopyAll = async () => {
    await navigator.clipboard.writeText(bibliography.join('\n\n'));
    setCopiedAll(true); setTimeout(() => setCopiedAll(false), 2000);
  };

  const info = LOOKUP_INFO[sourceType];

  return (
    <div className="min-h-screen bg-white pb-20">

      {/* Hero */}
      <section className="w-full flex flex-col items-center justify-center pt-6 pb-4 px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-3 leading-tight text-blue-900">
          {h1}
        </h1>
        <p className="text-base md:text-lg text-gray-600 text-center mb-4 max-w-2xl">
          {subtitle}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2 mb-2">
          {['Sin registro', '100% gratis', 'Ilimitado', 'APA · MLA · Chicago'].map(b => (
            <span key={b} className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
              <span className="text-green-600 font-bold">✓</span> {b}
            </span>
          ))}
        </div>
      </section>

      {/* Main tool — two-column on desktop */}
      <section className="max-w-5xl mx-auto px-4 mb-12">
        <div className="flex flex-col md:flex-row gap-6 items-start">

          {/* LEFT — Input */}
          <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm p-6 min-w-0">

            {/* Style selector */}
            <div className="mb-5">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2.5">Estilo de cita</p>
              <div className="flex gap-2">
                {STYLES.map(s => (
                  <button
                    key={s.id}
                    onClick={() => { setStyle(s.id); setCitation(null); }}
                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold transition-colors ${
                      style === s.id ? 'bg-blue-900 text-white shadow-sm' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-1.5">{STYLES.find(s => s.id === style)?.desc}</p>
            </div>

            {/* Source type */}
            <div className="mb-5">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2.5">Tipo de fuente</p>
              <div className="flex gap-2">
                {SOURCE_TYPES.map(s => (
                  <button
                    key={s.id}
                    onClick={() => changeSource(s.id)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-sm font-semibold transition-colors ${
                      sourceType === s.id ? 'bg-blue-900 text-white shadow-sm' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span>{s.icon}</span>
                    <span>{s.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Input mode tabs */}
            <div className="flex border-b border-gray-200 mb-4">
              {(['auto', 'manual'] as const).map(m => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`pb-2 px-1 mr-4 text-sm font-semibold border-b-2 transition-colors ${
                    mode === m ? 'border-blue-900 text-blue-900' : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {m === 'auto' ? 'Búsqueda automática' : 'Ingresar manualmente'}
                </button>
              ))}
            </div>

            {/* Auto lookup */}
            {mode === 'auto' && (
              <div className="mb-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">{info.label}</label>
                <div className="flex gap-2">
                  <input
                    className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/30 bg-white"
                    placeholder={info.placeholder}
                    value={lookupVal}
                    onChange={e => setLookupVal(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && !loading && handleLookup()}
                  />
                  <button
                    onClick={handleLookup}
                    disabled={loading || !lookupVal.trim()}
                    className="bg-blue-900 hover:bg-blue-800 disabled:opacity-40 text-white font-bold px-5 py-2.5 rounded-lg text-sm transition-colors whitespace-nowrap"
                  >
                    {loading ? 'Buscando...' : 'Buscar'}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">{info.hint}</p>
              </div>
            )}

            {/* Manual form */}
            {mode === 'manual' && (
              <div className="space-y-4">
                <AuthorRows authors={data.authors} onChange={a => upd('authors', a)} />

                <Field label="Título" value={data.title} onChange={v => upd('title', v)}
                  placeholder={sourceType === 'article' ? 'Título del artículo' : sourceType === 'book' ? 'Título del libro' : 'Título de la página'} required />

                {sourceType === 'article' && (
                  <>
                    <Field label="Revista / Journal" value={data.journal || ''} onChange={v => upd('journal', v)} placeholder="Nature, Revista de Educación, etc." />
                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Año" value={data.year || ''} onChange={v => upd('year', v)} placeholder="2024" half />
                      <Field label="Volumen" value={data.volume || ''} onChange={v => upd('volume', v)} placeholder="10" half />
                      <Field label="Número" value={data.issue || ''} onChange={v => upd('issue', v)} placeholder="2" half />
                      <Field label="Páginas" value={data.pages || ''} onChange={v => upd('pages', v)} placeholder="1–20" half />
                    </div>
                    <Field label="DOI (opcional)" value={data.doi || ''} onChange={v => upd('doi', v)} placeholder="10.xxxx/xxxxx" />
                  </>
                )}

                {sourceType === 'book' && (
                  <>
                    <Field label="Editorial" value={data.publisher || ''} onChange={v => upd('publisher', v)} placeholder="Penguin, Paidós, Siglo XXI, etc." />
                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Año" value={data.year || ''} onChange={v => upd('year', v)} placeholder="2024" half />
                      <Field label="Ciudad" value={data.city || ''} onChange={v => upd('city', v)} placeholder="Buenos Aires" half />
                      <Field label="Edición (opcional)" value={data.edition || ''} onChange={v => upd('edition', v)} placeholder="3ª" half />
                    </div>
                  </>
                )}

                {sourceType === 'website' && (
                  <>
                    <Field label="Nombre del sitio" value={data.siteName || ''} onChange={v => upd('siteName', v)} placeholder="Wikipedia, BBC, El País, etc." />
                    <Field label="URL" value={data.url || ''} onChange={v => upd('url', v)} placeholder="https://..." />
                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Año" value={data.year || ''} onChange={v => upd('year', v)} placeholder="2024" half />
                      <Field label="Mes (opcional)" value={data.month || ''} onChange={v => upd('month', v)} placeholder="03" half />
                      <Field label="Día (opcional)" value={data.day || ''} onChange={v => upd('day', v)} placeholder="15" half />
                      <Field label="Fecha de acceso" value={data.accessDate || ''} onChange={v => upd('accessDate', v)} placeholder="DD/MM/AAAA" half />
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Generate button */}
            {mode === 'manual' && (
              <button
                onClick={handleGenerate}
                disabled={!data.title.trim()}
                className="mt-5 w-full bg-blue-900 hover:bg-blue-800 disabled:opacity-40 text-white font-bold py-3 rounded-xl text-sm transition-colors"
              >
                Generar cita en {STYLES.find(s => s.id === style)?.label}
              </button>
            )}

            {/* Trust badges */}
            <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-3 justify-center">
              {['Sin registro', '100% privado', 'Instantáneo'].map(b => (
                <span key={b} className="text-xs text-gray-500 flex items-center gap-1">
                  <span className="text-green-600">✓</span> {b}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT — Output */}
          <div className="flex-1 flex flex-col gap-4 min-w-0">

            {/* Citation result */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6" style={{ minHeight: '200px' }}>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-900 shadow-sm">
                  <Icon icon={ProductIcons.Citation} size="sm" className="text-white" />
                </div>
                <div>
                  <span className="font-bold text-gray-800 text-base block">Cita generada</span>
                  <span className="text-xs text-gray-500">El resultado aparecerá aquí</span>
                </div>
              </div>

              {citation ? (
                <>
                  <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
                    <p
                      className="text-sm text-gray-800 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: citation.html }}
                    />
                  </div>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-4">
                    <p className="text-xs text-amber-800">
                      <strong>Nota:</strong> Verificá que los títulos en cursiva (<em>así</em>) y las mayúsculas sean correctas antes de entregar.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleCopy}
                      className="flex-1 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold py-2.5 rounded-xl text-sm transition-colors"
                    >
                      {copied ? '✓ Copiado' : '📋 Copiar cita'}
                    </button>
                    <button
                      onClick={handleAdd}
                      className="flex-1 bg-blue-900 hover:bg-blue-800 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors"
                    >
                      {addedFeedback ? '✓ Agregado' : '+ Bibliografía'}
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mb-3">
                    <Icon icon={ProductIcons.Citation} size="lg" className="text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-500">
                    {mode === 'auto'
                      ? 'Buscá una fuente o pasá al modo manual para ingresar los datos.'
                      : 'Completá los datos y hacé clic en "Generar cita".'}
                  </p>
                </div>
              )}
            </div>

            {/* Bibliography */}
            {bibliography.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-900 shadow-sm">
                      <Icon icon={ProductIcons.Document} size="sm" className="text-white" />
                    </div>
                    <span className="font-bold text-gray-800">
                      Bibliografía ({bibliography.length} {bibliography.length === 1 ? 'fuente' : 'fuentes'})
                    </span>
                  </div>
                  <button onClick={() => setBibliography([])} className="text-xs text-gray-400 hover:text-red-500">
                    Limpiar
                  </button>
                </div>
                <ol className="space-y-3 mb-4">
                  {bibliography.map((cit, i) => (
                    <li key={i} className="flex gap-3 bg-gray-50 rounded-lg p-3">
                      <span className="text-xs font-bold text-gray-400 mt-0.5 w-5 shrink-0">{i + 1}.</span>
                      <p className="text-sm text-gray-700 leading-relaxed flex-1">{cit}</p>
                      <button
                        onClick={() => setBibliography(p => p.filter((_, j) => j !== i))}
                        className="text-gray-300 hover:text-red-400 text-lg leading-none shrink-0"
                      >×</button>
                    </li>
                  ))}
                </ol>
                <button
                  onClick={handleCopyAll}
                  className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 rounded-xl text-sm transition-colors"
                >
                  {copiedAll ? '✓ Copiado' : '📋 Copiar bibliografía completa'}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-5xl mx-auto mb-16 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          <span className="text-blue-900">¿Cómo generar</span>
          <span className="text-gray-800"> una cita bibliográfica?</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { n: '1', t: 'Elegí el estilo y la fuente', d: 'Seleccioná APA, MLA o Chicago según lo que pida tu institución. Luego elegí si es un artículo, libro o sitio web.' },
            { n: '2', t: 'Buscá o ingresá los datos', d: 'Pegá el DOI, ISBN o URL para autocompletar los datos, o ingresalos manualmente en el formulario.' },
            { n: '3', t: 'Copiá y usá la cita', d: 'Copiá la cita generada con un clic. Agregala a la bibliografía para copiar todas las fuentes juntas.' },
          ].map(s => (
            <div key={s.n} className="text-center bg-white rounded-xl border border-gray-200 p-6">
              <div className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-sm">{s.n}</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">{s.t}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cross-links */}
      <section className="max-w-5xl mx-auto mb-16 px-4">
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { icon: ProductIcons.Detector, href: '/', t: 'Detector de IA', d: 'Verificá si tu texto pasa como humano antes de entregarlo.' },
            { icon: ProductIcons.Humanizer, href: '/humanizador', t: 'Humanizador', d: 'Transformá texto generado por IA en redacción natural.' },
            { icon: ProductIcons.Paraphraser, href: '/parafraseador', t: 'Parafraseador', d: 'Reescribí tus fuentes con otras palabras sin plagiar.' },
          ].map(l => (
            <a key={l.href} href={l.href} className="bg-white border border-gray-200 rounded-xl p-5 flex gap-4 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                <Icon icon={l.icon} size="md" className="text-blue-900" />
              </div>
              <div>
                <p className="font-bold text-gray-800 text-sm mb-1">{l.t}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{l.d}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto mb-16 px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Preguntas frecuentes</h2>
        <div className="space-y-5">
          {[
            ...extraFaqs,
            { q: '¿Qué es una cita bibliográfica?', a: 'Una cita bibliográfica es la referencia formal a una fuente consultada en un trabajo académico. Incluye datos como el autor, año, título y editorial, organizados según el estilo (APA, MLA, Chicago, etc.).' },
            { q: '¿Cuál es la diferencia entre APA, MLA y Chicago?', a: 'APA (American Psychological Association) se usa en ciencias sociales y educación. MLA (Modern Language Association) es estándar en humanidades y literatura. Chicago se usa en historia y algunos campos de ciencias sociales. Cada estilo tiene reglas específicas para el orden y formato de los elementos.' },
            { q: '¿Qué es un DOI?', a: 'Un DOI (Digital Object Identifier) es un código único que identifica permanentemente un artículo académico. Lo encontrás en la página del artículo o en la base de datos donde lo descargaste. Ejemplo: 10.1038/nature12345.' },
            { q: '¿Debo verificar la cita generada?', a: 'Sí. Aunque el generador aplica las reglas correctamente, siempre verificá que los títulos estén en cursiva donde corresponde, que las mayúsculas sean las adecuadas según el estilo, y que los datos de la fuente original sean correctos.' },
          ].map((f, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-800 mb-2">{f.q}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
