import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env" });

const drizzleConfig = defineConfig({
  schema: "./src/lib/schema.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "",
  },
});

export default drizzleConfig;
