import { type MetadataRoute } from 'next';

import { env } from '@/env';

const robots = () =>
  ({
    rules: {
      userAgent: '*',
      disallow: env.VERCEL_ENV === 'production' ? undefined : '/',
    },
    sitemap: `${env.NEXT_PUBLIC_SITE_URL}/sitemap`,
  }) satisfies MetadataRoute.Robots;

export default robots;
