import type { LinkResolverFunction } from "@prismicio/client";

export const linkResolver: LinkResolverFunction = (doc) => {
  if (doc.type === "homepage") {
    return "/";
  }
  if (doc.type === "page") {
    return doc.uid ? `/${doc.uid}` : "/";
  }
  return "/";
};
