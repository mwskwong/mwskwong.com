import { unstable_cache as cache } from 'next/cache';

import { contentful } from './client';
import { CourseSkeleton } from './types';

export const getCourses = cache(async () => {
  const { items } = await contentful.getEntries<CourseSkeleton>({
    select: ['fields'],
    content_type: 'course',
    order: ['fields.name'],
  });

  return items.map((item) => ({
    ...item.fields,
    institution: item.fields.institution && {
      id: item.fields.institution.sys.id,
      name: item.fields.institution.fields.name,
    },
    certificate:
      item.fields.certificate?.fields.file &&
      `https:${item.fields.certificate.fields.file.url}`,
    categories: item.fields.categories
      ?.map((category) => category?.fields.name)
      .filter((category): category is string => Boolean(category))
      .sort(),
  }));
}, ['courses', 'list']);
