import { getAllSlugs, getContent } from "../../lib/files";
import { useMemo } from "react";
import { getMDXComponent } from "mdx-bundler/client";
import SectionContainer from "../../components/SectionContainer";
import Header from "../../components/Header";
import CustomLink from "../../components/CustomLink";
import Footer from "../../components/Footer";

const MDXPages = ({ code }) => {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  return (
    <div className="bg-sd-brwhite dark:bg-sd-brblack w-screen min-h-screen">
      <SectionContainer>
        <Header />
        <article className="prose prose-lg py-12 dark:prose-dark">
          <Component components={{ CustomLink: CustomLink }} />
        </article>
        <Footer />
      </SectionContainer>
    </div>
  );
};

export const getStaticProps = async ({ params }) => {
  const { slug, code } = await getContent(params.slug, params.lang, "page");
  return {
    props: {
      code,
    },
  };
};

export const getStaticPaths = () => {
  const paths = getAllSlugs("page");
  return {
    paths,
    fallback: false,
  };
};

export default MDXPages;
