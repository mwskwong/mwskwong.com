import { MetadataRoute } from 'next';
import { getBlogs } from '@/lib/get-blogs';
import { baseUrl } from '@/utils/base-url';

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const blogSlugs = await getBlogs().then((blogs) =>
    blogs.map(({ slug }) => slug),
  );

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
    ...blogSlugs.map((slug) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
    })),
  ];
};

export default sitemap;
