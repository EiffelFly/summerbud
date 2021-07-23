import TagListRow from "./TagListRow"

const PostTitle = ({ title, tags, className }) => {
  return (
    <div
      className={"flex flex-col border-b border-sd-brgreen dark:border-sd-brcyan " + className}
    >
      <div
        className="mb-8 font-sans text-sd-black dark:text-sd-white text-xl sm:text-3xl lg:text-5xl font-semibold lg:leading-normal"
      >
        {title}
      </div>
      <div
        className="mb-4 flex flex-row"
      >
        <TagListRow tags={tags} className={"mr-auto"} />
      </div>
    </div>
  )
}

export default PostTitle;