import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { ArticleCard } from "@/components/ArticleCard";
import { getAllArticles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Actualités · Cercle d'Échecs de Bois-Colombes",
  description: "Tournois, championnats et résultats récents du Cercle d'Échecs de Bois-Colombes.",
};

const PAGE_SIZE = 12;

export default async function ActualitesPage(props: PageProps<"/actualites">) {
  const searchParams = await props.searchParams;
  const currentPage = Math.max(1, parseInt(String(searchParams.page ?? "1"), 10) || 1);

  const allArticles = await getAllArticles();
  const totalPages = Math.max(1, Math.ceil(allArticles.length / PAGE_SIZE));
  const page = Math.min(currentPage, totalPages);
  const articles = allArticles.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      <section className="bg-forest-deep py-20 text-paper">
        <Container>
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-gold-soft">Actualités</p>
          <h1 className="max-w-2xl font-display text-4xl font-medium sm:text-5xl">
            La vie du club, tournoi après tournoi.
          </h1>
          <p className="mt-4 text-paper/70">{allArticles.length} actualités publiées.</p>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-14 flex items-center justify-center gap-3">
              <Link
                href={page > 1 ? `/actualites?page=${page - 1}` : "#"}
                aria-disabled={page <= 1}
                className={`rounded-full border border-line px-5 py-2.5 text-sm font-medium transition-colors ${
                  page <= 1
                    ? "pointer-events-none opacity-40"
                    : "text-ink hover:border-gold/50 hover:bg-paper-dim"
                }`}
              >
                &larr; Précédent
              </Link>
              <span className="text-sm text-ink-soft">
                Page {page} / {totalPages}
              </span>
              <Link
                href={page < totalPages ? `/actualites?page=${page + 1}` : "#"}
                aria-disabled={page >= totalPages}
                className={`rounded-full border border-line px-5 py-2.5 text-sm font-medium transition-colors ${
                  page >= totalPages
                    ? "pointer-events-none opacity-40"
                    : "text-ink hover:border-gold/50 hover:bg-paper-dim"
                }`}
              >
                Suivant &rarr;
              </Link>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
