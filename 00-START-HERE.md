# All Speeches Great & Small — Lovable Rebuild Kit

Everything you need to rebuild the site in Lovable **without losing SEO equity** and to fix the AI-visibility problem.

**Domain (canonical host):** `https://www.allspeechesgreatandsmall.com` (keep `www`, 301 the non-www).
**URL strategy:** PRESERVE all existing slugs. New design, same URLs = ranking history kept.

## The files in this kit
1. `00-START-HERE.md` — this file (read first)
2. `lovable-prompts.md` — one copy-paste Lovable prompt per page
3. `schema-jsonld.md` — every JSON-LD block, ready to drop in
4. `technical-files-and-redirects.md` — robots.txt, llms.txt, sitemap notes, 301 redirect map, launch checklist

---

## ⚠️ STOP — do this before building 18 pages

Lovable ships **client-side-rendered React SPAs**. By default, crawlers get an empty `<div id="root">`. That is fatal for SEO and AI visibility. Your goal REQUIRES pre-rendered HTML.

**Foundation test (build ONE page, then run these — all must pass before continuing):**
1. `curl -s https://[staging-url]/best-man-speech-writer/ | grep -i "best man"` → must return body text.
2. `curl -s https://[staging-url]/best-man-speech-writer/ | grep "application/ld+json"` → must return your schema.
3. Load the page in a browser with **JavaScript disabled** → content must be readable.

If any fail: enable prerendering on your host (Netlify/Vercel/Cloudflare + prerender.io or a static prerender step) and retest. **Do not migrate content pages until these pass.** If you cannot make them pass, keep the guide/content pages on a server-rendered stack and use Lovable only for the brand/brochure layer.

---

## Build order (follow exactly)
1. **Prove prerendering** (test above) on a throwaway page.
2. **Prompt 0 — Global setup**: design system, header, footer, NAP, SEO/meta infrastructure, global schema.
3. **Templates**: build the Service template and Guide template as reusable components.
4. **Pages, in this order**:
   Home → 6 Service pages → 5 Guides → About → Reviews → Pricing → Contact → Blog → Legal.
5. **Technical files**: robots.txt, sitemap.xml, llms.txt (see `technical-files-and-redirects.md`).
6. **Migrate**: set 301s, connect domain, submit sitemap in Search Console, monitor 2 weeks.

## How to use the prompts
- Paste Prompt 0 first. Then paste each page prompt in order.
- Every page prompt tells Lovable to inject the matching JSON-LD from `schema-jsonld.md` into the page `<head>` **and ensure it appears in prerendered HTML**.
- Replace ALL bracketed placeholders: `[RATING]`, `[REVIEW_COUNT]`, `[MONTH YEAR]`, real testimonials, real prices.
- Never fabricate ratings/review counts — pull real numbers from reviews.co.uk.

## The two big levers (don't skip)
- **Intent split**: Service pages = "hire me" (convert + rank for "X speech writer"). Guides = helpful, FAQ-structured, dated (win snippets + AI answers). Cross-link each pair.
- **Machine-readable authority**: AggregateRating/Review schema + consistent entity (`sameAs`) + FAQPage on every guide. This is what makes AI engines "see" your authority.
