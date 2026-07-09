import { getDb } from "@/db";
import { articles as articlesTable } from "@/db/schema";
import { articles as staticArticles } from "./content";

export type Article = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  body: string;
  images: string[];
  resultsHtml?: string | null;
};

export async function getAllArticles(): Promise<Article[]> {
  const db = getDb();
  const dbArticles = await db.select().from(articlesTable);

  const merged: Article[] = [
    ...staticArticles.map((a) => ({ ...a })),
    ...dbArticles.map((a) => ({
      slug: a.slug,
      title: a.title,
      date: a.date,
      excerpt: a.excerpt,
      body: a.body,
      images: a.images,
      resultsHtml: a.resultsHtml,
    })),
  ];

  return merged.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  const articles = await getAllArticles();
  return articles.find((a) => a.slug === slug);
}

export async function getPizzaTournamentArticles(): Promise<Article[]> {
  const articles = await getAllArticles();
  return articles.filter(
    (a) => /^vendredi\s/i.test(a.title) || /pizza/i.test(a.title) || /pizza/i.test(a.slug)
  );
}

export async function getAdultTeamArticles(): Promise<Article[]> {
  const articles = await getAllArticles();
  return articles.filter((a) => /^nationale\s/i.test(a.title));
}

export async function getYouthCompetitionArticles(): Promise<Article[]> {
  const articles = await getAllArticles();
  return articles.filter(
    (a) =>
      /top jeunes/i.test(a.title) ||
      /championnat/i.test(a.title) ||
      /festival jeunes/i.test(a.title) ||
      /grand prix jeunes/i.test(a.title) ||
      /crit[ée]rium/i.test(a.title)
  );
}
