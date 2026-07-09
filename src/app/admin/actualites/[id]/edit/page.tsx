import type { Metadata } from "next";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { verifySession } from "@/lib/dal";
import { getDb } from "@/db";
import { articles } from "@/db/schema";
import { EditArticleForm } from "./EditArticleForm";

export const metadata: Metadata = {
  title: "Modifier une actualité · Administration",
  robots: { index: false, follow: false },
};

export default async function EditArticlePage(props: PageProps<"/admin/actualites/[id]/edit">) {
  await verifySession();
  const { id } = await props.params;

  const db = getDb();
  const [article] = await db
    .select()
    .from(articles)
    .where(eq(articles.id, Number(id)))
    .limit(1);

  if (!article) {
    notFound();
  }

  return (
    <section className="py-12">
      <Container className="max-w-2xl">
        <h1 className="font-display text-2xl font-medium">Modifier l&rsquo;actualité</h1>
        <div className="mt-8">
          <EditArticleForm article={article} />
        </div>
      </Container>
    </section>
  );
}
