import { type MetadataRoute } from 'next';

const robots = () =>
  ({
    rules: {
      userAgent: '*',
      disallow: process.env.VERCEL_ENV === 'production' ? undefined : '/',
    },
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
  }) satisfies MetadataRoute.Robots;

export default robots;
