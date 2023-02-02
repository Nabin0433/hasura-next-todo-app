/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['picsum.photos', 'delma.com.np', 'crowncommercial.com.np'],
  },
  env: {
    API_URL: process.env.API_URL,
    HASURA_ADMIN_SECRET: process.env.HASURA_ADMIN_SECRET,
  }
}

module.exports = nextConfig
