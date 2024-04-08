import { MetadataRoute } from 'next';

import { baseUrl } from '@/constants/site-config';
import { env } from '@/env';

const robots = () =>
  ({
    rules: {
      userAgent: '*',
      disallow: env.VERCEL_ENV === 'production' ? undefined : '/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }) satisfies MetadataRoute.Robots;

export default robots;
