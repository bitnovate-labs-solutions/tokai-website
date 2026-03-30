import { redirectToPreviewURL } from "@prismicio/next";
import type { NextRequest } from "next/server";

import { createClient, isPrismicConfigured } from "@/lib/prismicio";
import { linkResolver } from "@/lib/link-resolver";

export async function GET(request: NextRequest) {
  if (!isPrismicConfigured()) {
    return new Response("Prismic is not configured.", { status: 500 });
  }

  const client = createClient();

  return redirectToPreviewURL({
    client,
    request,
    linkResolver,
    defaultURL: "/",
  });
}
