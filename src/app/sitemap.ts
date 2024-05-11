import { type MetadataRoute } from 'next';

import * as nav from '@/constants/nav';
import { env } from '@/env.mjs';
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
        url: env.NEXT_PUBLIC_SITE_URL + pathname,
        lastModified:
          pathname === nav.privacyPolicy.pathname
            ? privacyPolicy.updatedAt
            : new Date(),
      })),
    ...blogs.map(({ slug, updatedAt }) => ({
      url: `${env.NEXT_PUBLIC_SITE_URL}${nav.blog.pathname}/${slug}`,
      lastModified: updatedAt,
    })),
  ] satisfies MetadataRoute.Sitemap;
};

export default sitemap;
