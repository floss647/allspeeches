// Replace the placeholder publishedDate (2020-01-01) on every blog post with
// the real date from the live site's JSON-LD ("datePublished"). Run from site/:
//   node scripts/blog-dates.mjs
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const ORIGIN = process.env.SITE_ORIGIN || 'https://www.allspeechesgreatandsmall.com';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';
const DIR = resolve(process.cwd(), 'src/content/blog');

const slugs = readdirSync(DIR).filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, ''));

const get = async (url) => {
  const r = await fetch(url, { headers: { 'User-Agent': UA }, redirect: 'follow' });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.text();
};

const datePublished = (html) => {
  const m = /"datePublished"\s*:\s*"([^"]+)"/i.exec(html);
  return m ? m[1].slice(0, 10) : null;   // YYYY-MM-DD
};

let updated = 0, unchanged = 0, missing = [];
for (const slug of slugs) {
  let date;
  try { date = datePublished(await get(`${ORIGIN}/${slug}`)); }
  catch (e) { missing.push(`${slug} (${e.message})`); continue; }
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) { missing.push(`${slug} (no datePublished)`); continue; }

  const file = resolve(DIR, `${slug}.md`);
  const md = readFileSync(file, 'utf8');
  const m = /\npublishedDate:\s*"([^"]*)"/.exec(md);
  if (!m) { missing.push(`${slug} (no publishedDate field)`); continue; }
  if (m[1] === date) { unchanged++; continue; }
  writeFileSync(file, md.replace(/\npublishedDate:\s*"[^"]*"/, `\npublishedDate: "${date}"`));
  console.log(`${m[1]} -> ${date}  ${slug}`);
  updated++;
}

console.log(`\nUpdated ${updated}, already-correct ${unchanged}, no date ${missing.length}.`);
if (missing.length) console.log('No date for:\n  ' + missing.join('\n  '));
