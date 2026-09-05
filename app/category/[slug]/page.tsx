import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PostCard from "@/components/PostCard";
import Pagination from "@/components/Pagination";
import { getAllCategories, getPostsByCategory, paginate } from "@/lib/posts";
import { siteConfig } from "@/lib/config";

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const categories = await getAllCategories();
  const category = categories.find((c) => c.slug === params.slug);
  if (!category) return {};
  return {
    title: `${category.name} posts`,
    description: `Posts filed under ${category.name} on ${siteConfig.name}.`,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { page?: string };
}) {
  const categories = await getAllCategories();
  const category = categories.find((c) => c.slug === params.slug);
  if (!category) notFound();

  const posts = await getPostsByCategory(params.slug);
  const page = Number(searchParams.page ?? "1") || 1;
  const { items, totalPages, currentPage } = paginate(
    posts,
    page,
    siteConfig.postsPerPage
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
      <div className="border-b-3 border-brut pb-6 mb-10">
        <p className="tag-brut mb-3 bg-yolk">Category</p>
        <h1 className="font-display text-4xl sm:text-5xl">{category.name}</h1>
        <p className="mt-2 opacity-80">
          {posts.length} post{posts.length === 1 ? "" : "s"} filed here.
        </p>
      </div>

      {items.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="card-brut bg-white dark:bg-void p-10 text-center">
          <p className="font-display text-2xl">No posts in this category yet.</p>
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        basePath={`/category/${params.slug}`}
      />
    </div>
  );
}
