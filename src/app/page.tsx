import Image from "next/image";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { ArticleCard } from "@/components/ArticleCard";
import { Reveal } from "@/components/Reveal";
import { PlayableBoard } from "@/components/PlayableBoard";
import { CountUp } from "@/components/CountUp";
import { Ornament } from "@/components/Ornament";
import { stats, recentResults, orientations, club } from "@/lib/content";
import { getAllArticles } from "@/lib/articles";
import festivalPhoto from "../../public/photos/festival-jeunes.jpg";

const distinctions = [
  "22 titres de Champion(ne) de France Jeunes",
  "Club Formateur FFE",
  "Plus de 20 équipes engagées",
  "De la Nationale 1 à la Nationale 5",
  "Plus de 30 ans d'histoire",
];

export default async function HomePage() {
  const articles = await getAllArticles();

  return (
    <>
      <section className="relative overflow-hidden text-paper">
        <Image
          src={festivalPhoto}
          alt="Tournoi jeunes organisé par le Cercle d'Échecs de Bois-Colombes"
          fill
          priority
          sizes="100vw"
          className="hero-photo object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/85 to-forest-deep/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-deep/70 via-forest-deep/20 to-transparent" />

        <Container className="relative py-28 sm:py-40">
          <p className="hero-rise hero-rise-1 mb-5 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.25em] text-gold-soft">
            <span aria-hidden className="h-px w-8 bg-gold-soft" />
            Club Formateur FFE &middot; Bois-Colombes (92)
          </p>
          <h1 className="hero-rise hero-rise-2 max-w-3xl text-balance font-display text-4xl font-medium leading-[1.1] sm:text-6xl">
            Le jeu d&rsquo;échecs se joue et se transmet à Bois-Colombes{" "}
            <span className="font-display italic text-gold-soft">depuis plus de 30 ans</span>.
          </h1>
          <p className="hero-rise hero-rise-3 mt-6 max-w-xl text-lg text-paper/80">
            22 titres de Champion(ne) de France Jeunes, une école d&rsquo;échecs ouverte à tous les âges
            et une équipe d&rsquo;entraîneurs de haut niveau. Rejoignez le cercle.
          </p>
          <div className="hero-rise hero-rise-4 mt-10 flex flex-wrap gap-4">
            <Button href="/nous-rejoindre">Nous rejoindre</Button>
            <Button href="/le-club" variant="outline-light">
              Découvrir le club
            </Button>
          </div>
        </Container>

        <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 sm:block">
          <span className="scroll-cue block h-12 w-px bg-gold-soft/80" />
        </div>
      </section>

      <section aria-hidden className="marquee overflow-hidden border-y border-paper/10 bg-forest-deep py-4 text-paper">
        <div className="marquee-track flex w-max items-center gap-10">
          {[...distinctions, ...distinctions].map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-10 whitespace-nowrap font-display text-lg italic text-gold-soft/90"
            >
              {item}
              <span className="text-[0.5rem] not-italic text-gold/70">&#9670;</span>
            </span>
          ))}
        </div>
      </section>

      <section className="bg-forest-deep py-10 text-center text-paper">
        <Container>
          <p className="mx-auto max-w-3xl font-display text-xl italic leading-relaxed text-paper/85 sm:text-2xl">
            &laquo;&nbsp;Développer la pratique sportive du jeu d&rsquo;échecs, en éduquant, formant,
            responsabilisant.&nbsp;&raquo;
          </p>
        </Container>
      </section>

      <section className="bg-forest py-24 text-paper">
        <Container>
          <Reveal className="grid items-center gap-12 lg:grid-cols-[minmax(0,420px)_1fr]">
            <PlayableBoard />
            <div>
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-gold-soft">
                À vous de jouer
              </p>
              <h2 className="font-display text-3xl font-medium sm:text-4xl">
                Un échiquier, deux joueurs, une seule règle : venez comme vous êtes.
              </h2>
              <p className="mt-4 max-w-md text-paper/75">
                Déplacez les pièces directement sur cet échiquier : les règles du jeu sont
                respectées, échec et mat compris. C&rsquo;est exactement l&rsquo;esprit du club :
                on apprend en jouant, quel que soit son niveau.
              </p>
              <div className="mt-8">
                <Button href="/nous-rejoindre">Venir jouer au club</Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="border-b border-line/70 bg-paper-dim">
        <Container className="py-12">
          <Reveal className="grid grid-cols-2 gap-8 sm:grid-cols-4 sm:[&>*+*]:border-l sm:[&>*+*]:border-line sm:[&>*+*]:pl-8">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-5xl font-medium text-wood">
                  <CountUp value={stat.value} />
                </p>
                <p className="mt-2 text-sm text-ink-soft">{stat.label}</p>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>

      <section className="border-b border-line/70 py-24">
        <Container>
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading
                eyebrow="Actualités"
                title="Les derniers tournois du club"
                description="Résultats, participations et temps forts, en images."
              />
              <Button href="/actualites" variant="outline-dark">
                Toutes les actualités
              </Button>
            </div>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {articles.slice(0, 3).map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <Ornament className="mb-16" />
          <Reveal>
            <SectionHeading
              eyebrow="Le club"
              title="Une formation exigeante, un club à taille humaine"
              description="Cinq axes structurent l'action du cercle, de l'initiation scolaire à la haute compétition."
            />
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {orientations.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-line bg-paper p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-lg"
                >
                  <h3 className="font-display text-xl font-medium">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{item.description}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-forest py-24 text-paper">
        <Container>
          <Reveal>
            <SectionHeading
              light
              eyebrow="Palmarès récent"
              title="Des résultats qui parlent"
              description="Un aperçu des dernières saisons du club, jeunes et adultes confondus."
            />
            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {recentResults.map((season) => (
                <div
                  key={season.year}
                  className="rounded-2xl border border-paper/15 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold-soft/60 hover:bg-paper/[0.04]"
                >
                  <p className="font-display text-3xl font-medium text-gold-soft">{season.year}</p>
                  <ul className="mt-4 space-y-2 text-sm text-paper/80">
                    {season.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <Button href="/le-club" variant="outline-light">
                Voir le palmarès complet
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <Reveal className="grid gap-10 rounded-3xl bg-wood-deep px-8 py-14 text-paper sm:grid-cols-2 sm:px-14">
            <div>
              <h2 className="font-display text-3xl font-medium sm:text-4xl">
                Prêt·e à pousser la porte du club ?
              </h2>
              <p className="mt-4 text-paper/75">
                Cours pour tous les âges, essai gratuit, aides financières possibles. La saison{" "}
                {new Date().getFullYear()}/{new Date().getFullYear() + 1} est ouverte.
              </p>
              <div className="mt-8">
                <Button href="/nous-rejoindre">Voir les tarifs &amp; s&rsquo;inscrire</Button>
              </div>
            </div>
            <div className="flex flex-col justify-center gap-3 border-t border-paper/15 pt-8 text-sm text-paper/80 sm:border-l sm:border-t-0 sm:pl-10 sm:pt-0">
              <p className="font-medium text-paper">{club.name}</p>
              <p>{club.address}</p>
              <p>{club.phone}</p>
              <p>{club.email}</p>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
