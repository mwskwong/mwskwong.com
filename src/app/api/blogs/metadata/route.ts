import { Entry } from 'contentful';
import { headers } from 'next/headers';

import { prisma } from '@/lib/clients';
import { BlogSkeleton } from '@/lib/types';

export const POST = async (request: Request) => {
  const token = headers().get('Authorization')?.split('Bearer ')[1];

  if (token === process.env.API_TOKEN) {
    const blog = (await request.json()) as Entry<BlogSkeleton>;
    const blogMetadata = await prisma.blogMetadata.upsert({
      where: { id: blog.sys.id },
      update: {},
      create: { id: blog.sys.id },
    });

    return Response.json(blogMetadata);
  }

  return Response.json(null, { status: 401 });
};

export const DELETE = async (request: Request) => {
  const token = headers().get('Authorization')?.split('Bearer ')[1];

  if (token === process.env.API_TOKEN) {
    const blog = (await request.json()) as Entry<BlogSkeleton>;
    const blogMetadata = await prisma.blogMetadata.delete({
      where: { id: blog.sys.id },
    });

    return Response.json(blogMetadata);
  }

  return Response.json(null, { status: 401 });
};
