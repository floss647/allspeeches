// Geolocates the price for visitors in the United States.
//
// The site is built once with UK pricing (£399, GBP). This edge function
// rewrites the HTML on the fly for US human visitors, swapping the base
// price to USD. Everyone else — and all search crawlers — get the UK
// version untouched, which protects UK search rankings.
//
// Scope is deliberately precise: only the base £399 product price (and its
// matching JSON-LD offer) is converted. The £499 after-dinner price and any
// incidental £ amounts in blog articles are left alone.
//
// To localise the after-dinner price too, add its US figure below.

import type { Config, Context } from 'https://edge.netlify.com';

// Visible-text swaps.
const TEXT: [RegExp, string][] = [
  [/£399/g, '$485'],
  // [/£499/g, '$XXX'],   // after-dinner — set when the US figure is confirmed
];

// JSON-LD offer swaps (compact form emitted by JSON.stringify). Matching the
// price and currency together means only the £399 offer is changed; the £499
// offer stays correctly in GBP.
const SCHEMA: [RegExp, string][] = [
  [/"price":"399","priceCurrency":"GBP"/g, '"price":"485","priceCurrency":"USD"'],
  // [/"price":"499","priceCurrency":"GBP"/g, '"price":"XXX","priceCurrency":"USD"'],
];

const BOT = /bot|crawl|spider|slurp|mediapartners|adsbot|bingpreview|facebookexternalhit|embedly|quora|pinterest|slackbot|whatsapp|telegram|applebot|yandex|baidu/i;

export default async (request: Request, context: Context) => {
  const response = await context.next();

  const type = response.headers.get('content-type') || '';
  if (!type.includes('text/html')) return response;

  const country = context.geo?.country?.code;
  const ua = request.headers.get('user-agent') || '';

  // Only US human visitors get the converted version.
  if (country !== 'US' || BOT.test(ua)) return response;

  let html = await response.text();
  for (const [re, to] of TEXT) html = html.replace(re, to);
  for (const [re, to] of SCHEMA) html = html.replace(re, to);

  const headers = new Headers(response.headers);
  headers.delete('content-length');
  headers.set('Netlify-Vary', 'country'); // vary cache by country
  return new Response(html, { status: response.status, headers });
};

export const config: Config = {
  path: '/*',
  excludedPath: [
    '/images/*', '/press/*', '/_astro/*',
    '/*.xml', '/*.txt', '/*.ico', '/*.json', '/*.webmanifest',
    '/*.png', '/*.jpg', '/*.jpeg', '/*.webp', '/*.svg', '/*.gif',
    '/*.css', '/*.js', '/*.woff', '/*.woff2',
  ],
};
