/** @type {import('next').NextConfig} */
const nextConfig = {
  typedRoutes: false,

  // ⬇️ This is the critical part
  typescript: {
    ignoreBuildErrors: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
