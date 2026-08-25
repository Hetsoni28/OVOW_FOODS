import { MetadataRoute } from 'next';
import { COMPANY_CONFIG } from '@/lib/config';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: COMPANY_CONFIG.name,
    short_name: COMPANY_CONFIG.name,
    description: 'Premium Food Delivery',
    start_url: '/',
    display: 'standalone',
    background_color: '#F8F4EA',
    theme_color: '#0B2118',
    icons: [
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}
