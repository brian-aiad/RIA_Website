import PolicyPage, { type PolicySection } from "../components/PolicyPage";
import BreadcrumbSchema from "../components/seo/BreadcrumbSchema";
import { usePageMeta } from "../lib/seo";

const sections: PolicySection[] = [
  { title: "Information you choose to share", body: ["When you call, email, visit, or use a quote or contact form, Rafla Insurance Agency may receive the details you provide. That can include contact information and information about drivers, vehicles, property, household members, business operations, insurance history, or a coverage request."], bullets: ["Do not send Social Security numbers, payment-card data, medical records, or other highly sensitive information through ordinary email.", "A submitted form or email does not bind coverage."] },
  { title: "How information may be used", body: ["The agency may use submitted information to respond, prepare or discuss a quote, communicate with insurers or service providers involved in the request, maintain business records, prevent misuse, and comply with legal or regulatory obligations."] },
  { title: "Website services", body: ["The site may use hosting, security, analytics, and form-delivery providers to operate. Those providers may process technical information such as IP address, device or browser details, requested pages, and timestamps. Vercel hosts the site and provides privacy-oriented web analytics and speed insights."], bullets: ["The public website does not intentionally sell personal information.", "Third-party maps, review pages, phone, email, or other links are governed by their own privacy practices."] },
  { title: "Retention and security", body: ["Information is retained as reasonably needed for the request, agency records, legal obligations, fraud prevention, or dispute resolution. No internet transmission or storage system can be guaranteed completely secure. Use the phone or in-person office for sensitive matters."] },
  { title: "Your choices", body: ["You may choose not to submit an online form and contact the agency by telephone or in person. You can ask about information you previously submitted, subject to identity verification and applicable recordkeeping obligations."] },
  { title: "Contact", body: ["Questions about this notice can be directed to Rafla Insurance Agency at (310) 572-7246 or brinsurance3@msn.com, or by mail at 12240 Venice Blvd, Suite 2, Los Angeles, CA 90066."] },
];

export default function Privacy() {
  usePageMeta({ title: "Privacy & Data Handling | Rafla Insurance Agency", description: "How Rafla Insurance Agency handles information submitted through its Los Angeles insurance website and contact channels.", canonical: "https://raflainsurance.com/privacy" });
  return <><BreadcrumbSchema crumbs={[{ name: "Home", url: "https://raflainsurance.com/" }, { name: "Privacy", url: "https://raflainsurance.com/privacy" }]} /><PolicyPage code="P1" eyebrow="Privacy & data handling" title="Clear expectations for the information you share." lede="This notice describes the public website and agency contact channels. Carrier notices and policy documents may contain additional terms." updated="August 26, 2026" sections={sections} /></>;
}
