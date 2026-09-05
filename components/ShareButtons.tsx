"use client";

import { useState } from "react";

export default function ShareButtons({
  url,
  title,
}: {
  url: string;
  title: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard API unavailable; ignore
    }
  }

  const xShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    title
  )}&url=${encodeURIComponent(url)}`;
  const mailtoUrl = `mailto:?subject=${encodeURIComponent(
    title
  )}&body=${encodeURIComponent(url)}`;

  const btnClass =
    "px-4 py-2 rounded-full border-3 border-brut bg-white dark:bg-void font-bold text-xs shadow-brut-sm hover:-translate-y-0.5 hover:shadow-brut active:translate-y-0.5 active:shadow-none transition-all";

  return (
    <div className="flex flex-wrap gap-3">
      <a href={xShareUrl} target="_blank" rel="noreferrer" className={btnClass}>
        Share on X
      </a>
      <a href={mailtoUrl} className={btnClass}>
        Email it
      </a>
      <button onClick={copyLink} className={btnClass}>
        {copied ? "Copied!" : "Copy link"}
      </button>
    </div>
  );
}
