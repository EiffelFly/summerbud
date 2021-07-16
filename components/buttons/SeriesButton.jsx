import Link from "next/link";
import CustomLink from "../CustomLink";

const AboutButton = () => {
  return (
    <CustomLink href="/series">
      <a className="py-1 font-sans font-semibold text-xl text-sd-black dark:text-sd-white link-underline align-baseline">
        Series
      </a>
    </CustomLink>
  );
};

export default AboutButton;
