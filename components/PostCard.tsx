import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import type { PostMeta } from "@/types/post";
import CategoryBadge from "@/components/CategoryBadge";
import clsx from "clsx";

export default function PostCard({
  post,
  featured = false,
}: {
  post: PostMeta;
  featured?: boolean;
}) {
  return (
    <article
      className={clsx(
        "card-brut group flex flex-col overflow-hidden bg-white dark:bg-void h-full",
        featured && "md:flex-row"
      )}
    >
      <Link
        href={`/blog/${post.slug}`}
        className={clsx(
          "relative block border-b-3 border-brut overflow-hidden bg-zap shrink-0",
          featured ? "md:w-1/2 md:border-b-0 md:border-r-3 aspect-[4/3] md:aspect-auto" : "aspect-[4/3]"
        )}
      >
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          sizes={featured ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 33vw, 100vw"}
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </Link>

      <div className="flex flex-col flex-1 p-5 gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <CategoryBadge category={post.category} />
          <span className="text-xs font-bold opacity-60">
            {format(new Date(post.date), "MMM d, yyyy")}
          </span>
          <span className="text-xs font-bold opacity-60">
            · {post.readingTime}
          </span>
        </div>

        <h3 className={clsx("font-display leading-tight", featured ? "text-2xl md:text-3xl" : "text-xl")}>
          <Link href={`/blog/${post.slug}`} className="hover:text-punch">
            {post.title}
          </Link>
        </h3>

        <p className="font-serif text-[0.98rem] leading-relaxed opacity-80 line-clamp-3">
          {post.excerpt}
        </p>

        <div className="mt-auto pt-2">
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1 font-bold text-sm border-b-2 border-ink dark:border-cream hover:text-punch hover:border-punch"
          >
            Read post →
          </Link>
        </div>
      </div>
    </article>
  );
}
