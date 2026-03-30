import type { SliceZoneLike } from "@prismicio/react";

export type PagePayload = {
  slices: SliceZoneLike;
  metaTitle: string | null;
  metaDescription: string | null;
};
