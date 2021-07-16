import Link from "next/link";

const AboutButton = () => {
  return (
    <Link href="/about">
      <a className="py-2 px-4 font-sans font-semibold text-xl text-sd-black hover:text-indigo-900">
        About
      </a>
    </Link>
  );
};

export default AboutButton;
