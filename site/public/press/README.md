# Press logos for the "As featured in" strip

Drop outlet logos here, then point to them from `featuredIn` in
`src/config/site.ts`, e.g.:

    { name: 'The Times', logo: '/press/the-times.svg' }

Guidance for best results:
- Prefer **SVG**; otherwise transparent **PNG** at ~2x (logo ≈ 60px tall).
- Transparent background, trimmed of surrounding whitespace.
- Single-colour / mono versions look best — the strip greyscales and
  mutes them automatically so they sit together, and restores full
  colour on hover/link.
