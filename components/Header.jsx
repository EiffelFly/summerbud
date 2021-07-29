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
import MapIcon from "./icons/MapIcon";
import { useEffect, useState } from "react";
import XIcon from "./icons/XIcon";
const Header = () => {
  const title = "{ summerbud }";
  const { locale } = useTranslation();
  const { route, asPath } = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false)
  }, [asPath])

  return (
    <header className="flex flex-col lg:flex-row py-8">
      <div className="flex flex-row mb-8 md:mb-0">
        <CustomLink href={"/"}>
          <a className="flex flex-row items-center mr-auto gap-x-6">
            <SummerbudAvatar size="45" />
            <div className="font-sans font-semibold text-sd-brgreen dark:text-sd-brcyan text-lg sm:text-xl">
              {title}
            </div>
          </a>
        </CustomLink>
        <button
          className="lg:hidden my-auto ml-auto w-8 h-8 border border-sd-brgreen dark:border-sd-brcyan rounded-md"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <XIcon size={6} /> : <MapIcon size={4} />}
        </button>
      </div>

      <div className="hidden lg:flex lg:flex-row items-center ml-auto gap-x-8">
        <AboutButton />
        <SeriesButton />
        <PostsButton />
        <LessenLearnedButton />
        <SnippetButton />
        <div className="flex flex-row gap-x-4 ml-8">
          {!route.includes("posts") && <TranslationDropdown />}
          <ThemeToggle />
        </div>
      </div>

      {isOpen && (
        <div className="flex flex-col lg:hidden gap-y-4">
          <AboutButton />
          <SeriesButton />
          <PostsButton />
          <LessenLearnedButton />
          <SnippetButton />
          <div className="flex flex-col gap-y-4 lg:gap-x-4 justify-items-start items-start mt-8">
            {!route.includes("posts") && <TranslationDropdown />}
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
