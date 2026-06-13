// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Canonical host — keep www, per the SEO migration plan.
export default defineConfig({
  site: 'https://www.allspeechesgreatandsmall.com',
  trailingSlash: 'ignore',
  build: {
    // Emit /page/index.html so both /page and /page/ resolve to static HTML.
    format: 'directory',
  },
  integrations: [
    sitemap({
      // /privacy and /terms are noindex — keep them out of the sitemap.
      filter: (page) =>
        !page.includes('/privacy') && !page.includes('/terms'),
    }),
  ],
});
