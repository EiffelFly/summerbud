import CustomLink from "./CustomLink";

const PostSeriesBreadcrum = ({ seriesName, seriesSlug }) => {
  return (
    <div className="flex flex-row">
      <CustomLink href={"/series"}>
        <div>series</div>
      </CustomLink>
      <CustomLink href={seriesUrl}>
        <div>{seriesName}</div>
      </CustomLink>
    </div>
  );
};

export default PostSeriesBreadcrum;
