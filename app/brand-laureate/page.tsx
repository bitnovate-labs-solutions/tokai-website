import { BrandLaureateShowcase } from "@/components/brand-laureate-showcase";
import { MotionReveal } from "@/components/motion-reveal";
import { SiteChrome } from "@/components/site-chrome";

export const metadata = {
  title: "Brand Laureate — Tokai",
  description: "The BrandLaureate SMEs Best Brand Awards 2016-2017.",
};

const paragraphs = [
  "1st March, 2017 - TOKAI was awarded The BrandLaureate SMEs BestBrands Award 2017 at The BrandLaureate - SMEs BestBrands Awards '17 Gala Dinner, organised by the Asia Pacific Brands Foundation (APBF) held at the Majestic Hotel KL recently.",
  "The BrandLaureate SMEs BestBrands Awards is a category of award which is presented to brands that have stamped their mark in the industry and are market leaders. In its 10th edition, The BrandLaureate SMEs' BestBrands Awards '17 honours the best of brands from the small and medium enterprises (SMEs) and is in line with the objectives of the APBF to increase the level of brand awareness in Malaysia and beyond; while nurturing outstanding Malaysian brands to become global brands.",
  "The winners of The BrandLaureate SMEs' BestBrands Awards are evaluated and selected based on a 300-point selection criteria consisting of key points such as brand strategy, brand culture, integrated brand communications, brand equity and brand performance. And TOKAI has successfully met the stringent 300-point selection criteria.",
  "Commenting on winning the Award, Group CEO Dato' Ir. Jimmy Lim said \"It is indeed a great start to a new year. We are honoured to receive the BestBrands Award which is the highest category of award presented by the Asia Pacific Brands Foundation. The award is indeed a testament of TOKAI's world-class Earthing & Lightning Protection and Security Engineering systems; and endorsed our position as the leading industry leader in our field locally.",
  "This award is dedicated to our staff that have delivered and provided the best of service to our Clients all these years. We will not rest on our laurels but will continue to provide exceptional services to the industries we serve. I believe the brand is the soul of our TOKAI and our staff its life-line.\"",
];

export default function BrandLaureatePage() {
  return (
    <SiteChrome>
      <section className="border-b border-zinc-200/80 bg-[#f7f6f3]">
        <div className="mx-auto max-w-[1200px] px-4 pb-16 pt-32 md:px-8 md:pb-24 md:pt-28">
          <MotionReveal>
            <p className="mb-4 inline-flex rounded-full bg-zinc-950/5 px-3 py-1 font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[0.2em] text-zinc-600">
              Awards
            </p>
            <h1 className="font-[family-name:var(--font-outfit)] text-4xl font-semibold tracking-tight text-zinc-950 md:text-6xl">
              The BrandLaureate SMEs Best Brand Awards 2016-2017
            </h1>
            <p className="mt-4 text-lg text-zinc-600">
              Best Brands In Environment - Safety & Security Solutions
            </p>
          </MotionReveal>
        </div>
      </section>
      <section className="bg-white">
        <div className="mx-auto max-w-[1200px] px-4 py-16 md:px-8 md:py-24">
          <MotionReveal>
            <BrandLaureateShowcase paragraphs={paragraphs} />
          </MotionReveal>
        </div>
      </section>
    </SiteChrome>
  );
}
