import { ClickableGallery } from "@/components/clickable-gallery";
import { MotionReveal } from "@/components/motion-reveal";
import { SiteChrome } from "@/components/site-chrome";

export const metadata = {
  title: "Golden Bull — Tokai",
  description: "Golden Bull Award.",
};

const introParagraphs = [
  "Since 2003, the Golden Bull Award have served as the penultimate award for successful businesses:a crowning glory for years of growth and strength.",
  "In answering the Government's call for private sectors to provide support to the local SMEs, the Golden Bull Award was first initiated in 2003 to serve as a valuable platform to benchmark and help incubate and develop highly successful SMEs in the long term. Two award categories, namely the Outstanding SMEs and Emerging SMEs, were being conferred to 100 and 20 shortlisted winners respectively. The Award has also embarked on a nationwide roadshow to ensure widespread participation from eligible SMEs around the country.",
];

const detailParagraphs = [
  "The AwardAcknowledged as the most prestigious and representative annual business award, the Golden Bull Award honors the best of SMEs in Malaysia by giving them due recognition for their hard-earned success and outstanding achievements. Organised by Nanyang Siang Pau, the Award aims to provide an effective platform to benchmark successful SMEs and to inspire more SMEs to strive for excellence and accomplishment. Golden Bull Award is a testament to a rising trend of awareness and recognition towards the importance of SMEs in spearheading the continued economic growth of Malaysia.",
  "The TrophyThe Golden Bull Award is a symbol of outstanding SMEs that deserve recognition for their achievements. The Bull represents energy and determination, with its inner strength patiently waiting to be unleashed given the right motivation. It tirelessly paces its path to success, one firm step at a time. Outstanding SMEs share these same characteristics.",
  "Glittering Gold signifies success. The Golden Bull therefore symbolizes the worthiness of each outstanding SME which has made a name for itself and solidly made its mark on the corporate and commercial landscape. The Golden bull is mounted on a star shinning bright on the world denoting the readiness of outstanding SMEs to take on the challenges of globalization. The Pentagram - the five-pointed crystal star, an ancient symbol of \"Truth\", symbolize the five human benchmarkis of achievement - Perseverance, Confidence, Diligence, Dynamic and Innovation.",
  "The Golden Bull Award is also crystal clear, symbolizing transparency, which is necessary to insure a level playing field for all nominees.",
  "In all, Golden Bull Award will continue to power private sector-led growth of the country by honoring and profiling top SMEs towards the next level of success.",
];

const objectives = [
  "Complement the efforts of the National SME Development Council in promoting and strengthening the coordinated development of SMEs across all sectors towards domestic-led growth of Malaysia.",
  "Promote the development of SMEs as the catalysts of economic growth and domestic investments, enabling them to resume the role as the growth engine of Malaysia.",
  "Pay tribute to the winning SMEs for their hard-earned success and well-deserved recognition.",
  "Instill a culture of benchmarking among SMEs and encourage them to learn the success formula from the winning SMEs.",
  "Encourage more SMEs to increase their productivity and quality through modern management skills, ICT, research and development (R&D), human resources development, financial management, etc.",
  "Equip SMEs in facing the challenges and opportunities arising from globalization and trade liberalization.",
];

const gallery = [
  "https://tokai.com.my/wp-content/uploads/2019/05/bull_01.jpg",
  "https://tokai.com.my/wp-content/uploads/2019/05/bull_02.jpg",
  "https://tokai.com.my/wp-content/uploads/2019/05/bull_03.jpg",
  "https://tokai.com.my/wp-content/uploads/2019/05/bull_04.jpg",
  "https://tokai.com.my/wp-content/uploads/2019/05/bull_05.jpg",
  "https://tokai.com.my/wp-content/uploads/2019/05/bull_06.jpg",
];

export default function GoldenBullPage() {
  return (
    <SiteChrome>
      <section className="border-b border-zinc-200/80 bg-[#f7f6f3]">
        <div className="mx-auto max-w-[1200px] px-4 pb-16 pt-32 md:px-8 md:pb-24 md:pt-28">
          <MotionReveal>
            <p className="mb-4 inline-flex rounded-full bg-zinc-950/5 px-3 py-1 font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[0.2em] text-zinc-600">
              Awards
            </p>
            <h1 className="font-[family-name:var(--font-outfit)] text-4xl font-semibold tracking-tight text-zinc-950 md:text-6xl">
              Golden Bull Award
            </h1>
          </MotionReveal>
        </div>
      </section>
      <section className="bg-white">
        <div className="mx-auto max-w-[1200px] px-4 py-16 md:px-8 md:py-24">
          <MotionReveal>
            <article className="rounded-3xl border border-zinc-200 p-6 md:p-10">
              <div className="space-y-4 leading-relaxed text-zinc-700">
                {introParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="mt-6 space-y-4 leading-relaxed text-zinc-700">
                {detailParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <h2 className="mt-8 font-[family-name:var(--font-outfit)] text-2xl font-semibold text-zinc-950">
                Obejctives
              </h2>
              <ul className="mt-4 space-y-2 text-zinc-700">
                {objectives.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
              <h2 className="mt-10 font-[family-name:var(--font-outfit)] text-2xl font-semibold text-zinc-950">
                Picture Gallery
              </h2>
              <div className="mt-4">
                <ClickableGallery
                  images={gallery.map((src) => ({
                    src,
                    alt: "Golden Bull award gallery",
                  }))}
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
