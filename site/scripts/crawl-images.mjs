// Crawl the live site and download every image. Run in a NEW session after the
// site's host is added to the environment's network egress allowlist.
//   node scripts/crawl-images.mjs
// If the live host's WAF blocks us, fall back to the Wayback Machine (requires
// web.archive.org in the egress allowlist):
//   WAYBACK=1 node scripts/crawl-images.mjs
// Output: /tmp/site-pull/images/* plus /tmp/site-pull/manifest.json
import { mkdirSync, writeFileSync, createWriteStream } from 'node:fs';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { resolve, basename } from 'node:path';

const ORIGIN = 'https://www.allspeechesgreatandsmall.com';
const DOMAIN = 'allspeechesgreatandsmall.com';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';
const OUT = '/tmp/site-pull';
const IMG = resolve(OUT, 'images');
mkdirSync(IMG, { recursive: true });

const WAYBACK = ['1', 'true', 'yes'].includes((process.env.WAYBACK || '').toLowerCase());

// Wayback: map each original URL to its best capture timestamp, then fetch the
// raw archived bytes via the `id_` modifier (no toolbar / URL rewriting).
const tsMap = new Map();
let latestTs = '2024';
const norm = (u) => u.replace(/^https?:\/\//, '').replace(/\/+$/, '').toLowerCase();
const wb = (u) => `https://web.archive.org/web/${tsMap.get(norm(u)) || latestTs}id_/${u}`;

const get = async (url) => {
  const target = WAYBACK && !url.includes('web.archive.org') ? wb(url) : url;
  const r = await fetch(target, { headers: { 'User-Agent': UA }, redirect: 'follow' });
  if (!r.ok) throw new Error(`${r.status} ${url}`);
  return r;
};
const getText = async (url) => (await get(url)).text();

// Wayback CDX index: every 200-status capture for the domain.
async function loadCdx() {
  const api = `https://web.archive.org/cdx/search/cdx?url=${DOMAIN}*&output=json&fl=original,timestamp,statuscode,mimetype&filter=statuscode:200&collapse=urlkey`;
  const rows = JSON.parse(await getText(api));
  rows.shift(); // drop header row
  for (const [original, timestamp] of rows) {
    const k = norm(original);
    if (!tsMap.has(k) || timestamp > tsMap.get(k)) tsMap.set(k, timestamp);
    if (timestamp > latestTs) latestTs = timestamp;
  }
  return rows;
}

// 1. Gather page URLs. Wayback: enumerate via CDX. Live: sitemap, else homepage.
async function pageUrls() {
  if (WAYBACK) {
    let rows;
    try {
      rows = await loadCdx();
    } catch (e) {
      console.error(`Wayback CDX unreachable: ${e.message}`);
      console.error('Add web.archive.org to the environment network egress allowlist, then retry.');
      process.exit(1);
    }
    const pages = new Set();
    const seedImages = new Set();
    for (const [original, , , mime] of rows) {
      if (/text\/html/i.test(mime)) pages.add(original);
      else if (/^image\//i.test(mime)) seedImages.add(original);
    }
    console.log(`CDX: ${rows.length} captures, ${pages.size} pages, ${seedImages.size} images`);
    return { pages: [...pages], seedImages: [...seedImages] };
  }
  const urls = new Set([ORIGIN + '/']);
  // Discover sitemap URLs from robots.txt `Sitemap:` directives, then common
  // defaults. (This site advertises /sitemap-4seo.xml via robots, not /sitemap.xml.)
  const candidates = new Set();
  try {
    const robots = await getText(ORIGIN + '/robots.txt');
    for (const m of robots.matchAll(/^\s*Sitemap:\s*(\S+)/gim)) candidates.add(m[1].trim());
  } catch { /* no robots.txt */ }
  for (const d of ['/sitemap.xml', '/sitemap_index.xml', '/sitemap-4seo.xml']) candidates.add(ORIGIN + d);

  // Walk sitemaps, following nested <loc>*.xml indexes to any depth.
  const seen = new Set();
  const queue = [...candidates];
  let found = 0;
  while (queue.length) {
    const sm = queue.shift();
    if (seen.has(sm)) continue;
    seen.add(sm);
    let xml;
    try { xml = await getText(sm); } catch { continue; }
    for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      const loc = m[1].trim();
      if (/\.xml(\?|$)/i.test(loc)) queue.push(loc);
      else { urls.add(loc); found++; }
    }
  }
  console.log(found ? `sitemap: ${urls.size} page URLs` : 'no sitemap, homepage only');
  return { pages: [...urls], seedImages: [] };
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

const { pages, seedImages } = await pageUrls();
const imageSet = new Set(seedImages);
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
