import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";

export const defaultLocale = "zh-tw";
export const locales = ["zh-tw", "en"];
export const LanguageContext = createContext([]);

export function LanguageProvider({ children }) {
  const [locale, setLocale] = useState("zh-tw");
  const router = useRouter()

  useEffect(() => {
    if (!window) {
      return;
    }

    const language = localStorage.getItem("lang") || locale;
    setLocale(language);

    if ( router.query["lang"] ){
      console.log("hello", router.query["lang"])
      setLocale(router.query["lang"])
    }

  }, []);

  return (
    <LanguageContext.Provider value={[locale, setLocale]}>
      {children}
    </LanguageContext.Provider>
  );
}
