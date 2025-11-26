// utils/db.js
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// We only initialize the DB on the server.
// On the client (browser) this file can still be imported without crashing.
let db = null;

if (typeof window === "undefined") {
  const connectionString =
    process.env.DRIZZLE_DB_URL || process.env.NEXT_PUBLIC_DRIZZLE_DB_URL;

  if (!connectionString) {
    console.warn(
      "⚠ DRIZZLE_DB_URL / NEXT_PUBLIC_DRIZZLE_DB_URL is not set. Database is not initialized."
    );
  } else {
    const sql = neon(connectionString);
    db = drizzle(sql, { schema });
  }
}

export { db };
export default db;
