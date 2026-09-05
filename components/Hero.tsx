import Link from "next/link";
import { siteConfig } from "@/lib/config";

export default function Hero() {
  return (
    <section className="border-b-3 border-brut relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 grid md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-8">
          <p className="tag-brut mb-5 bg-punch text-cream border-ink">
            Personal blog · est. {new Date().getFullYear()}
          </p>
          <h1 className="font-display text-5xl sm:text-7xl leading-[0.95] tracking-tight">
            Thoughts, unedited,
            <br />
            in public.
          </h1>
          <p className="mt-6 max-w-lg font-serif text-lg sm:text-xl leading-relaxed opacity-80">
            {siteConfig.tagline} No algorithm, no paywall — just posts,
            written by one person and read by whoever wanders in.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/blog" className="btn-brut">
              Read the posts
            </Link>
            <Link
              href="/about"
              className="btn-brut bg-cream dark:bg-void dark:text-cream"
            >
              Who's writing this
            </Link>
          </div>
        </div>

        <div className="md:col-span-4 flex justify-center md:justify-end">
          <div className="relative w-40 h-40 sm:w-56 sm:h-56 rounded-full border-3 border-brut bg-yolk shadow-brut-lg rotate-[-6deg] flex items-center justify-center">
            <span className="font-display text-6xl sm:text-8xl rotate-[6deg]">
              !
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
