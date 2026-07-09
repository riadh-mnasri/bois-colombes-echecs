"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import { updateArticle, type UpdateArticleState } from "@/app/actions/articles";

type Article = {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  body: string;
  images: string[];
};

export function EditArticleForm({ article }: { article: Article }) {
  const [state, action, pending] = useActionState<UpdateArticleState, FormData>(
    updateArticle,
    undefined
  );
  const [keptImages, setKeptImages] = useState<string[]>(article.images);
  const [newPreviews, setNewPreviews] = useState<string[]>([]);

  function removeImage(url: string) {
    setKeptImages((old) => old.filter((u) => u !== url));
  }

  function handlePhotosChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    newPreviews.forEach((url) => URL.revokeObjectURL(url));
    setNewPreviews(files.map((file) => URL.createObjectURL(file)));
  }

  return (
    <form action={action} className="grid gap-5">
      <input type="hidden" name="id" value={article.id} />

      <div className="grid gap-1.5">
        <label htmlFor="title" className="text-sm font-medium">
          Titre
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          defaultValue={article.title}
          className="rounded-xl border border-line bg-paper px-4 py-3 text-sm outline-none focus:border-wood"
        />
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="date" className="text-sm font-medium">
          Date
        </label>
        <input
          id="date"
          name="date"
          type="date"
          required
          defaultValue={article.date}
          className="rounded-xl border border-line bg-paper px-4 py-3 text-sm outline-none focus:border-wood"
        />
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="excerpt" className="text-sm font-medium">
          Résumé court (affiché sur les listes)
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          required
          rows={2}
          defaultValue={article.excerpt}
          className="rounded-xl border border-line bg-paper px-4 py-3 text-sm outline-none focus:border-wood"
        />
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="body" className="text-sm font-medium">
          Texte complet (un paragraphe par ligne vide)
        </label>
        <textarea
          id="body"
          name="body"
          required
          rows={8}
          defaultValue={article.body}
          className="rounded-xl border border-line bg-paper px-4 py-3 text-sm outline-none focus:border-wood"
        />
      </div>

      <div className="grid gap-1.5">
        <label className="text-sm font-medium">Photos actuelles</label>
        {keptImages.length === 0 && (
          <p className="text-sm text-ink-soft">Aucune photo conservée, ajoutez-en au moins une.</p>
        )}
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
          {keptImages.map((url) => (
            <div key={url} className="relative aspect-square">
              <input type="hidden" name="keptImages" value={url} />
              <Image src={url} alt="" fill sizes="120px" className="rounded-lg object-cover" />
              <button
                type="button"
                onClick={() => removeImage(url)}
                aria-label="Retirer cette photo"
                className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-ink text-xs text-paper"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="photos" className="text-sm font-medium">
          Ajouter des photos
        </label>
        <input
          id="photos"
          name="photos"
          type="file"
          accept="image/*"
          multiple
          onChange={handlePhotosChange}
          className="rounded-xl border border-line bg-paper px-4 py-3 text-sm outline-none focus:border-wood"
        />
        {newPreviews.length > 0 && (
          <div className="mt-2 grid grid-cols-4 gap-2 sm:grid-cols-6">
            {newPreviews.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={src}
                src={src}
                alt={`Aperçu ${i + 1}`}
                className="aspect-square w-full rounded-lg object-cover"
              />
            ))}
          </div>
        )}
      </div>

      {state?.error && <p className="text-sm text-red-700">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center rounded-full bg-forest px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-forest-deep disabled:opacity-60"
      >
        {pending ? "Enregistrement…" : "Enregistrer les modifications"}
      </button>
    </form>
  );
}
