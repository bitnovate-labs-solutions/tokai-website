import { h1, paragraph } from "@/lib/rich-text";

/** Canonical copy for the site-wide “Get in touch” CTA (fallback + default for editors). */
export const GET_IN_TOUCH_HEADING = "Get In Touch With Us!";

export const GET_IN_TOUCH_BODY =
  "Tokai's world-class lightning protection systems and security engineering solutions keep the nation's infrastructures safe and minimizes downtime. If you have any enquiries or require further information, get in touch with us! Our qualified and highly experienced personnel is available to provide quality consultation and to offer the customized solution for your needs.";

export const GET_IN_TOUCH_CTA_LABEL = "Talk to our team";
export const GET_IN_TOUCH_CTA_HREF = "/address-contact";

/**
 * Standard dark CTA band used across Tokai pages for the same “Get in touch” block.
 * In Prismic, add a **CTA band** slice with matching fields (editable per page).
 */
export function createGetInTouchCtaBandSlice(
  id: string,
  options?: {
    /** Local path or absolute URL; matches legacy tokai.com.my contact illustration. */
    aside_image?: { url: string; alt: string };
  },
) {
  return {
    slice_type: "cta_band" as const,
    id,
    variation: "default" as const,
    version: "initial" as const,
    primary: {
      heading: h1(GET_IN_TOUCH_HEADING),
      body: paragraph(GET_IN_TOUCH_BODY),
      cta_label: GET_IN_TOUCH_CTA_LABEL,
      cta_href: GET_IN_TOUCH_CTA_HREF,
      ...(options?.aside_image
        ? {
            aside_image: {
              url: options.aside_image.url,
              alt: options.aside_image.alt,
            },
          }
        : {}),
    },
    items: [] as const,
  };
}
