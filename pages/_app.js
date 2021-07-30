import Head from "next/head";
import "../styles/tailwind.css";
import { ThemeProvider } from "../contexts/ThemeContext";
import { LanguageProvider } from "../contexts/LanguageContext";
import { DefaultSeo } from "next-seo";
import SEO from "../lib/next-seo.config";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import * as gtag from "../lib/gtag";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <LanguageProvider>
      <ThemeProvider>
        <Head>
          <meta content="width=device-width, initial-scale=1" name="viewport" />
        </Head>
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default MyApp;
