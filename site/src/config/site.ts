/**
 * Single source of truth for business data (NAP), social profiles and the
 * placeholders only Adrian can fill. Update the `TODO` values before launch —
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

  // NAP — keep byte-identical wherever it appears.
  telephone: '0207 993 6524',
  telephoneE164: '+44-20-7993-6524',
  email: 'hello@allspeechesgreatandsmall.com', // TODO: confirm real address
  addressRegion: 'East Sussex',
  addressCountry: 'GB',
  areaServed: 'United Kingdom',

  // Reviews — REAL numbers from reviews.co.uk. Do not fabricate.
  rating: '[RATING]', // TODO e.g. '4.9'
  reviewCount: '[REVIEW_COUNT]', // TODO e.g. '421'
  reviewsProfileUrl: 'https://www.reviews.co.uk/company-reviews/store/all-speeches-great-and-small', // TODO confirm

  // Turnaround used across service copy. TODO confirm real figure.
  turnaround: '5',

  price: '399',
  priceCurrency: 'GBP',

  social: [
    'https://uk.linkedin.com/in/adrian-simpson-861485178',
    'https://www.facebook.com/allspeechesgreatandsmall/',
    'https://x.com/allspeech',
    'https://www.youtube.com/@Allspeechesgreatandsmallgp',
  ],

  // Default share image — 1200x630 branded image still to be created.
  ogImage: '/images/adrian-portrait.jpg',
} as const;

/** Resolve a path to an absolute canonical URL on the www host. */
export function abs(path: string): string {
  if (path.startsWith('http')) return path;
  return new URL(path, SITE.url).href.replace(/\/$/, path === '/' ? '/' : '');
}

/** Replace the kit placeholders in any copy string with config values. */
export function fill(text: string): string {
  return text
    .replace(/\[REVIEW_COUNT\]/g, SITE.reviewCount)
    .replace(/\[RATING\]/g, SITE.rating)
    .replace(/\[X\]/g, SITE.turnaround);
}
