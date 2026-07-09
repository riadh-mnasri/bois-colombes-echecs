import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { ContactForm } from "@/components/ContactForm";
import { club } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact · Cercle d'Échecs de Bois-Colombes",
  description: "Adresse, téléphone, email et formulaire de contact du Cercle d'Échecs de Bois-Colombes.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-forest-deep py-20 text-paper">
        <Container>
          <p className="hero-rise hero-rise-1 mb-4 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.25em] text-gold-soft"><span aria-hidden className="h-px w-8 bg-gold-soft" />Contact</p>
          <h1 className="hero-rise hero-rise-2 max-w-2xl text-balance font-display text-4xl font-medium sm:text-5xl">
            Une question ? Le club vous répond.
          </h1>
        </Container>
      </section>

      <section className="py-20">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Coordonnées" title="Nous trouver" />
            <ul className="mt-8 space-y-4 text-sm">
              <li>
                <p className="font-medium text-wood">Adresse</p>
                <p className="mt-1 text-ink-soft">{club.address}</p>
              </li>
              <li>
                <p className="font-medium text-wood">Téléphone</p>
                <p className="mt-1 text-ink-soft">{club.phone}</p>
              </li>
              <li>
                <p className="font-medium text-wood">Email</p>
                <p className="mt-1 text-ink-soft">{club.email}</p>
              </li>
            </ul>

            <div className="mt-8 overflow-hidden rounded-2xl border border-line">
              <iframe
                title="Localisation du club"
                src={`https://www.google.com/maps?q=${encodeURIComponent(club.address)}&output=embed`}
                className="h-72 w-full"
                loading="lazy"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-line p-8">
            <SectionHeading eyebrow="Formulaire" title="Envoyer un message" />
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
