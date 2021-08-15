import FooterLinksColumnLayout from "../layouts/FooterLinksColumnLayout";
import useTranslation from "../../hooks/useTranslation";

const NovelsColumn = () => {
  const { t } = useTranslation();
  const novelsColumn = {
    title: t("footer.novels._title"),
    links: [
      {
        title: t("footer.novels.rat"),
        //url: "/novels/the-rat",
      },
      {
        title: t("footer.novels.beast"),
        //url: "/novels/the-beast",
      },
      {
        title: t("footer.novels.breakfast"),
        //url: "/novels/a-boiled-egg-for-breakfast",
      },
    ],
  };
  return (
    <FooterLinksColumnLayout
      title={novelsColumn.title}
      links={novelsColumn.links}
    />
  );
};

export default NovelsColumn;
