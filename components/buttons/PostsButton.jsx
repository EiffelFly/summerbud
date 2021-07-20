import CustomLink from "../CustomLink";
import useTranslation from "../../hooks/useTranslation";

const PostsButton = () => {

  const { t, locale } = useTranslation();

  return (
    <CustomLink href={`/posts`}>
      <div className="py-1 font-sans cursor-pointer font-semibold text-xl text-sd-black dark:text-sd-white link-underline align-baseline">
        {t("components.postsButton")}
      </div>
    </CustomLink>
  );
};

export default PostsButton;