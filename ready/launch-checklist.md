# Launch & migration checklist — All Speeches Great & Small

Tailored to the live Lovable routes (TanStack Start SSR). Work top to bottom; the foundation
test is blocking.

## A. Foundation (do once, on staging — BLOCKING)
For one real content page (e.g. `/best-man-speech-writer/`):
- [ ] `curl -s https://[staging]/best-man-speech-writer/ | grep -i "best man"` returns body text
- [ ] `curl -s https://[staging]/best-man-speech-writer/ | grep "application/ld+json"` returns the schema
- [ ] Page is readable in a browser with **JavaScript disabled**

If any fail, the SSR isn't emitting content/schema into the raw HTML — fix before continuing.

## B. Per-page, as each page goes live
- [ ] Unique `<title>` (<60 chars) and meta description (<155 chars)
- [ ] Self-referencing canonical that **matches the slug's trailing slash exactly**
      (`/best-man-speech-writer/` and `/best-man-speeches/` keep the slash; the rest have none)
- [ ] Exactly one `<h1>`
- [ ] Open Graph + Twitter card tags present
- [ ] Global ProfessionalService + WebSite JSON-LD in head
- [ ] Page-specific JSON-LD from `jsonld.md` injected, and **FAQ text matches the visible copy**
- [ ] Validates clean in https://search.google.com/test/rich-results
- [ ] All `[TOKEN]`s replaced (no `[X]`, `[RATING]`, `[REVIEW_COUNT]`, `[Real…]`, `[your email]` left)

## C. Cross-linking (Service ↔ Guide pairs both ways)
- [ ] `/best-man-speech-writer/` ↔ `/best-man-speeches/`
- [ ] `/groom-speech-writer` ↔ `/groom-speeches`
- [ ] `/father-of-the-bride-speech-writer` ↔ `/father-of-the-bride-speeches`
- [ ] `/maid-of-honour-speech-writer` ↔ `/moh-speeches`
- [ ] `/eulogy-writing-service` ↔ `/eulogy-examples`
- [ ] Guides show visible byline + "Updated June 2026"

## D. Technical files live & reachable
- [ ] `/robots.txt` (from `ready/robots.txt`)
- [ ] `/llms.txt` (from `ready/llms.txt`) — `[REVIEW_COUNT]` filled
- [ ] `/sitemap.xml` — real lastmod dates, blog posts included, privacy/terms excluded
- [ ] `/privacy` and `/terms` set to `noindex`

## E. Redirects & canonical host
- [ ] `http://*` → `https://*` (301)
- [ ] non-www → `https://www.allspeechesgreatandsmall.com` (301)
- [ ] **Export current URL list from GSC → Pages**, then 301 any old slug that differs to its new
      equivalent. Confirm-against-GSC list (old → new):
  - [ ] old groom service URL → `/groom-speech-writer`
  - [ ] old father-of-bride service URL → `/father-of-the-bride-speech-writer`
  - [ ] old maid-of-honour service URL → `/maid-of-honour-speech-writer`
  - [ ] old eulogy service URL → `/eulogy-writing-service`
  - [ ] old groom guide URL → `/groom-speeches`
  - [ ] old FOTB guide URL → `/father-of-the-bride-speeches`
  - [ ] old eulogy guide URL → `/eulogy-examples`
  - These slugs are preserved (no redirect if identical): `/`, `/best-man-speeches/`, `/moh-speeches`,
    `/about-adrian-simpson-speechwriter/`, `/best-man-speech-writer/`, `/speech-review-service`,
    `/contact`, `/blogs/`
- [ ] Zero 404s on any URL that currently gets impressions

## F. Pre-flight
- [ ] Production is indexable — no stray `noindex`, no `Disallow: /`
- [ ] Footer NAP block byte-identical on every page (name, East Sussex, phone)
- [ ] Images compressed/WebP, lazy-loaded; PageSpeed Insights green
- [ ] Analytics + Google Search Console + Bing Webmaster connected

## G. Launch day (one sitting)
- [ ] Point domain at new site; force www + https
- [ ] Submit `sitemap.xml` in GSC + Bing
- [ ] Request indexing on the top ~10 pages

## H. First 2 weeks
- [ ] Daily: GSC Coverage — kill new 404s / redirect errors immediately
- [ ] Track impressions/clicks vs pre-migration baseline (expect a short dip, then recovery)
- [ ] Baseline AI visibility: test core queries in Google AI Overviews, Perplexity, ChatGPT
- [ ] Begin off-site authority work (PR, guest pieces, directories) — the Top Gear / journalist angle
