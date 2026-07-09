import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../src/db/schema";
import { articles as staticArticles } from "../src/lib/content";

const SITEMAP_URL = "https://www.bois-colombes-echecs.com/post-sitemap.xml";
const CONCURRENCY = 6;

function slugFromUrl(url: string) {
  const path = new URL(url).pathname;
  return path.replace(/^\/|\/$/g, "");
}

function decodeEntities(text: string) {
  return text
    .replace(/&#0?39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&rsquo;/g, "'")
    .replace(/&eacute;/g, "é")
    .replace(/&egrave;/g, "è");
}

async function fetchArticleMeta(url: string) {
  const res = await fetch(url);
  if (!res.ok) return null;
  const html = await res.text();

  const titleMatch = html.match(/<meta property="og:title" content="([^"]*)"/);
  const imageMatch = html.match(/<meta property="og:image" content="([^"]*)"/);
  const dateMatch = html.match(/<meta property="article:published_time" content="([^"]*)"/);

  if (!titleMatch || !imageMatch || !dateMatch) return null;

  const title = decodeEntities(titleMatch[1])
    .replace(/\s*[-–]\s*Cercle d'Echecs de Bois-Colombes\s*$/i, "")
    .trim();
  const image = imageMatch[1];
  const date = dateMatch[1].slice(0, 10);

  return { title, image, date };
}

async function main() {
  const sitemapRes = await fetch(SITEMAP_URL);
  const sitemapXml = await sitemapRes.text();

  const entries = [...sitemapXml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);

  const existingSlugs = new Set(staticArticles.map((a) => a.slug));

  const db = drizzle(neon(process.env.DATABASE_URL!), { schema });
  const [admin] = await db.select().from(schema.users).limit(1);
  if (!admin) throw new Error("Aucun utilisateur admin trouvé pour attribuer les articles importés.");

  const dbArticles = await db.select({ slug: schema.articles.slug }).from(schema.articles);
  const alreadyImported = new Set(dbArticles.map((a) => a.slug));

  const toImport = entries.filter((url) => {
    const slug = slugFromUrl(url);
    return slug && !existingSlugs.has(slug) && !alreadyImported.has(slug);
  });

  const limit = process.env.IMPORT_LIMIT ? parseInt(process.env.IMPORT_LIMIT, 10) : toImport.length;
  const limited = toImport.slice(0, limit);

  console.log(`${entries.length} URLs au total, ${toImport.length} à importer (limite : ${limited.length}).`);

  let imported = 0;
  let skipped = 0;
  let index = 0;

  async function worker() {
    while (index < limited.length) {
      const url = limited[index++];
      const slug = slugFromUrl(url);
      try {
        const meta = await fetchArticleMeta(url);
        if (!meta) {
          skipped++;
          continue;
        }
        await db.insert(schema.articles).values({
          slug,
          title: meta.title,
          date: meta.date,
          excerpt: `Retrouvez les résultats et le compte-rendu de : ${meta.title}.`,
          body: `Retrouvez les résultats et le compte-rendu de : ${meta.title}.`,
          images: [meta.image],
          authorId: admin.id,
        });
        imported++;
        if (imported % 20 === 0) console.log(`${imported} articles importés...`);
      } catch (err) {
        skipped++;
        console.error(`Échec pour ${url}:`, (err as Error).message);
      }
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));

  console.log(`Terminé. ${imported} importés, ${skipped} ignorés.`);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
