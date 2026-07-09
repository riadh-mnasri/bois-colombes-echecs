import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { verifySession } from "@/lib/dal";
import { getDb } from "@/db";
import { articles as articlesTable } from "@/db/schema";
import { articles as staticArticles } from "@/lib/content";
import { DeleteArticleButton } from "./DeleteArticleButton";

export const metadata: Metadata = {
  title: "Administration · Actualités",
  robots: { index: false, follow: false },
};

export default async function AdminActualitesPage() {
  await verifySession();

  const db = getDb();
  const dbArticles = await db
    .select({
      id: articlesTable.id,
      slug: articlesTable.slug,
      title: articlesTable.title,
      date: articlesTable.date,
    })
    .from(articlesTable);

  const editable = [...dbArticles].sort((a, b) => (a.date < b.date ? 1 : -1));
  const readOnly = [...staticArticles].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <section className="py-12">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="font-display text-2xl font-medium">Actualités</h1>
          <Link
            href="/admin/actualites/new"
            className="inline-flex items-center justify-center rounded-full bg-forest px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-forest-deep"
          >
            Nouvelle actualité
          </Link>
        </div>

        <div className="mt-8 divide-y divide-line rounded-2xl border border-line bg-paper">
          {editable.map((article) => (
            <div key={article.slug} className="flex items-center justify-between gap-4 p-4">
              <div>
                <p className="font-medium">{article.title}</p>
                <p className="text-sm text-ink-soft">{article.date}</p>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <Link href={`/actualites/${article.slug}`} className="text-wood hover:underline">
                  Voir
                </Link>
                <Link href={`/admin/actualites/${article.id}/edit`} className="text-wood hover:underline">
                  Modifier
                </Link>
                <DeleteArticleButton id={article.id} title={article.title} />
              </div>
            </div>
          ))}
        </div>

        {readOnly.length > 0 && (
          <div className="mt-10">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-wood">
              Actualités historiques (non modifiables)
            </p>
            <div className="divide-y divide-line rounded-2xl border border-line bg-paper-dim">
              {readOnly.map((article) => (
                <div key={article.slug} className="flex items-center justify-between gap-4 p-4">
                  <div>
                    <p className="font-medium">{article.title}</p>
                    <p className="text-sm text-ink-soft">{article.date}</p>
                  </div>
                  <Link href={`/actualites/${article.slug}`} className="text-sm text-wood hover:underline">
                    Voir
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
