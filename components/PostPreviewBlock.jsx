
import TagListRow from "./TagListRow";

const PostPreviewBlock = ({ title, description, tags }) => {
  return (
    <div
      className="flex flex-col rounded-md bg-sd-white dark:bg-sd-black p-8"
    >
      <h2
        className="mb-6 font-sans font-semibold text-2xl text-sd-black dark:text-sd-white"
      >
        {title}
      </h2>
      <p
        className="mb-6 font-sans font-normal text-base text-sd-brgreen dark:text-sd-brcyan"
      >
        {description}
      </p>
      <TagListRow tags={tags} />
    </div>
  )
}

export default PostPreviewBlock;