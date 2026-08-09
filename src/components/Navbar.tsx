import { useLang, t } from "../i18n";
import { useTheme } from "../theme";

const links = [
  { id: "projects", fr: "Projets", en: "Projects" },
  { id: "about", fr: "À propos", en: "About" },
  { id: "contact", fr: "Contact", en: "Contact" },
];

export default function Navbar() {
  const { lang, setLang } = useLang();
  const { theme, toggle } = useTheme();

  return (
    <header className="navbar">
      <nav className="navbar-inner">
        <a href="#top" className="navbar-brand">
          Abdu
        </a>
        <div className="navbar-links">
          {links.map((l) => (
            <a key={l.id} href={`#${l.id}`} className="navbar-link">
              {l[lang]}
            </a>
          ))}
        </div>
        <div className="navbar-actions">
          <button
            className="pill"
            onClick={() => setLang(lang === "fr" ? "en" : "fr")}
            aria-label="Toggle language"
          >
            {lang === "fr" ? "EN" : "FR"}
          </button>
          <button
            className="pill"
            onClick={toggle}
            aria-label="Toggle theme"
            title={t("Basculer le thème", "Toggle theme", lang)}
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>
      </nav>
    </header>
  );
}