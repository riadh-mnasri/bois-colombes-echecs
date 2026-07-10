import Link from "next/link";
import Image from "next/image";
import { Container } from "./Container";
import { NewsletterModal } from "./NewsletterModal";
import { NavLinks } from "./NavLinks";
import logo from "../../public/brand/logo-cebc.png";
import distingoLogo from "../../public/brand/distingo-bank.png";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur">
      <div className="hidden border-b border-line/70 bg-forest-deep sm:block">
        <Container className="flex h-9 items-center justify-between text-xs text-paper/85">
          <NewsletterModal className="font-medium text-gold-soft hover:text-paper" />
          <div className="flex items-center gap-2">
            <span>Distingo Bank, partenaire du club</span>
            <span className="text-paper/40">&middot;</span>
            <Image
              src={distingoLogo}
              alt="Distingo Bank"
              className="h-5 w-auto rounded bg-paper px-1.5 py-0.5"
            />
          </div>
        </Container>
      </div>

      <div className="border-b border-line/70">
        <Container className="flex h-24 items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src={logo}
              alt="Cercle d'Échecs de Bois-Colombes"
              className="h-16 w-auto sm:h-[4.5rem]"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-5 lg:flex xl:gap-7">
            <NavLinks />
          </nav>

          <Link
            href="/nous-rejoindre"
            className="hidden rounded-full bg-forest px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-forest-deep xl:inline-flex"
          >
            Adhérer
          </Link>

          <details className="lg:hidden">
            <summary className="list-none rounded-full border border-line p-2">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              </svg>
            </summary>
            <nav className="absolute left-0 right-0 top-24 flex flex-col gap-1 border-b border-line bg-paper p-4">
              <NavLinks mobile />
              <NewsletterModal className="rounded-lg px-3 py-2.5 text-left font-medium text-wood hover:bg-paper-dim" />
            </nav>
          </details>
        </Container>
      </div>
    </header>
  );
}
