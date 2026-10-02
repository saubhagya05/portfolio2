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

## Optional services

All optional. The site runs fully without them; configure in `.env.local`.

| Variable | Enables |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` | Admin panel, visitor analytics, DB-backed projects |
| `RESEND_API_KEY` | Contact form email delivery |
| `JWT_SECRET` | Admin panel session cookie (generate with `node generate-secret.js`) |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL in metadata, sitemap and robots.txt |
| `NEXT_PUBLIC_ENABLE_ANALYTICS` | Set `true` to turn on visitor tracking (needs Supabase) |

Without `RESEND_API_KEY` the contact form returns a clear "not configured"
message and the UI falls back to showing the email address directly.

The Supabase schema for the admin panel is in [`supabase/`](supabase/).

## Deploying

Set `NEXT_PUBLIC_SITE_URL` to the real domain before deploying — metadata,
canonical URLs, `sitemap.xml`, `robots.txt` and the JSON-LD all read from it.

## Structure

```
src/
  content/site.js      all site content — start here
  app/                 routes, metadata, API routes, admin panel
  components/          Backdrop, Hero, About, Work, Achievements, Contact, …
  views/               full-page views for /about, /contact, /projects
public/
  llms.txt             machine-readable profile for AI crawlers
  llms-full.txt        full profile
  searchwords.xml      keyword index
```

## Licence

Template licensed under the terms in [LICENSE](LICENSE). Site content is mine.
