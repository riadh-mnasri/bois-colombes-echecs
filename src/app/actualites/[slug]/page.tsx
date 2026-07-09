import type { Metadata } from "next";
import { ViewTransition } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { ArticleCard } from "@/components/ArticleCard";
import { Reveal } from "@/components/Reveal";
import { ArticleBody } from "@/components/ArticleBody";
import { getAllArticles, getArticleBySlug } from "@/lib/articles";

export async function generateMetadata(props: PageProps<"/actualites/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const article = await getArticleBySlug(slug);

  if (!article) return {};

  return {
    title: `${article.title} · Cercle d'Échecs de Bois-Colombes`,
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
      <section className="bg-paper-dim py-16">
        <Container className="max-w-2xl">
          <p className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-wood/30 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-wood">
            Actualité &middot; {formattedDate}
          </p>
          <h1 className="font-display text-3xl font-medium leading-tight text-ink sm:text-5xl">
            {article.title}
          </h1>
        </Container>
      </section>

      <section className="pt-10">
        <Container className="max-w-2xl">
          <ViewTransition name={`article-photo-${article.slug}`}>
            <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl border border-line">
              <Image
                src={article.images[0]}
                alt={article.title}
                fill
                priority
                sizes="(min-width: 768px) 700px, 100vw"
                className="object-cover"
              />
            </div>
          </ViewTransition>
        </Container>
      </section>

      <section className="py-16">
        <Container className="max-w-2xl">
          <Reveal>
            <ArticleBody paragraphs={paragraphs} photos={article.images.slice(1)} alt={article.title} />

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
