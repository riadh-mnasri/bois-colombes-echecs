"use client";

import { useActionState, useState } from "react";
import { subscribeToNewsletter, type SubscribeState } from "@/app/actions/newsletter";

export function NewsletterModal({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [state, action, pending] = useActionState<SubscribeState, FormData>(
    subscribeToNewsletter,
    undefined
  );

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        Restez informé
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/70 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-paper p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <h2 className="font-display text-2xl font-medium">Restez informé</h2>
              <button
                type="button"
                aria-label="Fermer"
                onClick={() => setOpen(false)}
                className="text-2xl text-ink-soft hover:text-ink"
              >
                &times;
              </button>
            </div>
            <p className="mt-3 text-sm text-ink-soft">
              Recevez les actualités du Cercle d&rsquo;Échecs de Bois-Colombes : résultats, tournois et
              vie du club.
            </p>

            {state?.success ? (
              <p className="mt-6 text-sm font-medium text-forest">
                Merci, votre inscription est bien prise en compte !
              </p>
            ) : (
              <form action={action} className="mt-6 flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="vous@exemple.com"
                  className="flex-1 rounded-xl border border-line bg-paper px-4 py-3 text-sm outline-none focus:border-wood"
                />
                <button
                  type="submit"
                  disabled={pending}
                  className="rounded-xl bg-forest px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-forest-deep disabled:opacity-60"
                >
                  {pending ? "…" : "S'inscrire"}
                </button>
              </form>
            )}
            {state?.error && <p className="mt-3 text-sm text-red-700">{state.error}</p>}
          </div>
        </div>
      )}
    </>
  );
}
