import { Component } from "solid-js";
import { Nullable } from "../types/general";
import cn from "clsx";
import { getFormattedTime } from "../utils";

export type NewPostBannerProps = {
  title: string;
  url: string;
  position: Nullable<string>;
  updateDate: string;
};

const NewPostBanner: Component<NewPostBannerProps> = ({
  title,
  url,
  position,
  updateDate,
}) => {
  return (
    <div class={cn("flex flex-row gap-x-10", position)}>
      <div class="my-auto flex rounded-md bg-sd-yellow px-3 py-1">
        <p class="m-auto font-sans text-sm text-sd-brwhite">new</p>
      </div>
      <a href={url} class="flex flex-col gap-y-1 font-sans" rel="prefetch">
        <p class="text-lg text-sd-brgreen underline dark:text-sd-brblue">
          {title}
        </p>
        <p class="text-sm text-sd-brblue">{getFormattedTime(updateDate)}</p>
      </a>
    </div>
  );
};

export default NewPostBanner;
