import { Component } from "solid-js";
import cn from "clsx";

export type SummerbudAvatarProps = {
  styleName: string;
};

const SummerbudAvatar: Component<SummerbudAvatarProps> = ({ styleName }) => {
  return <img src="/me.jpeg" class={cn("rounded-full my-auto", styleName)} />;
};

export default SummerbudAvatar;
