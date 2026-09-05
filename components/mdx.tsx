import Image from "next/image";
import { slugify } from "@/lib/posts";

type MDXComponents = React.ComponentProps<
  typeof import("next-mdx-remote").MDXRemote
>["components"];

function heading(Tag: "h2" | "h3") {
  const HeadingTag = Tag;
  return function Heading({ children }: { children: React.ReactNode }) {
    const text = typeof children === "string" ? children : String(children);
    const id = slugify(text);
    return <HeadingTag id={id}>{children}</HeadingTag>;
  };
}

export const mdxComponents: MDXComponents = {
  h2: heading("h2"),
  h3: heading("h3"),
  img: (props) => (
    // eslint-disable-next-line jsx-a11y/alt-text
    <Image
      {...(props as any)}
      width={800}
      height={450}
      className="border-3 border-brut w-full h-auto"
    />
  ),
  a: (props) => (
    <a {...props} target={props.href?.startsWith("http") ? "_blank" : undefined} rel="noreferrer" />
  ),
};
