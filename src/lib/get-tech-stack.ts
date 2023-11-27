import { orderBy } from 'lodash-es';
import { cache } from 'react';

import { contentful } from './clients';
import { ProjectSkeleton } from './types';

const priorities = { priorityHigh: 1, priorityMedium: 2, priorityLow: 3 };

export const getTechStack = cache(async () => {
  const { items } = await contentful.getEntries<ProjectSkeleton>({
    select: ['fields.name', 'fields.url', 'metadata.tags'],
    content_type: 'project',
    'metadata.tags.sys.id[in]': ['techStack'],
    order: ['fields.name'],
  });

  return orderBy(items, (item) => {
    const priority = item.metadata.tags.find((tag) =>
      tag.sys.id.startsWith('priority'),
    );

    return priority && priorities[priority.sys.id as keyof typeof priorities];
  }).map((item) => ({
    id: item.sys.id,
    name: item.fields.name,
    url: item.fields.url,
  }));
});
