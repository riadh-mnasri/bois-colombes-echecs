"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/le-club", label: "Le Club" },
  { href: "/competitions", label: "Compétitions" },
  { href: "/actualites", label: "Actualités" },
  { href: "/tournois-pizzas", label: "Tournois Pizzas" },
  { href: "/agenda", label: "Agenda" },
  { href: "/nous-rejoindre", label: "Nous rejoindre" },
  { href: "/contact", label: "Contact" },
];

export function NavLinks({ mobile = false }: { mobile?: boolean }) {
  const pathname = usePathname();

  if (mobile) {
    return (
      <>
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-3 py-2.5 font-display text-base font-medium ${
                active ? "bg-paper-dim text-ink" : "text-ink-soft hover:bg-paper-dim"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </>
    );
  }

  return (
    <>
      {links.map((link) => {
        const active = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`group relative whitespace-nowrap py-1 font-display text-[17px] font-medium transition-colors ${
              active ? "text-ink" : "text-ink-soft hover:text-ink"
            }`}
          >
            {link.label}
            <span
              className={`absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-300 group-hover:scale-x-100 ${
                active ? "scale-x-100" : ""
              }`}
            />
          </Link>
        );
      })}
    </>
  );
}
