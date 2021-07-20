import TagBlock from "./TagBlock";

const TagListRow = ({ tags, className }) => {
  return (
    <div className={"flex flex-row gap-x-2 " + className}>
      {tags.map((tag) => (
        <TagBlock key={tag} tagName={tag} />
      ))}
    </div>
  );
};

export default TagListRow;
