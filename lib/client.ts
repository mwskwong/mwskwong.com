import { createClient } from "contentful";
import "server-only";

const client = createClient({
  space: process.env.CF_SPACE_ID ?? "",
  accessToken: process.env.CF_DELIVERY_ACCESS_TOKEN ?? "",
  environment: process.env.VERCEL_ENV === "production" ? "v3" : "develop", // TODO: change to production later on depending on process.env.VERCEL_ENV
});

export default client.withoutUnresolvableLinks;
