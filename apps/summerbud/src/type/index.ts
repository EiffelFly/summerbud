import type { CollectionEntry } from "astro:content";

export type BudPost = CollectionEntry<"dev-notes"> | CollectionEntry<"thoughts">;

export type ByYearPost = {
	year: number;
	posts: BudPost[];
};
