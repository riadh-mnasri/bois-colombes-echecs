import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { youthPricing, adultPricing, tournoisPizzas, club } from "@/lib/content";

export const metadata: Metadata = {
  title: "Agenda · Cercle d'Échecs de Bois-Colombes",
  description:
    "Horaires des cours, prochains tournois pizzas et calendrier des compétitions du Cercle d'Échecs de Bois-Colombes.",
};

export default function AgendaPage() {
  return (
    <>
      <section className="bg-forest-deep py-20 text-paper">
        <Container>
          <p className="hero-rise hero-rise-1 mb-4 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.25em] text-gold-soft"><span aria-hidden className="h-px w-8 bg-gold-soft" />Agenda</p>
          <h1 className="hero-rise hero-rise-2 max-w-2xl text-balance font-display text-4xl font-medium sm:text-5xl">
            Toute la semaine au club, et les prochains rendez-vous.
          </h1>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Chaque semaine" title="Horaires des cours" />
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-line p-6">
                <p className="text-sm font-medium uppercase tracking-wide text-wood">Jeunes</p>
                <ul className="mt-4 space-y-2 text-sm text-ink-soft">
                  {youthPricing.schedule.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-line p-6">
                <p className="text-sm font-medium uppercase tracking-wide text-wood">Adultes</p>
                <ul className="mt-4 space-y-2 text-sm text-ink-soft">
                  {adultPricing.schedule.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-paper-dim py-20">
        <Container>
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading
                eyebrow="Vendredis soir"
                title="Prochains tournois pizzas"
                description="Format rapide et convivial, ouvert à tous les niveaux."
              />
              <Button href="/tournois-pizzas" variant="outline-dark">
                En savoir plus
              </Button>
            </div>
            <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {tournoisPizzas.dates2025_2026.map((date) => (
                <li
                  key={date}
                  className="rounded-xl border border-line bg-paper px-5 py-4 text-sm font-medium text-ink"
                >
                  {date}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      <section className="py-20">
        <Container className="max-w-2xl">
          <Reveal>
            <SectionHeading
              eyebrow="Compétitions"
              title="Championnats et interclubs"
              description="Les dates de championnats et d'interclubs sont fixées par la Fédération Française des Échecs et les ligues régionales. Retrouvez les convocations et résultats de chaque équipe au fil de la saison dans nos actualités."
            />
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/competitions">Voir les compétitions du club</Button>
              <Button href="/actualites" variant="outline-dark">
                Toutes les actualités
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-forest py-16 text-paper">
        <Container>
          <Reveal>
            <p className="font-display text-xl font-medium">Une question sur une date ?</p>
            <p className="mt-2 text-paper/75">
              {club.address} &middot; {club.phone} &middot; {club.email}
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
