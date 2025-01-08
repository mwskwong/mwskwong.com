import { integer, pgTable, text } from "drizzle-orm/pg-core";

export const articleMetadata = pgTable("article_metadata", {
  id: text().primaryKey(),
  view: integer().default(0).notNull(),
});
