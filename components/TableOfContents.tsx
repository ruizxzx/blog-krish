import type { TocItem } from "@/lib/toc";
import clsx from "clsx";

export default function TableOfContents({ items }: { items: TocItem[] }) {
  if (!items.length) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="card-brut bg-white dark:bg-void p-5 sticky top-24"
    >
      <p className="font-display text-sm mb-3 border-b-2 border-ink dark:border-cream pb-2">
        On this page
      </p>
      <ul className="space-y-2 text-sm">
        {items.map((item) => (
          <li key={item.id} className={clsx(item.level === 3 && "pl-4")}>
            <a href={`#${item.id}`} className="hover:text-punch">
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
