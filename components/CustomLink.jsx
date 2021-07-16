// The <a> tag is not included in an internal link. It will need to be added when you use this component
// credit: https://github.com/ekomenyong/ekomenyong.com/blob/main/src/components/Link.js

import Link from "next/link";

const CustomLink = ({ href, children, ...props }) => {
  const isInternalLink = href && (href.startsWith("/") || href.startsWith("#"));

  if (isInternalLink) {
    return (
      <Link href={href} {...props}>
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
