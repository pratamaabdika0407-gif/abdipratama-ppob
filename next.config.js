/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

module.exports = withPWA({
  dest: 'public',
  register: '/service-worker',
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
})(nextConfig);
