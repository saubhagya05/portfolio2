/**
 * The canonical origin for this deployment.
 *
 * Metadata, canonical links, Open Graph tags, sitemap.xml, robots.txt and the
 * JSON-LD graph all read from this. If it resolves to localhost in production,
 * every one of those points at a machine nobody else can reach — so this falls
 * back to the Vercel-provided domain rather than localhost when deployed.
 *
 * Precedence:
 *   1. NEXT_PUBLIC_SITE_URL          your own domain — set this once you have one
 *   2. VERCEL_PROJECT_PRODUCTION_URL the project's stable production domain
 *   3. VERCEL_URL                    this specific deployment (preview builds)
 *   4. http://localhost:3000         local development
 *
 * Server-side only: VERCEL_* are not exposed to the browser. A client component
 * that needs the origin should read NEXT_PUBLIC_SITE_URL directly.
 */
export function getSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");

  const prod = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (prod) return `https://${prod}`;

  const deployment = process.env.VERCEL_URL;
  if (deployment) return `https://${deployment}`;

  return "http://localhost:3000";
}
