import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: '/convertidor-ia-a-humano',
        destination: '/humanizador',
        permanent: true, // 301 redirect para mantener SEO
      },
      {
        source: '/precios',
        destination: '/pricing',
        permanent: true, // 301 redirect para consolidar en /pricing
      },
    ];
  },
};

export default nextConfig;
