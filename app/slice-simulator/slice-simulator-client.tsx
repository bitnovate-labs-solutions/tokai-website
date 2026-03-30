"use client";

import { SliceSimulator } from "@prismicio/next";
import type { SliceZoneLike } from "@prismicio/react";
import { SliceZone } from "@prismicio/react";

import { sliceComponents } from "@/slices";

type Props = {
  slices: SliceZoneLike;
};

export function SliceSimulatorClient({ slices }: Props) {
  return (
    <SliceSimulator>
      <SliceZone slices={slices} components={sliceComponents} />
    </SliceSimulator>
  );
}
