'use server';

import { cookies } from 'next/headers';

import { prisma } from '@/lib/db';

export const viewBlogById = async (id: string) => {
  // FIXME: @planetscale/database make uses of fetch by default and Next.js is caching this upsert operation as well
  // calling cookies() to mislead Next.js not to cache it
  cookies();
  return prisma.blogMetadata.upsert({
    where: { id },
    update: { view: { increment: 1 } },
    create: { id },
  });
};
