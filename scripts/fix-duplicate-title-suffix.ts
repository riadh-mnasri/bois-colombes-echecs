import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import * as schema from "../src/db/schema";

async function main() {
  const db = drizzle(neon(process.env.DATABASE_URL!), { schema });
  const rows = await db.select().from(schema.articles);

  let fixed = 0;
  for (const row of rows) {
    if (!/Cercle d.Echecs de Bois-Colombes/i.test(row.title)) continue;
    const cleaned = row.title
      .replace(/(\s*[-–]?\s*Cercle d'Echecs de Bois-Colombes\s*)+$/gi, "")
      .trim();
    if (cleaned !== row.title && cleaned.length > 0) {
      await db.update(schema.articles).set({ title: cleaned }).where(eq(schema.articles.id, row.id));
      console.log(`"${row.title}" -> "${cleaned}"`);
      fixed++;
    }
  }
  console.log(`Terminé. ${fixed} titres corrigés.`);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
