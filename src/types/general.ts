export type ArticleFrontMatter = {
  title: string;
  slug: string;
  tags: string[];
  publishedAt: string;
  lastModified: string;
  description: string;
};

export type Nullable<T> = T | null;
