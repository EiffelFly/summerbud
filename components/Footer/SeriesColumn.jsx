import FooterLinksColumnLayout from "../layouts/FooterLinksColumnLayout";
import useTranslation from "../../hooks/useTranslation";

const SeriesColumn = () => {
  const { t } = useTranslation();
  const seriesColumn = {
    title: t("footer.series._title"),
    links: [
      {
        title: t("footer.series.builder"),
        url: "/series/the-builders-life/outline",
      },
      {
        title: t("footer.series.nextjs"),
        url: "/series/blogging-with-nextjs/outline",
      },
      {
        title: t("footer.series.endOfLine"),
        url: "/series/the-other-end-of-line/outline",
      },
      {
        title: t("footer.series.literature"),
        url: "/series/the-master-degree-of-taiwanese-literature-and-the-upside-down-world/outline",
      },
    ],
  };
  return (
    <FooterLinksColumnLayout
      title={seriesColumn.title}
      links={seriesColumn.links}
    />
  );
};

export default SeriesColumn;
