import { MetadataRoute } from 'next';

import { baseUrl } from '@/constants/base-url';
import { getBlogs, getPrivacyStatement } from '@/lib/queries';

const sitemap = async () => {
  const [privacyStatement, blogs] = await Promise.all([
    getPrivacyStatement(),
    getBlogs(),
  ]);

  return [
    ...['/', '/blog', '/guestbook'].map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
    })),
    {
      url: `${baseUrl}/privacy-statement`,
      lastModified: privacyStatement.updatedAt,
    },
    ...blogs.map(({ slug, updatedAt }) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: updatedAt,
    })),
  ] satisfies MetadataRoute.Sitemap;
};

export default sitemap;
