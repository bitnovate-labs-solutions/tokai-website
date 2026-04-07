# Prismic Integration Setup (tokai-website-v2)

This repo renders Prismic content in Next.js using the `@prismicio/client`, `@prismicio/next`, and `@prismicio/react` packages.

**Official reference:** Prismic’s current Next.js guide (client, routes, previews, Slice Simulator) is at [prismic.io/docs/nextjs](https://prismic.io/docs/nextjs). This file describes **this repository’s** wiring; where behavior differs from the default starter (env-based repo name, fallbacks, etc.), it is called out below.

## Alignment with Prismic’s documented Next.js setup

| Topic | Prismic docs (typical starter) | This repo |
| --- | --- | --- |
| Repository name | Often imported from `slicemachine.config.json` (`repositoryName`) into `prismicio.ts` | `NEXT_PUBLIC_PRISMIC_REPOSITORY_NAME` in `.env.local` drives `lib/prismicio.ts`. Keep the **same** name as `repositoryName` in `slicemachine.config.json` when you use Slice Machine. |
| Route resolvers | `{ type: "homepage", path: "/" }`, `{ type: "page", path: "/:uid" }` | Same pattern in `lib/prismicio.ts`. |
| Previews | `enableAutoPreviews` on the client, `GET /api/preview` with `redirectToPreviewURL`, `GET /api/exit-preview`, `<PrismicPreview />` in the root layout | Implemented: `lib/prismicio.ts`, `app/api/preview/route.ts`, `app/api/exit-preview/route.ts`, `app/layout.tsx` (preview UI only if Prismic is configured). The preview route also passes a `linkResolver` and `defaultURL` for this app’s URLs. |
| Live previews (Page Builder) | `/slice-simulator` route for slice thumbnails | Implemented: `app/slice-simulator/page.tsx`. |
| Cache / webhooks | Docs often show `fetchOptions` with a `prismic` tag and a separate `/api/revalidate` webhook for instant invalidation | This app uses `next: { tags: ["prismic"], revalidate: 60 }` on the Prismic client (`lib/prismicio.ts`) for **time-based** updates (~60s). There is **no** `/api/revalidate` route yet; add one and a Prismic webhook if you need immediate cache clears after publish. |

## 1) Prismic content model (must match this repo)

### Homepage (singleton)
Create a **singleton** custom type with id:
- `homepage`

It must contain:
- `meta_title` (Text)
- `meta_description` (Text)
- `slices` (Slice zone)

The homepage slice zone in this repo (`customtypes/homepage/index.json`) currently allows these shared slices:
`hero_split`, `stats_row`, `service_bento`, `text_section`, `cta_band`, `page_intro`, `section_block`, `project_gallery`.

The full set of slice types implemented in the app is defined in `slices/index.ts` (`sliceComponents`). The **`page`** custom type’s slice zone (`customtypes/page/index.json`) includes those homepage slices plus slices used on inner pages (for example `image_text_section`, `solution_parallax`, and slices for company events, editorials, and CSR/editorial articles). Keep Slice Machine / Prismic in sync with those JSON files so editors can add every slice the front end knows how to render.

### Pages (repeatable)
Create a **repeatable** custom type with id:
- `page`

It must contain:
- `uid` (UID)
- `meta_title` (Text)
- `meta_description` (Text)
- `slices` (Slice zone)

The `slices` field must match the slice zone in `customtypes/page/index.json` (aligned with `slices/index.ts`).

## 2) Next.js environment variables

Edit `.env.local`:

`NEXT_PUBLIC_PRISMIC_REPOSITORY_NAME`
- Set to your Prismic **repository name** (same value as **Repository name** in the dashboard URL and as `repositoryName` in `slicemachine.config.json`).

`PRISMIC_ACCESS_TOKEN` (optional but strongly recommended)
- Needed if the API is set to **Private** in **Settings → API & Security**, and for reliable draft **full-website previews** (see [Secure with an access token](https://prismic.io/docs/nextjs#secure-with-an-access-token) in Prismic’s guide).
- If unset, the client omits a token (see `lib/prismicio.ts`), which is fine for a **public** API and published documents only.

## 3) Route mapping: how Prismic UIDs become Next URLs

This repo uses `/:uid` for Prismic `page` documents:
- Prismic Page document UID `about-us` renders at `http://localhost:3000/about-us`
- Prismic Page document UID `our-solutions` renders at `http://localhost:3000/our-solutions`

It also has dedicated routes that do their own loading:
- `/company-events` (loads Prismic page UID `company-events`)
- `/editorials` (loads Prismic page UID `editorials`)
- CSR article pages (dedicated routes under `app/`, e.g. `app/csr_*/page.tsx` and `app/csr-*/page.tsx`)

## 4) Publish requirements (why you might see “This path is not published.”)

That message is the title of the global 404 UI in `app/not-found.tsx`. For dynamic routes it usually means Prismic content is missing or empty, but it is **not** exclusive to Prismic—for example an unknown `/:uid` with no built-in fallback also shows it.

`notFound()` is triggered for `/:uid` when:
- `getPageByUid` returns no usable page (unknown UID and no fallback, or Prismic returned nothing usable), OR
- the resolved page has **no slices** (`slices.length === 0`)

Related Prismic causes include:
- the `page` document for the UID can’t be fetched (wrong UID, draft not published, private repo without token, etc.)
- the document exists but its `slices` slice zone is empty

Checklist:
1. Confirm the Prismic **Page** document exists with the exact UID you’re visiting.
2. Confirm it is **Published** (not just saved as a draft).
3. Confirm the `slices` slice zone has at least one slice added.
4. If the repo is private, set `PRISMIC_ACCESS_TOKEN`.

### UID field id must be `uid`
This repo uses `client.getByUID("page", uid)`. The Prismic SDK expects the custom type's UID field to be the standard `uid` field id.

Checklist:
1. Open the `page` custom type in Prismic.
2. Find the field marked as the UID field and confirm its API field id is `uid`.
3. If it isn't `uid`, fix it via Slice Machine and re-publish the model (or update the code to query the correct UID field).

## 5) Preview flow (matches [Prismic preview docs](https://prismic.io/docs/core-concepts/preview-setup))

Prismic distinguishes **full-website previews** (draft content on your site) and **live previews** (slice thumbnails in the **Page Builder**). This app supports both patterns used in [Set up previews in Prismic](https://prismic.io/docs/nextjs#set-up-previews-in-prismic) / [Preview draft content](https://prismic.io/docs/nextjs#preview-draft-content).

### Routes in this repo

- `GET /api/preview` — enters preview and redirects (uses `redirectToPreviewURL` from `@prismicio/next`).
- `GET /api/exit-preview` — ends the preview session (`exitPreview`).
- `GET /slice-simulator` — used by the Page Builder for **live** slice previews (`app/slice-simulator/page.tsx`).

### Configure previews in the Prismic repository

In the Prismic dashboard: **Settings → Previews**. Add a preview (e.g. for local dev):

| Field | Example |
| --- | --- |
| Site name | Development |
| Domain for your application | `http://localhost:3000` |
| Preview route | `/api/preview` |

After deployment, add another preview with your production domain. See the table in [Set up previews in Prismic](https://prismic.io/docs/nextjs#set-up-previews-in-prismic).

### Environment

1. Set `NEXT_PUBLIC_PRISMIC_REPOSITORY_NAME` correctly.
2. For a **private** API or draft full-site previews, set `PRISMIC_ACCESS_TOKEN` (server-only secret).
3. Use **Preview** from the document screen in Prismic (Page Builder); the Prismic toolbar should appear during a preview session when `<PrismicPreview />` is active in `app/layout.tsx`.

## 6) Local dev verification steps

1. Run the dev server:
   - `npm run dev`
2. Visit:
   - `/` (homepage singleton)
   - `/<some-prismic-page-uid>` (a published Page doc)
3. If a page shows 404 / “not published”:
   - verify UID + Published status + slices present (Section 4).

## 7) Troubleshooting (common causes)

### Nothing renders on `/:uid` routes
Common causes:
- You’re visiting a UID that doesn’t exist (or isn’t published).
- The `page` document exists but has no slices configured.
- `PRISMIC_ACCESS_TOKEN` is missing for a private repo.

### Prismic is configured but fetch fails
For **`page`** routes, this repo falls back to `lib/tokai-fallback-pages.ts` **only for UIDs that have a defined fallback**. If fetch fails and there is no fallback for that UID, you still get the 404 above.

For **`/`**, if the `homepage` singleton can’t be loaded, the app falls back to `lib/default-homepage.ts`.

### Still not working
If you can, tell me:
- The exact URL/UID that fails
- Whether the document is Public or Private in Prismic
- Whether it’s Published and has slices filled

