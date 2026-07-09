"use client";

import { useActionState, useState } from "react";
import { createArticle, type CreateArticleState } from "@/app/actions/articles";

export function NewArticleForm() {
  const [state, action, pending] = useActionState<CreateArticleState, FormData>(
    createArticle,
    undefined
  );
  const [previews, setPreviews] = useState<string[]>([]);

  function handlePhotosChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    setPreviews((old) => {
      old.forEach((url) => URL.revokeObjectURL(url));
      return files.map((file) => URL.createObjectURL(file));
    });
  }

  return (
    <form action={action} className="grid gap-5">
      <div className="grid gap-1.5">
        <label htmlFor="title" className="text-sm font-medium">
          Titre
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
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
          className="rounded-xl border border-line bg-paper px-4 py-3 text-sm outline-none focus:border-wood"
        />
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="photos" className="text-sm font-medium">
          Photos (une ou plusieurs, la première sera la photo principale)
        </label>
        <input
          id="photos"
          name="photos"
          type="file"
          accept="image/*"
          multiple
          required
          onChange={handlePhotosChange}
          className="rounded-xl border border-line bg-paper px-4 py-3 text-sm outline-none focus:border-wood"
        />
        {previews.length > 0 && (
          <div className="mt-2 grid grid-cols-4 gap-2 sm:grid-cols-6">
            {previews.map((src, i) => (
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
        {pending ? "Publication…" : "Publier l'actualité"}
      </button>
    </form>
  );
}
