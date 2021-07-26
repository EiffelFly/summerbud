import { getAllSlugs, getContent } from "../../../lib/files";
import { useMemo } from "react";
import { getMDXComponent } from "mdx-bundler/client";
import SectionContainer from "../../../components/SectionContainer";
import Header from "../../../components/Header";
import CustomLink from "../../../components/CustomLink";
import Footer from "../../../components/Footer";
import PostTitle from "../../../components/PostTitle";
import PostSeo from "../../../components/PostSeo";
import SubscriptionForm from "../../../components/SubscriptionForm";

const MDXPages = ({ code, metadata }) => {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  return (
    <div className="bg-sd-brwhite dark:bg-sd-brblack w-screen min-h-screen">
      <SectionContainer gap="gap-y-16">
        <Header />
        <PostSeo metadata={metadata} />
        <article className="prose prose-lg py-12 dark:prose-dark">
          <PostTitle title={metadata.title} tags={metadata.tags} className={"mb-20"} />
          <Component components={{ CustomLink: CustomLink }} />
          <SubscriptionForm />
        </article>
        
        <Footer />
      </SectionContainer>
    </div>
  );
};

export const getStaticProps = async ({ params }) => {
  const { slug, code, metadata } = await getContent(
    params.slug,
    params.lang,
    "post"
  );
  return {
    props: {
      code,
      metadata,
    },
  };
};

export const getStaticPaths = () => {
  const paths = getAllSlugs("post");
  return {
    paths,
    fallback: false,
  };
};

export default MDXPages;
