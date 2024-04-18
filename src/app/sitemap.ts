import { type MetadataRoute } from 'next';

import {
  blog,
  guestbook,
  home,
  privacyPolicy as privacyPolicyNav,
} from '@/constants/nav';
import { env } from '@/env.mjs';
import { getBlogs, getPrivacyPolicy } from '@/lib/queries';

const sitemap = async () => {
  const [privacyPolicy, blogs] = await Promise.all([
    getPrivacyPolicy(),
    getBlogs(),
  ]);

  return [
    ...[home.pathname, blog.pathname, guestbook.pathname].map((route) => ({
      url: env.NEXT_PUBLIC_SITE_URL + route,
      lastModified: new Date(),
    })),
    {
      url: env.NEXT_PUBLIC_SITE_URL + privacyPolicyNav.pathname,
      lastModified: privacyPolicy.updatedAt,
    },
    ...blogs.map(({ slug, updatedAt }) => ({
      url: `${env.NEXT_PUBLIC_SITE_URL}${blog.pathname}/${slug}`,
      lastModified: updatedAt,
    })),
  ] satisfies MetadataRoute.Sitemap;
};

export default sitemap;
