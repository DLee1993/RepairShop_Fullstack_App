import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";

// dotenv will look here for env variables
config({ path: ".env" });

// define sql
const sql = neon(process.env.DATABASE_URL!);

// define database
// If you need to log commands, add {logger:true} to drizzle call
const db = drizzle(sql);

// export database
export { db };
