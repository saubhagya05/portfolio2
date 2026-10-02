# Saubhagya Laxman Mamgain — Portfolio

Personal portfolio site. Next.js App Router, Tailwind CSS v4, GSAP + Lenis.

Forked from [Nextjs-cinematic-portfolio](https://github.com/5araang/Nextjs-cinematic-portfolio)
and rebuilt: all content, copy, metadata and structured data are mine, the
background is a CSS backdrop rather than a scrubbed video, and the WebGL and
MongoDB layers were removed.

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
```

No database, API keys or external services are needed for the site to run.

```bash
npm run build && npm run start   # production build
```

## Editing content

**Everything on the site comes from one file: [`src/content/site.js`](src/content/site.js).**
Name, role, contact details, bio, experience, projects, skills, achievements
and positions all live there. Edit that file, not the components.

### Still to fill in

1. **Social links** — `SOCIALS` in `src/content/site.js` has placeholders:

   ```js
   github:     "https://github.com/YOUR-GITHUB-USERNAME",
   linkedin:   "https://linkedin.com/in/YOUR-LINKEDIN-HANDLE",
   codeforces: "https://codeforces.com/profile/YOUR-CF-HANDLE",
   leetcode:   "https://leetcode.com/u/YOUR-LEETCODE-HANDLE",
   codechef:   "https://codechef.com/users/YOUR-CODECHEF-HANDLE",
   ```

   Any URL still containing `YOUR-` is hidden from the UI rather than rendered
   as a dead link, so the site looks correct until you get to them.

2. **Resume** — drop your PDF at `public/resume.pdf`. The About and Projects
   pages link to it.

3. **Portrait** — drop an image at `public/photo/portrait.webp`, then set
   `hasPortrait: true` in the `ABOUT` block. Until then the About page shows a
   designed monogram placeholder.

4. **Project links** — each entry in `PROJECTS` has `repo` and `live` fields,
   both `null`. Fill them in and the Code / Live buttons appear.

## No backend

The site is fully static. Every route prerenders to HTML at build time — there
are no API routes, no database, no middleware and no serverless functions. The
template this was forked from shipped a Supabase-backed admin panel, visitor
analytics and a server-side contact form; all of it was removed.

The contact form opens a pre-filled draft in the visitor's own mail app, so it
works with no service behind it and nothing is sent until they press send.

| Variable | Needed for |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs once you have a custom domain. Optional on Vercel, which supplies its own domain as a fallback. |

## Deploying

Import the repo on Vercel and accept every default. Root Directory stays `./`,
framework auto-detects as Next.js. Nothing needs configuring.

Set `NEXT_PUBLIC_SITE_URL` once you point a custom domain at it.

## Structure

```
src/
  content/site.js      all site content — start here
  app/                 routes and metadata
  components/          Backdrop, Hero, Experience, Work, Achievements, Contact, …
  views/               full-page views for /about, /contact, /projects
  lib/                 siteUrl + mail-draft helpers
public/
  llms.txt             machine-readable profile for AI crawlers
  llms-full.txt        full profile
  searchwords.xml      keyword index
```

## Licence

Template licensed under the terms in [LICENSE](LICENSE). Site content is mine.
