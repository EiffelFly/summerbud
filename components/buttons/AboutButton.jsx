import CustomLink from "../CustomLink";
import useTranslation from "../../hooks/useTranslation";

const AboutButton = () => {

  const { t, locale } = useTranslation();

  return (
    <CustomLink href={`${locale}/about`}>
      <div className="py-1 font-sans font-semibold text-xl text-sd-black dark:text-sd-white link-underline align-baseline">
        {t("components.aboutButton")}
      </div>
    </CustomLink>
  );
};

export default AboutButton;
