import type { RichTextField } from "@prismicio/client";

import { createGetInTouchCtaBandSlice } from "@/lib/get-in-touch-cta-slice";
import {
  bulletList,
  h1,
  paragraph,
  paragraphWithWebLink,
  richJoin,
} from "@/lib/rich-text";

const CSR_TOP =
  "https://tokai.com.my/wp-content/uploads/2019/05/csr_top.jpg";

function csrCta(id: string) {
  return createGetInTouchCtaBandSlice(id);
}

function csrHero(
  id: string,
  eyebrow: string,
  title: string,
  subheading: string,
  bannerUrl: string = CSR_TOP,
) {
  return {
    slice_type: "csr_article_hero",
    id,
    variation: "default",
    version: "initial",
    primary: {
      eyebrow,
      heading: h1(title),
      subheading,
      banner_image_url: bannerUrl,
      banner_image_alt: "",
    },
    items: [],
  };
}

function csrBody(
  id: string,
  intro: string,
  sections: {
    heading?: string;
    paragraphs: string[];
    /**
     * Bullet list inserted after `paragraphs` and before `paragraphsAfter`
     * (matches original Tokai HTML `<ul>` between paragraphs).
     */
    bullets?: string[];
    paragraphsAfter?: string[];
    /** Extra rich-text blocks after the string paragraphs (e.g. external source link). */
    richTail?: RichTextField;
  }[],
  /** Optional logo beside the first content card (e.g. ACBD campaign mark). */
  contentLogo?: { url: string; alt: string },
) {
  return {
    slice_type: "csr_article_body",
    id,
    variation: "default",
    version: "initial",
    primary: {
      intro: intro || "",
      ...(contentLogo
        ? {
            content_logo_url: contentLogo.url,
            content_logo_alt: contentLogo.alt,
          }
        : {}),
    },
    items: sections.map((s) => ({
      section_heading: s.heading ?? "",
      body: richJoin(
        ...s.paragraphs.map((p) => paragraph(p)),
        ...(s.bullets?.length ? [bulletList(s.bullets)] : []),
        ...(s.paragraphsAfter?.map((p) => paragraph(p)) ?? []),
        ...(s.richTail ? [s.richTail] : []),
      ),
    })),
  };
}

function csrGallery(
  id: string,
  heading: string,
  images: { src: string; alt: string }[],
) {
  return {
    slice_type: "csr_article_gallery",
    id,
    variation: "default",
    version: "initial",
    primary: { gallery_heading: heading },
    items: images.map((img) => ({
      image_url: img.src,
      image_alt: img.alt,
    })),
  };
}

const WP_UPLOADS = "https://tokai.com.my/wp-content/uploads";

/** Sequential wp images: `{basePath}/{prefix}_01.{ext}` … `{prefix}_{count}.{ext}` */
function wpImageSeries(
  basePath: string,
  prefix: string,
  count: number,
  alt: string,
  ext: string = "jpg",
): { src: string; alt: string }[] {
  return Array.from({ length: count }, (_, i) => {
    const n = String(i + 1).padStart(2, "0");
    return {
      src: `${WP_UPLOADS}/${basePath}/${prefix}_${n}.${ext}`,
      alt,
    };
  });
}

/** Page documents for CSR article UIDs (merged into Tokai fallback `pages`). */
export const csrArticleDocuments: Record<
  string,
  { metaTitle: string; metaDescription: string; slices: unknown[] }
> = {
  "csr-charity-drive-for-scas-ft-2022": {
    metaTitle: "CSR – Charity Drive for SCAS & FT 2022 — Tokai",
    metaDescription:
      "Merdeka 2022 charity drive in aid of the Spastic Children's Association of Selangor & Federal Territory.",
    slices: [
      csrHero(
        "csr-ch-hero",
        "Company Events",
        "CSR – Charity Drive for SCAS & FT 2022",
        "Merdeka 2022 Charity Drive for the Spastic Association of Selangor & Federal Territory.",
      ),
      csrBody("csr-ch-body", "", [
        {
          paragraphs: [
            "In celebration of Merdeka this year, which commemorates 65 years of independence for our nation, Da Men Mall USJ together with some major sponsors joined forces in this year's charity drive aimed to be in aid of the Spastic Children's Association of Selangor & Federal Territory (SCAS&FT). The event took place on the 28th of August 2022, from 10am onwards at Da Men Mall USJ.",
          ],
        },
        {
          heading: "Charity drive for Spastic Association",
          paragraphs: [
            "Founded in 1960, The Spastic Children's Association of Selangor & Federal Territory (SCAS&FT); was established to improve the quality of life of children living with cerebral palsy. Cerebral palsy is a life-long neuro-developmental disorder and a majority of children with this disorder would suffer from physical and mental disabilities. SCAS&FT is the largest and oldest independent spastic centre in Malaysia, and has become a vital link to bring hope to spastic children.",
            "Most notably, there is no exit age and the services is provided lifelong and at no charge.",
          ],
        },
        {
          heading: "Tokai Engineering (M) Sdn Bhd",
          paragraphs: [
            "Tokai Engineering, a Lightning Protection company based in Shah Alam which is also one of the main sponsors, will be giving away 2,000 Mochi Donuts free all our C-19 front liners and uniformed personnel.",
            "Tokai will be setting up their Tokai Mochi Donut cooking booth at the outdoor section of Da Men's main foyer. Dato' Ir Jimmy Lim, Tokai's Group CEO says, \"passion and charity is one of the same, both need a lot of heart and it's a bonus when donuts are part of the equation\". Dato' Ir Jimmy added; \"Tokai is honoured to get this opportunity to contribute to our community as well as SCAS&FT. The Tokai Mochi Donuts was born out of love of charitable causes and an equal love for donuts. Our mochi donuts is aimed to bring joy to & as a charitable cause in aid of frontliners, and our objective is to make and giveaway 10,000 donuts within this year\".",
            "The Tokai Mochi Donuts are also for sale, priced at RM4.00 per donut however since this is a charity event, it will promote the \"Pay as You Like\" concept but of course you will pay nothing less than the price indicated, and more will be very much appreciated. So, bring along your generosity and visit Tokai's booth and enjoy these delectable treats.",
            "The event's main sponsor is Da Men Mall will also be setting up a photo booth at the same location just next to Tokai's Mochi Nut station, so that visitors may get their photos taken while enjoying the event.",
          ],
        },
        {
          heading: "Sponsor's objectives",
          paragraphs: [
            "Sales of Tokai's Mochi Donuts reached an encouraging RM3,000 and was donated to SCAS&FT.",
            "All children are our future and hope and they deserve our love and care. Cerebral palsy is a disorder that many people talk about but few understand. Though many are familiar with the term, there are a lot more about the disorder that people fail to recognize, especially the struggles of providing these special kids with the best treatment they deserve.",
            "So let us be charitable as truly the spirit of giving is the best way to celebrate our Independence.",
            "End.",
          ],
        },
      ]),
      csrGallery("csr-ch-gal", "Picture Gallery", [
        {
          src: "https://tokai.com.my/wp-content/uploads/2023/08/WhatsApp-Image-2023-08-24-at-12.36.09-PM-1.jpeg",
          alt: "CSR charity drive gallery",
        },
        {
          src: "https://tokai.com.my/wp-content/uploads/2023/08/WhatsApp-Image-2023-08-24-at-12.36.09-PM-3.jpeg",
          alt: "CSR charity drive gallery",
        },
        {
          src: "https://tokai.com.my/wp-content/uploads/2023/08/WhatsApp-Image-2023-08-24-at-12.36.09-PM-4.jpeg",
          alt: "CSR charity drive gallery",
        },
        {
          src: "https://tokai.com.my/wp-content/uploads/2023/08/WhatsApp-Image-2023-08-24-at-12.36.09-PM.jpeg",
          alt: "CSR charity drive gallery",
        },
      ]),
      csrCta("csr-ch-cta"),
    ],
  },
  csr_ambulance: {
    metaTitle: "Subang Jaya Community Ambulance — Tokai",
    metaDescription:
      "Tokai and Residents Association of USJ 5 contribute RM38,000 to the Subang Jaya Community Ambulance Services.",
    slices: [
      csrHero(
        "csr-am-hero",
        "Company Events",
        "Subang Jaya Community Ambulance",
        "Tokai and Residents Association of USJ 5 contribute RM38,000 to the Subang Jaya Community Ambulance Services in aid of the SJ Community",
      ),
      csrBody("csr-am-body", "", [
        {
          paragraphs: [
            "2 February 2021, Subang Jaya",
            "The Subang Jaya Community Ambulance has been working back-to-back with emergency cases in the community over the last 3 years. However, funds are running critically low. The ambulance initiative has only got a 6-months lifeline of funding; and if no major support comes in soon, the ambulance initiative would not be able to sustain any further. The planned fundraising efforts for 2020 were put on hold ironically because of Covid-19.",
            "In response to aid request by the Subang Jaya Community Ambulance, in what was a joint collaboration, the Residents Association of USJ 5 together with Tokai Engineering (M) Sdn Bhd stands ready to help communities, managed to raise RM38,000 in contribution to the Ambulance service in support of their life-saving work. The mock cheque presentation was held at the open space of the USJ 5 Guard Post A while observing proper Social Distancing protocols.",
            "Dato' Ir Jimmy Lim, President of Residents' Association of USJ 5 as well as Group CEO of Tokai Engineering was on hand to present the RM38,000 mock cheque to Mr Kelvin Chew of the Subang Jaya Community Ambulance. YB Michelle Ng, ADUN Subang Jaya, MBSJ Deputy Mayor, Tn. Mohd Zulkurnain Che Ali and MBSJ Councillor and MPP Zone 4 Chairman, Ar. Kamarul Hisham and members of the MPP Zone 4 were in attendance.",
            "Dato' Ir Jimmy Lim, said: \"This is a time of unprecedented challenge when companies and communities should work together, we hope that these specialized ambulances will continue their good work and help reduce any delays in emergency response and ensure more people in Subang Jaya are able to receive immediate care, particularly the senior citizens and the physically challenged\".",
            "\"A lack of ambulances and other emergency services can also mean members of the community may experience life-threatening delays in receiving appropriate urgent care, and so we hope that this donation may significantly reduce such delays\"",
            "This donation was made possible with financial support from the private residents living in USJ 5, who supported this initiative not only in donations but also in spirit.",
          ],
        },
      ]),
      csrGallery("csr-am-gal", "Picture Gallery", [
        {
          src: "https://tokai.com.my/wp-content/uploads/2021/02/ambulance_01.jpg",
          alt: "Subang Jaya Community Ambulance gallery",
        },
        {
          src: "https://tokai.com.my/wp-content/uploads/2021/02/ambulance_02.jpg",
          alt: "Subang Jaya Community Ambulance gallery",
        },
        {
          src: "https://tokai.com.my/wp-content/uploads/2021/02/ambulance_03.jpg",
          alt: "Subang Jaya Community Ambulance gallery",
        },
      ]),
      csrCta("csr-am-cta"),
    ],
  },
  csr_milkpowder: {
    metaTitle: "Milk Powder Aid — Tokai",
    metaDescription:
      "Tokai and Residents Association of USJ 5 contributes milk powder aid to needy families from Pangsapuri Angsana.",
    slices: [
      csrHero(
        "csr-milk-hero",
        "Company Events",
        "Milk Powder Aid",
        "Tokai and Residents Association of USJ 5 contributes Milk Powder Aid for toddlers and babies of needy families from Pangsapuri Angsana",
      ),
      csrBody("csr-milk-body", "", [
        {
          paragraphs: [
            "The recent Coronavirus pandemic and the subsequent MCO has taken a huge toll on many families in Malaysia, more so low-income families with infants and toddlers. Recently Tokai, together with the Residents Association of USJ 5 pulled together an effort to give a helping hand to young families who live in Pangsapuri Angsana, located at USJ 1. These young families received milk powder contribution, a warmly welcomed efforts especially those with young children as milk formulas are expensive.",
            "\"The cost of milk powder has risen over the years, and more so with the recent pandemic, which has directly impacted low-income families with young children, especially those who require special milk formula due to medical conditions\", added Dato' Ir Jimmy Lim, Tokai's founder and also the President of the Residents Association of USJ 5.",
            "YB Michelle Ng, ADUN Subang Jaya and MBSJ Councillor Ar. Kamarul attended as special guests, for this event which was held on 11 May 2020. The effort was also in conjunction with World Milk Day on June 1. Everyone needs a little helping hand, and that helping hand and little help goes a long way.",
            "Tokai and Residents Association of USJ 5, supports the #KitaJagaKita initiative",
          ],
        },
      ]),
      csrGallery("csr-milk-gal", "Picture Gallery", [
        { src: "https://tokai.com.my/wp-content/uploads/2020/05/milkaid_01.jpg", alt: "Milk powder aid gallery" },
        { src: "https://tokai.com.my/wp-content/uploads/2020/05/milkaid_02.jpg", alt: "Milk powder aid gallery" },
        { src: "https://tokai.com.my/wp-content/uploads/2020/05/milkaid_03.jpg", alt: "Milk powder aid gallery" },
        { src: "https://tokai.com.my/wp-content/uploads/2020/05/milkaid_04.jpg", alt: "Milk powder aid gallery" },
        { src: "https://tokai.com.my/wp-content/uploads/2020/05/milkaid_05.jpg", alt: "Milk powder aid gallery" },
        { src: "https://tokai.com.my/wp-content/uploads/2020/05/milkaid_06.jpg", alt: "Milk powder aid gallery" },
        { src: "https://tokai.com.my/wp-content/uploads/2020/05/milkaid_07.jpg", alt: "Milk powder aid gallery" },
        { src: "https://tokai.com.my/wp-content/uploads/2020/05/milkaid_08.jpg", alt: "Milk powder aid gallery" },
      ]),
      csrCta("csr-milk-cta"),
    ],
  },
  csr_kechara: {
    metaTitle: "Food Aid for refugees with Kechara Food Bank — Tokai",
    metaDescription:
      "Food aid for refugees' family together with Kechara Food Bank.",
    slices: [
      csrHero(
        "csr-k-hero",
        "Company Events",
        "Food Aid for refugees with Kechara Food Bank.",
        "FOOD AID FOR REFUGEES' FAMILY TOGETHER WITH KECHARA FOOD BANK BY MELISSA LIM & FRIENDS AND DATO' IR JIMMY & DATIN VYNETTE LIM.",
      ),
      csrBody("csr-k-body", "", [
        {
          paragraphs: [
            "Everyone has a role to play in the fight against coronavirus. Understandably, the government has to give priority to Malaysians, but nonetheless, on humanitarian grounds, there should also be assistance to the refugees as they rely on unsteady jobs and are suffering due to the Covid-19 pandemic. Refugee families are depending on the generosity of the government, NGOs and the community while living in this country.",
            "With the current MCO as a result of the Covid-19 outbreak, they are suffering even more to get basic foodstuff and are almost cut off from getting sources of income to continue their livelihood.",
            "TOKAI ~ Together We Stand United as One, In our Fight to Eradicate COVID-19",
          ],
        },
      ]),
      csrGallery("csr-k-gal", "Picture Gallery", [
        { src: "https://tokai.com.my/wp-content/uploads/2020/04/kechara_01.jpg", alt: "Kechara food bank gallery" },
        { src: "https://tokai.com.my/wp-content/uploads/2020/04/kechara_02.jpg", alt: "Kechara food bank gallery" },
      ]),
      csrCta("csr-k-cta"),
    ],
  },
  csr_gloves: {
    metaTitle: "10,000 gloves for UMMC Triage — Tokai",
    metaDescription:
      "Surgical gloves for medical frontliners of UMMC – Triage.",
    slices: [
      csrHero(
        "csr-gl-hero",
        "Company Events",
        "10,000 GLOVES FOR FRONTLINERS OF UMMC – TRIAGE",
        "",
      ),
      csrBody("csr-gl-body", "", [
        {
          paragraphs: [
            "A total of 10,000 much-needed surgical gloves have reached medical frontliners of UMMC – TRIAGE. This ensures the hospital when dealing with Covid-19 cases have continuous supplies of personal protection equipment (PPE) PPEs like surgical gloves are used in large amounts every day and it was important to ensure that there were ready stocks available at all times.",
            "The \"Frontliners Aid\" was a joint initiative by Datin Vynette Lim together with Dato' Ir. Jimmy Lim and the Residents Association of USJ 5 to help provide essential medical supplies for the nation's battle against Covid-19. In this battle there's no you and me, it's just us Malaysians coming together in a time of need and doing whatever we can to help and hope that we can also inspire other Malaysians to do the same, every bit helps, said Datin Vynette Lim.",
            "TOKAI ~ Together We Stand United as One, In our Fight to Eradicate COVID-19",
          ],
        },
      ]),
      csrGallery("csr-gl-gal", "Picture Gallery", [
        {
          src: "https://tokai.com.my/wp-content/uploads/2020/04/ummc_gloves.jpg",
          alt: "UMMC gloves donation",
        },
      ]),
      csrCta("csr-gl-cta"),
    ],
  },
  csr_funrun: {
    metaTitle: "Fun Run For Hope — Tokai",
    metaDescription:
      "Charity Fun Run & Walk at MAEPS Serdang with A Piece of Hope (APOH): Tokai team, RM120,000 for NGOs, picture gallery.",
    slices: [
      csrHero(
        "csr-fr-hero",
        "CSR",
        "Fun Run For Hope",
        "Charity Fun Run & Walk at Malaysia Agro Exposition Park Serdang",
        "https://tokai.com.my/wp-content/uploads/2019/12/funrun_01.jpg",
      ),
      csrBody("csr-fr-body", "", [
        {
          paragraphs: [
            "Tokai, as part of its CSR initiative participated in a Charity Fun Run & Walk at Malaysia Agro Exposition Park Serdang organized by A Piece of Hope (APOH). A total of 30 Tokai staffs and their families contributed to the fund-raising effort and made it a day to remember. Dato' Ir. Jimmy Lim, CEO of Tokai Group of Companies led the Tokai team in the flag off. Some participants took on the 8km run while others joined the 3km walk at the event which was sponsored by Pavilion Real Estate Investment Trust Company.",
            "A total of RM120,000 collected from the event was given to three non-governmental organisations, namely Desa Amal Jireh, Persatuan Kanak-Kanak Istimewa Kajang Selangor (PKIK) and Rumah Victory. APOH charity head Ting Ted Sun said the total sum would be handed to the three homes without any deduction for operational costs.",
            "\"This is our third time organising the Charity Fun Run and Walk. We focus mainly on collecting funds to help children's homes.",
            "\"We started with a climb to Mount Kinabalu in 2007 and later organised other charity events such as treasure hunts, \" he said.",
            "APOH event head Doreen Lim said they identify new charitable organisations to help every year. Among the participants was Deputy International Trade and Industry Minister Dr Ong Kian Ming. \"This is my third time participating in this event and I also support it because it is near my constituency. I believe that participating in charity events such as this is very meaningful, which is why I try to join every year. Those living nearby should support a good cause by taking part in charity events when they can, \" said Ong who is also Serdang MP.",
            "APOH is a non-profit campaigning vehicle managed by volunteers that raises funds for underprivileged children.",
          ],
        },
        {
          heading: "Media coverage",
          paragraphs: [],
          richTail: paragraphWithWebLink(
            "",
            "Excerpt from The Star, 28 November 2019",
            "",
            "https://www.thestar.com.my/metro/metro-news/2019/11/28/rm120000-raised-at-fun-day-out",
          ),
        },
      ]),
      csrGallery("csr-fr-gal", "Picture Gallery", [
        {
          src: "https://tokai.com.my/wp-content/uploads/2019/12/funrun_01.jpg",
          alt: "Fun Run For Hope",
        },
        {
          src: "https://tokai.com.my/wp-content/uploads/2019/12/funrun_02.jpg",
          alt: "Fun Run For Hope",
        },
        {
          src: "https://tokai.com.my/wp-content/uploads/2019/12/funrun_03.jpg",
          alt: "Fun Run For Hope",
        },
        {
          src: "https://tokai.com.my/wp-content/uploads/2019/12/funrun_04.jpg",
          alt: "Fun Run For Hope",
        },
        {
          src: "https://tokai.com.my/wp-content/uploads/2019/12/funrun_05.jpg",
          alt: "Fun Run For Hope",
        },
        {
          src: "https://tokai.com.my/wp-content/uploads/2019/12/funrun_06.jpg",
          alt: "Fun Run For Hope",
        },
        {
          src: "https://tokai.com.my/wp-content/uploads/2019/12/funrun_07.jpg",
          alt: "Fun Run For Hope",
        },
        {
          src: "https://tokai.com.my/wp-content/uploads/2019/12/funrun_08.jpg",
          alt: "Fun Run For Hope",
        },
        {
          src: "https://tokai.com.my/wp-content/uploads/2019/12/funrun_09.jpg",
          alt: "Fun Run For Hope",
        },
        {
          src: "https://tokai.com.my/wp-content/uploads/2019/12/funrun_10.jpg",
          alt: "Fun Run For Hope",
        },
      ]),
      csrCta("csr-fr-cta"),
    ],
  },
  csr_epichomes: {
    metaTitle: "Tokai x EPIC Homes Build — Tokai",
    metaDescription:
      "EPIC Homes build with Tokai Engineering: volunteers, Orang Asli communities, and safe housing in Malaysia.",
    slices: [
      csrHero(
        "csr-eh-hero",
        "CSR",
        "Tokai x EPIC Homes Build",
        "EPIC Homes flagship build — volunteers, community, and shelter",
        "https://tokai.com.my/wp-content/uploads/2019/05/epic_01.jpg",
      ),
      csrBody("csr-eh-body", "", [
        {
          paragraphs: [
            "EPIC Homes is EPIC's flagship initiative that aims to build trust and relationships with marginalized communities in order to create cooperative, resilient and sustainable communities through the simple act of building homes, addressing the issue of access to safe housing among marginalized communities. Owning a home is complicated for most, and is a critical issue for those who live in poverty where access to adequate housing becomes even harder. UNDP estimates that 34% of Orang Aslis live in poverty, equivalent to one third of their population. For the Orang Aslis, their homes are deeply linked to their identity, job opportunities, community and the land itself. Without this foundation in place, breaking the poverty cycle becomes all the more harder.",
            "This build was made possible by Tokai Engineering (M) Sdn Bhd. The event was open to a mixture of selected and public volunteers where an exciting weekend awaited them! Volunteers took part in an exciting build and came together as a strong team to impact not just one family but an entire community.",
            "It is hoped that throughout the build, volunteers will develop a deeper understanding of the how the Orang Aslis live and that volunteers put themselves in the shoes of the community, developing a keen sense of empathy. In all that we're doing for this trip, we are building a closer relationship with the Orang Aslis and also strengthening the relationship and team dynamics amongst the volunteers as well.",
          ],
        },
      ]),
      csrGallery(
        "csr-eh-gal",
        "Picture Gallery",
        wpImageSeries("2019/05", "epic", 12, "Tokai x EPIC Homes build"),
      ),
      csrCta("csr-eh-cta"),
    ],
  },
  csr_gift: {
    metaTitle: "Cambodia Gift of Sight — Tokai",
    metaDescription:
      "Tokai–Rotary Cambodia Gift of Sight Project, August 2013 — Kampong Cham, eye surgeries, and sponsors.",
    slices: [
      csrHero(
        "csr-gos-hero",
        "CSR",
        "Cambodia Gift of Sight",
        "Tokai–Rotary eye-care mission in Kampong Cham, Cambodia",
        "https://tokai.com.my/wp-content/uploads/2019/05/giftsight_01.jpg",
      ),
      csrBody("csr-gos-body", "", [
        {
          paragraphs: [
            'The Tokai-Rotary "Cambodia Gift of Sight Project" from 8-12 August 2013 was held at Kammpong Cham in Phnom-Penh, Cambodia. An entourage of 21 team members comprised of Dato\' Ir. Jimmy Lim, MD of Tokai Engineering (M) Sdn Bhd together with members of the Malaysian Medical Doctors (Ophthalmologist & GP) namely Dr Choong, Dr Peter Kong & Dr Loh, Dr Srivalli, nurses, medical supports & others Rotarians from RC Damamsara West , lead by Mr Ken & RC KL West, friends and family members and the Bernama TV crew. In line with Tokai\'s commitment in the field of Corporate Social Responsibility, Tokai Engineering (M) Sdn Bhd was the Main Sponsor for the project.',
            "The expedition was a complete success with a total of 68 patients receiving their surgeries operation & the summaries of the type of Surgeries are as follows :",
          ],
          bullets: [
            "Cateract Surgery – 48",
            "Ptergium surgery – 18",
            "Cornia Scapping – 1",
            "Suture Removal – 1",
            "Grand Total : 68",
          ],
          paragraphsAfter: [
            "The age group ranged from teenagers (14,16, 17) & the oldest was an individual aged 85 years. Tokai extends its heartfelt gratitude to esteemed Corporate Sponsors namely Biaxis Sdn Bhd, Kodicom Singapore & Tech Store Sdn Bhd for their great and generous contributions.",
          ],
        },
      ]),
      csrGallery(
        "csr-gos-gal",
        "Picture Gallery",
        wpImageSeries("2019/05", "giftsight", 24, "Cambodia Gift of Sight"),
      ),
      csrCta("csr-gos-cta"),
    ],
  },
  csr_rise: {
    metaTitle: "Rise Against Hunger — Tokai",
    metaDescription:
      "Stop Hunger Now / Rise Against Hunger meal packaging at Publika, Kuala Lumpur — Tokai co-sponsor, April 2013.",
    slices: [
      csrHero(
        "csr-rah-hero",
        "CSR",
        "Rise Against Hunger",
        "100,000 meals — meal packaging at Publika Solaris Dutamas, 27 April 2013",
        "https://tokai.com.my/wp-content/uploads/2019/05/RAH.png",
      ),
      csrBody("csr-rah-body", "", [
        {
          paragraphs: [
            "Stop Hunger Now was established in 1998 and renamed Rise Against Hunger in 2017. The organization is driven by the vision of a world without hunger and a mission to end hunger in our lifetime by providing food and life saving aid to the world's most vulnerable. Stop Hunger Now's meal packaging program began in December 2005. More than 550,000 volunteer hours have been donated to the program since its inception.",
            "Tokai Engineering (M) Sdn Bhd was the co-sponsor of this project. About 20 of Tokai staffs including spouses and children volunteered and had fun participating in the meal packaging event that was held on Saturday, 27th April 2013, from 10 am to 6 pm at Publika Shopping Centre, Solaris Dutamas, KL. The objective was to pack 100,000 meals which contain rice, dehydrated soy vegetables and essential vitamins and minerals, which were sent to:-",
          ],
          bullets: [
            "At least 600 homes of families with disabled members in Kelantan",
            "Homeless in Kuala Lumpur and hard-core poor communities in Port Klang",
            "About 340 children living in 12 orphanage homes in Cambodia",
          ],
          paragraphsAfter: [
            "Each meal cost RM1.00 so it is equivalent to RM100,000.00. Tokai Engineering (M) is the co-sponsor of this project. Sponsored amount was RM10,000. About 20 of Tokai staffs including spouses and children volunteered and had fun participating in this meal packaging event.",
          ],
        },
      ]),
      csrGallery(
        "csr-rah-gal",
        "Picture Gallery",
        wpImageSeries(
          "2019/05",
          "shn",
          12,
          "Rise Against Hunger — meal packaging at Publika",
          "gif",
        ),
      ),
      csrCta("csr-rah-cta"),
    ],
  },
  csr_acbd: {
    metaTitle: "A Climb Beyond Disabilities — Tokai",
    metaDescription:
      "Rotary Club of Bandar Utama & Subang USJ: PWDs climb Mount Kinabalu — sponsors, training, and fundraising.",
    slices: [
      csrHero(
        "csr-acbd-hero",
        "CSR",
        "A Climb Beyond Disabilities",
        "Mount Kinabalu — Rotary, sponsors, and climbers with disabilities",
        "https://tokai.com.my/wp-content/uploads/2019/05/acbd_01.jpg",
      ),
      csrBody(
        "csr-acbd-body",
        "",
        [
          {
            paragraphs: [
              'This inspiring effort began during a Rotary visit to a welfare home for the physically challenged. There a group of people with disabilities (PWDs) took out a RM1 note and asked to be brought to climb Mount Kinabalu. It was not a simple request. Mount Kinabalu stands majestically at 4095 meters above sea level. Climbers face a variety of challenges including altitude sickness, fatigue and shortness of breath. The mountain weather is volatile and can deteriorate rapidly posing a real threat to even able-bodied and fit climbers. "A Climb Beyond Disabilities" was birthed to transform the dreams of the people with disabilities into a reality. The event was jointly organized by the Rotary Club of Bandar Utama and Subang USJ. This was no ordinary climb. It was meant to help the PWDs to believe in themselves and live their dreams. Climbing and conquering Mt Kinabalu was targetted to give them an opportunity to achieve significance in their lives.',
              "The main objectives of the climb embodied the following:-",
            ],
            bullets: [
              "Helping PWDs believe in themselves and live their dreams",
              "Showcasing the problems faced by PWDs and highlighting much needed solutions",
              "Raising funds for PWDs and to help their causes",
              "Enhancing the Rotary theme for 2012 : Reach Within To Embrace Humanity",
            ],
            paragraphsAfter: [
              'The main sponsor for the event was Vistage Malaysia CE16 which is made up of 16 corporations. The main co-sponsor was Fusion Excel International while 99 Speedmart was the co-sponsor. Air-Asia provided round-trip tickets for the PWDs, their caretakes as well as the TV3 crews. A total of 18 PWDs from various homes were selected and shortlisted for the historic climb. These special climbers suffer from various forms of disabilities, ranging from muscular disabilities to impairment of hearing and visual senses, as well as mental impairment. These participants underwent intensive training to strengthen their bodies before embarking on the climb to Mt. Kinabalu. Despite the challenging weather and the steep ascent, many of the climbers reached the summit. "A Climb Beyond Disabilities" targeted to raise RM500,000 to be distributed to 9 selected beneficiaries. Through the generous donations and sponsorships, the final amount raised exceeded the targeted amount!',
            ],
          },
        ],
        {
          url: `${WP_UPLOADS}/2019/05/ACBD.png`,
          alt: "A Climb Beyond Disabilities logo",
        },
      ),
      csrGallery(
        "csr-acbd-gal",
        "Picture Gallery",
        wpImageSeries("2019/05", "acbd", 12, "A Climb Beyond Disabilities"),
      ),
      csrCta("csr-acbd-cta"),
    ],
  },
  csr_food: {
    metaTitle: "Food Aid Initiative — Tokai",
    metaDescription:
      "Tokai Food Aid Donation to general workers in KL areas.",
    slices: [
      csrHero(
        "csr-fd-hero",
        "Company Events",
        "Food Aid Initiative",
        "Bringing Food to 60 general workers in KL areas",
      ),
      csrBody("csr-fd-body", "", [
        {
          paragraphs: [
            "Tokai recently pulled together a Food Aid Initiative to help those hit hardest by the coronavirus lockdown, which are the daily wage earners, and we wanted to do what we can no matter how small an effort during this time of need, Our care basket contained essential dry food items like rice, cooking oil, flour, instant noodles, canned foods and biscuits whom were living around the kongsi houses of Pudu, Bukit Bintang, Jalan Loke Yew and Kepong areas. We hope with this aid it will help ease their difficulties during this MCO period. All of us here in Tokai always keep the welfare of those who has been working with us close to our hearts. Even the smallest bit of charity can go a long way.",
            "TOKAI ~ Together We Stand United as One, In our Fight to Eradicate COVID-19",
          ],
        },
      ]),
      csrGallery("csr-fd-gal", "Picture Gallery", [
        { src: "https://tokai.com.my/wp-content/uploads/2020/04/04.jpg", alt: "Food aid initiative gallery" },
        { src: "https://tokai.com.my/wp-content/uploads/2020/04/05.jpg", alt: "Food aid initiative gallery" },
        { src: "https://tokai.com.my/wp-content/uploads/2020/04/01.jpg", alt: "Food aid initiative gallery" },
        { src: "https://tokai.com.my/wp-content/uploads/2020/04/02.jpg", alt: "Food aid initiative gallery" },
        { src: "https://tokai.com.my/wp-content/uploads/2020/04/03.jpg", alt: "Food aid initiative gallery" },
        { src: "https://tokai.com.my/wp-content/uploads/2020/04/06.jpg", alt: "Food aid initiative gallery" },
      ]),
      csrCta("csr-fd-cta"),
    ],
  },
};

export const CSR_ARTICLE_UIDS = Object.keys(csrArticleDocuments);
