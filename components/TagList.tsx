import Link from "next/link";

export default function TagList({ tags }: { tags: string[] }) {
  if (!tags?.length) return null;
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li key={tag}>
          <Link href={`/blog?search=${encodeURIComponent(tag)}`} className="tag-brut hover:bg-zap">
            #{tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}
