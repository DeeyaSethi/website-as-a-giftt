/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // For static export capability
  images: {
    unoptimized: true, // Required for static export
  },
}

module.exports = nextConfig

