import type { NextConfig } from "next";

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
    ];
  },
};

export default nextConfig;
