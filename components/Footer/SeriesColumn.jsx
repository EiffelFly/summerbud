import FooterLinksColumnLayout from "../layouts/FooterLinksColumnLayout";
import useTranslation from "../../hooks/useTranslation";

const SeriesColumn = () => {
  const { t } = useTranslation();
  const seriesColumn = {
    title: t("footer.series._title"),
    links: [
      {
        title: t("footer.series.builder"),
        url: "/series/the-builders-life/intro",
      },
      {
        title: t("footer.series.nextjs"),
        url: "/series/blogging-with-nextjs/intro",
      },
      {
        title: t("footer.series.endOfLine"),
        url: "/series/the-other-end-of-line/intro",
      },
      {
        title: t("footer.series.literature"),
        url: "/series/the-master-degree-of-taiwanese-literature-and-the-upside-down-world/intro",
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
