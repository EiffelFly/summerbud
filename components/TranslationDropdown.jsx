import { useRef, useState } from "react";
import { useOnClickOutside } from "../hooks/useOnClickOutside";
import TranslationIcon from "./icons/TranslationIcon";
import useTranslation from "../hooks/useTranslation";
import { useRouter } from "next/dist/client/router";
import { route } from "next/dist/next-server/server/router";

const TranslationDropdown = ({ className }) => {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  useOnClickOutside(ref, () => setIsOpen(false));
  const { locale, setLocale } = useTranslation();
  const router = useRouter();
  
  let url = router.route;

  if (router.query.slug) {
    url = url.replace("[slug]", router.query.slug);
  }

  return (
    <div className={"flex flex-col " + className}>
      <button className="p-2" onClick={() => setIsOpen(true)}>
        <TranslationIcon size={5} />
      </button>
      {isOpen && (
        <div className="relative" ref={ref}>
          <div className="flex flex-col fixed top-20 w-36 border bg-sd-brwhite dark:bg-sd-brblack border-sd-brgreen dark:border-sd-brcyan rounded-md">
            <button
              className="px-4 py-2 text-left text-sd-black dark:text-sd-white hover:bg-sd-white dark:hover:bg-sd-black rounded-md"
              onClick={() => {
                if (locale !== "zh-tw"){
                  setLocale("zh-tw");
                }
                
                setIsOpen(false);
                console.log(router.query.lang)
                if (router.query.lang && router.query.lang === "en") {
                  url = url.replace("[lang]", "zh-tw");
                  router.push(url);
                }
              }}
            >
              中文
            </button>
            <button
              className="px-4 py-2 text-left text-sd-black dark:text-sd-white hover:bg-sd-white dark:hover:bg-sd-black rounded-md"
              onClick={() => {
                if (locale !== "en"){
                  setLocale("en");
                }
                
                setIsOpen(false);
                if (router.query.lang && router.query.lang === "zh-tw") {
                  url = url.replace("[lang]", "en");
                  router.push(url);
                }
              }}
            >
              English
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TranslationDropdown;
