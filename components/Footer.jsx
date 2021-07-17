import GithubRepoButton from "./buttons/GithubRepoButton"
import TwitterProfileButton from "./buttons/TwitterProfileButton"

const Footer = () => {
  return (
    <footer
      className="flex flex-row py-8 mt-48 border-t border-sd-bryellow dark:border-sd-brgreen"
    >
      <div
        className="flex flex-row ml-auto my-auto gap-x-2"
      >
        <GithubRepoButton />
        <TwitterProfileButton />
      </div>
    </footer>
  )
};

export default Footer;