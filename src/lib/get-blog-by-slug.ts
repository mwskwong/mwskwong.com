import { cache } from 'react';

import { contentful } from './client';
import { BlogSkeleton } from './types';

export const getBlogBySlug = cache(async (slug: string) => {
  const { items } = await contentful.getEntries<BlogSkeleton>({
    select: ['sys.id', 'sys.createdAt', 'sys.updatedAt', 'fields'],
    content_type: 'blog',
    'fields.slug[in]': [slug],
    limit: 1,
  });

  const item = items[0];
  return (
    item && {
      id: item.sys.id,
      createdAt: item.sys.createdAt,
      updatedAt: item.sys.updatedAt,
      coverPhoto:
        item.fields.coverPhoto?.fields.file &&
        `https:${item.fields.coverPhoto.fields.file.url}`,
      categories: item.fields.categories
        ?.map((category) => category?.fields.name)
        .filter((category): category is string => Boolean(category))
        .sort(),
      title: item.fields.title,
      slug: item.fields.slug,
      description: item.fields.description,
      content: item.fields.content,
    }
  );
});
