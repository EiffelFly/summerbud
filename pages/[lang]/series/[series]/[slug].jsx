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
import BackToSeries from "../../../../components/buttons/BackToSeries";

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
          {metadata.seriesIndex !== 0 && (
            <BackToSeries
              seriesKey={metadata.seriesKey}
              seriesSlug={metadata.seriesSlug}
            />
          )}
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
    pathProvided: false,
    series: params.series,
    slug: params.slug,
    lang: params.lang,
  });

  if (params.slug === "intro") {
    articlePaths = await getTargetSeriesPaths({ seriesName: params.series });
    articlePaths = articlePaths.filter((path) => !path.includes("/intro/"));

    for (const articlePath of articlePaths) {
      try {
        const slug = articlePath.split("/")[1];
        const lang = articlePath.split("/")[2].split(".")[1];
        const { metadata } = await getSeriesPostsContent({
          series: params.series,
          slug: slug,
          lang: lang,
        });
        articles.push({
          path: `/series/${params.series}/${slug}`,
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
  console.log(paths);
  return {
    paths,
    fallback: false,
  };
};

export default MDXPages;
