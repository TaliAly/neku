/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  outputFileTracing: false,
}

module.exports = {
  images: {
    domains: ['cdn.myanimelist.net'],
  },
}
