"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/config";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = `Message from ${name || "your site"}`;
    const body = `${message}\n\n— ${name} (${email})`;
    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }

  const inputClass =
    "w-full border-3 border-brut bg-white dark:bg-void dark:text-cream px-4 py-3 font-body focus:outline-none";

  return (
    <form onSubmit={handleSubmit} className="card-brut bg-white dark:bg-void p-6 sm:p-8 space-y-5">
      <div>
        <label htmlFor="name" className="block font-display text-xs uppercase mb-2">
          Name
        </label>
        <input
          id="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
          placeholder="Ada Lovelace"
        />
      </div>

      <div>
        <label htmlFor="email" className="block font-display text-xs uppercase mb-2">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
          placeholder="ada@example.com"
        />
      </div>

      <div>
        <label htmlFor="message" className="block font-display text-xs uppercase mb-2">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={inputClass}
          placeholder="What's on your mind?"
        />
      </div>

      <button type="submit" className="btn-brut w-full sm:w-auto">
        Send message
      </button>
    </form>
  );
}
