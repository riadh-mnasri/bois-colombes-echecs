"use client";

import { deleteArticle } from "@/app/actions/articles";

export function DeleteArticleButton({ id, title }: { id: number; title: string }) {
  return (
    <form
      action={deleteArticle}
      onSubmit={(e) => {
        if (!confirm(`Supprimer définitivement "${title}" ?`)) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button type="submit" className="text-red-700 hover:underline">
        Supprimer
      </button>
    </form>
  );
}
