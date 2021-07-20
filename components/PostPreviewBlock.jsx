import CustomLink from "./CustomLink";
import TagListRow from "./TagListRow";

const PostPreviewBlock = ({ title, description, tags, locale, slug }) => {
  return (
    <CustomLink
      href={`/posts/${slug}`}
    >
      <a className="flex flex-col rounded-md border border-sd-white dark:border-sd-black bg-sd-white dark:bg-sd-black hover:border hover:border-sd-brcyan p-8 dark:hover:border dark:hover:border-sd-brgreen">
        <h2 className="mb-6 font-sans font-semibold text-2xl text-sd-black dark:text-sd-white">
          {title}
        </h2>
        <p className="mb-6 font-sans font-normal text-base text-sd-brgreen dark:text-sd-brcyan">
          {description}
        </p>
        <TagListRow tags={tags} />
      </a>
    </CustomLink>
  );
};

export default PostPreviewBlock;
