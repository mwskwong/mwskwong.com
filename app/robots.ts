import { MetadataRoute } from 'next';

import { baseUrl } from '@/constants/site-config';

const robots = () =>
  ({
    rules: {
      userAgent: '*',
      disallow: process.env.VERCEL_ENV === 'production' ? undefined : '/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }) satisfies MetadataRoute.Robots;

export default robots;
