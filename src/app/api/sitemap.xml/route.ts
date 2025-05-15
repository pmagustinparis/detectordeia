import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://detectordeia.ai';
  const staticRoutes = [
    '', // home
    'planes',
    'privacidad',
    'terminos',
  ];
  const countryRoutes = [
    'espana',
    'mexico',
    'colombia',
    'argentina',
    'chile',
    'peru',
  ];

  const allRoutes = [...staticRoutes, ...countryRoutes];

  const urls = allRoutes.map(
    (route) =>
      `<url><loc>${baseUrl}/${route}</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`
  ).join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls}
    </urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
} 