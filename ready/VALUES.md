# Confirmed values — fill these tokens everywhere

Source of truth for the data only Adrian has. Apply across the Lovable pages, `ready/jsonld.md`,
footer, and `ready/llms.txt`.

## ✅ Confirmed
| Token | Value | Appears on |
|---|---|---|
| `[X]` (turnaround) | **7 days** (1 week) | home, all service pages, pricing |
| `[your email]` | **adrian@allspeechesgreatandsmall.com** | contact |
| Payment terms | **Full payment up front when you book** | pricing "When do I pay?" |
| Wedding speech price | **£399** | home, services, pricing |
| Eulogy price | **£399** (in schema only — keep eulogy page copy gentle/price-free) | eulogy schema, pricing |
| Speech review price | **£399** | speech-review schema, pricing |
| Reviews source | reviews.io store **`all-speeches-great-and-small`** (live carousel widget) | reviews page, home reviews section |
| `[REVIEW_COUNT]` | **421** | home, reviews, every service page, footer, global schema, reviews schema, llms.txt |
| `[RATING]` | **4.9** | home, reviews, every service page, footer, global schema, reviews schema |
| After-dinner price | **from £499** (longer/more involved than weddings) | after-dinner page + its Service schema |
| Redirect map | **built from GSC export** → `redirect-map.md` | — |
| Contact reply time | **within one working day** | contact ("I aim to reply within …") |

## ✅ All page-copy tokens resolved
Remaining placeholders are **legal/business details** in `ready/legal/` (ICO reg, address, etc.) —
see those files. Reviews testimonials come from the reviews.io widget, not tokens.

## Find-and-replace for your page copy
- `[RATING]` → `4.9`
- `[REVIEW_COUNT]` → `421`
- `[X] days` → `7 days`  (e.g. "delivery in 7 days", "drafted within 7 days")
- `[your email]` → `adrian@allspeechesgreatandsmall.com`
- After-dinner page → price is **from £499** (already filled in `after-dinner-speeches-PAGE.md`)
- Pricing → "When do I pay?" answer → **"Full payment up front when you book."**
- Pricing → eulogy line → **"A eulogy is also £399 — the same flat price, written with the same care and no rush."**
- Pricing → speech-review line → **"£399."**
- Contact → "I aim to reply within [X hours/one working day]" → **"within one working day"** (adjust if you prefer)
- Testimonials (`[Real testimonial] — [Name]`) → use the **reviews.io carousel widget** instead of pasting quotes

## Note on the £399 + full-payment-up-front
Showing a flat price with `availability: InStock` and full prepayment is fine for SEO. Just make
sure your Terms page covers the prepayment + the "unlimited revisions until you're happy" promise,
since there's no staged/deposit fallback.
