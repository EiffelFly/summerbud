import GithubRepoButton from "./buttons/GithubRepoButton";
import TwitterProfileButton from "./buttons/TwitterProfileButton";
import useTranslation from "../hooks/useTranslation";
import FooterLinksColumnLayout from "./layouts/FooterLinksColumnLayout";

const Footer = () => {
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
        title: t("footer.pages.snippets"),
        url: "/snippets",
      },
      {
        title: t("footer.pages.lessenLearned"),
        url: "/lessen-learned",
      },
    ],
  };

  const projectsColumn = {
    title: t("footer.projects._title"),
    links: [
      {
        title: t("footer.projects.working"),
        url: "projects/what-i-am-currently-working-on",
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

  const novelsColumn = {
    title: t("footer.novels._title"),
    links: [
      {
        title: t("footer.novels.rat"),
        url: "/novels/the-rat",
      },
      {
        title: t("footer.novels.beast"),
        url: "/novels/the-beast",
      },
      {
        title: t("footer.novels.breakfast"),
        url: "/novels/a-boiled-egg-for-breakfast",
      },
    ]
  }


  return (
    <footer className="flex flex-col py-8 mt-48 border-t border-sd-bryellow dark:border-sd-brgreen">
      <div className="flex flex-row mb-16 justify-between">
        <FooterLinksColumnLayout
          title={pagesColumn.title}
          links={pagesColumn.links}
        />
        <FooterLinksColumnLayout
          title={projectsColumn.title}
          links={projectsColumn.links}
        />
        <FooterLinksColumnLayout
          title={seriesColumn.title}
          links={seriesColumn.links}
        />
        <FooterLinksColumnLayout
          title={novelsColumn.title}
          links={novelsColumn.links}
        />
      </div>
      <div className="flex flex-row">
        <div className="flex mr-auto font-sans text-sm font-light text-sd-black dark:text-sd-white">
          <div className="flex flex-row gap-x-4">
            邱柏鈞 <span>Po-Chun Chiu</span>
          </div>
        </div>
        <div className="flex flex-row ml-auto my-auto gap-x-6">
          <GithubRepoButton />
          <TwitterProfileButton />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
