import type { Metadata } from "next";
import PostCard from "@/components/PostCard";
import Pagination from "@/components/Pagination";
import { getAllPosts, paginate, searchPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "All Posts",
  description: `Every post on ${siteConfig.name}, newest first.`,
};

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: { page?: string; search?: string };
}) {
  const search = searchParams.search ?? "";
  const page = Number(searchParams.page ?? "1") || 1;

  const allPosts = search ? await searchPosts(search) : await getAllPosts();
  const { items, totalPages, currentPage } = paginate(
    allPosts,
    page,
    siteConfig.postsPerPage
  );

  const basePath = search
    ? `/blog?search=${encodeURIComponent(search)}`
    : "/blog";

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
      <div className="border-b-3 border-brut pb-6 mb-10">
        <h1 className="font-display text-4xl sm:text-5xl">All posts</h1>
        {search ? (
          <p className="mt-2 opacity-80">
            {allPosts.length} result{allPosts.length === 1 ? "" : "s"} for{" "}
            <span className="tag-brut ml-1">"{search}"</span>
          </p>
        ) : (
          <p className="mt-2 opacity-80">
            {allPosts.length} post{allPosts.length === 1 ? "" : "s"} and
            counting.
          </p>
        )}
      </div>

      {items.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="card-brut bg-white dark:bg-void p-10 text-center">
          <p className="font-display text-2xl mb-2">Nothing here.</p>
          <p className="opacity-70">Try a different search term.</p>
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        basePath={basePath}
      />
    </div>
  );
}
