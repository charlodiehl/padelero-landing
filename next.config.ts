import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // sirve las imágenes directamente sin procesar
  },
};

export default nextConfig;
