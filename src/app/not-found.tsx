import { Container } from "@/components/Container";
import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-forest-deep py-24 text-paper">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-[0.05]"
        style={{
          backgroundImage: "repeating-conic-gradient(#fff 0% 25%, transparent 0% 50%)",
          backgroundSize: "72px 72px",
        }}
      />
      <Container className="relative">
        <p className="hero-rise hero-rise-1 mb-5 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.25em] text-gold-soft">
          <span aria-hidden className="h-px w-8 bg-gold-soft" />
          Erreur 404
        </p>
        <p aria-hidden className="hero-rise hero-rise-2 font-display text-8xl font-medium leading-none text-paper/15 sm:text-9xl">
          4<span className="text-gold-soft/40">&#9822;</span>4
        </p>
        <h1 className="hero-rise hero-rise-2 mt-6 max-w-2xl text-balance font-display text-3xl font-medium sm:text-5xl">
          Coup impossible : cette case est vide.
        </h1>
        <p className="hero-rise hero-rise-3 mt-5 max-w-xl text-paper/75">
          La page que vous cherchez n&rsquo;existe pas ou a été déplacée. Comme aux échecs,
          le mieux est de revenir à une position connue.
        </p>
        <div className="hero-rise hero-rise-4 mt-10 flex flex-wrap gap-4">
          <Button href="/">Retour à l&rsquo;accueil</Button>
          <Button href="/actualites" variant="outline-light">
            Voir les actualités
          </Button>
        </div>
      </Container>
    </section>
  );
}
