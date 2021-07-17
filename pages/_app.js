import Head from "next/head";
import "../styles/tailwind.css";
import { MDXProvider } from "@mdx-js/react";
import { ThemeProvider } from "../theme/ThemeContext";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <MDXProvider>
        <Head>
          <meta content="width=device-width, initial-scale=1" name="viewport" />
        </Head>
        <Component {...pageProps} />
      </MDXProvider>
    </ThemeProvider>
  );
}

export default MyApp;
