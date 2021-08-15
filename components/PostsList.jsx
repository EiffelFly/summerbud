import TimeBlock from "./TimeBlock";
import useTranslation from "../hooks/useTranslation";
import CustomLink from "./CustomLink";

const PostsList = ({ posts }) => {
  const { locale } = useTranslation();
  return (
    <div className="flex flex-col gap-y-4">
      {posts.map((post) => (
        <CustomLink
          key={post.metadata.title}
          href={`${post.path}`}
        >
          <div
            className="flex flex-col gap-y-2 md:gap-y-0 md:flex-row font-sans group cursor-pointer"
          >
            <div className="text-base text-sd-black dark:text-sd-white mr-auto group-hover:underline">
              {post.metadata.title}
            </div>
            <TimeBlock
              date={post.metadata.publishedAt}
              className={
                "text-sm font-light text-sd-brgreen dark:text-sd-brcyan"
              }
            />
          </div>
        </CustomLink>
      ))}
    </div>
  );
};

export default PostsList;
