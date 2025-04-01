/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    disableStaticImages: false,
    unoptimized: true,
  },
  output: 'export',
};

module.exports = nextConfig;