"use client";

import type { SliceZoneLike } from "@prismicio/react";
import { SliceZone } from "@prismicio/react";

import { sliceComponents } from "@/slices";

type Props = {
  slices: SliceZoneLike;
};

export function PrismicSliceZone({ slices }: Props) {
  return <SliceZone slices={slices} components={sliceComponents} />;
}
