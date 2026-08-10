import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang, t } from "../i18n";
import { featuredProjects, githubUsername, excludedRepos, type FeaturedProject } from "../data/projects";

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
      elements.push(
        <h4 key={`h-${idx}`} className="readme-heading">
          {trimmed.slice(4)}
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

  return <div className="readme-container">{elements}</div>;
}

export default function Projects() {
  const { lang } = useLang();
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
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

  return (
    <section id="projects" className="section">
      <div className="section-head">
        <h2 className="section-title">{t("Projets", "Projects", lang)}</h2>
        <p className="section-sub">
          {t("Une sélection de mes projets phares.", "A selection of my featured projects.", lang)}
        </p>
      </div>

      <div className="grid">
        {featuredProjects.map((p, i) => (
          <motion.article
            key={p.repo}
            className="card"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "spring", damping: 1.0, stiffness: 100, delay: i * 0.05 }}
          >
            <div className="card-top">
              <div className="card-title-group">
                <h3 className="card-title">{p.name}</h3>
                {p.isPrivate ? (
                  <span className="badge-private" title={t("Projet privé", "Private project", lang)}>
                    🔒 {t("Privé", "Private", lang)}
                  </span>
                ) : null}
              </div>
              <span className="card-live">
                {p.live ? (
                  <a href={p.live} target="_blank" rel="noreferrer" title={t("Voir le site", "Live site", lang)}>
                    ↗
                  </a>
                ) : null}
              </span>
            </div>
            <p className="card-desc">{p.description[lang]}</p>
            <div className="card-tags">
              {p.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
            <div className="card-actions">
              {p.readme ? (
                <button
                  type="button"
                  className="card-link btn-link"
                  onClick={() => setSelectedProject(p)}
                >
                  {t("Fiche projet →", "Project details →", lang)}
                </button>
              ) : null}
              {p.github ? (
                <a href={p.github} target="_blank" rel="noreferrer" className="card-link">
                  GitHub →
                </a>
              ) : null}
            </div>
          </motion.article>
        ))}
      </div>

      <div className="section-head" style={{ marginTop: "4rem" }}>
        <h2 className="section-title">{t("Tous mes repos", "All my repositories", lang)}</h2>
      </div>
      {loading ? (
        <p className="muted">{t("Chargement…", "Loading…", lang)}</p>
      ) : error ? (
        <p className="muted">
          {t(
            "Impossible de charger les repos depuis GitHub. Réessayez plus tard.",
            "Couldn't load repositories from GitHub. Please try again later.",
            lang,
          )}
        </p>
      ) : (
        <ul className="repo-list">
          {repos.map((r) => (
            <li key={r.name}>
              <a href={r.html_url} target="_blank" rel="noreferrer" className="repo-item">
                <span className="repo-name">{r.name}</span>
                <span className="repo-desc">
                  {r.description ?? t("Pas de description", "No description", lang)}
                </span>
                {r.language ? <span className="repo-lang">{r.language}</span> : null}
              </a>
            </li>
          ))}
        </ul>
      )}

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && selectedProject.readme ? (
          <div className="modal-backdrop" onClick={() => setSelectedProject(null)}>
            <motion.div
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              <header className="modal-header">
                <div>
                  <div className="modal-header-top">
                    <h3 id="modal-title" className="modal-title">
                      {selectedProject.name}
                    </h3>
                    {selectedProject.isPrivate ? (
                      <span className="badge-private">
                        🔒 {t("Projet privé", "Private project", lang)}
                      </span>
                    ) : null}
                  </div>
                  <div className="card-tags" style={{ marginTop: "0.5rem" }}>
                    {selectedProject.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  type="button"
                  className="modal-close"
                  onClick={() => setSelectedProject(null)}
                  aria-label={t("Fermer la fenêtre", "Close modal", lang)}
                >
                  ✕
                </button>
              </header>

              <div className="modal-body">
                <FormattedReadme content={selectedProject.readme[lang]} />
              </div>

              <footer className="modal-footer">
                {selectedProject.live ? (
                  <a
                    href={selectedProject.live}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary"
                  >
                    {t("Visiter le site ↗", "Visit website ↗", lang)}
                  </a>
                ) : null}
                {selectedProject.github ? (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-secondary"
                  >
                    GitHub ↗
                  </a>
                ) : null}
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setSelectedProject(null)}
                >
                  {t("Fermer", "Close", lang)}
                </button>
              </footer>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}