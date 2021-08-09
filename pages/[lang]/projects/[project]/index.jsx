import SectionContainer from "../../../../components/SectionContainer";
import { getMDXComponent } from "mdx-bundler/client";

import PageSeo from "../../../../components/PageSeo";
import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";
import {
  getProjectIndexContent,
  getProjectIndexPath,
} from "../../../../lib/files";
import CustomLink from "../../../../components/CustomLink";
import { useMemo } from "react";

const MDXPage = ({ code, metadata }) => {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  return (
    <div className="bg-sd-brwhite dark:bg-sd-brblack w-screen min-h-screen">
      <SectionContainer gap="gap-y-16">
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
  const { code, metadata } = await getProjectIndexContent({
    project: params.project,
    lang: params.lang,
  });
  return {
    props: {
      code,
      metadata,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = getProjectIndexPath();
  return {
    paths: paths,
    fallback: false,
  };
};

export default MDXPage;
