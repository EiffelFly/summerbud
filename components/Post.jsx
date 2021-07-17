import SectionContainer from "../components/SectionContainer"
import Header from "./Header"

const Post = ({ children, meta }) => {
  return (
    <div
      className="bg-sd-brwhite dark:bg-sd-brblack w-screen min-h-screen"
    >
      <SectionContainer>
        <Header />
      </SectionContainer>
      <SectionContainer>
        <article className="prose prose-xl prose-indigo py-12 dark:prose-dark">
          {children}
        </article>
      </SectionContainer>
    </div>
  )
};

export default Post;
