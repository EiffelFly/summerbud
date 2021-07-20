import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";

export const defaultLocale = "zh-tw";
export const locales = ["zh-tw", "en"];
export const LanguageContext = createContext([]);

export function LanguageProvider({ children }) {
  const [locale, setLocale] = useState("zh-tw");
  const { query } = useRouter()

  useEffect(() => {
    if (!window) {
      return;
    }

    // const language = localStorage.getItem("lang") || locale;
    // setLocale(language);

    console.log("hello context locale", locale)

    if ( query.lang ){
      setLocale(query.lang)
    }

  }, []);

  return (
    <LanguageContext.Provider value={[locale, setLocale]}>
      {children}
    </LanguageContext.Provider>
  );
}
