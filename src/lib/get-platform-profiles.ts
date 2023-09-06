import { orderBy } from 'lodash-es';
import { cache } from 'react';
import { client } from './client';
import { PlatformProfileSkeleton } from './types';

export const getPlatformProfiles = cache(async () => {
  const { items } = await client.getEntries<PlatformProfileSkeleton>({
    select: ['sys.id', 'fields'],
    content_type: 'platformProfile',
  });

  const platformProfiles = items.map((item) => ({
    ...item.fields,
    platform: item.fields.platform && {
      id: item.fields.platform.sys.id,
      name: item.fields.platform.fields.name,
    },
  }));

  return orderBy(platformProfiles, 'platform.name');
});
