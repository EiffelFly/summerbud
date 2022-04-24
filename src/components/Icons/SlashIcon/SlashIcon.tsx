import { Component } from "solid-js";
import IconBase from "../IconBase";

export type SlashIconProps = {
  styleName: string;
};

const SlashIcon: Component<SlashIconProps> = ({ styleName }) => {
  return (
    <IconBase styleName={styleName} viewBox="0 0 16 16">
      <path d="M11.354 4.646a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708l6-6a.5.5 0 0 1 .708 0z" />
    </IconBase>
  );
};

export default SlashIcon;
