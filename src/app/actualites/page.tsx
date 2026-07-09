import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { ArticleCard } from "@/components/ArticleCard";
import { getAllArticles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Actualités · Cercle d'Échecs de Bois-Colombes",
  description: "Tournois, championnats et résultats récents du Cercle d'Échecs de Bois-Colombes.",
};

export default async function ActualitesPage() {
  const articles = await getAllArticles();

  return (
    <>
      <section className="bg-forest-deep py-20 text-paper">
        <Container>
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-gold-soft">Actualités</p>
          <h1 className="max-w-2xl font-display text-4xl font-medium sm:text-5xl">
            La vie du club, tournoi après tournoi.
          </h1>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
