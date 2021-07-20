
const TagBlock = ({ tagName }) => {
  return (
    <div
      className="rounded-md px-2 py-0.5 border border-sd-brgreen dark:border-sd-brcyan font-sans font-normal text-sm text-sd-brgreen dark:text-sd-brcyan"
    >
      {tagName}
    </div>
  )
}

export default TagBlock;