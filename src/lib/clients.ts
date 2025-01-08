import "server-only";

import { neon } from "@neondatabase/serverless";
import { createClient } from "contentful";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";

config({ path: ".env" });

export const contentful = createClient({
  space: process.env.CONTENTFUL_SPACE_ID ?? "",
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN ?? "",
  environment: process.env.CONTENTFUL_ENVIRONMENT,
}).withoutUnresolvableLinks;

export const database = drizzle({
  client: neon(process.env.DATABASE_URL ?? ""),
  casing: "snake_case",
});
