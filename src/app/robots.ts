import { MetadataRoute, ServerRuntime } from 'next';

import { baseUrl } from '@/constants/base-url';

const robots = () =>
  ({
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }) satisfies MetadataRoute.Robots;

export const runtime = 'edge' satisfies ServerRuntime;

export default robots;
