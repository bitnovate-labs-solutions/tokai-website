import { ClickableGallery } from "@/components/clickable-gallery";
import { MotionReveal } from "@/components/motion-reveal";
import { SiteChrome } from "@/components/site-chrome";

export const metadata = {
  title: "APEA — Tokai",
  description: "Asia Pacific Entrepreneurship Award.",
};

const paragraphs = [
  "Asia Pacific's Most Prestigious Awards For Entrepreneurs",
  "Dato' Jimmy Lim, founder of Tokai is the proud winner of the Outstanding Entrepreneur Awards 2007 which was awarded to outstanding individuals who have demonstrated entrepreneurial attributes that make them role models for emerging entrepreneurs, including the tenacity and perseverance to continue innovating and making a difference under adverse situations and environments.",
  "About APEA",
  "The prestigious Asia Pacific Entrepreneurship Awards is a world-class awards recognizing and honoring business leaders who have shown outstanding performance and tenacity in developing successful businesses within the region.",
  "Organized by Enterprise Asia and supported by local governments and businesses, the awards aim to band leading entrepreneurs across the region to spur greater innovation, fair practices and growth in entrepreneurship. It hopes to be a platform to encourage continued leadership towards sustainable economic development for the region.",
  "A regional award for outstanding entrepreneurship, APEA is built on the idea that for entrepreneurs to continue innovating and sustaining their leadership there must be three elements in place: benchmarking against best practices, recognition of past and current efforts, and continued publicity and public attention.",
  "Today, the awards has expanded to include Malaysia, Indonesia, Brunei, Singapore, Hong Kong, Vietnam, Thailand, India and China.",
];

const gallery = [
  "https://tokai.com.my/wp-content/uploads/2019/04/apea_01.jpg",
  "https://tokai.com.my/wp-content/uploads/2019/04/apea_02.jpg",
  "https://tokai.com.my/wp-content/uploads/2019/04/apea_03.jpg",
  "https://tokai.com.my/wp-content/uploads/2019/04/apea_04.jpg",
  "https://tokai.com.my/wp-content/uploads/2019/04/apea_05.jpg",
];

export default function ApeaPage() {
  return (
    <SiteChrome>
      <section className="border-b border-zinc-200/80 bg-[#f7f6f3]">
        <div className="mx-auto max-w-[1200px] px-4 pb-16 pt-32 md:px-8 md:pb-24 md:pt-28">
          <MotionReveal>
            <p className="mb-4 inline-flex rounded-full bg-zinc-950/5 px-3 py-1 font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[0.2em] text-zinc-600">
              Awards
            </p>
            <h1 className="font-[family-name:var(--font-outfit)] text-4xl font-semibold tracking-tight text-zinc-950 md:text-6xl">
              Asia Pacific Entrepreneurship Award
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
                  images={gallery.map((src) => ({ src, alt: "APEA award gallery" }))}
                  imageClassName="h-56 w-full object-cover"
                  columnsClassName="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                />
              </div>
            </article>
          </MotionReveal>
        </div>
      </section>
    </SiteChrome>
  );
}
