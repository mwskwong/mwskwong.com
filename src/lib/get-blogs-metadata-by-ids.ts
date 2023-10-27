import { unstable_cache as cache } from 'next/cache';

import { prisma } from './db';

export const getBlogsMetadataByIds = cache(
  (ids: string[]) =>
    prisma.blogMetadata.findMany({ where: { id: { in: ids } } }),
  undefined,
  {
    revalidate: 3600,
  },
);
