# Cercle d'Échecs de Bois-Colombes

Site officiel du Cercle d'Échecs de Bois-Colombes (CEBC), club formateur FFE basé à Bois-Colombes (92).

## Fonctionnalités

- Présentation du club : histoire, valeurs, palmarès, équipe encadrante, bureau directeur
- Adhésion jeunes et adultes avec tarifs, catégories d'âge, horaires et inscription en ligne (BilletWeb)
- Actualités du club avec pages de détail, galeries photo et effet magazine
- Espace d'administration protégé pour publier de nouvelles actualités et gérer les accès
- Formulaire de contact

## Stack technique

- [Next.js 16](https://nextjs.org) (App Router, Server Actions, Proxy)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Drizzle ORM](https://orm.drizzle.team) + [Neon Postgres](https://neon.tech)
- [Vercel Blob](https://vercel.com/docs/vercel-blob) pour le stockage des photos
- Authentification maison (session signée, cookies httpOnly) via [jose](https://github.com/panva/jose) et [bcryptjs](https://github.com/dcodeIO/bcrypt.js)

## Démarrage

### Prérequis

- Node.js 20+
- Un projet Vercel lié avec Neon Postgres et Vercel Blob provisionnés

### Installation

```bash
npm install
```

### Variables d'environnement

Récupérées automatiquement depuis Vercel :

```bash
vercel env pull .env.local
```

| Variable | Description |
| --- | --- |
| `DATABASE_URL` | Connexion Postgres (Neon) |
| `BLOB_READ_WRITE_TOKEN` | Upload des photos vers Vercel Blob |
| `SESSION_SECRET` | Clé de signature des sessions admin (générée avec `openssl rand -base64 32`) |

### Base de données

Appliquer le schéma :

```bash
npx dotenv -e .env.local -- npx drizzle-kit push
```

Créer le premier compte administrateur :

```bash
ADMIN_EMAIL="..." ADMIN_NAME="..." ADMIN_PASSWORD="..." npm run seed:admin
```

### Lancer le site en local

```bash
npm run dev
```

Le site est accessible sur [http://localhost:3000](http://localhost:3000).

## Déploiement

Le déploiement se fait sur [Vercel](https://vercel.com). Chaque push sur la branche `main` déclenche un déploiement en production.

```bash
vercel --prod
```

## Structure du projet

```
src/
  app/            Routes (App Router) : pages publiques, actualités, admin
  actions/        Server Actions (authentification, actualités, utilisateurs)
  components/     Composants UI réutilisables
  db/             Schéma et client Drizzle
  lib/            Contenu du site, session, accès aux données
scripts/          Scripts d'administration (seed, imports)
```
