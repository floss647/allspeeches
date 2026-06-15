// Crawl the live site and download every image. Run in a NEW session after the
// site's host is added to the environment's network egress allowlist.
//
//   node scripts/crawl-images.mjs                      # default origin (live site)
//   ORIGIN=https://staging.example.com node scripts/crawl-images.mjs
//   WAYBACK=1 node scripts/crawl-images.mjs            # pull via the Wayback Machine
//
// Output: /tmp/site-pull/images/* plus /tmp/site-pull/manifest.json
//
// Note: the live host sits behind a WAF that 403s automated fetchers, and the
// managed environment only reaches hosts on its egress allowlist. If a plain run
// fails with 403 host_not_allowed, the domain isn't allowlisted; if it fails with
// a bare 403, the WAF blocked the fetch — try WAYBACK=1 (and allowlist web.archive.org).
import { mkdirSync, writeFileSync, createWriteStream } from 'node:fs';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { resolve, basename } from 'node:path';

const ORIGIN = (process.env.ORIGIN || 'https://www.allspeechesgreatandsmall.com').replace(/\/$/, '');
const USE_WAYBACK = process.env.WAYBACK === '1' || process.env.WAYBACK === 'true';
const WAYBACK_PREFIX = 'https://web.archive.org/web/2id_/'; // 2id_ = latest snapshot, raw (no archive chrome)
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';
const OUT = '/tmp/site-pull';
const IMG = resolve(OUT, 'images');
mkdirSync(IMG, { recursive: true });

// Route a target URL through the Wayback Machine when requested, leaving already
// archived URLs untouched.
const via = (url) => (USE_WAYBACK && !url.includes('web.archive.org') ? WAYBACK_PREFIX + url : url);

const get = async (url) => {
  const r = await fetch(via(url), { headers: { 'User-Agent': UA }, redirect: 'follow' });
  if (!r.ok) {
    const reason = r.headers.get('x-deny-reason');
    throw new Error(`${r.status}${reason ? ` (${reason})` : ''} ${url}`);
  }
  return r;
};
const getText = async (url) => (await get(url)).text();

// 1. Gather page URLs from sitemap(s); fall back to crawling the homepage.
async function pageUrls() {
  const urls = new Set([ORIGIN + '/']);
  try {
    let xml = await getText(ORIGIN + '/sitemap.xml');
    const sub = [...xml.matchAll(/<loc>([^<]+\.xml)<\/loc>/g)].map((m) => m[1]);
    if (sub.length) { xml = (await Promise.all(sub.map(getText))).join('\n'); }
    for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      if (!m[1].endsWith('.xml')) urls.add(m[1]);
    }
    console.log(`sitemap: ${urls.size} page URLs`);
  } catch (e) {
    console.log('no sitemap, homepage only:', e.message);
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
