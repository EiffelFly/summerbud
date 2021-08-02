import CustomLink from "./CustomLink";

const SeriesArticlesList = ({ articles, className }) => {
  return (
    <div className={"flex flex-col gap-y-8 " + className}>
      {articles.map((article) => (
        <CustomLink href={article.path} key={article.path}>
          <div
            className={
              "flex flex-col gap-y-4 font-sans rounded-lg bg-sd-white dark:bg-sd-black p-6 border border-sd-black dark:border-sd-white border-opacity-0 dark:border-opacity-0 hover:border-opacity-100 dark:hover:border-opacity-100 cursor-pointer"
            }
          >
            <div className="text-lg text-sd-black dark:text-sd-white font-semibold">
              {article.metadata.title}
            </div>
            <div className="text-base text-sd-brgreen dark:text-sd-brcyan font-normal">
              {article.metadata.description}
            </div>
          </div>
        </CustomLink>
      ))}
    </div>
  );
};

export default SeriesArticlesList;
