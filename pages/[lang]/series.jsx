import { getPageIndexContent } from "../../lib/files";
import { useMemo } from "react";
import { getMDXComponent } from "mdx-bundler/client";
import RootPageLayout from "../../components/layouts/RootPageLayout";
import CustomLink from "../../components/CustomLink";


const MDXPage = ({ metadata, code }) => {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  return (
    <RootPageLayout metadata={metadata}>
      <article className="md:mx-auto prose prose-lg py-12 dark:prose-dark">
        <Component components={{ CustomLink: CustomLink }} />
      </article>
    </RootPageLayout>
  );
};

export const getStaticProps = async ({ params }) => {
  const { code, metadata } = await getPageIndexContent({
    type: "series",
    lang: params.lang,
  });
  return {
    props: {
      code,
      metadata,
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