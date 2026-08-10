export interface FeaturedProject {
  name: string;
  repo: string;
  description: { fr: string; en: string };
  tags: string[];
  github?: string;
  live?: string;
  isPrivate?: boolean;
  readme?: { fr: string; en: string };
}

export const featuredProjects: FeaturedProject[] = [
  {
    name: "Facto",
    repo: "facto",
    description: {
      fr: "Application macOS native développée avec Tauri v2 et Vanilla JS pour la création, l'édition sur mesure et la gestion de devis, factures et avoirs pour deux entreprises.",
      en: "Native macOS desktop app built with Tauri v2 and Vanilla JS to create, customize, manage, and export quotes, invoices, and credit notes for two multi-brand companies.",
    },
    tags: ["Tauri v2", "Rust", "JavaScript (ES6)", "HTML5 / Vanilla CSS", "macOS Design System", "html2pdf.js"],
    isPrivate: true,
    readme: {
      fr: `### 🚀 Présentation
**Facto** est une application desktop macOS native conçue sur mesure pour simplifier et accélérer la gestion de la facturation et des devis de deux entreprises aux besoins métiers et réglementaires distincts : **CMARL** (fabrication sur mesure de moustiquaires) et **Green Paysages** (services d'aménagement paysager).

L'application combine la puissance et la légèreté du moteur natif **Tauri v2 (Rust)** pour l'accès sécurisé au système de fichiers macOS, avec une interface utilisateur fluide reprenant les codes visuels de macOS Sonoma/Sequoia (glassmorphism, mode sombre dynamique, barre d'outils translucide).

### ✨ Fonctionnalités clés
- **Gestion Multi-entreprises & Branding dynamique** : Basculement instantané entre CMARL (thème bleu marine, calculs de TVA 10%, RIB, acomptes, zone de signature) et Green Paysages (thème vert forêt, exonération de TVA art. 293 B du CGI, colonnes d'unités).
- **Suite Complète de Documents Financiers** :
  - **Devis** : Période de validité, gestion d'acompte, conditions de règlement et bloc de signature client.
  - **Facture** : Modes et adresses de livraison, calcul des frais de port et suivi du solde réglé.
  - **Avoir** : Lié directement à la référence de la facture initiale avec mentions légales de crédit.
- **Mode Édition Libre** : Rapprochement visuel dynamique permettant de rendre n'importe quel texte ou libellé fixe de la feuille A4 modifiable en direct (\`contenteditable\`).
- **Masquer Logo / Papiers Pré-imprimés** : Masquage du logo en un clic avec restructuration automatique du layout DOM pour réaligner les adresses sur les en-têtes pré-imprimés.
- **Sauvegarde Automatique & Persistance Réactive** : Enregistrement automatique en arrière-plan avec debounce (1,2s) via l'API Native FS de Tauri (avec fallback transparent sur \`localStorage\` sur le Web).
- **Génération PDF & Rendu A4 Haute Fidélité** : Moteur d'exportation PDF au pixel près (\`html2pdf.js\` / \`jsPDF\`) et feuille de style dédiée aux règles d'impression (\`@media print\`).

### 🛠️ Architecture & Choix Techniques
- **Stack** : **Tauri v2 (Rust)** pour le conteneur desktop natif, **Vanilla ES6 Modules** pour une logique métier réactive sans surcharge de framework, et **Vanilla CSS custom properties** pour le design system Apple.
- **Points techniques notables** :
  - **Empreinte ultra-légère & Zéro Framework Heavy** : Utilisation prioritaire des API web natives et d'ES6 Modules, garantissant un démarrage à froid quasi-instantané (< 100ms) et une empreinte RAM minimale (< 30 Mo).
  - **Couche d'Abstraction de Stockage (Web/Natif)** : Module de persistance centralisé (\`storage.js\`) commutant automatiquement entre l'API système natif (\`@tauri-apps/plugin-fs\`) et le stockage navigateur (\`localStorage\`).
  - **Fidélité de Rendu Impression / PDF** : Architecture CSS A4 garantissant un WYSIWYG parfait entre l'aperçu à l'écran, le document imprimé et le fichier PDF généré.`,
      en: `### 🚀 Overview
**Facto** is a custom-built native macOS desktop application engineered to streamline quote and invoice creation for two distinct corporate entities with unique legal and tax requirements: **CMARL** (custom insect screen manufacturing) and **Green Paysages** (landscaping & outdoor design services).

The application pairs the security and speed of a **Tauri v2 (Rust)** desktop backend with a lightweight frontend adhering to macOS Sonoma/Sequoia UI design guidelines (glassmorphism, dynamic native dark mode, translucent toolbar).

### ✨ Key Features
- **Multi-Brand & Enterprise Switching**: Instant toggle between CMARL (navy blue theme, 10% VAT calculation, bank details, deposit tracking, customer signature block) and Green Paysages (forest green theme, French CGI art. 293 B VAT exemption, unit-based line items).
- **Financial Document Suite**:
  - **Quotes (Devis)**: Validity period, custom deposit percentage, payment terms, and integrated signature box.
  - **Invoices (Facture)**: Delivery terms, shipping fee calculations, delivery addresses, and paid balance tracking.
  - **Credit Notes (Avoir)**: Linked initial invoice reference and regulatory credit notice.
- **Free Edit Mode**: Turn any static label or fixed title on the live A4 sheet into an inline editable field on the fly (\`contenteditable\`).
- **Logo Toggle for Pre-Printed Stationery**: Instantly hide corporate logos and dynamically shift DOM address elements to match physical pre-printed letterheads.
- **Auto-Save & Reactive Persistence**: Debounced (1.2s) background auto-saving via Tauri Native FS API with an automatic browser fallback (\`localStorage\`).
- **High-Fidelity PDF Engine & A4 Print**: Pixel-perfect PDF rendering (\`html2pdf.js\` / \`jsPDF\`) combined with print-optimized CSS (\`@media print\`).

### 🛠️ Architecture & Tech Stack
- **Stack**: **Tauri v2 (Rust)** for native macOS app containerization & file system access, **Vanilla ES6 Modules** for lightweight reactive logic without framework overhead, and **Vanilla CSS** with custom properties for the macOS design system.
- **Technical Highlights**:
  - **Zero-Framework Lightweight Footprint**: Pure Vanilla JS/HTML5 DOM implementation ensuring near-instant cold boot times (< 100ms) and low RAM consumption (< 30MB).
  - **Seamless Native/Web Abstraction Layer**: Storage module (\`storage.js\`) dynamically toggling between native file system plugin operations (\`@tauri-apps/plugin-fs\`) and browser \`localStorage\`.
  - **Pixel-Perfect A4 Layout Engine**: Document stylesheet isolation ensuring exact WYSIWYG parity between the screen preview, printed page, and exported PDF files.`,
    },
  },
  {
    name: "CinéLyon App",
    repo: "cinelyon-app",
    description: {
      fr: "Application mobile native iOS/Android développée avec React Native (Expo SDK 52) et Supabase pour centraliser la consultation des séances, horaires et cinémas de la métropole lyonnaise.",
      en: "Native iOS & Android mobile app built with React Native (Expo SDK 52) and Supabase to consolidate movie showtimes, schedules, and theaters across the Lyon metropolitan area.",
    },
    tags: [
      "React Native",
      "Expo SDK 52",
      "TypeScript",
      "Swift (iOS Widget)",
      "Supabase",
      "TanStack Query",
      "MMKV",
    ],
    isPrivate: true,
    readme: {
      fr: `### 🚀 Présentation
**CinéLyon** est une application mobile cross-platform (iOS & Android) développée pour les passionnés de cinéma dans la métropole lyonnaise. Elle réunit en un lieu unique l'ensemble des films à l'affiche, les horaires complets des séances, les bandes-annonces, les détails des films et les cinémas de la région (UGC, Pathé, Comoedia, complexes indépendants).

L'application s'appuie sur une architecture **Offline-First** ultra-performante et intègre une extension native **Widget iOS en Swift** (compatible iOS 15.1+) pour consulter les séances à tout moment directement depuis l'écran d'accueil du smartphone.

### ✨ Fonctionnalités clés
- **Consultation complète des séances & films** : Tri et affichage dynamique des séances par jour, version (VF / VOSTFR), format (IMAX, 3D, 4K, Dolby) et réseaux de cinémas de la métropole de Lyon.
- **Filtrage avancé & Recherche instantanée** : Filtres rapides par cinéma, date, type de séance ou genre avec réponse visuelle immédiate.
- **Widget iOS Natif (Swift / SwiftUI)** : Extension native développée en Swift via \`@bacons/apple-targets\` (cible iOS 15.1+), partageant son état avec l'application hôte via un App Group iOS (\`group.fr.cinelyon.app\`).
- **Export Calendrier & Intégration Système** : Ajout d'une séance directement dans le calendrier natif du smartphone (\`expo-calendar\`), retours haptiques (\`expo-haptics\`) et icônes d'application dynamiques personnalisables.
- **Synchronisation Favoris & Authentification** : Authentification et persistance des films et cinémas favoris synchronisés en temps réel via Supabase.
- **Fiche Film & Média** : Détails exhaustifs, intégration des bandes-annonces vidéo YouTube, géolocalisation des salles sur cartes interactives (\`react-native-maps\`) et liens directs vers la billetterie.

### 🛠️ Architecture & Choix Techniques
- **Stack** : **React Native (Expo SDK 52)**, **Expo Router v4** (routing basé sur le système de fichiers), **TypeScript strict**, **Supabase** (Auth & Base de données) et **Swift** (Widget iOS natif).
- **Points techniques notables** :
  - **Architecture Offline-First & Cache MMKV** : Utilisation de TanStack React Query couplé à \`react-native-mmkv\` pour la persistance du cache sur disque, garantissant une réponse instantanée et une consultation 100% fonctionnelle hors-ligne.
  - **Optimisations des performances UI à 60 FPS** : Gestion fluide des animations et du scroll exécutée directement sur le thread UI natif grâce à \`react-native-reanimated\` (évitant tout re-render inutile du thread JS). Mémoïsation stricte des styles (\`useMemo\`) et des sous-composants (\`React.memo\`).
  - **Sécurité & Stockage Chiffré** : Adaptateur d'authentification Supabase personnalisé s'appuyant sur \`expo-secure-store\` (Keychain AES-256 sur iOS, EncryptedSharedPreferences sur Android) pour la protection des tokens d'accès.
  - **Compatibilité Native iOS 15.1 Strict** : Extension native configurée et testée pour garantir une compatibilité ascendante parfaite sur les appareils sous iOS 15.1+ sans dépendre des APIs WidgetKit restreintes aux OS plus récents (iOS 16/17+).`,
      en: `### 🚀 Overview
**CinéLyon** is a cross-platform mobile application (iOS & Android) designed for moviegoers across the Lyon metropolitan area. It aggregates all movies currently playing, full showtime schedules, trailers, film details, and theater locations (UGC, Pathé, Comoedia, independent arthouse cinemas) into a single, cohesive experience.

Engineered with a high-performance **Offline-First** architecture, CinéLyon also features a native **iOS Swift Widget** (iOS 15.1+ compatible) allowing users to check upcoming showtimes directly from their iPhone home screen.

### ✨ Key Features
- **Comprehensive Showtime & Movie Directory**: Dynamic breakdown of showtimes by day, audio version (VF / VOSTFR), format (IMAX, 3D, 4K, Dolby), and theater chain.
- **Advanced Filtering & Instant Search**: Rapid filters by cinema chain, date, audio/format specs, or genre with instantaneous UI updates.
- **Native iOS Widget (Swift / SwiftUI)**: Native iOS extension built in Swift using \`@bacons/apple-targets\` (iOS 15.1+ target), sharing state with the main application via an Apple App Group (\`group.fr.cinelyon.app\`).
- **Native Calendar Sync & System Integration**: One-tap showtime export to the native device calendar (\`expo-calendar\`), custom dynamic app icons (\`expo-dynamic-app-icon\`), and subtle haptic feedback (\`expo-haptics\`).
- **Favorites Sync & Auth**: Supabase-powered authentication with real-time cloud sync for user favorite movies and preferred theaters.
- **Rich Movie Details & Media**: In-depth film sheets, embedded YouTube trailers, interactive theater location maps (\`react-native-maps\`), and direct ticketing links.

### 🛠️ Architecture & Tech Stack
- **Stack**: **React Native (Expo SDK 52)**, **Expo Router v4** (file-system routing), **Strict TypeScript**, **Supabase** (Auth & DB), and **Swift** (Native iOS Widget target).
- **Technical Highlights**:
  - **Offline-First Architecture & MMKV Cache**: Powered by TanStack React Query persisted to disk via \`react-native-mmkv\`. Guarantees near-instantaneous load times and full offline usability.
  - **60 FPS UI Thread Performance**: Gesture-driven animations and scroll handling offloaded to the native UI thread via \`react-native-reanimated\` (zero JS thread overhead). Strict memoization of styles (\`useMemo\`) and subcomponents (\`React.memo\`).
  - **Encrypted Security Layer**: Custom Supabase auth storage adapter backed by \`expo-secure-store\` (Keychain AES-256 on iOS, EncryptedSharedPreferences on Android) for safe credential handling.
  - **Strict iOS 15.1 Deployment Target**: Native extension target engineered specifically to maintain compatibility with iOS 15.1+ devices without reliance on iOS 16/17+ restricted WidgetKit APIs.`,
    },
  },
  {
    name: "Green Paysage",
    repo: "greenpaysages",
    description: {
      fr: "Plateforme web vitrine & expérience interactive haut de gamme dédiée à la création et à l'aménagement d'espaces verts d'exception.",
      en: "High-end showcase website & interactive web experience designed for an exceptional landscape design and outdoor creation firm.",
    },
    tags: ["JavaScript (ES6+)", "Tailwind CSS", "HTML5", "CSS3", "Container Queries", "Intersection Observer"],
    isPrivate: true,
    readme: {
      fr: `### 🚀 Présentation
**Green Paysage** est une vitrine web moderne et immersive conçue pour valoriser le savoir-faire d'une entreprise spécialisée dans l'aménagement paysager et l'entretien d'espaces verts d'exception en Île-de-France.

L'objectif principal de ce projet est de combiner l'élégance éditoriale d'un studio d'architecture extérieure avec des leviers de conversion optimisés (génération de devis rapides, mise en avant du crédit d'impôt SAP 50%, barre d'action sticky mobile). L'application offre une expérience utilisateur ultra-fluide centrée sur la démonstration visuelle des métamorphoses paysagères.

### ✨ Fonctionnalités clés
- **Slider comparatif Avant / Après interactif** : Composant sur-mesure permettant aux visiteurs de comparer les chantiers par glissement tactile ou curseur en temps réel.
- **Layout éditorial & Grille de réalisations** : Présentation alternée des prestations (Conception, Élagage, Équipements) et galerie photos avec filtres visuels et badges thématiques.
- **Bloc d'information fiscale interactif (SAP)** : Mise en valeur stratégique de l'éligibilité au crédit d'impôt de 50 % (Services à la Personne) avec micro-animations et calcul visuel.
- **Formulaire de captation de leads (Devis 24h)** : Formulaire de contact dynamique avec validation en temps réel, gestion de l'état d'envoi et conformité RGPD.
- **Navigation & Mobile Sticky Bar** : Barre de navigation adaptative avec effet *glassmorphism* au défilement et barre de conversion fixe (*Appeler / Devis*) réservée aux appareils mobiles.
- **Section Témoignages & Preuve Sociale** : Intégration de la note Google (4.9/5 sur 127+ avis) et grille de citations au design typographique raffiné.

### 🛠️ Architecture & Choix Techniques
- **Stack Front-end Légère & Performante** : Développé en **HTML5 sémantique**, **CSS3 sur-mesure** et **JavaScript Vanilla (ES6+)** pour garantir un temps de chargement minimal et des performances optimales sans la lourdeur d'un framework.
- **Slider Avant/Après basé sur les CSS Container Queries** : Utilisation des unités modernes CSS (\`100cqw\`, \`container-type: inline-size\`) couplées à un \`<input type="range">\` natif, évitant l'utilisation de bibliothèques externes tierces.
- **Animations & Scroll Reveal via IntersectionObserver** : Apparition progressive des sections au défilement optimisée pour le GPU sans surcharge du thread principal (*passive listeners*).
- **Design System Éditorial & Typographie sur-mesure** : Palette de couleurs sur-mesure (*Canopy*, *Sage*, *Mousse*, *Grès*, *Calcaire*, *Or*) et combinaison typographique soignée (*Cormorant Garamond* pour les titres et *DM Sans* pour le corps).
- **Accessibilité & Résilience Progressive** : Prise en charge des lecteurs d'écran (labels ARIA explicites), optimisation SEO natif et fallback CSS \`<noscript>\` garantissant l'affichage complet du contenu même si JavaScript est désactivé.`,
      en: `### 🚀 Overview
**Green Paysage** is a modern, immersive showcase web platform crafted for a high-end landscape design and maintenance company operating in the Île-de-France region.

The core goal of this project is to blend the editorial elegance of an outdoor architecture firm with high-converting user experience patterns (quick quote requests, 50% personal service tax credit highlights, mobile-optimized sticky call-to-action bar). The platform delivers a silky-smooth user experience centered around visual transformations of outdoor spaces.

### ✨ Key Features
- **Interactive Before / After Comparison Slider**: Custom slider component enabling visitors to dynamically compare landscape transformations in real-time using touch or mouse drag.
- **Editorial Layout & Project Gallery**: Alternating service showcases (Design, Pruning, Custom Landscaping) alongside a photo gallery featuring thematic badges.
- **Tax Credit Highlight Block (SAP)**: Strategic callout block explaining 50% personal service tax credit eligibility with custom badge indicators and clear visual hierarchy.
- **Lead Capture & Quote Request Form**: Interactive quote form with real-time feedback, simulated asynchronous submission, and GDPR consent compliance.
- **Adaptive Navigation & Mobile Sticky CTA Bar**: Glassmorphic scroll-aware header alongside a fixed bottom action bar (*Call / Free Quote*) tailored for mobile conversions.
- **Social Proof & Testimonials Grid**: Integration of verified Google Reviews rating (4.9/5 across 127+ reviews) and typographic customer quote blocks.

### 🛠️ Architecture & Tech Stack
- **Lightweight & High-Performance Stack**: Built with **Semantic HTML5**, **Custom CSS3**, and **Vanilla JavaScript (ES6+)**, eliminating heavy framework overhead to achieve near-instant initial load times.
- **Zero-Dependency Slider via CSS Container Queries**: Implemented using cutting-edge CSS Container Queries (\`100cqw\`, \`container-type: inline-size\`) bound to native range inputs via CSS custom properties.
- **GPU-Accelerated Scroll Animations**: Viewport element reveals powered by the native \`IntersectionObserver\` API with passive event listeners for smooth 60fps scrolling.
- **Tailored Editorial Design System**: Custom HSL color palette (*Canopy*, *Sage*, *Mousse*, *Grès*, *Calcaire*, *Gold*) combined with pairing of serif display fonts (*Cormorant Garamond*) and clean sans-serif body typography (*DM Sans*).
- **Accessibility & Progressive Enhancement**: Fully compliant with accessibility standards (explicit ARIA attributes), native SEO meta tags, and a \`<noscript>\` CSS fallback ensuring content visibility if JavaScript is disabled.`,
    },
  },
  {
    name: "CinéLyon",
    repo: "cinelyon",
    description: {
      fr: "Toutes les séances de cinéma à Lyon, en un seul endroit.",
      en: "All movie showtimes in Lyon, in one place.",
    },
    tags: ["TypeScript", "Web"],
    github: "https://github.com/abdu-63/cinelyon",
    live: "https://cinelyon.fr",
  },
  {
    name: "BeeperLite",
    repo: "BeeperLite",
    description: {
      fr: "Application iOS légère.",
      en: "A lightweight iOS app.",
    },
    tags: ["Swift", "iOS"],
    github: "https://github.com/abdu-63/BeeperLite",
  },
  {
    name: "Converto",
    repo: "converto",
    description: {
      fr: "Convertisseur pour iOS.",
      en: "A converter for iOS.",
    },
    tags: ["Swift", "iOS"],
    github: "https://github.com/abdu-63/converto",
  },
  {
    name: "Chatbot",
    repo: "chatbot",
    description: {
      fr: "Un chatbot conversationnel.",
      en: "A conversational chatbot.",
    },
    tags: ["Python", "IA"],
    github: "https://github.com/abdu-63/chatbot",
  },
  {
    name: "Erreur-prix",
    repo: "erreur-prix",
    description: {
      fr: "Scrapeur pour détecter les erreurs de prix sur l'e-commerce.",
      en: "Scraper to detect pricing errors on e-commerce sites.",
    },
    tags: ["Python", "Scraping"],
    github: "https://github.com/abdu-63/erreur-prix",
  },
  {
    name: "Hide-Letterboxd-Rating",
    repo: "Hide-Letterboxd-Rating",
    description: {
      fr: "Masque automatiquement les notes sur les films non vus sur Letterboxd.",
      en: "Automatically hides ratings on unseen films on Letterboxd.",
    },
    tags: ["JavaScript", "Extension"],
    github: "https://github.com/abdu-63/Hide-Letterboxd-Rating",
  },
];

export const githubUsername = "abdu-63";

export const excludedRepos = [
  "LearnC",
  "ece-web",
  "can-i-project",
  "application-IoT-JavaScript",
  "c-marl",
  "Lecteur-m3u",
  "GaspStream4",
  "agora",
  "cinelyon-app-old",
  "cinelyon-ece",
  "cinelyon-app",
  "facto",
  "greenpaysages",
];

export const profile = {
  name: "Abdu",
  email: "abdur.palta@icloud.com",
  avatar: `${import.meta.env.BASE_URL}photo-de-profil.jpg`,
};