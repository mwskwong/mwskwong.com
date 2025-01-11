"use server";

import { sql } from "drizzle-orm";

import { database } from "./clients";
import { blogPostMetadata } from "./schema";

export const incrementBlogPostView = async (id: string) => {
  const rows = await database
    .insert(blogPostMetadata)
    .values({ id })
    .onConflictDoUpdate({
      target: blogPostMetadata.id,
      set: { view: sql`${blogPostMetadata.view} + 1` },
    })
    .returning();

  return rows[0];
};
