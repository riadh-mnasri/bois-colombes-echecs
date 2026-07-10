# Architecture technique

Ce document explique comment le site fonctionne techniquement, les décisions prises et les pièges connus, pour permettre à n'importe quel développeur de le maintenir.

## Sommaire

- [Vue d'ensemble](#vue-densemble)
- [Routes et pages](#routes-et-pages)
- [Flux de données : deux sources d'articles](#flux-de-données--deux-sources-darticles)
- [Base de données](#base-de-données)
- [Authentification et espace admin](#authentification-et-espace-admin)
- [Server Actions](#server-actions)
- [Gestion des images](#gestion-des-images)
- [Tableaux de résultats](#tableaux-de-résultats)
- [Design system](#design-system)
- [Scripts de migration (historique)](#scripts-de-migration-historique)
- [Pièges connus et runbook](#pièges-connus-et-runbook)
- [Guides de maintenance](#guides-de-maintenance)

## Vue d'ensemble

```
                      ┌─────────────────────────────┐
                      │        Vercel (prod)        │
  push main ────────▶ │  Next.js 16 (App Router)    │
                      └──────┬──────────┬───────────┘
                             │          │
              ┌──────────────▼──┐   ┌───▼─────────────────┐
              │  Neon Postgres  │   │    Vercel Blob      │
              │  (Drizzle ORM)  │   │  (photos uploadées  │
              │  articles,      │   │   depuis l'admin)   │
              │  users,         │   └─────────────────────┘
              │  newsletter     │
              └─────────────────┘   ┌─────────────────────┐
                                    │ www.bois-colombes-  │
              contenu statique      │ echecs.com          │
              src/lib/content.ts    │ (ancien WordPress : │
              (édité dans le code)  │  photos héritées,   │
                                    │  proxiées next/image)│
                                    └─────────────────────┘
```

Le site est un projet Next.js 16 App Router déployé sur Vercel. Il n'y a pas de backend séparé : les lectures se font dans les Server Components, les écritures passent par des Server Actions. La base Postgres (Neon) et le stockage de fichiers (Vercel Blob) sont provisionnés via le marketplace Vercel et injectés en variables d'environnement.

## Routes et pages

### Pages publiques

| Route | Fichier | Rendu | Données |
| --- | --- | --- | --- |
| `/` | `app/page.tsx` | dynamique | articles (DB + statiques), contenu statique, calcul de la prochaine date pizza |
| `/le-club` | `app/le-club/page.tsx` | statique | contenu statique uniquement |
| `/competitions` | `app/competitions/page.tsx` | statique (revalidé au build) | filtres regex sur les articles |
| `/actualites` | `app/actualites/page.tsx` | dynamique | liste paginée (12 par page, paramètre `?page=`) |
| `/actualites/[slug]` | `app/actualites/[slug]/page.tsx` | dynamique | article par slug |
| `/agenda` | `app/agenda/page.tsx` | statique | horaires structurés, dates pizzas |
| `/tournois-pizzas` | `app/tournois-pizzas/page.tsx` | statique | descriptif, dates, éditions passées (filtre regex) |
| `/nous-rejoindre` | `app/nous-rejoindre/page.tsx` | statique | tarifs, catégories, horaires, liens BilletWeb |
| `/contact` | `app/contact/page.tsx` | statique | formulaire mailto |

### Espace admin (protégé)

| Route | Rôle |
| --- | --- |
| `/admin/login` | Connexion (email + mot de passe) |
| `/admin/actualites` | Liste : articles éditables (DB) et articles historiques en lecture seule (content.ts) |
| `/admin/actualites/new` | Création d'une actualité avec upload multi-photos |
| `/admin/actualites/[id]/edit` | Édition : titre, date, textes, conservation/suppression/ajout de photos |
| `/admin/utilisateurs/new` | Création d'un compte administrateur |

La protection est assurée par `src/proxy.ts` (voir [Authentification](#authentification-et-espace-admin)).

## Flux de données : deux sources d'articles

C'est le point le plus important à comprendre. Les actualités proviennent de deux sources fusionnées par `src/lib/articles.ts` :

1. **5 articles statiques** dans `src/lib/content.ts` : les articles vitrines, rédigés à la main lors de la refonte, avec photos self-hostées. Ils ne sont pas modifiables depuis l'admin (affichés en lecture seule dans `/admin/actualites`).
2. **La table `articles` en base** : les 179 articles importés de WordPress et tous les articles créés depuis l'admin.

`getAllArticles()` concatène les deux, trie par date décroissante. Toutes les autres fonctions (`getArticleBySlug`, `getPizzaTournamentArticles`, `getAdultTeamArticles`, `getYouthCompetitionArticles`) travaillent sur cette liste fusionnée.

Les pages Compétitions et Tournois Pizzas sont alimentées par des filtres regex sur les titres :

- Pizzas : titre commençant par `Vendredi` ou contenant `pizza`
- Interclubs adultes : titre commençant par `Nationale`
- Jeunes : titre contenant `top jeunes`, `championnat`, `festival jeunes`, `grand prix jeunes` ou `critérium`

Conséquence : une actualité bien titrée ("Nationale 2, ronde 5...") apparaît automatiquement au bon endroit. C'est documenté dans le guide admin.

## Base de données

Schéma dans `src/db/schema.ts`, client dans `src/db/index.ts`.

Le client utilise une initialisation paresseuse (`getDb()` avec singleton module) : ne jamais instancier `neon()` au niveau module, cela ferait échouer `next build` quand `DATABASE_URL` n'est pas disponible. Ne pas remplacer par un wrapper `Proxy` JavaScript.

```
users                    articles                      newsletter_subscribers
─────                    ────────                      ──────────────────────
id uuid PK               id serial PK                  id serial PK
email unique             slug unique                   email unique
password_hash (bcrypt)   title                         created_at
name                     date (texte ISO yyyy-mm-dd)
created_at               excerpt
                         body
                         images text[] (URLs)
                         results_html (nullable)
                         author_id FK -> users.id
                         created_at
```

Évolution du schéma : modifier `schema.ts` puis `npx dotenv -e .env.local -- npx drizzle-kit push`. Pas de fichiers de migration versionnés : le projet utilise le mode push, adapté à une petite équipe.

## Authentification et espace admin

Implémentation maison volontairement minimale (pas de NextAuth), suivant le pattern recommandé par la documentation Next.js :

1. `src/lib/session.ts` : création/vérification d'un JWT HS256 (jose) signé avec `SESSION_SECRET`, posé en cookie `session` httpOnly, secure, sameSite lax, expiration 30 jours.
2. `src/proxy.ts` : intercepte toutes les requêtes `/admin/*` (sauf `/admin/login`), vérifie le cookie, redirige vers la page de connexion sinon. Attention : dans Next.js 16, ce fichier remplace `middleware.ts` (renommage officiel).
3. `src/lib/dal.ts` : `verifySession()` appelée au début de chaque Server Action et page admin. La défense ne repose jamais uniquement sur le proxy.
4. Mots de passe hashés avec bcryptjs (10 rounds) dans la table `users`.

Il n'y a pas de rôles : tout compte connecté a tous les droits admin. Pas de reset de mot de passe en libre-service : passer par `npm run seed:admin` ou créer un nouveau compte.

## Server Actions

Toutes les écritures passent par des Server Actions dans `src/app/actions/` :

| Fichier | Actions | Notes |
| --- | --- | --- |
| `auth.ts` | `login`, `logout` | Compare bcrypt, crée/détruit la session |
| `articles.ts` | `createArticle`, `updateArticle`, `deleteArticle` | Upload des photos vers Blob, slugification, `revalidatePath` des pages concernées |
| `users.ts` | `createUser` | Hash bcrypt |
| `newsletter.ts` | `subscribeToNewsletter` | Insertion avec gestion du doublon d'email |

Point d'attention dans `articles.ts` : la fonction `slugify()` doit retirer les diacritiques Unicode après `normalize("NFD")` (regex des caractères combinants), sinon un titre accentué produit un slug cassé et une 404 après publication. Ce bug a déjà eu lieu : ne pas simplifier cette fonction.

`updateArticle` gère les photos en trois ensembles : les URLs conservées (inputs cachés `keptImages`), les nouvelles (champ fichier `photos`, uploadées vers Blob), les supprimées (absentes de `keptImages`). La limite de taille des uploads est fixée par `serverActions.bodySizeLimit: "10mb"` dans `next.config.ts`.

## Gestion des images

Trois origines distinctes, toutes servies via `next/image` (optimisation, redimensionnement, webp automatiques) :

1. **`public/photos/`** : photos self-hostées (heros de pages, entraîneurs). Importées statiquement dans les pages, ce qui permet `placeholder="blur"` automatique.
2. **Vercel Blob** : photos uploadées depuis l'admin. Domaine autorisé `*.public.blob.vercel-storage.com` dans `next.config.ts`.
3. **`www.bois-colombes-echecs.com/wp-content/uploads/`** : les photos des 179 articles importés pointent encore vers l'ancien serveur WordPress, proxiées par next/image (remotePattern dédié).

Avertissement important : le jour de la bascule DNS de `bois-colombes-echecs.com` vers Vercel, les URLs `wp-content` ne seront plus servies par l'ancien hébergement. Il faudra au préalable rapatrier ces images vers Vercel Blob (script à écrire : télécharger chaque URL, uploader vers Blob, mettre à jour `articles.images` et `results_html` si besoin). Ne pas basculer le DNS avant.

## Tableaux de résultats

154 des 179 articles importés affichent un vrai tableau de classement (colonne `results_html`), extrait de l'ancien site par `scripts/extract-results-tables.ts` :

1. cheerio parse le HTML de la page WordPress d'origine ;
2. détection des `<table>` de classement par mots-clés d'en-tête (nom, elo, pl, pts, cat, perf...) et minimum 3 lignes ;
3. reconstruction d'un HTML propre : uniquement `table/tr/th/td`, texte nettoyé, aucun attribut ni script d'origine conservé ;
4. garde-fou `MAX_CELL_LENGTH = 60` : si une cellule dépasse 60 caractères, la table entière est rejetée. C'est le signe fiable qu'une sous-table Papi-web (détail ronde par ronde) a été aplatie en bloc illisible par `.text()`.

Le rendu utilise `dangerouslySetInnerHTML` dans `ArticleBody.tsx`, stylé par sélecteurs Tailwind `[&_table]`, `[&_th]`, `[&_td]`. C'est sûr uniquement parce que le HTML est entièrement reconstruit par notre script : ne jamais injecter du HTML d'origine externe sans passer par cette reconstruction.

## Design system

Identité "éditorial premium" : crème, vert forêt, brun bois, accent or, sans dégradés criards.

### Tokens (globals.css)

| Token | Valeur | Usage |
| --- | --- | --- |
| `paper` / `paper-dim` | `#faf6ee` / `#f1ead8` | Fonds clairs |
| `ink` / `ink-soft` | `#1b1712` / `#4a443c` | Textes |
| `forest` / `forest-deep` | `#23392c` / `#14241b` | Sections sombres, header top bar |
| `wood` / `wood-deep` | `#7c4a24` / `#4a2c15` | Accents chauds, section pizzas |
| `gold` / `gold-soft` | `#b8863b` / `#d9b877` | Accents, filets, focus |
| `line` | `#e4dcc8` | Bordures hairline |

Polices : Fraunces (titres et navigation, variable `--font-display`), Inter (texte). Tailwind v4 : les tokens sont déclarés dans `@theme inline` de `globals.css`, il n'y a pas de `tailwind.config`.

Décision assumée : pas de mode sombre. L'inversion automatique `prefers-color-scheme` cassait le logo et les textes clairs des sections vertes ; `color-scheme: light` est forcé. Ne pas réintroduire de dark mode sans le designer entièrement.

### Composants et effets notables

| Élément | Fichier | Rôle |
| --- | --- | --- |
| `Reveal` | `components/Reveal.tsx` | Apparition au scroll (IntersectionObserver, seuil 0.15) |
| `CountUp` | `components/CountUp.tsx` | Compteurs animés des chiffres clés |
| `PlayableBoard` | `components/PlayableBoard.tsx` | Échiquier interactif complet (chess.js, coups légaux, mat) |
| `ArticleCard` | `components/ArticleCard.tsx` | Vignette avec zoom photo au survol et lien "Lire l'article" |
| `ScheduleCard` | `components/ScheduleCard.tsx` | Horaires en style carte de menu à pointillés |
| `Ornament` | `components/Ornament.tsx` | Séparateur cavalier entre hairlines |
| Cascade héros | `.hero-rise-1..4` (globals.css) | Entrée décalée des éléments de hero |
| Marquee palmarès | `.marquee-track` | Bande défilante sous le hero d'accueil, pause au survol |
| Reflet boutons | `.btn-sheen` | Balayage lumineux au survol |
| Grain papier | `body::before` | Bruit SVG à 4 % d'opacité sur tout le site |
| Morph photo | `ViewTransition` (React expérimental) | La photo d'une vignette se prolonge vers la page de détail |

Tous les effets respectent `prefers-reduced-motion: reduce`.

Le favicon et l'icône Apple sont générés par `app/icon.tsx` et `app/apple-icon.tsx` (next/og). Attention : les glyphes échecs Unicode ne se rendent pas de façon fiable dans ImageResponse, l'icône est donc dessinée en SVG inline encodé en data URI.

## Scripts de migration (historique)

Exécutés une fois lors de la reprise du contenu WordPress, conservés comme référence. Ordre d'exécution historique :

1. `import-legacy-articles.ts` : parcourt les URLs de l'ancien site, extrait og:title, og:image, date de publication ; a créé 260 articles.
2. `cleanup-redirect-duplicates.ts` : l'ancien site redirigeait (301) de vieilles URLs vers des articles récents, ce qui avait créé 81 doublons de titre ; ne garde que la ligne au plus petit id par titre exact.
3. `fix-duplicate-title-suffix.ts` : certains og:title contenaient deux fois le suffixe " - Cercle d'Echecs de Bois-Colombes" ; nettoyage avec quantificateur `+` puis régénération des extraits.
4. `enrich-article-photos.ts` : réextrait jusqu'à 10 photos par article depuis la div `post-content`, en filtrant logos et badges partagés.
5. `extract-results-tables.ts` : voir [Tableaux de résultats](#tableaux-de-résultats).

Leçon à retenir pour tout futur import : après un scan de sitemap ou d'anciennes URLs, vérifier les doublons par titre, pas seulement par slug.

## Pièges connus et runbook

| Symptôme / sujet | Explication et remède |
| --- | --- |
| Next.js 16 diffère des habitudes | `middleware.ts` est renommé `proxy.ts` ; `params` et `searchParams` sont des Promises à `await` ; consulter la doc embarquée dans `node_modules/next/dist/docs/` avant d'utiliser une API (consigne AGENTS.md) |
| Toutes les routes renvoient 404 en dev | Cache Turbopack corrompu après ajout de route dynamique : `rm -rf .next` puis relancer `npm run dev` |
| 404 après publication d'une actualité au titre accentué | Régression du `slugify()` : vérifier que le strip des diacritiques après NFD est toujours présent dans `actions/articles.ts` |
| Sections vides dans des captures d'écran automatisées | Artefact connu : les captures `fullPage` ne déclenchent pas l'IntersectionObserver de `Reveal`. Vérifier avec un vrai défilement incrémental avant de conclure à un bug |
| Script qui ne voit pas les variables d'env | Seul Next.js charge `.env.local` ; préfixer les scripts par `npx dotenv -e .env.local --` |
| Les photos des vieux articles cassent | Elles sont encore servies par l'ancien WordPress : ne pas couper l'ancien hébergement ni basculer le DNS avant de les avoir rapatriées vers Blob (voir [Gestion des images](#gestion-des-images)) |
| Espace admin inaccessible, personne n'a le mot de passe | `ADMIN_EMAIL=... ADMIN_NAME=... ADMIN_PASSWORD=... npm run seed:admin` crée un nouveau compte |

## Guides de maintenance

### Ajouter une page publique

1. Créer `src/app/ma-page/page.tsx` en s'inspirant d'une page existante (hero forest-deep, `Container`, `SectionHeading`, `Reveal`).
2. Exporter un objet `metadata` avec titre et description.
3. L'ajouter au menu dans `src/components/NavLinks.tsx` et au footer si pertinent.
4. `npm run lint && npm run build`, vérifier en local, pousser.

### Modifier les contenus statiques (tarifs, horaires, dates pizzas, entraîneurs, bureau, palmarès)

Tout est dans `src/lib/content.ts`, organisé par exports nommés (club, stats, orientations, tarifs, entraîneurs, bureau, tournoisPizzas...). Les horaires utilisent le type `ScheduleRow` (`what`, `when`, `time?`). Après modification : build local puis push (le déploiement est automatique).

### Ajouter un champ aux actualités

1. Ajouter la colonne dans `src/db/schema.ts`, puis `drizzle-kit push` (voir plus haut).
2. Propager dans le type `Article` et le mapping de `src/lib/articles.ts`.
3. Mettre à jour les formulaires admin (`NewArticleForm`, `EditArticleForm`) et les actions (`createArticle`, `updateArticle`).
4. Adapter l'affichage (`ArticleBody`, `ArticleCard`).

### Vérifier visuellement avant déploiement

Le build ne garantit pas le rendu. Pour une vérification rapide multi-largeurs, un script Playwright jetable (chromium `channel: "chrome"`) contre le serveur local suffit ; penser au vrai défilement pour les sections sous `Reveal`.
