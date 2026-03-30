import { ClickableGallery } from "@/components/clickable-gallery";
import { MotionReveal } from "@/components/motion-reveal";
import { SiteChrome } from "@/components/site-chrome";

export const metadata = {
  title: "Enterprise 50 — Tokai",
  description: "Enterprise 50 Award.",
};

const paragraphs = [
  "Tokai is the proud winner of the E50 award for the year 2003, 2004 and 2006.",
  "About E50Enterprise 50 is an annual award programme organised by the SME Corporation Malaysia (SME Corp.) and Deloitte Malaysia, with supporting sponsorship by RHB Bank Berhad and Telekom Malaysia Berhad (TM) to celebrate and highlight the achievements of enterprising small and medium companies that are well positioned for the future.",
  "The Award programme, which started in 1996, marks its 16th year in existence this year with support from the Ministry of International Trade and Industry. Each year, 50 winners are selected from amongst the nominations received and the evaluation is based on key financial and non-financial factors. To date, a total of 1,673 companies participated and 511 companies have come out as winners. From this pool of winners, 43 have been listed on the Malaysian Bourse and 13 on ACE Market (formerly known as MESDAQ). Winners will get to enjoy publicity in both the print and electronic media. They will be featured in the Business Times' special E50 supplement, Media Prima, Malaysia SME Newspaper and the E50 website.",
];

const benefits = [
  "receive the Enterprise 50 award trophy and certificate at the award dinner;",
  "be automatically nominated to the Industry Excellence Award and the National Productivity Award;",
  "free seat at the exclusive award dinner where winners will be given the opportunity to network with the movers and shakers of the Malaysian economy;",
  "receive media coverage from Business Times, Media Prima, Malaysia SME and other printed media;an endorsement and mark of recognition and excellence for the winning company;",
  "be able to use the Enterprise 50 Logo on your corporate collaterals;",
  "privileged access to the winners circle where Enterprise 50 winners can access latest industry, specific research reports, case studies and ground-breaking information;",
  "automatic entry for Deloitte Tech Fast 500 Programme;",
  "special Business Solutions Package from Telekom Malaysia Berhad;",
  "fast lane processing for loan application and RHB Business Platinum Credit Card* from RHB Bank Berhad; and",
  "be featured in the Enterprise 50 homepage www.e50.com.my",
];

const gallery = [
  "https://tokai.com.my/wp-content/uploads/2019/05/e50_01.jpg",
  "https://tokai.com.my/wp-content/uploads/2019/05/e50_02.jpg",
];

export default function EnterpriseFiftyPage() {
  return (
    <SiteChrome>
      <section className="border-b border-zinc-200/80 bg-[#f7f6f3]">
        <div className="mx-auto max-w-[1200px] px-4 pb-16 pt-32 md:px-8 md:pb-24 md:pt-28">
          <MotionReveal>
            <p className="mb-4 inline-flex rounded-full bg-zinc-950/5 px-3 py-1 font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[0.2em] text-zinc-600">
              Awards
            </p>
            <h1 className="font-[family-name:var(--font-outfit)] text-4xl font-semibold tracking-tight text-zinc-950 md:text-6xl">
              Enterprise 50 Award
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
              <h2 className="mt-8 font-[family-name:var(--font-outfit)] text-2xl font-semibold text-zinc-950">
                The Benefits
              </h2>
              <p className="mt-3 leading-relaxed text-zinc-700">
                Winners will get to enjoy publicity in both the print and
                electronic media, as well as to be featured in the E50 website.
                Winners also honoured with:
              </p>
              <ul className="mt-3 space-y-2 text-zinc-700">
                {benefits.map((item) => (
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
                    alt: "Enterprise 50 award gallery",
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
