export const siteConfig = {
  name: "SCRAWL",
  tagline: "Unfiltered notes from a working brain.",
  description:
    "A personal blog about things worth writing down — built raw, on purpose.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.vercel.app",
  author: "Your Name",
  email: "hello@your-domain.com",
  twitter: "@yourhandle",
  postsPerPage: 6,
  cmsUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || "",
};
