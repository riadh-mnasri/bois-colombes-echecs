"use client";

import { useActionState } from "react";
import { createUser, type CreateUserState } from "@/app/actions/users";

export function NewUserForm() {
  const [state, action, pending] = useActionState<CreateUserState, FormData>(createUser, undefined);

  return (
    <form action={action} className="grid gap-5">
      <div className="grid gap-1.5">
        <label htmlFor="name" className="text-sm font-medium">
          Nom
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="rounded-xl border border-line bg-paper px-4 py-3 text-sm outline-none focus:border-wood"
        />
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="rounded-xl border border-line bg-paper px-4 py-3 text-sm outline-none focus:border-wood"
        />
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="password" className="text-sm font-medium">
          Mot de passe temporaire (8 caractères minimum)
        </label>
        <input
          id="password"
          name="password"
          type="text"
          required
          minLength={8}
          className="rounded-xl border border-line bg-paper px-4 py-3 text-sm outline-none focus:border-wood"
        />
        <p className="text-xs text-ink-soft">
          Communiquez ce mot de passe à la personne concernée par un canal sûr (pas d&rsquo;e-mail en clair).
        </p>
      </div>

      {state?.error && <p className="text-sm text-red-700">{state.error}</p>}
      {state?.success && <p className="text-sm text-forest">Compte créé avec succès.</p>}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center rounded-full bg-forest px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-forest-deep disabled:opacity-60"
      >
        {pending ? "Création…" : "Créer le compte"}
      </button>
    </form>
  );
}
