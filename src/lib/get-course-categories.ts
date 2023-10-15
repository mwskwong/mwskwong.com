import { cache } from 'react';

import { contentful } from './client';
import { CourseCategorySkeleton } from './types';

export const getCourses = cache(async () => {
  const { items } = await contentful.getEntries<CourseCategorySkeleton>({
    select: ['fields'],
    content_type: 'courseCategory',
    order: ['fields.name'],
  });

  return items.map((item) => item.fields.name);
});
