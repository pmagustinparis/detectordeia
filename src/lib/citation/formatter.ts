export type CitationStyle = 'apa7' | 'mla9' | 'chicago';
export type SourceType = 'article' | 'book' | 'website';

export interface Author {
  firstName: string;
  lastName: string;
}

export interface CitationData {
  type: SourceType;
  authors: Author[];
  title: string;
  year?: string;
  month?: string;
  day?: string;
  // Article
  journal?: string;
  volume?: string;
  issue?: string;
  pages?: string;
  doi?: string;
  // Book
  publisher?: string;
  city?: string;
  edition?: string;
  // Website
  siteName?: string;
  url?: string;
  accessDate?: string;
}

export interface FormattedCitation {
  html: string;  // with <em> for italics
  text: string;  // plain text for clipboard
}

// ─── Author helpers ────────────────────────────────────────────────────────

function initials(firstName: string): string {
  return firstName.trim().split(/\s+/).map(n => n[0].toUpperCase() + '.').join(' ');
}

function formatAuthorAPA(a: Author): string {
  if (!a.lastName) return '';
  if (!a.firstName) return a.lastName;
  return `${a.lastName}, ${initials(a.firstName)}`;
}

function formatAuthorsAPA(authors: Author[]): string {
  if (authors.length === 0) return '';
  if (authors.length === 1) return formatAuthorAPA(authors[0]);
  if (authors.length <= 20) {
    const all = authors.map(formatAuthorAPA);
    const last = all.pop();
    return `${all.join(', ')}, & ${last}`;
  }
  // 21+: first 19, ellipsis, last
  const first19 = authors.slice(0, 19).map(formatAuthorAPA).join(', ');
  const last = formatAuthorAPA(authors[authors.length - 1]);
  return `${first19}, . . . ${last}`;
}

function formatAuthorMLA(a: Author, isFirst: boolean): string {
  if (!a.lastName) return '';
  if (!a.firstName) return a.lastName;
  return isFirst ? `${a.lastName}, ${a.firstName}` : `${a.firstName} ${a.lastName}`;
}

function formatAuthorsMLA(authors: Author[]): string {
  if (authors.length === 0) return '';
  if (authors.length === 1) return formatAuthorMLA(authors[0], true);
  if (authors.length === 2) return `${formatAuthorMLA(authors[0], true)}, and ${formatAuthorMLA(authors[1], false)}`;
  if (authors.length === 3) return `${formatAuthorMLA(authors[0], true)}, ${formatAuthorMLA(authors[1], false)}, and ${formatAuthorMLA(authors[2], false)}`;
  return `${formatAuthorMLA(authors[0], true)}, et al.`;
}

function formatAuthorChicago(a: Author, isFirst: boolean): string {
  if (!a.lastName) return '';
  if (!a.firstName) return a.lastName;
  return isFirst ? `${a.lastName}, ${a.firstName}` : `${a.firstName} ${a.lastName}`;
}

function formatAuthorsChicago(authors: Author[]): string {
  if (authors.length === 0) return '';
  if (authors.length === 1) return formatAuthorChicago(authors[0], true);
  if (authors.length <= 3) {
    const all = authors.map((a, i) => formatAuthorChicago(a, i === 0));
    const last = all.pop();
    return `${all.join(', ')}, and ${last}`;
  }
  return `${formatAuthorChicago(authors[0], true)}, et al.`;
}

function em(text: string): { html: string; text: string } {
  return { html: `<em>${text}</em>`, text };
}

function doi(d: string): string {
  return d.startsWith('http') ? d : `https://doi.org/${d}`;
}

// ─── APA 7th ───────────────────────────────────────────────────────────────

function formatAPA(data: CitationData): FormattedCitation {
  const year = data.year || 's.f.';
  const authorStr = data.authors.length > 0 ? formatAuthorsAPA(data.authors) : null;
  const authorPart = authorStr ? `${authorStr}. ` : '';

  if (data.type === 'article') {
    const journalItalic = em(data.journal || '');
    const volItalic = data.volume ? em(data.volume) : null;
    const issuePart = data.issue ? `(${data.issue})` : '';
    const pagesPart = data.pages ? `, ${data.pages.replace('-', '–')}` : '';
    const doiPart = data.doi ? ` ${doi(data.doi)}` : '';

    const volBlock = volItalic
      ? (issuePart ? `${volItalic.html}${issuePart}` : volItalic.html)
      : '';
    const volBlockText = volItalic
      ? (issuePart ? `${volItalic.text}${issuePart}` : volItalic.text)
      : '';

    const html = `${authorPart}(${year}). ${data.title}. ${journalItalic.html}${volBlock ? `, ${volBlock}` : ''}${pagesPart}.${doiPart}`;
    const text = `${authorPart}(${year}). ${data.title}. ${journalItalic.text}${volBlockText ? `, ${volBlockText}` : ''}${pagesPart}.${doiPart}`;
    return { html, text };
  }

  if (data.type === 'book') {
    const titleItalic = em(data.title);
    const edPart = data.edition ? ` (${data.edition} ed.)` : '';
    const publisherPart = data.publisher || '';

    const html = `${authorPart}(${year}). ${titleItalic.html}${edPart}. ${publisherPart}.`;
    const text = `${authorPart}(${year}). ${titleItalic.text}${edPart}. ${publisherPart}.`;
    return { html, text };
  }

  // website
  const datePart = [year, data.month, data.day].filter(Boolean).join(', ');
  const titleItalic = em(data.title);
  const siteNamePart = data.siteName ? ` ${data.siteName}.` : '';
  const urlPart = data.url ? ` ${data.url}` : '';

  const html = `${authorPart}(${datePart}). ${titleItalic.html}.${siteNamePart}${urlPart}`;
  const text = `${authorPart}(${datePart}). ${titleItalic.text}.${siteNamePart}${urlPart}`;
  return { html, text };
}

// ─── MLA 9th ───────────────────────────────────────────────────────────────

function formatMLA(data: CitationData): FormattedCitation {
  const authorStr = data.authors.length > 0 ? `${formatAuthorsMLA(data.authors)}. ` : '';

  if (data.type === 'article') {
    const journalItalic = em(data.journal || '');
    const volPart = data.volume ? `, vol. ${data.volume}` : '';
    const issuePart = data.issue ? `, no. ${data.issue}` : '';
    const yearPart = data.year ? `, ${data.year}` : '';
    const pagesPart = data.pages ? `, pp. ${data.pages.replace('-', '–')}` : '';
    const doiPart = data.doi ? ` ${doi(data.doi)}.` : '.';

    const html = `${authorStr}"${data.title}." ${journalItalic.html}${volPart}${issuePart}${yearPart}${pagesPart}${doiPart}`;
    const text = `${authorStr}"${data.title}." ${journalItalic.text}${volPart}${issuePart}${yearPart}${pagesPart}${doiPart}`;
    return { html, text };
  }

  if (data.type === 'book') {
    const titleItalic = em(data.title);
    const publisherPart = data.publisher ? `${data.publisher}, ` : '';
    const yearPart = data.year || '';
    const edPart = data.edition ? `, ${data.edition} ed.` : '';

    const html = `${authorStr}${titleItalic.html}${edPart}. ${publisherPart}${yearPart}.`;
    const text = `${authorStr}${titleItalic.text}${edPart}. ${publisherPart}${yearPart}.`;
    return { html, text };
  }

  // website
  const siteItalic = em(data.siteName || '');
  const datePart = data.year || '';
  const accessPart = data.accessDate ? ` Consultado el ${data.accessDate}.` : '';
  const urlPart = data.url ? ` ${data.url}.` : '';

  const html = `${authorStr}"${data.title}." ${siteItalic.html}, ${datePart},${urlPart}${accessPart}`;
  const text = `${authorStr}"${data.title}." ${siteItalic.text}, ${datePart},${urlPart}${accessPart}`;
  return { html, text };
}

// ─── Chicago (Author-Date) ─────────────────────────────────────────────────

function formatChicago(data: CitationData): FormattedCitation {
  const authorStr = data.authors.length > 0 ? `${formatAuthorsChicago(data.authors)}. ` : '';
  const year = data.year || 's.f.';

  if (data.type === 'article') {
    const journalItalic = em(data.journal || '');
    const issuePart = data.issue ? ` (${data.issue})` : '';
    const pagesPart = data.pages ? `: ${data.pages.replace('-', '–')}` : '';
    const volBlock = data.volume ? `${data.volume}${issuePart}${pagesPart}` : '';
    const doiPart = data.doi ? ` ${doi(data.doi)}.` : '.';

    const html = `${authorStr}${year}. "${data.title}." ${journalItalic.html}${volBlock ? ` ${volBlock}` : ''}${doiPart}`;
    const text = `${authorStr}${year}. "${data.title}." ${journalItalic.text}${volBlock ? ` ${volBlock}` : ''}${doiPart}`;
    return { html, text };
  }

  if (data.type === 'book') {
    const titleItalic = em(data.title);
    const cityPart = data.city ? `${data.city}: ` : '';
    const publisherPart = data.publisher || '';
    const edPart = data.edition ? ` ${data.edition} ed.` : '';

    const html = `${authorStr}${year}.${edPart} ${titleItalic.html}. ${cityPart}${publisherPart}.`;
    const text = `${authorStr}${year}.${edPart} ${titleItalic.text}. ${cityPart}${publisherPart}.`;
    return { html, text };
  }

  // website
  const siteItalic = em(data.siteName || '');
  const accessPart = data.accessDate ? ` Consultado el ${data.accessDate}.` : '';
  const urlPart = data.url ? ` ${data.url}.` : '';

  const html = `${authorStr}${year}. "${data.title}." ${siteItalic.html}.${accessPart}${urlPart}`;
  const text = `${authorStr}${year}. "${data.title}." ${siteItalic.text}.${accessPart}${urlPart}`;
  return { html, text };
}

// ─── Public API ─────────────────────────────────────────────────────────────

export function formatCitation(data: CitationData, style: CitationStyle): FormattedCitation {
  switch (style) {
    case 'apa7': return formatAPA(data);
    case 'mla9': return formatMLA(data);
    case 'chicago': return formatChicago(data);
  }
}
