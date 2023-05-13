import type { ByYearPost } from "../type";
import { getFormattedTime } from "../utils";

export type ByYearPostListProps = {
	byYearPosts: ByYearPost[];
};

export const ByYearPostList = (props: ByYearPostListProps) => {
	return (
		<div class="flex flex-col">
			{props.byYearPosts.map((e) => (
				<div class="flex flex-col border-t border-gray-700 py-10">
					<h3 class="mb-5 font-sans text-lg font-normal text-gray-300">{e.year}</h3>

					<div class="flex flex-col gap-y-5">
						{e.posts.map((post) => (
							<a
								href={
									post.collection === "dev-notes"
										? `/dev-notes/${post.slug}`
										: `/thoughts/${post.slug}`
								}
								rel="prefetch"
								class="flex flex-col gap-y-1 font-sans text-base font-normal"
							>
								<span class="text-gray-500">{getFormattedTime(post.data.publishedAt)}</span>
								<span class="hover:underline text-gray-300">{post.data.title}</span>
							</a>
						))}
					</div>
				</div>
			))}
		</div>
	);
};
