import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { ArticleCard } from "@/components/ArticleCard";
import { stats, recentResults, orientations, club, articles } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-forest-deep text-paper">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "repeating-conic-gradient(#faf6ee 0% 25%, transparent 0% 50%)",
            backgroundSize: "80px 80px",
          }}
          aria-hidden
        />
        <Container className="relative py-28 sm:py-36">
          <p className="mb-5 text-sm font-medium uppercase tracking-[0.25em] text-gold-soft">
            Club Formateur FFE &middot; Bois-Colombes (92)
          </p>
          <h1 className="max-w-3xl font-display text-4xl font-medium leading-[1.1] sm:text-6xl">
            Le jeu d&rsquo;échecs se joue et se transmet à Bois-Colombes depuis plus de 30 ans.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-paper/75">
            22 titres de Champion(ne) de France Jeunes, une école d&rsquo;échecs ouverte à tous les âges
            et une équipe d&rsquo;entraîneurs de haut niveau. Rejoignez le cercle.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/nous-rejoindre">Nous rejoindre</Button>
            <Button href="/le-club" variant="outline-light">
              Découvrir le club
            </Button>
          </div>
        </Container>
      </section>

      <section className="border-b border-line/70 bg-paper-dim">
        <Container className="grid grid-cols-2 gap-8 py-12 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-4xl font-medium text-wood">{stat.value}</p>
              <p className="mt-2 text-sm text-ink-soft">{stat.label}</p>
            </div>
          ))}
        </Container>
      </section>

      <section className="border-b border-line/70 py-24">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Actualités"
              title="Les derniers tournois du club"
              description="Résultats, participations et temps forts, en images."
            />
            <Button href="/actualites" variant="outline-dark">
              Toutes les actualités
            </Button>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {articles.slice(0, 3).map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <SectionHeading
            eyebrow="Le club"
            title="Une formation exigeante, un club à taille humaine"
            description="Cinq axes structurent l'action du cercle, de l'initiation scolaire à la haute compétition."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {orientations.map((item) => (
              <div key={item.title} className="rounded-2xl border border-line bg-paper p-6">
                <h3 className="font-display text-xl font-medium">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{item.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-forest py-24 text-paper">
        <Container>
          <SectionHeading
            light
            eyebrow="Palmarès récent"
            title="Des résultats qui parlent"
            description="Un aperçu des dernières saisons du club, jeunes et adultes confondus."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {recentResults.map((season) => (
              <div key={season.year} className="rounded-2xl border border-paper/15 p-6">
                <p className="font-display text-3xl font-medium text-gold-soft">{season.year}</p>
                <ul className="mt-4 space-y-2 text-sm text-paper/80">
                  {season.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Button href="/le-club" variant="outline-light">
              Voir le palmarès complet
            </Button>
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container className="grid gap-10 rounded-3xl bg-wood-deep px-8 py-14 text-paper sm:grid-cols-2 sm:px-14">
          <div>
            <h2 className="font-display text-3xl font-medium sm:text-4xl">
              Prêt·e à pousser la porte du club ?
            </h2>
            <p className="mt-4 text-paper/75">
              Cours pour tous les âges, essai gratuit, aides financières possibles. La saison{" "}
              {new Date().getFullYear()}/{new Date().getFullYear() + 1} est ouverte.
            </p>
            <div className="mt-8">
              <Button href="/nous-rejoindre">Voir les tarifs &amp; s&rsquo;inscrire</Button>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-3 border-t border-paper/15 pt-8 text-sm text-paper/80 sm:border-l sm:border-t-0 sm:pl-10 sm:pt-0">
            <p className="font-medium text-paper">{club.name}</p>
            <p>{club.address}</p>
            <p>{club.phone}</p>
            <p>{club.email}</p>
          </div>
        </Container>
      </section>
    </>
  );
}
