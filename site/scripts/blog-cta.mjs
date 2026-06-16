// Add a subject-specific CTA (the `related` frontmatter field) to every blog
// post, linking it to the matching speech-writing service page. The blog
// template renders this as a "Would you rather I wrote it for you?" button.
//   node scripts/blog-cta.mjs
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const DIR = resolve(process.cwd(), 'src/content/blog');

const BY_CATEGORY = {
  'best-man': { label: 'Get your best man speech written', path: '/best-man-speech-writer/' },
  'groom': { label: 'Get your groom speech written', path: '/groom-speech-writer' },
  'father-of-the-bride': { label: 'Get your father of the bride speech written', path: '/father-of-the-bride-speech-writer' },
  'maid-of-honour': { label: 'Get your maid of honour speech written', path: '/maid-of-honour-speech-writer' },
  'eulogy': { label: 'Get help writing a eulogy', path: '/eulogy-writing-service' },
  'wedding-speeches': { label: 'Let a professional write your speech', path: '/' },
};

// A few generic-category posts are really about a specific role.
const BY_SLUG = {
  'write-maid-honor-speech': BY_CATEGORY['maid-of-honour'],
};

const yaml = (s) => '"' + String(s).replace(/"/g, '\\"') + '"';
const slugs = readdirSync(DIR).filter((f) => f.endsWith('.md'));

let added = 0, replaced = 0, skipped = [];
for (const file of slugs) {
  const slug = file.replace(/\.md$/, '');
  const p = resolve(DIR, file);
  let md = readFileSync(p, 'utf8');

  const cat = (/\ncategory:\s*"([^"]*)"/.exec(md) || [])[1] || 'wedding-speeches';
  const target = BY_SLUG[slug] || BY_CATEGORY[cat] || BY_CATEGORY['wedding-speeches'];
  if (!target) { skipped.push(slug); continue; }

  const block = `related:\n  label: ${yaml(target.label)}\n  path: ${yaml(target.path)}\n`;

  // Frontmatter is between the opening "---\n" and the next "\n---".
  const end = md.indexOf('\n---', 3);
  if (end === -1) { skipped.push(slug + ' (no frontmatter)'); continue; }

  const hadRelated = /\nrelated:\s*\n/.test(md.slice(0, end));
  if (hadRelated) {
    // Replace an existing related block (label+path lines that follow).
    md = md.replace(/\nrelated:\s*\n(?:[ \t]+\w+:.*\n?)*/, '\n' + block);
    replaced++;
  } else {
    md = md.slice(0, end + 1) + block + md.slice(end + 1); // insert before closing ---
    added++;
  }
  writeFileSync(p, md);
}

console.log(`Added ${added}, replaced ${replaced}, skipped ${skipped.length}.`);
if (skipped.length) console.log('skipped:', skipped.join(', '));
