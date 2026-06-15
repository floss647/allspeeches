// Pull each imported blog post's real featured image from the live site and
// wire it into the post's `hero:` frontmatter. Run from site/ with live access:
//   node scripts/blog-hero-images.mjs
// - Source of truth for the image is the live page's og:image (twitter:image /
//   first real content image as fallbacks).
// - Images are saved to public/images/blog/<file>; shared images download once.
// - Posts that already have a hero, or have no findable image, are left as-is.
// - Report written to /tmp/blog-pull/hero-report.json
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync, createWriteStream } from 'node:fs';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { resolve, basename } from 'node:path';

const ORIGIN = process.env.SITE_ORIGIN || 'https://www.allspeechesgreatandsmall.com';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';
const BLOG = resolve(process.cwd(), 'src/content/blog');
const IMGDIR = resolve(process.cwd(), 'public/images/blog');
const REPORT = '/tmp/blog-pull';
mkdirSync(IMGDIR, { recursive: true });
mkdirSync(REPORT, { recursive: true });

// Brand/tracking images that are never a post's real featured image.
const JUNK = /(facebook\.com|_wblapi|adrian-home|adrian-portrait|adrian-simpson|signature|logo|spacer|pixel|\.svg)(\?|$|\/)/i;

const getText = async (url) => {
  const r = await fetch(url, { headers: { 'User-Agent': UA }, redirect: 'follow' });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.text();
};

function metaContent(html, re) {
  const m = html.match(re);
  return m ? m[1].trim() : null;
}

function findFeaturedImage(html, pageUrl) {
  const abs = (u) => { try { return new URL(u, pageUrl).href; } catch { return null; } };
  // 1. og:image (most reliable)
  let u = metaContent(html, /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)
       || metaContent(html, /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);
  if (u) return abs(u);
  // 2. twitter:image
  u = metaContent(html, /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i);
  if (u) return abs(u);
  // 3. first real content image
  for (const m of html.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)) {
    const src = m[1];
    if (JUNK.test(src)) continue;
    if (/^data:/.test(src)) continue;
    if (/\.(jpg|jpeg|png|webp)(\?|$)/i.test(src)) return abs(src);
  }
  return null;
}

function fileNameFor(url, used) {
  let name = basename(new URL(url).pathname).split('?')[0] || 'img';
  name = decodeURIComponent(name).replace(/[^a-zA-Z0-9._-]/g, '-').toLowerCase();
  if (!/\.(jpg|jpeg|png|webp|gif)$/i.test(name)) name += '.jpg';
  let final = name, n = 1;
  while (used.has(final) && used.get(final) !== url) { final = name.replace(/(\.[a-z]+)$/i, `-${n++}$1`); }
  used.set(final, url);
  return final;
}

async function download(url, dest) {
  if (existsSync(dest)) return; // already pulled (shared image)
  const r = await fetch(url, { headers: { 'User-Agent': UA }, redirect: 'follow' });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  await pipeline(Readable.fromWeb(r.body), createWriteStream(dest));
}

function insertHero(md, heroPath) {
  // Insert `hero: "..."` before the closing --- of the frontmatter block.
  const end = md.indexOf('\n---', 3);
  if (!md.startsWith('---') || end === -1) return null;
  const head = md.slice(0, end);
  const rest = md.slice(end);
  if (/^hero:/m.test(head)) return null; // already has one
  return `${head}\nhero: "${heroPath}"${rest}`;
}

const files = readdirSync(BLOG).filter((f) => f.endsWith('.md'));
const urlToFile = new Map();
const report = { origin: ORIGIN, total: files.length, wired: [], alreadyHadHero: [], noImage: [], failed: [] };

for (const file of files) {
  const path = resolve(BLOG, file);
  const md = readFileSync(path, 'utf8');
  if (/^hero:/m.test(md.slice(0, md.indexOf('\n---', 3)))) { report.alreadyHadHero.push(file); continue; }
  const slugMatch = md.match(/^slug:\s*["']?([^"'\n]+)["']?/m);
  const slug = (slugMatch ? slugMatch[1] : file.replace(/\.md$/, '')).trim();
  const url = `${ORIGIN}/${slug}`;
  try {
    const html = await getText(url);
    const imgUrl = findFeaturedImage(html, url);
    if (!imgUrl || JUNK.test(imgUrl)) { report.noImage.push({ file, slug }); process.stdout.write(`- ${slug} (no image)\n`); continue; }
    const fname = fileNameFor(imgUrl, urlToFile);
    await download(imgUrl, resolve(IMGDIR, fname));
    const heroPath = `/images/blog/${fname}`;
    const updated = insertHero(md, heroPath);
    if (updated) { writeFileSync(path, updated); report.wired.push({ file, slug, image: imgUrl, hero: heroPath }); process.stdout.write(`✓ ${slug} -> ${heroPath}\n`); }
    else { report.failed.push({ file, slug, reason: 'frontmatter insert failed' }); }
  } catch (e) {
    report.failed.push({ file, slug, reason: e.message });
    process.stdout.write(`x ${slug} (${e.message})\n`);
  }
}

writeFileSync(resolve(REPORT, 'hero-report.json'), JSON.stringify(report, null, 2));
console.log(`\nWired ${report.wired.length}, already had ${report.alreadyHadHero.length}, no image ${report.noImage.length}, failed ${report.failed.length}.`);
console.log(`Report: ${REPORT}/hero-report.json   Images: ${IMGDIR}`);
