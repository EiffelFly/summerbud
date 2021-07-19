// The <a> tag is not included in an internal link. It will need to be added when you use this component
// credit: https://github.com/ekomenyong/ekomenyong.com/blob/main/src/components/Link.js

import Link from "next/link";
import useTranslation from "../hooks/useTranslation";

const CustomLink = ({ href, children, ...props }) => {
  const isInternalLink = href && (href.startsWith("/") || href.startsWith("#"));

  const { t, locale } = useTranslation();

  if (isInternalLink) {
    const fullPath = "/" + locale + href;
    return (
      <Link href={fullPath} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
};

export default CustomLink;
