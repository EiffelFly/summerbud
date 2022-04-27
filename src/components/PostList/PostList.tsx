import { MarkdownInstance } from "astro";
import { Component } from "solid-js";
import type { ArticleFrontMatter } from "../../types/general";
import { getFormattedTime } from "../../utils";

type PostListProps = {
  posts: MarkdownInstance<ArticleFrontMatter>[];
  slugPrefix: string;
};

const PostList: Component<PostListProps> = ({ posts, slugPrefix }) => {
  return (
    <div className="flex flex-col gap-y-4">
      {posts.map((post) => (
        <a
          href={`/${slugPrefix}/${post.frontmatter.slug}`}
          className="group flex cursor-pointer flex-col gap-y-2 font-sans lg:flex-row lg:gap-y-0"
        >
          <div className="mr-auto text-base text-sd-black group-hover:underline dark:text-sd-white">
            {post.frontmatter.title}
          </div>
          <div class="text-sm font-light text-sd-brgreen dark:text-sd-brcyan">
            {getFormattedTime(post.frontmatter.publishedAt)}
          </div>
        </a>
      ))}
    </div>
  );
};

export default PostList;
