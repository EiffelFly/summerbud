import CustomLink from "./CustomLink";
import TimeBlock from "./TimeBlock";

const DevlogsList = ({ devlogs }) => {
  return (
    <div className="flex flex-col gap-y-4 py-2 px-4 bg-sd-white border border-sd-brgreen border-opacity-0 dark:border-opacity-0 hover:border-opacity-100 dark:hover:border-opacity-100 dark:border-sd-brcyan dark:bg-sd-black rounded-md">
      {devlogs.map((devlog) => (
        <CustomLink key={devlog.metadata.title} href={`${devlog.path}`}>
          <div className="flex flex-col gap-y-2 md:gap-y-0 md:flex-row font-sans group cursor-pointer">
            <div className="text-base text-sd-black dark:text-sd-white mr-auto">
              {devlog.metadata.title}
            </div>
            <TimeBlock
              date={devlog.metadata.publishedAt}
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
