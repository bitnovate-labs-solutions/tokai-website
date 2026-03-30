import { createGetInTouchCtaBandSlice } from "@/lib/get-in-touch-cta-slice";
import { h1, h2, paragraph, richJoin } from "@/lib/rich-text";

const CSR_TOP_VIDEO = "/csr_hero.mp4";

export const csrOverviewMeta = {
  title: "CSR — Tokai",
  description:
    "Corporate Social Responsibility (CSR) initiatives and community programmes from Tokai.",
};

function editorialsHero({
  eyebrow,
  heading,
  subheading,
  background_video_url,
}: {
  eyebrow: string;
  heading: string;
  subheading: string;
  background_video_url: string;
}) {
  return {
    slice_type: "editorials_hero",
    id: "csr-hero",
    variation: "default",
    version: "initial",
    primary: {
      eyebrow,
      heading: h1(heading),
      subheading,
      background_video_url,
    },
    items: [],
  } as const;
}

function sectionBlock(id: string, title: string, paragraphs: string[]) {
  return {
    slice_type: "section_block" as const,
    id,
    variation: "default" as const,
    version: "initial" as const,
    primary: {
      heading: h2(title),
      body: richJoin(...paragraphs.map((t) => paragraph(t))),
    },
    items: [],
  } as const;
}

function csrStoriesSlice() {
  return {
    slice_type: "company_events_stories" as const,
    id: "csr-stories",
    variation: "default" as const,
    version: "initial" as const,
    primary: {
      section_label: "CSR",
      section_heading: h2("Community programmes"),
      section_intro:
        "Select an initiative to read more details.",
    },
    items: [
      {
        card_title: "Food For General Workers",
        excerpt:
          "Tokai recently pulled together a Food Aid Initiative to help those hit hardest by the coronavirus lockdown, which are the daily wage earners, and we wanted to do what we can no matter how small an effort during this time of need, Our care basket contained essential dry food items like rice, cooking oil, flour, instant noodles, canned foods and biscuits whom were living around the kongsi houses of Pudu, Bukit Bintang, Jalan Loke Yew and Kepong areas.",
        read_more_path: "/csr_food",
        thumbnail_url:
          "https://tokai.com.my/wp-content/uploads/2020/04/01.jpg",
        thumbnail_alt: "Food aid initiative for general workers",
        badge: "CSR",
      },
      {
        card_title: "Fun Run For Hope",
        excerpt:
          "Tokai, as part of its CSR initiative participated in a Charity Fun Run & Walk at Malaysia Agro Exposition Park Serdang organized by A Piece of Hope (APOH). 30 Tokai staffs and families contributed to the fund-raising.",
        read_more_path: "/csr_funrun",
        thumbnail_url:
          "https://tokai.com.my/wp-content/uploads/2019/12/funrun_01.jpg",
        thumbnail_alt: "A Piece of Hope (APOH) — Fun Run For Hope",
        badge: "CSR",
      },
      {
        card_title: "Tokai x Epic Homes Build",
        excerpt:
          "EPIC Homes aims to build trust and relationships with marginalized communities through the simple act of building homes, addressing the issue of access to safe housing among marginalized communities.",
        read_more_path: "/csr_epichomes",
        thumbnail_url:
          "https://tokai.com.my/wp-content/uploads/2019/05/epic_01.jpg",
        thumbnail_alt: "Tokai x Epic Homes Build",
        badge: "CSR",
      },
      {
        card_title: "Cambodia Gift Of Sight",
        excerpt:
          'The Tokai-Rotary "Cambodia Gift of Sight Project" from 8-12 August 2013 was held at Kammpong Cham in Phnom-Penh, Cambodia comprising of 21 team members.',
        read_more_path: "/csr_gift",
        thumbnail_url:
          "https://tokai.com.my/wp-content/uploads/2019/05/giftsight_01.jpg",
        thumbnail_alt: "Cambodia Gift of Sight",
        badge: "CSR",
      },
      {
        card_title: "Rise Against Hunger",
        excerpt:
          "Stop Hunger Now was established in 1998 and renamed Rise Against Hunger in 2017 and is driven by the vision of a world without hunger and a mission to end hunger by providing food and life saving aid.",
        read_more_path: "/csr_rise",
        thumbnail_url: "https://tokai.com.my/wp-content/uploads/2019/05/RAH.png",
        thumbnail_alt: "Rise Against Hunger",
        badge: "CSR",
      },
      {
        card_title: "A Climb Beyond Disabilities",
        excerpt:
          "This inspiring effort began during a Rotary visit to a welfare home where a group of people with disabilities (PWDs) took out a RM1 note and asked to be brought to climb Mount Kinabalu.",
        read_more_path: "/csr_acbd",
        thumbnail_url:
          "https://tokai.com.my/wp-content/uploads/2019/05/acbd_01.jpg",
        thumbnail_alt: "A Climb Beyond Disabilities",
        badge: "CSR",
      },
    ],
  } as const;
}

export function buildCsrOverviewPageSlices(): unknown[] {
  return [
    editorialsHero({
      eyebrow: "CSR",
      heading: "Corporate Social Responsibility",
      subheading:
        "Because Tokai believes in the act of giving back for a better community!",
      background_video_url: CSR_TOP_VIDEO,
    }),
    sectionBlock(
      "csr-overview",
      "Corporate Social Responsibility",
      [
        "Corporate Social Responsibility (CSR) efforts form an integral part of Tokai’s culture. Tokai strives to live up to the trust and expectations of society by actively engaging in initiatives that makes the world a better place, thus fulfilling its responsibility to its various stakeholders.",
        "Through the founder’s direct involvement in Rotary International, many meaningful events have been organized, participated by many Tokai management and staff, aimed at contributing towards a better Malaysia, a brighter future. These include Cambodia Gift of Sight, STOP Hunger Now, A Climb Beyond Disabilities and EPIC Homes “Build A Home” for the Orang Asli.",
        "These life-changing initiatives provide the marginalised communities a lifeline and breakthrough for the betterment of their lives. Tokai continues to be actively involved in CSR initiatives to create a better tomorrow, beginning today.",
      ],
    ),
    csrStoriesSlice(),
    createGetInTouchCtaBandSlice("csr-cta"),
  ];
}

