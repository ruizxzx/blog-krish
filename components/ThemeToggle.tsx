"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      aria-pressed={isDark}
      className="h-10 w-10 flex items-center justify-center rounded-full border-3 border-brut bg-zap text-ink shadow-brut-sm hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brut active:translate-x-1 active:translate-y-1 active:shadow-none transition-all duration-150 shrink-0"
    >
      <span className="font-display text-sm">{isDark ? "☀" : "☾"}</span>
    </button>
  );
}
