import CustomLink from "../CustomLink";
import useTranslation from "../../hooks/useTranslation";

const AboutButton = () => {
  const { t } = useTranslation();
  return (
    <CustomLink href={`/series`}>
      <div className="py-1 font-sans font-semibold cursor-pointer text-xl text-sd-black dark:text-sd-white link-underline align-baseline">
        {t("components.seriesButton")}
      </div>
    </CustomLink>
  );
};

export default AboutButton;
