# Les Petits Plats

![GitHub repo size](https://img.shields.io/github/repo-size/raphaelsanchez/oc-p7-les-petits-plats)
![GitHub top language](https://img.shields.io/github/languages/top/raphaelsanchez/oc-p7-les-petits-plats)
![GitHub package.json version](https://img.shields.io/github/v/tag/raphaelsanchez/oc-p7-les-petits-plats?label=version&sort=semver)
![GitHub last commit](https://img.shields.io/github/last-commit/raphaelsanchez/oc-p7-les-petits-plats)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/raphaelsanchez/oc-p7-les-petits-plats/static-deploy.yml)

![Screenshot](https://raphaelsanchez.design/oc-p7-les-petits-plats/screenshot.png)

Projet réalisé dans le cadre du programme de formation Développeur Front-end JavaScript React chez [OpenClassrooms](https://openclassrooms.com)

## Context du projet

Développeur freelance, missionné par une entreprise en tant que Développeur Front-end.

L’entreprise souhaite se lancer dans la création d’un site web de recettes de cuisine à l’instar de Marmiton ou 750g. Pour faire la différence avec ses concurrents, l’entreprise souhaite que le moteur de recherche des recettes sur le site soit rapide et fluide.

Mon rôle est de développer tout l’aspect Front-end du site à partir de maquettes, de réaliser un algorithme de recherche pour les recettes et de faire une fiche d’investigation de fonctionnalité pour cet algorithme pour l’équipe Back-end.

### Scénario nominal

1. La recherche doit pouvoir se faire via le champ principal ou via les tags (ingrédients, ustensiles ou appareil)
2. La recherche principale se lance à partir de 3 caractères entrés par l’utilisateur dans la barre de recherche
3. La recherche s’actualise pour chaque nouveau caractère entré
4. La recherche principale affiche les premiers résultats le plus rapidement possible
5. Les champs ingrédients, ustensiles et appareil de la recherche avancée proposent seulement les éléments restant dans les recettes présentes sur la page
6. Les retours de recherche doivent être une intersection des résultats. Si l’on ajoute les tags “coco” et “chocolat” dans les ingrédients, on doit récupérer les recettes qui ont à la fois de la coco et du chocolat.
7. Comme pour le reste du site, le code HTML et CSS pour l’interface (avec ou sans Bootstrap) devra passer avec succès le validateur W3C.
8. Aucune librairie ne sera utilisée pour le JavaScript du moteur de recherche

### Compétences évaluées

- Analyser un problème informatique
- Développer un algorithme pour résoudre un problème

### Technologies utilisées

- HTML5
- JavaScript
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [pnpm](https://pnpm.io/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)

### Validations du code

- [W3C Validator](https://validator.w3.org/) - validation HTML
- [JSBen.ch](https://jsben.ch/) - test de performance de l'algorithme de recherche
- [WAVE](https://wave.webaim.org/) - validation d'accessibilité basique
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - audit de performance, accessibilité, bonnes pratiques et référencement

## Installation 🚀

1. Cloner le projet
2. Lancer la commande `pnpm install` (ou `npm install`) pour installer les dépendances
3. Lancer la commande `pnpm build` (ou `npm build`) pour compiler le projet
4. Lancer la commande `pnpm preview` (ou `npm preview`) pour lancer le serveur de développement

## Auteur

[Raphael Sanchez](https://www.linkedin.com/in/raphael-sanchez-design/)

## Bugs report

Si vous trouvez un bug, vous pouvez [ouvrir une issue](https://github.com/raphaelsanchez/oc-p7-les-petits-plats/issues).

> NB : Étant un projet de formation aucune garantie qu'il sera corrigé mais on apprend toujours beaucoup de ces erreurs 😊.
