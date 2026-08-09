import { useLang, t } from "../i18n";
import { profile } from "../data/projects";

const skills = ["TypeScript", "React", "Swift", "Python", "Node.js", "HTML/CSS", "Git"];

export default function About() {
  const { lang } = useLang();

  return (
    <section id="about" className="section">
      <div className="section-head">
        <h2 className="section-title">{t("À propos", "About", lang)}</h2>
      </div>
      <div className="about-layout">
        <img src={profile.avatar} alt={profile.name} className="about-avatar" />
        <div>
          <p className="about-text">
            {t(
              "Je suis un développeur curieux qui aime explorer le web, le mobile et l'IA. J'aime transformer des idées en produits simples, propres et agréables à utiliser.",
              "I'm a curious developer who loves exploring web, mobile and AI. I enjoy turning ideas into simple, clean and delightful products.",
              lang,
            )}
          </p>
          <div className="skills">
            {skills.map((s) => (
              <span key={s} className="tag">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}