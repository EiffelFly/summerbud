import cn from "clsx";
import { Heading, Nullable } from "@/types/general";
import { createEffect, createSignal, onCleanup } from "solid-js";

export type TableOfContentProps = {
  headings: Heading[];
};

const TableOfContent = (props: TableOfContentProps) => {
  const [currentSlug, setCurrentSlug] = createSignal<Nullable<string>>(null);

  const onHashChanged = (event: HashChangeEvent) => {
    const newUrl = new URL(event.newURL);
    setCurrentSlug(newUrl.hash.replace("#", ""));
  };

  createEffect(() => {
    setCurrentSlug(props.headings ? props.headings[0].slug : null);
    window.addEventListener("hashchange", onHashChanged);
  });

  onCleanup(() => {
    if (window) {
      window.removeEventListener("hashchange", onHashChanged);
    }
  });

  return (
    <div class="flex w-full">
      <ul class="w-full">
        {props.headings.map((header, index) => {
          if (header.depth <= 2) {
            const isTail = index === props.headings.length - 1;
            const isHead = index === 0;

            return (
              <li class="relative w-full flex py-2 group">
                <svg
                  class={cn(
                    "w-5 stroke-sd-brgreen absolute",
                    isTail
                      ? "top-0 bottom-1/2 h-1/2"
                      : isHead
                      ? "top-1/2 bottom-0 h-1/2"
                      : "top-0 h-full bottom-0"
                  )}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  preserveAspectRatio="none"
                >
                  <line x1="8" y1="0" x2="8" y2="16"></line>
                </svg>
                <svg
                  class="w-5 h-5 absolute top-1/2 -translate-y-1/2 left-0"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                >
                  <circle
                    class=" stroke-sd-brgreen fill-sd-brwhite dark:fill-sd-brblack stroke-1"
                    cx="8"
                    cy="8"
                    r="6.5"
                  ></circle>
                </svg>
                {currentSlug() === header.slug ? (
                  <svg
                    class="w-5 h-5 absolute top-1/2 -translate-y-1/2 left-0"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                  >
                    <circle
                      class="fill-sd-orange dark:group-hover:fill-sd-brgreen"
                      cx="8"
                      cy="8"
                      r="3"
                    ></circle>
                  </svg>
                ) : null}

                <a
                  class="pl-8 block my-auto font-sans dark:text-sd-white dark:group-hover:text-sd-blue"
                  href={`#${header.slug}`}
                >
                  {header.text}
                </a>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};

export default TableOfContent;
