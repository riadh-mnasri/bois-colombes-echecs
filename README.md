# Cercle d'Échecs de Bois-Colombes

Site officiel du Cercle d'Échecs de Bois-Colombes (CEBC), club formateur FFE basé à Bois-Colombes (92). Remplace l'ancien site WordPress en conservant l'intégralité de son contenu : 265 actualités (2022 à 2026), photos et tableaux de résultats inclus.

Production : [bois-colombes-echecs.vercel.app](https://bois-colombes-echecs.vercel.app)

## Sommaire

- [Fonctionnalités](#fonctionnalités)
- [Stack technique](#stack-technique)
- [Documentation](#documentation)
- [Démarrage rapide](#démarrage-rapide)
- [Variables d'environnement](#variables-denvironnement)
- [Base de données](#base-de-données)
- [Commandes](#commandes)
- [Scripts d'administration et de migration](#scripts-dadministration-et-de-migration)
- [Déploiement](#déploiement)
- [Structure du projet](#structure-du-projet)

## Fonctionnalités

### Site public

- Accueil : hero photo animé, bande palmarès défilante, échiquier interactif jouable (chess.js), chiffres clés animés, mise en avant des Tournois Pizzas avec calcul de la prochaine édition
- Le Club : chiffres en grand format, orientations, palmarès complet, entraîneurs avec photos, bureau directeur
- Actualités : 265 articles avec galeries photos, tableaux de résultats reconstruits, pagination, transition photo animée entre liste et détail (View Transitions)
- Compétitions : agrégation automatique des actualités jeunes et interclubs adultes
- Agenda : horaires des cours en cartes style menu, dates des tournois pizzas
- Tournois Pizzas, Nous rejoindre (tarifs et inscription BilletWeb), Contact
- Newsletter : capture d'emails via modale (envoi non encore branché)
- Page 404 sur le thème de l'échiquier

### Administration (`/admin`)

- Authentification par session signée (cookie httpOnly, 30 jours)
- Création, édition et suppression d'actualités avec upload multi-photos vers Vercel Blob
- Création de comptes administrateurs

## Stack technique

| Domaine | Choix |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org) (App Router, Server Actions, proxy, View Transitions) |
| Langage | [TypeScript](https://www.typescriptlang.org) |
| Styles | [Tailwind CSS v4](https://tailwindcss.com) (design tokens dans `globals.css`, pas de fichier de config) |
| Base de données | [Neon Postgres](https://neon.tech) via [Drizzle ORM](https://orm.drizzle.team) |
| Stockage photos | [Vercel Blob](https://vercel.com/docs/vercel-blob) |
| Authentification | Maison : [jose](https://github.com/panva/jose) (JWT HS256) + [bcryptjs](https://github.com/dcodeIO/bcrypt.js) |
| Échiquier | [chess.js](https://github.com/jhlywa/chess.js) (validation des coups légaux) |
| Hébergement | [Vercel](https://vercel.com) (déploiement automatique sur push `main`) |

## Documentation

| Document | Contenu |
| --- | --- |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Fonctionnement technique complet : routes, flux de données, auth, images, design system, pièges connus, guides de maintenance |
| [docs/GUIDE-ADMIN.md](docs/GUIDE-ADMIN.md) | Guide utilisateur de l'espace d'administration, destiné aux membres du bureau |

## Démarrage rapide

Prérequis : Node.js 20+, un projet Vercel lié avec Neon Postgres et Vercel Blob provisionnés.

```bash
git clone https://github.com/riadh-mnasri/bois-colombes-echecs.git
cd bois-colombes-echecs
npm install
vercel env pull .env.local          # récupère les variables d'environnement
npm run dev                          # http://localhost:3000
```

## Variables d'environnement

| Variable | Rôle | Provenance |
| --- | --- | --- |
| `DATABASE_URL` | Connexion Postgres | Provisionnée par l'intégration Neon sur Vercel |
| `BLOB_READ_WRITE_TOKEN` | Upload des photos vers Vercel Blob | Provisionnée par l'intégration Blob sur Vercel |
| `SESSION_SECRET` | Signature des sessions admin | À générer : `openssl rand -base64 32` |

Seul Next.js charge `.env.local` automatiquement. Pour les scripts (`drizzle-kit`, `tsx`), passer par `dotenv-cli` comme dans les commandes ci-dessous.

## Base de données

Trois tables, définies dans `src/db/schema.ts` :

- `users` : comptes administrateurs (uuid, email unique, hash bcrypt, nom)
- `articles` : actualités (slug unique, titre, date, extrait, corps, tableau d'URLs de photos, HTML des résultats, auteur)
- `newsletter_subscribers` : emails collectés par la modale newsletter

Appliquer le schéma après modification :

```bash
npx dotenv -e .env.local -- npx drizzle-kit push
```

Créer le premier compte administrateur :

```bash
ADMIN_EMAIL="..." ADMIN_NAME="..." ADMIN_PASSWORD="..." npm run seed:admin
```

## Commandes

```bash
npm run dev          # serveur de développement
npm run build        # build de production (à lancer avant tout push)
npm run lint         # eslint
npm run seed:admin   # création d'un compte admin (variables ADMIN_* requises)
```

## Scripts d'administration et de migration

Les scripts dans `scripts/` s'exécutent avec `npx dotenv -e .env.local -- npx tsx scripts/<nom>.ts`. Les scripts de migration ont déjà été exécutés et sont conservés comme référence : ne pas les relancer sans lire leur rôle dans [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md#scripts-de-migration-historique).

| Script | Rôle | Statut |
| --- | --- | --- |
| `seed-admin.ts` | Créer un compte administrateur | Réutilisable |
| `import-legacy-articles.ts` | Import initial des actualités de l'ancien site WordPress | Déjà exécuté |
| `cleanup-redirect-duplicates.ts` | Suppression des doublons créés par les redirections 301 de WordPress | Déjà exécuté |
| `fix-duplicate-title-suffix.ts` | Nettoyage des titres au suffixe dupliqué par l'ancien thème | Déjà exécuté |
| `enrich-article-photos.ts` | Récupération de toutes les photos de chaque article (jusqu'à 10) | Déjà exécuté |
| `extract-results-tables.ts` | Extraction et reconstruction des tableaux de résultats (cheerio) | Déjà exécuté |

## Déploiement

Le projet Vercel est connecté au repo GitHub : chaque push sur `main` déclenche automatiquement un build et un déploiement en production. Vérifier `npm run lint && npm run build` avant de pousser.

Déploiement manuel possible avec `vercel --prod`.

## Structure du projet

```
src/
  app/                    Routes App Router
    page.tsx              Accueil
    le-club/              Présentation du club
    competitions/         Agrégation des actualités compétitions
    actualites/           Liste paginée + détail [slug]
    agenda/               Horaires et rendez-vous
    tournois-pizzas/      Page dédiée + éditions passées
    nous-rejoindre/       Tarifs et inscriptions
    contact/              Formulaire de contact
    admin/                Espace d'administration (protégé par proxy.ts)
    actions/              Server Actions (auth, articles, users, newsletter)
    globals.css           Design tokens, animations, grain, focus
    not-found.tsx         Page 404
    icon.tsx, apple-icon.tsx  Favicons générés (next/og)
  components/             Composants UI réutilisables
  db/                     Client (getDb lazy) et schéma Drizzle
  lib/                    content.ts (contenu statique), articles.ts (accès données),
                          session.ts (JWT), dal.ts (vérification de session)
  proxy.ts                Protection des routes /admin (équivalent middleware)
scripts/                  Seed et scripts de migration historiques
docs/                     Documentation d'architecture et guide admin
public/photos/            Photos self-hostées (heros, entraîneurs)
public/brand/             Logo du club, logo partenaire
```
