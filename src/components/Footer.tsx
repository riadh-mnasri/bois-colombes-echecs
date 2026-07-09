import Link from "next/link";
import Image from "next/image";
import { Container } from "./Container";
import { club } from "@/lib/content";
import logo from "../../public/brand/logo-cebc.png";
import distingoLogo from "../../public/brand/distingo-bank.png";
import clubFormateurBadge from "../../public/brand/club-formateur.png";
import zeroToleranceBadge from "../../public/brand/zero-tolerance.jpg";

export function Footer() {
  return (
    <footer className="border-t border-line/70 bg-paper-dim">
      <Container className="grid gap-10 py-14 sm:grid-cols-3">
        <div>
          <Image src={logo} alt="Cercle d'Échecs de Bois-Colombes" className="h-10 w-auto" />
          <p className="mt-4 text-sm text-ink-soft">
            Former, encadrer et faire progresser les joueuses et joueurs d&rsquo;échecs de Bois-Colombes depuis plus de 30 ans.
          </p>
        </div>

        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-wood">Le club</p>
          <ul className="mt-4 space-y-2 text-sm text-ink-soft">
            <li><Link href="/le-club" className="hover:text-ink">Équipe &amp; palmarès</Link></li>
            <li><Link href="/actualites" className="hover:text-ink">Actualités</Link></li>
            <li><Link href="/tournois-pizzas" className="hover:text-ink">Tournois Pizzas</Link></li>
            <li><Link href="/nous-rejoindre" className="hover:text-ink">Adhésion</Link></li>
            <li><Link href="/contact" className="hover:text-ink">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-wood">Contact</p>
          <ul className="mt-4 space-y-2 text-sm text-ink-soft">
            <li>{club.address}</li>
            <li>{club.phone}</li>
            <li>{club.email}</li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-line/70 bg-paper py-12">
        <Container className="grid gap-6 sm:grid-cols-2">
          <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-line p-8 text-center shadow-sm">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-wood">
              Partenaire officiel du club
            </p>
            <Image
              src={distingoLogo}
              alt="Distingo Bank, partenaire du Cercle d'Échecs de Bois-Colombes"
              className="h-14 w-auto"
            />
            <p className="text-sm text-ink-soft">Distingo Bank soutient les activités du club.</p>
          </div>

          <div className="flex flex-col items-center justify-center gap-5 rounded-2xl border border-line p-8 text-center shadow-sm">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-wood">Nos engagements</p>
            <div className="flex items-center gap-8">
              <div className="flex flex-col items-center gap-2">
                <Image src={clubFormateurBadge} alt="Label Club Formateur FFE" className="h-20 w-auto" />
                <span className="text-xs text-ink-soft">Club Formateur FFE</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Image
                  src={zeroToleranceBadge}
                  alt="Zéro Tolérance pour les violences"
                  className="h-20 w-auto rounded-md"
                />
                <span className="text-xs text-ink-soft">Zéro Tolérance</span>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <div className="border-t border-line/70 py-6">
        <Container className="flex flex-col items-center gap-3 text-xs text-ink-soft sm:flex-row sm:justify-between">
          <p>&copy; {new Date().getFullYear()} {club.name}</p>
          <Link href="/admin/login" className="hover:text-ink">
            Administration
          </Link>
        </Container>
      </div>
    </footer>
  );
}
