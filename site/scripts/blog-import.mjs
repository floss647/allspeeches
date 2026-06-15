// Dependency-free blog importer.
//
// The original blog-crawl.mjs needs jsdom + @mozilla/readability + turndown,
// but the npm registry is not on this environment's egress allowlist, so those
// packages can't be installed. The live site IS reachable, and every Joomla
// post renders its article body inside <div id="blog-content">, so we can
// fetch + extract + convert to markdown with no third-party dependencies.
//
//   node scripts/blog-import.mjs
//
// Writes one markdown file per post to src/content/blog/<slug>.md (frontmatter
// matches src/content.config.ts) and a report to /tmp/blog-pull/report.json.
import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const ORIGIN = process.env.SITE_ORIGIN || 'https://www.allspeechesgreatandsmall.com';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';
const OUTDIR = resolve(process.cwd(), 'src/content/blog');
const REPORT = '/tmp/blog-pull';
mkdirSync(OUTDIR, { recursive: true });
mkdirSync(REPORT, { recursive: true });

const get = async (url) => {
  const r = await fetch(url, { headers: { 'User-Agent': UA }, redirect: 'follow' });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.text();
};

const ENT = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', '#39': "'", '#160': ' ', '#8217': '’', '#8216': '‘', '#8220': '“', '#8221': '”', '#8211': '–', '#8212': '—', '#8230': '…', hellip: '…', rsquo: '’', lsquo: '‘', ldquo: '“', rdquo: '”', ndash: '–', mdash: '—' };
function decode(s) {
  return String(s).replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (m, e) => {
    if (e[0] === '#') {
      const n = e[1] === 'x' || e[1] === 'X' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
      return Number.isFinite(n) ? String.fromCodePoint(n) : m;
    }
    return ENT[e] != null ? ENT[e] : (ENT[e] || m);
  });
}

// Extract inner HTML of the first element bearing the given id, by counting
// matching open/close tags of `tag` from the opening element onward.
function extractById(html, id, tag = 'div') {
  const open = new RegExp(`<${tag}[^>]*\\bid=["']${id}["'][^>]*>`, 'i');
  const m = open.exec(html);
  if (!m) return null;
  const start = m.index + m[0].length;
  const re = new RegExp(`<${tag}\\b[^>]*>|</${tag}>`, 'gi');
  re.lastIndex = start;
  let depth = 1, mm;
  while ((mm = re.exec(html))) {
    if (mm[0][1] === '/') { depth--; if (depth === 0) return html.slice(start, mm.index); }
    else depth++;
  }
  return html.slice(start);
}

function htmlToMarkdown(html) {
  let s = html;
  s = s.replace(/<!--[\s\S]*?-->/g, '');
  s = s.replace(/<(script|style|noscript)[^>]*>[\s\S]*?<\/\1>/gi, '');
  // Links
  s = s.replace(/<a\b[^>]*href=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi, (m, href, txt) => {
    const t = txt.replace(/<[^>]+>/g, '').trim();
    if (!t) return '';
    if (/^(#|javascript:|mailto:tel)/i.test(href) || href === '') return t;
    return `[${t}](${href})`;
  });
  // Bold / italic
  s = s.replace(/<\/?(strong|b)\b[^>]*>/gi, '**');
  s = s.replace(/<\/?(em|i)\b[^>]*>/gi, '*');
  // Headings
  s = s.replace(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi, (m, lvl, t) => {
    const txt = t.replace(/<[^>]+>/g, '').trim();
    return txt ? `\n\n${'#'.repeat(Number(lvl))} ${txt}\n\n` : '';
  });
  // List items
  s = s.replace(/<li\b[^>]*>([\s\S]*?)<\/li>/gi, (m, t) => `\n- ${t.replace(/\n+/g, ' ').trim()}`);
  s = s.replace(/<\/(ul|ol)>/gi, '\n\n');
  s = s.replace(/<(ul|ol)\b[^>]*>/gi, '\n');
  // Blockquote
  s = s.replace(/<blockquote\b[^>]*>([\s\S]*?)<\/blockquote>/gi, (m, t) => `\n\n> ${t.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()}\n\n`);
  // Breaks & paragraphs
  s = s.replace(/<br\s*\/?>/gi, '\n');
  s = s.replace(/<\/p>/gi, '\n\n');
  s = s.replace(/<p\b[^>]*>/gi, '');
  s = s.replace(/<\/?(div|section|span|figure|figcaption|table|tr|td|th|thead|tbody)\b[^>]*>/gi, '\n');
  // Images -> markdown (keep alt, drop tracking pixels)
  s = s.replace(/<img\b[^>]*>/gi, '');
  // Strip any remaining tags
  s = s.replace(/<[^>]+>/g, '');
  s = decode(s);
  // Normalise whitespace: drop whitespace-only lines, collapse runs.
  s = s.replace(/ /g, ' ');
  s = s.replace(/[ \t]+\n/g, '\n').replace(/\n[ \t]+/g, '\n');
  s = s.split('\n').map((l) => (l.trim() === '' ? '' : l)).join('\n');
  s = s.replace(/\n{3,}/g, '\n\n');
  s = s.replace(/[ \t]{2,}/g, ' ');
  return s.trim();
}

function categoryFor(slug, title) {
  const x = (slug + ' ' + title).toLowerCase();
  if (x.includes('best man') || x.includes('best-man')) return 'best-man';
  if (x.includes('groom')) return 'groom';
  if (x.includes('father of the bride') || x.includes('father-of-the-bride')) return 'father-of-the-bride';
  if (x.includes('maid of honour') || x.includes('maid-of-honour') || x.includes('moh')) return 'maid-of-honour';
  if (x.includes('eulogy')) return 'eulogy';
  return 'wedding-speeches';
}
const yaml = (s) => '"' + String(s ?? '').replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\s+/g, ' ').trim() + '"';

// Match a <meta> tag's content, honouring the actual quote delimiter so values
// containing the *other* quote char (e.g. apostrophes in "hasn't") aren't cut.
function metaContent(html, key) {
  const re = new RegExp(`<meta[^>]+(?:name|property)=["']${key}["'][^>]*?content=(["'])([\\s\\S]*?)\\1`, 'i');
  const re2 = new RegExp(`<meta[^>]+content=(["'])([\\s\\S]*?)\\1[^>]*?(?:name|property)=["']${key}["']`, 'i');
  const m = re.exec(html) || re2.exec(html);
  return m ? decode(m[2]) : '';
}

const listPath = resolve(process.cwd(), '../ready/blog-slugs-to-preserve.txt');
if (!existsSync(listPath)) { console.error('Missing slug list:', listPath); process.exit(1); }
const slugs = readFileSync(listPath, 'utf8').split('\n').map((s) => s.trim()).filter((s) => s && !s.startsWith('#'));
console.log(`Importing ${slugs.length} slugs from blog-slugs-to-preserve.txt`);

const report = { origin: ORIGIN, found: slugs.length, imported: [], skipped: [] };

for (const slug of slugs) {
  const url = `${ORIGIN}/${slug.replace(/^\//, '')}`;
  try {
    const html = await get(url);
    let inner = extractById(html, 'blog-content');
    if (!inner) { report.skipped.push({ slug, url, reason: 'no #blog-content' }); console.log(`✗ ${slug} (no body)`); continue; }
    // Trim author/footer boilerplate that sometimes sits inside the panel.
    inner = inner.split(/Written\s+By/i)[0];
    let body = htmlToMarkdown(inner);
    // Drop a leading H1/H2 that duplicates the title (template renders title).
    const h1 = (new RegExp(`<h1\\b[^>]*>([\\s\\S]*?)<\\/h1>`, 'i').exec(html) || [])[1];
    const title = (h1 ? h1.replace(/<[^>]+>/g, '') : '') || metaContent(html, 'og:title') || (/(<title>)([\s\S]*?)<\/title>/i.exec(html) || [])[2] || slug;
    const cleanTitle = decode(title).replace(/\s*[|–-]\s*All Speeches.*$/i, '').replace(/\s+/g, ' ').trim();
    body = body.replace(new RegExp(`^#{1,3}\\s+${cleanTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*\\n+`, 'i'), '').trim();

    if (body.replace(/\s+/g, ' ').trim().length < 120) {
      report.skipped.push({ slug, url, reason: 'body too short' }); console.log(`✗ ${slug} (short)`); continue;
    }
    const metaDesc = metaContent(html, 'description') || metaContent(html, 'og:description');
    const excerpt = (metaDesc || body.replace(/[#*>\n]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 180)).slice(0, 200);
    const category = categoryFor(slug, cleanTitle);
    const date = '2020-01-01';

    const fm = [
      '---',
      `title: ${yaml(cleanTitle)}`,
      `description: ${yaml(metaDesc || excerpt)}`,
      `slug: ${yaml(slug)}`,
      `category: ${yaml(category)}`,
      `publishedDate: ${yaml(date)}`,
      `excerpt: ${yaml(excerpt)}`,
      '---',
      '',
    ].join('\n');
    writeFileSync(resolve(OUTDIR, `${slug}.md`), fm + body + '\n');
    report.imported.push({ slug, url, title: cleanTitle, chars: body.length });
    process.stdout.write(`✓ ${slug}\n`);
  } catch (e) {
    report.skipped.push({ slug, url, reason: e.message });
    console.log(`✗ ${slug} (${e.message})`);
  }
}

writeFileSync(resolve(REPORT, 'report.json'), JSON.stringify(report, null, 2));
console.log(`\nImported ${report.imported.length}, skipped ${report.skipped.length}. Report: ${REPORT}/report.json`);
