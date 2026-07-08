import Link from "next/link";
import { Container } from "./Container";
import { club } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-line/70 bg-paper-dim">
      <Container className="grid gap-10 py-14 sm:grid-cols-3">
        <div>
          <p className="font-display text-lg font-medium">{club.name}</p>
          <p className="mt-3 text-sm text-ink-soft">
            Former, encadrer et faire progresser les joueuses et joueurs d&rsquo;échecs de Bois-Colombes depuis plus de 30 ans.
          </p>
        </div>

        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-wood">Le club</p>
          <ul className="mt-4 space-y-2 text-sm text-ink-soft">
            <li><Link href="/le-club" className="hover:text-ink">Équipe &amp; palmarès</Link></li>
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

      <div className="border-t border-line/70 py-6">
        <Container className="flex flex-col gap-2 text-xs text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} {club.name}</p>
          <p>Club Formateur &middot; Zéro Tolérance</p>
        </Container>
      </div>
    </footer>
  );
}
