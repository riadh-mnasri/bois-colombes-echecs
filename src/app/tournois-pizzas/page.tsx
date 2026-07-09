import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { tournoisPizzas, club } from "@/lib/content";

export const metadata: Metadata = {
  title: "Tournois Pizzas · Cercle d'Échecs de Bois-Colombes",
  description: "Les tournois pizzas du Cercle d'Échecs de Bois-Colombes : format, dates et inscription.",
};

export default function TournoisPizzasPage() {
  return (
    <>
      <section className="bg-forest-deep py-20 text-paper">
        <Container>
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-gold-soft">
            Tournois Pizzas
          </p>
          <h1 className="max-w-2xl font-display text-4xl font-medium sm:text-5xl">
            Des vendredis soir conviviaux, entre passionnés de tous niveaux.
          </h1>
        </Container>
      </section>

      <section className="py-20">
        <Container className="max-w-2xl">
          <Reveal>
            <SectionHeading eyebrow="Le format" title="Rapide, convivial, sans prise de tête" />
            <p className="mt-6 text-lg leading-relaxed text-ink-soft">{tournoisPizzas.description}</p>
          </Reveal>
        </Container>
      </section>

      <section className="bg-paper-dim py-20">
        <Container className="max-w-2xl">
          <Reveal>
            <SectionHeading eyebrow="Saison 2025/2026" title="Dates des prochains tournois" />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {tournoisPizzas.dates2025_2026.map((date) => (
                <li
                  key={date}
                  className="rounded-xl border border-line bg-paper px-5 py-4 text-sm font-medium text-ink"
                >
                  {date}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-ink-soft">{tournoisPizzas.note}</p>
            <p className="mt-1 text-sm text-ink-soft">{club.address}</p>

            <div className="mt-8">
              <Button href="/contact">S&rsquo;inscrire à un tournoi</Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
