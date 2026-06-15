# Per-page JSON-LD — one ready-to-paste block per route

Each `.txt` here is a **single `<script type="application/ld+json">` with an `@graph`** containing
everything that page needs. Auto-generated from `../jsonld.md` (and each guide's Article block from
`../../content/`), so they're always in sync — regenerate, don't hand-edit.

## How to use (the end pass)
1. **`global.txt`** → paste once into the **root layout `head()`** (site-wide). Fill `[RATING]`.
2. For every other route, paste its file into **that page's `head()`**.
3. Fill any remaining `[TOKEN]`s (rating, review count/text, after-dinner price).
4. Confirm it's in the **prerendered HTML** (`curl … | grep ld+json`) and validate in the
   Rich Results Test.

## Files → routes
| File | Route | Contains |
|---|---|---|
| `global.txt` | site-wide layout | ProfessionalService, WebSite |
| `home.txt` | `/` | FAQPage |
| `best-man-speech-writer.txt` | `/best-man-speech-writer/` | Service, FAQPage, Breadcrumb |
| `groom-speech-writer.txt` | `/groom-speech-writer` | Service, FAQPage, Breadcrumb |
| `father-of-the-bride-speech-writer.txt` | `/father-of-the-bride-speech-writer` | Service, FAQPage, Breadcrumb |
| `maid-of-honour-speech-writer.txt` | `/maid-of-honour-speech-writer` | Service, FAQPage, Breadcrumb |
| `eulogy-writing-service.txt` | `/eulogy-writing-service` | Service, FAQPage, Breadcrumb |
| `speech-review-service.txt` | `/speech-review-service` | Service, FAQPage, Breadcrumb |
| `after-dinner-speeches.txt` | `/after-dinner-speeches/` | Service, FAQPage, Breadcrumb |
| `best-man-speeches.txt` | `/best-man-speeches/` | Article, FAQPage, Breadcrumb |
| `groom-speeches.txt` | `/groom-speeches` | Article, FAQPage, Breadcrumb |
| `father-of-the-bride-speeches.txt` | `/father-of-the-bride-speeches` | Article, FAQPage, Breadcrumb |
| `moh-speeches.txt` | `/moh-speeches` | Article, FAQPage, Breadcrumb |
| `eulogy-examples.txt` | `/eulogy-examples` | Article, FAQPage, Breadcrumb |
| `about-adrian-simpson-speechwriter.txt` | `/about-adrian-simpson-speechwriter/` | Person, AboutPage, Breadcrumb |
| `reviews.txt` | `/reviews` | Product/AggregateRating/Review, Breadcrumb |
| `pricing.txt` | `/pricing` | Offer, FAQPage, Breadcrumb |
| `contact.txt` | `/contact` | ContactPage, Breadcrumb |
| `blog-post-template.txt` | `/$slug` | Article (fill per post) |

`/privacy` and `/terms`: no schema (noindex). The global block still applies site-wide.
