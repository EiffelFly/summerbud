import { getAllSlugs, getContent } from "../../lib/files";
import { useMemo } from "react";
import { getMDXComponent } from "mdx-bundler/client";
import SectionContainer from "../../components/SectionContainer";
import Header from "../../components/Header";
import CustomLink from "../../components/CustomLink";
import Footer from "../../components/Footer";
import PageSeo from "../../components/PageSeo";

const MDXPages = ({ code, metadata }) => {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  return (
    <div className="bg-sd-brwhite dark:bg-sd-brblack w-screen min-h-screen">
      <SectionContainer
        gap="gap-y-16"
      >
        <PageSeo metadata={metadata} />
        <Header />
        <article className="md:mx-auto prose prose-lg py-12 dark:prose-dark">
          <Component components={{ CustomLink: CustomLink }} />
        </article>
        <Footer />
      </SectionContainer>
    </div>
  );
};

export const getStaticProps = async ({ params }) => {
  const { slug, code, metadata } = await getContent(params.slug, params.lang, "page");
  return {
    props: {
      code,
      metadata
    },
  };
};

export const getStaticPaths = () => {
  const paths = getAllSlugs("page");
  console.log(paths)
  return {
    paths,
    fallback: false,
  };
};

export default MDXPages;
