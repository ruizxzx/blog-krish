import Link from "next/link";
import clsx from "clsx";

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
}: {
  currentPage: number;
  totalPages: number;
  basePath: string;
}) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const sep = basePath.includes("?") ? "&" : "?";

  return (
    <nav
      aria-label="Pagination"
      className="flex flex-wrap items-center justify-center gap-3 mt-12"
    >
      <Link
        href={`${basePath}${sep}page=${Math.max(1, currentPage - 1)}`}
        aria-disabled={currentPage === 1}
        className={clsx(
          "px-4 py-2 rounded-full border-3 border-brut font-bold text-xs bg-white dark:bg-void shadow-brut-sm hover:-translate-y-0.5 transition-transform",
          currentPage === 1 && "pointer-events-none opacity-30"
        )}
      >
        ← Prev
      </Link>

      {pages.map((p) => (
        <Link
          key={p}
          href={`${basePath}${sep}page=${p}`}
          className={clsx(
            "h-10 w-10 flex items-center justify-center rounded-full border-3 border-brut font-display text-sm shadow-brut-sm hover:-translate-y-0.5 transition-transform",
            p === currentPage ? "bg-punch text-cream" : "bg-white dark:bg-void"
          )}
          aria-current={p === currentPage ? "page" : undefined}
        >
          {p}
        </Link>
      ))}

      <Link
        href={`${basePath}${sep}page=${Math.min(totalPages, currentPage + 1)}`}
        aria-disabled={currentPage === totalPages}
        className={clsx(
          "px-4 py-2 rounded-full border-3 border-brut font-bold text-xs bg-white dark:bg-void shadow-brut-sm hover:-translate-y-0.5 transition-transform",
          currentPage === totalPages && "pointer-events-none opacity-30"
        )}
      >
        Next →
      </Link>
    </nav>
  );
}
