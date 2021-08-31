import CustomLink from "../CustomLink";
import useTranslation from "../../hooks/useTranslation";
import ArrowLeftCircleIcon from "../icons/ArrowLeftCircleIcon";

const BackToSeries = ({ seriesSlug, seriesKey }) => {
  const { t } = useTranslation();

  return (
    <CustomLink href={`/series/${seriesSlug}/outline`}>
      <button className="flex flex-row gap-x-3 bg-sd-white dark:bg-sd-black px-8 py-3 rounded-md border border-opacity-0 border-sd-black dark:border-opacity-0 dark:border-sd-white hover:border-opacity-100 dark:hover:border-opacity-100">
        <ArrowLeftCircleIcon className={"w-5 h-5 text-sd-black dark:text-sd-white"} />
        {t(`series.${seriesKey}`)}
      </button>
    </CustomLink>
  );
};

export default BackToSeries;
