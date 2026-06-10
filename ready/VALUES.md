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

## ⏳ Still needed
| Token | Where to get it | Appears on |
|---|---|---|
| `[RATING]` | reviews.io dashboard — the **exact decimal** (e.g. 4.91), not the rounded 5 stars | home, reviews, every service page, footer, global schema, reviews schema |
| Contact reply time | your call — suggest **"one working day"** | contact ("I aim to reply within …") |
| Old URLs for 301s | GSC → Indexing → Pages export | redirect map (`launch-checklist.md` §E) |

## Find-and-replace for your page copy
- `[X] days` → `7 days`  (e.g. "delivery in 7 days", "drafted within 7 days")
- `[your email]` → `adrian@allspeechesgreatandsmall.com`
- Pricing → "When do I pay?" answer → **"Full payment up front when you book."**
- Pricing → eulogy line → **"A eulogy is also £399 — the same flat price, written with the same care and no rush."**
- Pricing → speech-review line → **"£399."**
- Contact → "I aim to reply within [X hours/one working day]" → **"within one working day"** (adjust if you prefer)
- Testimonials (`[Real testimonial] — [Name]`) → use the **reviews.io carousel widget** instead of pasting quotes

## Note on the £399 + full-payment-up-front
Showing a flat price with `availability: InStock` and full prepayment is fine for SEO. Just make
sure your Terms page covers the prepayment + the "unlimited revisions until you're happy" promise,
since there's no staged/deposit fallback.
