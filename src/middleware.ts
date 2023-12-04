import { Entry } from 'contentful';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { BlogSkeleton } from './lib/types';

// partial Contentful blog schema
const blogSchema = z.object({
  sys: z.object({
    id: z.string(),
  }),
});

const middleware = async (request: NextRequest) => {
  const authorizationHeader = request.headers.get('Authorization');
  const accessToken = authorizationHeader?.split('Bearer ')[1];

  if (accessToken !== process.env.API_ACCESS_TOKEN) {
    return NextResponse.json(
      { message: 'missing or invalid API access token' },
      { status: 401 },
    );
  }

  if (
    request.nextUrl.pathname.startsWith('/api/blog/metadata') &&
    request.method.toUpperCase() !== 'GET'
  ) {
    const blog = (await request.json()) as Entry<BlogSkeleton>;
    const result = blogSchema.safeParse(blog);
    if (!result.success) {
      return NextResponse.json(
        { message: result.error.message },
        { status: 400 },
      );
    }
  }
};

export const config = { matcher: '/api/:path*' };
export default middleware;
