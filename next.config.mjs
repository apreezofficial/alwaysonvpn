/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    outputFileTracingExcludes: {
      '*': ['/mobile/**', '/mobile', '/_preview-server.js'],
    },
  },
};

export default nextConfig;
