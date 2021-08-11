import { useMemo } from "react";
import { getMDXComponent } from "mdx-bundler/client";
import {
  getLessenLearnedContent,
  getLessenLearnedPostsMeta,
} from "../../lib/files";
import CustomLink from "../../components/CustomLink";
import GeneralListIntro from "../../components/GeneralLIstIntro";
import GeneralList from "../../components/GeneralList";
import RootPageLayout from "../../components/layouts/RootPageLayout";

const MDXPage = ({ metadata, code, lessenLearnedPosts }) => {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  return (
    <RootPageLayout metadata={metadata}>
      <article className="md:mx-auto prose prose-lg py-12 dark:prose-dark">
        <Component components={{ CustomLink: CustomLink }} />
        <GeneralListIntro>{"Lessen learned"}</GeneralListIntro>
        <GeneralList elements={lessenLearnedPosts} />
      </article>
    </RootPageLayout>
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
      lessenLearnedPosts,
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
