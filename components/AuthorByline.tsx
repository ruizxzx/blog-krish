import Image from "next/image";
import { format } from "date-fns";
import { siteConfig } from "@/lib/config";

export default function AuthorByline({
  date,
  readingTime,
}: {
  date: string;
  readingTime: string;
}) {
  return (
    <div className="flex items-center gap-3 mt-6">
      <div className="relative w-11 h-11 rounded-full border-3 border-brut overflow-hidden shrink-0">
        <Image
          src="/images/blog/placeholder-avatar.jpg"
          alt={siteConfig.author}
          fill
          className="object-cover"
        />
      </div>
      <div className="text-sm">
        <p className="font-bold">{siteConfig.author}</p>
        <p className="opacity-60">
          {format(new Date(date), "MMMM d, yyyy")} · {readingTime}
        </p>
      </div>
    </div>
  );
}
