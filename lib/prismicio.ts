import * as prismic from "@prismicio/client";
import { enableAutoPreviews } from "@prismicio/next";

export const repositoryName =
  process.env.NEXT_PUBLIC_PRISMIC_REPOSITORY_NAME ?? "";

export function isPrismicConfigured(): boolean {
  return Boolean(repositoryName);
}

export function createClient(): prismic.Client {
  if (!repositoryName) {
    throw new Error(
      "Missing NEXT_PUBLIC_PRISMIC_REPOSITORY_NAME. Add it to .env.local to load content from Prismic.",
    );
  }

  const client = prismic.createClient(repositoryName, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    routes: [
      { type: "homepage", path: "/" },
      { type: "page", path: "/:uid" },
    ],
    fetchOptions: {
      next: { tags: ["prismic"], revalidate: 60 },
    },
  });

  enableAutoPreviews({ client });

  return client;
}
