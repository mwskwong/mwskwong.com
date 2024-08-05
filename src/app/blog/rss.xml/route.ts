import { Feed } from 'feed';

import { email, firstName, lastName, middleName } from '@/constants/content';
import { blog, blogRssFeed } from '@/constants/nav';
import { siteUrl } from '@/constants/site-config';
import { getBlogs } from '@/lib/queries';

const name = `${firstName} ${lastName}`;

export const GET = async () => {
  const blogs = await getBlogs();
  const blogFeed = new Feed({
    title: `${name} ${blog.label}`,
    description: 'Personal perspectives on a broad range of topics.',
    id: siteUrl + blogRssFeed.pathname,
    link: siteUrl + blog.pathname,
    language: 'en',
    copyright: `© ${new Date().getFullYear()} ${lastName.toUpperCase()}, ${firstName} ${middleName}`,
    feedLinks: {
      rss: siteUrl + blogRssFeed.pathname,
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
      guid: `${siteUrl}${blog.pathname}/${slug}`,
      title,
      link: `${siteUrl}${blog.pathname}/${slug}`,
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
