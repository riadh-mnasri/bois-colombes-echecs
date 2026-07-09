import Link from "next/link";
import { Container } from "@/components/Container";
import { getOptionalSession } from "@/lib/dal";
import { logout } from "@/app/actions/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getOptionalSession();

  return (
    <div className="min-h-screen bg-paper-dim">
      {session && (
        <header className="border-b border-line bg-forest-deep text-paper">
          <Container className="flex h-16 items-center justify-between">
            <nav className="flex items-center gap-6 text-sm">
              <Link href="/admin/actualites" className="font-medium">
                Administration &middot; Actualités
              </Link>
              <Link href="/admin/utilisateurs/new" className="text-paper/70 hover:text-paper">
                Ajouter un utilisateur
              </Link>
            </nav>
            <form action={logout} className="flex items-center gap-4">
              <span className="text-paper/70">{session.name}</span>
              <button type="submit" className="text-paper/70 hover:text-paper">
                Déconnexion
              </button>
            </form>
          </Container>
        </header>
      )}
      {children}
    </div>
  );
}
