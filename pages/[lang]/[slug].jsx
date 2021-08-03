import { useMemo } from "react";
import { getMDXComponent } from "mdx-bundler/client";
import SectionContainer from "../../components/SectionContainer";
import Header from "../../components/Header";
import CustomLink from "../../components/CustomLink";
import Footer from "../../components/Footer";
import PageSeo from "../../components/PageSeo";
import { getAllPagesPath, getPagesIndexContent } from "../../lib/files";

const MDXPages = ({ code, metadata }) => {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  return (
    <div className="bg-sd-brwhite dark:bg-sd-brblack w-screen min-h-screen">
      <SectionContainer
        gap="gap-y-16"
      >
        <PageSeo metadata={metadata} />
        <Header hasTranslation={true} />
        <article className="md:mx-auto prose prose-lg py-12 dark:prose-dark">
          <Component components={{ CustomLink: CustomLink }} />
        </article>
        <Footer />
      </SectionContainer>
    </div>
  );
};

export const getStaticProps = async ({ params }) => {
  const { code, metadata } = await getPagesIndexContent({
    slug: params.slug,
    lang: params.lang
  });
  return {
    props: {
      code,
      metadata
    },
  };
};

export const getStaticPaths = () => {
  const paths = getAllPagesPath()
  console.log(paths)
  return {
    paths,
    fallback: false,
  };
};

export default MDXPages;
