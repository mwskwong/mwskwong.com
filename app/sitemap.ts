import { MetadataRoute } from 'next';

import { baseUrl } from '@/constants/base-url';
import {
  blog,
  guestbook,
  home,
  privacyPolicy as privacyPolicyNav,
} from '@/constants/nav';
import { getBlogs, getPrivacyPolicy } from '@/lib/queries';

const sitemap = async () => {
  const [privacyPolicy, blogs] = await Promise.all([
    getPrivacyPolicy(),
    getBlogs(),
  ]);

  return [
    ...[home.pathname, blog.pathname, guestbook.pathname].map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
    })),
    {
      url: baseUrl + privacyPolicyNav.pathname,
      lastModified: privacyPolicy.updatedAt,
    },
    ...blogs.map(({ slug, updatedAt }) => ({
      url: `${baseUrl}${blog.pathname}/${slug}`,
      lastModified: updatedAt,
    })),
  ] satisfies MetadataRoute.Sitemap;
};

export default sitemap;
