import { useState } from "react";
import { motion } from "framer-motion";
import { useLang, t } from "../i18n";
import { profile, githubUsername } from "../data/projects";
import { MailIcon, CheckIcon } from "./Icons";

export default function Contact() {
  const { lang } = useLang();
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "aefe51cf-91e7-45c5-b625-29f54baa8ca2",
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `Nouveau message Portfolio de ${formData.name}`,
          from_name: "Portfolio Abdu",
        }),
      });

      const result = await response.json();

      if (result.success) {
        setFormSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setFormSubmitted(false), 5000);
      } else {
        setSubmitError(
          t(
            "Une erreur est survenue lors de l'envoi. Veuillez réessayer ou contacter directement par email.",
            "An error occurred while sending. Please try again or send an email directly.",
            lang
          )
        );
      }
    } catch {
      setSubmitError(
        t(
          "Erreur de connexion. Veuillez vérifier votre réseau.",
          "Network error. Please check your connection.",
          lang
        )
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact-canvas-section">
      <div className="section-header">
        <div className="section-tag">
          <span className="slash">/</span> {t("CONTACT & COLLABORATION", "CONTACT & COLLABORATION", lang)}
        </div>
        <h2 className="section-title-large">
          {t("Discutons de votre projet", "Let's talk & collaborate", lang)}
        </h2>
      </div>

      <div className="contact-frameless-grid">
        {/* Left Column: Direct Info & CTAs */}
        <motion.div
          className="contact-left-col"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="contact-lead-text">
            {t(
              "Vous avez un projet en tête, une opportunité ou souhaitez échanger ? Je suis toujours ouvert aux discussions passionnantes.",
              "Have a project, freelance opportunity, or technical challenge in mind? Feel free to send a message.",
              lang
            )}
          </p>

          <button type="button" className="contact-direct-email" onClick={handleCopyEmail}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <MailIcon size={16} /> {profile.email}
            </span>
            <span className="tag-chip">{copied ? t("Copié !", "Copied!", lang) : t("Copier", "Copy", lang)}</span>
          </button>

          <div style={{ marginTop: "32px", display: "flex", gap: "12px" }}>
            <a
              href={`https://github.com/${githubUsername}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary"
            >
              GitHub ↗
            </a>
            <a href={`mailto:${profile.email}`} className="btn btn-primary">
              {t("Envoyer un email", "Send email", lang)} ↗
            </a>
          </div>
        </motion.div>

        {/* Right Column: Form directly on Canvas */}
        <motion.form
          className="contact-frameless-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="form-group">
            <label className="form-label" htmlFor="contact-name">
              {t("Votre Nom", "Your Name", lang)}
            </label>
            <input
              id="contact-name"
              type="text"
              required
              className="form-input"
              placeholder={t("Ex: Jean Dupont", "Ex: John Doe", lang)}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="contact-email">
              {t("Votre Email", "Your Email", lang)}
            </label>
            <input
              id="contact-email"
              type="email"
              required
              className="form-input"
              placeholder="name@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="contact-message">
              {t("Votre Projet / Message", "Your Project / Message", lang)}
            </label>
            <textarea
              id="contact-message"
              required
              className="form-textarea"
              placeholder={t("Décrivez brièvement votre projet...", "Describe your project or message...", lang)}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: "100%" }} disabled={isSubmitting}>
            {isSubmitting
              ? t("Envoi en cours...", "Sending...", lang)
              : t("Envoyer le message", "Submit message", lang)}{" "}
            →
          </button>

          {formSubmitted && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ color: "var(--pulse-green)", fontWeight: 500, margin: 0, display: "inline-flex", alignItems: "center", gap: "6px" }}
            >
              <CheckIcon size={16} /> {t("Message envoyé avec succès !", "Message sent successfully!", lang)}
            </motion.p>
          )}

          {submitError && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ color: "#ef4444", fontWeight: 500, margin: 0, fontSize: "0.9rem" }}
            >
              {submitError}
            </motion.p>
          )}
        </motion.form>
      </div>

      {copied && (
        <motion.div
          className="toast"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
        >
          <CheckIcon size={16} /> {t("Adresse email copieuse dans le presse-papier !", "Email address copied to clipboard!", lang)}
        </motion.div>
      )}
    </section>
  );
}