import { unstable_cache as cache } from 'next/cache';

import { prisma } from './db';

export const getBlogsMetadata = cache(prisma.blogMetadata.findMany, undefined, {
  revalidate: 3600,
});
