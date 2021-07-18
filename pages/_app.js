import Head from "next/head";
import "../styles/tailwind.css";
import { MDXProvider } from "@mdx-js/react";
import { ThemeProvider } from "../context/ThemeContext";
import { LanguageProvider } from "../contexts/LanguageContext";

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
          <Component {...pageProps} />
        </MDXProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default MyApp;
