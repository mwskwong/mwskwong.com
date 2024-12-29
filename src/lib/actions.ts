'use server';

import { prisma } from './clients';

export const incrementArticleView = (id: string) =>
  prisma.articleMetadata.upsert({
    where: { id },
    update: { view: { increment: 1 } },
    create: { id },
  });
