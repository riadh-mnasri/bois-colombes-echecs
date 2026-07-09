import bcrypt from "bcryptjs";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import * as schema from "../src/db/schema";

async function main() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const name = process.env.ADMIN_NAME?.trim();
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !name || !password) {
    throw new Error("ADMIN_EMAIL, ADMIN_NAME et ADMIN_PASSWORD sont requis.");
  }

  const sql = neon(process.env.DATABASE_URL!);
  const db = drizzle(sql, { schema });

  const [existing] = await db
    .select()
    .from(schema.users)
    .where(eq(schema.users.email, email))
    .limit(1);

  if (existing) {
    console.log(`Un compte existe déjà pour ${email}, rien à faire.`);
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await db.insert(schema.users).values({ email, name, passwordHash });
  console.log(`Compte administrateur créé pour ${email}.`);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
