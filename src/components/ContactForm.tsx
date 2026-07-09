"use client";

import { FormEvent, useState } from "react";
import { club } from "@/lib/content";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");

    const subject = encodeURIComponent(`Contact site : ${name}`);
    const body = encodeURIComponent(`${message}\n\n${name} (${email})`);
    window.location.href = `mailto:${club.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
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
        <label htmlFor="message" className="text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="rounded-xl border border-line bg-paper px-4 py-3 text-sm outline-none focus:border-wood"
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-full bg-forest px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-forest-deep"
      >
        Envoyer le message
      </button>

      {sent && (
        <p className="text-sm text-ink-soft">
          Votre client mail va s&rsquo;ouvrir avec le message pré-rempli. Vous pouvez aussi écrire
          directement à {club.email}.
        </p>
      )}
    </form>
  );
}
