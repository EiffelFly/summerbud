import TagBlock from "./TagBlock";

const TagListRow = ({ tags, className }) => {
  return (
    <div className={"flex flex-col gap-y-2 md:flex-row md:gap-x-2 " + className}>
      {tags.map((tag) => (
        <TagBlock key={tag} tagName={tag} />
      ))}
    </div>
  );
};

export default TagListRow;
