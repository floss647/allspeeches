# Redirect map — built from GSC Coverage export (10 June 2026)

Based on **186 indexed URLs** in Search Console. Healthy traffic (~2,000 impressions/day), so the
goal is **zero 404s on any URL that currently ranks**.

## The headline: the blog is the bulk, and it's preserved for free
**150 of your 186 indexed pages are blog posts on root-level slugs** (e.g.
`/grooms-speech-death-thanks`, `/how-to-deliver-your-best-man-speech`). The new build serves blog
posts at `/$slug` from the `posts` table.

➡️ **Import every post into the `posts` table with its EXACT current slug** (list in
`blog-slugs-to-preserve.txt`). Same slug = same URL = ranking kept, **no redirect needed for any of
the 150.** This is the single most important migration task — get the slugs identical and 80% of
your SEO risk disappears.

---

## A. Host-level 301s (always)
| From | To |
|---|---|
| `http://*` | `https://*` (same path) |
| `https://allspeechesgreatandsmall.com/*` (non-www) | `https://www.allspeechesgreatandsmall.com/*` |
| `https://bestman.allspeechesgreatandsmall.com/*` (old subdomain — still indexed!) | `https://www.allspeechesgreatandsmall.com/best-man-speech-writer/` |

## B. Identical slugs — KEEP, no redirect (8)
`/` · `/best-man-speech-writer/` · `/best-man-speeches/` · `/moh-speeches` ·
`/speech-review-service` · `/about-adrian-simpson-speechwriter/` · `/contact` · `/blogs/`

## C. Old structural/service URLs → 301 to new (16)
| Old URL (currently indexed) | 301 → |
|---|---|
| `/best-man-speech-writing-service/` | `/best-man-speech-writer/` |
| `/groom-speech-writing-service/` | `/groom-speech-writer` |
| `/groom-speech-writing-services` | `/groom-speech-writer` |
| `/the-grooms-speech/` | `/groom-speech-writer` *(verify: service vs guide)* |
| `/father-bride-speech-writing-service/` | `/father-of-the-bride-speech-writer` |
| `/father-of-the-bride-speech/` | `/father-of-the-bride-speech-writer` *(verify: service vs guide)* |
| `/father-of-the-bride-speech/jokes/` | `/father-of-the-bride-speeches` |
| `/eulogy-writer/` | `/eulogy-writing-service` |
| `/testimonials` | `/reviews` |
| `/privacy-policy` | `/privacy` |
| `/terms-and-conditions` | `/terms` |
| `/cookies-policy` | `/privacy` *(or a dedicated cookies page)* |
| `/calendly-booking-2` | `/contact` |
| `/thank-you-coaching` | `/` *(better: set noindex — these are post-purchase pages)* |
| `/thank-you-edit` | `/` *(better: noindex)* |
| `/thank-you-ai-bespoke` | `/` *(better: noindex)* |

## D. Needs your decision (2)
| Old URL | Issue |
|---|---|
| `/after-dinner-speeches/` | **No equivalent in the new build.** You used to offer after-dinner speeches. Recreate it as a service page (preserve the URL), or 301 it to `/` or the closest service? |
| `/father-of-the-bride-199` | Looks like an old price/checkout page. 301 to `/father-of-the-bride-speech-writer`, or is it still needed? |

## E. Blog pagination (10 indexed: `/blogs/page-2` … `/blogs/page-14`)
The new `/blogs/` index needs pagination. Either **keep the `/blogs/page-N` URL pattern** (cleanest —
preserves these), or **301 them all to `/blogs/`** if you change the pattern. Don't leave them 404.

## F. The 150 blog posts → preserve slugs (no redirects)
See `blog-slugs-to-preserve.txt`. Import each into `posts` with the identical slug. Spot-check a few
after launch (`/grooms-speech-death-thanks`, `/how-to-deliver-your-best-man-speech`) return 200.

## G. Already-broken / param URLs (from the 404 + duplicate-canonical buckets)
- `/index.php`, `/home` → 301 to `/`
- `/cookies-and-privacy-policy` (404) → `/privacy`
- `https://allspeechesgreatandsmall.com/about/` (non-www, 404) → covered by host 301 + `/about/` → `/about-adrian-simpson-speechwriter/`
- `/bms1/`, `/gss1/`, `/father-bride-2/` (already 404) → low priority; 301 to the matching service only if they have backlinks, else leave
- `?gclid=…`, `?add_to_wishlist=…`, `?order=…` query-string URLs → ensure the new site emits a **self-canonical that ignores query params** (handles these automatically; no manual redirect needed)

## H. Note: the old site looks like WooCommerce/WordPress
`add_to_wishlist`, `index.php`, `/blogs/page-N`, `?gclid` params point to a WordPress/Woo stack.
After launch, watch GSC Coverage for any straggler `/wp-*` or `?` URLs and canonical/redirect them.
