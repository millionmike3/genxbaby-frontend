/** @type {import('next').NextConfig} */
const nextConfig = {
  typedRoutes: false,

  typescript: {
    ignoreBuildErrors: true,
  },

  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
