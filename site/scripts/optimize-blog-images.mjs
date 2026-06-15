// Downscale + recompress the pulled blog featured images in place. Run from
// site/ in a session WITH dependencies installed (sharp ships with Astro):
//   node scripts/optimize-blog-images.mjs
// Keeps each file's name and extension so the posts' `hero:` paths stay valid;
// it only shrinks oversized originals (the Unsplash full-res ones are ~6MB).
// Re-run is safe: already-small files are skipped.
import { readdirSync, statSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, extname } from 'node:path';

let sharp;
try { sharp = (await import('sharp')).default; }
catch { console.error('sharp not found. Run `npm install` first (Astro provides sharp).'); process.exit(1); }

const DIR = resolve(process.cwd(), 'public/images/blog');
const MAX_W = 1600;      // hero is rendered at 1200px; 1600 covers retina
const TARGET_KB = 250;   // skip files already at/under this
const Q = 80;

const files = readdirSync(DIR).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
let saved = 0, touched = 0, skipped = 0;

for (const f of files) {
  const p = resolve(DIR, f);
  const before = statSync(p).size;
  if (before <= TARGET_KB * 1024) { skipped++; continue; }
  const ext = extname(f).toLowerCase();
  const input = readFileSync(p);
  let img = sharp(input, { failOn: 'none' }).rotate().resize({ width: MAX_W, withoutEnlargement: true });
  if (ext === '.png') img = img.png({ quality: Q, compressionLevel: 9 });
  else if (ext === '.webp') img = img.webp({ quality: Q });
  else img = img.jpeg({ quality: Q, mozjpeg: true });
  const out = await img.toBuffer();
  if (out.length < before) {
    writeFileSync(p, out);
    saved += before - out.length;
    touched++;
    console.log(`${f}: ${(before / 1024 / 1024).toFixed(2)}MB -> ${(out.length / 1024).toFixed(0)}KB`);
  } else { skipped++; }
}

console.log(`\nOptimised ${touched}, skipped ${skipped}. Saved ${(saved / 1024 / 1024).toFixed(1)}MB total.`);
