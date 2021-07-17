import CustomLink from "../CustomLink";
import GithubIcon from "../icons/GithubIcon";

const GithubRepoButton = () => {
  return (
    <CustomLink
      href="https://github.com/EiffelFly"
    >
      <a
        className="flex p-2"
      >
        <GithubIcon size={5} />
      </a>
    </CustomLink>
  )
};

export default GithubRepoButton;