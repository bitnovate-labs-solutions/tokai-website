"use client";

import type { KeyTextField } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";

type Primary = {
  section_heading: KeyTextField;
  caption: KeyTextField;
  column_one_header: KeyTextField;
  column_two_header: KeyTextField;
};

type Item = {
  cell_one: KeyTextField;
  cell_two: KeyTextField;
};

export default function EditorialArticleTable({ slice }: SliceComponentProps) {
  const { primary, items: rawItems } = slice as unknown as {
    primary: Primary;
    items: Item[];
  };
  const rows = rawItems.filter((r) => r.cell_one?.trim() || r.cell_two?.trim());
  if (rows.length === 0) return null;

  const h1 = primary.column_one_header?.trim();
  const h2 = primary.column_two_header?.trim();
  const showHead = Boolean(h1 || h2);

  return (
    <section className="border-t border-zinc-200/70 bg-white">
      <div className="mx-auto max-w-[50rem] px-4 py-8 md:px-6 md:py-10">
        {primary.section_heading?.trim() ? (
          <h2 className="mb-5 font-[family-name:var(--font-outfit)] text-xl font-semibold tracking-tight text-zinc-950 md:text-2xl">
            {primary.section_heading}
          </h2>
        ) : null}

        <div className="-mx-4 overflow-x-auto px-4 md:mx-0 md:overflow-visible md:px-0">
          <table className="w-full min-w-[20rem] border-collapse text-left text-sm text-zinc-800">
            {showHead ? (
              <thead>
                <tr className="border-b border-zinc-300 bg-zinc-50">
                  <th
                    scope="col"
                    className="px-3 py-3 font-[family-name:var(--font-jetbrains)] text-xs font-semibold uppercase tracking-wide text-zinc-700 md:px-4"
                  >
                    {h1 ?? ""}
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 font-[family-name:var(--font-jetbrains)] text-xs font-semibold uppercase tracking-wide text-zinc-700 md:px-4"
                  >
                    {h2 ?? ""}
                  </th>
                </tr>
              </thead>
            ) : null}
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-zinc-200 last:border-b-0 [&:nth-child(even)]:bg-zinc-50/50"
                >
                  <td className="align-top px-3 py-3 font-medium text-zinc-900 md:px-4 md:py-3.5">
                    {row.cell_one}
                  </td>
                  <td className="align-top px-3 py-3 text-zinc-700 md:px-4 md:py-3.5">
                    {row.cell_two}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {primary.caption?.trim() ? (
          <p className="mt-3 text-xs text-zinc-500">{primary.caption}</p>
        ) : null}
      </div>
    </section>
  );
}
