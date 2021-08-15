import { useMemo } from "react";
import { getMDXComponent } from "mdx-bundler/client";
import {
  getLessonLearnedContent,
  getLessonLearnedPostsMeta,
} from "../../lib/files";
import CustomLink from "../../components/CustomLink";
import GeneralListIntro from "../../components/GeneralLIstIntro";
import GeneralList from "../../components/GeneralList";
import RootPageLayout from "../../components/layouts/RootPageLayout";

const MDXPage = ({ metadata, code, lessonLearnedPosts }) => {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  return (
    <RootPageLayout metadata={metadata}>
      <article className="md:mx-auto prose prose-lg py-12 dark:prose-dark">
        <Component components={{ CustomLink: CustomLink }} />
        <GeneralListIntro>{"Lesson learned"}</GeneralListIntro>
        <GeneralList elements={lessonLearnedPosts} />
      </article>
    </RootPageLayout>
  );
};

export const getStaticProps = async ({ params }) => {
  const { code, metadata } = await getLessonLearnedContent({
    isPageRoot: true,
    lang: params.lang,
  });
  const lessonLearnedPosts = getLessonLearnedPostsMeta({ lang: params.lang });
  return {
    props: {
      code,
      metadata,
      lessonLearnedPosts,
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
