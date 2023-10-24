import { MetadataRoute } from 'next';

import { getBlogs } from '@/lib/get-blogs';
import { baseUrl } from '@/utils/base-url';

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const blogs = await getBlogs();

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
    },
    ...blogs.map(({ slug, updatedAt }) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: new Date(updatedAt),
      changeFrequency: 'daily' as const,
    })),
  ];
};

export default sitemap;
