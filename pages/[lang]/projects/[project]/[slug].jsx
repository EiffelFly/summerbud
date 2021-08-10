import { useMemo } from "react";
import { getMDXComponent } from "mdx-bundler/client";
import Header from "../../../../components/Header";
import PageSeo from "../../../../components/PageSeo";
import SectionContainer from "../../../../components/SectionContainer";
import { getAllProjectPath, getProjectContent } from "../../../../lib/files";
import Footer from "../../../../components/Footer";
import CustomLink from "../../../../components/CustomLink";
import PostTitle from "../../../../components/PostTitle";
import SubscriptionForm from "../../../../components/SubscriptionForm";
const MDXPages = ({ code, metadata }) => {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  return (
    <div className="bg-sd-brwhite dark:bg-sd-brblack w-screen min-h-screen">
      <SectionContainer gap={"gap-y-16"}>
        <PageSeo metadata={metadata} />
        <Header hasTranslation={metadata.hasTranslation} />
        <article className="md:mx-auto prose prose-lg py-12 dark:prose-dark">
          <PostTitle
            title={metadata.title}
            tags={metadata.tags}
            className={"mb-20"}
          />
          <Component components={{ CustomLink: CustomLink }} />
          <SubscriptionForm className={"mt-80"} />
        </article>
        <Footer />
      </SectionContainer>
    </div>
  );
};

export const getStaticProps = async ({ params }) => {
  const { code, metadata } = await getProjectContent({
    isIndex: false,
    project: params.project,
    lang: params.lang,
    slug: params.slug,
  });
  return {
    props: {
      code,
      metadata,
    },
  };
};

export const getStaticPaths = () => {
  const paths = getAllProjectPath({ isIndex: false });
  return {
    paths,
    fallback: false,
  };
};

export default MDXPages;
