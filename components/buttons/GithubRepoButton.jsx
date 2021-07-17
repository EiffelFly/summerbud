import CustomLink from "../CustomLink";
import GithubIcon from "../icons/GithubIcon";

const GithubRepoButton = () => {
  return (
    <CustomLink
      href="https://github.com/EiffelFly"
    >
      <GithubIcon size={5} />
    </CustomLink>
  )
};

export default GithubRepoButton;