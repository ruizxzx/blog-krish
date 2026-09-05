import Link from "next/link";
import Hero from "@/components/Hero";
import PostCard from "@/components/PostCard";
import CategoryBadge from "@/components/CategoryBadge";
import { getAllPosts, getAllCategories } from "@/lib/posts";

export default async function HomePage() {
  const posts = await getAllPosts();
  const categories = await getAllCategories();
  const [featured, ...rest] = posts;
  const latest = rest.slice(0, 6);

  return (
    <>
      <Hero />

      {categories.length > 0 && (
        <section className="border-b-3 border-brut bg-white dark:bg-void overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4 overflow-x-auto">
            <span className="font-display text-xs uppercase shrink-0">
              Browse:
            </span>
            {categories.map((cat) => (
              <CategoryBadge key={cat.slug} category={cat.name} size="md" />
            ))}
          </div>
        </section>
      )}

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        {featured ? (
          <>
            <div className="flex items-baseline justify-between mb-6">
              <h2 className="font-display text-3xl sm:text-4xl">
                Latest drop
              </h2>
              <Link
                href="/blog"
                className="font-display text-xs uppercase border-b-2 border-ink dark:border-cream hover:text-punch hover:border-punch"
              >
                View all →
              </Link>
            </div>
            <PostCard post={featured} featured />
          </>
        ) : (
          <div className="card-brut bg-white dark:bg-void p-10 text-center">
            <p className="font-display text-2xl mb-2">No posts yet.</p>
            <p className="opacity-70">
              Publish a post from your private CMS dashboard to see it here.
            </p>
          </div>
        )}

        {latest.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-2xl sm:text-3xl mb-6">
              More recent posts
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {latest.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
