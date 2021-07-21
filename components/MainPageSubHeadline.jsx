import useTranslation from "../hooks/useTranslation";

const MainPageSubHeadline = () => {

  const { t } = useTranslation();

  return (
    <div
      className="mx-auto font-sans text-lg font-normal text-sd-brgreen dark:text-sd-brcyan w-7/12 text-center"
    >
      {t("pages.main.subHeadline")}
    </div>
  )
};

export default MainPageSubHeadline;
