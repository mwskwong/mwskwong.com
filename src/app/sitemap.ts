import { type MetadataRoute } from 'next';

import * as nav from '@/constants/nav';
import { siteUrl } from '@/constants/site-config';
import { getBlogs, getPrivacyPolicy } from '@/lib/queries';

const sitemap = async () => {
  const [privacyPolicy, blogs] = await Promise.all([
    getPrivacyPolicy(),
    getBlogs(),
  ]);

  return [
    ...Object.values(nav)
      .filter(({ id }) => !id)
      .map(({ pathname }) => ({
        url: siteUrl + pathname,
        lastModified:
          pathname === nav.privacyPolicy.pathname
            ? privacyPolicy.updatedAt
            : new Date(),
      })),
    ...blogs.map(({ slug, updatedAt }) => ({
      url: `${siteUrl}${nav.blog.pathname}/${slug}`,
      lastModified: updatedAt,
    })),
  ] satisfies MetadataRoute.Sitemap;
};

export default sitemap;
