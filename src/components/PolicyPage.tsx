import { ArrowLeft, FileText, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { AtlasEyebrow, QuoteBand } from "./AtlasUI";
import { site } from "../lib/site";

export type PolicySection = { title: string; body: string[]; bullets?: string[] };

export default function PolicyPage({ code, eyebrow, title, lede, updated, sections }: { code: string; eyebrow: string; title: string; lede: string; updated: string; sections: PolicySection[] }) {
  return (
    <main id="main-content" className="atlas-page policy-file">
      <header className="policy-file__hero"><div className="atlas-container"><div className="hero-copy-enter"><span className="policy-file__code">{code}</span><AtlasEyebrow light>{eyebrow}</AtlasEyebrow><h1>{title}</h1><p>{lede}</p><div className="policy-file__meta"><FileText size={15}/>Last updated {updated}</div></div></div></header>
      <section className="policy-file__body"><div className="atlas-container policy-file__grid"><aside className="motion-reveal"><Link to="/"><ArrowLeft size={15}/>Back home</Link><a href={site.contact.phoneHref}><Phone size={15}/>{site.contact.phone}</a></aside><article>{sections.map((section,index) => <section key={section.title} className="motion-reveal"><span>{String(index+1).padStart(2,"0")}</span><h2>{section.title}</h2>{section.body.map((p) => <p key={p}>{p}</p>)}{section.bullets && <ul>{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul>}</section>)}</article></div></section>
      <QuoteBand title="Need this information in another format?" text="Call the agency. We will make a reasonable effort to help you access the information or choose another way to communicate." />
    </main>
  );
}
