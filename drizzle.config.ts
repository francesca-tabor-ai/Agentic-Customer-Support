import { config } from "dotenv";

config(); // .env
config({ path: ".env.local", override: true }); // override with local

import { defineConfig } from "drizzle-kit";

const connectionString =
  process.env.DATABASE_PUBLIC_URL ?? process.env.DATABASE_URL ?? "";

export default defineConfig({
  schema: "./src/server/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: { url: connectionString },
});
