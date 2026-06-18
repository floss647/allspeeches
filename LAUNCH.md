# Go-live runbook — All Speeches Great & Small

The new site is built by **Netlify** from this repo (`main` branch) and is already live at
**allspeeches.netlify.app**. "Going live" = pointing the domain at Netlify. DNS is reversible, so the
old Joomla site is your safety net — **don't switch Joomla off until the new site is confirmed live.**

## ⚠️ Before you touch DNS — the one that bites people
Your email (`adrian@allspeechesgreatandsmall.com`) runs on the domain's **MX records**. When you change
DNS, **change only the website records (A / CNAME). Leave MX and any mail records exactly as they are.**

## Phase 1 — Pre-flight (do first)
- [ ] **Confirm the contact form**: submit it once on the live deploy, then click the one-time
      "confirm/activate" email Formspree sends. Confirm a test enquiry reaches your inbox.
- [ ] **Test Google Ads conversion**: submit the form, accept cookies, then check the conversion
      registers in Google Ads (can take a few hours). Don't let campaigns spend until it does.
- [ ] **Lower the domain's DNS TTL** to 300s (5 min) at your DNS provider, ~24–48h before cutover.
- [ ] **Back up the Joomla site** (database export + files) and keep the archive.

## Phase 2 — Connect the domain (Netlify)
- [ ] Netlify → site → **Domain management** → add `www.allspeechesgreatandsmall.com` (set as primary)
      and the apex `allspeechesgreatandsmall.com` (redirect to www).
- [ ] Note the DNS targets Netlify shows.

## Phase 3 — Cutover (DNS), keeping email safe
At your current DNS provider, repoint **only** the website records:
- [ ] `www` → CNAME → your Netlify site (e.g. `allspeeches.netlify.app`)
- [ ] apex `@` → A record `75.2.60.5` (or ALIAS/ANAME to the Netlify host)
- [ ] Point old `bestman.allspeechesgreatandsmall.com` at Netlify too (its 301 is already configured)
- [ ] **Do NOT change MX / mail records**
- [ ] Let Netlify auto-provision the HTTPS certificate, then enable **Force HTTPS**

## Phase 4 — Verify (first hour)
- [ ] Homepage + key pages load over `https://www.allspeechesgreatandsmall.com` (padlock shows)
- [ ] Spot-check 301s: `/testimonials`, `/eulogy-writer/`, `/the-grooms-speech/`,
      `/best-man-speech-writing-service/` → redirect to the new pages (not 404)
- [ ] Submit the contact form → lands on `/thank-you` → email arrives
- [ ] `/robots.txt` and `/sitemap-index.xml` load

## Phase 5 — Search Console (launch day / just after)
- [ ] Google Search Console → **Sitemaps** → submit `sitemap-index.xml`
- [ ] Request indexing for the homepage + top service pages (URL Inspection)
- [ ] Watch **Pages / Coverage** for 404s over the next 1–2 weeks (catches any missed redirect)
- [ ] (Optional) Bing Webmaster Tools → import from GSC → submit the same sitemap

## Phase 6 — Sunset Joomla (only once confident)
- [ ] Keep Joomla running, but receiving no traffic, for **2–4 weeks** as a rollback
- [ ] When GSC is clean and traffic is stable: cancel the Joomla hosting (keep the backup archive)
- [ ] **Keep the domain registration and email** (separate from web hosting — never let them lapse)

## Still worth doing (optional, before or after)
- Send the **Google Search Console "Pages" export** for a final redirect-gap diff.
- Confirm the **ICO number** on the privacy page against your certificate.
- Add bespoke images for the **Executive** and **Awards** corporate pages.
