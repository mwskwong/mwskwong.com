import { MetadataRoute } from 'next';
// eslint-disable-next-line camelcase -- Next.js naming convention
import { unstable_cache } from 'next/cache';

import { blogTags } from '@/lib/cache-tags';
import { getBlogs } from '@/lib/get-blogs';
import { baseUrl } from '@/utils/base-url';

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const blogs = await unstable_cache(getBlogs, [], {
    tags: blogTags.lists(),
  })();

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
