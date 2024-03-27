import { Feed } from 'feed';

import { email, firstName, lastName, middleName } from '@/constants/content';
import { blog, blogRssFeed } from '@/constants/nav';
import { baseUrl } from '@/constants/site-config';
import { getBlogs } from '@/lib/queries';

export const GET = async () => {
  const blogs = await getBlogs();
  const blogFeed = new Feed({
    title: `${firstName} ${lastName} ${blog.label}`,
    description: 'Personal perspectives on a broad range of topics.',
    id: baseUrl + blogRssFeed.pathname,
    link: baseUrl + blogRssFeed.pathname,
    language: 'en',
    copyright: `© ${new Date().getFullYear()} ${lastName.toUpperCase()}, ${firstName} ${middleName}`,
    feedLinks: {
      rss: baseUrl + blogRssFeed.pathname,
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
      guid: `${baseUrl}${blog.pathname}/${slug}`,
      title,
      link: `${baseUrl}${blog.pathname}/${slug}`,
      description,
      author: [
        {
          name: `${firstName} ${lastName}`,
          email,
        },
      ],
      published: new Date(createdAt),
      date: new Date(updatedAt),
      category: categories.map((category) => ({ name: category })),
    });
  }

  return new Response(blogFeed.rss2(), {
    headers: { 'Content-Type': 'text/xml' },
  });
};
