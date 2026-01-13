import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 's3.typebot.io',
        port: '',
        pathname: '/**',
      }
    ],
  },
  env: {
    CAKTO_CLIENT_ID: process.env.CAKTO_CLIENT_ID,
    CAKTO_CLIENT_SECRET: process.env.CAKTO_CLIENT_SECRET,
    CAKTO_PRODUCT_ID: process.env.CAKTO_PRODUCT_ID,
  }
};

export default nextConfig;
