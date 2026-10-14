import { useEffect, useRef, useState, type FormEvent } from "react";
import { useLocation } from "react-router-dom";
import { ArrowRight, CheckCircle2, LoaderCircle } from "lucide-react";
import InteriorSignature from "./InteriorSignature";
import { site } from "../lib/site";

const coverageOptions = [
  ["not-sure", "Not sure yet"], ["auto", "Auto insurance"], ["home", "Home or renters insurance"],
  ["business", "Business insurance"], ["specialty", "Specialty insurance or a filing"],
] as const;
type Field = "name" | "email" | "phone" | "coverage" | "message";
type Errors = Partial<Record<Field, string>>;

export default function QuoteRequestForm() {
  const { search } = useLocation();
  const formRef = useRef<HTMLFormElement>(null);
  const coverageRef = useRef<HTMLSelectElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const inFlight = useRef(false);
  const request = useRef<{ fingerprint: string; key: string } | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "pending" | "error" | "success">("idle");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const requested = new URLSearchParams(search).get("coverage");
    if (coverageRef.current && requested && coverageOptions.some(([value]) => value === requested)) coverageRef.current.value = requested;
  }, [search]);
  useEffect(() => () => abortRef.current?.abort(), []);
  useEffect(() => { if (status === "success") resultRef.current?.focus(); }, [status]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const value = (key: string) => String(data.get(key) ?? "").trim();
    const payload = { name: value("name"), email: value("email"), phone: value("phone"), coverage: value("coverage"), message: value("message"), website: value("website") };
    const nextErrors: Errors = {};
    if (!payload.name) nextErrors.name = "Enter your name.";
    if (!payload.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) nextErrors.email = "Enter a valid email address.";
    if (payload.phone && !/^[+\d\s().-]{7,30}$/.test(payload.phone)) nextErrors.phone = "Enter a phone number, or leave this field blank.";
    if (!coverageOptions.some(([option]) => option === payload.coverage)) nextErrors.coverage = "Choose a coverage type.";
    if (!payload.message) nextErrors.message = "Tell us a little about what you need.";
    if (payload.message.length > 2000) nextErrors.message = "Keep your message to 2,000 characters or fewer.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setStatus("error"); setNotice("Please check the highlighted fields.");
      form.querySelector<HTMLElement>(`[name="${Object.keys(nextErrors)[0]}"]`)?.focus();
      return;
    }
    const fingerprint = JSON.stringify(payload);
    if (request.current?.fingerprint !== fingerprint) request.current = { fingerprint, key: crypto.randomUUID() };
    inFlight.current = true; setStatus("pending"); setNotice("");
    const controller = new AbortController(); abortRef.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), 25000);
    try {
      const response = await fetch("/api/quote", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...payload, idempotencyKey: request.current.key }), signal: controller.signal });
      const result = await response.json().catch(() => null);
      if (!response.ok || result?.ok !== true) {
        if (result?.errors && typeof result.errors === "object") {
          const serverErrors: Errors = {};
          for (const field of ["name", "email", "phone", "coverage", "message"] as const) if (typeof result.errors[field] === "string") serverErrors[field] = result.errors[field];
          setErrors(serverErrors);
        }
        setStatus("error");
        setNotice(response.status === 429 ? "Please wait a few minutes before trying again, or call the office." : response.status === 400 || response.status === 422 ? "Please check your details and try again." : "Online requests are temporarily unavailable. Your details are still here. Please try again or call the office.");
        return;
      }
      setStatus("success"); setNotice("Your quote request has been sent. The Rafla team will follow up using the contact information you provided.");
    } catch {
      setStatus("error"); setNotice("We could not confirm that your request was sent. Your details are still here. Please try again or call the office.");
    } finally { window.clearTimeout(timeout); inFlight.current = false; abortRef.current = null; }
  }

  const description = (field: Field) => errors[field] ? `quote-${field}-error${field === "message" ? " quote-message-help" : ""}` : field === "message" ? "quote-message-help" : undefined;
  const error = (field: Field) => errors[field] ? <p className="quote-request__field-error" id={`quote-${field}-error`}>{errors[field]}</p> : null;
  return (
    <section id="quote-request" className="quote-request" tabIndex={-1} aria-labelledby="quote-request-title">
      <div className="atlas-container quote-request__layout">
        <header><InteriorSignature kind="correspondence" /><p className="ria-kicker">Let’s start with your needs</p><h2 id="quote-request-title">Request a quote.</h2><p>Tell us what you’d like to insure. We’ll get in touch to discuss the details and available options.</p><p className="quote-request__call">Prefer to talk? <a href={site.contact.phoneHref}>{site.contact.phone}</a></p></header>
        {status === "success" ? <div ref={resultRef} className="quote-request__success" role="status" tabIndex={-1}><CheckCircle2 aria-hidden="true" size={30} /><h3>Thank you for reaching out.</h3><p>{notice}</p><p>Submitting a request does not start or change coverage.</p></div> : <form ref={formRef} onSubmit={submit} noValidate aria-busy={status === "pending"}>
          <p className="quote-request__required">Fields marked * are required.</p>
          <div className="quote-request__fields">
            <div><label htmlFor="quote-name">Your name *</label><input id="quote-name" name="name" autoComplete="name" maxLength={100} required aria-invalid={!!errors.name} aria-describedby={description("name")} />{error("name")}</div>
            <div><label htmlFor="quote-email">Email address *</label><input id="quote-email" name="email" type="email" autoComplete="email" maxLength={254} required aria-invalid={!!errors.email} aria-describedby={description("email")} />{error("email")}</div>
            <div><label htmlFor="quote-phone">Phone number <span>(optional)</span></label><input id="quote-phone" name="phone" type="tel" autoComplete="tel" maxLength={30} aria-invalid={!!errors.phone} aria-describedby={description("phone")} />{error("phone")}</div>
            <div><label htmlFor="quote-coverage">What do you need?</label><select ref={coverageRef} id="quote-coverage" name="coverage" defaultValue="not-sure" aria-invalid={!!errors.coverage} aria-describedby={description("coverage")}>{coverageOptions.map(([value,label]) => <option key={value} value={value}>{label}</option>)}</select>{error("coverage")}</div>
            <div className="quote-request__message"><label htmlFor="quote-message">How can we help? *</label><textarea id="quote-message" name="message" rows={5} maxLength={2000} required aria-invalid={!!errors.message} aria-describedby={description("message")} /><p id="quote-message-help">Up to 2,000 characters. Please leave out Social Security numbers, payment details, and other sensitive records.</p>{error("message")}</div>
          </div>
          <div className="quote-request__trap" aria-hidden="true"><label htmlFor="quote-website">Website</label><input id="quote-website" name="website" tabIndex={-1} autoComplete="off" /></div>
          <p className="quote-request__consent">By sending this request, you ask Rafla to contact you about your insurance needs. <a href="/privacy">Privacy notice</a>. This request does not bind or change coverage.</p>
          <div className="quote-request__submit"><button type="submit" disabled={status === "pending"}>{status === "pending" ? <>Sending request <LoaderCircle className="quote-request__spinner" aria-hidden="true" size={18} /></> : <>Send quote request <ArrowRight aria-hidden="true" size={18} /></>}</button><p role="status" aria-live="polite">{status === "pending" ? "Sending your request…" : notice}</p></div>
        </form>}
      </div>
    </section>
  );
}
