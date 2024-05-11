import { Feed } from 'feed';

import {
  email,
  firstName,
  headline,
  lastName,
  middleName,
} from '@/constants/content';
import { blog, rssFeed } from '@/constants/nav';
import { env } from '@/env.mjs';
import { getBlogs } from '@/lib/queries';

const name = `${firstName} ${lastName}`;

export const GET = async () => {
  const blogs = await getBlogs();
  const blogFeed = new Feed({
    title: `${name} - ${headline}`,
    description: 'Personal perspectives on a broad range of topics.',
    id: env.NEXT_PUBLIC_SITE_URL + rssFeed.pathname,
    link: env.NEXT_PUBLIC_SITE_URL,
    language: 'en',
    copyright: `© ${new Date().getFullYear()} ${lastName.toUpperCase()}, ${firstName} ${middleName}`,
    feedLinks: {
      rss: env.NEXT_PUBLIC_SITE_URL + rssFeed.pathname,
      atom: 'self',
    },
  });

  for (const {
    title,
    slug,
    description,
    categories = [],
    createdAt,
    updatedAt,
  } of blogs) {
    blogFeed.addItem({
      guid: `${env.NEXT_PUBLIC_SITE_URL}${blog.pathname}/${slug}`,
      title,
      link: `${env.NEXT_PUBLIC_SITE_URL}${blog.pathname}/${slug}`,
      description,
      author: [{ name, email }],
      published: new Date(createdAt),
      date: new Date(updatedAt),
      category: categories.map((category) => ({ name: category })),
    });
  }

  return new Response(blogFeed.rss2(), {
    headers: { 'Content-Type': 'text/xml' },
  });
};
