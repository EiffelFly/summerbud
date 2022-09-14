import { Component } from "solid-js";
import { GithubIcon } from "./Icons";

const Footer: Component = () => {
  return (
    <div class="mx-auto flex w-full max-w-4xl flex-row border-t border-sd-brgreen py-10 lg:max-w-5xl">
      <div class="mr-auto flex font-sans text-sm font-light text-sd-black dark:text-sd-white">
        <div class="flex flex-row gap-x-4">
          邱柏鈞<span>|</span>
          <span>Po-Chun Chiu</span>
        </div>
      </div>
      <div class="my-auto ml-auto flex flex-row gap-x-6">
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
