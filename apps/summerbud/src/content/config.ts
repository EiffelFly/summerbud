// 1. Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";
// 2. Define a schema for each collection you'd like to validate.
const collection = defineCollection({
	schema: z.object({
		title: z.string(),
		publishedAt: z.string(),
		lastModified: z.string(),
		description: z.string(),
		featureImg: z.string(),
		featureImgAlt: z.string(),
		featureImgSource: z.string(),
		locale: z.string(),
		tags: z.array(z.string()),
	}),
});
// 3. Export a single `collections` object to register your collection(s)
export const collections = {
	thoughts: collection,
	"dev-notes": collection,
	projects: collection,
};
