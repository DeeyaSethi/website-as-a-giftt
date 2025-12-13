/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // For better performance during development
  },
  webpack: (config, { isServer }) => {
    // Fix for browser-image-compression and other client-side packages
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
}

module.exports = nextConfig

