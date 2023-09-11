'use server';

import { prisma } from '@/lib/db';

export const incrBlogView = (id: string) =>
  prisma.blogMetadata.upsert({
    where: { id },
    update: { view: { increment: 1 } },
    create: { id },
  });
