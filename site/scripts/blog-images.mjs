// Pull each blog post's featured image (og:image) from the live site, optimise
// it to WebP under public/images/blog/, and set the `hero` frontmatter on the
// matching markdown file. Run from site/ with network access to the live site:
//   node scripts/blog-images.mjs            # full run
//   node scripts/blog-images.mjs --survey   # just report og:image distribution
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync, statSync } from 'node:fs';
import { resolve, extname } from 'node:path';
import sharp from 'sharp';

const ORIGIN = process.env.SITE_ORIGIN || 'https://www.allspeechesgreatandsmall.com';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';
const BLOGDIR = resolve(process.cwd(), 'src/content/blog');
const IMGDIR = resolve(process.cwd(), 'public/images/blog');
const SURVEY = process.argv.includes('--survey');
mkdirSync(IMGDIR, { recursive: true });

const slugs = readdirSync(BLOGDIR).filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, ''));

const fetchText = async (url) => {
  const r = await fetch(url, { headers: { 'User-Agent': UA }, redirect: 'follow' });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.text();
};

function ogImage(html) {
  const m = /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i.exec(html)
    || /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i.exec(html);
  return m ? m[1] : null;
}

// Generic / non-editorial og:images we should NOT use as a per-post hero.
const GENERIC = /logo|default|placeholder|og-default|social-share|adrian-home-560x520/i;

// 1. Collect og:image per post.
const map = {}; // slug -> absolute image url
for (const slug of slugs) {
  try {
    const html = await fetchText(`${ORIGIN}/${slug}`);
    let og = ogImage(html);
    if (og) { try { og = new URL(og, ORIGIN).href; } catch {} }
    map[slug] = og || 'NONE';
  } catch (e) { map[slug] = 'ERR:' + e.message; }
}

const counts = {};
Object.values(map).forEach((u) => { counts[u] = (counts[u] || 0) + 1; });
const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
console.log(`unique og:images: ${sorted.length} across ${slugs.length} posts`);
sorted.slice(0, 15).forEach(([u, c]) => console.log(String(c).padStart(3), u.replace(ORIGIN, '')));
writeFileSync('/tmp/og-images.json', JSON.stringify(map, null, 2));
if (SURVEY) process.exit(0);

// 2. Download + optimise each usable image once, then set hero frontmatter.
const cache = new Map(); // remote url -> local /images/blog/<file>.webp
let withImage = 0, skipped = 0;

const slugifyName = (url) => {
  const base = decodeURIComponent(url.split('?')[0].split('/').pop() || 'img');
  return base.replace(/\.[a-z0-9]+$/i, '').replace(/[^a-zA-Z0-9._-]/g, '-').slice(0, 60) || 'img';
};

for (const slug of slugs) {
  const url = map[slug];
  if (!url || url === 'NONE' || url.startsWith('ERR:') || GENERIC.test(url)) { skipped++; continue; }
  try {
    let local = cache.get(url);
    if (!local) {
      const name = slugifyName(url) + '.webp';
      const dest = resolve(IMGDIR, name);
      if (!existsSync(dest)) {
        const r = await fetch(url, { headers: { 'User-Agent': UA }, redirect: 'follow' });
        if (!r.ok) throw new Error(`img HTTP ${r.status}`);
        const buf = Buffer.from(await r.arrayBuffer());
        await sharp(buf).resize(1200, null, { withoutEnlargement: true }).webp({ quality: 80 }).toFile(dest);
      }
      local = `/images/blog/${name}`;
      cache.set(url, local);
    }
    // Set/replace hero in frontmatter.
    const file = resolve(BLOGDIR, `${slug}.md`);
    let md = readFileSync(file, 'utf8');
    const fmEnd = md.indexOf('\n---', 3);
    let fm = md.slice(0, fmEnd);
    const body = md.slice(fmEnd);
    if (/\nhero:\s*/.test(fm)) fm = fm.replace(/\nhero:\s*"[^"]*"/, `\nhero: "${local}"`);
    else fm = fm + `\nhero: "${local}"`;
    writeFileSync(file, fm + body);
    withImage++;
    process.stdout.write(`✓ ${slug} -> ${local}\n`);
  } catch (e) {
    skipped++;
    console.log(`✗ ${slug} (${e.message})`);
  }
}

console.log(`\nSet hero on ${withImage} posts, skipped ${skipped}. Unique images: ${cache.size}`);
let total = 0;
for (const f of readdirSync(IMGDIR)) total += statSync(resolve(IMGDIR, f)).size;
console.log(`public/images/blog: ${readdirSync(IMGDIR).length} files, ${(total / 1024 / 1024).toFixed(1)}MB`);
