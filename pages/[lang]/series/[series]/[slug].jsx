import {
  getSeriesPostsContent,
  getAllSeriesSlugs,
  getTargetSeriesPaths,
} from "../../../../lib/files";
import { useMemo } from "react";
import { getMDXComponent } from "mdx-bundler/client";
import SectionContainer from "../../../../components/SectionContainer";
import Header from "../../../../components/Header";
import CustomLink from "../../../../components/CustomLink";
import Footer from "../../../../components/Footer";
import PostTitle from "../../../../components/PostTitle";
import PostSeo from "../../../../components/PostSeo";
import SubscriptionForm from "../../../../components/SubscriptionForm";
import DotEmphasizeText from "../../../../components/DotEmphasizeText";
//import PostSeriesBreadcrum from "../../../../components/PostSeriesBreadcrum";
import useTranslation from "../../../../hooks/useTranslation";
import SeriesArticlesList from "../../../../components/SeriesArticlesList";

const MDXPages = ({ metadata, code, articles }) => {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  const { t } = useTranslation();
  return (
    <div className="bg-sd-brwhite dark:bg-sd-brblack w-screen min-h-screen">
      <SectionContainer gap="gap-y-16">
        <Header hasTranslation={metadata.hasTranslation} />
        <PostSeo metadata={metadata} />
        <article className="md:mx-auto prose prose-lg py-12 dark:prose-dark">
          <PostTitle
            title={metadata.title}
            tags={metadata.tags}
            className={"mb-20"}
          />
          <Component
            components={{
              CustomLink: CustomLink,
              DotEmphasizeText: DotEmphasizeText,
            }}
          />

          <SeriesArticlesList articles={articles} className={"mt-20"} />
          <SubscriptionForm className={"mt-60"} />
        </article>
        <Footer />
      </SectionContainer>
    </div>
  );
};

export const getStaticProps = async ({ params }) => {
  let articles = [];
  let articlePaths = [];

  const { code, metadata } = await getSeriesPostsContent({
    series: params.series,
    slug: params.slug,
    lang: params.lang,
  });

  if (params.slug === "intro") {
    articlePaths = await getTargetSeriesPaths({ seriesName: params.series });
    const introIndex = articlePaths.indexOf(`${params.series}/intro`);
    articlePaths.splice(introIndex, 1);
    for (const articlePath of articlePaths) {
      try {
        const slug = articlePath.split("/")[1];
        const { metadata } = await getSeriesPostsContent({
          series: params.series,
          slug: slug,
          lang: params.lang,
        });
        articles.push({
          path: `/series/${articlePath}`,
          metadata: metadata,
        });
      } catch (err) {
        console.log(err);
      }
    }
    articles.sort((a, b) => a.metadata.seriesIndex - b.metadata.seriesIndex);
  }

  return {
    props: {
      code: code,
      metadata: metadata,
      articles: articles,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = await getAllSeriesSlugs();
  return {
    paths,
    fallback: false,
  };
};

export default MDXPages;
