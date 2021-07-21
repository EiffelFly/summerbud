import useTranslation from "../hooks/useTranslation";

const MainPageHeadline = () => {

  const { t } = useTranslation();

  return (
    <div
      className="mx-auto font-sans font-bold text-5xl text-sd-black dark:text-sd-white text-center"
    >
      {t("pages.main.headline")}
    </div>
  )
}

export default MainPageHeadline;