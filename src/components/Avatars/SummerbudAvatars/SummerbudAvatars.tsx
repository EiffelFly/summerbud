import { Component } from "solid-js";
import cn from "clsx";

export type SummberbudAvatarProps = {
  styleName: string;
};

const SummberbudAvatar: Component<SummberbudAvatarProps> = ({ styleName }) => {
  return <img src="/me.jpeg" class={cn("rounded-full my-auto", styleName)} />;
};

export default SummberbudAvatar;
