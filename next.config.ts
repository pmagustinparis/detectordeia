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
    ];
  },
};

export default nextConfig;
