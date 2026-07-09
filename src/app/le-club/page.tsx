import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { orientations, recentResults, historicalPalmares, trainers, board } from "@/lib/content";
import podiumPhoto from "../../../public/photos/championnat-de-france.jpg";

export const metadata: Metadata = {
  title: "Le Club — Cercle d'Échecs de Bois-Colombes",
  description: "Histoire, valeurs, palmarès et équipe encadrante du Cercle d'Échecs de Bois-Colombes.",
};

export default function LeClubPage() {
  return (
    <>
      <section className="relative overflow-hidden text-paper">
        <Image
          src={podiumPhoto}
          alt="Podium du Championnat de France, avec Émile Bassini vainqueur de l'Open Accession"
          fill
          priority
          sizes="100vw"
          className="hero-photo object-cover object-[center_60%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/80 to-forest-deep/50" />
        <Container className="relative py-20">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-gold-soft">Le Club</p>
          <h1 className="max-w-2xl font-display text-4xl font-medium sm:text-5xl">
            Développer la pratique du jeu d&rsquo;échecs, en éduquant, formant, responsabilisant.
          </h1>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Nos orientations" title="Cinq axes de développement" />
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {orientations.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-line p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-lg"
                >
                  <h3 className="font-display text-xl font-medium">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{item.description}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-paper-dim py-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Palmarès"
              title="22 titres de Champion(ne) de France Jeunes, 41 podiums"
              description="Plus de 30 ans de formation et de résultats au plus haut niveau national et international."
            />
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {recentResults.map((season) => (
                <div
                  key={season.year}
                  className="rounded-2xl border border-line bg-paper p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-lg"
                >
                  <p className="font-display text-3xl font-medium text-wood">{season.year}</p>
                  <ul className="mt-4 space-y-2 text-sm text-ink-soft">
                    {season.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-10 rounded-2xl border border-line bg-paper p-6">
              <h3 className="font-display text-xl font-medium">Palmarès historique</h3>
              <ul className="mt-4 grid gap-2 text-sm text-ink-soft sm:grid-cols-2">
                {historicalPalmares.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Équipe encadrante" title="Des entraîneurs de haut niveau" />
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {trainers.map((trainer) => (
                <div
                  key={trainer.name}
                  className="rounded-2xl border border-line p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-lg"
                >
                  <h3 className="font-display text-lg font-medium">{trainer.name}</h3>
                  <p className="mt-1 text-sm font-medium text-wood">{trainer.role}</p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{trainer.bio}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-forest py-20 text-paper">
        <Container>
          <Reveal>
            <SectionHeading light eyebrow="Bureau directeur" title="L'équipe qui fait vivre le club" />
            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {board.map((member) => (
                <li key={member.role} className="flex justify-between border-b border-paper/15 pb-3">
                  <span className="text-paper/70">{member.role}</span>
                  <span className="font-medium">{member.name}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
