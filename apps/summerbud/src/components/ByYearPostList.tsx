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
								href={`/${post.collection}/${post.slug}`}
								rel="prefetch"
								class="flex flex-col gap-y-2 font-sans text-base font-normal"
							>
								<div class="flex flex-row gap-x-2">
									<div class="flex px-4 grow-0 shrink-0 border border-gray-700">
										<p class="font-sans text-gray-400 text-[12px] font-normal text-right mb-auto mr-auto">
											{post.data.locale === "zh-TW" ? "ZH" : "EN"}
										</p>
									</div>
									<span class="text-gray-500 mt-auto">
										{getFormattedTime(post.data.publishedAt)}
									</span>
								</div>
								<span class="hover:underline text-gray-300">{post.data.title}</span>
							</a>
						))}
					</div>
				</div>
			))}
		</div>
	);
};
