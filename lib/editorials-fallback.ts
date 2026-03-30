import { createGetInTouchCtaBandSlice } from "@/lib/get-in-touch-cta-slice";
import { h1, h2, paragraph } from "@/lib/rich-text";

export const editorialsMeta = {
  title: "Editorials — Tokai",
  description:
    "Technical editorials: lightning safety, ALRAS early warning, and SPD design criteria.",
};

export function buildEditorialsPageSlices(): unknown[] {
  return [
    {
      slice_type: "editorials_hero",
      id: "ed-hero",
      variation: "default",
      version: "initial",
      primary: {
        eyebrow: "Insights",
        heading: h1("Editorials"),
        subheading:
          "Engineering editorials and design guidance on lightning risk, surge protection, and keeping people safe in Malaysia’s tropical climate.",
        background_video_url: "/editorials_hero.mp4",
      },
      items: [],
    },
    {
      slice_type: "editorials_stories",
      id: "ed-stories",
      variation: "default",
      version: "initial",
      primary: {
        section_label: "Technical papers",
        section_heading: h2("Latest editorials"),
        section_intro:
          "In-depth notes from Tokai’s technical team and invited experts—open an article for the full write-up.",
      },
      items: [
        {
          card_title:
            "Protecting the Safety of Individuals in High-Rise Constructions, Parks & Open Areas in Malaysia’s Tropical Region",
          excerpt:
            "By Dato Ir. Jimmy Lim Lai Ho, B.Sc Electrical, Postgraduate E&E, UK, MIEM, P.Eng. Lightning in the “Lightning Belt,” the Tokai ALRAS Lightning Warning System, and compliance with OSHA, ISO, MS IEC 62305, and regional frameworks.",
          read_more_path: "/tokaialras",
          thumbnail_url:
            "https://tokai.com.my/wp-content/uploads/2025/04/LWS-1.jpg",
          thumbnail_alt: "Lightning warning system site installation",
          badge: "ALRAS · 2025",
        },
        {
          card_title:
            "Design Sheet: LPZ 0B to LPZ 1 – MSB Protection Criteria",
          excerpt:
            "By Tokai Engineering | Tech Team. TMP 50kA/4 Type 1+2 SPD and TLSMS/03 monitoring at the service entrance—per IEC 62305-4 and IEC 61643-11.",
          read_more_path: "/editorial-spd-tmp-50ka-4",
          thumbnail_url:
            "https://tokai.com.my/wp-content/uploads/2025/07/TMP-50kA4.jpg",
          thumbnail_alt: "TMP 50kA/4 surge protection device",
          badge: "SPD · MSB",
        },
        {
          card_title:
            "Design Sheet: LPZ 1 to LPZ 2/3 – SDB & DB Protection Criteria",
          excerpt:
            "By Tokai Engineering | Tech Team. TMP 320/4 Type 2 SPD with TLSMS/03 for sub-distribution and distribution boards—residual surge mitigation per IEC 62305-4.",
          read_more_path: "/editorial-spd-tmp-320-4",
          thumbnail_url:
            "https://tokai.com.my/wp-content/uploads/2025/07/TMP-320-4.png",
          thumbnail_alt: "TMP 320/4 surge protection device",
          badge: "SPD · SDB/DB",
        },
      ],
    },
    createGetInTouchCtaBandSlice("ed-cta"),
  ];
}
