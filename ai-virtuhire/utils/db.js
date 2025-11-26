// utils/db.js
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// Try secure server-side var first, fall back to old NEXT_PUBLIC if present
const connectionString =
  process.env.DRIZZLE_DB_URL || process.env.NEXT_PUBLIC_DRIZZLE_DB_URL;

if (!connectionString) {
  throw new Error(
    "❌ No database connection string found. Set DRIZZLE_DB_URL (or NEXT_PUBLIC_DRIZZLE_DB_URL temporarily)."
  );
}

const sql = neon(connectionString);
export const db = drizzle(sql, { schema });
