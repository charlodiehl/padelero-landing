import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // Permite imágenes locales y de dominios externos si se agregan en el futuro
    unoptimized: false,
  },
  // Redirect raíz a sí misma (standalone landing)
  async redirects() {
    return [];
  },
};

export default nextConfig;
