import { Feed } from "feed";

import { email, firstName, lastName, legalName } from "@/constants/me";
import { routes, siteUrl } from "@/constants/site-config";
import { getBlogPosts } from "@/lib/queries";

const name = `${firstName} ${lastName}`;

export const GET = async () => {
  const blogPosts = await getBlogPosts();
  const feed = new Feed({
    title: `${name} ${routes.blog.name}`,
    description: "Personal perspectives on a broad range of topics.",
    id: siteUrl + routes.blogRssFeed.pathname,
    link: siteUrl + routes.blog.pathname,
    language: "en",
    copyright: `Copyright © ${new Date().getFullYear()} ${legalName}`,
    feedLinks: {
      rss: siteUrl + routes.blogRssFeed.pathname,
      atom: "self",
    },
  });

  for (const { title, slug, summary, updatedAt } of blogPosts) {
    feed.addItem({
      guid: `${siteUrl}${routes.blog.pathname}/${slug}`,
      title,
      link: `${siteUrl}${routes.blog.pathname}/${slug}`,
      description: summary,
      author: [{ name, email }],
      published: updatedAt,
      date: updatedAt,
    });
  }

  return new Response(feed.rss2(), {
    headers: { "Content-Type": "text/xml" },
  });
};
