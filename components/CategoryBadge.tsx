import Link from "next/link";
import { slugify } from "@/lib/posts";
import clsx from "clsx";

const ACCENTS = ["bg-yolk", "bg-punch text-cream", "bg-zap"];

function accentFor(name: string) {
  const index = name.charCodeAt(0) % ACCENTS.length;
  return ACCENTS[index];
}

export default function CategoryBadge({
  category,
  size = "sm",
}: {
  category: string;
  size?: "sm" | "md";
}) {
  return (
    <Link
      href={`/category/${slugify(category)}`}
      className={clsx(
        "inline-block border-2 border-brut font-bold font-body rounded-pill hover:-translate-y-0.5 transition-transform",
        accentFor(category),
        size === "sm" ? "text-xs px-3 py-1" : "text-sm px-4 py-1.5"
      )}
    >
      {category}
    </Link>
  );
}
