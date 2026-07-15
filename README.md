# L'échappée d'Emma

> **Travel planner indépendante, spécialiste du voyage sur mesure, du Grand Nord et des expériences uniques.**

---

##  Présentation

L'échappée d'Emma est un site vitrine moderne pour une travel planner indépendante basée à Sucy-en-Brie. Il met en avant l'accompagnement personnalisé, les offres sur mesure, les destinations nordiques (Islande, Norvège, Suède, Finlande, Lofoten...) et facilite la prise de contact ou la demande de devis.

- **Voyages dernière minute, week-ends, séjours sur mesure**
- **Expertise Grand Nord, aurores boréales, nature, déconnexion**
- **Accompagnement humain, flexible, sans commission cachée**

##  Fonctionnalités principales

- Présentation claire des offres et destinations
- FAQ interactive (chouette en bas à droite)
- Formulaire de devis et de contact
- Navigation responsive et animations soignées
- SEO optimisé (métadonnées, mots-clés, sitemap)
- Accessibilité et performance (mobile first)

##  Stack technique

- [Vite](https://vitejs.dev/) + [React](https://react.dev/) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- [React Router](https://reactrouter.com/)
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- [Framer Motion](https://www.framer.com/motion/) (animations)
- [Vitest](https://vitest.dev/) (tests)

##  Installation & développement

Prérequis : Node.js >= 18 ou Bun

```sh
# Installation des dépendances
npm install

# Lancer le front Vite
npm run dev

# Lancer l'API locale (contact, devis, avis Google)
npm run server
```

En local, le front appelle l'API via le proxy Vite sur `/api`. En production, renseignez `VITE_CONTACT_API_URL` uniquement si l'API est hébergée sur un domaine différent du site.

##  Build & déploiement

```sh
npm run build
npm run preview # Pour prévisualiser le build
```

Le dossier `dist/` contient le site prêt à être déployé (Netlify, Vercel, OVH, etc).

##  Structure rapide

- `src/pages` : pages principales (Accueil, Prestations, Contact, etc)
- `src/components` : composants réutilisables (Navbar, Footer, FAQ, Cards...)
- `src/assets` : images et médias
- `public/` : fichiers statiques (sitemap, robots.txt, images publiques)

##  SEO & accessibilité

- Balises meta optimisées (title, description, keywords)
- Sitemap.xml et robots.txt fournis
- FAQ riche et mots-clés intégrés
- Responsive, contrastes et navigation clavier

##  FAQ (extraits)

- Qu'est-ce qu'une travel planner indépendante ?
- Pourquoi choisir une travel planner plutôt qu'une agence ?
- Proposes-tu des voyages dernière minute ou week-end ?
- Peux-tu organiser un voyage dans le Grand Nord ?

Retrouvez la FAQ complète sur le site, via la chouette en bas à droite !

##  Contact

- [Site web](https://lechappeedemma.com/)
- [Contact](https://lechappeedemma.com/contact)
- [Demander un devis](https://lechappeedemma.com/devis)
- Sucy-en-Brie, France

---

**Projet open source, contributions bienvenues !**
