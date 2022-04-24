import { Component } from "solid-js";
import cn from "clsx";
import meImgRef from "../../../../public/me.jpeg";

export type SummberbudAvatarProps = {
  styleName: string;
};

const SummberbudAvatar: Component<SummberbudAvatarProps> = ({ styleName }) => {
  return <img src={meImgRef} class={cn("rounded-full", styleName)} />;
};

export default SummberbudAvatar;
