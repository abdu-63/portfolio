import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang, t } from "../i18n";
import { useTheme } from "../theme";
import { GlobeIcon, MoonIcon, SunIcon } from "./Icons";

const navLinks = [
  { id: "services", fr: "Services", en: "Services" },
  { id: "projects", fr: "Réalisations", en: "Works" },
  { id: "about", fr: "À propos", en: "About" },
  { id: "contact", fr: "Contact", en: "Contact" },
];

export default function Navbar() {
  const { lang, setLang } = useLang();
  const { theme, toggle } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="navbar-container">
      <div className="navbar-pill">
        <a href="#top" className="navbar-brand-title">
          Abdu
        </a>
        <button
          type="button"
          className="navbar-menu-btn"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={t("Menu de navigation", "Toggle navigation menu", lang)}
        >
          <span className="dots-icon">•••</span>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="navbar-menu-dropdown"
            initial={{ opacity: 0, y: -12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav className="navbar-menu-links">
              {navLinks.map((l) => (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  className="navbar-menu-link"
                  onClick={() => setIsOpen(false)}
                >
                  {l[lang]}
                </a>
              ))}
            </nav>

            <div className="navbar-menu-divider" />

            <div className="navbar-menu-actions">
              <button
                type="button"
                className="action-btn"
                onClick={() => setLang(lang === "fr" ? "en" : "fr")}
              >
                <GlobeIcon size={15} /> {lang === "fr" ? "EN" : "FR"}
              </button>

              <button type="button" className="action-btn" onClick={toggle}>
                {theme === "light" ? (
                  <>
                    <MoonIcon size={15} /> Dark
                  </>
                ) : (
                  <>
                    <SunIcon size={15} /> Light
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}