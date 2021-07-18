import { getAllSlugs } from "../../lib/files";


const Pages = () => {
  return (
    <div>
      hi
    </div>
  )
}

export const getStaticProps = () => {
  return {
    props: {}
  }
}

export const getStaticPaths = () => {
  const paths = getAllSlugs("page");
  console.log(paths)
  return {
    paths,
    fallback: false,
  };
}



export default Pages;