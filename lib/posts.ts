import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { toPlainText } from "@portabletext/react";
import type { Post, PostFrontmatter, PostMeta } from "@/types/post";
import { sanityClient, sanityConfigured, sanityImageUrl } from "@/lib/sanity";

const POSTS_DIR = path.join(process.cwd(), "content/posts");

const SANITY_POST_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  date,
  category,
  tags,
  excerpt,
  coverImage,
  body,
  "coverImageUrl": coverImage.asset->url
`;

function getPostFiles(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"));
}

function slugFromFilename(filename: string): string {
  return filename.replace(/\.mdx?$/, "");
}

const isProd = process.env.NODE_ENV === "production";

function getLocalPosts(): Post[] {
  return getPostFiles().map((filename) => {
    const slug = slugFromFilename(filename);
    const fullPath = path.join(POSTS_DIR, filename);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const frontmatter = data as PostFrontmatter;

    return {
      slug,
      ...frontmatter,
      tags: frontmatter.tags ?? [],
      readingTime: readingTime(content).text,
      content,
      contentType: "mdx",
      source: "mdx",
    };
  });
}

async function getSanityPosts(): Promise<Post[]> {
  if (!sanityClient) return [];

  try {
    const rows = await sanityClient.fetch(
      `*[_type == "post" && defined(slug.current) && defined(date)] | order(date desc) {${SANITY_POST_FIELDS}}`,
      {},
      { next: { revalidate: 30, tags: ["sanity-posts"] } }
    );

    return (rows ?? []).map((row: any) => {
      const body = Array.isArray(row.body) ? row.body : [];
      const plain = toPlainText(body);
      return {
        slug: row.slug,
        title: row.title,
        date: row.date,
        category: row.category ?? "Uncategorized",
        tags: row.tags ?? [],
        excerpt: row.excerpt ?? "",
        coverImage: sanityImageUrl(row.coverImage) ?? row.coverImageUrl ?? "/images/blog/placeholder-avatar.jpg",
        readingTime: readingTime(plain).text,
        content: body,
        contentType: "portableText",
        source: "sanity",
      } as Post;
    });
  } catch (error) {
    console.warn("Sanity fetch failed; using local MDX content.", error);
    return [];
  }
}

/**
 * Sanity is the primary source when configured. Local MDX posts remain as a
 * fallback so the existing demo content still works before the CMS is filled.
 * A Sanity post with the same slug replaces its local MDX counterpart.
 */
export async function getAllPosts(): Promise<PostMeta[]> {
  const local = getLocalPosts();
  const sanity = sanityConfigured ? await getSanityPosts() : [];
  const bySlug = new Map<string, Post>();

  for (const post of local) bySlug.set(post.slug, post);
  for (const post of sanity) bySlug.set(post.slug, post);

  return Array.from(bySlug.values())
    .filter((post) => !(isProd && post.draft))
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map(({ content, ...meta }) => meta);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (sanityClient) {
    try {
      const row = await sanityClient.fetch(
        `*[_type == "post" && slug.current == $slug && defined(date)][0] {${SANITY_POST_FIELDS}}`,
        { slug },
        { next: { revalidate: 30, tags: ["sanity-posts", `sanity-post:${slug}`] } }
      );

      if (row) {
        const body = Array.isArray(row.body) ? row.body : [];
        const plain = toPlainText(body);
        return {
          slug: row.slug,
          title: row.title,
          date: row.date,
          category: row.category ?? "Uncategorized",
          tags: row.tags ?? [],
          excerpt: row.excerpt ?? "",
          coverImage: sanityImageUrl(row.coverImage) ?? row.coverImageUrl ?? "/images/blog/placeholder-avatar.jpg",
          readingTime: readingTime(plain).text,
          content: body,
          contentType: "portableText",
          source: "sanity",
        };
      }
    } catch (error) {
      console.warn("Sanity post fetch failed; trying local MDX.", error);
    }
  }

  const fullPathMdx = path.join(POSTS_DIR, `${slug}.mdx`);
  const fullPathMd = path.join(POSTS_DIR, `${slug}.md`);
  const fullPath = fs.existsSync(fullPathMdx) ? fullPathMdx : fullPathMd;

  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const frontmatter = data as PostFrontmatter;

  if (isProd && frontmatter.draft) return null;

  return {
    slug,
    ...frontmatter,
    tags: frontmatter.tags ?? [],
    readingTime: readingTime(content).text,
    content,
    contentType: "mdx",
    source: "mdx",
  };
}

export async function getAllSlugs(): Promise<string[]> {
  const posts = await getAllPosts();
  return posts.map((post) => post.slug);
}

export async function getAllCategories(): Promise<{ name: string; slug: string; count: number }[]> {
  const posts = await getAllPosts();
  const map = new Map<string, number>();

  for (const post of posts) {
    map.set(post.category, (map.get(post.category) ?? 0) + 1);
  }

  return Array.from(map.entries())
    .map(([name, count]) => ({ name, slug: slugify(name), count }))
    .sort((a, b) => b.count - a.count);
}

export async function getPostsByCategory(categorySlug: string): Promise<PostMeta[]> {
  return (await getAllPosts()).filter((post) => slugify(post.category) === categorySlug);
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  const set = new Set<string>();
  posts.forEach((p) => p.tags.forEach((t) => set.add(t)));
  return Array.from(set);
}

export async function getRelatedPosts(current: PostMeta, limit = 3): Promise<PostMeta[]> {
  const all = (await getAllPosts()).filter((p) => p.slug !== current.slug);

  const scored = all.map((post) => {
    let score = 0;
    if (post.category === current.category) score += 2;
    score += post.tags.filter((t) => current.tags.includes(t)).length;
    return { post, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.post);
}

export async function searchPosts(query: string): Promise<PostMeta[]> {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return (await getAllPosts()).filter((post) => {
    const haystack = [post.title, post.excerpt, post.category, ...(post.tags ?? [])]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function paginate<T>(items: T[], page: number, perPage: number) {
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * perPage;
  const pageItems = items.slice(start, start + perPage);

  return { items: pageItems, totalPages, currentPage };
}
