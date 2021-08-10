import { getPostsPath, getPostContent } from "../../../lib/files";
import { useMemo } from "react";
import { getMDXComponent } from "mdx-bundler/client";
import SectionContainer from "../../../components/SectionContainer";
import Header from "../../../components/Header";
import CustomLink from "../../../components/CustomLink";
import Footer from "../../../components/Footer";
import PostTitle from "../../../components/PostTitle";
import PostSeo from "../../../components/PostSeo";
import SubscriptionForm from "../../../components/SubscriptionForm";
import DotEmphasizeText from "../../../components/DotEmphasizeText";
import PostSeriesBreadcrum from "../../../components/PostSeriesBreadcrum";
import useTranslation from "../../../hooks/useTranslation";

const MDXPages = ({ code, metadata }) => {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  const { t } = useTranslation();
  return (
    <div className="bg-sd-brwhite dark:bg-sd-brblack w-screen min-h-screen">
      <SectionContainer gap="gap-y-16">
        <Header />
        <PostSeo metadata={metadata} />
        <article className="md:mx-auto prose prose-lg py-12 dark:prose-dark">
          {metadata.belongToSeries && (
            <PostSeriesBreadcrum
              seriesUrl={metadata.seriesSlug}
              seriesName={t(`series.${metadata.seriesKey}`)}
            />
          )}
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
          <SubscriptionForm className={"mt-80"} />
        </article>
        <Footer />
      </SectionContainer>
    </div>
  );
};

export const getStaticProps = async ({ params }) => {
  const { code, metadata } = await getPostContent({
    lang: params.lang,
    slug: params.slug
  });
  return {
    props: {
      code,
      metadata,
    },
  };
};

export const getStaticPaths = () => {
  const paths = getPostsPath();
  return {
    paths,
    fallback: false,
  };
};

export default MDXPages;
