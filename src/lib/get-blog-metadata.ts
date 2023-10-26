import { unstable_cache as cache } from 'next/cache';

import { prisma } from './db';

export const getBlogMetadata = cache(
  prisma.blogMetadata.findUnique,
  undefined,
  { revalidate: 3600 },
);
