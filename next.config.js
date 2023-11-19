/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  distDir: './'
  }
}

module.exports = nextConfig
