import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import {
  youthCategories,
  youthPricing,
  adultPricing,
  membershipIncludes,
} from "@/lib/content";
import teamPhoto from "../../../public/photos/top-jeunes-equipe.jpg";

export const metadata: Metadata = {
  title: "Nous rejoindre · Cercle d'Échecs de Bois-Colombes",
  description: "Tarifs et modalités d'adhésion, jeunes et adultes, au Cercle d'Échecs de Bois-Colombes.",
};

export default function NousRejoindrePage() {
  return (
    <>
      <section className="relative overflow-hidden text-paper">
        <Image
          src={teamPhoto}
          alt="Équipe Top Jeunes du Cercle d'Échecs de Bois-Colombes, vice-championne de France"
          fill
          priority
          sizes="100vw"
          className="hero-photo object-cover object-[center_68%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/85 to-forest-deep/55" />
        <Container className="relative py-20">
          <p className="hero-rise hero-rise-1 mb-4 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.25em] text-gold-soft"><span aria-hidden className="h-px w-8 bg-gold-soft" />Nous rejoindre</p>
          <h1 className="hero-rise hero-rise-2 max-w-2xl text-balance font-display text-4xl font-medium sm:text-5xl">
            Une place vous attend, quel que soit votre âge ou votre niveau.
          </h1>
          <p className="mt-6 max-w-xl text-paper/80">
            Essai gratuit, cours par niveaux, aides financières possibles. L&rsquo;adhésion donne accès à la
            licence FFE, aux cours collectifs et au club pendant les heures d&rsquo;ouverture.
          </p>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <Reveal>
          <SectionHeading eyebrow="Jeunes" title="Adhésion jeunes, saison en cours" />

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl border border-line p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-lg">
              <p className="text-sm font-medium uppercase tracking-wide text-wood">Tarif</p>
              <p className="mt-3 font-display text-3xl font-medium">{youthPricing.local}</p>
              <p className="text-sm text-ink-soft">Bois-Colombien(ne)s</p>
              <p className="mt-4 font-display text-2xl font-medium">{youthPricing.nonLocal}</p>
              <p className="text-sm text-ink-soft">Hors Bois-Colombes</p>
              <p className="mt-4 text-sm text-ink-soft">{youthPricing.note}</p>
            </div>

            <div className="rounded-2xl border border-line p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-lg lg:col-span-2">
              <p className="text-sm font-medium uppercase tracking-wide text-wood">Catégories d&rsquo;âge</p>
              <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm sm:grid-cols-3">
                {youthCategories.map((c) => (
                  <div key={c.category} className="flex justify-between border-b border-line py-1.5">
                    <span className="text-ink-soft">{c.category}</span>
                    <span className="font-medium">{c.born}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-line bg-paper-dim p-6">
            <p className="text-sm font-medium uppercase tracking-wide text-wood">Horaires des cours</p>
            <ul className="mt-4 grid gap-x-10 text-sm sm:grid-cols-2">
              {youthPricing.schedule.map((row) => (
                <li
                  key={`${row.what}-${row.when}`}
                  className="flex flex-wrap items-baseline justify-between gap-x-4 border-b border-line/70 py-2"
                >
                  <span className="text-ink">{row.what}</span>
                  <span className="text-ink-soft">
                    <span className="font-medium text-wood">{row.when}</span>
                    {row.time && <> &middot; {row.time}</>}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <Button href={youthPricing.registrationUrl} external>
              S&rsquo;inscrire à l&rsquo;adhésion jeunes 2026/2027
            </Button>
          </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-paper-dim py-20">
        <Container>
          <Reveal>
          <SectionHeading eyebrow="Adultes" title="Adhésion adultes, saison en cours" />

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl border border-line bg-paper p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-lg">
              <p className="text-sm font-medium uppercase tracking-wide text-wood">Séniors</p>
              <p className="mt-1 text-xs text-ink-soft">{adultPricing.senior.note}</p>
              <p className="mt-3 font-display text-3xl font-medium">{adultPricing.senior.local}</p>
              <p className="text-sm text-ink-soft">Bois-Colombien(ne)s</p>
              <p className="mt-4 font-display text-2xl font-medium">{adultPricing.senior.nonLocal}</p>
              <p className="text-sm text-ink-soft">Hors Bois-Colombes</p>
            </div>

            <div className="rounded-2xl border border-line bg-paper p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-lg">
              <p className="text-sm font-medium uppercase tracking-wide text-wood">Vétérans</p>
              <p className="mt-1 text-xs text-ink-soft">{adultPricing.veteran.note}</p>
              <p className="mt-3 font-display text-3xl font-medium">{adultPricing.veteran.local}</p>
              <p className="text-sm text-ink-soft">Bois-Colombien(ne)s</p>
              <p className="mt-4 font-display text-2xl font-medium">{adultPricing.veteran.nonLocal}</p>
              <p className="text-sm text-ink-soft">Hors Bois-Colombes</p>
            </div>

            <div className="rounded-2xl border border-line bg-paper p-6">
              <p className="text-sm font-medium uppercase tracking-wide text-wood">Horaires des cours</p>
              <ul className="mt-4 text-sm">
                {adultPricing.schedule.map((row) => (
                  <li
                    key={`${row.what}-${row.when}`}
                    className="border-b border-line/70 py-2 last:border-0"
                  >
                    <span className="font-medium text-wood">{row.when}</span>
                    {row.time && <span className="text-ink-soft"> &middot; {row.time}</span>}
                    <span className="block text-ink-soft">{row.what}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-6 text-sm text-ink-soft">{adultPricing.note}</p>

          <div className="mt-6">
            <Button href={adultPricing.registrationUrl} external>
              S&rsquo;inscrire à l&rsquo;adhésion adultes 2026/2027
            </Button>
          </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-20">
        <Container>
        <Reveal className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Ce qui est inclus" title="Une adhésion complète" />
            <ul className="mt-8 space-y-3 text-sm text-ink-soft">
              {membershipIncludes.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-forest p-8 text-paper">
            <h3 className="font-display text-2xl font-medium">Prêt·e à vous inscrire ?</h3>
            <p className="mt-3 text-paper/75">
              L&rsquo;inscription se fait en ligne via BilletWeb (liens ci-dessus). Pour organiser un essai
              gratuit ou toute autre question, contactez le club.
            </p>
            <div className="mt-6">
              <Button href="/contact" variant="outline-light">
                Nous contacter
              </Button>
            </div>
          </div>
        </Reveal>
        </Container>
      </section>
    </>
  );
}
