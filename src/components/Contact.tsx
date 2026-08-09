import { useLang, t } from "../i18n";
import { profile, githubUsername } from "../data/projects";

export default function Contact() {
  const { lang } = useLang();

  return (
    <section id="contact" className="section">
      <div className="section-head">
        <h2 className="section-title">{t("Contact", "Contact", lang)}</h2>
        <p className="section-sub">
          {t("Envie de discuter d'un projet ? Écrivez-moi.", "Want to discuss a project? Reach out.", lang)}
        </p>
      </div>
      <div className="contact-links">
        <a href={`mailto:${profile.email}`} className="btn btn-primary">
          {profile.email}
        </a>
        <a
          href={`https://github.com/${githubUsername}`}
          target="_blank"
          rel="noreferrer"
          className="btn btn-ghost"
        >
          GitHub
        </a>
      </div>
    </section>
  );
}