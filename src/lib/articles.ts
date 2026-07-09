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
    })),
  ];

  return merged.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  const articles = await getAllArticles();
  return articles.find((a) => a.slug === slug);
}
