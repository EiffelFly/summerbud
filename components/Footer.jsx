import GithubRepoButton from "./buttons/GithubRepoButton";
import TwitterProfileButton from "./buttons/TwitterProfileButton";
import NovelsColumn from "./Footer/NovelsColumn";
import PagesColumn from "./Footer/PagesColumn";
import ProjectsColumn from "./Footer/ProjectsColumn";
import SeriesColumn from "./Footer/SeriesColumn";

const Footer = () => {
  return (
    <footer className="flex flex-col py-8 mt-48 border-t border-sd-bryellow dark:border-sd-brgreen">
      <div className="flex flex-col gap-y-8 md:gap-y-0 md:flex-row mb-16 md:justify-between">
        <PagesColumn />
        <ProjectsColumn />
        <SeriesColumn />
        <NovelsColumn />
      </div>
      <div className="flex flex-row">
        <div className="flex mr-auto font-sans text-sm font-light text-sd-black dark:text-sd-white">
          <div className="flex flex-row gap-x-4">
            邱柏鈞<span>|</span><span>Po-Chun Chiu</span>
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
