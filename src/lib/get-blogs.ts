import { cache } from 'react';

import { contentful } from './client';
import { BlogSkeleton } from './types';

export const getBlogs = cache(
  async (pagination?: { page: number; pageSize?: number }) => {
    const { page = 1, pageSize = 9 } = pagination ?? {};
    const { items } = await contentful.getEntries<BlogSkeleton>({
      select: [
        'sys.updatedAt',
        'sys.id',
        'fields.categories',
        'fields.coverPhoto',
        'fields.description',
        'fields.slug',
        'fields.title',
      ],
      content_type: 'blog',
      order: ['-sys.updatedAt'],
      skip: pagination && (page - 1) * pageSize,
      limit: pagination && pageSize,
    });

    return items.map((item) => ({
      id: item.sys.id,
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
    }));
  },
);
