import { integer, pgTable, text } from "drizzle-orm/pg-core";

export const blogPostMetadata = pgTable("blog_post_metadata", {
  id: text().primaryKey(),
  view: integer().default(0).notNull(),
});
