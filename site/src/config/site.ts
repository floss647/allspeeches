/**
 * Single source of truth for business data (NAP), social profiles and the
 * placeholders only Adrian can fill. Update the `TODO` values before launch, 
 * every page, schema block, footer and the llms.txt read from here.
 */

export const SITE = {
  name: 'All Speeches Great and Small',
  shortName: 'All Speeches Great & Small',
  url: 'https://www.allspeechesgreatandsmall.com',
  description:
    'Bespoke professional speech writing for weddings and special occasions.',
  founder: 'Adrian Simpson',
  founderUrlPath: '/about-adrian-simpson-speechwriter/',

  // NAP, keep byte-identical wherever it appears.
  email: 'adrian@allspeechesgreatandsmall.com', // confirmed
  addressRegion: 'East Sussex',
  addressCountry: 'GB',
  areaServed: 'United Kingdom',

  // Reviews, confirmed real figures (reviews.io store all-speeches-great-and-small).
  rating: '4.9',
  reviewCount: '421',
  reviewsProfileUrl: 'https://www.reviews.io/company-reviews/store/all-speeches-great-and-small',

  // Turnaround used across service copy. Confirmed: 7 days (1 week).
  turnaround: '7',

  price: '399',
  priceCurrency: 'GBP',

  social: [
    'https://uk.linkedin.com/in/adrian-simpson-861485178',
    'https://www.facebook.com/allspeechesgreatandsmall/',
    'https://x.com/allspeech',
    'https://www.youtube.com/@Allspeechesgreatandsmallgp',
  ],

  // 'As featured in' press strip (site-wide). Text wordmarks for now;
  // add a `logo` (path under /public, e.g. '/press/the-times.svg') to show
  // the real logo, and/or a `url` to link the entry to the coverage.
  featuredIn: [
    { name: 'Mail Online', logo: '/press/mail-online.png' },
    { name: 'BBC Radio 2', logo: '/press/bbc-radio-2.png' },
    { name: 'The Daily Telegraph', logo: '/press/the-daily-telegraph.png' },
    { name: 'The Times', logo: '/press/the-times.png' },
    { name: 'The Sunday Times', logo: '/press/the-sunday-times.png' },
    { name: 'HuffPost' },
  ] as { name: string; url?: string; logo?: string }[],

  // Default share image, 1200x630 branded image still to be created.
  ogImage: '/images/adrian-portrait.jpg',

  // Google Ads conversion tracking. Leave blank to keep tracking OFF entirely.
  // When set, the /thank-you page loads gtag and fires the conversion on load.
  //   googleAdsId:    your Conversion ID, e.g. 'AW-123456789'
  //   googleAdsLabel: the conversion label from the event snippet, e.g. 'abCdEfGh-IjK'
  googleAdsId: 'AW-968218322',
  googleAdsLabel: '2zCFCITfnMEcENKt180D',

  // Dedicated "Book appointment" conversion action for discovery calls.
  // Every Calendly booking (from any CTA, speeches or coaching) fires this
  // one, so a booking is never counted at the £399 speechwriting value above.
  // Google values a booking at £1 by default (no value is passed from here).
  // To change it, paste the send_to from the action's event snippet: the ID
  // is the account 'AW-968218322', the label is the part after the slash.
  // Blank label fires no Ads conversion (the GA4 booking event still records).
  bookingAdsId: 'AW-968218322',
  bookingAdsLabel: 'kKWRCODloPccENKt180D',

  // GA4 Measurement ID (reuses the existing property so history is preserved).
  // Loads via gtag only after the visitor accepts cookies.
  ga4Id: 'G-99R1G1B2LC',

  // OpenAI / ChatGPT Ads conversion pixel. Loaded only after the visitor
  // accepts cookies (it's a marketing tracker, so it's consent-gated).
  openAiPixelId: 'Qh4vEpUYHGmwAKJ9oWpABo',

  // Contact form. Leave blank to use Netlify Forms (needs form detection
  // enabled in Netlify). To bypass Netlify entirely, paste a Formspree form
  // endpoint here (free at formspree.io), e.g. 'https://formspree.io/f/abcdwxyz'
  // and the contact form will post there instead and email you directly.
  formEndpoint: 'https://formspree.io/f/mkoaagyj',

  // Calendly link for the coaching discovery call. When set, every "Book a
  // call" CTA opens Calendly; when blank (as now), they open the built-in
  // Formspree request-a-call form instead, which submits on our own domain
  // and so can be tracked as a conversion. Paste a Calendly URL here to switch
  // back to self-booking in one place.
  calendlyUrl: '',
} as const;

/**
 * Every page is served with a trailing slash: Astro's `directory` build emits
 * `/page/index.html` and Netlify 301-redirects the no-slash form to it. The
 * canonical URL, sitemap, JSON-LD and internal links must therefore ALL use
 * the trailing-slash form — otherwise the declared canonical points at a URL
 * that redirects, and Google files the page under "Page with redirect" and
 * stops ranking it. (That mismatch is what sank every non-slash page after the
 * rebuild while the slash pages, e.g. /best-man-speeches/, survived.)
 */
export function canonicalPath(path: string): string {
  if (path === '/') return '/';
  return path.endsWith('/') ? path : path + '/';
}

/** Resolve a path to an absolute canonical URL on the www host. */
export function abs(path: string): string {
  if (path.startsWith('http')) return path;
  return new URL(canonicalPath(path), SITE.url).href;
}

/** Replace the kit placeholders in any copy string with config values. */
export function fill(text: string): string {
  return text
    .replace(/\[REVIEW_COUNT\]/g, SITE.reviewCount)
    .replace(/\[RATING\]/g, SITE.rating)
    .replace(/\[X\]/g, SITE.turnaround);
}
