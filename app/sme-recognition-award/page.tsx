import { ClickableGallery } from "@/components/clickable-gallery";
import { MotionReveal } from "@/components/motion-reveal";
import { SiteChrome } from "@/components/site-chrome";

export const metadata = {
  title: "SME Recognition Award — Tokai",
  description: "SME Recognition Award (SMERA).",
};

const paragraphs = [
  "Embracing Innovation, Accelerating Transformation",
  "SME Recognition Award (SMERA) Series is an annual award programme organised by the SMI Association of Malaysia to recognise and celebrate the outstanding achievements of small and medium enterprises in Malaysia.",
  "Launched in 2002, this Recognition Award programme is into its 11th consecutive year of Awards Presentation. It is well-supported by the leading Malaysian Chambers of Commerce, including the Associated Chinese Chambers of Commerce, the Malay Chambers of Commerce and the Indian Chamber of Commerce. SMI Association of Malaysia represents the aspirations and interests of more than 645,000 small and medium enterprises (SMEs) in Malaysia.",
  "Besides showcasing the achievements of Malaysia's top SMEs, this Award also provides a premium platform to benchmark the service/quality of SMEs, as well as enhance their intellectual properties and brand image in the global marketplace. The integrity and quality of the SME Recognition Award is jealously protected by the organisers, supported by a reputable independent auditor whose role is to assess, evaluate and shortlist the potential Award winners for final judging by a top-class Selection Committee comprising leading business personalities and trade offcials.",
  "The SME Recognition Award 2013 is aptly theme \"Embracing Innovation Accelerating Transformation\", reflecting the need for Malaysian SMEs to continuously innovate and add value to their products and services in order to compete effectively in an increasingly competitive global market.",
  "The Organizer",
  "SMI Association Malaysia was established on 13th July 1995 with the objectives of promoting, providing supports, services and solutions towards the best interest of small and medium industries, enterprises and businesses in Malaysia. Since the inception, the Association has been organizing numerous mega and international conferences, seminars, award, exhibition and localized projects to educate, elevate and expose its members as well as small and medium industries, enterprises and businesses in Malaysia.",
];

const gallery = [
  "https://tokai.com.my/wp-content/uploads/2019/05/smera_01.jpg",
  "https://tokai.com.my/wp-content/uploads/2019/05/smera_02.jpg",
];

export default function SmeRecognitionAwardPage() {
  return (
    <SiteChrome>
      <section className="border-b border-zinc-200/80 bg-[#f7f6f3]">
        <div className="mx-auto max-w-[1200px] px-4 pb-16 pt-32 md:px-8 md:pb-24 md:pt-28">
          <MotionReveal>
            <p className="mb-4 inline-flex rounded-full bg-zinc-950/5 px-3 py-1 font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[0.2em] text-zinc-600">
              Awards
            </p>
            <h1 className="font-[family-name:var(--font-outfit)] text-4xl font-semibold tracking-tight text-zinc-950 md:text-6xl">
              SME Recognition Award (SMERA)
            </h1>
          </MotionReveal>
        </div>
      </section>
      <section className="bg-white">
        <div className="mx-auto max-w-[1200px] px-4 py-16 md:px-8 md:py-24">
          <MotionReveal>
            <article className="rounded-3xl border border-zinc-200 p-6 md:p-10">
              <div className="space-y-4 leading-relaxed text-zinc-700">
                {paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <h2 className="mt-10 font-[family-name:var(--font-outfit)] text-2xl font-semibold text-zinc-950">
                Picture Gallery
              </h2>
              <div className="mt-4">
                <ClickableGallery
                  images={gallery.map((src) => ({
                    src,
                    alt: "SME Recognition award gallery",
                  }))}
                  imageClassName="h-72 w-full object-cover"
                  columnsClassName="grid gap-4 md:grid-cols-2"
                />
              </div>
            </article>
          </MotionReveal>
        </div>
      </section>
    </SiteChrome>
  );
}
