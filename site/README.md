# All Speeches Great & Small — website (Astro)

A fully pre-rendered (static HTML) site built to preserve SEO equity and win AI /
answer-engine visibility. Every page ships real HTML with JSON-LD in the `<head>`
before any JavaScript runs — satisfying the rebuild kit's blocking "Phase 0" test
without any prerender workaround.

## Run it

```bash
cd site
npm install
npm run dev      # local dev at http://localhost:4321
npm run build    # static build to ./dist
npm run preview  # serve the built ./dist
```

## What's built

- **23 pages**: home, 6 service pages, 5 guides, about, reviews, pricing, contact,
  blog index, sample blog posts, privacy, terms, 404.
- **Exact slugs preserved** (mixed trailing slashes) per the migration plan.
- **Schema** on every page: ProfessionalService + WebSite (global), BreadcrumbList,
  plus Service / Article / FAQPage / Person / Offer / ContactPage / Product where
  relevant. Guides carry 6–25 extracted FAQs each for answer-engine snippets.
- **robots.txt / llms.txt** in `public/`; **sitemap.xml** auto-generated (noindex
  pages excluded, slugs matched to canonicals).
- **Blog**: Markdown content collection. Posts live at root-level slugs via the
  `[...slug].astro` catch-all (explicit pages take precedence). Drop the ~150
  migrated Joomla posts into `src/content/blog/` (one file per post, `slug` = old
  URL) and they publish automatically.

## Before launch — fill these in (`src/config/site.ts`)

- `rating` / `reviewCount` — real numbers from reviews.co.uk (schema + badges stay
  hidden until these are set; never fabricate).
- `email`, `reviewsProfileUrl`, `turnaround` — confirm real values.
- Real testimonials → `src/pages/reviews.astro` (`testimonials` array) and the home
  reviews section.
- Confirm eulogy / speech-review pricing in `src/pages/pricing.astro`.
- Swap the `[VIDEO]` slots in guides for the real YouTube embed IDs.
- Set `www` as the primary domain + force HTTPS on the host; add any old→new slug
  301s in `netlify.toml`.

## Regenerating guides

The guides are generated from the kit's ENHANCED markdown:

```bash
node scripts/build-guides.mjs
```

## Deploy

Netlify config is in `netlify.toml` (publish `dist`). Works the same on Vercel /
Cloudflare Pages — build `npm run build`, output `dist`.
