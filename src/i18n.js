import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import English from "./Language/English.json";
import German from "./Language/German.json";

const resources = {
  en: {
    translation: English,
  },
  de: {
    translation: German,
  },
};

const languages = ["en", "de"];

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    detection: { order: ["path", "navigator"] },
    resources: resources,
    fallbackLng: "en",
    whitelist: languages,
    interpolation: {
      escapeValue: false,
    },
    react: {
      bindI18n: "languageChanged",
    },
  });

export default i18n;
