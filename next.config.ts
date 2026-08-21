import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  // Allow mobile devices on the local network to load JS chunks
  allowedDevOrigins: [
    '192.168.1.10',
    '192.168.1.*',
    '192.168.*',
    '10.0.*',
  ],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
};
export default nextConfig;
