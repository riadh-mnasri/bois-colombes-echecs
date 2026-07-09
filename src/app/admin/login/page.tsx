import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Connexion administrateur — Cercle d'Échecs de Bois-Colombes",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <section className="py-24">
      <Container className="max-w-md">
        <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-wood">Administration</p>
        <h1 className="font-display text-3xl font-medium">Connexion</h1>
        <p className="mt-2 text-sm text-ink-soft">
          Réservé au bureau du club pour la gestion des actualités.
        </p>
        <div className="mt-8">
          <LoginForm />
        </div>
      </Container>
    </section>
  );
}
