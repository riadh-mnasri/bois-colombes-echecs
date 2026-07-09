"use client";

import { useActionState } from "react";
import { createArticle, type CreateArticleState } from "@/app/actions/articles";

export function NewArticleForm() {
  const [state, action, pending] = useActionState<CreateArticleState, FormData>(
    createArticle,
    undefined
  );

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
        <label htmlFor="photo" className="text-sm font-medium">
          Photo
        </label>
        <input
          id="photo"
          name="photo"
          type="file"
          accept="image/*"
          required
          className="rounded-xl border border-line bg-paper px-4 py-3 text-sm outline-none focus:border-wood"
        />
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
