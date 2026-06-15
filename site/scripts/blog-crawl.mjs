// Crawl the live site's blog posts and import them into the Astro blog
// collection. Run in a session WITH network access to the site:
//   node scripts/blog-crawl.mjs
// Writes one markdown file per post to src/content/blog/<slug>.md (frontmatter
// matches src/content.config.ts) and a report to /tmp/blog-pull/report.json.
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { JSDOM } from 'jsdom';
import { Readability } from '@mozilla/readability';
import TurndownService from 'turndown';

const ORIGIN = process.env.SITE_ORIGIN || 'https://www.allspeechesgreatandsmall.com';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';
const OUTDIR = resolve(process.cwd(), 'src/content/blog');
const REPORT = '/tmp/blog-pull';
mkdirSync(OUTDIR, { recursive: true });
mkdirSync(REPORT, { recursive: true });

const td = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced', bulletListMarker: '-' });

// URLs that are NOT blog posts (explicit pages we already built by hand).
const NON_POSTS = new Set([
  '/', '/best-man-speech-writer/', '/groom-speech-writer', '/father-of-the-bride-speech-writer',
  '/maid-of-honour-speech-writer', '/eulogy-writing-service', '/speech-review-service',
  '/best-man-speeches/', '/groom-speeches', '/father-of-the-bride-speeches', '/moh-speeches',
  '/eulogy-examples', '/about-adrian-simpson-speechwriter/', '/reviews', '/pricing', '/contact',
  '/blogs/', '/privacy', '/terms',
]);

const get = async (url) => {
  const r = await fetch(url, { headers: { 'User-Agent': UA }, redirect: 'follow' });
  if (!r.ok) throw new Error(`${r.status}`);
  return r.text();
};

function slugify(pathname) {
  return pathname.replace(/^\//, '').replace(/\/$/, '');
}
function categoryFor(slug, title) {
  const s = (slug + ' ' + title).toLowerCase();
  if (s.includes('best man') || s.includes('best-man')) return 'best-man';
  if (s.includes('groom')) return 'groom';
  if (s.includes('father of the bride') || s.includes('father-of-the-bride')) return 'father-of-the-bride';
  if (s.includes('maid of honour') || s.includes('maid-of-honour') || s.includes('moh')) return 'maid-of-honour';
  if (s.includes('eulogy')) return 'eulogy';
  return 'wedding-speeches';
}
const yaml = (s) => '"' + String(s ?? '').replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, ' ').trim() + '"';

// 1. Collect candidate post URLs. Prefer the confirmed GSC slug list
// (ready/blog-slugs-to-preserve.txt); fall back to the live sitemap.
async function postUrls() {
  const urls = new Set();
  try {
    const { readFileSync, existsSync } = await import('node:fs');
    const listPath = resolve(process.cwd(), '../ready/blog-slugs-to-preserve.txt');
    if (existsSync(listPath)) {
      const slugs = readFileSync(listPath, 'utf8').split('\n').map((s) => s.trim()).filter((s) => s && !s.startsWith('#'));
      slugs.forEach((s) => urls.add(`${ORIGIN}/${s.replace(/^\//, '')}`));
      if (urls.size) { console.log(`Using ${urls.size} slugs from blog-slugs-to-preserve.txt`); return [...urls]; }
    }
  } catch (e) { console.log('slug list unavailable, using sitemap:', e.message); }

  let xml = '';
  for (const sm of ['/sitemap.xml', '/sitemap_index.xml', '/sitemapindex.xml']) {
    try { xml = await get(ORIGIN + sm); break; } catch {}
  }
  const subs = [...xml.matchAll(/<loc>([^<]+\.xml)<\/loc>/g)].map((m) => m[1]);
  if (subs.length) {
    for (const s of subs) { try { xml += '\n' + (await get(s)); } catch {} }
  }
  for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    if (m[1].endsWith('.xml')) continue;
    let path;
    try { path = new URL(m[1]).pathname; } catch { continue; }
    if (NON_POSTS.has(path) || NON_POSTS.has(path.replace(/\/$/, ''))) continue;
    if (/\.(jpg|png|pdf|css|js)$/i.test(path)) continue;
    urls.add(ORIGIN + path);
  }
  return [...urls];
}

const urls = await postUrls();
console.log(`Found ${urls.length} candidate post URLs`);
const report = { origin: ORIGIN, found: urls.length, imported: [], skipped: [] };

for (const url of urls) {
  try {
    const html = await get(url);
    const dom = new JSDOM(html, { url });
    const doc = dom.window.document;
    const metaDesc = doc.querySelector('meta[name="description"]')?.content
      || doc.querySelector('meta[property="og:description"]')?.content || '';
    const pubMeta = doc.querySelector('meta[property="article:published_time"]')?.content
      || doc.querySelector('time[datetime]')?.getAttribute('datetime') || '';

    const reader = new Readability(doc);
    const parsed = reader.parse();
    if (!parsed || !parsed.content || parsed.textContent.trim().length < 200) {
      report.skipped.push({ url, reason: 'no extractable article body' });
      continue;
    }
    const slug = slugify(new URL(url).pathname);
    const title = (parsed.title || doc.title || slug).replace(/\s*[|–-]\s*All Speeches.*$/i, '').trim();
    let body = td.turndown(parsed.content).trim();
    // Drop a leading H1 duplicate of the title (template renders it).
    body = body.replace(/^#\s+.+\n+/, '');
    const date = (pubMeta || '').slice(0, 10) || '2020-01-01';
    const excerpt = (parsed.excerpt || metaDesc || parsed.textContent.slice(0, 160)).trim().slice(0, 200);
    const category = categoryFor(slug, title);

    const fm = [
      '---',
      `title: ${yaml(title)}`,
      `description: ${yaml(metaDesc || excerpt)}`,
      `slug: ${yaml(slug)}`,
      `category: ${yaml(category)}`,
      `publishedDate: ${yaml(date)}`,
      `excerpt: ${yaml(excerpt)}`,
      '---',
      '',
    ].join('\n');
    writeFileSync(resolve(OUTDIR, `${slug}.md`), fm + body + '\n');
    report.imported.push({ url, slug, title, chars: body.length });
    process.stdout.write(`✓ ${slug}\n`);
  } catch (e) {
    report.skipped.push({ url, reason: e.message });
  }
}

writeFileSync(resolve(REPORT, 'report.json'), JSON.stringify(report, null, 2));
console.log(`\nImported ${report.imported.length}, skipped ${report.skipped.length}. Report: ${REPORT}/report.json`);
