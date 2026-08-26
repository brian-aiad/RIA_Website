export const config = {
  matcher: ["/((?!api|assets|images|favicon.ico|robots.txt|sitemap.xml).*)"],
};

export default function middleware(request) {
  const url = new URL(request.url);

  if (!url.searchParams.has("q")) {
    return undefined;
  }

  url.searchParams.delete("q");
  return Response.redirect(url, 308);
}
