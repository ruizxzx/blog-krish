# Scrawl CMS Studio

This is the **online publishing dashboard** for the Scrawl blog.

## First-time setup

1. Create/sign in to a Sanity account.
2. Create a Sanity project and choose the `production` dataset.
3. Copy the project ID into the Studio environment as `SANITY_STUDIO_PROJECT_ID`.
4. Set `SANITY_STUDIO_DATASET=production`.
5. Run `npm install`.
6. Run `npm run deploy`.
7. Sanity will provide a hosted `*.sanity.studio` URL.
8. Open that URL from your phone or computer and sign in.

After deployment, normal blog publishing does **not** require GitHub, VS Code, MDX files,
or a local server. Write the post in the browser, upload images, and press **Publish**.

Only members of the Sanity project can edit content. Keep the project membership limited
to the people you trust to publish.

## Editor fields

The Blog Post document includes:

- Title
- Slug
- Publish date
- Category
- Tags
- Excerpt
- Cover image with alt text/caption
- Rich post body

The rich body supports headings, paragraphs, bold/italic, links, bullet/numbered lists,
inline images, and code blocks.
