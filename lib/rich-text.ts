import type { RichTextField } from "@prismicio/client";

/** Paragraph with a web hyperlink span over `linkText` (indices: before + link + after). */
export function paragraphWithWebLink(
  before: string,
  linkText: string,
  after: string,
  url: string,
): RichTextField {
  const text = `${before}${linkText}${after}`;
  const start = before.length;
  const end = start + linkText.length;
  return [
    {
      type: "paragraph",
      text,
      spans: [
        {
          type: "hyperlink",
          start,
          end,
          data: {
            link_type: "Web",
            url,
          },
        },
      ],
    },
  ];
}

export function h1(text: string): RichTextField {
  return [{ type: "heading1", text, spans: [] }];
}

export function h2(text: string): RichTextField {
  return [{ type: "heading2", text, spans: [] }];
}

export function paragraph(text: string): RichTextField {
  return [{ type: "paragraph", text, spans: [] }];
}

/** Unordered list (Prismic `group-list-item` + `list-item` blocks). */
export function bulletList(items: string[]): RichTextField {
  return [
    {
      type: "group-list-item",
      items: items.map((text) => ({
        type: "list-item" as const,
        text,
        spans: [] as [],
      })),
    },
  ] as unknown as RichTextField;
}

export function richJoin(...blocks: RichTextField[]): RichTextField {
  return blocks.flat() as RichTextField;
}
