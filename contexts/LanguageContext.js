import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";

export const defaultLocale = "zh-tw";
export const locales = ["zh-tw", "en"];
export const LanguageContext = createContext([]);

export function LanguageProvider({ children }) {
  const [locale, setLocale] = useState("zh-tw");
  const { query, isReady } = useRouter();

  useEffect(() => {

    if (!window) {
      return;
    }

    if ( !isReady ){
      return;
    }

    const language = localStorage.getItem("lang") || locale;
    setLocale(language);

    if ( query["lang"] ){
      console.log("hello", query["lang"])
      setLocale(query["lang"])
    }

    console.log(locale)

  }, [query["lang"]]);

  return (
    <LanguageContext.Provider value={[locale, setLocale]}>
      {children}
    </LanguageContext.Provider>
  );
}
