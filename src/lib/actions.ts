"use server";

import { sql } from "drizzle-orm";

import { db } from "./clients";
import { getBlogPosts } from "./queries";
import { blogPostMetadata } from "./schema";

export const incrementBlogPostView = async (id: string) => {
  const blogPosts = await getBlogPosts();
  const validBlogPostIds = blogPosts.map(({ id }) => id);
  if (!validBlogPostIds.includes(id)) return;

  const rows = await db
    .insert(blogPostMetadata)
    .values({ id })
    .onConflictDoUpdate({
      target: blogPostMetadata.id,
      set: { view: sql`${blogPostMetadata.view} + 1` },
    })
    .returning();

  return rows[0];
};
