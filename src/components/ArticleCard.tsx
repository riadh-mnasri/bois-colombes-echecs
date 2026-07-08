import Image from "next/image";

type Article = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
};

export function ArticleCard({ article }: { article: Article }) {
  const formattedDate = new Date(article.date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <article className="overflow-hidden rounded-2xl border border-line bg-paper">
      <div className="relative aspect-[16/10] w-full">
        <Image
          src={article.image}
          alt={article.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-wood">{formattedDate}</p>
        <h3 className="mt-2 font-display text-lg font-medium leading-snug">{article.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">{article.excerpt}</p>
      </div>
    </article>
  );
}
