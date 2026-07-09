import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { getArticleBySlug } from "@/lib/articles";

export async function generateMetadata(props: PageProps<"/actualites/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const article = await getArticleBySlug(slug);

  if (!article) return {};

  return {
    title: `${article.title} — Cercle d'Échecs de Bois-Colombes`,
    description: article.excerpt,
  };
}

export default async function ArticlePage(props: PageProps<"/actualites/[slug]">) {
  const { slug } = await props.params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const formattedDate = new Date(article.date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <article>
      <section className="relative overflow-hidden text-paper">
        <Image
          src={article.image}
          alt={article.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/80 to-forest-deep/50" />
        <Container className="relative py-20">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-gold-soft">
            {formattedDate}
          </p>
          <h1 className="max-w-2xl font-display text-3xl font-medium sm:text-5xl">{article.title}</h1>
        </Container>
      </section>

      <section className="py-16">
        <Container className="max-w-2xl">
          {article.body.split(/\r?\n\r?\n/).map((paragraph, i) => (
            <p key={i} className="mb-5 text-base leading-relaxed text-ink-soft">
              {paragraph}
            </p>
          ))}

          <div className="mt-10">
            <Button href="/actualites" variant="outline-dark">
              &larr; Toutes les actualités
            </Button>
          </div>
        </Container>
      </section>
    </article>
  );
}
