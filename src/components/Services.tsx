import { motion } from "framer-motion";
import { useLang, t } from "../i18n";

interface ServiceItem {
  id: string;
  title: { fr: string; en: string };
  tags: string[];
}

const serviceItems: ServiceItem[] = [
  {
    id: "web-dev",
    title: { fr: "Développement Web & SPA", en: "Frontend Development" },
    tags: ["React 19", "TypeScript", "Next.js", "Vite", "Web Performance"],
  },
  {
    id: "mobile-dev",
    title: { fr: "Apps Mobiles & Widgets iOS", en: "Mobile & Native iOS" },
    tags: ["React Native", "Expo SDK", "Swift", "SwiftUI Widget", "Offline-First"],
  },
  {
    id: "desktop-backend",
    title: { fr: "Applications Desktop & API", en: "Desktop & Backend Systems" },
    tags: ["Tauri v2", "Rust", "Node.js", "Supabase", "Python"],
  },
  {
    id: "ui-strategy",
    title: { fr: "UI/UX & Design Systems", en: "UI/UX & Performance Strategy" },
    tags: ["Design Systems", "Glassmorphic UI", "Core Web Vitals", "A11y"],
  },
];

export default function Services() {
  const { lang } = useLang();

  return (
    <section id="services" className="services-section">
      <div className="section-header">
        <h2 className="section-title-large">{t("Services", "Services", lang)}</h2>
      </div>

      <div className="services-list-rows">
        {serviceItems.map((item, idx) => (
          <motion.div
            key={item.id}
            className="service-row"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className="service-row-title">{item.title[lang]}</h3>
            <div className="service-row-tags">
              {item.tags.join("  •  ")}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
