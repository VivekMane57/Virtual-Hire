// utils/db.js (or db.ts)
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const connectionString = process.env.DRIZZLE_DB_URL;

if (!connectionString) {
  throw new Error("DRIZZLE_DB_URL is not set in environment variables.");
}

const sql = neon(connectionString);
export const db = drizzle(sql, { schema });
