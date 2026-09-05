import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import { getAllSlugs, getPostBySlug, getRelatedPosts } from "@/lib/posts";
import { extractToc } from "@/lib/toc";
import { mdxComponents } from "@/components/mdx";
import PortablePost from "@/components/sanity/PortablePost";
import CategoryBadge from "@/components/CategoryBadge";
import TagList from "@/components/TagList";
import TableOfContents from "@/components/TableOfContents";
import ShareButtons from "@/components/ShareButtons";
import AuthorByline from "@/components/AuthorByline";
import PostCard from "@/components/PostCard";
import { siteConfig } from "@/lib/config";

export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};

  const url = `${siteConfig.url}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
      images: [{ url: post.coverImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  const isPortableText = post.contentType === "portableText";
  const mdxSource = !isPortableText ? await serialize(post.content as string) : null;
  const toc = !isPortableText ? extractToc(post.content as string) : [];
  const related = await getRelatedPosts(post);
  const url = `${siteConfig.url}/blog/${post.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.date,
    description: post.excerpt,
    author: { "@type": "Person", name: siteConfig.author },
    image: post.coverImage,
  };

  return (
    <article className="pb-20">
      {/* eslint-disable-next-line react/no-danger */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="border-b-3 border-brut bg-white dark:bg-void">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-14 pb-10">
          <div className="flex items-center gap-3 flex-wrap mb-5">
            <CategoryBadge category={post.category} size="md" />
          </div>
          <h1 className="font-display text-4xl sm:text-6xl leading-[1.02]">
            {post.title}
          </h1>
          <p className="mt-5 font-serif text-lg opacity-80 max-w-2xl">
            {post.excerpt}
          </p>
          <AuthorByline date={post.date} readingTime={post.readingTime} />
        </div>
      </header>

      <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] border-b-3 border-brut">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 mt-12 grid lg:grid-cols-[1fr_220px] gap-10">
        <div className="prose-brut prose dark:prose-invert max-w-none">
          {isPortableText ? (
            <PortablePost value={post.content as any[]} />
          ) : (
            <MDXRemote {...mdxSource!} components={mdxComponents} />
          )}

          <div className="mt-14 not-prose">
            <p className="font-display text-xs uppercase mb-3">Filed under</p>
            <TagList tags={post.tags} />
          </div>

          <div className="mt-10 not-prose">
            <p className="font-display text-xs uppercase mb-3">Share this</p>
            <ShareButtons url={url} title={post.title} />
          </div>
        </div>

        {toc.length > 0 && (
          <aside className="hidden lg:block">
            <TableOfContents items={toc} />
          </aside>
        )}
      </div>

      {related.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-24">
          <h2 className="font-display text-3xl mb-6 border-b-3 border-brut pb-4">
            Related posts
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
