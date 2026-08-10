# Portfolio — Abdu

Site portfolio web moderne et épuré, inspiré du **Design System Apple**. Conçu pour présenter les projets phares (applications macOS natives, React Native iOS/Android, expériences Web) et synchroniser en temps réel la liste des dépôts GitHub publics via l'API GitHub.

**Démo en ligne** : [https://abdu-63.github.io/portfolio/](https://abdu-63.github.io/portfolio/)

---

## Fonctionnalités & Points forts

- **Design inspiré d'Apple** : Esthétique soignée, cartes glassmorphiques, typographies épurées, animations fluides pilotées par la physique des ressorts (*framer-motion*).
- **Bilingue (FR / EN)** : Prise en charge native du changement de langue instantané avec persistance automatique dans le `localStorage`.
- **Thème Sombre / Clair** : Basculement dynamique géré via variables CSS personnalisées (`data-theme`) et persistance des préférences.
- **Modales de Projets Privés** : Vue détaillée interactive avec fiches techniques exhaustives, architecture, stack et choix techniques pour les projets phares (*Facto*, *CinéLyon App*, *Green Paysage*).
- **Intégration API GitHub** : Récupération dynamique et dédoublonnée des dépôts publics GitHub avec gestion des états d'erreur et de chargement.
- **Performances maximales** : Stack ultra-légère sans framework CSS superflu, démarrage instantané et animations 60 FPS respectant `prefers-reduced-motion`.

---

## Stack Technique

| Catégorie | Technologies |
| :--- | :--- |
| **Framework UI** | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| **Build & Dev Tool** | [Vite 8](https://vitejs.dev/) |
| **Animations** | [Framer Motion 13](https://www.framer.com/motion/) |
| **Linter** | [Oxlint](https://oxc.rs/) |
| **Styles & Theming** | Vanilla CSS3 (Variables CSS, Glassmorphism, Responsive) |
| **Déploiement** | GitHub Pages (`gh-pages`) |

---

## Structure du Projet

```
.
├── index.html               # Entrée HTML principale
├── vite.config.ts           # Configuration Vite (base path: /portfolio/)
├── package.json             # Dépendances & scripts de build/lint
├── public/
│   └── photo-de-profil.jpg  # Photo d'avatar
└── src/
    ├── main.tsx             # Point d'entrée React (StrictMode)
    ├── App.tsx              # Composant racine (Providers + Sections)
    ├── index.css            # Feuille de style globale (variables CSS, responsive, thèmes)
    ├── i18n.tsx             # Provider bilingue (FR/EN) + hook useLang & helper t()
    ├── theme.tsx            # Provider de thème (clair/sombre) + hook useTheme
    ├── data/
    │   └── projects.ts      # Liste des projets mis en avant, descriptions & API config
    └── components/
        ├── Navbar.tsx       # Navigation translucide sticky + toggles langue/thème
        ├── Hero.tsx         # Présentation principale & liens d'action
        ├── Projects.tsx     # Cartes de projets phares, modales détaillées & repos GitHub
        ├── About.tsx        # Bio, parcours et compétences
        └── Contact.tsx      # Formulaire/liens de contact et réseaux
```

---

## Prise en main

### Prérequis
- **Node.js** (v18+ recommandé)
- **npm**

### Installation
```bash
git clone https://github.com/abdu-63/portfolio.git
cd portfolio
npm install
```

### Commandes disponibles

```bash
npm run dev       # Lancer le serveur de développement Vite (http://localhost:5173/portfolio/)
npm run build     # Vérification TypeScript (tsc -b) + Build de production dans dist/
npm run lint      # Analyse du code avec Oxlint
npm run preview   # Prévisualisation locale du build de production
npm run deploy    # Build et publication automatique sur la branche gh-pages
```

---

## Licence & Contact

Développé par **Abdu**.
- **GitHub** : [@abdu-63](https://github.com/abdu-63)
- **Email** : [abdur.palta@icloud.com](mailto:abdur.palta@icloud.com)

