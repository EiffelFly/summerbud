import Header from "../../components/Header";
import SectionContainer from "../../components/SectionContainer";
import useTranslation from "../../hooks/useTranslation";
import { getAllSlugs } from "../../lib/files";
import { getSortedPostsData } from "../../lib/files";
import Footer from "../../components/Footer";
import PostPreviewList from "../../components/PostPreviewList";

const Posts = ({ allPostsData, locale }) => {
  const { t } = useTranslation();

  const postsData = allPostsData.filter((post) => post.lang === locale);
  return (
    <div className="bg-sd-brwhite dark:bg-sd-brblack w-screen min-h-screen">
      <SectionContainer gap="gap-y-16">
        <Header />
        <PostPreviewList posts={postsData} locale={locale} />
        <Footer />
      </SectionContainer>
    </div>
  );
};

export const getStaticProps = async ({ params }) => {
  const allPostsData = getSortedPostsData();
  console.log(allPostsData);
  return {
    props: {
      allPostsData,
      locale: params.lang
    },
  };
};

export const getStaticPaths = () => {
  const paths = getAllSlugs("post");
  console.log(paths);
  return {
    paths,
    fallback: false,
  };
};

export default Posts;
