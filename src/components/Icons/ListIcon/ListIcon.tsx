import { Component } from "solid-js";
import IconBase from "../IconBase";

export type ListIconProps = {
  styleName: string;
};

const ListIcon: Component<ListIconProps> = ({ styleName }) => {
  return (
    <IconBase styleName={styleName} viewBox="0 0 16 16">
      <path
        fill-rule="evenodd"
        d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
      />
    </IconBase>
  );
};

export default ListIcon;
