// One-off housekeeping: remove em (—, U+2014) and en (–, U+2013) dashes from
// visible copy, replacing them with commas (or "to" for number ranges).
// ASCII hyphens (U+002D) in slugs, filenames, CSS and code are left untouched.
// Minimal by design: only the dash itself (plus immediately adjacent spaces) is
// rewritten, so indentation, line breaks and existing punctuation are preserved.
// (.css is excluded — its only dash is the intentional FAQ toggle glyph.)
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { resolve, join, extname } from 'node:path';

const ROOT = resolve(process.cwd(), 'src');
const EXTS = new Set(['.astro', '.ts', '.md']);

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (EXTS.has(extname(p))) out.push(p);
  }
  return out;
}

function transform(s) {
  // 1. Number ranges (10–20 -> 10 to 20). Spaces/tabs around the dash optional.
  s = s.replace(/(\d)[ \t]*[–—][ \t]*(\d)/g, '$1 to $2');
  // 2. Every other em/en dash -> ", ". The [ \t]* on each side absorbs the
  //    surrounding spaces so no double space is left (and \n is never matched,
  //    so paragraph/line breaks and indentation survive).
  s = s.replace(/[ \t]*[–—][ \t]*/g, ', ');
  // 3. Collapse a double comma if the dash sat next to an existing comma.
  s = s.replace(/,[ \t]*,/g, ',');
  return s;
}

let files = 0, changed = 0, replaced = 0;
for (const f of walk(ROOT)) {
  files++;
  const before = readFileSync(f, 'utf8');
  const count = (before.match(/[–—]/g) || []).length;
  if (!count) continue;
  const after = transform(before);
  if (after !== before) {
    writeFileSync(f, after);
    changed++;
    replaced += count;
    console.log(`${String(count).padStart(4)}  ${f.replace(ROOT + '/', '')}`);
  }
}
console.log(`\nScanned ${files} files, changed ${changed}, removed ${replaced} em/en dashes.`);
