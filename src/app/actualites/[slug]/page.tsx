import type { Metadata } from "next";
import { ViewTransition } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { ArticleCard } from "@/components/ArticleCard";
import { Reveal } from "@/components/Reveal";
import { Gallery } from "@/components/Gallery";
import { getAllArticles, getArticleBySlug } from "@/lib/articles";

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
  const [article, allArticles] = await Promise.all([getArticleBySlug(slug), getAllArticles()]);

  if (!article) {
    notFound();
  }

  const related = allArticles.filter((a) => a.slug !== slug).slice(0, 3);

  const formattedDate = new Date(article.date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const paragraphs = article.body.split(/\r?\n\r?\n/);

  return (
    <article>
      <section className="relative h-[60vh] min-h-[420px] overflow-hidden text-paper">
        <ViewTransition name={`article-photo-${article.slug}`}>
          <Image
            src={article.images[0]}
            alt={article.title}
            fill
            priority
            sizes="100vw"
            className="hero-photo object-cover"
          />
        </ViewTransition>
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/75 to-forest-deep/35" />
        <Container className="relative flex h-full flex-col justify-end pb-16">
          <p className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-gold-soft/40 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-gold-soft">
            Actualité &middot; {formattedDate}
          </p>
          <h1 className="max-w-2xl font-display text-3xl font-medium leading-tight sm:text-5xl">
            {article.title}
          </h1>
        </Container>
      </section>

      <section className="py-16">
        <Container className="max-w-2xl">
          <Reveal>
            {paragraphs.map((paragraph, i) => (
              <p
                key={i}
                className={`mb-5 text-lg leading-relaxed text-ink-soft ${i === 0 ? "drop-cap" : ""}`}
              >
                {paragraph}
              </p>
            ))}

            {article.images.length > 1 && (
              <div className="mt-10">
                <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-wood">Photos</p>
                <Gallery images={article.images} alt={article.title} />
              </div>
            )}

            <div className="mt-10">
              <Button href="/actualites" variant="outline-dark">
                &larr; Toutes les actualités
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="border-t border-line/70 bg-paper-dim py-16">
          <Container>
            <Reveal>
              <p className="mb-8 text-sm font-medium uppercase tracking-[0.2em] text-wood">
                Autres actualités
              </p>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((a) => (
                  <ArticleCard key={a.slug} article={a} />
                ))}
              </div>
            </Reveal>
          </Container>
        </section>
      )}
    </article>
  );
}
