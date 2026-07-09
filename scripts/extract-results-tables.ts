import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import * as cheerio from "cheerio";
import * as schema from "../src/db/schema";

const CONCURRENCY = 6;
const HEADER_KEYWORDS = ["nom", "elo", "pl", "pts", "cat", "perf", "fede", "ligue", "rd", "adv"];
const MAX_CELL_LENGTH = 60;

function cleanText(text: string) {
  return text.replace(/\s+/g, " ").trim();
}

function isLikelyResultsTable(table: cheerio.Cheerio<import("domhandler").Element>) {
  const rows = table.find("tr");
  if (rows.length < 3) return false;

  const headerText = cleanText(rows.first().text()).toLowerCase();
  return HEADER_KEYWORDS.some((kw) => headerText.includes(kw));
}

function extractTables(html: string): string | null {
  const start = html.indexOf("post-content");
  const content = start >= 0 ? html.slice(start) : html;
  const $ = cheerio.load(content);

  const cleanTables: string[] = [];

  $("table").each((_, el) => {
    const table = $(el);
    if (!isLikelyResultsTable(table)) return;

    const rows = table.find("tr");
    const rowsHtml: string[] = [];
    let hasOversizedCell = false;

    rows.each((rowIndex, rowEl) => {
      if (hasOversizedCell) return;

      const row = $(rowEl);
      const isHeader = rowIndex === 0 || row.hasClass("papi_liste_t");
      const tag = isHeader ? "th" : "td";
      const cells = row
        .find("td, th")
        .toArray()
        .map((cellEl) => cleanText($(cellEl).text()));

      if (cells.some((c) => c.length > MAX_CELL_LENGTH)) {
        // Papi-web sometimes nests a hidden detail table inside a cell (round-by-round
        // pairing history). .text() then flattens it into one huge unreadable blob.
        // Bail out on the whole table rather than ship garbled cells.
        hasOversizedCell = true;
        return;
      }

      if (cells.length === 0 || cells.every((c) => c === "")) return;

      const cellsHtml = cells.map((c) => `<${tag}>${c}</${tag}>`).join("");
      rowsHtml.push(`<tr>${cellsHtml}</tr>`);
    });

    if (hasOversizedCell || rowsHtml.length < 2) return;

    cleanTables.push(`<table>${rowsHtml.join("")}</table>`);
  });

  if (cleanTables.length === 0) return null;
  return cleanTables.join("\n");
}

async function main() {
  const db = drizzle(neon(process.env.DATABASE_URL!), { schema });

  const rows = await db
    .select({ id: schema.articles.id, slug: schema.articles.slug })
    .from(schema.articles);

  const limit = process.env.EXTRACT_LIMIT ? parseInt(process.env.EXTRACT_LIMIT, 10) : rows.length;
  const toProcess = rows.slice(0, limit);
  console.log(`${rows.length} articles au total, ${toProcess.length} traités.`);

  let index = 0;
  let withTables = 0;
  let withoutTables = 0;
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
        const tablesHtml = extractTables(html);

        if (!tablesHtml) {
          withoutTables++;
          continue;
        }

        await db
          .update(schema.articles)
          .set({ resultsHtml: tablesHtml })
          .where(eq(schema.articles.id, row.id));
        withTables++;
        if (withTables % 20 === 0) console.log(`${withTables} articles avec tableaux...`);
      } catch (err) {
        failed++;
        console.error(`Échec pour ${row.slug}:`, (err as Error).message);
      }
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));

  console.log(`Terminé. ${withTables} avec tableaux, ${withoutTables} sans tableau, ${failed} échecs.`);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
