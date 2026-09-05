import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

export const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const sanityDataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const sanityApiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-07-18";

export const sanityConfigured = Boolean(sanityProjectId && sanityDataset);

export const sanityClient = sanityConfigured
  ? createClient({
      projectId: sanityProjectId,
      dataset: sanityDataset,
      apiVersion: sanityApiVersion,
      useCdn: true,
    })
  : null;

const builder = sanityConfigured && sanityClient
  ? createImageUrlBuilder(sanityClient)
  : null;

export function sanityImageUrl(source: unknown): string | null {
  if (!builder || !source) return null;
  try {
    return builder.image(source).auto("format").fit("max").url();
  } catch {
    return null;
  }
}
