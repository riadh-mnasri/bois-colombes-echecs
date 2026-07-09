import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import * as schema from "../src/db/schema";

const CONCURRENCY = 6;
const MAX_PHOTOS = 10;
const IMAGE_EXT = /\.(jpe?g|png|gif|webp)$/i;
const EXCLUDE_PATTERNS = [
  "sigle-cebc",
  "formateur",
  "zero-tolerance",
  "logo-fond-blanc",
  "logo-distingo",
  "logo-cebc",
];

function extractContentImages(html: string): string[] {
  const start = html.indexOf("post-content");
  const content = start >= 0 ? html.slice(start) : html;

  const matches = [...content.matchAll(/src="(https:\/\/www\.bois-colombes-echecs\.com\/wp-content\/uploads\/[^"]+)"/g)];

  const seen = new Set<string>();
  const result: string[] = [];

  for (const m of matches) {
    const url = m[1];
    if (!IMAGE_EXT.test(url)) continue;
    const lower = url.toLowerCase();
    if (EXCLUDE_PATTERNS.some((p) => lower.includes(p))) continue;
    if (seen.has(url)) continue;
    seen.add(url);
    result.push(url);
    if (result.length >= MAX_PHOTOS) break;
  }

  return result;
}

async function main() {
  const db = drizzle(neon(process.env.DATABASE_URL!), { schema });

  const rows = await db
    .select({ id: schema.articles.id, slug: schema.articles.slug, images: schema.articles.images })
    .from(schema.articles);

  const candidates = rows.filter((r) => r.images.length <= 1);
  const limit = process.env.ENRICH_LIMIT ? parseInt(process.env.ENRICH_LIMIT, 10) : candidates.length;
  const toProcess = candidates.slice(0, limit);
  console.log(`${rows.length} articles au total, ${candidates.length} candidats, ${toProcess.length} traités.`);

  let index = 0;
  let updated = 0;
  let unchanged = 0;
  let failed = 0;

  async function worker() {
    while (index < toProcess.length) {
      const row = toProcess[index++];
      const url = `https://www.bois-colombes-echecs.com/${row.slug}/`;
      try {
        const res = await fetch(url);
        if (!res.ok) {
          failed++;
          continue;
        }
        const html = await res.text();
        const images = extractContentImages(html);

        if (images.length === 0) {
          unchanged++;
          continue;
        }

        const cover = row.images[0];
        const finalImages = images.includes(cover) ? images : [cover, ...images].slice(0, MAX_PHOTOS);

        if (finalImages.length <= 1) {
          unchanged++;
          continue;
        }

        await db.update(schema.articles).set({ images: finalImages }).where(eq(schema.articles.id, row.id));
        updated++;
        if (updated % 20 === 0) console.log(`${updated} articles enrichis...`);
      } catch (err) {
        failed++;
        console.error(`Échec pour ${row.slug}:`, (err as Error).message);
      }
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));

  console.log(`Terminé. ${updated} enrichis, ${unchanged} inchangés (1 seule photo trouvée), ${failed} échecs.`);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
