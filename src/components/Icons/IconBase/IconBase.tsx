import { Component } from "solid-js";
import cn from "clsx";

export type IconBaseProps = {
  styleName: string;
  viewBox: string;
};

const IconBase: Component<IconBaseProps> = ({
  styleName,
  viewBox,
  children,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      className={cn("flex", styleName)}
    >
      {children}
    </svg>
  );
};

export default IconBase;
