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
    // Serve modern formats (WebP/AVIF) for 30-50% smaller image files
    formats: ['image/avif', 'image/webp'],
    // Optimize Sanity CDN images automatically
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
    // Cache optimized images for 1 year
    minimumCacheTTL: 31536000,
    // Common device widths for responsive images
    deviceSizes: [390, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 64, 128, 256, 384, 512],
  },
  // Compress all responses
  compress: true,
  // Enable React strict mode for better performance profiling
  reactStrictMode: false,
};

export default nextConfig;
