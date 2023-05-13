import type { BudPost, ByYearPost } from "../type";

export function getRandomInt(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getFormattedTime(date: string) {
	const dateObject = new Date(date);
	const dateList = dateObject.toDateString().split(" ").slice(1);
	const yearAndDate = [dateList[1], dateList[2]].join(", ");
	return [dateList[0], yearAndDate].join(" ");
}

export function getByYearPosts(posts: BudPost[]) {
	const byYearPosts: ByYearPost[] = [];

	const sortedPosts = posts.sort((a, b) => {
		return new Date(b.data.publishedAt).getTime() - new Date(a.data.publishedAt).getTime();
	});

	sortedPosts.forEach((post) => {
		const year = new Date(post.data.publishedAt).getFullYear();
		const existingGroup = byYearPosts.find((group) => group.year === year);
		if (existingGroup) {
			existingGroup.posts.push(post);
		} else {
			byYearPosts.push({ year, posts: [post] });
		}
	});

	return byYearPosts.sort((a, b) => b.year - a.year);
}
