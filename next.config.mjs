/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for GitHub Pages (the workflow uploads ./out)
  output: 'export',
  images: {
    unoptimized: true,
  },
}

export default nextConfig
