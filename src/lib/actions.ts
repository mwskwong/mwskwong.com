"use server";

import { sql } from "drizzle-orm";

import { database } from "./clients";
import { articleMetadata } from "./schema";

export const incrementArticleView = async (id: string) => {
  const rows = await database
    .insert(articleMetadata)
    .values({ id })
    .onConflictDoUpdate({
      target: articleMetadata.id,
      set: { view: sql`${articleMetadata.view} + 1` },
    })
    .returning();

  return rows[0];
};
