import { unstable_cache as cache } from 'next/cache';

import { prisma } from './db';

export const getBlogMetadataById = cache(
  (id: string) => prisma.blogMetadata.findUnique({ where: { id } }),
  [process.env.VERCEL_GIT_COMMIT_REF ?? ''],
  { revalidate: 3600 },
);
