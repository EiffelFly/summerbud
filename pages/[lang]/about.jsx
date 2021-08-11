import { getPageIndexContent } from "../../lib/files";
import { useMemo } from "react";
import { getMDXComponent } from "mdx-bundler/client";
import SectionContainer from "../../components/SectionContainer";
import PageSeo from "../../components/PageSeo";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CustomLink from "../../components/CustomLink";

const MDXPage = ({ metadata, code }) => {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  return (
    <div className="bg-sd-brwhite dark:bg-sd-brblack w-screen min-h-screen">
      <SectionContainer gap="gap-y-16">
        <PageSeo metadata={metadata} />
        <Header hasTranslation={metadata.hasTranslation} />
        <article className="md:mx-auto prose prose-lg py-12 dark:prose-dark">
          <Component components={{ CustomLink: CustomLink }} />
        </article>
        <Footer />
      </SectionContainer>
    </div>
  );
};

export const getStaticProps = async ({ params }) => {
  const { code, metadata } = await getPageIndexContent({
    type: "about",
    lang: params.lang,
  });
  return {
    props: {
      code,
      metadata
    }
  }
};

export const getStaticPaths = () => {
  return {
    paths: [{ params: { lang: "en" } }, { params: { lang: "zh-tw" } }],
    fallback: false,
  };
};

export default MDXPage;
