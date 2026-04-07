"use client";

import type { SliceZoneLike } from "@prismicio/react";
import { SliceZone } from "@prismicio/react";

import { sliceComponents } from "@/slices";

import { TokaiSliceSimulator } from "./tokai-slice-simulator";

type Props = {
  slices: SliceZoneLike;
};

export function SliceSimulatorClient({ slices }: Props) {
  const serverSliceCount = Array.isArray(slices) ? slices.length : 0;

  return (
    <TokaiSliceSimulator serverSliceCount={serverSliceCount}>
      {/* `data-slice-zone` is what `@prismicio/simulator` DOM helpers look for first */}
      <div data-slice-zone>
        <SliceZone slices={slices} components={sliceComponents} />
      </div>
    </TokaiSliceSimulator>
  );
}
