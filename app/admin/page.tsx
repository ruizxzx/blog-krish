import { redirect } from "next/navigation";
import { siteConfig } from "@/lib/config";

export default function AdminPage() {
  if (siteConfig.cmsUrl) redirect(siteConfig.cmsUrl);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20">
      <div className="card-brut bg-white dark:bg-void p-8">
        <p className="tag-brut bg-yolk mb-4">CMS</p>
        <h1 className="font-display text-3xl mb-3">CMS is not connected yet.</h1>
        <p className="font-serif opacity-80">
          Set NEXT_PUBLIC_SANITY_STUDIO_URL to your hosted Sanity Studio URL.
        </p>
      </div>
    </div>
  );
}
