import { MetadataRoute } from 'next';

import { baseUrl } from '@/constants/base-url';
import { getBlogs } from '@/lib/get-blogs';

const sitemap = async () => {
  const blogs = await getBlogs();

  return [
    ...['/', '/blog'].map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
    })),
    ...blogs.map(({ slug, updatedAt }) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: updatedAt,
    })),
  ] satisfies MetadataRoute.Sitemap;
};

export default sitemap;
