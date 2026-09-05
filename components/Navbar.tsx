"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/lib/config";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar({
  categories = [],
}: {
  categories?: { name: string; slug: string }[];
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/blog?search=${encodeURIComponent(query.trim())}`);
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b-3 border-brut bg-cream dark:bg-void">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          <Link
            href="/"
            className="font-display text-2xl sm:text-3xl tracking-tight shrink-0"
          >
            {siteConfig.name}
            <span className="text-punch">.</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 font-bold text-sm">
            <Link href="/blog" className="hover:text-punch">
              All posts
            </Link>
            {categories.slice(0, 3).map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="hover:text-punch"
              >
                {cat.name}
              </Link>
            ))}
            <Link href="/about" className="hover:text-punch">
              About
            </Link>
            <Link href="/contact" className="hover:text-punch">
              Contact
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <form onSubmit={handleSearch} className="flex">
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                aria-label="Search posts"
                className="w-40 lg:w-56 border-3 border-brut rounded-l-full bg-white dark:bg-ink dark:text-cream px-4 py-2 text-sm font-body focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Submit search"
                className="border-3 border-l-0 border-brut rounded-r-full bg-ink text-cream dark:bg-cream dark:text-ink px-4 font-bold text-xs"
              >
                Go
              </button>
            </form>
            <ThemeToggle />
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden h-10 w-10 flex items-center justify-center rounded-full border-3 border-brut bg-yolk shrink-0"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span className="font-display">{open ? "X" : "≡"}</span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t-3 border-brut bg-cream dark:bg-void px-4 py-4 space-y-4">
          <form onSubmit={handleSearch} className="flex">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              aria-label="Search posts"
              className="flex-1 border-3 border-brut rounded-l-full bg-white dark:bg-ink dark:text-cream px-4 py-2 text-sm font-body focus:outline-none"
            />
            <button
              type="submit"
              className="border-3 border-l-0 border-brut rounded-r-full bg-ink text-cream dark:bg-cream dark:text-ink px-4 font-bold text-xs"
            >
              Go
            </button>
          </form>
          <nav className="flex flex-col gap-3 font-bold text-sm">
            <Link href="/blog" onClick={() => setOpen(false)}>
              All posts
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                onClick={() => setOpen(false)}
              >
                {cat.name}
              </Link>
            ))}
            <Link href="/about" onClick={() => setOpen(false)}>
              About
            </Link>
            <Link href="/contact" onClick={() => setOpen(false)}>
              Contact
            </Link>
          </nav>
          <ThemeToggle />
        </div>
      )}
    </header>
  );
}
