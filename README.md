# Scrawl — Gumroad × Medium blog with a private online CMS

A neo-brutalist personal blog with a Medium-style reading experience, now wired to
**Sanity CMS** for browser-based publishing.

The existing `.mdx` posts remain as local fallback/demo content. Once Sanity is connected,
posts created in the CMS are the primary source and can be published without editing the
repository.

## What changed

- Sanity is the online content backend.
- A dedicated Sanity Studio is included in `/studio`.
- You can write posts, upload cover/inline images, choose categories/tags, save drafts,
  and publish from a browser.
- Sanity authentication controls who can edit. Only members of your Sanity project can
  access the editor.
- The frontend reads published Sanity posts and keeps the original MDX posts as fallback.
- `/admin` redirects to your hosted Studio when `NEXT_PUBLIC_SANITY_STUDIO_URL` is set.
- Existing Gumroad × Medium styling is preserved.

Sanity provides an official Next.js integration and hosted Content Lake/Studio workflow.
For this project, the CMS is intentionally kept as a standalone Studio so the existing
Next.js 14 frontend does not need to be upgraded just to publish posts.

## First-time CMS setup

### 1. Create your Sanity project

Create/sign in to a Sanity account and create a project with a `production` dataset.
The Sanity Studio is designed to be hosted online and authenticated for project members.

### 2. Connect the frontend

In the Vercel project, add:

```text
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-07-18
NEXT_PUBLIC_SANITY_STUDIO_URL=https://your-studio.sanity.studio
```

Do not put a Sanity write token in these public frontend variables.

### 3. Deploy the CMS Studio once

From the `studio/` directory:

```bash
npm install
npm run deploy
```

Sign in when the Sanity CLI asks. The command publishes the Studio and gives you a
hosted `*.sanity.studio` URL.

You can then open the Studio from your phone or computer. Normal publishing no longer
requires GitHub, VS Code, MDX files, or a local server.

### 4. Give access only to yourself

In Sanity project management, keep yourself as the only project member/editor unless you
intentionally want someone else to publish content.

### 5. Publish a post

Open your Studio URL and create **Blog Post**.

Fill in:

- Title
- Slug (generated from title)
- Publish date
- Category
- Tags
- Excerpt
- Cover image
- Post content

The body editor supports headings, paragraphs, bold/italic, links, lists, inline images,
and code blocks.

Click **Publish**. The frontend checks Sanity frequently, so the new post will appear on
the website without a Git commit.

## Your normal workflow after setup

```text
Phone / browser
      ↓
Sanity Studio (private login)
      ↓
Create + edit + upload image
      ↓
Publish
      ↓
Sanity Content Lake
      ↓
Scrawl Next.js blog
```

## Existing MDX posts

The five sample posts under `content/posts/` are intentionally retained. They are used as
fallback content until equivalent Sanity posts exist. A Sanity post with the same slug wins
over the local MDX version.

You can delete the sample MDX posts later if you want the site to be 100% CMS-driven.

## Folder structure

```text
app/
  admin/page.tsx               → redirects to your online CMS
  page.tsx                     → home page
  blog/page.tsx                → post listing + search
  blog/[slug]/page.tsx         → MDX or Sanity post page
  category/[slug]/page.tsx     → category page
  sitemap.ts, robots.ts, rss.xml/route.ts
components/
  sanity/PortablePost.tsx      → Sanity rich-text renderer
content/posts/                 → legacy/demo MDX fallback posts
lib/
  posts.ts                     → unified MDX + Sanity content layer
  sanity.ts                    → Sanity client + image URL helper
studio/
  sanity.config.ts             → CMS configuration
  schemaTypes/post.ts          → Blog Post editor schema
```

## Deploying the frontend

Deploy the Next.js root project to Vercel as before. Add the Sanity environment variables
above to the Vercel project settings and redeploy.

The frontend only needs the Sanity project ID and dataset to read published content.
Keep any privileged Sanity API tokens server-side if you later add draft previews or
other authenticated API features.

## Packages

The frontend uses `@sanity/client`, `@sanity/image-url`, and `@portabletext/react` to read
and render CMS content. The Studio uses Sanity's official Studio package.

## Verification

Dependencies are not installed in this sandbox, so a complete production build cannot be
executed here. After extracting the project, run:

```bash
npm install
npm run build
```

For the Studio:

```bash
cd studio
npm install
npm run build
```
