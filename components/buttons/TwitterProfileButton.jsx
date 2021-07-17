import CustomLink from "../CustomLink";
import TwitterIcon from "../icons/TwitterIcon";

const TwitterProfileButton = () => {
  return (
    <CustomLink
      href="https://twitter.com/EiffelFly"
    >
      <a
        className="flex p-2"
      >
        <TwitterIcon size={5} />
      </a>
    </CustomLink>
  )
};

export default TwitterProfileButton;