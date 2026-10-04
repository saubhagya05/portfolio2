/** @type {import('next').NextConfig} */
const nextConfig = {
  // ── Compiler optimisations ────────────────────────────────────────
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // ── Experimental ─────────────────────────────────────────────────
  experimental: {
    optimizeCss: true,
    // Tree-shake the icon barrels. Without this, importing a handful of icons
    // pulls in thousands of modules and noticeably slows dev compiles.
    optimizePackageImports: ["react-icons", "gsap", "framer-motion"],
  },

  // ── Image optimisation ────────────────────────────────────────────
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
  },

  // ── SEO & cache headers ──────────────────────────────────────────
  async headers() {
    return [
      {
        source: "/photo/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        // Background clips: the filenames are static, so cache them hard
        // rather than re-fetching ~4.3MB on every repeat visit.
        source: "/videos/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/llms.txt",
        headers: [
          { key: "Content-Type", value: "text/plain; charset=utf-8" },
          { key: "Cache-Control", value: "public, max-age=86400" },
          { key: "X-Robots-Tag", value: "all" },
        ],
      },
      {
        source: "/llms-full.txt",
        headers: [
          { key: "Content-Type", value: "text/plain; charset=utf-8" },
          { key: "Cache-Control", value: "public, max-age=86400" },
          { key: "X-Robots-Tag", value: "all" },
        ],
      },
      {
        source: "/sitemap.xml",
        headers: [
          { key: "X-Robots-Tag", value: "all" },
          { key: "Cache-Control", value: "public, max-age=3600" },
        ],
      },
      {
        source: "/((?!api|_next|admin).*)",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "index, follow, max-image-preview:large, max-snippet:-1",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
