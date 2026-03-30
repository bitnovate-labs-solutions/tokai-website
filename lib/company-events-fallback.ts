import { createGetInTouchCtaBandSlice } from "@/lib/get-in-touch-cta-slice";
import { h1, h2, paragraph } from "@/lib/rich-text";

const NEWS_TOP =
  "https://tokai.com.my/wp-content/uploads/2019/05/news_top.jpg";

export const companyEventsMeta = {
  title: "Company Events — Tokai",
  description:
    "Tokai in the news: corporate press releases and media coverage.",
};

/**
 * Default Company Events slice stack (used when Prismic is off, or when the
 * `company-events` page has no slices). Editors can replace this entirely by
 * publishing a `page` document with UID `company-events` in Prismic.
 */
export function buildCompanyEventsPageSlices(): unknown[] {
  return [
    {
      slice_type: "company_events_hero",
      id: "ce-hero",
      variation: "default",
      version: "initial",
      primary: {
        eyebrow: "Company",
        heading: h1("Tokai In The News"),
        subheading: "Corporate press releases, community impact, and how we show up for Malaysia.",
        banner_image_url: NEWS_TOP,
        banner_image_alt: "",
      },
      items: [],
    },
    {
      slice_type: "company_events_stories",
      id: "ce-stories",
      variation: "default",
      version: "initial",
      primary: {
        section_label: "Press & community",
        section_heading: h2("Stories that matter"),
        section_intro:
          "Highlights from our CSR programmes and corporate announcements—tap a card for the full write-up.",
      },
      items: [
        {
          card_title: "Merdeka 2022 charity drive for SCAS&FT",
          excerpt:
            "Merdeka 2022 Charity Drive for the Spastic Association of Selangor & Federal Territory. In celebration of Merdeka this year, which commemorates 65 years of independence for our nation, Da Men Mall USJ together with some major sponsors joined forces in this year's charity drive aimed to be in aid of the Spastic Children's Association of Selangor & Federal Territory (SCAS&FT).",
          read_more_path: "/csr-charity-drive-for-scas-ft-2022",
          thumbnail_url:
            "https://tokai.com.my/wp-content/uploads/2023/08/WhatsApp-Image-2023-08-24-at-12.36.09-PM-4-e1693470761147.jpeg",
          thumbnail_alt: "Merdeka 2022 charity drive",
          badge: "CSR · 2022",
        },
        {
          card_title: "RM38,000 for Subang Jaya Community Ambulance",
          excerpt:
            "Tokai and USJ 5 contribute RM38,000 to the Subang Jaya Community Ambulance Service. With funds running low, the Subang Jaya ambulance service initiative received a boost thanks to Tokai and the caring residents of USJ5.",
          read_more_path: "/csr_ambulance",
          thumbnail_url:
            "https://tokai.com.my/wp-content/uploads/2021/02/ambulance_thumbnail.jpg",
          thumbnail_alt: "Subang Jaya Community Ambulance",
          badge: "Community",
        },
        {
          card_title: "Milk powder aid for families at Pangsapuri Angsana",
          excerpt:
            "Tokai and USJ 5 contributes milk powder aid to needy families. LOW-INCOME families with infants and toddlers who live in Pangsapuri Angsana received milk powder contribution.",
          read_more_path: "/csr_milkpowder",
          thumbnail_url:
            "https://tokai.com.my/wp-content/uploads/2020/05/milkaid.jpg",
          thumbnail_alt: "Milk powder aid",
          badge: "CSR",
        },
        {
          card_title: "Food aid for refugees with Kechara Food Bank",
          excerpt:
            "28 April 2020 – Food Aid for refugees with Kechara Food Bank. Everyone has a role to play in the fight against coronavirus. Doing our part to alleviate the plight of the refugees.",
          read_more_path: "/csr_kechara",
          thumbnail_url:
            "https://tokai.com.my/wp-content/uploads/2020/04/kechara_28042020.jpg",
          thumbnail_alt: "Kechara food bank",
          badge: "2020",
        },
        {
          card_title: "10,000 gloves for UMMC Triage frontliners",
          excerpt:
            "28 April 2020 – 10,000 gloves for the frontliners of UMMC – Triage. This ensures the hospital when dealing with Covid-19 cases have continuous supplies of personal protection equipment (PPE)",
          read_more_path: "/csr_gloves",
          thumbnail_url:
            "https://tokai.com.my/wp-content/uploads/2020/04/ummc_28042020.jpg",
          thumbnail_alt: "UMMC gloves donation",
          badge: "Frontliners",
        },
        {
          card_title: "Food aid for general workers in KL",
          excerpt:
            "8 April 2020 – Tokai Food Aid Donation To Our General Workers. Tokai recently pulled together a Food Aid Initiative to help those hit hardest by the coronavirus lockdown, which are the daily wage earners.",
          read_more_path: "/csr_food",
          thumbnail_url:
            "https://tokai.com.my/wp-content/uploads/2020/04/food_842020.jpg",
          thumbnail_alt: "Food aid donation",
          badge: "CSR",
        },
      ],
    },
    {
      slice_type: "company_events_media",
      id: "ce-media",
      variation: "default",
      version: "initial",
      primary: {
        section_label: "Media",
        section_heading: h2("From the media"),
        section_intro:
          "Lightning and security related news releases from the mainstream media.",
      },
      items: [
        {
          blurb:
            "NST, 10 March 2019 – Malaysia arrests 9 suspected foreign militants. Malaysia has deported and blacklisted seven suspected Islamic militants who police say were involved in plans to launch large-scale attacks in several countries.",
          external_url:
            "https://www.straitstimes.com/asia/se-asia/nine-suspected-militants-arrested-by-malaysia-amid-fears-of-large-scale-attacks",
          thumbnail_url:
            "https://tokai.com.my/wp-content/uploads/2019/05/nst_10032019_new.jpg",
          thumbnail_alt: "NST",
        },
        {
          blurb:
            "The Star, 10 Nov 2018 – Malaysians Unprepared For Lightning Strikes. PETALING JAYA: Malaysia has among the highest incidence of lightning activity in the world, but the country is woefully unprepared for these deadly strikes.",
          external_url:
            "https://www.thestar.com.my/news/nation/2018/11/10/msians-unprepared-for-lightning-strikes-expert-many-lack-awareness-and-safety-measures/",
          thumbnail_url:
            "https://tokai.com.my/wp-content/uploads/2019/05/star_10Nov.jpg",
          thumbnail_alt: "The Star",
        },
        {
          blurb:
            "NST, 26 September 2018 – How To Avoid Being Struck By Lightning. The recent death of a motorcyclist due to lightning shows that this unfortunate incident can happen anywhere and any time during a thunderstorm.",
          external_url:
            "https://www.nst.com.my/opinion/letters/2018/09/415250/how-avoid-being-struck-lightning",
          thumbnail_url:
            "https://tokai.com.my/wp-content/uploads/2019/05/nst_26Sept.jpg",
          thumbnail_alt: "NST",
        },
      ],
    },
    createGetInTouchCtaBandSlice("ce-cta"),
  ];
}
