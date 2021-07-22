import SummerbudAvatar from "./SummerbudAvatar";
import AboutButton from "./buttons/AboutButton";
import SeriesButton from "./buttons/SeriesButton";
import ThemeToggle from "./buttons/ThemeToggle";
import PostsButton from "./buttons/PostsButton";
import CustomLink from "./CustomLink";
import useTranslation from "../hooks/useTranslation";
import TranslationDropdown from "./TranslationDropdown";
import { useRouter } from "next/dist/client/router";
import LessenLearnedButton from "./buttons/LessenLearnedButton";
import SnippetButton from "./buttons/SnippetButton";
const Header = () => {
  const title = "{ summerbud }";
  const { locale } = useTranslation();
  const { route } = useRouter();

  return (
    <header className="flex flex-row py-8">
      <CustomLink href={"/"}>
        <a className="flex flex-row items-center mr-auto gap-x-6">
          <SummerbudAvatar size="45" />
          <div className="font-sans font-semibold text-sd-brgreen dark:text-sd-brcyan text-xl">
            {title}
          </div>
        </a>
      </CustomLink>

      <div className="flex flex-row items-center ml-auto gap-x-8">
        <AboutButton />
        <SeriesButton />
        <PostsButton />
        <LessenLearnedButton />
        <SnippetButton />
        <div
          className="flex flex-row gap-x-4 ml-8"
        >
          { !route.includes("posts") && <TranslationDropdown />}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
