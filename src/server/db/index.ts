import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";

/** Prefer DATABASE_PUBLIC_URL (Railway public) for local dev; DATABASE_URL on Railway. */
const connectionString =
  process.env.DATABASE_PUBLIC_URL ?? process.env.DATABASE_URL ?? "";

const client = postgres(connectionString);
export const db = drizzle(client, { schema });
