import { permanentRedirect } from "next/navigation";

/** Legacy URL; `next.config` also redirects to `/our-solutions`. */
export default function RiskAssessmentLegacyPage() {
  permanentRedirect("/our-solutions");
}
