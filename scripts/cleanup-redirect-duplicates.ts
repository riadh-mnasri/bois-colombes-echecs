import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { sql } from "drizzle-orm";
import * as schema from "../src/db/schema";

async function main() {
  const db = drizzle(neon(process.env.DATABASE_URL!), { schema });

  const duplicateGroups = await db.execute<{ title: string; count: number }>(
    sql`select title, count(*)::int as count from articles group by title having count(*) > 1`
  );

  let deleted = 0;

  for (const group of duplicateGroups.rows) {
    const rows = await db.execute<{ id: number; slug: string }>(
      sql`select id, slug from articles where title = ${group.title} order by id asc`
    );
    const [, ...toDelete] = rows.rows;

    for (const row of toDelete) {
      await db.execute(sql`delete from articles where id = ${row.id}`);
      deleted++;
    }
    console.log(`"${group.title}": gardé 1, supprimé ${toDelete.length}`);
  }

  console.log(`Terminé. ${deleted} doublons de redirection supprimés.`);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
