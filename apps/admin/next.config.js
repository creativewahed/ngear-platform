import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    appDir: false,
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  },
  transpilePackages: ['@ngear/shared'],
};

export default nextConfig;