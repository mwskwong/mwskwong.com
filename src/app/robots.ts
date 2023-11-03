import { MetadataRoute } from 'next';

import { baseUrl } from '@/constants/base-url';

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: '*',
    allow: '/',
  },
  sitemap: `${baseUrl}/sitemap.xml`,
});

export default robots;
