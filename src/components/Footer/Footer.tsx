import { Component } from "solid-js";
import { GithubIcon } from "../Icons";

const Footer: Component = () => {
  return (
    <div className="flex flex-row border-t border-sd-brgreen py-10">
      <div className="mr-auto flex font-sans text-sm font-light text-sd-black dark:text-sd-white">
        <div className="flex flex-row gap-x-4">
          邱柏鈞<span>|</span>
          <span>Po-Chun Chiu</span>
        </div>
      </div>
      <div className="my-auto ml-auto flex flex-row gap-x-6">
        <a
          href="https://github.com/EiffelFly"
          target="_blank"
          rel="noreferrer noopenner"
        >
          <GithubIcon styleName="w-5 h-5 fill-sd-brgreen dark:fill-sd-brcyan" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
