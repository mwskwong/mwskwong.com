import { cache } from 'react';

import { contentful } from './client';
import { ProjectSkeleton } from './types';

export const getContributedProjects = cache(async () => {
  const { items } = await contentful.getEntries<ProjectSkeleton>({
    select: ['sys.id', 'fields.name', 'fields.url'],
    content_type: 'project',
    'metadata.tags.sys.id[in]': ['contributed'],
    order: ['fields.name'],
  });

  return items.map((item) => ({
    id: item.sys.id,
    name: item.fields.name,
    url: item.fields.url,
  }));
});
