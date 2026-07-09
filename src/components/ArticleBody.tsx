"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export function ArticleBody({
  paragraphs,
  photos,
  alt,
}: {
  paragraphs: string[];
  photos: string[];
  alt: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (openIndex === null) return;

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight") setOpenIndex((i) => (i === null ? i : (i + 1) % photos.length));
      if (e.key === "ArrowLeft")
        setOpenIndex((i) => (i === null ? i : (i - 1 + photos.length) % photos.length));
    }

    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [openIndex, photos.length]);

  return (
    <>
      {paragraphs.map((paragraph, i) => (
        <p
          key={`p-${i}`}
          className={`mb-6 text-lg leading-relaxed text-ink-soft ${i === 0 ? "drop-cap" : ""}`}
        >
          {paragraph}
        </p>
      ))}

      {photos.length > 0 && (
        <div className="mt-10">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-wood">
            Photos ({photos.length})
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {photos.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setOpenIndex(i)}
                className="group relative aspect-square overflow-hidden rounded-xl border border-line"
              >
                <Image
                  src={src}
                  alt={`${alt}, photo ${i + 2}`}
                  fill
                  sizes="(min-width: 640px) 33vw, 50vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {openIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/90 p-4"
          onClick={() => setOpenIndex(null)}
        >
          <button
            type="button"
            aria-label="Fermer"
            onClick={() => setOpenIndex(null)}
            className="absolute right-5 top-5 text-3xl text-paper/80 hover:text-paper"
          >
            &times;
          </button>

          {photos.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Photo précédente"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenIndex((i) => (i === null ? i : (i - 1 + photos.length) % photos.length));
                }}
                className="absolute left-4 text-4xl text-paper/70 hover:text-paper sm:left-8"
              >
                &larr;
              </button>
              <button
                type="button"
                aria-label="Photo suivante"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenIndex((i) => (i === null ? i : (i + 1) % photos.length));
                }}
                className="absolute right-4 text-4xl text-paper/70 hover:text-paper sm:right-8"
              >
                &rarr;
              </button>
            </>
          )}

          <div className="relative h-[80vh] w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <Image
              src={photos[openIndex]}
              alt={`${alt}, photo ${openIndex + 2}`}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
