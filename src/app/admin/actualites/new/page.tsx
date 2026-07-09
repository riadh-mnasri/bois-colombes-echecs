import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { verifySession } from "@/lib/dal";
import { NewArticleForm } from "./NewArticleForm";

export const metadata: Metadata = {
  title: "Nouvelle actualité — Administration",
  robots: { index: false, follow: false },
};

export default async function NewArticlePage() {
  await verifySession();

  return (
    <section className="py-12">
      <Container className="max-w-2xl">
        <h1 className="font-display text-2xl font-medium">Nouvelle actualité</h1>
        <div className="mt-8">
          <NewArticleForm />
        </div>
      </Container>
    </section>
  );
}
