import { ClickableGallery } from "@/components/clickable-gallery";
import { MotionReveal } from "@/components/motion-reveal";
import { SiteChrome } from "@/components/site-chrome";

export const metadata = {
  title: "Company of the Year — Tokai",
  description: "Brand of the Year 2013.",
};

const objectives = [
  "To honour individuals and companies that demonstrate the core values of business excellence;",
  "To assist in shaping the corporate landscape through innovative & dynamic processes;",
  "To provide a notable opportunity for new and established outstanding companies to be acknowledged as an excellent leader in the market",
  "To encourage corporate sustainability and social responsibility;",
  "To benchmark the principles of meritocracy, credibility, accountability and transparency;",
  "To advance corporate missions and visions;",
  "To bridge strategic partnership, joint venture and transcontinental cooperation;",
  "To raise the overall quality and competitive edge from local to global;",
];

const eligibility = [
  "Incorporated in Malaysia and oversea in compliance with the relevant rules of law, having no bankruptcy records and/or proceedings and/or on-going cases for criminal breach of trust;",
  "In operation for at least 1 year or in similar standing;",
  "Maintaining an increasing and steady profit growth backed up with sound financial management and is financially viable into the future;",
  "Retaining a tested and proven record of excellence and sustainability;",
  "Demonstrating a commitment and determination to exceptional quality and entrepreneurship;",
  "Possessing a well-charted business plan and execution strategy;",
  "Other related qualification and excellence.",
];

const gallery = [
  "https://tokai.com.my/wp-content/uploads/2019/05/co_01.jpg",
  "https://tokai.com.my/wp-content/uploads/2019/05/co_02.jpg",
  "https://tokai.com.my/wp-content/uploads/2019/05/co_03.jpg",
  "https://tokai.com.my/wp-content/uploads/2019/05/co_04.jpg",
];

export default function CompanyOfTheYearPage() {
  return (
    <SiteChrome>
      <section className="border-b border-zinc-200/80 bg-[#f7f6f3]">
        <div className="mx-auto max-w-[1200px] px-4 pb-16 pt-32 md:px-8 md:pb-24 md:pt-28">
          <MotionReveal>
            <p className="mb-4 inline-flex rounded-full bg-zinc-950/5 px-3 py-1 font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[0.2em] text-zinc-600">
              Awards
            </p>
            <h1 className="font-[family-name:var(--font-outfit)] text-4xl font-semibold tracking-tight text-zinc-950 md:text-6xl">
              Company Of The Year Award
            </h1>
            <p className="mt-4 text-lg text-zinc-600">Brand of the Year 2013</p>
          </MotionReveal>
        </div>
      </section>
      <section className="bg-white">
        <div className="mx-auto max-w-[1200px] px-4 py-16 md:px-8 md:py-24">
          <MotionReveal>
            <article className="rounded-3xl border border-zinc-200 p-6 md:p-10">
              <h2 className="font-[family-name:var(--font-outfit)] text-2xl font-semibold text-zinc-950">
                The Objectives
              </h2>
              <ul className="mt-4 space-y-2 text-zinc-700">
                {objectives.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>

              <h2 className="mt-8 font-[family-name:var(--font-outfit)] text-2xl font-semibold text-zinc-950">
                Applicants
              </h2>
              <p className="mt-3 leading-relaxed text-zinc-700">
                A premier comprehensive national award conducted annually opens
                to excellent "companies" of all industries and all sizes as
                well as prominent"individuals" from Giant Companies, Listed
                Companies, International Companies, Foreign Companies,
                Government Linked Companies (GLCs), Government-Friendly
                Companies (GFCs) and Small/Medium Enterprise or Industries
                (SMEs or SMIs).
              </p>

              <h2 className="mt-8 font-[family-name:var(--font-outfit)] text-2xl font-semibold text-zinc-950">
                Criteria & Eligibility
              </h2>
              <p className="mt-3 leading-relaxed text-zinc-700">
                All applicants shall be invited by the joint organisers or
                recommended by business organisations, professional bodies or
                related authorities, and self-submission shall obtain prior
                approval by the joint organisers. They will be judged on
                overall performances, particularly on
              </p>
              <p className="mt-3 text-zinc-800">
                (a) annual revenue - 15% (b) profit- 30%(c) strategy of
                management- 10%(d) marketing & growth- 10% (e) human capital-
                10% (f) achievements - 15% (g) entrepreneurship - 10%
              </p>
              <p className="mt-3 text-zinc-800">Each and every applicant should be:</p>
              <ol className="mt-2 list-decimal space-y-2 pl-6 text-zinc-700">
                {eligibility.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>

              <h2 className="mt-10 font-[family-name:var(--font-outfit)] text-2xl font-semibold text-zinc-950">
                Picture Gallery
              </h2>
              <div className="mt-4">
                <ClickableGallery
                  images={gallery.map((src) => ({
                    src,
                    alt: "Company of the Year award gallery",
                  }))}
                  imageClassName="h-56 w-full object-cover"
                  columnsClassName="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
                />
              </div>
            </article>
          </MotionReveal>
        </div>
      </section>
    </SiteChrome>
  );
}
