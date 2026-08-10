import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang, t } from "../i18n";
import { featuredProjects, githubUsername, excludedRepos, type FeaturedProject } from "../data/projects";
import { LockIcon, RocketIcon, SparklesIcon, ToolsIcon } from "./Icons";

interface Repo {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  fork: boolean;
  homepage: string | null;
}

function parseFormattedText(text: string) {
  const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={index} className="inline-code">{part.slice(1, -1)}</code>;
    }
    return part;
  });
}

function FormattedReadme({ content }: { content: string }) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let currentList: { indent: number; text: string }[] = [];

  const flushList = (keyPrefix: string) => {
    if (currentList.length === 0) return;
    elements.push(
      <ul key={`list-${keyPrefix}`} className="readme-list">
        {currentList.map((item, idx) => (
          <li key={idx} style={{ marginLeft: item.indent > 0 ? "1.2rem" : 0 }}>
            {parseFormattedText(item.text)}
          </li>
        ))}
      </ul>
    );
    currentList = [];
  };

  lines.forEach((line, idx) => {
    const trimmed = line.trim();
    if (!trimmed) {
      flushList(`${idx}`);
      return;
    }

    if (trimmed.startsWith("### ")) {
      flushList(`${idx}`);
      const rawText = trimmed.slice(4).replace(/^[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\s]+/u, "");
      let iconNode: React.ReactNode = null;
      if (rawText.includes("Présentation") || rawText.includes("Overview")) {
        iconNode = <RocketIcon size={16} />;
      } else if (rawText.includes("Fonctionnalités") || rawText.includes("Features")) {
        iconNode = <SparklesIcon size={16} />;
      } else if (rawText.includes("Architecture") || rawText.includes("Tech Stack")) {
        iconNode = <ToolsIcon size={16} />;
      }
      elements.push(
        <h4 key={`h-${idx}`} className="readme-heading" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
          {iconNode}
          <span>{rawText}</span>
        </h4>
      );
    } else if (trimmed.startsWith("- ")) {
      const indent = line.search(/\S/);
      currentList.push({ indent: indent > 2 ? 1 : 0, text: trimmed.slice(2) });
    } else {
      flushList(`${idx}`);
      elements.push(
        <p key={`p-${idx}`} className="readme-paragraph">
          {parseFormattedText(trimmed)}
        </p>
      );
    }
  });

  flushList("end");

  return <div className="markdown-body">{elements}</div>;
}

function ProjectCoverMockup({ repo }: { repo: string }) {
  switch (repo) {
    case "facto":
      return (
        <div className="mockup-container">
          <div className="macos-window-mockup">
            <div className="window-header">
              <span className="window-dot red" />
              <span className="window-dot yellow" />
              <span className="window-dot green" />
              <span className="window-title-text">Facto.app — Devis & Facturation</span>
            </div>
            <div className="window-body">
              <div className="mockup-item-row">
                <span>Devis #2026-0810 • CMARL</span>
                <span className="mockup-badge">PDF Gen ↗</span>
              </div>
              <div className="mockup-item-row" style={{ opacity: 0.8 }}>
                <span>Green Paysages • Facture A4</span>
                <span style={{ fontSize: "0.75rem", color: "#4ade80" }}>1 450 €</span>
              </div>
            </div>
          </div>
        </div>
      );

    case "cinelyon-app":
      return (
        <div className="mockup-container">
          <div className="phone-mockup">
            <div className="phone-notch" />
            <div className="phone-card-content">
              <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#fff" }}>CinéLyon • Séances</div>
              <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.7)" }}>UGC Confluence (6 films)</div>
              <div className="phone-chip-group">
                <span className="phone-chip">14:30 IMAX</span>
                <span className="phone-chip" style={{ background: "rgba(168,85,247,0.3)", color: "#e9d5ff" }}>17:15 VOST</span>
              </div>
            </div>
            <div className="phone-card-content" style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)" }}>
              <div style={{ fontSize: "0.68rem", fontWeight: 600, color: "#38bdf8" }}>⚡ Swift iOS Widget Sync</div>
            </div>
          </div>
        </div>
      );

    case "greenpaysages":
      return (
        <div className="mockup-container">
          <div className="editorial-mockup">
            <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#4ade80", letterSpacing: "0.05em" }}>GREEN PAYSAGES</div>
            <div className="slider-graphic-box">
              <span style={{ position: "absolute", left: "10px", fontSize: "0.68rem", color: "#fff", fontWeight: 600 }}>Avant</span>
              <div className="slider-graphic-handle" />
              <span style={{ position: "absolute", right: "10px", fontSize: "0.68rem", color: "#fff", fontWeight: 600 }}>Après</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.7)" }}>Crédit d'Impôt SAP 50%</span>
              <span className="mockup-badge" style={{ background: "rgba(34,197,94,0.2)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.3)" }}>4.9/5 ★</span>
            </div>
          </div>
        </div>
      );

    case "cinelyon":
      return (
        <div className="mockup-container">
          <div className="browser-mockup">
            <div className="mockup-search-bar">cinelyon.fr/search?q=lyon</div>
            <div className="mockup-pills-row" style={{ marginTop: "4px" }}>
              <span className="mockup-pill-btn" style={{ background: "rgba(56,189,248,0.2)", color: "#7dd3fc" }}>Comoedia</span>
              <span className="mockup-pill-btn">Pathé Bellecour</span>
              <span className="mockup-pill-btn">UGC Part-Dieu</span>
            </div>
          </div>
        </div>
      );

    case "BeeperLite":
      return (
        <div className="mockup-container">
          <div className="browser-mockup" style={{ maxWidth: "300px" }}>
            <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#f97316" }}>BeeperLite • Swift iOS</div>
            <div style={{ display: "flex", gap: "4px", alignItems: "center", margin: "6px 0", height: "24px" }}>
              {[30, 60, 40, 80, 50, 90, 35, 75, 45, 65, 80, 40].map((h, i) => (
                <span key={i} style={{ flex: 1, height: `${h}%`, background: "#f97316", borderRadius: "2px" }} />
              ))}
            </div>
          </div>
        </div>
      );

    case "converto":
      return (
        <div className="mockup-container">
          <div className="browser-mockup" style={{ maxWidth: "320px" }}>
            <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#a855f7" }}>Converto • iOS Converter</div>
            <div className="mockup-item-row" style={{ marginTop: "4px" }}>
              <span>100 EUR</span>
              <span style={{ fontWeight: 700, color: "#c084fc" }}>→ 108.50 USD</span>
            </div>
          </div>
        </div>
      );

    case "chatbot":
      return (
        <div className="mockup-container">
          <div className="browser-mockup" style={{ maxWidth: "340px" }}>
            <div className="mockup-item-row" style={{ background: "rgba(59,130,246,0.15)", borderRadius: "10px" }}>
              <span style={{ fontSize: "0.75rem" }}>💬 Comment optimiser mon code ?</span>
            </div>
            <div className="mockup-item-row" style={{ background: "rgba(255,255,255,0.08)", borderRadius: "10px", marginTop: "4px" }}>
              <span style={{ fontSize: "0.75rem", color: "#60a5fa" }}>✨ Analyse effectuée. Conseils...</span>
            </div>
          </div>
        </div>
      );

    case "erreur-prix":
      return (
        <div className="mockup-container">
          <div className="browser-mockup" style={{ maxWidth: "340px" }}>
            <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#f43f5e" }}>🚨 ERREUR PRIX DÉTECTÉE</div>
            <div className="mockup-item-row" style={{ marginTop: "4px" }}>
              <span style={{ textDecoration: "line-through", opacity: 0.6 }}>199,00 €</span>
              <span style={{ fontWeight: 800, color: "#fb7185", fontSize: "0.95rem" }}>49,00 € (-75%)</span>
            </div>
          </div>
        </div>
      );

    case "Hide-Letterboxd-Rating":
      return (
        <div className="mockup-container">
          <div className="browser-mockup" style={{ maxWidth: "340px" }}>
            <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#00e054" }}>Letterboxd Rating Hider</div>
            <div className="mockup-item-row" style={{ marginTop: "4px" }}>
              <span>Films non vus</span>
              <span className="mockup-badge" style={{ background: "rgba(0,224,84,0.2)", color: "#00e054", border: "1px solid rgba(0,224,84,0.3)" }}>Notes Masquées</span>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
}

const coverClassMap: Record<string, string> = {
  facto: "cover-facto",
  "cinelyon-app": "cover-cinelyon-app",
  greenpaysages: "cover-greenpaysages",
  cinelyon: "cover-cinelyon",
  BeeperLite: "cover-beeperlite",
  converto: "cover-converto",
  chatbot: "cover-chatbot",
  "erreur-prix": "cover-erreur-prix",
  "Hide-Letterboxd-Rating": "cover-hide-letterboxd",
};

const languageColorMap: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Swift: "#f05138",
  Python: "#3572a5",
  C: "#555555",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Rust: "#dea584",
};

export default function Projects() {
  const { lang } = useLang();
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<FeaturedProject | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`https://api.github.com/users/${githubUsername}/repos?per_page=100&sort=updated`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data: Repo[]) => {
        if (cancelled) return;
        const featuredNames = new Set(featuredProjects.map((p) => p.repo));
        const others = data
          .filter((r) => !r.fork)
          .filter((r) => !featuredNames.has(r.name))
          .filter((r) => !excludedRepos.includes(r.name));
        setRepos(others);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProject(null);
      }
    };
    if (selectedProject) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProject]);

  const filteredRepos = repos.filter((r) =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (r.description && r.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (r.language && r.language.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <section id="projects">
      <div className="section-header-flex">
        <h2 className="section-title-large">{t("Projets Récents", "Featured Projects", lang)}</h2>
        <a href={`https://github.com/${githubUsername}`} target="_blank" rel="noreferrer" className="view-all-link">
          <span>{t("Voir tous les repos", "View All Work", lang)}</span>
          <span>↗</span>
        </a>
      </div>

      <div className="majd-projects-grid">
        {featuredProjects.map((p, i) => (
          <motion.article
            key={p.repo}
            className="majd-project-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className={`majd-card-cover ${coverClassMap[p.repo] || ""}`}
              onClick={() => p.readme && setSelectedProject(p)}
              style={{ cursor: p.readme ? "pointer" : "default" }}
            >
              <ProjectCoverMockup repo={p.repo} />

              <div className="majd-cover-inner">
                {p.isPrivate ? (
                  <span className="majd-badge-private">
                    <LockIcon size={12} /> {t("Projet Privé", "Private Project", lang)}
                  </span>
                ) : <div />}

                <div className="majd-cover-tags">
                  {p.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="tag-chip">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="majd-card-info">
              <div className="majd-card-header">
                <h3
                  className="majd-project-title"
                  onClick={() => p.readme && setSelectedProject(p)}
                  style={{ cursor: p.readme ? "pointer" : "default" }}
                >
                  {p.name}
                </h3>
                {p.live ? (
                  <a href={p.live} target="_blank" rel="noreferrer" className="majd-project-link">
                    ↗
                  </a>
                ) : p.github ? (
                  <a href={p.github} target="_blank" rel="noreferrer" className="majd-project-link">
                    ↗
                  </a>
                ) : null}
              </div>
              <p className="majd-project-sub">{p.description[lang]}</p>

              {p.readme && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  style={{ marginTop: "12px", height: "38px", padding: "0 16px", fontSize: "0.85rem" }}
                  onClick={() => setSelectedProject(p)}
                >
                  {t("Détails du projet →", "Project details →", lang)}
                </button>
              )}
            </div>
          </motion.article>
        ))}
      </div>

      {/* GitHub Open Source Repos Section (Frameless Canvas) */}
      <div className="repos-canvas-block">
        <div className="repos-header">
          <div>
            <div className="section-tag">
              <span className="slash">/</span> GITHUB REPOSITORIES
            </div>
            <h3 className="section-title-large" style={{ marginTop: "6px" }}>
              {t("Tous mes Dépôts Publics", "All Open Source Repositories", lang)}
            </h3>
          </div>

          <div className="search-input-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder={t("Rechercher un dépôt...", "Search repository...", lang)}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery ? (
              <button type="button" className="search-clear-btn" onClick={() => setSearchQuery("")}>
                ✕
              </button>
            ) : (
              <span className="search-kbd-badge">⌘K</span>
            )}
          </div>
        </div>

        {loading ? (
          <p className="section-subtitle">{t("Chargement des dépôts GitHub…", "Loading GitHub repositories…", lang)}</p>
        ) : error ? (
          <p className="section-subtitle">
            {t(
              "Impossible de charger les dépôts depuis GitHub. Réessayez plus tard.",
              "Couldn't load repositories from GitHub. Please try again later.",
              lang,
            )}
          </p>
        ) : filteredRepos.length === 0 ? (
          <p className="section-subtitle">{t("Aucun dépôt ne correspond à votre recherche.", "No repository matches your search.", lang)}</p>
        ) : (
          <div className="repo-list-grid">
            {filteredRepos.map((r, idx) => {
              const langColor = r.language ? (languageColorMap[r.language] || "#888888") : null;
              return (
                <motion.a
                  key={r.name}
                  href={r.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="repo-item-card"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3, delay: Math.min(idx * 0.04, 0.3) }}
                >
                  <div className="repo-item-top">
                    <h4 className="repo-item-name">{r.name}</h4>
                    <span className="repo-arrow-icon">↗</span>
                  </div>

                  <p className="repo-item-desc">
                    {r.description ?? t("Pas de description disponible.", "No description available.", lang)}
                  </p>

                  <div className="repo-meta">
                    {r.language ? (
                      <span className="repo-lang-chip">
                        <span className="repo-lang-dot" style={{ background: langColor || "#888" }} />
                        {r.language}
                      </span>
                    ) : <span />}
                    <span className="repo-github-lbl">GitHub</span>
                  </div>
                </motion.a>
              );
            })}
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && selectedProject.readme ? (
          <div className="modal-backdrop" onClick={() => setSelectedProject(null)}>
            <motion.div
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              <button
                type="button"
                className="modal-close"
                onClick={() => setSelectedProject(null)}
                aria-label={t("Fermer la fenêtre", "Close modal", lang)}
              >
                ✕
              </button>

              <div style={{ marginBottom: "24px" }}>
                <h3 id="modal-title" className="section-title" style={{ fontSize: "2rem", marginTop: 0 }}>
                  {selectedProject.name}
                </h3>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "12px" }}>
                  {selectedProject.tags.map((tag) => (
                    <span key={tag} className="tag-chip">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <FormattedReadme content={selectedProject.readme[lang]} />

              <div style={{ display: "flex", gap: "12px", marginTop: "32px", paddingTop: "20px", borderTop: "1px solid var(--border)" }}>
                {selectedProject.live ? (
                  <a href={selectedProject.live} target="_blank" rel="noreferrer" className="btn btn-primary">
                    {t("Visiter le site ↗", "Visit website ↗", lang)}
                  </a>
                ) : null}
                {selectedProject.github ? (
                  <a href={selectedProject.github} target="_blank" rel="noreferrer" className="btn btn-secondary">
                    GitHub ↗
                  </a>
                ) : null}
                <button type="button" className="btn btn-secondary" onClick={() => setSelectedProject(null)}>
                  {t("Fermer", "Close", lang)}
                </button>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}