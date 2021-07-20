import { getAllSlugs } from "../../lib/files";
import { getSortedPostsData } from "../../lib/files";

const Posts = ({ allPostsData }) => {
  return <div></div>;
};

export const getStaticProps = async ({ params }) => {
  const allPostsData = getSortedPostsData();
  console.log(allPostsData)
  return {
    props: {
      allPostsData,
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
