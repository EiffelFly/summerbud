import { useContext } from "react";

import {
  LanguageContext,
  defaultLocale,
  locales,
} from "../contexts/LanguageContext";
import LangStrings from "../locales/translation";

const useTranslation = () => {
  const [locale, setLocale] = useContext(LanguageContext);

  function t(key) {
    if (!LangStrings[locale][key]) {
      console.warn(`No string '${key}' for locale '${locale}'`);
    }

    return LangStrings[locale][key] || LangStrings[defaultLocale][key] || "";
  }

  return { t, locale, setLocale, locales };
};

export default useTranslation;