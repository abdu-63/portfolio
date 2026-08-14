# Instructions pour les Agents IA

## Contexte & Stack Technique

Site portfolio personnel monopage (SPA) pour **Abdu**, inspiré par les standards de design d'Apple (typographie soignée, micro-animations physiques, matériaux translucides et hiérarchie épurée). Il met en avant une sélection de projets phares (liste manuelle) ainsi que l'ensemble des dépôts GitHub publics (récupérés dynamiquement via l'API GitHub). Le site est bilingue (FR/EN) et gère le basculement dynamique de thème clair/sombre.

- **Frontend :** React 19 + TypeScript (~strict)
- **Tooling & Build :** Vite 8 (HMR, build rapide), oxlint (linter)
- **Animations :** framer-motion (ressorts, transitions fluides)
- **Styles :** CSS pur via `src/index.css` (variables CSS custom pour le theming, tokens responsives, respect de `prefers-reduced-motion`)
- **Déploiement :** GitHub Pages sous le base path `/portfolio/`

---

## Compétences Locales Actives (`./skills/`)

| Compétence | Source | Moment d'invocation | Objectif |
| :--- | :--- | :--- | :--- |
| `to-spec` | Global (`.agents`) | Cadrage initial / Spécification | Transformer la conversation et l'analyse en spécification technique exploitable sans redemander d'interview. |
| `to-tickets` | Global (`.agents`) | Planification / Découpage | Découper un plan ou une spécification en tickets de tranches verticales bloquantes. |
| `codebase-design` | Global (`.agents`) | Conception d'architecture / Refactoring | Concevoir des modules profonds avec des interfaces claires et une forte testabilité. |
| `domain-modeling` | Global (`.agents`) | Modélisation métier / Conception | Clarifier et documenter le modèle de domaine, le vocabulaire et les décisions architecturales. |
| `tdd` | Global (`.agents`) | Développement de fonctionnalités / Fixes | Guider le cycle Red-Green-Refactor et assurer la robustesse du code. |
| `diagnosing-bugs` | Global (`.agents`) | Phase de débogage / Régression | Diagnostic méthodique et rigoureux des bugs complexes et des régressions de performance. |
| `code-review` | Global (`.agents`) | Fin d'implémentation / Avant merge | Revue à deux axes (Conformité aux standards du repo & Respect de la spec). |
| `handoff` | Global (`.agents`) | Fin de session / Transition | Résumer la session et préparer un document de passation clair pour l'agent suivant. |
| `ui-ux-pro-max` | Global (`.agents`) | Conception & implémentation UI/UX | Intelligence design, accessibilité (a11y), responsive design, tokens et typographie. |
| `frontend-design` | Global / Antigravity | Création ou refonte visuelle | Direction artistique distinctive, choix de palettes et typographies sur mesure sans effet générique. |
| `vercel-react-best-practices` | Global / Antigravity | Développement & optimisation React | Optimisation des performances, patterns de rendu React 19 et pratiques d'ingénierie modernes. |
| `apple-design` | Global / Antigravity | Design système & interactions fluides | Principes de design Apple, animations fluides (springs), matériaux translucides et profondeur. |
| `emil-design-eng` | Global / Antigravity | Polish UI & micro-interactions | Philosophie d'ingénierie design, finitions soignées et détails invisibles qui font la qualité. |
| `animate` | Global / Antigravity | Création d'animations & transitions | Construire des animations physiques et interactives de zéro (framer-motion, CSS). |
| `review-animations` | Global / Antigravity | Revue de motion design | Évaluer et critiquer le code d'animation selon un standard d'excellence élevé. |

---

## Règles d'Exécution

1. **Priorité locale :** Tu dois systématiquement consulter et exécuter les instructions présentes dans `./skills/<nom-du-skill>/SKILL.md` pour chaque phase correspondante (spécification, TDD, reproduction de bug, revue, ergonomie, animation).
2. **Pas de dérive globale :** N'utilise aucune directive liée à des domaines non présents dans ce dossier local (ex. exclure strictement tout outillage Roblox, Shopify/Weaverse ou backend lourd).
3. **Bilinguisme strict :** Tous les textes de l'interface doivent utiliser le helper `t(fr, en, lang)` (`src/i18n.tsx`). Ne jamais coder de texte en dur dans le JSX.
4. **Theming via variables CSS :** Toutes les couleurs doivent provenir des custom properties définies dans `src/index.css` (`:root` et `:root[data-theme="dark"]`).
5. **Gestion des chemins statiques :** Le projet étant déployé sous `/portfolio/`, tout asset statique dans `public/` doit impérativement être préfixé par `import.meta.env.BASE_URL`.
6. **Intégrité des données :** Toutes les données de contenu résident dans `src/data/projects.ts`. L'attribut `repo` des projets vedettes doit correspondre exactement au nom de repo GitHub pour éviter les doublons lors du fetch live.
7. **Validation :** Toute modification doit être validée avec `npm run build` (`tsc -b && vite build`) et `npm run lint` (`oxlint`).

---

## Structure du Projet

```
.
├── index.html               # Point d'entrée HTML (lang="fr", titre, favicon)
├── vite.config.ts           # base: '/portfolio/' pour gh-pages
├── package.json             # scripts: dev, build, lint, preview, deploy
├── public/
│   └── photo-de-profil.jpg  # Avatar (référencé via BASE_URL)
├── skills/                  # Compétences locales actives pour les agents IA
└── src/
    ├── main.tsx             # Racine React (StrictMode)
    ├── App.tsx              # Composition des providers et des sections
    ├── index.css            # Styles globaux, variables CSS, responsive, reduced-motion
    ├── i18n.tsx             # I18nProvider, useLang, helper t()
    ├── theme.tsx            # ThemeProvider, useTheme (light/dark)
    ├── data/
    │   └── projects.ts      # FeaturedProject type, featuredProjects, githubUsername, excludedRepos, profile
    └── components/
        ├── Navbar.tsx       # Navigation sticky translucide + toggles FR/EN & thème
        ├── Hero.tsx         # Avatar, titre, sous-titre, CTAs
        ├── Projects.tsx     # Cartes projets mis en avant + listing API GitHub
        ├── About.tsx        # Bio + tags de compétences
        ├── Services.tsx     # Prestations & expertises proposées
        └── Contact.tsx      # Formulaire / liens email & GitHub
```

---

## Commandes Utiles

```bash
npm run dev       # Démarre le serveur de dev Vite (HMR)
npm run build     # Typecheck (tsc -b) + build production dans dist/
npm run preview   # Prévisualise le build de production localement
npm run lint      # Linter oxlint (0 erreur attendue)
npm run deploy    # Build et publie le dossier dist/ sur la branche gh-pages
```