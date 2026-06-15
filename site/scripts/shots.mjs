import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const OUT = '/tmp/shots';
mkdirSync(OUT, { recursive: true });

const pages = [
  ['/', 'home'],
  ['/best-man-speech-writer/', 'service-best-man'],
  ['/best-man-speeches/', 'guide-best-man'],
  ['/pricing', 'pricing'],
  ['/reviews', 'reviews'],
  ['/contact', 'contact'],
  ['/about-adrian-simpson-speechwriter/', 'about'],
  ['/blogs/', 'blog-index'],
  ['/how-long-should-a-best-man-speech-be', 'blog-post'],
];

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
});
// Desktop
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
for (const [url, name] of pages) {
  await page.goto('http://localhost:4321' + url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: true });
  console.log('shot', name);
}
// Mobile home
const mctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
const mpage = await mctx.newPage();
await mpage.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
await mpage.waitForTimeout(400);
await mpage.screenshot({ path: `${OUT}/home-mobile.png`, fullPage: true });
console.log('shot home-mobile');

await browser.close();
