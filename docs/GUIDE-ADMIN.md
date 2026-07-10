# Guide de l'espace d'administration

Ce guide s'adresse aux membres du bureau qui publient le contenu du site. Aucune connaissance technique n'est nécessaire.

## Se connecter

1. Rendez-vous sur `https://bois-colombes-echecs.vercel.app/admin/login` (ou `/admin` : vous serez redirigé).
2. Entrez votre email et votre mot de passe, fournis par l'administrateur du site.
3. Vous restez connecté 30 jours sur le même navigateur.

Mot de passe oublié : il n'y a pas de récupération automatique pour le moment. Contactez l'administrateur du site, qui vous créera un nouvel accès.

## Publier une actualité

1. Depuis `/admin/actualites`, cliquez sur "Nouvelle actualité".
2. Renseignez :
   - **Titre** : voir les conseils de titrage ci-dessous, ils déterminent où l'article apparaît.
   - **Date** : la date de l'événement (c'est elle qui ordonne les actualités, pas la date de publication).
   - **Extrait** : deux ou trois phrases affichées sur les vignettes et en introduction.
   - **Texte** : le corps de l'article. Les sauts de ligne créent des paragraphes.
   - **Photos** : vous pouvez en sélectionner plusieurs d'un coup. La première devient la photo principale de la vignette.
3. Cliquez sur "Publier". L'article est immédiatement en ligne.

### Bien titrer pour un classement automatique

Le site range automatiquement les actualités dans les bonnes rubriques d'après leur titre :

| Pour que l'article apparaisse dans... | Le titre doit... | Exemple |
| --- | --- | --- |
| Tournois Pizzas (éditions passées) | commencer par "Vendredi" ou contenir "pizza" | "Vendredi 12 décembre 2025 : tournoi pizzas de Noël" |
| Compétitions, secteur adultes | commencer par "Nationale" | "Nationale 2 : victoire à Clichy" |
| Compétitions, secteur jeunes | contenir "championnat", "Top Jeunes", "Festival Jeunes", "Grand Prix Jeunes" ou "critérium" | "Championnat des Hauts-de-Seine 2026 : 3 titres" |

Un article qui ne correspond à aucun cas reste visible normalement dans Actualités.

## Modifier ou supprimer une actualité

1. Depuis `/admin/actualites`, repérez l'article : boutons "Voir", "Modifier", "Supprimer".
2. En modification, vous pouvez changer tous les textes, retirer des photos une à une (bouton sur chaque photo), et en ajouter de nouvelles.
3. La suppression est définitive et retire immédiatement l'article du site.

Note : les cinq articles marqués "Actualités historiques (non modifiables)" font partie de la vitrine d'origine du site et ne s'éditent pas depuis cette interface. Pour les changer, s'adresser à l'administrateur du site.

## Photos : bonnes pratiques

- Préférez des photos horizontales (paysage) : les vignettes sont au format 16/10.
- Quelques photos nettes valent mieux que beaucoup de photos floues ; la limite technique est d'environ 10 Mo par envoi.
- Droit à l'image : assurez-vous d'avoir l'autorisation pour les photos où des mineurs sont reconnaissables, conformément aux autorisations signées à l'inscription.

## Créer un accès pour un autre membre du bureau

1. Allez sur `/admin/utilisateurs/new`.
2. Renseignez nom, email et un mot de passe provisoire, puis transmettez-les à la personne.
3. Chaque compte a les mêmes droits : ne créez d'accès qu'aux personnes qui publient réellement.

## Ce qui ne se gère pas encore depuis l'admin

Les éléments suivants sont mis à jour par l'administrateur du site (une évolution est prévue pour les rendre modifiables ici) :

- Tarifs, horaires des cours, catégories d'âge
- Dates des Tournois Pizzas de la saison
- Fiches entraîneurs et composition du bureau
- Palmarès de la page Le Club
- Envoi effectif de la newsletter (les inscriptions sont bien enregistrées)
