import { Entry } from 'contentful';

import { prisma } from '@/lib/clients';
import { BlogSkeleton } from '@/lib/types';

export const POST = async (request: Request) => {
  const blog = (await request.json()) as Entry<BlogSkeleton>;
  const blogMetadata = await prisma.blogMetadata.upsert({
    where: { id: blog.sys.id },
    update: {},
    create: { id: blog.sys.id },
  });

  return Response.json(blogMetadata);
};

export const DELETE = async (request: Request) => {
  const blog = (await request.json()) as Entry<BlogSkeleton>;
  const blogMetadata = await prisma.blogMetadata.delete({
    where: { id: blog.sys.id },
  });

  return Response.json(blogMetadata);
};
