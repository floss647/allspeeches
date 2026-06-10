# Per-page JSON-LD — filled, ready to inject

Every block below is filled with real URLs, names and (for FAQ) the exact answer text from
your page copy. Replace only the remaining `[TOKEN]`s (ratings, review counts, review text,
turnaround days — see `../paste-ready`/README or the kit's checklist).

Rules:
- Each `<script type="application/ld+json">` goes in that page's `<head>` and **must appear in
  the prerendered HTML** (TanStack Start SSR handles this).
- FAQPage answer text **must stay identical to the visible text on the page**. If you edit the
  copy, edit the matching answer here too.
- Validate every page at https://search.google.com/test/rich-results before launch.
- A page can emit its blocks as separate scripts, or combine them under one `@graph`.

---

## 0. GLOBAL — inject on EVERY page (site-wide layout head)

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
  "address": { "@type": "PostalAddress", "addressRegion": "East Sussex", "addressCountry": "GB" },
  "areaServed": { "@type": "Country", "name": "United Kingdom" },
  "sameAs": [
    "https://uk.linkedin.com/in/adrian-simpson-861485178",
    "https://www.facebook.com/allspeechesgreatandsmall/",
    "https://x.com/allspeech",
    "https://www.youtube.com/@Allspeechesgreatandsmallgp"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "[RATING]",
    "reviewCount": "421",
    "bestRating": "5"
  }
}
```

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

## 1. HOME — `/`  (+ global)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "How does it actually work?", "acceptedAnswer": { "@type": "Answer", "text": "You share your stories with me, I write a complete speech around them, and we refine it together until it's perfect. The whole thing is built from scratch around you." } },
    { "@type": "Question", "name": "How long does it take?", "acceptedAnswer": { "@type": "Answer", "text": "Most speeches are drafted within 7 days, and I can work to tight deadlines — even last-minute — when needed." } },
    { "@type": "Question", "name": "Is the speech really original?", "acceptedAnswer": { "@type": "Answer", "text": "Completely. Every speech is written from the ground up for one person. I never reuse jokes, lines or templates." } }
  ]
}
```

---

## 2. BEST MAN SERVICE — `/best-man-speech-writer/`  (+ global)

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Best man speech writing",
  "name": "Best Man Speech Writer",
  "url": "https://www.allspeechesgreatandsmall.com/best-man-speech-writer/",
  "provider": { "@id": "https://www.allspeechesgreatandsmall.com/#business" },
  "areaServed": { "@type": "Country", "name": "United Kingdom" },
  "description": "Bespoke, original best man speech writing built around your friendship with the groom — funny, warm and unmistakably yours, with unlimited revisions.",
  "offers": { "@type": "Offer", "price": "399", "priceCurrency": "GBP", "url": "https://www.allspeechesgreatandsmall.com/best-man-speech-writer/" }
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "How does the process work?", "acceptedAnswer": { "@type": "Answer", "text": "You share your stories with me, I write a complete speech around them, and we refine it together until it's perfect." } },
    { "@type": "Question", "name": "How long does it take?", "acceptedAnswer": { "@type": "Answer", "text": "Most best man speeches are drafted within 7 days, and I can work to tight deadlines when needed." } },
    { "@type": "Question", "name": "Will it sound like me?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. I write in your voice, using your humour and your stories, so it sounds like the best possible version of you — not like a writer." } },
    { "@type": "Question", "name": "What if I don't have many good stories?", "acceptedAnswer": { "@type": "Answer", "text": "Most people have far more material than they realise. A short conversation almost always uncovers the gold." } },
    { "@type": "Question", "name": "How do you handle jokes about the groom?", "acceptedAnswer": { "@type": "Answer", "text": "Sharp but never cruel, and always judged for the audience — grandparents and all." } },
    { "@type": "Question", "name": "Can you help at the last minute?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Get in touch and tell me the date — I'll let you know straight away if I can help." } }
  ]
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.allspeechesgreatandsmall.com/" },
    { "@type": "ListItem", "position": 2, "name": "Best Man Speech Writer", "item": "https://www.allspeechesgreatandsmall.com/best-man-speech-writer/" }
  ]
}
```

---

## 3. GROOM SERVICE — `/groom-speech-writer`  (+ global)

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Groom speech writing",
  "name": "Groom Speech Writer",
  "url": "https://www.allspeechesgreatandsmall.com/groom-speech-writer",
  "provider": { "@id": "https://www.allspeechesgreatandsmall.com/#business" },
  "areaServed": { "@type": "Country", "name": "United Kingdom" },
  "description": "Bespoke, original groom speech writing built around your relationship — sincere, genuinely funny and perfectly balanced, with unlimited revisions.",
  "offers": { "@type": "Offer", "price": "399", "priceCurrency": "GBP", "url": "https://www.allspeechesgreatandsmall.com/groom-speech-writer" }
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "How does it work?", "acceptedAnswer": { "@type": "Answer", "text": "You share your story, I write the speech, we perfect it together." } },
    { "@type": "Question", "name": "How do you balance funny and heartfelt?", "acceptedAnswer": { "@type": "Answer", "text": "Carefully — laughs early to settle the nerves, sincerity built towards the toast." } },
    { "@type": "Question", "name": "How do I thank everyone without it dragging?", "acceptedAnswer": { "@type": "Answer", "text": "I weave thanks into the story so they feel warm, not like a list." } },
    { "@type": "Question", "name": "How long does it take?", "acceptedAnswer": { "@type": "Answer", "text": "Usually 7 days; last-minute help available." } },
    { "@type": "Question", "name": "Will it sound like me?", "acceptedAnswer": { "@type": "Answer", "text": "Always — it's your voice, your story." } }
  ]
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.allspeechesgreatandsmall.com/" },
    { "@type": "ListItem", "position": 2, "name": "Groom Speech Writer", "item": "https://www.allspeechesgreatandsmall.com/groom-speech-writer" }
  ]
}
```

---

## 4. FATHER OF THE BRIDE SERVICE — `/father-of-the-bride-speech-writer`  (+ global)

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Father of the bride speech writing",
  "name": "Father of the Bride Speech Writer",
  "url": "https://www.allspeechesgreatandsmall.com/father-of-the-bride-speech-writer",
  "provider": { "@id": "https://www.allspeechesgreatandsmall.com/#business" },
  "areaServed": { "@type": "Country", "name": "United Kingdom" },
  "description": "Bespoke, original father of the bride speech writing built around your daughter's story — warm, proud and moving, with unlimited revisions.",
  "offers": { "@type": "Offer", "price": "399", "priceCurrency": "GBP", "url": "https://www.allspeechesgreatandsmall.com/father-of-the-bride-speech-writer" }
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "How does it work?", "acceptedAnswer": { "@type": "Answer", "text": "You share your memories, I write the speech, we refine it together." } },
    { "@type": "Question", "name": "How do I welcome the groom's family warmly?", "acceptedAnswer": { "@type": "Answer", "text": "I'll craft a genuine welcome that brings both families together." } },
    { "@type": "Question", "name": "How emotional is too emotional?", "acceptedAnswer": { "@type": "Answer", "text": "I judge the balance so it's moving but deliverable — you'll get through it." } },
    { "@type": "Question", "name": "How long does it take?", "acceptedAnswer": { "@type": "Answer", "text": "Usually 7 days; last-minute help available." } },
    { "@type": "Question", "name": "Will it sound like me?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — your voice, your daughter, your story." } }
  ]
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.allspeechesgreatandsmall.com/" },
    { "@type": "ListItem", "position": 2, "name": "Father of the Bride Speech Writer", "item": "https://www.allspeechesgreatandsmall.com/father-of-the-bride-speech-writer" }
  ]
}
```

---

## 5. MAID OF HONOUR SERVICE — `/maid-of-honour-speech-writer`  (+ global)

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Maid of honour speech writing",
  "name": "Maid of Honour Speech Writer",
  "url": "https://www.allspeechesgreatandsmall.com/maid-of-honour-speech-writer",
  "provider": { "@id": "https://www.allspeechesgreatandsmall.com/#business" },
  "areaServed": { "@type": "Country", "name": "United Kingdom" },
  "description": "Bespoke, original maid of honour speech writing built around your friendship with the bride — funny and touching in equal measure, with unlimited revisions.",
  "offers": { "@type": "Offer", "price": "399", "priceCurrency": "GBP", "url": "https://www.allspeechesgreatandsmall.com/maid-of-honour-speech-writer" }
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "How does it work?", "acceptedAnswer": { "@type": "Answer", "text": "You share your stories, I write the speech, we refine it together." } },
    { "@type": "Question", "name": "How do you balance funny and sentimental?", "acceptedAnswer": { "@type": "Answer", "text": "Laughs to open, warmth to close — judged for the room." } },
    { "@type": "Question", "name": "What if our best stories are private?", "acceptedAnswer": { "@type": "Answer", "text": "I handle sensitive material with discretion and tact, keeping the warmth without the overshare." } },
    { "@type": "Question", "name": "How long does it take?", "acceptedAnswer": { "@type": "Answer", "text": "Usually 7 days; last-minute help available." } },
    { "@type": "Question", "name": "Will it sound like me?", "acceptedAnswer": { "@type": "Answer", "text": "Always." } }
  ]
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.allspeechesgreatandsmall.com/" },
    { "@type": "ListItem", "position": 2, "name": "Maid of Honour Speech Writer", "item": "https://www.allspeechesgreatandsmall.com/maid-of-honour-speech-writer" }
  ]
}
```

---

## 6. EULOGY SERVICE — `/eulogy-writing-service`  (+ global)
*£399, same as wedding speeches. Price is in the schema only — keep the eulogy page copy gentle and price-free.*

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Eulogy writing",
  "name": "Eulogy Writing Service",
  "url": "https://www.allspeechesgreatandsmall.com/eulogy-writing-service",
  "provider": { "@id": "https://www.allspeechesgreatandsmall.com/#business" },
  "areaServed": { "@type": "Country", "name": "United Kingdom" },
  "description": "Compassionate eulogy writing — gentle, unhurried help creating a personal, fitting tribute in your words, at a difficult time.",
  "offers": { "@type": "Offer", "price": "399", "priceCurrency": "GBP", "url": "https://www.allspeechesgreatandsmall.com/eulogy-writing-service" }
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "How does this work at such a difficult time?", "acceptedAnswer": { "@type": "Answer", "text": "Gently. You share what you can, I do the shaping, and there's no pressure at any stage." } },
    { "@type": "Question", "name": "How quickly can you help?", "acceptedAnswer": { "@type": "Answer", "text": "Quickly when needed — please just tell me the date and I'll do everything I can." } },
    { "@type": "Question", "name": "How do we share memories with you?", "acceptedAnswer": { "@type": "Answer", "text": "However is easiest — a phone call, written notes, or both." } },
    { "@type": "Question", "name": "How long should a eulogy be?", "acceptedAnswer": { "@type": "Answer", "text": "Usually three to five minutes. I'll help you judge it." } },
    { "@type": "Question", "name": "Is it confidential?", "acceptedAnswer": { "@type": "Answer", "text": "Always, completely." } }
  ]
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.allspeechesgreatandsmall.com/" },
    { "@type": "ListItem", "position": 2, "name": "Eulogy Writing Service", "item": "https://www.allspeechesgreatandsmall.com/eulogy-writing-service" }
  ]
}
```

---

## 7. SPEECH REVIEW SERVICE — `/speech-review-service`  (+ global)
*£399, same as wedding speeches.*

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Speech review and feedback",
  "name": "Speech Review Service",
  "url": "https://www.allspeechesgreatandsmall.com/speech-review-service",
  "provider": { "@id": "https://www.allspeechesgreatandsmall.com/#business" },
  "areaServed": { "@type": "Country", "name": "United Kingdom" },
  "description": "Honest, professional feedback on a speech you've already written — structure, jokes, timing and delivery — with clear, actionable suggestions.",
  "offers": { "@type": "Offer", "price": "399", "priceCurrency": "GBP", "url": "https://www.allspeechesgreatandsmall.com/speech-review-service" }
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "What do I get back?", "acceptedAnswer": { "@type": "Answer", "text": "Written, structured feedback with specific, actionable suggestions." } },
    { "@type": "Question", "name": "How fast?", "acceptedAnswer": { "@type": "Answer", "text": "Usually within 7 days — tell me your date if it's tight." } },
    { "@type": "Question", "name": "Will you rewrite it or just advise?", "acceptedAnswer": { "@type": "Answer", "text": "The review service is feedback and guidance; if you'd like me to write or substantially rewrite it, I can do that as a full speech instead." } },
    { "@type": "Question", "name": "What do you check?", "acceptedAnswer": { "@type": "Answer", "text": "Structure, content, humour, tone, length, timing and delivery." } },
    { "@type": "Question", "name": "How do I send it?", "acceptedAnswer": { "@type": "Answer", "text": "Just get in touch and I'll tell you where to send it." } }
  ]
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.allspeechesgreatandsmall.com/" },
    { "@type": "ListItem", "position": 2, "name": "Speech Review Service", "item": "https://www.allspeechesgreatandsmall.com/speech-review-service" }
  ]
}
```

---

## 8. BEST MAN GUIDE — `/best-man-speeches/`  (+ global)
*Article block also lives in `../content/guide-best-man-ENHANCED.md`. FAQPage + Breadcrumb below.*

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "How long should a best man speech be?", "acceptedAnswer": { "@type": "Answer", "text": "In the UK, with three speakers, aim for a stand-up-to-sit-down time of no more than 10 minutes — about 5 in America — and cut it shorter as more speakers are added." } },
    { "@type": "Question", "name": "How do you start a best man speech?", "acceptedAnswer": { "@type": "Answer", "text": "Open with a warm, funny line that earns a genuine laugh — never edgy — then introduce yourself. Quality matters more than racing to the first gag." } },
    { "@type": "Question", "name": "How should you structure a best man speech?", "acceptedAnswer": { "@type": "Answer", "text": "Keep it simple: form a logical progression from one point to the next, don't let the timeline jump around, and never cover the same topic or person twice." } },
    { "@type": "Question", "name": "What jokes work in a best man speech?", "acceptedAnswer": { "@type": "Answer", "text": "Skip the recycled 'best man jokes' everyone has heard a hundred times — work out what's genuinely funny about the groom and people will laugh far more at your originality." } },
    { "@type": "Question", "name": "How do you end a best man speech with a toast?", "acceptedAnswer": { "@type": "Answer", "text": "There should be only one toast in a best man speech, and it comes right at the very end — simple and effective." } },
    { "@type": "Question", "name": "Should you mention the groom's ex-girlfriends?", "acceptedAnswer": { "@type": "Answer", "text": "No. Never mention former girlfriends in any way — the day is really about the bride, and upsetting her is terminal." } },
    { "@type": "Question", "name": "How do you handle hecklers?", "acceptedAnswer": { "@type": "Answer", "text": "Plan ahead: the simplest method is to pause, let them finish and carry on — but if you can turn it into a gentle extra laugh, so much the better." } }
  ]
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.allspeechesgreatandsmall.com/" },
    { "@type": "ListItem", "position": 2, "name": "How to Write a Best Man Speech", "item": "https://www.allspeechesgreatandsmall.com/best-man-speeches/" }
  ]
}
```

---

## 9. GROOM GUIDE — `/groom-speeches`  (+ global)
*Article block in `../content/guide-groom-ENHANCED.md`.*

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "How long should a groom speech be?", "acceptedAnswer": { "@type": "Answer", "text": "Aim for around 1,400 words — about 10 minutes on the day — and start trimming once you go past 1,500." } },
    { "@type": "Question", "name": "How do you start a groom speech?", "acceptedAnswer": { "@type": "Answer", "text": "Open by welcoming everyone 'on behalf of my wife and I' — it's the one wedding cliché worth keeping, and it gets the room cheering every single time." } },
    { "@type": "Question", "name": "Who should you thank in a groom speech?", "acceptedAnswer": { "@type": "Answer", "text": "Reserve thanks for the friends and family who genuinely helped with the wedding, group them together so it's not a list, and never thank the paid suppliers." } },
    { "@type": "Question", "name": "What should you say about the bride?", "acceptedAnswer": { "@type": "Answer", "text": "The bride is your conclusion and should make up about 30% of the speech — how you met, her impact on you, her character, what she means to you and how you proposed — with light and shade throughout." } },
    { "@type": "Question", "name": "How should you end a groom speech?", "acceptedAnswer": { "@type": "Answer", "text": "Forget the traditional handover to the best man — your final words should be about your bride, finishing on a toast to the future." } },
    { "@type": "Question", "name": "How many toasts should there be?", "acceptedAnswer": { "@type": "Answer", "text": "Four at most: a general toast at the end, one to the bridesmaids, one to the parents, and one to those no longer with us." } },
    { "@type": "Question", "name": "How much humour should a groom speech have?", "acceptedAnswer": { "@type": "Answer", "text": "A lot — humour is the magic ingredient. Not scripted internet gags, but finding what's genuinely funny about the people you're introducing and thanking." } }
  ]
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.allspeechesgreatandsmall.com/" },
    { "@type": "ListItem", "position": 2, "name": "How to Write a Groom Speech", "item": "https://www.allspeechesgreatandsmall.com/groom-speeches" }
  ]
}
```

---

## 10. FATHER OF THE BRIDE GUIDE — `/father-of-the-bride-speeches`  (+ global)
*Article block in `../content/guide-father-of-the-bride-ENHANCED.md`.*

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "How long should a father of the bride speech be?", "acceptedAnswer": { "@type": "Answer", "text": "Aim for around 7 minutes — you're first up, so an overlong speech makes the groom's and best man's jobs much harder." } },
    { "@type": "Question", "name": "How do you start a father of the bride speech?", "acceptedAnswer": { "@type": "Answer", "text": "As the first speaker you do the welcoming — introduce yourself and your relationship to the bride, and give it on behalf of your wife as well." } },
    { "@type": "Question", "name": "How should you structure a father of the bride speech?", "acceptedAnswer": { "@type": "Answer", "text": "Welcome first, then welcome the groom's family and groom, an optional absent-friends toast, the main section about your daughter, then her husband, your wife, and the final toast." } },
    { "@type": "Question", "name": "What should you say about your daughter?", "acceptedAnswer": { "@type": "Answer", "text": "Paint a picture of who she was, who she is, and the years in between — peppered with funny memories, and saluting her achievements subtly rather than like a CV." } },
    { "@type": "Question", "name": "How do you welcome the groom's family?", "acceptedAnswer": { "@type": "Answer", "text": "Welcome the groom's family and friends warmly, give everyone a fair mention, and have some fun with where the two families have come from." } },
    { "@type": "Question", "name": "How should you end a father of the bride speech?", "acceptedAnswer": { "@type": "Answer", "text": "Summarise what a special person your daughter is in your own, original words — this is the part guests remember, so make it heartfelt and avoid all the clichés." } },
    { "@type": "Question", "name": "How do you handle divorce in the speech?", "acceptedAnswer": { "@type": "Answer", "text": "It all depends on your relationship with her mother — but whatever the situation, never omit her completely." } }
  ]
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.allspeechesgreatandsmall.com/" },
    { "@type": "ListItem", "position": 2, "name": "How to Write a Father of the Bride Speech", "item": "https://www.allspeechesgreatandsmall.com/father-of-the-bride-speeches" }
  ]
}
```

---

## 11. MAID OF HONOUR GUIDE — `/moh-speeches`  (+ global)
*Article block in `../content/guide-maid-of-honour-ENHANCED.md`.*

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "How do you write a maid of honour speech?", "acceptedAnswer": { "@type": "Answer", "text": "There's no fixed agenda — introduce yourself, tell the bride's story with plenty of humour, keep it to around 750–1,000 words, toast the happy couple at the end, and don't bother thanking anyone." } },
    { "@type": "Question", "name": "What should a maid of honour speech include?", "acceptedAnswer": { "@type": "Answer", "text": "It should include a funny introduction, the story of your friendship with the bride, a few warm words about the groom, the heartfelt 'best friend' moment, and a toast to the happy couple — with a laugh in nearly every paragraph." } },
    { "@type": "Question", "name": "How do you start a maid of honour speech?", "acceptedAnswer": { "@type": "Answer", "text": "Introduce yourself, then make them laugh by the second or third sentence — most guests won't know who you are yet." } },
    { "@type": "Question", "name": "How should you structure a maid of honour speech?", "acceptedAnswer": { "@type": "Answer", "text": "Work chronologically through the bride's life and keep the detail light, so the speech is easy to follow — this isn't Facebook Live." } },
    { "@type": "Question", "name": "How do you balance funny and emotional?", "acceptedAnswer": { "@type": "Answer", "text": "Lead with the laughs and let the speech grow sincere as you go — earn the emotional ending by being genuinely funny first, and never undercut the heartfelt finish with one last gag." } },
    { "@type": "Question", "name": "How do you end a maid of honour speech?", "acceptedAnswer": { "@type": "Answer", "text": "Keep the sentiment real and honest but understated — less is more, and what goes unsaid is usually the most powerful." } },
    { "@type": "Question", "name": "What should you avoid in a maid of honour speech?", "acceptedAnswer": { "@type": "Answer", "text": "Don't thank the venue or welcome guests, never forget to mention the groom, don't drink too much, and watch the length." } }
  ]
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.allspeechesgreatandsmall.com/" },
    { "@type": "ListItem", "position": 2, "name": "How to Write a Maid of Honour Speech", "item": "https://www.allspeechesgreatandsmall.com/moh-speeches" }
  ]
}
```

---

## 12. EULOGY GUIDE — `/eulogy-examples`  (+ global)
*Article block in `../content/guide-eulogy-ENHANCED.md`.*

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "How long should a eulogy be?", "acceptedAnswer": { "@type": "Answer", "text": "A eulogy usually lasts around three to five minutes — roughly 500 to 750 words. Shorter, said with feeling, is always better than longer." } },
    { "@type": "Question", "name": "How do you start a eulogy?", "acceptedAnswer": { "@type": "Answer", "text": "Begin simply: say who you are and your relationship to them, then offer one warm, true sentence about who they were. There's no need for a grand opening." } },
    { "@type": "Question", "name": "What should a eulogy include?", "acceptedAnswer": { "@type": "Answer", "text": "Include who you are, who they were, a few specific memories or stories, what they meant to the people around them, and a simple closing thought or farewell." } },
    { "@type": "Question", "name": "How do you write about a difficult relationship?", "acceptedAnswer": { "@type": "Answer", "text": "Be honest but kind: speak to what was true and good without pretending, and you can acknowledge that someone was complicated with warmth and grace." } },
    { "@type": "Question", "name": "How do you deliver a eulogy without breaking down?", "acceptedAnswer": { "@type": "Answer", "text": "Practise it aloud beforehand, speak slowly, keep water nearby, and remember it is completely all right to pause or to cry. Ask someone to be ready to step in if you can't go on." } }
  ]
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.allspeechesgreatandsmall.com/" },
    { "@type": "ListItem", "position": 2, "name": "How to Write a Eulogy", "item": "https://www.allspeechesgreatandsmall.com/eulogy-examples" }
  ]
}
```

---

## 13. ABOUT — `/about-adrian-simpson-speechwriter/`  (+ global)

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

```json
{
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "url": "https://www.allspeechesgreatandsmall.com/about-adrian-simpson-speechwriter/",
  "mainEntity": { "@id": "https://www.allspeechesgreatandsmall.com/about-adrian-simpson-speechwriter/#adrian" }
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.allspeechesgreatandsmall.com/" },
    { "@type": "ListItem", "position": 2, "name": "About Adrian Simpson", "item": "https://www.allspeechesgreatandsmall.com/about-adrian-simpson-speechwriter/" }
  ]
}
```

---

## 14. REVIEWS — `/reviews`  (+ global)
*Real data only — fill `[RATING]`, `[REVIEW_COUNT]`, and each review's name/date/text from
reviews.co.uk. Add or remove review objects to match what's actually shown on the page.*

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Professional Speech Writing by All Speeches Great and Small",
  "brand": { "@id": "https://www.allspeechesgreatandsmall.com/#business" },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "[RATING]",
    "reviewCount": "421",
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

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.allspeechesgreatandsmall.com/" },
    { "@type": "ListItem", "position": 2, "name": "Reviews", "item": "https://www.allspeechesgreatandsmall.com/reviews" }
  ]
}
```

---

## 15. PRICING — `/pricing`  (+ global)
*`[X]` = turnaround; the "When do I pay?" answer is a placeholder — replace with your real terms,
keeping the schema text identical to what's shown on the page.*

```json
{
  "@context": "https://schema.org",
  "@type": "Offer",
  "name": "Bespoke wedding speech",
  "description": "A 100% original best man, groom, father of the bride or maid of honour speech, written from scratch around your stories, with unlimited revisions.",
  "price": "399",
  "priceCurrency": "GBP",
  "url": "https://www.allspeechesgreatandsmall.com/pricing",
  "availability": "https://schema.org/InStock",
  "seller": { "@id": "https://www.allspeechesgreatandsmall.com/#business" }
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Is £399 really the full price?", "acceptedAnswer": { "@type": "Answer", "text": "Yes — for a bespoke wedding speech, that's everything, including unlimited revisions. No hidden extras." } },
    { "@type": "Question", "name": "When do I pay?", "acceptedAnswer": { "@type": "Answer", "text": "Full payment up front when you book." } },
    { "@type": "Question", "name": "What if I need it urgently?", "acceptedAnswer": { "@type": "Answer", "text": "Last-minute speeches are often possible — tell me your date and I'll let you know straight away." } },
    { "@type": "Question", "name": "What if I'm not happy?", "acceptedAnswer": { "@type": "Answer", "text": "We keep refining until you are. That's what unlimited revisions means." } }
  ]
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.allspeechesgreatandsmall.com/" },
    { "@type": "ListItem", "position": 2, "name": "Pricing", "item": "https://www.allspeechesgreatandsmall.com/pricing" }
  ]
}
```

---

## 16. CONTACT — `/contact`  (+ global)

```json
{
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "url": "https://www.allspeechesgreatandsmall.com/contact",
  "mainEntity": { "@id": "https://www.allspeechesgreatandsmall.com/#business" }
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.allspeechesgreatandsmall.com/" },
    { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://www.allspeechesgreatandsmall.com/contact" }
  ]
}
```

---

## 17. BLOG POST template — `/$slug`  (+ global, per post)
Build from the `posts` row; keep dateModified current when you edit a post.

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[POST TITLE]",
  "url": "https://www.allspeechesgreatandsmall.com/[slug]",
  "datePublished": "[published_date YYYY-MM-DD]",
  "dateModified": "[YYYY-MM-DD]",
  "author": { "@id": "https://www.allspeechesgreatandsmall.com/about-adrian-simpson-speechwriter/#adrian" },
  "publisher": { "@id": "https://www.allspeechesgreatandsmall.com/#business" },
  "mainEntityOfPage": "https://www.allspeechesgreatandsmall.com/[slug]",
  "description": "[meta_description]"
}
```

---

### Page → schema quick map
| Route | Blocks (besides global ProfessionalService + WebSite) |
|---|---|
| `/` | FAQPage |
| 6 service pages | Service + FAQPage + BreadcrumbList |
| 5 guides | Article (in content file) + FAQPage + BreadcrumbList |
| `/about-…` | Person + AboutPage + BreadcrumbList |
| `/reviews` | Product/AggregateRating/Review + BreadcrumbList |
| `/pricing` | Offer + FAQPage + BreadcrumbList |
| `/contact` | ContactPage + BreadcrumbList |
| blog posts | Article + BreadcrumbList |
| `/privacy`, `/terms` | none (noindex) |
