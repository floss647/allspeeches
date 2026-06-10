# Blog Migration Plan — one coherent site (Lovable + Supabase)

Goal: bring all ~150 blog posts into the same Lovable site, on their EXACT existing URLs, each prerendered (real HTML for crawlers/AI), with a working way to publish new posts.

## Architecture
- **Supabase** stores posts (Lovable's native integration).
- **Dynamic route** renders each post from the database.
- **On-demand prerendering** turns each dynamic post into static HTML for crawlers — and auto-handles new posts you publish later.

### Supabase `posts` table
| column | type | notes |
|---|---|---|
| id | uuid (pk) | auto |
| slug | text (unique) | MUST match the old URL exactly, e.g. `groom-speech-family-misfortunes` |
| title | text | post H1 + <title> |
| body | text (markdown or HTML) | the article content |
| excerpt | text | for index cards |
| meta_description | text | <meta description> |
| category | text | best-man / groom / father-of-the-bride / etc. |
| published_date | date | shown as byline date + Article schema |
| updated_date | date | Article dateModified |
| status | text | draft / published |

## ⚠️ Routing caveat (important)
Your posts live at ROOT-level slugs (`/groom-speech-...`), the same level as `/about...`, `/contact`, `/pricing`. So:
- All explicitly-defined pages (home, services, guides, about, etc.) must take **precedence**.
- A **catch-all `/:slug`** route handles everything else: look up `slug` in Supabase → render the post if found → **return a proper 404 if not found** (never a soft 200 empty page).
- The blog index stays at `/blogs/` with pagination `/blogs/page-2` … (match old pagination URLs).

## Prerendering (the make-or-break)
Database content rendered client-side is invisible to Google/AI. Options:
1. **On-demand prerender service** (e.g. prerender.io via your host) — renders + caches each URL on first crawl. Best for ongoing publishing: new posts get prerendered automatically. RECOMMENDED.
2. **Build-time static generation** — build fetches all posts from Supabase and emits static HTML per slug. SEO-solid, but you must rebuild to publish a new post.

**Test ONE dummy post before migrating anything** (see test below).

## Per-post SEO requirements
- Unique `<title>` and `<meta description>` from the row.
- Self-referencing canonical on the exact slug.
- Article JSON-LD (author = Adrian, datePublished, dateModified).
- BreadcrumbList (Home → Blog → Post).
- Visible byline + date.
- Internal links to the relevant guide + service page.

## Export options (getting 150 posts out)
- **Joomla admin (best):** export articles (DB export, or a Joomla CSV/export extension) → clean into the table columns.
- **Crawl fallback (your own content):** use wget/httrack to pull each URL from the sitemap, extract the article body, convert to markdown. Works without back-end access.
- Either way, capture: slug (from URL), title, body, date, category.

## Import
- Format the export as a CSV matching the table columns → import into Supabase (dashboard CSV import).

## URL preservation
- Every old post slug → identical new slug. Zero changes ideally.
- Any slug that must change → 301 old→new.
- Rebuild the **sitemap** to include ALL posts (your current sitemap is missing ~100 of them — fix this).

## Phase plan
1. ✅ Test prerendering on ONE dummy post (below). Go/no-go.
2. Build the real `posts` table + index + dynamic route + 404.
3. Export → clean → import all posts.
4. Verify a sample of live post URLs (curl + JS-off).
5. Regenerate sitemap; submit in Search Console.
6. Launch; monitor coverage for 404s.

---

## THE TEST — prove it before committing

### Prompt 1 — build the test
Paste into Lovable:

> Connect Supabase to this project. Create a table called `posts` with columns: id (uuid, pk, default uuid), slug (text, unique), title (text), body (text), excerpt (text), meta_description (text), category (text), published_date (date), updated_date (date), status (text). 
> Insert ONE test row: slug = "test-prerender-post", title = "Test Prerender Post", body = "This is a unique test sentence: PRERENDER-PROOF-12345.", meta_description = "Test post for prerender verification.", category = "test", published_date = today, status = "published".
> Build a catch-all dynamic route at root level `/:slug` that: looks up the slug in `posts`; if found and status=published, renders the post (H1 = title, body, visible byline "By Adrian Simpson · [published_date]"); if not found, returns a real 404. IMPORTANT: all existing defined routes (home, services, guides, about, contact, pricing, etc.) must take precedence over this catch-all.
> For the post page set: <title> from title, <meta description> from meta_description, self-referencing canonical, and inject Article JSON-LD (author Adrian Simpson @id https://www.allspeechesgreatandsmall.com/about-adrian-simpson-speechwriter/#adrian, datePublished from published_date) into the head.
> CRITICAL: this post's content lives ONLY in Supabase. It must be PRERENDERED so the title, body, meta and JSON-LD appear in the raw server HTML before any JavaScript runs. Configure on-demand prerendering (or static generation) for the dynamic route on the production/staging deploy.

### Test verification (run after deploy)
The dummy content is in the database, NOT in the code — so if it shows up in raw HTML, prerendering of dynamic content works.
1. `curl -s https://[staging]/test-prerender-post | grep "PRERENDER-PROOF-12345"` → MUST return the sentence.
2. `curl -s https://[staging]/test-prerender-post | grep "application/ld+json"` → MUST return the Article schema.
3. Load `/test-prerender-post` with JavaScript disabled → body text visible.
4. `curl -s https://[staging]/this-slug-does-not-exist` → should be a 404, not an empty 200.

- ALL pass → green light, migrate all 150.
- ANY fail → fix prerendering for dynamic routes first; do NOT migrate yet.
