import { next } from "@vercel/functions";

export const config = {
  runtime: "nodejs",
  matcher: ["/((?!api|assets|images|favicon.svg|logo.svg).*)"],
};

export default function middleware(request) {
  const url = new URL(request.url);

  // The site does not use query-string state. Remove all query parameters
  // before rendering so accidental personal data and tracking values are not
  // retained in the address bar, logs, analytics URLs, or shared links.
  if (url.search) {
    url.search = "";
    return Response.redirect(url, 308);
  }

  return next();
}
