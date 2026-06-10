# Execution Order — what to do, when

Follow this top to bottom. Don't jump ahead — step 1 can sink the whole project.

## Phase 0 — Prove the foundation (Day 1) — BLOCKING
1. In Lovable, build ONE throwaway page with a paragraph of text + a JSON-LD block.
2. Deploy to staging, then run the foundation test from `00-START-HERE.md`:
   - `curl` shows body text ✔
   - `curl` shows `application/ld+json` ✔
   - Page readable with JavaScript disabled ✔
3. **All three pass → continue. Any fail → fix prerendering before building anything else.** If it can't be fixed, keep the guides on your current Joomla stack and use Lovable only for the brand layer.

## Phase 1 — Skeleton (Days 1–2)
4. Paste **Prompt 0** (global setup) from `lovable-prompts.md` — design system, header, footer, NAP, SEO/meta system, routes.
5. Inject the **global JSON-LD** (ProfessionalService + WebSite) from `schema-jsonld.md`.
6. Add `robots.txt`, `sitemap.xml`, `llms.txt` from `technical-files-and-redirects.md`.

## Phase 2 — Money pages first (Days 2–4)
Build the pages that earn, in this order. Use the page prompt + paste the page copy from `content/`:
7. Home → `content/home.md`
8. Best Man service → Groom → Father of the Bride → Maid of Honour → Eulogy → Speech Review → `content/services.md`
9. Pricing, Contact, About → `content/about.md`, `content/reviews-pricing-contact.md`
10. Reviews → `content/reviews-pricing-contact.md` (drop in REAL reviews.co.uk numbers + testimonials)

## Phase 3 — The AI/SEO engine (Days 4–7)
Build the guides — this is what wins snippets and AI answers:
11. Best Man Guide → `content/guide-best-man.md`
12. Groom Guide → `content/guide-groom.md`
13. Father of the Bride Guide → `content/guide-father-of-the-bride.md`
14. Maid of Honour Guide → `content/guide-maid-of-honour.md`
15. Eulogy Guide → `content/guide-eulogy.md`
16. For each guide: add visible byline + "Updated [Month Year]", and the Article + FAQPage JSON-LD.

## Phase 4 — Cross-linking & schema pass (Day 7)
17. Confirm every Service ↔ Guide pair links both ways.
18. Confirm correct JSON-LD on every page (use the map in `schema-jsonld.md`).
19. Validate all schema in Google Rich Results Test.

## Phase 5 — Migration (launch day) — do in one sitting
20. Export current URL list from Search Console → Pages.
21. Finalise the 301 redirect map (`technical-files-and-redirects.md`). Every currently-ranking URL preserved or 301'd.
22. Run the full pre-launch checklist.
23. Point the domain at the new site. Force www + https.
24. Submit `sitemap.xml` in Google Search Console + Bing. Request indexing on the top 10 pages.

## Phase 6 — Watch & build authority (Weeks 1–8)
25. Daily for 2 weeks: GSC Coverage — kill any new 404s / redirect errors immediately.
26. Track impressions/clicks vs your pre-migration baseline. Expect a 1–2 week dip, then recovery.
27. Baseline AI visibility: test your core queries in Google AI Overviews, Perplexity, ChatGPT now, and again at week 8.
28. Start off-site authority work (PR, guest articles, directories) — the one lever on-page work can't pull. Use the Top Gear / journalist angle.

---

### Fill-in checklist (only you have these)
- [ ] Real `[RATING]` and `[REVIEW_COUNT]` from reviews.co.uk → into schema, footer, home, reviews page
- [ ] Real testimonials (name + text) → reviews page, home, service pages
- [ ] Confirm old slugs for groom / FOTB / eulogy pages from GSC → redirect map
- [ ] Real turnaround times → service pages (replace "[X] days")
- [ ] Confirm eulogy & speech-review prices (if not £399)

### British English note
All copy in `content/` uses British spelling (honour, personalise, organise, whilst, recognise, theatre, £). Keep it consistent if you edit — and set your Lovable/content tone instruction to "British English (UK spelling)".
