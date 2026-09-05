import { slugify } from "@/lib/posts";

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

/**
 * Scans raw markdown for ## and ### headings and builds a flat TOC list.
 * IDs match what components/mdx.tsx assigns to rendered <h2>/<h3> tags.
 */
export function extractToc(markdown: string): TocItem[] {
  const lines = markdown.split("\n");
  const items: TocItem[] = [];

  for (const line of lines) {
    const match = /^(##|###)\s+(.*)$/.exec(line.trim());
    if (!match) continue;
    const level = match[1].length === 2 ? 2 : 3;
    const text = match[2].trim();
    items.push({ id: slugify(text), text, level });
  }

  return items;
}
