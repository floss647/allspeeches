# JSON-LD Structured Data — drop-in blocks

Rules:
- Replace every `[PLACEHOLDER]`. **Never invent ratings/review counts** — use real reviews.co.uk numbers.
- Each block goes in a `<script type="application/ld+json">` in the page `<head>`, and MUST be present in prerendered HTML.
- Validate everything at https://search.google.com/test/rich-results before launch.
- Use absolute URLs with the canonical `www` host.

---

## 1. GLOBAL — ProfessionalService (site-wide, e.g. in layout head)

```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://www.allspeechesgreatandsmall.com/#business",
  "name": "All Speeches Great and Small",
  "description": "Bespoke professional speech writing for weddings and special occasions.",
  "url": "https://www.allspeechesgreatandsmall.com/",
  "telephone": "+44-20-7993-6524",
  "priceRange": "££",
  "founder": { "@type": "Person", "name": "Adrian Simpson", "@id": "https://www.allspeechesgreatandsmall.com/about-adrian-simpson-speechwriter/#adrian" },
  "address": {
    "@type": "PostalAddress",
    "addressRegion": "East Sussex",
    "addressCountry": "GB"
  },
  "areaServed": { "@type": "Country", "name": "United Kingdom" },
  "sameAs": [
    "https://uk.linkedin.com/in/adrian-simpson-861485178",
    "https://www.facebook.com/allspeechesgreatandsmall/",
    "https://x.com/allspeech",
    "https://www.youtube.com/@Allspeechesgreatandsmallgp"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "[RATING e.g. 4.9]",
    "reviewCount": "[REVIEW_COUNT e.g. 421]",
    "bestRating": "5"
  }
}
```

## 2. GLOBAL — WebSite

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.allspeechesgreatandsmall.com/#website",
  "url": "https://www.allspeechesgreatandsmall.com/",
  "name": "All Speeches Great and Small",
  "publisher": { "@id": "https://www.allspeechesgreatandsmall.com/#business" }
}
```

---

## 3. PERSON — Adrian (About page)

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://www.allspeechesgreatandsmall.com/about-adrian-simpson-speechwriter/#adrian",
  "name": "Adrian Simpson",
  "jobTitle": "Professional Speechwriter",
  "description": "Former magazine journalist and BBC Top Gear presenter, founder of All Speeches Great and Small (2012) and the UK's most-reviewed professional wedding speechwriter.",
  "url": "https://www.allspeechesgreatandsmall.com/about-adrian-simpson-speechwriter/",
  "worksFor": { "@id": "https://www.allspeechesgreatandsmall.com/#business" },
  "sameAs": [
    "https://uk.linkedin.com/in/adrian-simpson-861485178",
    "https://grokipedia.com/page/Adrian_Simpson"
  ]
}
```

---

## 4. SERVICE template (each service page) — set serviceType + URL

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "[e.g. Best man speech writing]",
  "name": "[e.g. Best Man Speech Writer]",
  "url": "[FULL PAGE URL]",
  "provider": { "@id": "https://www.allspeechesgreatandsmall.com/#business" },
  "areaServed": { "@type": "Country", "name": "United Kingdom" },
  "description": "[one-sentence description of this service]",
  "offers": {
    "@type": "Offer",
    "price": "399",
    "priceCurrency": "GBP",
    "url": "[FULL PAGE URL]"
  }
}
```
*(Omit the price block for the eulogy and speech-review pages if pricing differs.)*

---

## 5. ARTICLE template (each guide + blog post)

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[GUIDE H1 / TITLE]",
  "url": "[FULL PAGE URL]",
  "datePublished": "[YYYY-MM-DD]",
  "dateModified": "[YYYY-MM-DD]",
  "author": { "@id": "https://www.allspeechesgreatandsmall.com/about-adrian-simpson-speechwriter/#adrian" },
  "publisher": { "@id": "https://www.allspeechesgreatandsmall.com/#business" },
  "mainEntityOfPage": "[FULL PAGE URL]",
  "description": "[meta description for the page]"
}
```

---

## 6. FAQPAGE template (homepage, every service page, every guide, pricing)

Build `mainEntity` from that page's actual question headings. Question text and answer text must match what's visible on the page.

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "[Question exactly as shown on page]",
      "acceptedAnswer": { "@type": "Answer", "text": "[The direct answer shown on the page]" }
    },
    {
      "@type": "Question",
      "name": "[Question 2]",
      "acceptedAnswer": { "@type": "Answer", "text": "[Answer 2]" }
    }
  ]
}
```

---

## 7. REVIEW + AGGREGATERATING (Reviews page) — real data only

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Professional Speech Writing by All Speeches Great and Small",
  "brand": { "@id": "https://www.allspeechesgreatandsmall.com/#business" },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "[RATING]",
    "reviewCount": "[REVIEW_COUNT]",
    "bestRating": "5"
  },
  "review": [
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "[Reviewer name]" },
      "datePublished": "[YYYY-MM-DD]",
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "reviewBody": "[Real review text]"
    }
  ]
}
```
> Note: Google's guidelines say self-serving `Review`/`AggregateRating` on your own org may not show rich stars. The reviews.co.uk profile carries that externally. Still include this — it makes your authority machine-readable for AI engines even if Google withholds stars.

---

## 8. BREADCRUMBLIST template (all deep pages)

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.allspeechesgreatandsmall.com/" },
    { "@type": "ListItem", "position": 2, "name": "[Section e.g. Services]", "item": "[section URL or page URL]" },
    { "@type": "ListItem", "position": 3, "name": "[This page]", "item": "[FULL PAGE URL]" }
  ]
}
```

---

## 9. CONTACTPAGE + LocalBusiness (Contact page)

```json
{
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "url": "https://www.allspeechesgreatandsmall.com/contact",
  "mainEntity": { "@id": "https://www.allspeechesgreatandsmall.com/#business" }
}
```

## Which schema goes on which page (quick map)
- **Every page:** ProfessionalService + WebSite (global) + BreadcrumbList.
- **Home:** + WebSite + FAQPage.
- **Service pages:** + Service + FAQPage.
- **Guides/blog:** + Article + FAQPage.
- **About:** + Person + AboutPage.
- **Reviews:** + Product/AggregateRating/Review.
- **Pricing:** + FAQPage + Offer.
- **Contact:** + ContactPage.
