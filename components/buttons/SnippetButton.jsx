import CustomLink from "../CustomLink";
import useTranslation from "../../hooks/useTranslation";

const SnippetButton = () => {

  const { t, locale } = useTranslation();

  return (
    <CustomLink href={`/snippet`}>
      <div className="py-1 font-sans cursor-pointer font-semibold text-xl text-sd-black dark:text-sd-white link-underline align-baseline">
        {t("components.snippetButton")}
      </div>
    </CustomLink>
  );
};

export default SnippetButton;
