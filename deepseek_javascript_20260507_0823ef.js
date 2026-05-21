/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

const nextConfig = {
  images: {
    domains: [
      'firebasestorage.googleapis.com',
      'images.unsplash.com',
      'cdn.shopify.com',
      'ae01.alicdn.com',
      'sc04.alicdn.com',
    ],
  },
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    serverActions: true,
  },
};

module.exports = withPWA(nextConfig);