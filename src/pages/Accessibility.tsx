import PolicyPage, { type PolicySection } from "../components/PolicyPage";
import BreadcrumbSchema from "../components/seo/BreadcrumbSchema";
import { usePageMeta } from "../lib/seo";

const sections: PolicySection[] = [
  { title: "Our commitment", body: ["Rafla Insurance Agency wants people with disabilities to be able to use this website and reach the agency. The site is designed around semantic structure, keyboard access, visible focus, text alternatives, responsive layouts, and support for reduced-motion preferences."] },
  { title: "Ways to contact us", body: ["If a page, form, document, or interaction is difficult to use, call (310) 572-7246 or email brinsurance3@msn.com. You may also visit 12240 Venice Blvd, Suite 2, Los Angeles, CA 90066 during posted office hours."], bullets: ["Describe the page or feature and the format that would help.", "Include a phone number or email address if you want a response.", "Do not include policy-sensitive details in a public accessibility report."] },
  { title: "Keyboard and motion", body: ["Navigation, links, buttons, disclosures, and the quote dialog are intended to work from a keyboard. Motion is reduced when the operating system’s reduced-motion setting is enabled. The site uses native scrolling and does not require scroll-hijacking controls."] },
  { title: "Third-party content", body: ["Some links open maps, reviews, carrier resources, or other services that Rafla does not control. Accessibility varies across those external services. Contact the agency if you need help finding another way to access information."] },
  { title: "Ongoing review", body: ["Accessibility is an ongoing process. The agency welcomes specific feedback and will make reasonable efforts to provide information or service through an accessible alternative when a barrier is identified."] },
];

export default function Accessibility() {
  usePageMeta({ title: "Accessibility Statement | Rafla Insurance Agency", description: "Accessibility commitment and contact options for the Rafla Insurance Agency website.", canonical: "https://raflainsurance.com/accessibility" });
  return <><BreadcrumbSchema crumbs={[{ name: "Home", url: "https://raflainsurance.com/" }, { name: "Accessibility", url: "https://raflainsurance.com/accessibility" }]} /><PolicyPage code="A11Y" eyebrow="Accessibility" title="Insurance help should be accessible." lede="Our practical commitment to accessible navigation, communication, and alternatives when the website creates a barrier." updated="August 26, 2026" sections={sections} /></>;
}
