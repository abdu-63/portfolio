import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLang, t } from "../i18n";
import { featuredProjects, githubUsername, excludedRepos } from "../data/projects";

interface Repo {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  fork: boolean;
  homepage: string | null;
}

export default function Projects() {
  const { lang } = useLang();
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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
              <h3 className="card-title">{p.name}</h3>
              <span className="card-live">
                {p.live ? <a href={p.live} target="_blank" rel="noreferrer">↗</a> : null}
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
            <a href={p.github} target="_blank" rel="noreferrer" className="card-link">
              GitHub →
            </a>
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
    </section>
  );
}