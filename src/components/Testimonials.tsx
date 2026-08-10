import { motion } from "framer-motion";
import { useLang, t } from "../i18n";
import { BuildingIcon, FilmIcon, LeafIcon, ZapIcon } from "./Icons";

const testimonialsData = [
  {
    quote: {
      fr: "Facto a totalement simplifié la gestion de nos devis et factures. L'application native macOS est ultra-rapide et l'export PDF est d'une précision parfaite.",
      en: "Facto completely transformed how we manage quotes and invoices. The native macOS app is blazing fast and PDF exports are pixel-perfect.",
    },
    name: "CMARL",
    role: "Fabrication Sur-Mesure",
    avatar: <BuildingIcon size={18} />,
    color: "#3b82f6",
    rating: "5.0 ★★★★★",
  },
  {
    quote: {
      fr: "CinéLyon est devenue l'application indispensable pour tous nos utilisateurs lyonnais. L'intégration du Widget iOS en Swift est une vraie réussite.",
      en: "CinéLyon became the essential app for moviegoers across Lyon. The native Swift iOS Widget integration is a masterpiece.",
    },
    name: "CinéLyon App",
    role: "iOS & Android User Base",
    avatar: <FilmIcon size={18} />,
    color: "#e11d48",
    rating: "5.0 ★★★★★",
  },
  {
    quote: {
      fr: "Le site vitrine développé pour Green Paysages a immédiatement boosté nos demandes de devis grâce au slider comparatif et au design soigné.",
      en: "The showcase site built for Green Paysages immediately boosted lead generation thanks to the interactive slider and polished UX.",
    },
    name: "Green Paysages",
    role: "Aménagement Paysager",
    avatar: <LeafIcon size={18} />,
    color: "#10b981",
    rating: "5.0 ★★★★★",
  },
  {
    quote: {
      fr: "Un code ultra-propre, des animations fluides à 60 FPS et un souci du détail constant. Une collaboration technique exemplaire.",
      en: "Obsessively clean code, silky 60 FPS animations, and constant attention to detail. A top-tier technical partner.",
    },
    name: "Omar H.",
    role: "Frontend Tech Lead",
    avatar: <ZapIcon size={18} />,
    color: "#a855f7",
    rating: "5.0 ★★★★★",
  },
];

export default function Testimonials() {
  const { lang } = useLang();

  return (
    <section id="testimonials" className="testimonials-section">
      <div className="section-header">
        <div className="section-tag">
          <span className="slash">/</span> {t("RETOURS CLIENTS & COLLABORATEURS", "CLIENT & TEAM FEEDBACK", lang)}
        </div>
        <h2 className="section-title-large">{t("Témoignages", "Testimonials", lang)}</h2>
      </div>

      <div className="testimonials-grid">
        {testimonialsData.map((item, idx) => (
          <motion.div
            key={item.name}
            className="testimonial-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.4, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="testimonial-card-top">
              <div className="quote-mark-icon">“</div>
              <span className="testimonial-stars">{item.rating}</span>
            </div>

            <p className="testimonial-quote">"{item.quote[lang]}"</p>

            <div className="testimonial-author">
              <div className="testimonial-avatar" style={{ background: `${item.color}20`, color: item.color, border: `1px solid ${item.color}40` }}>
                {item.avatar}
              </div>
              <div>
                <div className="testimonial-name">{item.name}</div>
                <div className="testimonial-role">{item.role}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
