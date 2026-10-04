/** @type {import('next').NextConfig} */
const nextConfig = {
  typedRoutes: false,

  // ⬇️ This is the critical part
  typescript: {
    ignoreBuildErrors: true,
  },

};

module.exports = nextConfig;
