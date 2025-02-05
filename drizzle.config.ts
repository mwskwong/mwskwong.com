import "dotenv/config";
  
import { defineConfig } from "drizzle-kit";

const drizzleConfig = defineConfig({
  schema: "./src/lib/schema.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "",
  },
});

export default drizzleConfig;
