import Link from "next/link";
import Image from "next/image";
import { Container } from "./Container";
import logo from "../../public/brand/logo-cebc.png";

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
        <Link href="/" className="flex items-center">
          <Image src={logo} alt="Cercle d'Échecs de Bois-Colombes" className="h-11 w-auto sm:h-12" priority />
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
