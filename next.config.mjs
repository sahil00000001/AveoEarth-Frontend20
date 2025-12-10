/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/aveoearth-product-assets/**',
      },
    ],
  },
  experimental: {
    allowedDevOrigins: ['*'],
  },
  devIndicators: false,
};

export default nextConfig;
