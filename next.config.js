/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '40mb',
    },
  },
};

module.exports = nextConfig;
