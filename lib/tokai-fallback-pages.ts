import type { SliceZoneLike } from "@prismicio/react";

import {
  buildCompanyEventsPageSlices,
  companyEventsMeta,
} from "@/lib/company-events-fallback";
import { csrArticleDocuments } from "@/lib/csr-articles-fallback";
import { editorialArticleDocuments } from "@/lib/editorial-articles-fallback";
import {
  buildEditorialsPageSlices,
  editorialsMeta,
} from "@/lib/editorials-fallback";
import {
  buildCsrOverviewPageSlices,
  csrOverviewMeta,
} from "@/lib/csr-overview-fallback";
import type { RichTextField } from "@prismicio/client";
import type { PagePayload } from "@/lib/page-types";
import { createGetInTouchCtaBandSlice } from "@/lib/get-in-touch-cta-slice";
import {
  bulletList,
  h1,
  h2,
  paragraph,
  paragraphWithWebLink,
  richJoin,
} from "@/lib/rich-text";

/** Fallback CTA band — same copy and layout as `createGetInTouchCtaBandSlice` (Our Solutions, editorials, etc.). */
function ctaBand(id: string) {
  return createGetInTouchCtaBandSlice(id);
}

function intro(
  id: string,
  eyebrow: string,
  heading: string,
  ...bodyParagraphs: string[]
) {
  return {
    slice_type: "page_intro" as const,
    id,
    variation: "default" as const,
    version: "initial" as const,
    primary: {
      eyebrow,
      heading: h1(heading),
      body: richJoin(...bodyParagraphs.map((t) => paragraph(t))),
      cta_label: "",
      cta_href: "",
    },
    items: [],
  };
}

function section(id: string, title: string, ...bodyParagraphs: string[]) {
  return {
    slice_type: "section_block" as const,
    id,
    variation: "default" as const,
    version: "initial" as const,
    primary: {
      heading: h2(title),
      body: richJoin(...bodyParagraphs.map((t) => paragraph(t))),
    },
    items: [],
  };
}

function sectionRich(id: string, title: string, body: RichTextField) {
  return {
    slice_type: "section_block" as const,
    id,
    variation: "default" as const,
    version: "initial" as const,
    primary: {
      heading: h2(title),
      body,
    },
    items: [],
  };
}

const pages: Record<string, Omit<PagePayload, "slices"> & { slices: unknown[] }> =
  {
    "our-solutions": {
      metaTitle: "Our Solutions — Tokai",
      metaDescription:
        "Total solutions provider: E&LP, ESP, TBAT, integrated security, consultancy, training, and professional services — from site evaluation to engineering design.",
      slices: [
        {
          slice_type: "editorials_hero",
          id: "os-hero",
          variation: "default",
          version: "initial",
          primary: {
            eyebrow: "Our solutions",
            heading: h1("Integrated Solutions"),
            subheading:
              "Tokai offers a complete range of customized solutions that advances safety and protect critical assets of the nation.",
            background_video_url: "/solutions_hero.mp4",
          },
          items: [],
        },
        {
          slice_type: "solution_parallax",
          id: "os-parallax",
          variation: "default",
          version: "initial",
          primary: {},
          items: [
            {
              heading: h2("Earthing & Lightning Protection (E&LP)"),
              body: paragraph(
                "Tokai’s E&LP provides structural protection and complete solution for structures, residential and commercial buildings as well as the transportation hubs of the nation.",
              ),
              image_url: "/our-solutions/integrate_elp.jpg",
              image_alt: "Earthing and lightning protection",
              cta_label: "Learn more about E&LP",
              cta_href: "/elp-solutions",
            },
            {
              heading: h2("Electronic Surge Protection (ESP)"),
              body: paragraph(
                "A range of highly customized and quality protectors to protect electronic systems. Tokai’s ESP are the front-line defense against transient over-voltages that can otherwise create massive loss, damage and downtime.",
              ),
              image_url: "/our-solutions/integrate_esp.jpg",
              image_alt: "Electronic surge protection",
              cta_label: "Learn more about ESP",
              cta_href: "/esp-solutions",
            },
            {
              heading: h2("Tokai Bipolar Air Terminal (TBAT)"),
              body: paragraph(
                "When a thunderstorm approaches, TBAT causes the advance discharge (corona) to neutralise the electric charge in the atmosphere, thus reducing the thunderstorm’s electric field and preventing the protected asset from being struck by lightning.",
              ),
              image_url: "/our-solutions/integrate_tbat.jpg",
              image_alt: "Tokai Bipolar Air Terminal",
              cta_label: "Learn more about TBAT",
              cta_href: "/elp-solutions",
            },
            {
              heading: h2("Integrated Security Solutions"),
              body: paragraph(
                "These front-line solutions includes Anti-Terrorist High Security Bollards, Perimeter Intrusion Detection System (PIDS), Visitor Management System, High Security Card Access and many more.",
              ),
              image_url: "/our-solutions/integrate_tissam.jpg",
              image_alt: "Integrated security solutions",
              cta_label: "Learn more about integrated security",
              cta_href: "/tokai-bollards-security-system",
            },
          ],
        },
        sectionRich(
          "os-consult",
          "Consultancy and professional services",
          richJoin(
            paragraph(
              "In addition, Tokai offers quality consultancy that includes:",
            ),
            bulletList([
              "Site Evaluation – Tokai offers complete site evaluation complete with major site findings, causes of damages and customized solutions in accordance to the highest International Standards",
              "Consultancy Engineering & Design – this includes total surge protection design, comprehensive lightning and earthing designs, technical drawings as well as risk assessment.",
              "Training – Tokai provides highly practical yet intensive training on earthing designs, lightning protection techniques as well as protection of electronic systems.",
              "Security audit and planning – the increase of terrorist activities on a global scale has increased the need for comprehensive security planning. Tokai is capable of providing detailed security audit and risk assessment to various facilities.",
            ]),
            paragraph("Other professional services include:"),
            bulletList([
              "Consultancy for structural lightning protection",
              "Consultancy for electronic system protection",
              "Site survey and soil resistivity analysis",
            ]),
          ),
        ),
        createGetInTouchCtaBandSlice("os-cta"),
      ],
    },
    "solar-solutions": {
      metaTitle: "Solar Solutions — Tokai",
      metaDescription:
        "Harnessing clean, sustainable solar energy for a greener world.",
      slices: [
        intro(
          "sol-intro",
          "Solar",
          "Solar solutions provider",
          "Harnessing clean and sustainable energy from solar for a greener world.",
          "Tokai champions renewable energy through solar applications, in line with environmental protection and sustainability.",
        ),
        section(
          "sol-deliver",
          "Design and integration",
          "Tokai supports solar programmes with engineering judgement that respects lightning exposure, earthing integrity, and long-term operability—so generation assets stay dependable after severe weather.",
        ),
        ctaBand("sol-cta"),
      ],
    },
    "esp-solutions": {
      metaTitle: "Electronic Surge Protection — Tokai",
      metaDescription:
        "ESP registered with JKR and SIRIM, compliant with local and international standards.",
      slices: [
        intro(
          "esp-intro",
          "ESP",
          "Electronic surge protection",
          "Tokai’s Electronic Surge Protection (ESP) solutions are registered with Jabatan Kerja Raya and SIRIM, complying with local and international standards.",
          "Modern electronic systems—from PCs and servers to telecommunications, CCTV, and plant controls—are sensitive to lightning-related events. A strike can paralyse networks, cause data loss, physical and financial damage, and extended downtime.",
        ),
        section(
          "esp-risk",
          "Systems at risk",
          "Typical vulnerable systems include personal computers and laptops, infrastructure networks, building management systems, PABX and telephony exchanges, CCTV and security equipment, base stations, UPS, PLCs, plant sensors, and telemetry and data acquisition equipment.",
        ),
        section(
          "esp-confidence",
          "Confident operation",
          "With Tokai’s solutions, assets and electronic systems can perform reliably when exposed to nature’s extremes.",
        ),
        section(
          "esp-landmarks",
          "Protecting landmarks of the nation",
          "Tokai’s SPD systems and solutions have been deployed in recognisable national infrastructure—including KL Tower, KLCC, KLIA, Alor Setar Telecommunication Tower, the Prime Minister’s Office and Residence, among others.",
          "Project references reflect Tokai’s commitment to meet and exceed customer requirements, with customised solutions because no two needs are alike.",
        ),
        section(
          "esp-iso",
          "Compliance",
          "Tokai’s SPD range is registered with JKR and SIRIM. Products fully comply with MS IEC 62305 and BS EN 62305-2006 and are tested in accordance with BS 50164-1 and BS 50164-2 (lightning current testing to 100 kA where applicable).",
        ),
        section(
          "esp-catalogue",
          "Documentation",
          "Request the Electronic Surge Protection catalogue (PDF) from Tokai for product selection guidance.",
        ),
        ctaBand("esp-cta"),
      ],
    },
    "tokai-wxline-lws": {
      metaTitle: "Tokai-WXLine — Tokai",
      metaDescription:
        "Early warning for impending lightning strikes—activate defensive measures to mitigate threats.",
      slices: [
        intro(
          "wx-intro",
          "Early warning",
          "Tokai-WXLine",
          "Be alerted to impending lightning strikes and activate defensive measures to mitigate threats.",
          "WXLine supports operational decision-making when convection and strike risk escalate around critical facilities.",
        ),
        ctaBand("wx-cta"),
      ],
    },
    "risk-assessment": {
      metaTitle: "Lightning Audit — Tokai",
      metaDescription:
        "Lightning audit and risk assessment aligned to MS IEC 62305-2.",
      slices: [
        intro(
          "ra-intro",
          "Compliance",
          "Lightning audit compliance to MS IEC 62305-2",
          "Lightning is a major threat to life, animals, and property. Where there is threat, risk must be mitigated—or damage and losses follow. The growth of high-rise construction has multiplied exposure. In 2007 Malaysia adopted IEC 62305 as Malaysian Standard (MS IEC 62305), replacing BS 6651:1999 for protection of structures against lightning.",
        ),
        section(
          "ra-parts",
          "MS IEC 62305 structure",
          "MS IEC 62305 has four parts: Part 1 general principles; Part 2 risk assessment; Part 3 protection of structures and life hazards; Part 4 protection of electrical and electronic systems within structures.",
        ),
        section(
          "ra-sources",
          "Sources of damage",
          "Lightning threat is commonly described in terms of sources S1–S4: strike to the structure; strike near the structure; strike to a service; strike near a service.",
        ),
        section(
          "ra-damages",
          "Damages and losses",
          "Three damage types are considered: injury or death; physical damage to the structure; failure of electrical and electronic equipment. These must be controlled within tolerable levels to minimise loss of human life, loss of essential public services where applicable, loss of cultural heritage where applicable, and economic loss.",
        ),
        section(
          "ra-software",
          "Risk assessment software",
          "Tokai’s risk assessment software helps determine whether calculated risk exceeds tolerable limits for factors such as loss of domain and economic loss. Protection techniques—including lightning protection levels LPL I–IV, coordinated SPD protection, fire protection, soil equipotentialisation, warning notices, physical restriction, and electrical insulation—can be combined to reach an economical, adequate design without over- or under-design.",
        ),
        ctaBand("ra-cta"),
      ],
    },
    "elp-solutions": {
      metaTitle: "Earthing & Lightning Protection — Tokai",
      metaDescription:
        "E&LP: structural and complete lightning protection for buildings and infrastructure. MRT deployment, ISO-aligned LPS, and downloadable catalogue.",
      slices: [
        {
          slice_type: "editorials_hero",
          id: "elp-hero",
          variation: "default",
          version: "initial",
          primary: {
            eyebrow: "E&LP",
            heading: h1("Earthing & Lightning Protection"),
            subheading:
              "Tokai’s Earthing & Lightning Protection (E&LP) provides protection against the devastating effects of lightning strikes.",
            background_video_url: "/solutions_hero.mp4",
          },
          items: [],
        },
        {
          slice_type: "section_block",
          id: "elp-risk-cards",
          variation: "pair_cards",
          version: "initial",
          primary: {},
          items: [
            {
              heading: h2("Lightning risk"),
              body: paragraph(
                "Lightning is one of nature’s most spectacular and destructive phenomenons. Lightning discharges have been measured from several thousand amps to over 200,000 amps—enough to light half a million 100 watt bulbs. A lightning strike to an unprotected building packing 100 million volts of electricity has the force to rip through roofs, explode concrete walls, resulting in fire, physical damage, total property loss and even death. The secondary effects include catastrophic damage to electronic systems, data and information.",
              ),
            },
            {
              heading: h2("Lightning in Malaysia"),
              body: richJoin(
                paragraph(
                  "The devastating threat of lightning strikes can be further magnified with the knowledge that Malaysia has one of the world’s highest numbers of lightning days recorded in a year and we are ranked at number 3 in the world. Statistics have shown that Malaysia has an average of 204 lightning days, which is equivalent to an amazing 40 strikes per square kilometre per year.",
                ),
                paragraph(
                  "Let Tokai protect you. Our internationally accredited and ISO certified solutions will provide the key protection in the most critical moments of a lightning strike. Stay safe with Tokai!",
                ),
              ),
            },
          ],
        },
        {
          slice_type: "image_text_section",
          id: "elp-catalogue",
          variation: "default",
          version: "initial",
          primary: {
            eyebrow: "",
            heading: h2("Download catalogue"),
            body: richJoin(
              paragraph("Download our E&LP catalogue here."),
              paragraphWithWebLink(
                "",
                "E&LP catalogue (PDF)",
                "",
                "https://www.tokai.com.my/pdf/ELP_Catalogue(31102019).pdf",
              ),
            ),
            image: {
              url: "/elp-solutions/elp_product.jpg",
              alt: "E&LP systems and catalogue",
            },
          },
          items: [],
        },
        {
          slice_type: "image_text_section",
          id: "elp-mrt",
          variation: "full_width_video",
          version: "initial",
          primary: {
            eyebrow: "Infrastructure",
            heading: h2("Protecting Malaysia’s MRT stations"),
            body: richJoin(
              paragraph(
                "Tokai’s Earthing and Lightning Protection System (E&LP) has been deployed as the front line defence against the devastating effects of lightning strikes on MRT Line 1 (Sg. Buloh–Kajang) as well as MRT Line 2 (Sungai Buloh–Serdang–Putrajaya).",
              ),
              paragraph(
                "The scope of work includes earthing and lightning protection, Stray Current Corrosion Management System (SCCMS) and Platform Touch Voltage Protection Membrane System (PTVPMS).",
              ),
              paragraph(
                "Tokai’s LPS are tested and proven to deliver protection when it matters the most, in the event of a devastating lightning strike. Minimal downtime, maximum protection!",
              ),
            ),
            video_url: "/mrt_section.mp4",
          },
          items: [],
        },
        section(
          "elp-compliance",
          "Full compliance to ISO standards",
          "Our LPS range are registered with Jabatan Kerja Raya and SIRIM. They fully comply to MS IEC 62305, BS EN 62305-2006 and are tested in accordance to BS 50164-1 and BS 50164-2.",
          "Tested to 100 kA lightning current where applicable.",
        ),
        ctaBand("elp-cta"),
      ],
    },
    "elp-services": {
      metaTitle: "E&LP Services — Tokai",
      metaDescription:
        "Earthing & lightning protection services: site survey, CDEGS-based design, ISO-compliant installation, and IEM CPD-accredited training.",
      slices: [
        {
          slice_type: "editorials_hero",
          id: "elps-hero",
          variation: "default",
          version: "initial",
          primary: {
            eyebrow: "E&LP",
            heading: h1("Earthing & Lightning Protection Services"),
            subheading:
              "Onsite survey, design, installation & training.",
            background_video_url: "/solutions_hero.mp4",
          },
          items: [],
        },
        {
          slice_type: "section_block",
          id: "elps-assess-card",
          variation: "pair_cards",
          version: "initial",
          primary: {},
          items: [
            {
              heading: h2("Professional assessment with quality design solutions"),
              body: paragraph(
                "An effective earthing and lightning protection system is critical to the safety of every infrastructure installation. Compliance with local and international lightning protection standards is now an expected requisite for all building owners. As such, a thorough and professional assessment and design study is essential to ensure safety compliance.",
              ),
            },
          ],
        },
        {
          slice_type: "section_block",
          id: "elps-scope-cards",
          variation: "pair_cards",
          version: "initial",
          primary: {},
          items: [
            {
              heading: h2("Site survey"),
              body: paragraph(
                "Providing site survey including soil resistivity and earth resistance test to generate a comprehensive, solutions-driven report and develop a detailed structural lightning protection plan.",
              ),
              card_image: {
                url: "/elp-services/elp-card-site-survey.jpg",
                alt: "Field survey and soil resistivity testing for earthing design",
                dimensions: { width: 1400, height: 933 },
              },
            },
            {
              heading: h2("Design solutions"),
              body: paragraph(
                "Providing data-driven computer-aided designs based on site survey findings. Our recommendations are solutions-driven and tailored to your requirements using CDEGS software.",
              ),
              card_image: {
                url: "/elp-services/elp-card-design.jpg",
                alt: "Computer-aided earthing and lightning protection design",
                dimensions: { width: 1400, height: 933 },
              },
            },
            {
              heading: h2("Installation"),
              body: paragraph(
                "With a professional, highly experienced team to provide installation of proven earthing and lightning systems, you can rest assured of getting the best, ISO-compliant system and solution.",
              ),
              card_image: {
                url: "/elp-services/elp-card-installation.jpg",
                alt: "Professional installation of earthing and lightning protection systems",
                dimensions: { width: 1400, height: 933 },
              },
            },
            {
              heading: h2("Seminar / training"),
              body: paragraph(
                "Our IEM CPD-accredited training aims to enhance professionalism among engineers by improving and broadening the knowledge and skillset of engineers for effective performance.",
              ),
              card_image: {
                url: "/elp-services/elp-card-training.jpg",
                alt: "Engineering seminar and IEM CPD training session",
                dimensions: { width: 1400, height: 933 },
              },
            },
          ],
        },
        {
          slice_type: "image_text_section",
          id: "elps-cathodic",
          variation: "default",
          version: "initial",
          primary: {
            eyebrow: "Analysis",
            heading: h2("Data-driven, computer-aided solutions"),
            body: paragraph(
              "Various aspects of cathodic protection and anode bed analysis, with a global perspective.",
            ),
            image: {
              url: "/elp-services/cathodic.jpg",
              alt: "Computer-aided cathodic and earthing analysis",
            },
          },
          items: [],
        },
        {
          slice_type: "image_text_section",
          id: "elps-shield",
          variation: "default",
          version: "initial",
          primary: {
            eyebrow: "Protection",
            heading: h2("Lightning shielding system"),
            body: paragraph(
              "Engineered shielding concepts to reduce strike risk and protect structures, equipment, and occupants — part of Tokai’s integrated E&LP approach.",
            ),
            image: {
              url: "/elp-services/shield.png",
              alt: "Lightning shielding system",
            },
          },
          items: [],
        },
        ctaBand("elps-cta"),
      ],
    },
    "exothermic-welding": {
      metaTitle: "Exothermic Welding — Tokai",
      metaDescription:
        "TokaiWeld exothermic welding: permanent copper connections for earthing conductors — thermite reaction, graphite mould, no external power. Catalogue and cross-section reference.",
      slices: [
        {
          slice_type: "editorials_hero",
          id: "exo-hero",
          variation: "default",
          version: "initial",
          primary: {
            eyebrow: "E&LP",
            heading: h1("Exothermic Welding"),
            subheading:
              "The TokaiWeld connection process employs an exothermic reaction of thermite composition to heat the metal to permanently join the conductors.",
            background_video_url: "/exothermic_hero.mp4",
          },
          items: [],
        },
        {
          slice_type: "section_block",
          id: "exo-lead-card",
          variation: "pair_cards",
          version: "initial",
          primary: {},
          items: [
            {
              heading: h2("TokaiWeld permanent connections"),
              body: richJoin(
                paragraph(
                  "The TokaiWeld permanent connection process has been engineered to be an easy and efficient welding system. No outside power, bulky gas tanks or other equipment associated with welding are required with the TokaiWeld system.",
                ),
                paragraph(
                  "The weldmetal powder, consisting of powdered aluminium and copper oxide, is poured into a graphite mould followed by ignition powder and ignited by means of an ordinary flint gun. The resultant exothermic welding reaction produces high temperature molten copper and aluminium oxide slag.",
                ),
                paragraph(
                  "The molten copper melts the steel retaining disc and flows down the tap hole and over the conductors in the weld chamber, melting and welding them into a solid homogeneous joint. The whole process takes no more than a few seconds.",
                ),
              ),
            },
          ],
        },
        {
          slice_type: "image_text_section",
          id: "exo-catalogue",
          variation: "default",
          version: "initial",
          primary: {
            eyebrow: "",
            heading: h2("Download catalogue"),
            body: richJoin(
              paragraph("Download our TokaiWeld exothermic welding catalogue here."),
              paragraphWithWebLink(
                "",
                "TokaiWeld catalogue (PDF)",
                "",
                "https://www.tokai.com.my/pdf/Exothermic_Catalogue(04122017).pdf",
              ),
            ),
            image: {
              url: "/exothermic-welding/exo_top_new.jpg",
              alt: "TokaiWeld exothermic welding catalogue",
            },
          },
          items: [],
        },
        {
          slice_type: "image_text_section",
          id: "exo-diagram",
          variation: "default",
          version: "initial",
          primary: {
            eyebrow: "",
            heading: h2("Typical cross section diagram"),
            body: richJoin(
              paragraph(
                "Assembly of the graphite mould, weld chamber, and conductors (numbered for reference).",
              ),
              paragraph("1) Mould cover"),
              paragraph("2) Starting powder"),
              paragraph("3) Mould cup"),
              paragraph("4) Weldmetal powder"),
              paragraph("5) Steel retaining disc"),
              paragraph("6) Weld chamber"),
              paragraph("7) Tap hole"),
              paragraph("8) Locating pin"),
              paragraph("9) Cable (conductor)"),
              paragraph("10) Conductor area"),
              paragraph("11) Earth rod"),
            ),
            image: {
              url: "/exothermic-welding/exo_diagram.png",
              alt: "Typical cross section diagram — TokaiWeld graphite mould",
            },
          },
          items: [],
        },
        {
          slice_type: "image_text_section",
          id: "exo-benefits-img",
          variation: "default",
          version: "initial",
          primary: {
            eyebrow: "Quality",
            heading: h2("Benefits of exothermic welding"),
            image_caption:
              "Machined cross section of exothermic welded connections shows excellent fusion of conductors — a solid homogeneous joint suitable for earthing and lightning protection networks.",
            body: richJoin(
              paragraph(
                "An exothermic welded connection may be tested by any of the non-destructive techniques applicable to other welding processes. These include X-ray, ultrasonic, and dye penetrant inspection.",
              ),
              paragraph(
                "None of these techniques can be used in a compression or crimped connection in the same way, since the joint can show discontinuities that reflect the mechanical joint rather than fusion.",
              ),
              paragraph(
                "Exothermic welded connections can also be inspected visually — you can see immediately that welding has taken place. Mechanical compression joints do not offer the same assurance.",
              ),
              paragraph(
                "Mechanical connections can lead to a damaging cycle: increased time in service causes corrosion; corrosion increases resistance; increased resistance causes heat, which accelerates corrosion — and the result can be premature failure. Exothermic connections avoid these problems.",
              ),
            ),
            image: {
              url: "/exothermic-welding/exo_cross.jpg",
              alt: "Machined cross section of TokaiWeld exothermic connection",
            },
          },
          items: [],
        },
        ctaBand("exo-cta"),
      ],
    },
    "sccms": {
      metaTitle: "SCCMS — Tokai",
      metaDescription:
        "Stray Current Corrosion Monitoring System (SCCMS) for MRT and LRT — BS EN 50122-2 aligned monitoring and mitigation.",
      slices: [
        {
          slice_type: "editorials_hero",
          id: "sccms-hero",
          variation: "default",
          version: "initial",
          primary: {
            eyebrow: "E&LP",
            heading: h1("Stray Current Corrosion Monitoring System"),
            subheading:
              "Tokai’s SCCMS is a tested and certified system for monitoring and mitigating stray current damage for MRT and LRT stations.",
            background_video_url: "/solutions_hero.mp4",
          },
          items: [],
        },
        {
          slice_type: "section_block",
          id: "sccms-lead-card",
          variation: "pair_cards",
          version: "initial",
          primary: {},
          items: [
            {
              heading: h2("Stray current and SCCMS"),
              body: richJoin(
                paragraph(
                  "Stray current, as defined in BS EN 50122-2, is the part of a current which follows paths other than the intended paths. The consequence of stray current is that where it leaves a buried metal object, electrolytic corrosion will occur — frequently in highly localised areas — potentially leading to loss of material and damage.",
                ),
                paragraph(
                  "This is clearly undesirable for metallic pipes carrying gas and water, as leakage and rupture present safety and operational risks to both the transit system and the general public. In cables, particularly older lead-sheathed types, material loss occurs even more rapidly and can lead to breakdown of inner insulation.",
                ),
                paragraph(
                  "Tokai’s SCCMS is a tested and certified system for monitoring and mitigating stray current damage for MRT and LRT stations, in full compliance with BS EN 50122-2 and ISO 9001:2015 certification.",
                ),
              ),
            },
          ],
        },
        {
          slice_type: "image_text_section",
          id: "sccms-catalogue",
          variation: "default",
          version: "initial",
          primary: {
            eyebrow: "",
            heading: h2("Download catalogue"),
            body: richJoin(
              paragraph(
                "Download our Stray Current Corrosion Monitoring System catalogue here.",
              ),
              paragraphWithWebLink(
                "",
                "SCCMS catalogue (PDF)",
                "",
                "https://www.tokai.com.my/pdf/Tokai_SCMMS.pdf",
              ),
            ),
            image: {
              url: "/sccms/stray_top.jpg",
              alt: "SCCMS systems and catalogue",
            },
          },
          items: [],
        },
        {
          slice_type: "image_text_section",
          id: "sccms-overview-img",
          variation: "default",
          version: "initial",
          primary: {
            eyebrow: "Overview",
            heading: h2("Monitoring and mitigation"),
            body: paragraph(
              "Specialist engineering for stray current reference electrodes, monitoring, and control — aligned to international practice for underground and transit infrastructure.",
            ),
            image: {
              url: "/sccms/stray_top.jpg",
              alt: "Stray current corrosion monitoring system overview",
            },
          },
          items: [],
        },
        {
          slice_type: "image_text_section",
          id: "sccms-mrt",
          variation: "default",
          version: "initial",
          primary: {
            eyebrow: "Deployment",
            heading: h2("Protecting Malaysia’s MRT stations"),
            body: richJoin(
              paragraph(
                "Tokai’s Stray Current Monitoring Management System (SCCMS) has been deployed as a front-line defence against the effects of lightning and stray current on MRT Line 1 (Sg. Buloh–Kajang) and MRT Line 2 (Sungai Buloh–Serdang–Putrajaya).",
              ),
              paragraph(
                "The scope of work includes Earthing and Lightning Protection (E&LP), Stray Current Corrosion Management System (SCCMS), and Platform Touch Voltage Protection Membrane System (PTVPMS).",
              ),
              paragraph(
                "Tokai’s LPS is tested and proven to deliver protection when it matters most — minimal downtime, maximum protection.",
              ),
            ),
            image: {
              url: "/sccms/stray_purpose.jpg",
              alt: "SCCMS deployment for Malaysian MRT infrastructure",
            },
          },
          items: [],
        },
        {
          slice_type: "image_text_section",
          id: "sccms-scope",
          variation: "default",
          version: "initial",
          primary: {
            eyebrow: "Scope",
            heading: h2("Our scope of services"),
            body: richJoin(
              paragraph("Tokai provides:"),
              bulletList([
                "Specialist engineering and consultancy for the design, supply, installation, testing and commissioning of the stray current reference electrode in accordance with BS EN 50122-2.",
                "An effective stray current monitoring and control system in accordance with the requirements of underground track structures under civil and structures scope of works.",
              ]),
            ),
            image: {
              url: "/sccms/stray_services.jpg",
              alt: "SCCMS scope of services",
            },
          },
          items: [],
        },
        ctaBand("sccms-cta"),
      ],
    },
    gallery: {
      metaTitle: "MRT Gallery — Tokai",
      metaDescription:
        "Project gallery from Tokai’s MRT installations.",
      slices: [
        intro(
          "mrt-gallery-intro",
          "Projects",
          "MRT Gallery",
          "MRT Bukit Bintang",
          "MRT Kota Damansara",
          "MRT Museum Negara",
          "MRT Mutiara Damansara",
          "MRT Pasar Seni",
        ),
        {
          slice_type: "project_gallery" as const,
          id: "mrt-gallery-grid",
          variation: "default" as const,
          version: "initial" as const,
          primary: {},
          items: [
            { section_title: "MRT Bukit Bintang", image_url: "https://tokai.com.my/wp-content/uploads/2019/09/mrt_bb1.jpg", image_alt: "MRT Bukit Bintang" },
            { section_title: "MRT Bukit Bintang", image_url: "https://tokai.com.my/wp-content/uploads/2019/09/mrt_bb2.jpg", image_alt: "MRT Bukit Bintang" },
            { section_title: "MRT Bukit Bintang", image_url: "https://tokai.com.my/wp-content/uploads/2019/09/mrt_bb3.jpg", image_alt: "MRT Bukit Bintang" },
            { section_title: "MRT Bukit Bintang", image_url: "https://tokai.com.my/wp-content/uploads/2019/09/mrt_bb4.jpg", image_alt: "MRT Bukit Bintang" },
            { section_title: "MRT Kota Damansara", image_url: "https://tokai.com.my/wp-content/uploads/2019/09/mrt_kd1.jpg", image_alt: "MRT Kota Damansara" },
            { section_title: "MRT Kota Damansara", image_url: "https://tokai.com.my/wp-content/uploads/2019/09/mrt_kd2.jpg", image_alt: "MRT Kota Damansara" },
            { section_title: "MRT Kota Damansara", image_url: "https://tokai.com.my/wp-content/uploads/2019/09/mrt_kd3.jpg", image_alt: "MRT Kota Damansara" },
            { section_title: "MRT Museum Negara", image_url: "https://tokai.com.my/wp-content/uploads/2019/09/mrt_muzeum1.jpg", image_alt: "MRT Museum Negara" },
            { section_title: "MRT Museum Negara", image_url: "https://tokai.com.my/wp-content/uploads/2019/09/mrt_muzeum2.jpg", image_alt: "MRT Museum Negara" },
            { section_title: "MRT Mutiara Damansara", image_url: "https://tokai.com.my/wp-content/uploads/2019/09/mrt_md1.jpg", image_alt: "MRT Mutiara Damansara" },
            { section_title: "MRT Mutiara Damansara", image_url: "https://tokai.com.my/wp-content/uploads/2019/09/mrt_md2.jpg", image_alt: "MRT Mutiara Damansara" },
            { section_title: "MRT Mutiara Damansara", image_url: "https://tokai.com.my/wp-content/uploads/2019/09/mrt_md3.jpg", image_alt: "MRT Mutiara Damansara" },
            { section_title: "MRT Mutiara Damansara", image_url: "https://tokai.com.my/wp-content/uploads/2019/09/mrt_md4.jpg", image_alt: "MRT Mutiara Damansara" },
            { section_title: "MRT Pasar Seni", image_url: "https://tokai.com.my/wp-content/uploads/2019/09/mrt_ps1.jpg", image_alt: "MRT Pasar Seni" },
            { section_title: "MRT Pasar Seni", image_url: "https://tokai.com.my/wp-content/uploads/2019/09/mrt_ps2.jpg", image_alt: "MRT Pasar Seni" },
            { section_title: "MRT Pasar Seni", image_url: "https://tokai.com.my/wp-content/uploads/2019/09/mrt_ps3.jpg", image_alt: "MRT Pasar Seni" },
            { section_title: "MRT Pasar Seni", image_url: "https://tokai.com.my/wp-content/uploads/2019/09/mrt_ps4.jpg", image_alt: "MRT Pasar Seni" },
            { section_title: "MRT Pasar Seni", image_url: "https://tokai.com.my/wp-content/uploads/2019/09/mrt_ps5.jpg", image_alt: "MRT Pasar Seni" }
          ]
        },
        ctaBand("mrt-gallery-cta"),
      ],
    },
    "security-gallery": {
      metaTitle: "Security Gallery — Tokai",
      metaDescription:
        "Project gallery from Tokai’s security engineering installations.",
      slices: [
        intro(
          "sec-gallery-intro",
          "Projects",
          "Security Gallery",
          "Australia High Commission",
          "Istana Negara",
          "Tun Razak Exchange (TRX)",
          "Eco Majestic",
        ),
        {
          slice_type: "project_gallery" as const,
          id: "sec-gallery-grid",
          variation: "default" as const,
          version: "initial" as const,
          primary: {},
          items: [
            { section_title: "Australia High Commission", image_url: "https://tokai.com.my/wp-content/uploads/2019/09/ahc_1.jpg", image_alt: "Australia High Commission" },
            { section_title: "Australia High Commission", image_url: "https://tokai.com.my/wp-content/uploads/2019/09/ahc_2.jpg", image_alt: "Australia High Commission" },
            { section_title: "Australia High Commission", image_url: "https://tokai.com.my/wp-content/uploads/2019/09/ahc_3.jpg", image_alt: "Australia High Commission" },
            { section_title: "Australia High Commission", image_url: "https://tokai.com.my/wp-content/uploads/2019/09/ahc_4.jpg", image_alt: "Australia High Commission" },
            { section_title: "Australia High Commission", image_url: "https://tokai.com.my/wp-content/uploads/2019/09/ahc_5.jpg", image_alt: "Australia High Commission" },
            { section_title: "Istana Negara", image_url: "https://tokai.com.my/wp-content/uploads/2019/09/istana_1.jpg", image_alt: "Istana Negara" },
            { section_title: "Istana Negara", image_url: "https://tokai.com.my/wp-content/uploads/2019/09/istana_2.jpg", image_alt: "Istana Negara" },
            { section_title: "Tun Razak Exchange (TRX)", image_url: "https://tokai.com.my/wp-content/uploads/2019/09/trx_1.jpg", image_alt: "Tun Razak Exchange (TRX)" },
            { section_title: "Tun Razak Exchange (TRX)", image_url: "https://tokai.com.my/wp-content/uploads/2019/09/trx_2.jpg", image_alt: "Tun Razak Exchange (TRX)" },
            { section_title: "Eco Majestic", image_url: "https://tokai.com.my/wp-content/uploads/2019/09/eco_1.jpg", image_alt: "Eco Majestic" },
            { section_title: "Eco Majestic", image_url: "https://tokai.com.my/wp-content/uploads/2019/09/eco_2.jpg", image_alt: "Eco Majestic" },
            { section_title: "Eco Majestic", image_url: "https://tokai.com.my/wp-content/uploads/2019/09/eco_3.jpg", image_alt: "Eco Majestic" }
          ]
        },
        ctaBand("sec-gallery-cta"),
      ],
    },
    "tokai-bollards-security-system": {
      metaTitle: "Security Bollards — Tokai",
      metaDescription:
        "High-security bollards and integrated solutions against terrorism threats.",
      slices: [
        intro(
          "bol-intro",
          "Security",
          "Security bollards",
          "Tokai provides solutions to protect assets and infrastructure from terrorism threats.",
          "Integrated security offerings also include perimeter systems, access control, and planning support for sensitive facilities.",
        ),
        ctaBand("bol-cta"),
      ],
    },
    "address-contact": {
      metaTitle: "Contact — Tokai",
      metaDescription:
        "Contact Tokai Engineering: phone, WhatsApp, email, and mailing address.",
      slices: [
        intro(
          "ac-intro",
          "Contact",
          "Contact Tokai",
          "Register interest or queries via the online form on your Prismic-driven contact slice, or email sales@tokai.com.my.",
        ),
        section(
          "ac-phone",
          "Phone",
          "Tel: +603-7455 7333",
        ),
        section(
          "ac-wa",
          "WhatsApp",
          "Chat with us for enquiries: +6012-6079 308",
        ),
        section(
          "ac-mail",
          "Mailing address",
          "TOKAI GROUP OF COMPANIES, Lot 14 Jalan Astaka U8/82, Bukit Jelutong, 40150 Shah Alam, Selangor, Malaysia.",
        ),
      ],
    },
    "about-us": {
      metaTitle: "Overview — Tokai",
      metaDescription:
        "Overview: Tokai’s group profile, founder’s message, mission, vision, values, and business model.",
      slices: [
        {
          slice_type: "editorials_hero",
          id: "ab-hero",
          variation: "default",
          version: "initial",
          primary: {
            eyebrow: "About us",
            heading: h1("Tokai"),
            subheading:
              "What we do, who we are, and where we work—built on safety, quality and long-term commitment.",
            background_video_url: "/about_hero.mp4",
          },
          items: [],
        },
        {
          slice_type: "image_text_section",
          id: "ab-what",
          variation: "default",
          version: "initial",
          primary: {
            eyebrow: "What WE do",
            heading: h2("What WE do"),
            body: richJoin(
              paragraph(
                "We are TOKAI, a full-fledge and full-service integrated solutions provider for earthing and lightning protection, security engineering and solar solutions. We design, develop, consult, install and maintain the full spectrum of all our solutions. Our work ethics are embedded in INNOVATION, SUPERB ARCHITECTURE, QUALITY ASSURANCE, EXPERT REFERENCE TESTIMONY and 27 YEARS OF EXPERIENCE.",
              ),
              paragraph(
                "We know your needs and we continuously innovate in order to fulfill it beyond our clients’ expectations.",
              ),
            ),
            image: {
              url: "/about-us/what.jpg",
              alt: "What WE do",
            },
          },
          items: [],
        },
        {
          slice_type: "image_text_section",
          id: "ab-who",
          variation: "default",
          version: "initial",
          primary: {
            eyebrow: "Who WE are",
            heading: h2("Who WE are"),
            body: richJoin(
              paragraph(
                "With nearly 30 years of hard-won experience, our staff offers a unique blend of expertise in the form of engineers, system specialists, designers and installers. We’ve been told this combination of talents uniquely supports our clients’ needs, but we believe our hands on experience and knowledge of building systems are the foundation for the specialized services we offer.",
              ),
              paragraph("What do we call ourselves? TOKAI ALL-STARS!"),
            ),
            image: {
              url: "/about-us/who.jpg",
              alt: "Who WE are",
            },
          },
          items: [],
        },
        {
          slice_type: "image_text_section",
          id: "ab-where",
          variation: "default",
          version: "initial",
          primary: {
            eyebrow: "Where WE work",
            heading: h2("Where WE work"),
            body: richJoin(
              paragraph(
                "Our headquarters is located at Bukit Jelutong Industrial Park, Shah Alam.",
              ),
              paragraph(
                "We provide our services to every state in Malaysia.",
              ),
              paragraph(
                "We work with our partners in Singapore to serve our Southern neighbours as well.",
              ),
              paragraph(
                "We are well-connected to deliver only the best to our clients.",
              ),
            ),
            image: {
              url: "/about-us/where.jpg",
              alt: "Where WE work",
            },
          },
          items: [],
        },
        {
          slice_type: "image_text_section",
          id: "ab-founder",
          variation: "default",
          version: "initial",
          primary: {
            eyebrow: "",
            heading: h2("Group CEO / Founder’s Message"),
            body: richJoin(
              paragraph(
                "Thank you for visiting our website. Over the years, Tokai has evolved from a humble 2 man trading company operating from a rented office lot above a coffeeshop in Bandar Sunway to what it is today. We are proud to be known as a safety and security solutions provider which is ahead of our time. I have come to realize that it is imperative that as a company we remain unified and integrated – I have found that the formula to be successful is by maintaining cohesion and unity at all levels by sharing a common purpose and core values.",
              ),
              paragraph(
                "What does this mean to our important constituencies: our team members, our customers, our communities and our shareholders? For our team members, we take pride in what we do and have the opportunity to grow in our jobs. We care about our team members’ health and well-being by providing a safe work environment and encouraging a healthy lifestyle. Above all we aim to be fair and honest with team members and provide them with meaningful, challenging work.",
              ),
              paragraph(
                "For our customers, we deliver product value and outstanding customer service. Customers can count on us to deliver on our promises. For our communities, we are a good corporate citizen, whether supporting local causes or reaching out to places in need. We do the right things in terms of health, safety and support the communities with our time, money and leadership. Tokai strives to be known as a socially responsible corporation.",
              ),
              paragraph(
                "For our shareholders, we are a company that lives up to its commitments and outperforms the competition and the market. Our shareholders expect us to make sound, sustainable financial decisions and to never forget to treat their money as if it were our own. Tokai shareholders can trust our statements and the integrity of our financial reports.",
              ),
              paragraph(
                "That’s Tokai — a company with a proud past and a bright future. As we forge and blaze our way into the Asian market as the go to company that hold strong to our objective to be “The PREFERRED Solutions Provider for Lightning, Solar & Security.”",
              ),
            ),
            image: {
              url: "/about-us/dato.png",
              alt: "Dato Ir. Jimmy Lim Lai Ho",
            },
          },
          items: [],
        },
        section(
          "ab-mvv",
          "Our Mission, Vision and Values",
          "Our Vision: Tokai envisions living life to the fullest, achieved through proven safety measures that are strategically and intentionally placed for total peace of mind.",
          "Our Mission: Tokai’s mission is to be the premiere specialist in the field of lightning, surge protection and security solutions on the international front.",
          "Our Values: The values we share are rooted in what actually goes on at Tokai day to day. Team members must exhibit ethical and honest behavior, and Tokai must offer fair, equal treatment in a safe, healthy workplace. In such an environment, decision making and strategy flow naturally from the give-and-take of daily business contacts among all team members.",
          "We achieve performance with integrity. We treat each other with dignity and respect while ensuring a safe workplace. Our team members are valued as individuals and challenged to grow and perform at their peak. Our customers and suppliers are considered business partners and treated that way. We are competitive and aim to win. We support diversity, team member involvement, and a climate of inclusiveness. Our profitability ensures the viability and growth of the organization.",
        ),
        {
          slice_type: "image_text_section",
          id: "ab-model",
          variation: "default",
          version: "initial",
          primary: {
            eyebrow: "",
            heading: h2("Our Business Model"),
            body: richJoin(
              paragraph(
                "The Tokai business model is our platform for success. That is why we spend so much time working on it and striving to get it right. If the model is wrong, little that follows will have any long-term value. Our business model is defensible, sustainable and gives us an opportunity for strong financial returns.",
              ),
              paragraph(
                "We serve market segments with strong growth prospects, both near term and long term. Our disciplined approach to serving fundamentally strong markets ensures a crisp focus for the organization. We serve a set of diversified markets. Maintaining a portfolio of businesses that share a common purpose but serve different markets provides balance and opportunity. We consistently manage a pipeline of growth initiatives within our market segments. Product development and introductions, market expansions, and acquisitions provide a steady stream of growth opportunities for the corporation. We aggressively compete on quality, service, innovation and peak performance.",
              ),
              paragraph(
                "At Tokai, service is not simply a tagline, it emanates from how we serve each other and our communities, and it’s how we develop and maintain customer loyalty. Peak performance is our commitment to prepare as individuals and as a corporation to do our best. Together, outstanding performance on these four competitive dimensions truly sets Tokai apart.",
              ),
              paragraph(
                "We’re on a path of continuous improvement. Tokai first adopted the ISO 9001 in 2000. Since then, Tokai has embarked on an ongoing pursuit of continuous improvement in our day to day operations. We constantly look for ways to increase the bottom line. We apply value engineering to our products, to streamline processes and to improve efficiencies. This element is why we’re able to sustain profitability while aggressively investing in growth.",
              ),
              paragraph(
                "Cash flow and ROI are front and center. The Tokai model has a proven track record of putting capital to work to generate attractive returns. We expect to generate more cash than we consume and typically have operated this way. We make corporate responsibility a top priority. Corporate integrity and reputation attract great team members, customers and opportunities. It is a key to long-term success.",
              ),
            ),
            image: {
              url: "/about-us/28_years.png",
              alt: "28 years of experience",
            },
          },
          items: [],
        },
        ctaBand("ab-cta"),
      ],
    },
    "company-events": {
      metaTitle: companyEventsMeta.title,
      metaDescription: companyEventsMeta.description,
      slices: buildCompanyEventsPageSlices(),
    },
    editorials: {
      metaTitle: editorialsMeta.title,
      metaDescription: editorialsMeta.description,
      slices: buildEditorialsPageSlices(),
    },
    "csr-2": {
      metaTitle: csrOverviewMeta.title,
      metaDescription: csrOverviewMeta.description,
      slices: buildCsrOverviewPageSlices(),
    },
    ...csrArticleDocuments,
    ...editorialArticleDocuments,
  };

export const TOKAI_PAGE_UIDS = Object.keys(pages);

export function getTokaiFallbackPage(uid: string): PagePayload | null {
  const doc = pages[uid];
  if (!doc) {
    return null;
  }
  return {
    metaTitle: doc.metaTitle,
    metaDescription: doc.metaDescription,
    slices: doc.slices as unknown as SliceZoneLike,
  };
}
