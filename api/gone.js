export default function handler(_request, response) {
  response.setHeader("X-Robots-Tag", "noindex, nofollow");
  response.setHeader("Cache-Control", "public, max-age=3600");
  response.status(410).send("Gone");
}
