import { getSlices } from "@prismicio/next";

import { SliceSimulatorClient } from "./slice-simulator-client";

type Props = {
  searchParams: Promise<{ state?: string }>;
};

export default async function SliceSimulatorPage({ searchParams }: Props) {
  const { state } = await searchParams;
  const slices = getSlices(state);

  return <SliceSimulatorClient slices={slices} />;
}
