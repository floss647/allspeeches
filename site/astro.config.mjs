// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const SITE = 'https://www.allspeechesgreatandsmall.com';

// Every page is served with a trailing slash (directory build + Netlify's
// no-slash -> slash 301), so every <loc> in the sitemap must carry one too.
/** @param {string} loc */
function canonical(loc) {
  const path = new URL(loc).pathname;
  if (path === '/') return SITE + '/';
  return SITE + (path.endsWith('/') ? path : path + '/');
}

// Canonical host — keep www, per the SEO migration plan.
export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  build: {
    // Emit /page/index.html so both /page and /page/ resolve to static HTML.
    format: 'directory',
  },
  integrations: [
    sitemap({
      // noindex pages (/privacy, /terms, /thank-you) stay out of the sitemap.
      filter: (page) =>
        !page.includes('/privacy') && !page.includes('/terms') && !page.includes('/thank-you'),
      // Match each <loc> to its exact preserved slug (mixed trailing slashes).
      serialize: (item) => ({ ...item, url: canonical(item.url) }),
    }),
  ],
});
