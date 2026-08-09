export interface FeaturedProject {
  name: string;
  repo: string;
  description: { fr: string; en: string };
  tags: string[];
  github: string;
  live?: string;
}

export const featuredProjects: FeaturedProject[] = [
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
];

export const profile = {
  name: "Abdu",
  email: "abdur.palta@icloud.com",
  avatar: `${import.meta.env.BASE_URL}photo-de-profil.jpg`,
};