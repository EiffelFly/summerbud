import SectionContainer from "../components/SectionContainer"
import Footer from "./Footer"
import Header from "./Header"

const Post = ({ children, meta }) => {
  return (
    <div
      className="bg-sd-brwhite dark:bg-sd-brblack w-screen min-h-screen"
    >
      <SectionContainer>
        <Header />
        <article className="prose prose-lg py-12 dark:prose-dark">
          {children}
        </article>
        <Footer />
      </SectionContainer>
    </div>
  )
};

export default Post;
