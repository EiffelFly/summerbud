import Head from "next/head";
import "../styles/tailwind.css";
import { MDXProvider } from "@mdx-js/react";
import { ThemeProvider } from "../contexts/ThemeContext";
import { LanguageProvider } from "../contexts/LanguageContext";
import { DefaultSeo } from "next-seo";
import SEO from "../lib/next-seo.config"

function MyApp({ Component, pageProps }) {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <MDXProvider>
          <Head>
            <meta
              content="width=device-width, initial-scale=1"
              name="viewport"
            />
          </Head>
          <DefaultSeo {...SEO} />
          <Component {...pageProps} />
        </MDXProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default MyApp;
