import Link from "next/link";
import { Container } from "./Container";

const links = [
  { href: "/le-club", label: "Le Club" },
  { href: "/actualites", label: "Actualités" },
  { href: "/nous-rejoindre", label: "Nous rejoindre" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-paper/90 backdrop-blur">
      <Container className="flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-forest text-gold-soft">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
              <path d="M12 2 9.5 6h5L12 2Zm-1 5-2 5h6l-2-5h-2Zm-3 6-1.5 8h11L16 13H8Z" />
            </svg>
          </span>
          <span className="font-display text-lg font-medium leading-tight">
            Cercle d&rsquo;Échecs
            <br className="hidden sm:block" /> de Bois-Colombes
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium tracking-wide text-ink-soft transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/nous-rejoindre"
          className="hidden rounded-full bg-forest px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-forest-deep md:inline-flex"
        >
          Adhérer
        </Link>

        <details className="md:hidden">
          <summary className="list-none rounded-full border border-line p-2">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          </summary>
          <nav className="absolute left-0 right-0 top-20 flex flex-col gap-1 border-b border-line bg-paper p-4">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="rounded-lg px-3 py-2.5 text-ink-soft hover:bg-paper-dim">
                {link.label}
              </Link>
            ))}
          </nav>
        </details>
      </Container>
    </header>
  );
}
