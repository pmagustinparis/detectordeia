import { NextResponse } from 'next/server';
import type { CitationData } from '@/lib/citation/formatter';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// ─── Crossref DOI lookup ──────────────────────────────────────────────────

async function lookupDOI(doi: string): Promise<CitationData> {
  const cleanDoi = doi.replace(/^https?:\/\/doi\.org\//i, '').trim();
  const res = await fetch(`https://api.crossref.org/works/${encodeURIComponent(cleanDoi)}`, {
    headers: { 'User-Agent': 'DetectorDeIA/1.0 (mailto:hola@detectordeia.ai)' },
    next: { revalidate: 0 },
  });

  if (!res.ok) throw new Error('DOI no encontrado. Verificá que sea correcto.');

  const json = await res.json();
  const m = json.message;

  const authors = (m.author || []).map((a: any) => ({
    firstName: a.given || '',
    lastName: a.family || '',
  }));

  const dateParts = m.published?.['date-parts']?.[0] || m['published-print']?.['date-parts']?.[0] || [];
  const year = dateParts[0]?.toString() || '';
  const month = dateParts[1]?.toString() || '';

  return {
    type: 'article',
    authors,
    title: Array.isArray(m.title) ? m.title[0] : (m.title || ''),
    year,
    month,
    journal: Array.isArray(m['container-title']) ? m['container-title'][0] : (m['container-title'] || ''),
    volume: m.volume || '',
    issue: m.issue || '',
    pages: m.page || '',
    doi: m.DOI || cleanDoi,
  };
}

// ─── Open Library ISBN lookup ──────────────────────────────────────────────

async function lookupISBN(isbn: string): Promise<CitationData> {
  const cleanISBN = isbn.replace(/[-\s]/g, '');
  const res = await fetch(
    `https://openlibrary.org/api/books?bibkeys=ISBN:${cleanISBN}&format=json&jscmd=data`,
    { next: { revalidate: 0 } }
  );

  if (!res.ok) throw new Error('Error consultando Open Library.');

  const json = await res.json();
  const key = `ISBN:${cleanISBN}`;
  const book = json[key];

  if (!book) throw new Error('ISBN no encontrado. Verificá que sea correcto.');

  const authors = (book.authors || []).map((a: any) => {
    const name: string = a.name || '';
    const parts = name.split(' ');
    const lastName = parts.pop() || '';
    const firstName = parts.join(' ');
    return { firstName, lastName };
  });

  return {
    type: 'book',
    authors,
    title: book.title || '',
    year: book.publish_date?.match(/\d{4}/)?.[0] || '',
    publisher: book.publishers?.[0]?.name || '',
    city: book.publish_places?.[0]?.name || '',
  };
}

// ─── URL metadata extraction ──────────────────────────────────────────────

async function lookupURL(url: string): Promise<CitationData> {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; DetectorDeIA/1.0)' },
    next: { revalidate: 0 },
  });

  if (!res.ok) throw new Error('No se pudo acceder a la URL. Verificá que sea válida.');

  const html = await res.text();

  const getMetaContent = (property: string) => {
    const match = html.match(
      new RegExp(`<meta[^>]+(?:property|name)=["']${property}["'][^>]+content=["']([^"']+)["']`, 'i')
    ) || html.match(
      new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']${property}["']`, 'i')
    );
    return match?.[1] || '';
  };

  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);

  const title = getMetaContent('og:title') || titleMatch?.[1]?.trim() || '';
  const siteName = getMetaContent('og:site_name') || new URL(url).hostname.replace('www.', '');
  const authorRaw = getMetaContent('article:author') || getMetaContent('author') || '';
  const publishedTime = getMetaContent('article:published_time') || getMetaContent('og:updated_time') || '';

  let year = '', month = '', day = '';
  if (publishedTime) {
    const d = new Date(publishedTime);
    if (!isNaN(d.getTime())) {
      year = d.getFullYear().toString();
      month = (d.getMonth() + 1).toString().padStart(2, '0');
      day = d.getDate().toString().padStart(2, '0');
    }
  }

  const authors = authorRaw
    ? [{ firstName: '', lastName: authorRaw }]
    : [];

  const today = new Date();
  const accessDate = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;

  return {
    type: 'website',
    authors,
    title,
    year,
    month,
    day,
    siteName,
    url,
    accessDate,
  };
}

// ─── Handler ──────────────────────────────────────────────────────────────

export async function POST(request: Request) {
  try {
    const { lookupType, value } = await request.json();

    if (!lookupType || !value?.trim()) {
      return NextResponse.json({ error: 'lookupType y value son requeridos.' }, { status: 400 });
    }

    let data: CitationData;

    switch (lookupType) {
      case 'doi':
        data = await lookupDOI(value.trim());
        break;
      case 'isbn':
        data = await lookupISBN(value.trim());
        break;
      case 'url':
        data = await lookupURL(value.trim());
        break;
      default:
        return NextResponse.json({ error: 'lookupType inválido.' }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Error al buscar la fuente.' },
      { status: 400 }
    );
  }
}
