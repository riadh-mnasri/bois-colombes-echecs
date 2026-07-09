import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { ArticleCard } from "@/components/ArticleCard";
import { getAdultTeamArticles, getYouthCompetitionArticles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Compétitions · Cercle d'Échecs de Bois-Colombes",
  description:
    "Les équipes et joueurs du Cercle d'Échecs de Bois-Colombes en compétition : championnats jeunes, interclubs adultes (Nationale 1 à 5).",
};

export default async function CompetitionsPage() {
  const [youthArticles, adultArticles] = await Promise.all([
    getYouthCompetitionArticles(),
    getAdultTeamArticles(),
  ]);

  return (
    <>
      <section className="bg-forest-deep py-20 text-paper">
        <Container>
          <p className="hero-rise hero-rise-1 mb-4 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.25em] text-gold-soft"><span aria-hidden className="h-px w-8 bg-gold-soft" />
            Compétitions
          </p>
          <h1 className="hero-rise hero-rise-2 max-w-2xl text-balance font-display text-4xl font-medium sm:text-5xl">
            Plus de 20 équipes engagées, du secteur jeunes à la Nationale 1.
          </h1>
          <p className="mt-6 max-w-xl text-paper/80">
            Le club participe chaque saison aux championnats jeunes (Top Jeunes, Festival Jeunes IdF,
            championnats de France) et aux interclubs adultes, de la Nationale 1 à la Nationale 5.
          </p>
        </Container>
      </section>

      {youthArticles.length > 0 && (
        <section className="py-20">
          <Container>
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-6">
                <SectionHeading
                  eyebrow="Secteur Jeunes"
                  title="Championnats et festivals jeunes"
                  description="Top Jeunes, Festival Jeunes IdF, championnats de France, d'Île-de-France et des Hauts-de-Seine."
                />
                <Button href="/actualites" variant="outline-dark">
                  Toutes les actualités
                </Button>
              </div>
              <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {youthArticles.slice(0, 6).map((article) => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
              </div>
            </Reveal>
          </Container>
        </section>
      )}

      {adultArticles.length > 0 && (
        <section className="bg-paper-dim py-20">
          <Container>
            <Reveal>
              <SectionHeading
                eyebrow="Secteur Adultes"
                title="Interclubs, de la Nationale 1 à la Nationale 5"
                description="Le club engage plusieurs équipes adultes chaque saison dans les championnats par équipes régionaux et nationaux."
              />
              <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {adultArticles.slice(0, 6).map((article) => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
              </div>
            </Reveal>
          </Container>
        </section>
      )}
    </>
  );
}
