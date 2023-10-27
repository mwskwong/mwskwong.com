import { orderBy } from 'lodash-es';
import { unstable_cache as cache } from 'next/cache';

import { contentful } from './client';
import { PlatformProfileSkeleton } from './types';

export const getPlatformProfiles = cache(async () => {
  const { items } = await contentful.getEntries<PlatformProfileSkeleton>({
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
}, [process.env.VERCEL_GIT_COMMIT_REF ?? '']);
