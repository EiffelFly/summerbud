import FooterLinksColumnLayout from "../layouts/FooterLinksColumnLayout";
import useTranslation from "../../hooks/useTranslation";

const ProjectsColumn = () => {
  const { t } = useTranslation();
  const projectsColumn = {
    title: t("footer.projects._title"),
    links: [
      {
        title: t("footer.projects.working"),
        url: "/projects",
      },
      {
        title: t("footer.projects.totuslink"),
        url: "/projects/totuslink",
      },
      {
        title: t("footer.projects.hologram"),
        url: "/projects/hologram",
      },
      {
        title: t("footer.projects.hololink"),
        url: "/projects/hololink",
      },
      {
        title: t("footer.projects.pnyx"),
        url: "/projects/pnyx",
      },
    ],
  };
  return (
    <FooterLinksColumnLayout
      title={projectsColumn.title}
      links={projectsColumn.links}
    />
  );
};

export default ProjectsColumn;
