import { useContext } from "react";

import {
  LanguageContext,
  defaultLocale,
  locales,
} from "../contexts/LanguageContext";
import LangStrings from "../locales/translation";

const useTranslation = () => {
  const [locale, setLocale] = useContext(LanguageContext);

  const t = (keys) => {
    const keyList = keys.split(".");

    const value = keyList.reduce((o, i) => o[i], LangStrings[locale]);

    if (!value) {
      console.warn(`No string '${key}' for locale '${locale}'`);
    }

    return (
      value || keyList.reduce((o, i) => o[i], LangStrings[defaultLocale]) || ""
    );
  };

  return { t, locale, setLocale, locales };
};

export default useTranslation;
