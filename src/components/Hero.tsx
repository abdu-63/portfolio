import { useLang, t } from "../i18n";
import { profile } from "../data/projects";

export default function Hero() {
  const { lang } = useLang();

  return (
    <section id="top" className="hero">
      <img
        src={profile.avatar}
        alt={profile.name}
        className="hero-avatar"
        width={120}
        height={120}
      />
      <h1 className="hero-title">
        {t("Bonjour, je suis", "Hello, I'm", lang)} <span className="accent">{profile.name}</span>
      </h1>
      <p className="hero-subtitle">
        {t(
          "Développeur passionné par le web, le mobile et l'IA. Je construis des choses simples et élégantes.",
          "Developer passionate about web, mobile and AI. I build simple, elegant things.",
          lang,
        )}
      </p>
      <div className="hero-actions">
        <a href="#projects" className="btn btn-primary">
          {t("Voir mes projets", "View my projects", lang)}
        </a>
        <a href="#contact" className="btn btn-ghost">
          {t("Me contacter", "Contact me", lang)}
        </a>
      </div>
    </section>
  );
}