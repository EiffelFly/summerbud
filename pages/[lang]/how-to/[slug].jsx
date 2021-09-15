import { useMemo, Fragment } from "react";
import { getMDXComponent } from "mdx-bundler/client";
import Header from "../../../components/Header";
import SectionContainer from "../../../components/SectionContainer";
import {
  constructPathParams,
  getAllArticleContent,
} from "../../../lib/files";
import Footer from "../../../components/Footer";
import CustomLink from "../../../components/CustomLink";
import PostTitle from "../../../components/PostTitle";
import SubscriptionForm from "../../../components/SubscriptionForm";
import CustomImage from "../../../components/CustomImage";
import PostSeo from "../../../components/PostSeo";
import useTranslation from "../../../hooks/useTranslation";

const MDXPages = ({ code, metadata }) => {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  const { t, locale } = useTranslation();
  return (
    <div className="bg-sd-brwhite dark:bg-sd-brblack w-screen min-h-screen">
      <SectionContainer gap={"gap-y-16"}>
        <PostSeo metadata={metadata} locale={locale} type={"how-to"} />
        <Header hasTranslation={metadata.hasTranslation} />
        <article className="md:mx-auto prose prose-lg py-12 dark:prose-dark">
          <PostTitle
            title={metadata.title}
            tags={metadata.tags}
            className={"mb-20"}
          />
          <Component
            components={{ CustomLink: CustomLink, Image: CustomImage }}
          />
          <SubscriptionForm className={"mt-80"} />
        </article>
        <Footer />
      </SectionContainer>
    </div>
  );
};

export const getStaticProps = async ({ params }) => {
  const { code, metadata } = await getAllArticleContent({
    type: "howTo",
    pathTail: `${params.slug}/index.${params.lang}.mdx`,
  });

  return {
    props: {
      code,
      metadata,
    },
  };
};

export const getStaticPaths = () => {
  const paths = constructPathParams("howTo");
  return {
    paths,
    fallback: false,
  };
};

export default MDXPages;