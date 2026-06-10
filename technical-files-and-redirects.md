# Technical files, redirects & launch checklist

Domain / canonical host: `https://www.allspeechesgreatandsmall.com`

---

## 1. robots.txt  (serve at /robots.txt — allow everything incl. AI bots)

```
User-agent: *
Allow: /

# AI crawlers explicitly welcomed
User-agent: GPTBot
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: anthropic-ai
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Google-Extended
Allow: /
User-agent: CCBot
Allow: /

Sitemap: https://www.allspeechesgreatandsmall.com/sitemap.xml
```
> If you ever decide to block an AI bot, do it here — but for AI *visibility* you want them allowed.

---

## 2. llms.txt  (serve at /llms.txt — markdown map for AI crawlers)

```
# All Speeches Great and Small

> The UK's most-reviewed professional wedding speech writer. Founded by Adrian Simpson — former magazine journalist and BBC Top Gear presenter — writing bespoke speeches since 2012. Best man, groom, father of the bride, maid of honour speeches and eulogies. 100% original, no templates. [REVIEW_COUNT]+ verified 5-star reviews.

## Guides
- [How to write a best man speech](https://www.allspeechesgreatandsmall.com/best-man-speeches/)
- [How to write a groom speech](https://www.allspeechesgreatandsmall.com/groom-speeches)
- [How to write a father of the bride speech](https://www.allspeechesgreatandsmall.com/father-of-the-bride-speeches)
- [How to write a maid of honour speech](https://www.allspeechesgreatandsmall.com/moh-speeches)
- [How to write a eulogy](https://www.allspeechesgreatandsmall.com/eulogy-examples)

## Services
- [Best man speech writer](https://www.allspeechesgreatandsmall.com/best-man-speech-writer/)
- [Groom speech writer](https://www.allspeechesgreatandsmall.com/groom-speech-writer)
- [Father of the bride speech writer](https://www.allspeechesgreatandsmall.com/father-of-the-bride-speech-writer)
- [Maid of honour speech writer](https://www.allspeechesgreatandsmall.com/maid-of-honour-speech-writer)
- [Eulogy writing service](https://www.allspeechesgreatandsmall.com/eulogy-writing-service)
- [Speech review service](https://www.allspeechesgreatandsmall.com/speech-review-service)

## About
- [About Adrian Simpson](https://www.allspeechesgreatandsmall.com/about-adrian-simpson-speechwriter/)
- [Reviews](https://www.allspeechesgreatandsmall.com/reviews)
- [Contact](https://www.allspeechesgreatandsmall.com/contact)
```

---

## 3. sitemap.xml
- Auto-generate, include every indexable URL, with real `<lastmod>` dates.
- Exclude /privacy, /terms if noindexed.
- Submit in Google Search Console + Bing Webmaster Tools on launch day.

---

## 4. Redirect map (301s) — fill before launch

**Step 1 — export your real current URL list:** from your existing sitemap and from Search Console → Indexing → Pages. This kit assumes the slugs below stay identical; verify against your export and add any extras.

**Step 2 — host-level 301s (always):**
| From | To |
|---|---|
| `http://…` (any) | `https://…` (same path) |
| `https://allspeechesgreatandsmall.com/*` (non-www) | `https://www.allspeechesgreatandsmall.com/*` |

**Step 3 — page redirects.** Slugs PRESERVED (no redirect needed) if identical:
`/` · `/best-man-speeches/` · `/moh-speeches` · `/about-adrian-simpson-speechwriter/` · `/best-man-speech-writer/` · `/speech-review-service` · `/contact` · `/blogs/`

**Slugs to confirm / likely new (add 301 from old → new if the old slug differs):**
| Old URL (verify in GSC) | New URL |
|---|---|
| `[old groom service URL]` | `/groom-speech-writer` |
| `[old father-of-bride service URL]` | `/father-of-the-bride-speech-writer` |
| `[old maid-of-honour service URL]` | `/maid-of-honour-speech-writer` |
| `[old eulogy service URL]` | `/eulogy-writing-service` |
| `[old groom guide URL]` | `/groom-speeches` |
| `[old FOTB guide URL]` | `/father-of-the-bride-speeches` |
| `[old eulogy guide URL]` | `/eulogy-examples` |

**Rule:** every URL that currently gets impressions in Search Console must either keep its slug or have a 301 to the closest new equivalent. Zero 404s on previously-ranking pages.

---

## 5. Pre-launch checklist
- [ ] Foundation test passes: `curl` shows body text + JSON-LD; JS-disabled render is readable (ALL pages)
- [ ] Every page: unique title (<60 char), unique meta description (<155 char), self-canonical, exactly one H1
- [ ] OG + Twitter tags on every page
- [ ] All existing/ranking URLs preserved or 301'd — verified against GSC export
- [ ] Single canonical host (www); http→https and non-www→www 301s live
- [ ] Production is indexable — no stray `noindex`, no `Disallow: /`
- [ ] All JSON-LD validates in Google Rich Results Test
- [ ] robots.txt, sitemap.xml, llms.txt live and reachable
- [ ] Guides have visible byline + "Updated [date]" and FAQ blocks
- [ ] Real review numbers in all AggregateRating (no fabricated data)
- [ ] Images compressed/WebP, lazy-loaded; Core Web Vitals green (PageSpeed Insights)
- [ ] Analytics + Search Console + Bing Webmaster connected

## 6. Post-launch (first 2 weeks)
- [ ] Submit sitemap in GSC; request indexing on top 10 pages
- [ ] Watch GSC Coverage for new 404s/redirect errors — fix immediately
- [ ] Compare impressions/clicks vs pre-migration baseline (expect a short dip, then recovery)
- [ ] Test a few queries in Google (AI Overviews), Perplexity, ChatGPT to baseline AI visibility
- [ ] Begin off-site authority work (PR, guest pieces, directory listings) — the lever on-page changes can't pull alone
