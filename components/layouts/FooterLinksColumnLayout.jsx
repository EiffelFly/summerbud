import CustomLink from "../CustomLink";

const FooterLinksColumnLayout = ({ title, links }) => {
  return (
    <div className="flex flex-col font-sans">
      <div className="mb-4 text-xl font-semibold text-sd-black dark:text-sd-white">
        {title}
      </div>
      <div className="flex flex-col gap-y-2 text-sm">
        {links.map((link) => (
          <CustomLink key={link.title} href={link.url}>
            <div className="font-normal text-sd-brgreen dark:text-sd-brcyan cursor-pointer hover:text-sd-black dark:hover:text-sd-white">
              {link.title}
            </div>
          </CustomLink>
        ))}
      </div>
    </div>
  );
};

export default FooterLinksColumnLayout;
