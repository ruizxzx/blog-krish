import RSS from "rss";
import { getAllPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/config";

export async function GET() {
  const posts = await getAllPosts();

  const feed = new RSS({
    title: siteConfig.name,
    description: siteConfig.description,
    site_url: siteConfig.url,
    feed_url: `${siteConfig.url}/rss.xml`,
    language: "en",
    pubDate: new Date(),
  });

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.excerpt,
      url: `${siteConfig.url}/blog/${post.slug}`,
      categories: [post.category, ...post.tags],
      date: post.date,
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
