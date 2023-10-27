import { unstable_cache as cache } from 'next/cache';

import { prisma } from './db';

export const getBlogMetadataById = cache(
  (id: string) => prisma.blogMetadata.findUnique({ where: { id } }),
  undefined,
  { revalidate: 3600 },
);
