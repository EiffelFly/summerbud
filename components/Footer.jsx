import GithubRepoButton from "./buttons/GithubRepoButton"

const Footer = () => {
  return (
    <footer
      className="flex flex-row py-8"
    >
      <div
        className="ml-auto my-auto"
      >
        <GithubRepoButton />
      </div>
    </footer>
  )
};

export default Footer;