import CustomLink from "./CustomLink";
import TimeBlock from "./TimeBlock";

const DevlogsList = ({ elements }) => {
  return (
    <div className="flex flex-col gap-y-4">
      {elements.map((element) => (
        <CustomLink key={element.metadata.title} href={`${element.path}`}>
          <div className="flex flex-col gap-y-2 md:gap-y-0 md:flex-row p-4 font-sans cursor-pointer bg-sd-white border border-sd-brgreen border-opacity-0 dark:border-opacity-0 hover:border-opacity-100 dark:hover:border-opacity-100 dark:border-sd-brcyan dark:bg-sd-black rounded-md">
            <div className="text-base text-sd-black dark:text-sd-white mr-auto">
              {element.metadata.title}
            </div>
            <TimeBlock
              date={element.metadata.publishedAt}
              className={
                "text-sm font-light text-sd-brgreen dark:text-sd-brcyan align-middle"
              }
            />
          </div>
        </CustomLink>
      ))}
    </div>
  );
};

export default DevlogsList;
