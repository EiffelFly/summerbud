import { Component } from "solid-js";
import cn from "clsx";
import { Nullable } from "../../types/general";

export type ImageProps = {
  src: Nullable<string>;
  width: string;
  height: string;
  alt: Nullable<string>;
  marginBottom: Nullable<string>;
  source: Nullable<string>;
  position: Nullable<string>
};

const Image: Component<ImageProps> = ({
  src,
  width,
  height,
  alt,
  source,
  marginBottom,
  position
}) => {
  if (!src) return null;
  return (
    <div class={cn("flex flex-col gap-y-2.5", marginBottom, position)}>
      <img
        src={src}
        class={cn(width, height, " object-contain")}
        alt={alt ? alt : undefined}
      />
      {source ? (
        <a class="ml-auto text-sd-black dark:text-sd-brcyan underline" href={source} target="_blank" rel="noopener">
          {alt}
        </a>
      ) : null}
    </div>
  );
};

export default Image;
