import { createHash } from "node:crypto";
import type { IncomingMessage, ServerResponse } from "node:http";

const RECIPIENT = "raflainsurance@gmail.com";
const LIMIT_BYTES = 12_000;
const coverageLabels: Record<string, string> = {
  auto: "Auto insurance", home: "Home & renters insurance", business: "Business insurance",
  specialty: "Specialty insurance", "not-sure": "Help choosing coverage",
};
type Quote = { name: string; email: string; phone: string; coverage: string; message: string; website: string; idempotencyKey: string };
type QuoteRequest = IncomingMessage & { body?: unknown };
type Dependencies = { env?: NodeJS.ProcessEnv; fetch?: typeof fetch; now?: () => number };
const escapeHtml = (value: string) => value.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export function validateQuote(body: unknown): { value?: Quote; errors: Record<string, string> } {
  if (!body || typeof body !== "object" || Array.isArray(body)) return { errors: { message: "Please complete the form." } };
  const input = body as Record<string, unknown>;
  const value = Object.fromEntries(["name", "email", "phone", "coverage", "message", "website", "idempotencyKey"].map(key => [key, typeof input[key] === "string" ? input[key].trim() : ""])) as Quote;
  const errors: Record<string, string> = {};
  if (!value.name || value.name.length > 100 || [...value.name].some(char => char.charCodeAt(0) < 32)) errors.name = "Enter your name (up to 100 characters).";
  if (!/^[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+$/.test(value.email) || value.email.length > 254) errors.email = "Enter a valid email address.";
  if (value.phone && (!/^[+\d()\s.-]+$/.test(value.phone) || value.phone.replace(/\D/g, "").length < 7 || value.phone.length > 30)) errors.phone = "Enter a valid phone number or leave it blank.";
  if (!Object.hasOwn(coverageLabels, value.coverage)) errors.coverage = "Choose a coverage type.";
  if (!value.message || value.message.length > 2000 || value.message.includes(String.fromCharCode(0))) errors.message = "Tell us what you need in 2,000 characters or fewer.";
  if (!/^[a-f\d]{8}-[a-f\d]{4}-4[a-f\d]{3}-[89ab][a-f\d]{3}-[a-f\d]{12}$/i.test(value.idempotencyKey)) errors.message = "Please refresh the page and try again.";
  return { value, errors };
}

export function renderQuoteEmail(quote: Quote) {
  const coverage = coverageLabels[quote.coverage];
  const rows = [["Name", quote.name], ["Email", quote.email], ["Phone", quote.phone || "Not provided"], ["Coverage", coverage]];
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0;background:#edf1f5;font-family:Arial,Helvetica,sans-serif;color:#142343"><table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr><td align="center" style="padding:32px 16px"><table role="presentation" width="600" cellspacing="0" cellpadding="0" style="width:100%;max-width:600px;background:#ffffff;border:1px solid #dce3ea"><tr><td style="padding:28px 32px;background:#142343;border-bottom:4px solid #cda33b;color:white"><p style="margin:0 0 10px;font-size:12px;letter-spacing:2px;color:#e5c66d">RAFLA INSURANCE AGENCY</p><h1 style="margin:0;font-size:26px;line-height:1.25">New quote request</h1></td></tr><tr><td style="padding:28px 32px"><p style="margin:0 0 24px;color:#526176;line-height:1.6">A website visitor would like to speak with the agency about ${escapeHtml(coverage.toLowerCase())}.</p><table role="presentation" width="100%" cellspacing="0" cellpadding="0">${rows.map(([label, value]) => `<tr><td style="padding:12px 0;border-bottom:1px solid #e1e6eb;font-size:13px;color:#526176;width:90px;vertical-align:top">${label}</td><td style="padding:12px 0;border-bottom:1px solid #e1e6eb;font-size:15px;font-weight:600;overflow-wrap:anywhere">${escapeHtml(value)}</td></tr>`).join("")}</table><h2 style="font-size:14px;margin:28px 0 12px">How we can help</h2><p style="margin:0;padding:18px;background:#f4f6f8;border-left:3px solid #cda33b;line-height:1.7;font-size:15px;overflow-wrap:anywhere">${escapeHtml(quote.message).replace(/\r?\n/g, "<br>")}</p><p style="margin:28px 0 8px"><a href="mailto:${encodeURIComponent(quote.email)}" style="display:inline-block;padding:14px 22px;background:#142343;color:white;text-decoration:none;font-weight:600;border-radius:4px">Reply to ${escapeHtml(quote.name)}</a></p><p style="margin:14px 0 0;color:#526176;font-size:12px;line-height:1.6">You can also reply directly to this email. The visitor’s address is set as Reply-To.</p></td></tr><tr><td style="padding:18px 32px;background:#f4f6f8;color:#526176;font-size:11px;line-height:1.6">Submitted through the Rafla Insurance website. This is an inquiry, not an insurance application or a confirmation of coverage.</td></tr></table></td></tr></table></body></html>`;
  const text = `RAFLA INSURANCE AGENCY\nNew quote request\n\n${rows.map(([label, value]) => `${label}: ${value}`).join("\n")}\n\nHow we can help:\n${quote.message}\n\nReply directly to this email to contact the visitor. This is an inquiry, not a confirmation of coverage.`;
  return { subject: `New ${coverage.toLowerCase()} request — ${quote.name}`, html, text };
}

export function createQuoteHandler(dependencies: Dependencies = {}) {
  const env = dependencies.env ?? process.env;
  const send = dependencies.fetch ?? fetch;
  const now = dependencies.now ?? Date.now;
  // A bounded per-instance guard supplements the host's firewall. It is not a
  // distributed rate limiter; no raw client addresses or form contents are logged.
  const attempts = new Map<string, { count: number; expires: number }>();
  return async function handler(req: QuoteRequest, res: ServerResponse) {
    const respond = (status: number, body: object) => {
      res.statusCode = status;
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      res.setHeader("Cache-Control", "no-store");
      res.setHeader("X-Content-Type-Options", "nosniff");
      res.end(JSON.stringify(body));
    };
    if (req.method !== "POST") { res.setHeader("Allow", "POST"); return respond(405, { ok: false }); }
    const origin = req.headers.origin;
    const allowed = new Set(["https://www.raflainsurance.com", "https://raflainsurance.com", ...[env.VERCEL_URL, env.VERCEL_BRANCH_URL].filter(Boolean).map(host => `https://${host}`)]);
    let local = false;
    try { const url = new URL(origin ?? ""); local = env.NODE_ENV !== "production" && ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname) && url.protocol === "http:"; } catch { /* malformed origins are denied */ }
    if (typeof origin !== "string" || (!allowed.has(origin) && !local)) return respond(403, { ok: false });
    if (!req.headers["content-type"]?.startsWith("application/json")) return respond(415, { ok: false });
    if (Number(req.headers["content-length"] ?? 0) > LIMIT_BYTES) return respond(413, { ok: false });
    const client = String(req.headers["x-vercel-forwarded-for"] ?? req.socket.remoteAddress ?? "unknown");
    const clientKey = createHash("sha256").update(client).digest("hex");
    for (const [key, item] of attempts) if (item.expires <= now()) attempts.delete(key);
    const attempt = attempts.get(clientKey) ?? { count: 0, expires: now() + 600_000 };
    if (attempt.count >= 5 || attempts.size >= 10_000) { res.setHeader("Retry-After", "600"); return respond(429, { ok: false }); }
    attempt.count++; attempts.set(clientKey, attempt);
    let body: unknown = req.body;
    try {
      if (body === undefined) {
        const chunks: Buffer[] = []; let size = 0;
        for await (const chunk of req) {
          const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
          size += buffer.length;
          if (size > LIMIT_BYTES) return respond(413, { ok: false });
          chunks.push(buffer);
        }
        body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
      } else if (typeof body === "string") {
        if (Buffer.byteLength(body) > LIMIT_BYTES) return respond(413, { ok: false });
        body = JSON.parse(body);
      } else if (Buffer.byteLength(JSON.stringify(body)) > LIMIT_BYTES) return respond(413, { ok: false });
    } catch { return respond(400, { ok: false }); }
    const { value, errors } = validateQuote(body);
    if (!value || Object.keys(errors).length) return respond(422, { ok: false, errors });
    if (value.website) return respond(422, { ok: false });
    if (!env.RESEND_API_KEY || !env.QUOTE_FROM_EMAIL || /[\r\n]/.test(env.QUOTE_FROM_EMAIL)) return respond(503, { ok: false });
    const email = renderQuoteEmail(value);
    const payload = { from: env.QUOTE_FROM_EMAIL, to: [RECIPIENT], reply_to: value.email, ...email };
    const requestKey = createHash("sha256").update(JSON.stringify(payload)).update(value.idempotencyKey).digest("hex");
    try {
      const response = await send("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json", "Idempotency-Key": `quote-${requestKey}` },
        body: JSON.stringify(payload), signal: AbortSignal.timeout(12_000),
      });
      const receipt = await response.json() as { id?: unknown };
      if (!response.ok || typeof receipt.id !== "string" || !receipt.id) return respond(502, { ok: false });
      return respond(200, { ok: true });
    } catch { return respond(502, { ok: false }); }
  };
}
