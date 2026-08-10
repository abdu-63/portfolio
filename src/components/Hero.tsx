import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLang, t } from "../i18n";
import { profile } from "../data/projects";

function ManifestoWord({ word, progress, range }: { word: string; progress: any; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <motion.span style={{ opacity }} className="manifesto-word">
      {word}
    </motion.span>
  );
}

function ManifestoStatement() {
  const { lang } = useLang();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.65", "end 0.25"],
  });

  const statementFr =
    "Du concept au lancement. Des produits numériques simples, performants et évolutifs, conçus avec clarté, rigueur architecturale et passion du design.";
  const statementEn =
    "From idea to launch. Clean, scalable digital products built to move fast, stay simple, and perform in real-world use, driven by clarity and intentional design.";

  const text = t(statementFr, statementEn, lang);
  const words = text.split(" ");

  return (
    <div ref={containerRef} className="manifesto-container">
      <p className="manifesto-paragraph">
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + 1 / words.length;
          return (
            <ManifestoWord
              key={i}
              word={word}
              progress={scrollYProgress}
              range={[start, end]}
            />
          );
        })}
      </p>
    </div>
  );
}

export default function Hero() {
  const { lang } = useLang();
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <section id="top" className="hero-section">
      <div className="hero-stage">
        {/* Floating 3D Star Top Left with continuous floating motion */}
        <motion.img
          src={`${baseUrl}3d-star.png`}
          alt="3D Star"
          className="hero-3d-star"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [-6, 6, -6],
            rotate: [0, 4, -4, 0],
          }}
          transition={{
            opacity: { duration: 0.6 },
            scale: { duration: 0.6 },
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          }}
        />

        {/* Floating 3D Lightning Bolt Bottom Right with continuous floating motion */}
        <motion.img
          src={`${baseUrl}3d-bolt.png`}
          alt="3D Lightning Bolt"
          className="hero-3d-bolt"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [6, -6, 6],
            rotate: [0, -5, 5, 0],
          }}
          transition={{
            opacity: { duration: 0.6, delay: 0.2 },
            scale: { duration: 0.6, delay: 0.2 },
            y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 5.5, repeat: Infinity, ease: "easeInOut" },
          }}
        />

        {/* Giant Typographic Title */}
        <motion.h1
          className="hero-giant-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span>SO<span className="kern-f">F</span>TWARE</span>
          <span>ENGINEER</span>
        </motion.h1>

        {/* Centered Overlapping B&W Portrait Card */}
        <motion.div
          className="hero-portrait-card"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src={profile.avatar}
            alt={profile.name}
            className="hero-portrait-img"
          />
        </motion.div>
      </div>

      {/* Bottom Information Row */}
      <div className="hero-bottom-bar">
        <div className="hero-copyright">©{new Date().getFullYear()}</div>
        <div className="hero-bottom-right-group">
          <div className="hero-tag-right">
            / {t("CRÉATEUR DEPUIS 2025", "CREATING SINCE 2025", lang)}
          </div>
        </div>
      </div>

      {/* Hey! Section matching Majd screenshot 1:1 */}
      <motion.div
        className="hey-section"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="hey-title">{t("Hey !", "Hey !", lang)}</h2>

        <div className="hey-grid">
          <div className="hey-col-left">
            <p className="hey-bold-intro">
              {t(
                "Je suis Abdu, développeur passionné basé à Lyon, créateur d'applications web, mobiles et de logiciels sur mesure.",
                "I’m Abdu, a software builder based in Lyon, France, building high-quality web, mobile, and custom software experiences.",
                lang
              )}
            </p>
          </div>

          <div className="hey-col-right">
            <p className="hey-light-bio">
              {t(
                "Ingénieur logiciel et développeur fullstack spécialisé dans la création d'interfaces modernes, rapides et performantes. Au fil des projets, j'ai conçu et déployé des plateformes web réactives, des applications mobiles iOS/Android et des logiciels desktop sécurisés.",
                "I'm a software engineer focused on building modern, scalable, and high-performance digital experiences. Over the years, I've created and shipped web applications, native iOS/Android mobile apps, and custom desktop software.",
                lang
              )}
            </p>

            <a href="#projects" className="hey-get-started">
              <span>{t("Découvrir mes réalisations", "Explore My Work", lang)}</span>
              <span className="arrow-icon">↗</span>
            </a>
          </div>
        </div>
      </motion.div>

      {/* Scroll-driven Manifesto Reveal */}
      <ManifestoStatement />
    </section>
  );
}