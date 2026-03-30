import type { RichTextField } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";

import { MotionReveal } from "@/components/motion-reveal";
import { SiteRichText } from "@/components/prismic-rich";

type Primary = {
  heading: RichTextField;
  body: RichTextField;
};

export default function TextSection({ slice }: SliceComponentProps) {
  const { primary } = slice as unknown as { primary: Primary };
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1400px] px-4 py-24 md:px-8 md:py-40">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <MotionReveal className="lg:col-span-5">
            <SiteRichText field={primary.heading} variant="display" />
          </MotionReveal>
          <MotionReveal className="lg:col-span-7" delay={0.06}>
            <div className="space-y-6">
              <SiteRichText field={primary.body} />
            </div>
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}
