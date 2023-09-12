import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/db';

export const POST = async (
  _: NextRequest,
  { params: { id } }: { params: { id: string } },
) => {
  const metadata = await prisma.blogMetadata.upsert({
    where: { id },
    update: { like: { decrement: 1 } },
    create: { id },
  });

  revalidateTag(`blogs:metadata:${id}`);

  return NextResponse.json(metadata);
};
