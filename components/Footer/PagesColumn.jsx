import FooterLinksColumnLayout from "../layouts/FooterLinksColumnLayout";
import useTranslation from "../../hooks/useTranslation";

const PagesColumn = () => {
  const { t } = useTranslation();
  const pagesColumn = {
    title: t("footer.pages._title"),
    links: [
      {
        title: t("footer.pages.about"),
        url: "/about",
      },
      {
        title: t("footer.pages.posts"),
        url: "/posts",
      },
      {
        title: t("footer.pages.series"),
        url: "/series",
      },
      {
        title: t("footer.pages.projects")
      },
      {
        title: t("footer.pages.lessonLearned"),
        url: "/lesson-learned",
      },
      
    ],
  };
  return (
    <FooterLinksColumnLayout
      title={pagesColumn.title}
      links={pagesColumn.links}
    />
  );
};

export default PagesColumn;
