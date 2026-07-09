import { ViewTransition } from "react";
import Image from "next/image";
import Link from "next/link";

type Article = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  images: string[];
};

export function ArticleCard({ article }: { article: Article }) {
  const formattedDate = new Date(article.date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Link
      href={`/actualites/${article.slug}`}
      className="group block overflow-hidden rounded-2xl border border-line bg-paper shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-lg"
    >
      <article>
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <ViewTransition name={`article-photo-${article.slug}`}>
            <Image
              src={article.images[0]}
              alt={article.title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </ViewTransition>
        </div>
        <div className="p-6">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-wood">{formattedDate}</p>
          <h3 className="mt-2 font-display text-lg font-medium leading-snug transition-colors duration-300 group-hover:text-wood">
            {article.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">{article.excerpt}</p>
          <p className="mt-4 inline-flex -translate-x-1 items-center gap-2 text-sm font-medium text-wood opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
            Lire l&rsquo;article <span aria-hidden>&rarr;</span>
          </p>
        </div>
      </article>
    </Link>
  );
}
