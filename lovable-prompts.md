# Lovable Build Prompts — one per page

Paste in order. Replace every `[PLACEHOLDER]`. Domain: `https://www.allspeechesgreatandsmall.com`.
JSON-LD blocks referenced here live in `schema-jsonld.md`.

---

## PROMPT 0 — Global setup (paste first)

> Build the foundation for a professional wedding speech-writing website called "All Speeches Great & Small". 
>
> **CRITICAL SEO REQUIREMENT:** Every page must serve fully pre-rendered static HTML — page content, unique meta tags, and JSON-LD structured data must be present in the raw HTML source before JavaScript runs. Set up per-route meta tags (title, description, canonical, Open Graph, Twitter card) using react-helmet-async or equivalent, and ensure JSON-LD `<script type="application/ld+json">` blocks render into the document head. Configure the build/deploy for prerendering.
>
> **Design system:** Elegant, editorial, trustworthy — think premium wedding stationery. Serif display headings, clean sans-serif body, generous whitespace, a refined accent colour (deep navy or burgundy), high-quality photography. Fully responsive, accessible (WCAG AA), fast (lazy-load images, WebP, minimal JS).
>
> **Global header (every page):** Logo (links home). Nav: Services (dropdown: Best Man, Groom, Father of the Bride, Maid of Honour, Eulogy, Speech Review), Guides, Reviews, About, Contact. A persistent CTA button "Get my speech written — £399". Sticky on scroll.
>
> **Global footer (every page):** Business name + address (East Sussex, UK) + phone (0207 993 6524) — keep this NAP block byte-identical on every page. Columns linking to all service pages and all guide pages. A review badge "Rated [RATING]/5 from [REVIEW_COUNT] reviews" linking to reviews.co.uk. Social links (LinkedIn, Facebook, X, YouTube). Legal links (Privacy, Terms).
>
> **Global structured data:** Inject the ProfessionalService + WebSite JSON-LD (I will provide) site-wide into the head.
>
> **Canonical host:** www.allspeechesgreatandsmall.com. Self-referencing canonical on every page.
>
> Set up routes for: / , /best-man-speech-writer/ , /groom-speech-writer , /father-of-the-bride-speech-writer , /maid-of-honour-speech-writer , /eulogy-writing-service , /speech-review-service , /best-man-speeches/ , /groom-speeches , /father-of-the-bride-speeches , /moh-speeches , /eulogy-examples , /about-adrian-simpson-speechwriter/ , /reviews , /pricing , /contact , /blogs/ , /privacy , /terms . Keep these exact URL slugs.

---

## PROMPT 1 — Homepage `/`

> Build the homepage at `/`.
> **SEO:** Title `Professional Wedding Speech Writer | All Speeches Great & Small`. Meta description `The UK's most-reviewed wedding speech writer. Bespoke best man, groom & father of the bride speeches from £399 — no templates, no clichés. [REVIEW_COUNT]+ 5★ reviews.` Self-canonical. OG image = hero. Inject WebSite + FAQPage JSON-LD.
> **H1:** "Make your words unforgettable: bespoke speech writing for every occasion."
> **Sections in order:**
> 1. Hero — H1, subhead, primary CTA "Get my speech written — £399", trust strip (star rating, "[REVIEW_COUNT] reviews", "As seen on BBC").
> 2. "Just some of the speeches I write" — 6 cards (Best Man, Groom, Father of the Bride, Maid of Honour, Eulogy, Speech Review) each linking to its SERVICE page.
> 3. "Why work with me" — Adrian Simpson credibility: former magazine journalist and BBC Top Gear presenter, 15 years in TV, writing professionally since 2012; philosophy "no templates, no cut-and-paste jokes, no clichés." Link to /about-adrian-simpson-speechwriter/.
> 4. "How it works" — 3 steps: tell me your stories → I write your draft → unlimited tweaks to perfection.
> 5. Featured reviews — 3–4 real testimonials, link to /reviews.
> 6. Pricing teaser — flat £399 for wedding speeches, link to /pricing.
> 7. Mini-FAQ — 3 questions (How does it work? How long does it take? Is it really original?), each with a direct answer. Add FAQPage schema.
> 8. Final CTA band.

---

## SERVICE PAGE TEMPLATE (use for prompts 2–7)

> Build a service ("hire me") page at `[URL]`. Conversion-focused, 800–1,200 words.
> **SEO:** Title `[TITLE]`. Meta `[META]`. Self-canonical. Inject Service + FAQPage + BreadcrumbList JSON-LD (I will provide, with serviceType "[SERVICE TYPE]" and price 399 GBP).
> **H1:** `[H1]`.
> **Sections:** 1) Hero (H1, one-line value prop, CTA, trust strip). 2) "What you get" — 100% original, written around your stories, unlimited revisions, delivery in [X] days. 3) "How it works" — questionnaire → first draft → revisions → final. 4) "Why Adrian" — short credibility block, link /about. 5) Reviews relevant to this speech type. 6) Price (£399, what's included), link /pricing. 7) Soft cross-link: "[GUIDE CROSS-LINK SENTENCE]" linking to `[GUIDE URL]`. 8) FAQ (5–7 Qs) with FAQPage schema. 9) Final CTA.

### PROMPT 2 — Best Man service `/best-man-speech-writer/`
- TITLE: `Best Man Speech Writer | Bespoke & Original from £399`
- META: `Hire the UK's top-rated best man speech writer. 100% original, built around your stories — no templates. Trusted by hundreds of best men. Get started today.`
- H1: `Best Man Speech Writer`
- SERVICE TYPE: `Best man speech writing`
- GUIDE URL: `/best-man-speeches/` — cross-link: "Prefer to write it yourself? Read our Ultimate Best Man Speech Guide →"
- FAQs: How does the process work? · How long does it take? · Will it sound like me? · What if I don't have good stories? · How do you handle jokes? · Can you help last-minute?

### PROMPT 3 — Groom service `/groom-speech-writer`
- TITLE: `Groom Speech Writer | Heartfelt, Original Speeches from £399`
- META: `Hire a professional groom speech writer. Sincere, funny and 100% original — written around your relationship, never a template. UK's most-reviewed speechwriter.`
- H1: `Groom Speech Writer`
- SERVICE TYPE: `Groom speech writing`
- GUIDE URL: `/groom-speeches` — "Want tips first? Read our Groom Speech Guide →"
- FAQs: How does it work? · How do you balance funny and heartfelt? · How do I thank everyone without it dragging? · Turnaround time? · Will it sound like me? · Last-minute help?

### PROMPT 4 — Father of the Bride service `/father-of-the-bride-speech-writer`
- TITLE: `Father of the Bride Speech Writer | From £399`
- META: `A professional father of the bride speech writer. Warm, proud and original — written around your daughter's story, no clichés. The UK's most-reviewed speechwriter.`
- H1: `Father of the Bride Speech Writer`
- SERVICE TYPE: `Father of the bride speech writing`
- GUIDE URL: `/father-of-the-bride-speeches` — "Writing your own? Read our Father of the Bride Guide →"
- FAQs: How does it work? · How do I welcome the groom's family? · How emotional is too emotional? · Turnaround? · Will it sound like me? · Last-minute?

### PROMPT 5 — Maid of Honour service `/maid-of-honour-speech-writer`
- TITLE: `Maid of Honour Speech Writer | Bespoke Speeches from £399`
- META: `Hire a professional maid of honour speech writer. Funny, touching and 100% original — written around your friendship, never a template. UK's most-reviewed.`
- H1: `Maid of Honour Speech Writer`
- SERVICE TYPE: `Maid of honour speech writing`
- GUIDE URL: `/moh-speeches` — "Prefer to write it yourself? Read our Maid of Honour Guide →"
- FAQs: How does it work? · How do I balance funny and sentimental? · What if our story is private? · Turnaround? · Will it sound like me? · Last-minute?

### PROMPT 6 — Eulogy service `/eulogy-writing-service`  (SENSITIVE TONE)
- TITLE: `Eulogy Writing Service | Compassionate, Personal Tributes`
- META: `A compassionate eulogy writing service. A professional writer helps you create a personal, fitting tribute — gently guided, in your words, at a difficult time.`
- H1: `Eulogy Writing Service`
- SERVICE TYPE: `Eulogy writing`
- GUIDE URL: `/eulogy-examples` — "You may also find our guide to writing a eulogy helpful →"
- TONE NOTE: Gentle and respectful. Minimal/soft CTAs, no hard selling, no large price banners. Emphasise care, discretion, and support.
- FAQs: How does the process work at a difficult time? · How quickly can you help? · How do we share memories with you? · How long should a eulogy be? · Is it confidential?

### PROMPT 7 — Speech Review service `/speech-review-service`
- TITLE: `Speech Review Service | Professional Feedback on Your Speech`
- META: `Already written your speech? Get professional feedback from the UK's most-reviewed speechwriter — structure, jokes, timing and delivery, fast and affordable.`
- H1: `Speech Review Service`
- SERVICE TYPE: `Speech review and feedback`
- GUIDE URL: link to the most relevant guide(s).
- FAQs: What do I get back? · How fast? · Will you rewrite or just advise? · What do you check? · How do I send my speech?

---

## GUIDE PAGE TEMPLATE (use for prompts 8–12) — your AI/snippet engine

> Build an informational guide page at `[URL]`. Helpful-first, 2,000–4,000 words, NOT a sales funnel.
> **SEO:** Title `[TITLE]`. Meta `[META]`. Self-canonical. Inject Article + FAQPage + BreadcrumbList JSON-LD (author = Adrian Simpson, datePublished + dateModified = [MONTH YEAR]).
> **H1:** `[H1]`.
> **Directly under H1:** visible byline "By Adrian Simpson, professional speechwriter · Updated [MONTH YEAR]".
> **Body:** Use the question-style H2s below. Under EACH heading, lead with a direct 1–2 sentence answer, then elaborate with detail and examples (this is what AI engines and featured snippets quote). Include at least one full worked example speech/passage.
> **End:** a practical checklist + ONE soft CTA: "Want it written for you? See our [service] →" linking to `[SERVICE URL]`.
> Add FAQPage schema built from the question headings.

### PROMPT 8 — Best Man guide `/best-man-speeches/`
- TITLE: `How to Write a Best Man Speech: Structure, Examples & Tips (2026)`
- META: `A step-by-step guide to writing a best man speech — structure, opening lines, jokes that land, and full examples. Written by a professional speechwriter.`
- H1: `How to Write a Best Man Speech`
- SERVICE URL: `/best-man-speech-writer/`
- H2s: How long should a best man speech be? · How do you start a best man speech? (with example openers) · What should a best man speech include? (structure) · How do you tell jokes without offending anyone? · What are some best man speech examples? (full samples) · How do you end a best man speech (the toast)? · What mistakes should you avoid?

### PROMPT 9 — Groom guide `/groom-speeches`
- TITLE: `How to Write a Groom Speech: Structure, Examples & Tips (2026)`
- META: `How to write a groom speech that's heartfelt and funny — who to thank, what to say to your partner, structure and full examples. By a professional speechwriter.`
- H1: `How to Write a Groom Speech`
- SERVICE URL: `/groom-speech-writer`
- H2s: How long should a groom speech be? · Who should the groom thank, and in what order? · How do you start a groom speech? · What should you say about your partner? · How do you balance funny and heartfelt? · Groom speech examples · Common mistakes to avoid

### PROMPT 10 — Father of the Bride guide `/father-of-the-bride-speeches`
- TITLE: `How to Write a Father of the Bride Speech: Tips & Examples (2026)`
- META: `How to write a father of the bride speech — what to say about your daughter, welcoming the groom, structure, toast and full examples. By a professional speechwriter.`
- H1: `How to Write a Father of the Bride Speech`
- SERVICE URL: `/father-of-the-bride-speech-writer`
- H2s: How long should it be? · How do you start? · What should you say about your daughter? · How do you welcome the groom and his family? · How do you handle emotion? · Father of the bride speech examples · Mistakes to avoid

### PROMPT 11 — Maid of Honour guide `/moh-speeches`
- TITLE: `How to Write a Maid of Honour Speech: Tips & Examples (2026)`
- META: `How to write a maid of honour speech that's funny and touching — structure, opening lines, what to include and full examples. By a professional speechwriter.`
- H1: `How to Write a Maid of Honour Speech`
- SERVICE URL: `/maid-of-honour-speech-writer`
- H2s: How long should it be? · How do you start? · What should a maid of honour speech include? · How do you balance funny and sentimental? · Maid of honour speech examples · How do you end with a toast? · Mistakes to avoid

### PROMPT 12 — Eulogy guide `/eulogy-examples`  (SENSITIVE TONE)
- TITLE: `How to Write a Eulogy: A Gentle Step-by-Step Guide with Examples`
- META: `A compassionate, step-by-step guide to writing a eulogy — what to include, how long it should be, structure and examples. Written by a professional writer.`
- H1: `How to Write a Eulogy`
- SERVICE URL: `/eulogy-writing-service`
- TONE NOTE: Warm, respectful, no hard CTAs.
- H2s: How long should a eulogy be? · How do you start a eulogy? · What should a eulogy include? · How do you write about a difficult relationship? · Eulogy examples · How do you deliver a eulogy without breaking down? · Gentle reminders

---

## PROMPT 13 — About `/about-adrian-simpson-speechwriter/`

> Build the About page at `/about-adrian-simpson-speechwriter/`. This page establishes Adrian as a recognised entity/authority.
> **SEO:** Title `About Adrian Simpson | Professional Wedding Speechwriter`. Meta `Meet Adrian Simpson — former journalist and BBC Top Gear presenter, now the UK's most-reviewed professional wedding speechwriter. The story and the philosophy.` Inject Person + AboutPage JSON-LD.
> **H1:** "About Adrian Simpson".
> **Sections:** Professional photo. Full bio: began as a magazine/motoring journalist at Dennis Publishing in London, became a broadcast TV presenter including BBC Top Gear, 15-year TV career, founded All Speeches Great & Small in 2012. Credentials & media features (link out). The philosophy: every speech original, "no templates, no cut-and-paste jokes." Press/podcast appearances. CTA to services.

---

## PROMPT 14 — Reviews `/reviews`

> Build the Reviews page at `/reviews`.
> **SEO:** Title `Reviews | All Speeches Great & Small ([REVIEW_COUNT]+ 5★)`. Meta `Read genuine customer reviews of All Speeches Great & Small — [REVIEW_COUNT]+ verified reviews of the UK's most-reviewed professional speechwriter.` Inject Review + AggregateRating JSON-LD (real numbers only).
> **H1:** "Verified Reviews".
> **Sections:** Big aggregate rating at top ([RATING]/5 from [REVIEW_COUNT]). Grid of real testimonials (pull from reviews.co.uk), ideally filterable by speech type. Link to the reviews.co.uk profile. CTAs to services.

---

## PROMPT 15 — Pricing `/pricing`

> Build the Pricing page at `/pricing`.
> **SEO:** Title `Speech Writing Prices | From £399 — What's Included`. Meta `Simple, flat-fee speech writing pricing — £399 for a bespoke wedding speech, including unlimited revisions. See exactly what's included.` Inject FAQPage + Offer JSON-LD.
> **H1:** "Speech Writing Prices".
> **Sections:** Clear price card(s): £399 wedding speech, what's included (original writing, your stories, unlimited tweaks, delivery time), eulogy/review pricing if different. Payment/turnaround FAQ. CTAs to services.

---

## PROMPT 16 — Contact `/contact`

> Build the Contact page at `/contact`.
> **SEO:** Title `Contact | All Speeches Great & Small`. Meta `Get in touch with Adrian Simpson to start your speech. Call 0207 993 6524 or send a message — fast, friendly replies. Speeches written worldwide from our UK base.` Inject ContactPage + LocalBusiness JSON-LD.
> **H1:** "Contact".
> **Sections:** Contact form (name, email, occasion/speech type, date, message), phone 0207 993 6524, NAP block, response-time note, service area (UK base, clients worldwide).

---

## PROMPT 17 — Blog `/blogs/` + post template

> Build a blog index at `/blogs/` and an article template at `/blog/[slug]`.
> **Index SEO:** Title `Speech Writing Tips & Advice | The Blog`. Meta `Practical speech-writing tips, examples and inspiration from the UK's most-reviewed professional speechwriter.`
> **Index:** card grid (image, title, date, excerpt), pagination.
> **Post template:** H1 = post title (question-style where possible), visible byline "By Adrian Simpson · [date]", body with H2s, related-guide and related-service links, CTA. Inject Article JSON-LD (author, datePublished, dateModified) + BreadcrumbList on each post.

---

## PROMPT 18 — Legal `/privacy` and `/terms`

> Build standard Privacy Policy (`/privacy`) and Terms (`/terms`) pages with appropriate UK GDPR content. Linked in the footer. These may be set to noindex.
