import { motion } from "framer-motion";
import { useLang, t } from "../i18n";
import { profile } from "../data/projects";

const skillCategories = [
  {
    name: { fr: "Langages Core", en: "Core Languages" },
    skills: ["TypeScript", "JavaScript", "Swift", "Rust", "Python", "SQL", "HTML5 / CSS3"],
  },
  {
    name: { fr: "Frameworks & UI", en: "Frameworks & UI" },
    skills: ["React 19", "Next.js", "React Native", "Expo SDK", "Tauri v2", "Vite", "Tailwind CSS"],
  },
  {
    name: { fr: "Mobile & Backend", en: "Mobile & Backend" },
    skills: ["SwiftUI / Swift Widget", "Node.js", "Supabase", "REST APIs", "MMKV", "SQLite"],
  },
];

const pillars = [
  {
    num: "01",
    title: { fr: "Architecture Offline-First", en: "Offline-First Architecture" },
    desc: { fr: "Persistance locale instantanée (MMKV / Native FS) avec sync cloud.", en: "Instant local persistence (MMKV / Native FS) paired with cloud sync." },
  },
  {
    num: "02",
    title: { fr: "UI Fluide à 60 FPS", en: "Silky 60 FPS UI" },
    desc: { fr: "Animations exécutées sur le thread natif sans surcharge JS.", en: "Native UI thread animations powered by Reanimated & Framer Motion." },
  },
  {
    num: "03",
    title: { fr: "Solutions Desktop & Mobile", en: "Cross-Platform Engineering" },
    desc: { fr: "Apps natives macOS avec Tauri (Rust) et apps mobiles iOS/Android.", en: "Native macOS apps with Tauri (Rust) alongside iOS/Android mobile apps." },
  },
];

export default function About() {
  const { lang } = useLang();

  return (
    <section id="about" className="about-canvas-section">
      <div className="section-header">
        <div className="section-tag">
          <span className="slash">/</span> {t("À PROPOS DE MOI", "ABOUT ME", lang)}
        </div>
        <h2 className="section-title-large">
          {t("Parcours & Mindset", "Background & Engineering Mindset", lang)}
        </h2>
      </div>

      {/* Hero Bio Statement Directly on Canvas */}
      <motion.div
        className="about-hero-block"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="status-pill">
          <div className="status-dot-container">
            <span className="status-dot-ping" />
            <span className="status-dot" />
          </div>
          <span className="status-text">{t(profile.availability.fr, profile.availability.en, lang)}</span>
          <span className="status-pill-divider" />
          <div className="status-location-badge">
            <svg className="status-location-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>{profile.location}</span>
          </div>
        </div>

        <p className="about-giant-statement">
          {t(
            "Je conçois et déploie des applications web réactives, des applications mobiles iOS/Android et des logiciels desktop sur mesure.",
            "I design, build, and deploy responsive web apps, native iOS/Android mobile applications, and custom desktop software.",
            lang
          )}
        </p>

        <p className="about-sub-statement">
          {t(
            "Mon approche repose sur l'utilisation des meilleures technologies modernes (React, TypeScript, Swift, Tauri/Rust) pour créer des produits fiables, ultra-rapides et agréables à utiliser au quotidien.",
            "My engineering philosophy relies on leveraging modern tech stacks (React, TypeScript, Swift, Tauri/Rust) to deliver reliable, fast, and delightful software.",
            lang
          )}
        </p>
      </motion.div>

      {/* Frameless Horizontal Stats Row */}
      <motion.div
        className="about-stats-strip"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="about-stat-cell">
          <div className="about-stat-number">6+</div>
          <div className="about-stat-label">{t("Projets majeurs", "Featured projects", lang)}</div>
        </div>
        <div className="about-stat-divider" />
        <div className="about-stat-cell">
          <div className="about-stat-number">10+</div>
          <div className="about-stat-label">{t("Dépôts publics", "Public repos", lang)}</div>
        </div>
        <div className="about-stat-divider" />
        <div className="about-stat-cell">
          <div className="about-stat-number">3</div>
          <div className="about-stat-label">{t("Plateformes (Web/Mobile/Desktop)", "Platforms", lang)}</div>
        </div>
      </motion.div>

      {/* 2-Column Frameless Details (Pillars & Tech Stack) */}
      <div className="about-details-grid">
        <motion.div
          className="about-details-col"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <h3 className="about-col-title">{t("Principes d'Ingénierie", "Engineering Principles", lang)}</h3>
          <div className="about-pillars-list">
            {pillars.map((p) => (
              <div key={p.title.en} className="about-pillar-row">
                <div className="about-pillar-line" />
                <div className="about-pillar-content">
                  <div className="about-pillar-title">{p.title[lang]}</div>
                  <div className="about-pillar-desc">{p.desc[lang]}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="about-details-col"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <h3 className="about-col-title">{t("Stack & Compétences", "Tech Stack & Skills", lang)}</h3>
          <div className="about-stack-groups">
            {skillCategories.map((cat) => (
              <div key={cat.name.en} className="about-stack-group">
                <div className="about-stack-label">{cat.name[lang]}</div>
                <div className="about-chips-row">
                  {cat.skills.map((skill) => (
                    <span key={skill} className="tag-chip">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}