import { NextResponse } from 'next/server';

export async function GET() {
  const urls = [
    '',
    'pricing',
    'es',
    'mx',
    'ar',
    'cl',
    'co',
    'pe',
    'privacidad',
    'terminos',
  ];
  const baseUrl = 'https://detectordeia.ai';
  const body = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls
      .map(
        (url) => `
      <url>
        <loc>${baseUrl}/${url}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>`
      )
      .join('')}
  </urlset>`;

  return new NextResponse(body, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
} 