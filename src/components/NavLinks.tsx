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
              className={`rounded-lg px-3 py-2.5 text-sm font-medium ${
                active ? "bg-paper/10 text-paper" : "text-paper/75 hover:bg-paper/10 hover:text-paper"
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
            className={`group relative whitespace-nowrap py-1 text-xs font-medium uppercase tracking-[0.14em] transition-colors ${
              active ? "text-gold-soft" : "text-paper/70 hover:text-paper"
            }`}
          >
            {link.label}
            <span
              className={`absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-gold-soft transition-transform duration-300 group-hover:scale-x-100 ${
                active ? "scale-x-100" : ""
              }`}
            />
          </Link>
        );
      })}
    </>
  );
}
