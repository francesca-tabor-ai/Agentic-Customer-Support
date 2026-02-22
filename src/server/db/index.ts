import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";

/** SQLite path; use ":memory:" for dev or a file path for production persistence. */
const dbPath = process.env.DATABASE_URL ?? ":memory:";
const sqlite = new Database(dbPath);
export const db = drizzle(sqlite, { schema });
