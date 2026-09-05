export interface PostFrontmatter {
  title: string;
  date: string;
  category: string;
  tags: string[];
  coverImage: string;
  excerpt: string;
  draft?: boolean;
}

export interface PostMeta extends PostFrontmatter {
  slug: string;
  readingTime: string;
  source?: "mdx" | "sanity";
}

export type PortableTextValue = any[];

export interface Post extends PostMeta {
  content: string | PortableTextValue;
  contentType?: "mdx" | "portableText";
}
