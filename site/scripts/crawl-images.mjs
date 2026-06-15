// Crawl the live site and download every image. Run in a NEW session after the
// site's host is added to the environment's network egress allowlist.
//   node scripts/crawl-images.mjs
// Output: /tmp/site-pull/images/* plus /tmp/site-pull/manifest.json
import { mkdirSync, writeFileSync, createWriteStream } from 'node:fs';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { resolve, basename } from 'node:path';

const ORIGIN = 'https://www.allspeechesgreatandsmall.com';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';
const OUT = '/tmp/site-pull';
const IMG = resolve(OUT, 'images');
mkdirSync(IMG, { recursive: true });

const get = async (url) => {
  const r = await fetch(url, { headers: { 'User-Agent': UA }, redirect: 'follow' });
  if (!r.ok) throw new Error(`${r.status} ${url}`);
  return r;
};
const getText = async (url) => (await get(url)).text();

// Known static page routes on the live site (the live /sitemap.xml returns 404,
// so we can't rely on it). The crawler follows redirects, so trailing-slash
// variants resolve automatically and any 404s are simply skipped.
const STATIC_PAGES = [
  '/', '/best-man-speech-writer/', '/groom-speech-writer', '/father-of-the-bride-speech-writer',
  '/maid-of-honour-speech-writer', '/eulogy-writing-service', '/speech-review-service',
  '/best-man-speeches/', '/groom-speeches', '/father-of-the-bride-speeches', '/moh-speeches',
  '/eulogy-examples', '/about-adrian-simpson-speechwriter/', '/reviews', '/pricing', '/contact',
  '/blogs/', '/privacy', '/terms', '/after-dinner-speeches/',
];

// 1. Build the page list from the known static routes plus the confirmed blog
// slugs (ready/blog-slugs-to-preserve.txt). Falls back to the sitemap only if
// the slug list is unavailable.
async function pageUrls() {
  const urls = new Set();
  for (const p of STATIC_PAGES) urls.add(new URL(p, ORIGIN).href);

  try {
    const { readFileSync, existsSync } = await import('node:fs');
    const listPath = resolve(process.cwd(), '../ready/blog-slugs-to-preserve.txt');
    if (existsSync(listPath)) {
      const slugs = readFileSync(listPath, 'utf8').split('\n').map((s) => s.trim()).filter((s) => s && !s.startsWith('#'));
      slugs.forEach((s) => urls.add(`${ORIGIN}/${s.replace(/^\//, '')}`));
      console.log(`page list: ${STATIC_PAGES.length} static + ${slugs.length} blog = ${urls.size} URLs`);
      return [...urls];
    }
  } catch (e) { console.log('slug list unavailable, trying sitemap:', e.message); }

  try {
    let xml = await getText(ORIGIN + '/sitemap.xml');
    const sub = [...xml.matchAll(/<loc>([^<]+\.xml)<\/loc>/g)].map((m) => m[1]);
    if (sub.length) { xml = (await Promise.all(sub.map(getText))).join('\n'); }
    for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      if (!m[1].endsWith('.xml')) urls.add(m[1]);
    }
    console.log(`sitemap: ${urls.size} page URLs`);
  } catch (e) {
    console.log('no sitemap, static pages only:', e.message);
  }
  return [...urls];
}

// 2. Extract image (and video) URLs from a page's HTML.
function extractAssets(html, pageUrl) {
  const assets = new Set();
  const abs = (u) => { try { return new URL(u, pageUrl).href; } catch { return null; } };
  const push = (u) => { const a = abs(u); if (a && a.startsWith('http')) assets.add(a); };

  for (const m of html.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)) push(m[1]);
  for (const m of html.matchAll(/srcset=["']([^"']+)["']/gi))
    for (const part of m[1].split(',')) push(part.trim().split(/\s+/)[0]);
  for (const m of html.matchAll(/<source[^>]+src=["']([^"']+)["']/gi)) push(m[1]);
  for (const m of html.matchAll(/(?:poster|data-src|data-lazy-src)=["']([^"']+)["']/gi)) push(m[1]);
  for (const m of html.matchAll(/<(?:meta)[^>]+content=["']([^"']+\.(?:jpg|jpeg|png|webp|gif|svg))["']/gi)) push(m[1]);
  for (const m of html.matchAll(/url\((['"]?)([^)'"]+\.(?:jpg|jpeg|png|webp|gif|svg))\1\)/gi)) push(m[2]);

  // Video embeds (record for manual wiring, not downloaded)
  const videos = new Set();
  for (const m of html.matchAll(/<iframe[^>]+src=["']([^"']*(?:youtube|youtu\.be|vimeo|wistia)[^"']*)["']/gi)) videos.add(abs(m[1]));
  return { images: [...assets].filter((u) => /\.(jpg|jpeg|png|webp|gif|svg)(\?|$)/i.test(u)), videos: [...videos] };
}

const pages = await pageUrls();
const imageSet = new Set();
const videoSet = new Set();
for (const p of pages) {
  try {
    const { images, videos } = extractAssets(await getText(p), p);
    images.forEach((u) => imageSet.add(u));
    videos.forEach((u) => videoSet.add(u));
    process.stdout.write(`. ${images.length} imgs  ${p}\n`);
  } catch (e) { console.log('skip', p, e.message); }
}

// 3. Download each unique image.
const manifest = [];
let n = 0;
for (const url of imageSet) {
  try {
    const r = await get(url);
    let name = basename(new URL(url).pathname).split('?')[0] || `img-${n}`;
    name = decodeURIComponent(name).replace(/[^a-zA-Z0-9._-]/g, '-');
    if (manifest.some((m) => m.file === name)) name = `${n}-${name}`;
    await pipeline(Readable.fromWeb(r.body), createWriteStream(resolve(IMG, name)));
    manifest.push({ url, file: name, type: r.headers.get('content-type') });
    n++;
  } catch (e) { console.log('dl fail', url, e.message); }
}

writeFileSync(resolve(OUT, 'manifest.json'), JSON.stringify({ pages: pages.length, images: manifest, videos: [...videoSet] }, null, 2));
console.log(`\nDownloaded ${n} images to ${IMG}`);
console.log(`Found ${videoSet.size} video embeds (see manifest.json)`);
