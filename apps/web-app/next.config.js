/** @type {import('next').NextConfig} */
const nextConfig = {
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  transpilePackages: ['@ngear/shared'],
  experimental: {
    serverComponentsExternalPackages: ['@ngear/shared'],
  },
}

module.exports = nextConfig