# ready/ — drop-in technical files

Serve each of these at the site root (so they resolve at the URLs below). They are
the materialised versions of the code blocks in `../technical-files-and-redirects.md`.

| File | Serve at |
|---|---|
| `robots.txt` | `https://www.allspeechesgreatandsmall.com/robots.txt` |
| `llms.txt` | `https://www.allspeechesgreatandsmall.com/llms.txt` |
| `sitemap.xml` | `https://www.allspeechesgreatandsmall.com/sitemap.xml` |

## Before launch — fill these in
- **`llms.txt`** — replace `[REVIEW_COUNT]` with the real number of verified reviews from reviews.co.uk. Do not fabricate.
- **`sitemap.xml`** — update each `<lastmod>` to the real last-modified date of that page (currently set to the generation date, 2026-06-13). `/privacy` and `/terms` are intentionally omitted because the kit noindexes them — add them back only if you decide to index them.

## Notes
- `robots.txt` allows all AI crawlers on purpose (for AI visibility). Block one here only if you ever choose to.
- If your host auto-generates `sitemap.xml`, prefer that (live `<lastmod>` dates) and treat this file as the fallback/reference.
