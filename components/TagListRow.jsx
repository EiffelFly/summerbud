import TagBlock from "./TagBlock"

const TagListRow = ({ tags }) => {
  return (
    <div
      className="flex flex-row gap-x-2"
    >
      {tags.map((tag) => (
        <TagBlock key={tag} tagName={tag} />
      ))}
    </div>
  )
}

export default TagListRow;