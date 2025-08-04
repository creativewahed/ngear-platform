/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    appDir: true,
  },
  env: {
    AUTH_SERVICE_URL: process.env.AUTH_SERVICE_URL || 'http://localhost:3001',
    TENANT_SERVICE_URL: process.env.TENANT_SERVICE_URL || 'http://localhost:3002',
  },
}

module.exports = nextConfig