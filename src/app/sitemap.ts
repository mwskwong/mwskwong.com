import { type MetadataRoute } from 'next';

import { routes, siteUrl } from '@/constants/site-config';
import { getArticlesUncached } from '@/lib/queries';

const sitemap = async () => {
  // WORKAROUND: sitemap will throw a build error if we use "use cache"
  // ref: https://github.com/vercel/next.js/issues/74146
  const articles = await getArticlesUncached();

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
