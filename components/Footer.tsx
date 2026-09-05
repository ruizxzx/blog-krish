import Link from "next/link";
import { siteConfig } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="border-t-3 border-brut bg-ink text-cream dark:bg-cream dark:text-ink mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
        <div>
          <p className="font-display text-3xl sm:text-4xl leading-none">
            {siteConfig.name}
            <span className="text-punch">.</span>
          </p>
          <p className="mt-2 max-w-sm text-sm opacity-80">
            {siteConfig.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm font-bold uppercase">
          <Link href="/blog" className="hover:text-yolk">
            Posts
          </Link>
          <Link href="/about" className="hover:text-yolk">
            About
          </Link>
          <Link href="/contact" className="hover:text-yolk">
            Contact
          </Link>
          <a href="/rss.xml" className="hover:text-yolk">
            RSS
          </a>
          <a
            href={`https://twitter.com/${siteConfig.twitter.replace("@", "")}`}
            className="hover:text-yolk"
            target="_blank"
            rel="noreferrer"
          >
            Twitter
          </a>
        </div>
      </div>
      <div className="border-t-3 border-brut px-4 sm:px-6 py-3 text-xs uppercase tracking-wide flex justify-between max-w-6xl mx-auto">
        <span>© {new Date().getFullYear()} {siteConfig.author}</span>
        <span>Built raw, on purpose.</span>
      </div>
    </footer>
  );
}
