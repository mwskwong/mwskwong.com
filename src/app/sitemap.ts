import { type MetadataRoute } from 'next';

import { routes, siteUrl } from '@/constants/site-config';
import { getArticles } from '@/lib/queries';

const sitemap = async () => {
  const articles = await getArticles();

  return [
    ...Object.values(routes).map(({ pathname }) => ({
      url: siteUrl + pathname,
      lastModified: new Date(),
    })),
    ...articles.map(({ slug, updatedAt }) => ({
      url: `${siteUrl}${routes.blog.pathname}/${slug}`,
      lastModified: updatedAt,
    })),
  ] satisfies MetadataRoute.Sitemap;
};

export default sitemap;
