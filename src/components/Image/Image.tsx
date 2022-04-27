import { Component } from "solid-js";
import cn from "clsx";

export type ImageProps = {
  src: string;
  width: string;
  height: string;
  alt: string;
};

const Image: Component<ImageProps> = ({ src, width, height, alt }) => {
  return <img src={src} class={cn(width, height)} alt={alt} />;
};

export default Image;
