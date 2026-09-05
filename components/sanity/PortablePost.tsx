import Image from "next/image";
import { PortableText, toPlainText, type PortableTextComponents } from "@portabletext/react";
import { sanityImageUrl } from "@/lib/sanity";
import { slugify } from "@/lib/posts";

type Props = { value: any[] };

const components: PortableTextComponents = {
  block: {
    h2: ({ children, value }) => (
      <h2 id={slugify(toPlainText([value]))}>{children}</h2>
    ),
    h3: ({ children, value }) => (
      <h3 id={slugify(toPlainText([value]))}>{children}</h3>
    ),
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
  marks: {
    link: ({ children, value }) => {
      const href = value?.href || "#";
      const external = href.startsWith("http");
      return (
        <a href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>
          {children}
        </a>
      );
    },
    code: ({ children }) => <code>{children}</code>,
  },
  types: {
    image: ({ value }) => {
      const src = sanityImageUrl(value);
      if (!src) return null;
      return (
        <figure className="my-8">
          <Image
            src={src}
            alt={value?.alt || ""}
            width={1200}
            height={675}
            className="border-3 border-brut w-full h-auto"
          />
          {value?.caption && (
            <figcaption className="font-serif text-sm opacity-70 mt-2">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    codeBlock: ({ value }) => (
      <pre className="my-8 overflow-x-auto border-3 border-brut bg-ink text-cream p-5 rounded-none">
        <code>{value?.code || ""}</code>
      </pre>
    ),
  },
};

export default function PortablePost({ value }: Props) {
  return <PortableText value={value} components={components} />;
}
