import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import {
  youthCategories,
  youthPricing,
  adultPricing,
  membershipIncludes,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Nous rejoindre — Cercle d'Échecs de Bois-Colombes",
  description: "Tarifs et modalités d'adhésion, jeunes et adultes, au Cercle d'Échecs de Bois-Colombes.",
};

export default function NousRejoindrePage() {
  return (
    <>
      <section className="bg-forest-deep py-20 text-paper">
        <Container>
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-gold-soft">Nous rejoindre</p>
          <h1 className="max-w-2xl font-display text-4xl font-medium sm:text-5xl">
            Une place vous attend, quel que soit votre âge ou votre niveau.
          </h1>
          <p className="mt-6 max-w-xl text-paper/75">
            Essai gratuit, cours par niveaux, aides financières possibles. L&rsquo;adhésion donne accès à la
            licence FFE, aux cours collectifs et au club pendant les heures d&rsquo;ouverture.
          </p>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="Jeunes" title="Adhésion jeunes — saison en cours" />

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl border border-line p-6">
              <p className="text-sm font-medium uppercase tracking-wide text-wood">Tarif</p>
              <p className="mt-3 font-display text-3xl font-medium">{youthPricing.local}</p>
              <p className="text-sm text-ink-soft">Bois-Colombien(ne)s</p>
              <p className="mt-4 font-display text-2xl font-medium">{youthPricing.nonLocal}</p>
              <p className="text-sm text-ink-soft">Hors Bois-Colombes</p>
              <p className="mt-4 text-sm text-ink-soft">{youthPricing.note}</p>
            </div>

            <div className="rounded-2xl border border-line p-6 lg:col-span-2">
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
            <ul className="mt-4 grid gap-2 text-sm text-ink-soft sm:grid-cols-2">
              {youthPricing.schedule.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <Button href={youthPricing.registrationUrl} external>
              S&rsquo;inscrire — Adhésion jeunes 2026/2027
            </Button>
          </div>
        </Container>
      </section>

      <section className="bg-paper-dim py-20">
        <Container>
          <SectionHeading eyebrow="Adultes" title="Adhésion adultes — saison en cours" />

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl border border-line bg-paper p-6">
              <p className="text-sm font-medium uppercase tracking-wide text-wood">Séniors</p>
              <p className="mt-1 text-xs text-ink-soft">{adultPricing.senior.note}</p>
              <p className="mt-3 font-display text-3xl font-medium">{adultPricing.senior.local}</p>
              <p className="text-sm text-ink-soft">Bois-Colombien(ne)s</p>
              <p className="mt-4 font-display text-2xl font-medium">{adultPricing.senior.nonLocal}</p>
              <p className="text-sm text-ink-soft">Hors Bois-Colombes</p>
            </div>

            <div className="rounded-2xl border border-line bg-paper p-6">
              <p className="text-sm font-medium uppercase tracking-wide text-wood">Vétérans</p>
              <p className="mt-1 text-xs text-ink-soft">{adultPricing.veteran.note}</p>
              <p className="mt-3 font-display text-3xl font-medium">{adultPricing.veteran.local}</p>
              <p className="text-sm text-ink-soft">Bois-Colombien(ne)s</p>
              <p className="mt-4 font-display text-2xl font-medium">{adultPricing.veteran.nonLocal}</p>
              <p className="text-sm text-ink-soft">Hors Bois-Colombes</p>
            </div>

            <div className="rounded-2xl border border-line bg-paper p-6">
              <p className="text-sm font-medium uppercase tracking-wide text-wood">Horaires des cours</p>
              <ul className="mt-4 space-y-2 text-sm text-ink-soft">
                {adultPricing.schedule.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-6 text-sm text-ink-soft">{adultPricing.note}</p>

          <div className="mt-6">
            <Button href={adultPricing.registrationUrl} external>
              S&rsquo;inscrire — Adhésion adultes 2026/2027
            </Button>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container className="grid gap-10 lg:grid-cols-2">
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
        </Container>
      </section>
    </>
  );
}
