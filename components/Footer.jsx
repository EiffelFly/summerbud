import GithubRepoButton from "./buttons/GithubRepoButton"
import TwitterProfileButton from "./buttons/TwitterProfileButton"

const Footer = () => {
  return (
    <footer
      className="flex flex-row py-8 mt-48 border-t border-sd-bryellow dark:border-sd-brgreen"
    >
      <div
        className="flex mr-auto font-sans text-sm font-light text-sd-black dark:text-sd-white"
      >
        <div 
          className="flex flex-row gap-x-4"
        >
          邱柏鈞 <span>Po-Chun Chiu</span>
        </div>
      </div>
      <div
        className="flex flex-row ml-auto my-auto gap-x-6"
      >
        <GithubRepoButton />
        <TwitterProfileButton />
      </div>
    </footer>
  )
};

export default Footer;