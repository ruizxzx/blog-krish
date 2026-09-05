# Scrawl CMS — 5-minute setup checklist

## A. Create the online CMS

1. Create/sign in to a Sanity account.
2. Create a project.
3. Use dataset `production`.
4. Copy the project ID.

## B. Deploy the editor

Open the `studio/` folder in a terminal:

```bash
cd studio
npm install
```

Create `studio/.env`:

```env
SANITY_STUDIO_PROJECT_ID=YOUR_PROJECT_ID
SANITY_STUDIO_DATASET=production
```

Then:

```bash
npm run deploy
```

Sanity will give you a hosted URL such as:

```text
https://your-studio.sanity.studio
```

Bookmark that URL. That is where you will publish future posts.

## C. Connect the blog

In Vercel → Project → Settings → Environment Variables, add:

```env
NEXT_PUBLIC_SITE_URL=https://YOUR_BLOG_DOMAIN
NEXT_PUBLIC_SANITY_PROJECT_ID=YOUR_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-07-18
NEXT_PUBLIC_SANITY_STUDIO_URL=https://YOUR_STUDIO.sanity.studio
```

Redeploy the blog.

## D. Publish

From your phone/browser:

1. Open the Studio URL.
2. Sign in.
3. Choose **Blog Post**.
4. Write the post.
5. Upload the cover image.
6. Add headings, links, lists, images, or code blocks.
7. Click **Publish**.

The post then comes from Sanity instead of requiring a new MDX file or Git push.

## Security

Sanity authentication controls access to the Studio. Keep the project membership limited
to yourself. The public blog only receives published content.

Do not put a Sanity write token in `NEXT_PUBLIC_*` variables.
