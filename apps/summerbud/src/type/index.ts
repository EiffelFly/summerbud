import type { CollectionEntry } from "astro:content";

export type BudPost =
	| CollectionEntry<"dev-notes">
	| CollectionEntry<"thoughts">
	| CollectionEntry<"projects">
	| CollectionEntry<"threads">;

export type ByYearPost = {
	year: number;
	posts: BudPost[];
};

export type Nullable<T> = T | null;

export type FeatureImg = {
	path: string;
	alt: string;
	source: string;
};

export type SEO = {
	title: string;
	locale: string;
	description: string;
	image: Nullable<FeatureImg>;
	publishedAt: string;
	tags: string;
	canonicalURL: string;
	text: string;
};
