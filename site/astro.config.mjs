// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const SITE = 'https://www.allspeechesgreatandsmall.com';
// Slugs whose trailing slash is part of the existing ranking URL (mirror of
// TRAILING_SLASH_PATHS in src/config/site.ts).
const KEEP_SLASH = new Set([
  '/',
  '/best-man-speech-writer/',
  '/best-man-speeches/',
  '/about-adrian-simpson-speechwriter/',
  '/blogs/',
]);

/** @param {string} loc */
function canonical(loc) {
  const path = new URL(loc).pathname;
  if (path === '/') return SITE + '/';
  const withSlash = path.endsWith('/') ? path : path + '/';
  const noSlash = path.replace(/\/$/, '');
  return SITE + (KEEP_SLASH.has(withSlash) ? withSlash : noSlash);
}

// Canonical host — keep www, per the SEO migration plan.
export default defineConfig({
  site: SITE,
  trailingSlash: 'ignore',
  build: {
    // Emit /page/index.html so both /page and /page/ resolve to static HTML.
    format: 'directory',
  },
  integrations: [
    sitemap({
      // /privacy and /terms are noindex — keep them out of the sitemap.
      filter: (page) => !page.includes('/privacy') && !page.includes('/terms'),
      // Match each <loc> to its exact preserved slug (mixed trailing slashes).
      serialize: (item) => ({ ...item, url: canonical(item.url) }),
    }),
  ],
});
