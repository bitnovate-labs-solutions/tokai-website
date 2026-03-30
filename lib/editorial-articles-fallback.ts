import { createGetInTouchCtaBandSlice } from "@/lib/get-in-touch-cta-slice";
import { h1, paragraph, richJoin } from "@/lib/rich-text";

function editorialCta(id: string) {
  return createGetInTouchCtaBandSlice(id);
}

function editorialHero(
  id: string,
  title: string,
  byline: string,
  subheading: string,
  bannerUrl: string,
  bannerAlt: string,
) {
  return {
    slice_type: "csr_article_hero" as const,
    id,
    variation: "default" as const,
    version: "initial" as const,
    primary: {
      eyebrow: "Editorials",
      heading: h1(title),
      byline,
      subheading,
      banner_image_url: bannerUrl,
      banner_image_alt: bannerAlt,
    },
    items: [],
  };
}

function editorialProse(
  id: string,
  intro: string,
  sections: { heading?: string; paragraphs: string[] }[],
) {
  return {
    slice_type: "editorial_article_body" as const,
    id,
    variation: "default" as const,
    version: "initial" as const,
    primary: { intro: intro || "" },
    items: sections.map((s) => ({
      section_heading: s.heading ?? "",
      body: richJoin(...s.paragraphs.map((p) => paragraph(p))),
    })),
  };
}

function editorialTable(
  id: string,
  sectionHeading: string,
  headers: [string, string],
  rows: { a: string; b: string }[],
  caption = "",
) {
  return {
    slice_type: "editorial_article_table" as const,
    id,
    variation: "default" as const,
    version: "initial" as const,
    primary: {
      section_heading: sectionHeading,
      caption,
      column_one_header: headers[0],
      column_two_header: headers[1],
    },
    items: rows.map((r) => ({
      cell_one: r.a,
      cell_two: r.b,
    })),
  };
}

function editorialGallery(
  id: string,
  heading: string,
  images: { src: string; alt: string }[],
) {
  return {
    slice_type: "editorial_article_gallery" as const,
    id,
    variation: "default" as const,
    version: "initial" as const,
    primary: { gallery_heading: heading },
    items: images.map((img) => ({
      image_url: img.src,
      image_alt: img.alt,
    })),
  };
}

const tmp50Rows: { a: string; b: string }[] = [
  { a: "Nominal voltage (Un)", b: "400/230 V AC (3P+N+PE)" },
  { a: "Maximum continuous voltage (Uc)", b: "275 V AC" },
  { a: "Maximum discharge current (Imax)", b: "50 kA (10/320 µs) per mode" },
  {
    a: "Voltage protection level (Up)",
    b: "< 1.6 kV (L-N), < 1.5 kV (N-PE)",
  },
  { a: "Response time", b: "≤ 25 ns" },
  { a: "Disconnection mechanism", b: "Thermal fuse + window indicator" },
  { a: "Remote indication contact", b: "Yes, isolated Form C" },
  { a: "Compliance", b: "IEC 61643-11:2011, CE Mark" },
];

const tlsmsRows: { a: string; b: string }[] = [
  { a: "Surge event counter", b: "Lightning strike count with timestamp" },
  { a: "Surge amplitude logging", b: "Measured energy of each surge (kA)" },
  { a: "SPD status monitoring", b: "Real-time SPD health tracking" },
  { a: "Grounding resistance monitoring", b: "Detects grounding path status" },
  { a: "Voltage anomaly detection", b: "Over/under voltage alerts" },
  { a: "Communication interface", b: "RS-485 (Modbus protocol)" },
  { a: "Integration", b: "Compatible with BMS, SCADA, cloud" },
  { a: "Certifications", b: "KEMA certified, IEC 61643-11 compliant" },
];

const tmp320Rows: { a: string; b: string }[] = [
  { a: "Nominal voltage (Un)", b: "400/230 V AC (3P+N+PE)" },
  { a: "Maximum continuous voltage (Uc)", b: "275 V AC" },
  { a: "Maximum discharge current (Imax)", b: "40 kA (8/20 µs) per mode" },
  { a: "Voltage protection level (Up)", b: "< 1.5 kV (L-N, N-PE)" },
  { a: "Response time", b: "≤ 25 ns" },
  { a: "Disconnection mechanism", b: "Thermal fuse + window indicator" },
  { a: "Remote indication contact", b: "Yes, isolated Form C" },
  { a: "Compliance", b: "IEC 61643-11:2011, CE Mark" },
];

export const editorialArticleDocuments: Record<
  string,
  { metaTitle: string; metaDescription: string; slices: unknown[] }
> = {
  tokaialras: {
    metaTitle:
      "Protecting Safety in High-Rise Constructions & Open Areas — Tokai Editorial",
    metaDescription:
      "ALRAS lightning warning, MS IEC 62305, and regional case studies for construction and public spaces in Malaysia and Southeast Asia.",
    slices: [
      editorialHero(
        "ed-alras-hero",
        "Protecting the Safety of Individuals in High-Rise Constructions, Parks & Open Areas in Malaysia’s Tropical Region",
        "By Dato Ir. Jimmy Lim Lai Ho, B.Sc Electrical, Postgraduate E&E, UK, MIEM, P. Eng",
        "26 June 2025",
        "https://tokai.com.my/wp-content/uploads/2025/04/LWS-1.jpg",
        "Tokai ALRAS lightning warning deployment",
      ),
      editorialProse("ed-alras-body-a", "", [
        {
          heading: "Introduction",
          paragraphs: [
            "Lightning is a naturally occurring but often underestimated hazard that poses serious risks to human life, critical infrastructure, and ongoing construction activities. Malaysia, Singapore, and Indonesia lie within the “Lightning Belt,” where thunderstorm days exceed 180 per year. The Tokai ALRAS Lightning Warning System (LWS) offers a timely and accurate method of mitigating this risk, particularly for construction sites and open areas, in full compliance with international and local safety frameworks. This paper outlines the technical justification, compliance support, and incident references for adopting the Tokai ALRAS LWS, especially within Southeast Asia.",
          ],
        },
        {
          heading: "Global and regional compliance frameworks",
          paragraphs: [
            "OSHA (General Duty Clause): employers must provide a workplace free from recognised hazards, including lightning. The Tokai ALRAS fulfils this obligation by alerting site personnel before lightning strikes occur.",
            "ISO 14001 emphasises environmental protection and risk preparedness; ALRAS contributes to environmental safety. ISO 31000 provides a structured framework for risk identification, evaluation, and mitigation.",
            "MS IEC 62305:2024 is the Malaysia Standard adapted from IEC 62305, covering comprehensive lightning protection including early warning protocols for construction sites and open areas.",
            "Malaysia adopts MS IEC 62305 nationally; the Energy Commission (ST) mandates compliance under Akta 447. Singapore adapts IEC 62305 as SS555; HDB has adopted LWS since 2018. Indonesia sees private-sector encouragement for LWS even where national building codes do not yet mandate it.",
          ],
        },
        {
          heading: "Tokai ALRAS Lightning Warning System overview",
          paragraphs: [
            "The Tokai ALRAS (Automatic Lightning Risk Alert System) issues pre-emptive alerts based on real-time atmospheric electric field monitoring.",
            "Main features: real-time lightning threat detection; automatic siren and strobe alerts; multi-tiered warnings; remote alert and cloud reporting; a compact ALRAS Mini for smaller sites; and roughly 20–30 minutes of warning to enable structured safety responses.",
          ],
        },
        {
          heading: "Case studies in Southeast Asia",
          paragraphs: [
            "Malaysia – May 2019: a construction worker in Shah Alam was killed by lightning on scaffolding where no early warning system was in place.",
            "Singapore – December 2023: a worker was struck and killed at a Tengah construction site; authorities called for dedicated early-warning systems.",
            "Singapore – HDB: after a maintenance worker was struck during rooftop repairs, HDB mandated LWS on high-rise projects; no related fatalities have been reported on HDB-managed sites with LWS since 2018.",
            "Indonesia – 2022: a footballer died from a lightning strike in West Java; BMKG called for improved public alert systems such as lightning detectors.",
          ],
        },
        {
          heading: "Why early warning matters on construction sites",
          paragraphs: [
            "Sites are vulnerable because of tall cranes, scaffolding, and metal structures; workers exposed in open or elevated areas; and evacuation delays due to logistics.",
            "Tokai ALRAS addresses this with extended warning windows, support for safety officers, and compliance-ready reporting. Benefits include real-time detection for proactive evacuation, alignment with MS IEC 62305, scalable standalone or cloud-linked options, clear siren/strobe integration, and proven use by Singapore HDB and others.",
          ],
        },
      ]),
      editorialTable(
        "ed-alras-tbl",
        "Integration with site safety protocols",
        ["Stakeholder", "Scope of responsibility"],
        [
          {
            a: "Construction owner",
            b: "Mandate system and oversee compliance",
          },
          {
            a: "Site safety officer",
            b: "Monitor alerts, evacuate and log incidents",
          },
          {
            a: "Main contractor",
            b: "Implement LWS in safety plans and operations",
          },
          {
            a: "Authorities (CIDB / DOSH / ST)",
            b: "Inspect and regulate use of LWS",
          },
          {
            a: "Vendor (Tokai)",
            b: "Install, train and support system functionality",
          },
        ],
      ),
      editorialProse("ed-alras-body-b", "", [
        {
          heading: "Conclusion",
          paragraphs: [
            "Given the high frequency of lightning in Southeast Asia, a reliable warning system is critical. Tokai ALRAS, compliant with OSHA, ISO, and MS IEC standards, is a proven, life-saving tool. Regional case studies show real dangers on sites without LWS—Tokai ALRAS is essential for protecting lives.",
          ],
        },
      ]),
      editorialCta("ed-alras-cta"),
    ],
  },
  "editorial-spd-tmp-50ka-4": {
    metaTitle: "Design Sheet: LPZ 0B to LPZ 1 – MSB Protection — Tokai",
    metaDescription:
      "TMP 50kA/4 Type 1+2 SPD and TLSMS/03 at the MSB per IEC 62305-4 and IEC 61643-11.",
    slices: [
      editorialHero(
        "ed-spd50-hero",
        "Design Sheet: LPZ 0B to LPZ 1 – MSB Protection Criteria",
        "By Tokai Engineering | Tech Team",
        "15 May 2025",
        "https://tokai.com.my/wp-content/uploads/2025/07/TMP-50kA4.jpg",
        "TMP 50kA/4 surge protective device",
      ),
      editorialProse("ed-spd50-body-a", "Compliance with IEC 62305-4 and IEC 61643-11", [
        {
          heading: "1. Objective",
          paragraphs: [
            "To protect the electrical installation at the Main Switch Board (MSB) from high-energy transient overvoltages and partial lightning currents, as per IEC 62305-4. This applies at the LPZ 0B to LPZ 1 boundary where the electrical supply enters the building.",
          ],
        },
      ]),
      editorialTable(
        "ed-spd50-tmp",
        "2. Surge Protection Device (SPD) – TMP 50kA/4",
        ["Parameter", "Value"],
        tmp50Rows,
      ),
      editorialTable(
        "ed-spd50-tlsms",
        "3. Smart monitoring system – TLSMS/03",
        ["Feature", "Description"],
        tlsmsRows,
      ),
      editorialGallery("ed-spd50-products", "Product images", [
        {
          src: "https://tokai.com.my/wp-content/uploads/2025/07/TMP-50kA4.jpg",
          alt: "TMP 50kA/4 surge protective device",
        },
        {
          src: "https://tokai.com.my/wp-content/uploads/2025/07/TLSMS03.png",
          alt: "TLSMS/03 smart monitoring system",
        },
      ]),
      editorialProse("ed-spd50-body-b", "", [
        {
          heading: "4. Compliance and risk management notes",
          paragraphs: [
            "This design fulfils the LPZ 0B to LPZ 1 boundary requirement of IEC 62305-4 using a high-performance Type 1+2 SPD (TMP 50kA/4) and TLSMS/03 monitoring. The setup supports lightning event forensics, predictive maintenance, and system health visibility—suited to mission-critical infrastructure and high-risk zones.",
          ],
        },
      ]),
      editorialCta("ed-spd50-cta"),
    ],
  },
  "editorial-spd-tmp-320-4": {
    metaTitle: "Design Sheet: LPZ 1 to LPZ 2/3 – SDB & DB Protection — Tokai",
    metaDescription:
      "TMP 320/4 Type 2 SPD and TLSMS/03 for sub-distribution and distribution boards per IEC 62305-4.",
    slices: [
      editorialHero(
        "ed-spd320-hero",
        "Design Sheet: LPZ 1 to LPZ 2/3 – SDB & DB Protection Criteria",
        "By Tokai Engineering | Tech Team",
        "15 May 2025",
        "https://tokai.com.my/wp-content/uploads/2025/07/TMP-320-4.png",
        "TMP 320/4 surge protective device",
      ),
      editorialProse("ed-spd320-body-a", "Compliance with IEC 62305-4 and IEC 61643-11", [
        {
          heading: "1. Objective",
          paragraphs: [
            "To provide effective surge protection for Sub-Distribution Boards (SDB) and Distribution Boards (DB) by mitigating residual surges from upstream SPDs, as per IEC 62305-4. This applies at the LPZ 1 to LPZ 2/3 boundary.",
          ],
        },
      ]),
      editorialTable(
        "ed-spd320-tmp",
        "2. Surge Protection Device (SPD) – TMP 320/4",
        ["Parameter", "Value"],
        tmp320Rows,
      ),
      editorialTable(
        "ed-spd320-tlsms",
        "3. Smart monitoring system – TLSMS/03",
        ["Feature", "Description"],
        tlsmsRows,
      ),
      editorialGallery("ed-spd320-products", "Product images", [
        {
          src: "https://tokai.com.my/wp-content/uploads/2025/07/TMP-320-4.png",
          alt: "TMP 320/4 surge protective device",
        },
        {
          src: "https://tokai.com.my/wp-content/uploads/2025/07/TLSMS03.png",
          alt: "TLSMS/03 smart monitoring system",
        },
      ]),
      editorialProse("ed-spd320-body-b", "", [
        {
          heading: "4. Compliance and risk management notes",
          paragraphs: [
            "This design fulfils the LPZ 1 to LPZ 2/3 boundary requirement using TMP 320/4 Type 2 SPD together with TLSMS/03 for diagnostics and operational awareness. Downstream sensitive equipment (computers, servers, control panels) benefits from reduced surge levels while maintenance scheduling and uptime visibility improve.",
          ],
        },
      ]),
      editorialCta("ed-spd320-cta"),
    ],
  },
};

export const EDITORIAL_ARTICLE_UIDS = Object.keys(editorialArticleDocuments);
