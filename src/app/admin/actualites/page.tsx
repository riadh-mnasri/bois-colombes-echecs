import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { verifySession } from "@/lib/dal";
import { getAllArticles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Administration · Actualités",
  robots: { index: false, follow: false },
};

export default async function AdminActualitesPage() {
  await verifySession();
  const articles = await getAllArticles();

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
          {articles.map((article) => (
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
      </Container>
    </section>
  );
}
