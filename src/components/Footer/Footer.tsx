import { Component } from "solid-js";

const Footer: Component = () => {
  return (
    <div className="flex flex-row py-10">
      <div className="flex mr-auto font-sans text-sm font-light text-sd-black dark:text-sd-white">
        <div className="flex flex-row gap-x-4">
          邱柏鈞<span>|</span>
          <span>Po-Chun Chiu</span>
        </div>
      </div>
      <div className="flex flex-row ml-auto my-auto gap-x-6"></div>
    </div>
  );
};

export default Footer;
