import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rqtzkqkdegwmnmkeyzjs.supabase.co',
        pathname: '/storage/v1/object/public/product-images/**',
      },
      {
        protocol: 'https',
        hostname: 'rqtzkqkdegwmnmkeyzjs.supabase.co',
        pathname: '/storage/v1/object/public/contact/**',
      },
      {
        protocol: 'https',
        hostname: 'rqtzkqkdegwmnmkeyzjs.supabase.co',
        pathname: '/storage/v1/object/public/press/**',
      },
    ],
  },
};

export default nextConfig;
