import { type MetadataRoute } from 'next';

import { routes, siteUrl } from '@/constants/site-config';
import { getBlogs, getPrivacyPolicy } from '@/lib/queries';

const sitemap = async () => {
  const [privacyPolicy, blogs] = await Promise.all([
    getPrivacyPolicy(),
    getBlogs(),
  ]);

  return [
    ...Object.values(routes)
      .filter(({ hash }) => !hash)
      .map(({ pathname }) => ({
        url: siteUrl + pathname,
        lastModified:
          pathname === routes.privacyPolicy.pathname
            ? privacyPolicy.updatedAt
            : new Date(),
      })),
    ...blogs.map(({ slug, updatedAt }) => ({
      url: `${siteUrl}${routes.blog.pathname}/${slug}`,
      lastModified: updatedAt,
    })),
  ] satisfies MetadataRoute.Sitemap;
};

export default sitemap;
