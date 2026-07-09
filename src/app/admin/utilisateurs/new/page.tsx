import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { verifySession } from "@/lib/dal";
import { NewUserForm } from "./NewUserForm";

export const metadata: Metadata = {
  title: "Ajouter un utilisateur · Administration",
  robots: { index: false, follow: false },
};

export default async function NewUserPage() {
  await verifySession();

  return (
    <section className="py-12">
      <Container className="max-w-md">
        <h1 className="font-display text-2xl font-medium">Ajouter un utilisateur</h1>
        <p className="mt-2 text-sm text-ink-soft">
          Donnez accès à l&rsquo;administration à un autre membre du bureau.
        </p>
        <div className="mt-8">
          <NewUserForm />
        </div>
      </Container>
    </section>
  );
}
