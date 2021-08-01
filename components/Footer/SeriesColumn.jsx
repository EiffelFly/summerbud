import FooterLinksColumnLayout from "../layouts/FooterLinksColumnLayout";
import useTranslation from "../../hooks/useTranslation";

const SeriesColumn = () => {
  const { t } = useTranslation();
  const seriesColumn = {
    title: t("footer.series._title"),
    links: [
      {
        title: t("footer.series.builder"),
        url: "series/the-builders-life",
      },
      {
        title: t("footer.series.nextjs"),
        url: "series/blogging-with-nextjs",
      },
      {
        title: t("footer.series.endOfLine"),
        url: "series/the-other-end-of-line",
      },
      {
        title: t("footer.series.literature"),
        url: "series/the-master-degree-of-taiwanese-literature",
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
