import { getPagesIndexContent } from "../../../lib/files";
import { useMemo } from "react";
import useTranslation from "../../../hooks/useTranslation";
import { getMDXComponent } from "mdx-bundler/client";
import SectionContainer from "../../../components/SectionContainer";
import PageSeo from "../../../components/PageSeo";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import CustomLink from "../../../components/CustomLink";
import DotEmphasizeText from "../../../components/DotEmphasizeText";

const MDXPages = ({ code, metadata }) => {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  const { t } = useTranslation();
  return (
    <div className="bg-sd-brwhite dark:bg-sd-brblack w-screen min-h-screen">
      <SectionContainer gap="gap-y-16">
        <Header />
        <PageSeo metadata={metadata} />
        <article className="md:mx-auto prose prose-lg py-12 dark:prose-dark">
          <Component
            components={{
              CustomLink: CustomLink,
              DotEmphasizeText: DotEmphasizeText,
            }}
          />
        </article>
        <Footer />
      </SectionContainer>
    </div>
  );
};

export const getStaticProps = async ({ params }) => {
  const { code, metadata } = await getPagesIndexContent({
    type: "series",
    locale: params.lang,
  });
  return {
    props: {
      code,
      metadata,
    },
  };
};

export const getStaticPaths = () => {
  const paths = [
    {
      params: {
        lang: "zh-tw",
      }
    },
    {
      params: { 
        lang: "en"
      }
    }
  ]

  return {
    paths,
    fallback: false,
  };
};

export default MDXPages;