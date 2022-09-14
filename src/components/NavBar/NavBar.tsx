import { Component, createSignal } from "solid-js";
import { SummerbudAvatars } from "../Avatars";
import { ThemeToggle } from "../Buttons";
import { ListIcon, SlashIcon } from "../Icons";
import "./Navbar.css";
import cn from "clsx";

export type NavBarProps = {
  marginBottom?: string;
};

const NavBar: Component<NavBarProps> = ({ marginBottom }) => {
  const [open, setOpen] = createSignal(false);

  const navigations = [
    {
      title: "思考",
      path: "/su-kao",
    },
    {
      title: "Thoughts",
      path: "/thoughts",
    },
    {
      title: "dev-notes",
      path: "/dev-notes",
    },
  ];

  const navigationSet = (
    <>
      {navigations.map((e) => (
        <div class="flex">
          <a
            href={e.path}
            rel="prefetch"
            class="link-underline my-auto cursor-pointer align-baseline font-sans text-xl font-semibold text-sd-black dark:text-sd-white"
          >
            {e.title}
          </a>
        </div>
      ))}
    </>
  );

  return (
    <header
      class={cn(
        "mx-auto flex w-full max-w-4xl flex-col py-8 md:flex-row lg:max-w-5xl",
        marginBottom
      )}
    >
      <div class="flex flex-grow flex-row">
        <a href="/" class="mr-auto flex flex-row gap-x-6">
          <SummerbudAvatars styleName="w-10 h-10" />
          <div class="my-auto font-sans text-lg font-semibold text-sd-brgreen dark:text-sd-brcyan sm:text-xl">{`{summerbud}`}</div>
        </a>
        <button
          class="my-auto flex h-8 w-8 rounded-lg border border-sd-brcyan dark:border-sd-brgreen md:hidden"
          onClick={() => setOpen(!open())}
        >
          {open() ? (
            <SlashIcon styleName="m-auto w-6 h-6 fill-sd-brgreen dark:fill-sd-brcyan" />
          ) : (
            <ListIcon styleName="m-auto w-6 h-6 fill-sd-brgreen dark:fill-sd-brcyan" />
          )}
        </button>
      </div>

      <div class="ml-auto hidden items-center gap-x-8 md:flex md:flex-row">
        {navigationSet}
        <div>
          <ThemeToggle styleName="my-auto" />
        </div>
      </div>

      {open() ? (
        <div class="mt-8 flex flex-col gap-y-4 md:hidden">
          {navigationSet}
          <div>
            <ThemeToggle />
          </div>
        </div>
      ) : null}
    </header>
  );
};

export default NavBar;
