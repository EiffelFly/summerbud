import { getAllProjectPath } from "../../../../lib/files";
const MDXPages = () => {
  return <div>hi</div>;
};

export const getStaticPaths = () => {
  const paths = getAllProjectPath();
  console.log(paths);
  return {
    paths,
    fallback: false,
  };
};

export default MDXPages;
