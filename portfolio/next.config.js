/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    disableStaticImages: false,
    unoptimized: true,
  },
  output: 'export',
  // When using a custom domain, we don't need basePath or assetPrefix
  // basePath: process.env.NODE_ENV === 'production' ? '/portfolio' : '',
  // assetPrefix: process.env.NODE_ENV === 'production' ? '/portfolio/' : '',
};

module.exports = nextConfig;