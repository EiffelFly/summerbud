import { useMemo } from "react";
import { getMDXComponent } from "mdx-bundler/client";
import Header from "../../components/Header";
import PageSeo from "../../components/PageSeo";
import SectionContainer from "../../components/SectionContainer";
import { getLessenLearnedContent, getLessenLearnedPostsMeta } from "../../lib/files";
import CustomLink from "../../components/CustomLink";
import Footer from "../../components/Footer";
import GeneralListIntro from "../../components/GeneralLIstIntro";
import GeneralList from "../../components/GeneralList";

const MDXPage = ({ metadata, code, lessenLearnedPosts }) => {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  return (
    <div className="bg-sd-brwhite dark:bg-sd-brblack w-screen min-h-screen">
      <SectionContainer gap="gap-y-16">
        <PageSeo metadata={metadata} />
        <Header hasTranslation={metadata.hasTranslation} />
        <article className="md:mx-auto prose prose-lg py-12 dark:prose-dark">
          <Component components={{ CustomLink: CustomLink }} />
          <GeneralListIntro>
            {"Lessen learned"}
          </GeneralListIntro>
          <GeneralList elements={lessenLearnedPosts} /> 
        </article>
        <Footer />
      </SectionContainer>
    </div>
  );
};

export const getStaticProps = async ({ params }) => {
  const { code, metadata } = await getLessenLearnedContent({
    isPageRoot: true,
    lang: params.lang,
  });
  const lessenLearnedPosts = getLessenLearnedPostsMeta({ lang: params.lang });
  return {
    props: {
      code,
      metadata,
      lessenLearnedPosts
    },
  };
};

export const getStaticPaths = () => {
  return {
    paths: [{ params: { lang: "en" } }, { params: { lang: "zh-tw" } }],
    fallback: false,
  };
};

export default MDXPage;
