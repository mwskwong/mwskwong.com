import { unstable_cache as cache } from 'next/cache';

import { prisma } from './db';

export const getBlogsMetadataByIds = cache(
  (ids: string[]) =>
    prisma.blogMetadata.findMany({ where: { id: { in: ids } } }),
  [process.env.VERCEL_GIT_COMMIT_REF ?? ''],
  {
    revalidate: 3600,
  },
);
