import "server-only";

import { PrismaClient } from "@prisma/client";
import { createClient } from "contentful";

export const contentful = createClient({
  space: process.env.CONTENTFUL_SPACE_ID ?? "",
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN ?? "",
  environment: process.env.CONTENTFUL_ENVIRONMENT,
}).withoutUnresolvableLinks;

export const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});
