import Header from "../../../components/Header";
import SectionContainer from "../../../components/SectionContainer";
import { getSortedPostsData } from "../../../lib/files";
import Footer from "../../../components/Footer";
import PostsList from "../../../components/PostsList";
import PostIntro from "../../../components/PostsIntro";
import useTranslation from "../../../hooks/useTranslation";
import PageSeo from "../../../components/PageSeo";

const Posts = ({ allPostsData, locale }) => {
  const { t } = useTranslation();

  const metadata = {
    title: t("common.article") + " | Summerbud's writing",
    description: "",

  }
  const postsData = allPostsData.filter((post) => post.metadata.lang === locale);
  return (
    <div className="bg-sd-brwhite dark:bg-sd-brblack w-screen min-h-screen">
      <SectionContainer gap="gap-y-8">
        <PageSeo metadata={metadata} />
        <Header />
        <PostIntro />
        <PostsList posts={postsData} />
        <Footer />
      </SectionContainer>
    </div>
  );
};

export const getStaticProps = async ({ params }) => {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData,
      locale: params.lang
    },
  };
};

export const getStaticPaths = async () => {
  return {
    paths: [
      { params: { lang: "en" }},
      { params: { lang: "zh-tw" }},
    ],
    fallback: false,
  };
};

export default Posts;
