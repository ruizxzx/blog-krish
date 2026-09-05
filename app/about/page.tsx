import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "About",
  description: `A little bit about ${siteConfig.author}, the person behind ${siteConfig.name}.`,
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <p className="tag-brut mb-4 bg-zap">About</p>
      <h1 className="font-display text-4xl sm:text-6xl mb-10">
        Hi, I'm {siteConfig.author}.
      </h1>

      <div className="grid md:grid-cols-[220px_1fr] gap-10 items-start">
        <div className="relative w-full aspect-square border-3 border-brut shadow-brut-lg rotate-[-2deg] shrink-0">
          <Image
            src="/images/blog/placeholder-avatar.jpg"
            alt={siteConfig.author}
            fill
            className="object-cover"
          />
        </div>

        <div className="prose-brut prose dark:prose-invert max-w-none">
          <p>
            This is your space to tell readers who you are. Swap this
            paragraph out for two or three real ones: what you do, why you
            started writing, and what people should expect to find here.
          </p>
          <p>
            {siteConfig.name} runs on plain markdown files — no CMS, no
            database. Every post you're reading started as a{" "}
            <code>.mdx</code> file in a folder, which means this "about"
            page is really the only thing standing between you and the
            content.
          </p>
          <h2>What I write about</h2>
          <p>
            List your usual topics or categories here — this doubles as a
            preview of what's in the nav above.
          </p>
          <h2>Elsewhere</h2>
          <p>
            Link out to your other profiles, projects, or a resume if
            that's relevant. Keep it short — this page's job is to earn
            trust, not tell your whole life story.
          </p>
        </div>
      </div>
    </div>
  );
}
