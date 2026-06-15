// One-off: convert the kit's ENHANCED guide markdown into Astro content-collection
// entries with frontmatter (title, meta, dates, hero, cross-links) + extracted FAQs.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CONTENT = resolve(__dirname, '../../content');
const OUT = resolve(__dirname, '../src/content/guides');
mkdirSync(OUT, { recursive: true });

const guides = [
  { src: 'guide-best-man-ENHANCED.md',           key: 'best-man',  path: '/best-man-speeches/',           hero: '/images/card-best-man.jpg',         service: '/best-man-speech-writer/',           serviceLabel: 'Best Man Speech Writer' },
  { src: 'guide-groom-ENHANCED.md',              key: 'groom',     path: '/groom-speeches',               hero: '/images/card-groom.jpg',            service: '/groom-speech-writer',               serviceLabel: 'Groom Speech Writer' },
  { src: 'guide-father-of-the-bride-ENHANCED.md',key: 'fotb',      path: '/father-of-the-bride-speeches', hero: '/images/card-father-of-bride.jpg',  service: '/father-of-the-bride-speech-writer', serviceLabel: 'Father of the Bride Speech Writer' },
  { src: 'guide-maid-of-honour-ENHANCED.md',     key: 'moh',       path: '/moh-speeches',                 hero: '/images/card-best-man.jpg',         service: '/maid-of-honour-speech-writer',      serviceLabel: 'Maid of Honour Speech Writer' },
  { src: 'guide-eulogy-ENHANCED.md',             key: 'eulogy',    path: '/eulogy-examples',              hero: '/images/adrian-home.jpg',           service: '/eulogy-writing-service',            serviceLabel: 'Eulogy Writing Service' },
];

const yamlEscape = (s) => '"' + String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';

for (const g of guides) {
  const raw = readFileSync(resolve(CONTENT, g.src), 'utf8');

  const title = (raw.match(/^TITLE:\s*(.+)$/m) || [])[1]?.trim() || g.key;
  const meta = (raw.match(/^META:\s*(.+)$/m) || [])[1]?.trim() || '';
  const datePublished = (raw.match(/"datePublished":\s*"([^"]+)"/) || [])[1] || '2026-06-01';
  let dateModified = (raw.match(/"dateModified":\s*"([^"]+)"/) || [])[1] || datePublished;
  const headline = (raw.match(/"headline":\s*"([^"]+)"/) || [])[1] || title;

  // Body = everything after the first standalone --- separating header from article.
  const sepIdx = raw.indexOf('\n---\n');
  let body = raw.slice(sepIdx + 5).trim();

  // Drop the duplicated top H1 (we render the title in the template hero instead),
  // but keep the subtitle/byline lines.
  body = body.replace(/^#\s+.+\n/, '');

  // Convert kit CTA syntax  **[Label →]** /path  → markdown link [Label →](/path)
  body = body.replace(/\*\*\[([^\]]+)\]\*\*\s*(\/[^\s)]+)/g, '[$1]($2)');
  // Convert inline arrow links  [Label →] /path
  body = body.replace(/\[([^\]]+)\]\s*(\/[A-Za-z0-9/-]+)/g, '[$1]($2)');

  // Replace *[VIDEO]* / [VIDEO] tokens with a real, clickable video slot.
  // TODO: swap the channel link for the specific YouTube embed ID per guide.
  const videoBlock =
    '<div class="video-slot">' +
    '<a class="video-slot__play" href="https://www.youtube.com/@Allspeechesgreatandsmallgp" target="_blank" rel="noopener" aria-label="Watch Adrian\'s speech-writing video on YouTube">' +
    '<span class="video-slot__btn">▶</span><span class="video-slot__label">Watch: Adrian\'s tips on this speech</span>' +
    '</a></div>';
  body = body.replace(/^\*?\[VIDEO\]\*?\s*$/gim, videoBlock);

  // Extract FAQs: a `## question?` heading, then the next non-empty content line.
  // Prefer a bold **answer** (AEO snippet style); otherwise fall back to the first
  // sentence(s) of the following paragraph.
  const stripMd = (s) =>
    s.replace(/\*\*(.+?)\*\*/g, '$1').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[*_`>]/g, '').trim();
  const faqs = [];
  const lines = body.split('\n');
  for (let i = 0; i < lines.length; i++) {
    // `## Question? (Optional Label)` — keep only the question up to the ?
    const h = lines[i].match(/^##\s+(.+?\?)(?:\s*\([^)]*\))?\s*$/);
    if (!h) continue;
    let j = i + 1;
    while (j < lines.length && lines[j].trim() === '') j++;
    const line = lines[j] || '';
    // skip placeholder/markup-only lines like *[VIDEO]*
    if (/^\*?\[[A-Z]/.test(line) || line.startsWith('#') || line.startsWith('-') || line.startsWith('>')) continue;
    const bold = line.match(/^\*\*(.+?)\*\*\s*$/);
    let answer;
    if (bold) {
      answer = bold[1];
    } else if (line.trim()) {
      // first 1–2 sentences of the paragraph, capped for schema sanity
      const sentences = stripMd(line).match(/[^.!?]+[.!?]+/g) || [stripMd(line)];
      answer = sentences.slice(0, 2).join(' ').trim();
      if (answer.length > 320) answer = answer.slice(0, 300).replace(/\s+\S*$/, '') + '…';
    }
    if (answer) faqs.push({ q: h[1].trim(), a: stripMd(answer).replace(/\s+/g, ' ') });
  }

  const fm = [
    '---',
    `title: ${yamlEscape(title)}`,
    `headline: ${yamlEscape(headline)}`,
    `description: ${yamlEscape(meta)}`,
    `path: ${yamlEscape(g.path)}`,
    `hero: ${yamlEscape(g.hero)}`,
    `service: ${yamlEscape(g.service)}`,
    `serviceLabel: ${yamlEscape(g.serviceLabel)}`,
    `datePublished: ${yamlEscape(datePublished)}`,
    `dateModified: ${yamlEscape(dateModified)}`,
    'faqs:',
    ...faqs.flatMap((f) => [`  - q: ${yamlEscape(f.q)}`, `    a: ${yamlEscape(f.a)}`]),
    '---',
    '',
  ].join('\n');

  writeFileSync(resolve(OUT, `${g.key}.md`), fm + body + '\n');
  console.log(`✓ ${g.key}: ${faqs.length} FAQs, ${body.length} chars`);
}
