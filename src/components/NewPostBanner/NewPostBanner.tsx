import { Component } from "solid-js";
import { Nullable } from "../../types/general";
import cn from "clsx";

export type NewPostBannerProps = {
  title: string;
  url: string;
  position: Nullable<string>;
};

const NewPostBanner: Component<NewPostBannerProps> = ({
  title,
  url,
  position,
}) => {
  return (
    <div class={cn("flex flex-row gap-x-5", position)}>
      <div class="flex rounded-md bg-sd-yellow px-2.5 py-0.5">
        <p class="m-auto font-sans text-sm text-sd-brwhite">new</p>
      </div>
      <a
        href={url}
        class="font-sans text-lg text-sd-brgreen underline dark:text-sd-brblue"
      >
        {title}
      </a>
    </div>
  );
};

export default NewPostBanner;
