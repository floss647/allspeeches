# What to give Lovable — build handoff (paste in order)

Everything Lovable needs to finish the site, in sequence. Each **>blockquote** is a prompt to paste.
Where it says "paste the copy from X", open that file and paste its body. British English throughout.
Canonical host `https://www.allspeechesgreatandsmall.com`. Keep all existing slugs exactly (including
trailing slashes on `/best-man-speech-writer/`, `/best-man-speeches/`, `/after-dinner-speeches/`,
`/about-adrian-simpson-speechwriter/`, `/blogs/`).

---

## STEP 1 — Add the new route + finish the nav
> Add a new SSR route at `/after-dinner-speeches/` (keep the trailing slash). Add "After Dinner" to
> the Services dropdown in the header and to the Services column in the footer, between "Eulogy" and
> "Speech Review". Confirm these routes all exist with unique `head()` meta + self-referencing
> canonical: `/`, `/best-man-speech-writer/`, `/groom-speech-writer`, `/father-of-the-bride-speech-writer`,
> `/maid-of-honour-speech-writer`, `/eulogy-writing-service`, `/speech-review-service`,
> `/after-dinner-speeches/`, `/best-man-speeches/`, `/groom-speeches`, `/father-of-the-bride-speeches`,
> `/moh-speeches`, `/eulogy-examples`, `/about-adrian-simpson-speechwriter/`, `/reviews`, `/pricing`,
> `/contact`, `/blogs/`, `/privacy`, `/terms`. Each canonical must match its slug's trailing slash exactly.

## STEP 2 — Reviews widget component
> Create a `ReviewsCarousel` React component that loads the reviews.io carousel. On mount, inject
> (once, guarding against duplicates) the script `https://widget.reviews.co.uk/carousel-inline-iframeless/dist.js`
> and the stylesheets `https://assets.reviews.io/css/widgets/carousel-widget.css` and
> `https://assets.reviews.io/iconfont/reviewsio-icons/style.css`. Render `<div id="reviewsio-carousel-widget" />`
> and, after the script loads, call `new carouselInlineWidget('reviewsio-carousel-widget', { store: 'all-speeches-great-and-small', ... })`.
> Use the options/styles config I'll paste next. Set the widget fonts to `inherit` so it uses our
> Inter/Bricolage. Place it in the Reviews page main section and the homepage "Featured reviews" section.

Then paste your full reviews.io `options`/`styles` config block (the one from your widget snippet).

## STEP 3 — Contact form + submission
> On `/contact`, build a contact form with fields: Name, Email, Phone (optional), Type of speech
> (select: Best Man / Groom / Father of the Bride / Maid of Honour / Eulogy / Speech Review /
> After Dinner / Other), Date of occasion, Message. On submit, insert the data into a new Supabase
> table `enquiries` (id, created_at, name, email, phone, speech_type, occasion_date, message) and
> show a thank-you confirmation. Also email a notification to adrian@allspeechesgreatandsmall.com.
> Validate required fields. Reply-time note on the page: "I aim to reply within one working day."

## STEP 4 — Fill the placeholder pages with copy
Paste each page's copy, telling Lovable: *"Replace the placeholder content on `[route]` with this
copy, keep the existing layout/header/footer and head/meta, British English."*

| Route | Copy source |
|---|---|
| `/` (confirm tokens) | your homepage copy — fill 4.9 rating, 421 reviews, 7-day, use the widget for testimonials |
| 6 service pages | your service copy |
| `/after-dinner-speeches/` | `after-dinner-speeches-PAGE.md` (this repo) |
| 5 guides | your **ENHANCED** guide copy (`content/guide-*-ENHANCED.md`) — keep the visible byline + "Updated June 2026" |
| `/about-adrian-simpson-speechwriter/` | your About copy |
| `/reviews` | your Reviews copy + the ReviewsCarousel |
| `/pricing` | your Pricing copy — £399; eulogy & review £399; after-dinner from £499; "Full payment up front when you book" |
| `/contact` | built in Step 3 |
| `/privacy` | `legal/privacy.md` (this repo) — set page to `noindex` |
| `/terms` | `legal/terms.md` (this repo) — set page to `noindex` |

Global find/replace across all copy: `[RATING]`→`4.9`, `[REVIEW_COUNT]`→`421`, `[X] days`→`7 days`,
`[your email]`→`adrian@allspeechesgreatandsmall.com`.

## STEP 5 — Technical files
> Serve these three files at the site root, reachable as plain text:
> - `/robots.txt` — paste contents of `ready/robots.txt`
> - `/llms.txt` — paste contents of `ready/llms.txt`
> - `/sitemap.xml` — generate from the live routes with real `<lastmod>` dates; include all indexable
>   routes + all blog posts; exclude `/privacy` and `/terms`. (Use `ready/sitemap.xml` as the template.)

## STEP 6 — Schema injection (do this pass at the END, once copy is final)
> Inject JSON-LD into the prerendered `<head>` of each page (it must appear in the raw SSR HTML).
> - Global: paste `ready/jsonld-by-page/global.txt` into the root layout head (every page).
> - Each route: paste its matching file from `ready/jsonld-by-page/` into that page's head.
> The FAQ text in the schema must stay identical to the visible FAQ copy on each page.

## STEP 7 — Blog migration (the big data task)
The old site has **~150 indexed blog posts on root-level slugs** (list: `ready/blog-slugs-to-preserve.txt`).
> Import each old post into the `posts` table **keeping its exact existing slug** (so it serves at the
> same `/$slug` URL — no redirect needed). Map old title/body/excerpt/meta/date into the table columns.
> Keep `/blogs/` index pagination on the `/blogs/page-N` pattern (those URLs are indexed).

You'll need to export the post content from the current site (WordPress) first; this step is about
preserving slugs, not rewriting content.

## STEP 8 — Redirects (host config)
Set these per `ready/redirect-map.md`:
> - `http://*` → `https://*`; non-www → `https://www.allspeechesgreatandsmall.com`
> - `bestman.allspeechesgreatandsmall.com/*` → `/best-man-speech-writer/`
> - The 18 old structural URLs in `redirect-map.md` table C (e.g. `/testimonials`→`/reviews`,
>   `/eulogy-writer/`→`/eulogy-writing-service`, `/the-grooms-speech/`→`/groom-speeches`,
>   `/privacy-policy`→`/privacy`, `/index.php`→`/`, etc.)
> - Self-canonical must ignore query strings (`?gclid`, `?add_to_wishlist`, `?order`).

## STEP 9 — Pre-launch checks (`ready/launch-checklist.md`)
> Run the foundation test on staging: `curl -s [url]/best-man-speech-writer/ | grep -i "best man"`
> and `| grep "application/ld+json"` must both return content; the page must read with JavaScript off.
> Then validate a few pages in search.google.com/test/rich-results. Work down the full checklist.

---

### Hand these files to Lovable / keep open while building
- Copy: your service + guide + home + about + reviews + pricing files, plus `after-dinner-speeches-PAGE.md`, `legal/privacy.md`, `legal/terms.md`
- Schema: `jsonld-by-page/` (one file per route) + `global.txt`
- Technical: `robots.txt`, `llms.txt`, `sitemap.xml`
- Migration: `redirect-map.md`, `blog-slugs-to-preserve.txt`
- Reference: `VALUES.md` (all confirmed data), `launch-checklist.md`
