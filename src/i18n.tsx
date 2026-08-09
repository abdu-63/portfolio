import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "fr" | "en";

interface I18nContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
}

const I18nContext = createContext<I18nContextValue>({
  lang: "fr",
  setLang: () => {},
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    const stored = localStorage.getItem("lang");
    if (stored === "fr" || stored === "en") return stored;
    return navigator.language.startsWith("fr") ? "fr" : "en";
  });

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  return <I18nContext.Provider value={{ lang, setLang }}>{children}</I18nContext.Provider>;
}

export function useLang() {
  return useContext(I18nContext);
}

export function t(fr: string, en: string, lang: Lang) {
  return lang === "fr" ? fr : en;
}