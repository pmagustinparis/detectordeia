import type { NextConfig } from "next";

// Consolidación de slugs de universidad duplicados (Paso 2 SEO): acrónimo → descriptivo.
// Cada par redirige en los 4 prefijos de ruta donde existían páginas.
const UNIVERSITY_SLUG_CANONICAL: Record<string, string> = {
  'uam-madrid': 'universidad-autonoma-madrid',
  'usc-santiago': 'universidad-santiago-compostela',
  'upv-valencia': 'universidad-politecnica-valencia',
  'uc3m-madrid': 'universidad-carlos-tercero-madrid',
  'upm-madrid': 'universidad-politecnica-madrid',
  'uva-valladolid': 'universidad-valladolid',
  'unc-argentina': 'universidad-nacional-cordoba',
  'unlp-argentina': 'universidad-nacional-la-plata',
  'unr-argentina': 'universidad-nacional-rosario',
  'usp-brasil': 'universidad-sao-paulo',
  'udeg-guadalajara': 'universidad-guadalajara',
  'ipn-mexico': 'instituto-politecnico-nacional',
  'uam-mexico': 'universidad-autonoma-metropolitana',
  'unmsm-peru': 'universidad-san-marcos',
  'pucp-peru': 'universidad-catolica-peru',
  'ucr-costa-rica': 'universidad-costa-rica',
  'umsa-bolivia': 'universidad-mayor-san-andres',
  'ucv-venezuela': 'universidad-central-venezuela',
  'usb-venezuela': 'universidad-simon-bolivar',
  'udec-chile': 'universidad-concepcion',
  'usach-chile': 'universidad-santiago-chile',
  'uach-chile': 'universidad-austral-chile',
  'uce-ecuador': 'universidad-central-ecuador',
  'udelar-uruguay': 'universidad-republica-uruguay',
  'una-paraguay': 'universidad-nacional-asuncion',
};
const UNIVERSITY_ROUTE_PREFIXES = [
  'detector-de-ia-universidad',
  'humanizador-universidad',
  'parafraseador-universidad',
  'citador-universidad',
];
const universityRedirects = Object.entries(UNIVERSITY_SLUG_CANONICAL).flatMap(
  ([from, to]) =>
    UNIVERSITY_ROUTE_PREFIXES.map((prefix) => ({
      source: `/${prefix}/${from}`,
      destination: `/${prefix}/${to}`,
      permanent: true,
    }))
);

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: '/precios',
        destination: '/pricing',
        permanent: true, // 301 redirect para consolidar en /pricing
      },
      // Consolidación del clúster de paráfrasis en /parafraseador (Paso 3 SEO)
      { source: '/parafrasear-textos-online-gratis', destination: '/parafraseador', permanent: true },
      { source: '/parafrasear-sin-plagio', destination: '/parafraseador', permanent: true },
      { source: '/reescribir-textos-academicos', destination: '/parafraseador', permanent: true },
      { source: '/sinonimos-de-textos-online', destination: '/parafraseador', permanent: true },
      // Identificador de IA = sinónimo del detector → home
      { source: '/identificador-de-ia', destination: '/', permanent: true },
      // Consolidación de slugs de universidad duplicados (Paso 2 SEO)
      ...universityRedirects,
    ];
  },
};

export default nextConfig;
