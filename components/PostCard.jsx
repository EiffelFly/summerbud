
const PostCard = ({ title, description }) => {
  return (
    <div
      className="flex flex-col gap-y-6 rounded-md bg-sd-white dark:bg-sd-black p-8"
    >
      <h2
        className="font-sans font-semibold text-2xl text-sd-black dark:text-sd-white"
      >
        {title}
      </h2>
      <p
        className="font-sans font-normal text-base text-sd-brgreen dark:text-sd-brcyan"
      >
        {description}
      </p>
    </div>
  )
}

export default PostCard;