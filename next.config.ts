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
    ];
  },
};

export default nextConfig;
