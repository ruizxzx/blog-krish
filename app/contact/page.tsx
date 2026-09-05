import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${siteConfig.author}.`,
};

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
      <p className="tag-brut mb-4 bg-punch text-cream">Contact</p>
      <h1 className="font-display text-4xl sm:text-6xl mb-4">Say hello.</h1>
      <p className="opacity-80 mb-10 max-w-md">
        Fill this out and it'll open your email client with everything
        pre-filled — nothing gets stored, nothing gets tracked. Or just email{" "}
        <a href={`mailto:${siteConfig.email}`} className="underline font-bold">
          {siteConfig.email}
        </a>{" "}
        directly.
      </p>
      <ContactForm />
    </div>
  );
}
