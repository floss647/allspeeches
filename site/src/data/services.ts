export interface ServiceFaq { q: string; a: string; }

export interface ServiceData {
  slug: string;           // route path
  key: string;            // short id
  nav: string;            // nav label
  cardTitle: string;      // home card title
  cardBlurb: string;      // home card blurb
  cardImage: string;
  title: string;          // <title>
  meta: string;           // meta description
  h1: string;
  serviceType: string;
  withPrice: boolean;
  heroImage: string;
  ctaLabel: string;
  intro: string[];        // intro paragraphs
  whatYouGet: { heading: string; items: string[] };
  howItWorks: string[];
  guidePath: string | null;
  guideLabel: string | null;
  faqs: ServiceFaq[];
  gentle?: boolean;       // softer tone (eulogy)
  priceValue?: string;    // overrides SITE.price (e.g. after-dinner 499)
  priceFrom?: boolean;    // show "from £X" rather than a flat fee
}

const T = '[X]'; // turnaround placeholder, filled at render via fill()

export const services: ServiceData[] = [
  {
    slug: '/best-man-speech-writer/',
    key: 'best-man',
    nav: 'Best Man',
    cardTitle: 'Best Man Speech',
    cardBlurb: 'Funny, warm and genuinely yours.',
    cardImage: '/images/card-best-man.webp',
    title: 'Best Man Speech Writer | Bespoke & Original from £399',
    meta: "Hire the UK's top-rated best man speech writer. 100% original, built around your stories — no templates. Trusted by hundreds of best men. Get started today.",
    h1: 'Best Man Speech Writer',
    serviceType: 'Best man speech writing',
    withPrice: true,
    heroImage: '/images/card-best-man.webp',
    ctaLabel: 'Get my best man speech written — £399',
    intro: [
      "Being asked to be best man is an honour. Being asked to stand up and speak in front of everyone the groom has ever met is the terrifying bit. I take that part off your hands — writing you a best man speech that's funny, warm and unmistakably yours, so you can enjoy the day instead of dreading the tapping of a glass.",
      "I'm Adrian Simpson, the UK's most highly rated and reviewed professional speech writer. I've written hundreds of best man speeches, and not one of them came from a template.",
    ],
    whatYouGet: {
      heading: 'What you get',
      items: [
        '<strong>A 100% original speech</strong>, written from scratch around your friendship with the groom — never a recycled line or a stock joke.',
        '<strong>Your stories, told properly.</strong> You give me the memories; I find the angle, the timing and the punchlines that make them land.',
        '<strong>Jokes that get laughs without causing offence.</strong> Sharp, never cheap — and always read for the room.',
        '<strong>Unlimited revisions.</strong> We tweak it together until every word feels like you.',
        `<strong>Delivery in ${T} days</strong>, with last-minute turnarounds available.`,
      ],
    },
    howItWorks: [
      '<strong>Tell me about the groom.</strong> A relaxed chat or a simple questionnaire — how you met, the stories, the in-jokes, the things you’d never say to his face (and the things you would).',
      '<strong>I write your draft.</strong> A complete, structured, polished best man speech, built entirely around what you’ve told me.',
      '<strong>We make it perfect.</strong> You read it, we refine it, and we keep going until you can’t wait to deliver it.',
    ],
    guidePath: '/best-man-speeches/',
    guideLabel: 'Read the Ultimate Best Man Speech Guide',
    faqs: [
      { q: 'How does the process work?', a: 'You share your stories with me, I write a complete speech around them, and we refine it together until it’s perfect.' },
      { q: 'How long does it take?', a: `Most best man speeches are drafted within ${T} days, and I can work to tight deadlines when needed.` },
      { q: 'Will it sound like me?', a: 'Yes. I write in your voice, using your humour and your stories, so it sounds like the best possible version of you — not like a writer.' },
      { q: "What if I don't have many good stories?", a: 'Most people have far more material than they realise. A short conversation almost always uncovers the gold.' },
      { q: 'How do you handle jokes about the groom?', a: 'Sharp but never cruel, and always judged for the audience — grandparents and all.' },
      { q: 'Can you help at the last minute?', a: 'Yes. Get in touch and tell me the date — I’ll let you know straight away if I can help.' },
    ],
  },
  {
    slug: '/groom-speech-writer',
    key: 'groom',
    nav: 'Groom',
    cardTitle: 'Groom Speech',
    cardBlurb: 'Heartfelt thanks and the perfect words for your partner.',
    cardImage: '/images/card-groom.webp',
    title: 'Groom Speech Writer | Heartfelt, Original Speeches from £399',
    meta: "Hire a professional groom speech writer. Sincere, funny and 100% original — written around your relationship, never a template. UK's most-reviewed speechwriter.",
    h1: 'Groom Speech Writer',
    serviceType: 'Groom speech writing',
    withPrice: true,
    heroImage: '/images/card-groom.webp',
    ctaLabel: 'Get my groom speech written — £399',
    intro: [
      "The groom's speech is the one with the most to do: thank everyone, raise a few laughs, and say something about your partner that you'll both remember for the rest of your lives. That's a lot to balance — which is exactly why I write groom speeches for a living. I'll craft you something sincere, genuinely funny and completely original, so you can speak from the heart without the weeks of worry.",
    ],
    whatYouGet: {
      heading: 'What you get',
      items: [
        '<strong>A 100% original groom speech</strong>, built around your relationship — never a template.',
        '<strong>The perfect balance of funny and heartfelt</strong>, judged so the laughs and the lump-in-the-throat moment land in the right places.',
        '<strong>Every thank-you handled gracefully</strong>, in the right order, without it dragging.',
        '<strong>The words for your partner</strong> that you mean but can’t quite phrase yourself.',
        `<strong>Unlimited revisions</strong> and delivery in ${T} days.`,
      ],
    },
    howItWorks: [
      '<strong>Tell me your story.</strong> How you met, your partner, the families, the people you want to thank.',
      '<strong>I write your draft</strong> — a complete, beautifully balanced groom speech.',
      '<strong>We refine it together</strong> until it’s exactly right.',
    ],
    guidePath: '/groom-speeches',
    guideLabel: 'Read the Groom Speech Guide',
    faqs: [
      { q: 'How does it work?', a: 'You share your story, I write the speech, we perfect it together.' },
      { q: 'How do you balance funny and heartfelt?', a: 'Carefully — laughs early to settle the nerves, sincerity built towards the toast.' },
      { q: "How do I thank everyone without it dragging?", a: 'I weave thanks into the story so they feel warm, not like a list.' },
      { q: 'How long does it take?', a: `Usually ${T} days; last-minute help available.` },
      { q: 'Will it sound like me?', a: 'Always — it’s your voice, your story.' },
    ],
  },
  {
    slug: '/father-of-the-bride-speech-writer',
    key: 'fotb',
    nav: 'Father of the Bride',
    cardTitle: 'Father of the Bride Speech',
    cardBlurb: 'Proud, moving and beautifully judged.',
    cardImage: '/images/card-father-of-bride.webp',
    title: 'Father of the Bride Speech Writer | From £399',
    meta: "A professional father of the bride speech writer. Warm, proud and original — written around your daughter's story, no clichés. The UK's most-reviewed speechwriter.",
    h1: 'Father of the Bride Speech Writer',
    serviceType: 'Father of the bride speech writing',
    withPrice: true,
    heroImage: '/images/card-father-of-bride.webp',
    ctaLabel: 'Get my father of the bride speech written — £399',
    intro: [
      "It's one of the proudest moments of your life — and one of the hardest to put into words. The father of the bride speech has to be warm, a little funny, genuinely moving, and somehow sum up everything you feel about your daughter without falling apart at the lectern. I'll write you something that does all of that, in your voice, so you can simply enjoy the moment.",
    ],
    whatYouGet: {
      heading: 'What you get',
      items: [
        '<strong>A 100% original speech</strong> about your daughter — never a template.',
        '<strong>Pride and emotion, beautifully judged</strong>, so it moves the room without overwhelming you.',
        '<strong>A warm welcome</strong> for the groom (or bride) and their family.',
        '<strong>The right touch of humour</strong> to balance the sentiment.',
        `<strong>Unlimited revisions</strong> and delivery in ${T} days.`,
      ],
    },
    howItWorks: [
      '<strong>Tell me about your daughter</strong> — her childhood, who she’s become, her partner, the family.',
      '<strong>I write your draft</strong> — a complete, moving father of the bride speech.',
      '<strong>We perfect it together.</strong>',
    ],
    guidePath: '/father-of-the-bride-speeches',
    guideLabel: 'Read the Father of the Bride Speech Guide',
    faqs: [
      { q: 'How does it work?', a: 'You share your memories, I write the speech, we refine it together.' },
      { q: "How do I welcome the groom's family warmly?", a: 'I’ll craft a genuine welcome that brings both families together.' },
      { q: 'How emotional is too emotional?', a: 'I judge the balance so it’s moving but deliverable — you’ll get through it.' },
      { q: 'How long does it take?', a: `Usually ${T} days; last-minute help available.` },
      { q: 'Will it sound like me?', a: 'Yes — your voice, your daughter, your story.' },
    ],
  },
  {
    slug: '/maid-of-honour-speech-writer',
    key: 'moh',
    nav: 'Maid of Honour',
    cardTitle: 'Maid of Honour Speech',
    cardBlurb: 'Touching and funny in equal measure.',
    cardImage: '/images/card-maid-of-honour.webp',
    title: 'Maid of Honour Speech Writer | Bespoke Speeches from £399',
    meta: "Hire a professional maid of honour speech writer. Funny, touching and 100% original — written around your friendship, never a template. UK's most-reviewed.",
    h1: 'Maid of Honour Speech Writer',
    serviceType: 'Maid of honour speech writing',
    withPrice: true,
    heroImage: '/images/card-maid-of-honour.webp',
    ctaLabel: 'Get my maid of honour speech written — £399',
    intro: [
      "The maid of honour speech is having its moment — and it should be brilliant. Funny, touching, and full of the friendship only you two share. I'll write you a maid of honour speech that has the room laughing one minute and reaching for a tissue the next, all in your voice and built entirely around your story.",
    ],
    whatYouGet: {
      heading: 'What you get',
      items: [
        '<strong>A 100% original speech</strong>, built around your friendship — never a template.',
        '<strong>Funny and touching in the right measure.</strong>',
        '<strong>Stories told with warmth and discretion</strong>, including the ones that need careful handling.',
        `<strong>Unlimited revisions</strong> and delivery in ${T} days.`,
      ],
    },
    howItWorks: [
      '<strong>Tell me about your friend</strong> — how you met, the years between, who she’s marrying.',
      '<strong>I write your draft.</strong>',
      '<strong>We perfect it together.</strong>',
    ],
    guidePath: '/moh-speeches',
    guideLabel: 'Read the Maid of Honour Speech Guide',
    faqs: [
      { q: 'How does it work?', a: 'You share your stories, I write the speech, we refine it together.' },
      { q: 'How do you balance funny and sentimental?', a: 'Laughs to open, warmth to close — judged for the room.' },
      { q: 'What if our best stories are private?', a: 'I handle sensitive material with discretion and tact, keeping the warmth without the overshare.' },
      { q: 'How long does it take?', a: `Usually ${T} days; last-minute help available.` },
      { q: 'Will it sound like me?', a: 'Always.' },
    ],
  },
  {
    slug: '/eulogy-writing-service',
    key: 'eulogy',
    nav: 'Eulogy',
    cardTitle: 'Eulogy',
    cardBlurb: 'A fitting, personal tribute, written with care.',
    cardImage: '/images/card-eulogy.webp',
    title: 'Eulogy Writing Service | Compassionate, Personal Tributes',
    meta: 'A compassionate eulogy writing service. A professional writer helps you create a personal, fitting tribute — gently guided, in your words, at a difficult time.',
    h1: 'Eulogy Writing Service',
    serviceType: 'Eulogy writing',
    withPrice: false,
    heroImage: '/images/card-eulogy.webp',
    ctaLabel: 'Get in touch',
    gentle: true,
    intro: [
      "Writing a eulogy is one of the hardest things you'll ever be asked to do, often at the very worst time. You don't have to do it alone. I'll gently help you create a personal, fitting tribute — one that captures who they were and gives everyone there something to hold on to. There's no pressure and no rush beyond what the day requires; just careful, patient help when you need it most.",
    ],
    whatYouGet: {
      heading: 'How I can help',
      items: [
        '<strong>A personal tribute in your words</strong>, shaped from your memories of them.',
        '<strong>Gentle guidance</strong> through what to include and how to structure it.',
        '<strong>Careful, unhurried support</strong> — we work at whatever pace you can manage.',
        '<strong>Complete discretion</strong> throughout.',
      ],
    },
    howItWorks: [
      '<strong>Share your memories</strong> — however they come. A conversation, some notes, whatever feels manageable.',
      '<strong>I shape them into a eulogy</strong> — warm, fitting and true to them.',
      '<strong>We adjust it together</strong> until it feels right.',
    ],
    guidePath: '/eulogy-examples',
    guideLabel: 'How to write a eulogy',
    faqs: [
      { q: 'How does this work at such a difficult time?', a: 'Gently. You share what you can, I do the shaping, and there’s no pressure at any stage.' },
      { q: 'How quickly can you help?', a: 'Quickly when needed — please just tell me the date and I’ll do everything I can.' },
      { q: 'How do we share memories with you?', a: 'However is easiest — a phone call, written notes, or both.' },
      { q: 'How long should a eulogy be?', a: 'Usually three to five minutes. I’ll help you judge it.' },
      { q: 'Is it confidential?', a: 'Always, completely.' },
    ],
  },
  {
    slug: '/speech-review-service',
    key: 'review',
    nav: 'Speech Review',
    cardTitle: 'Speech Review',
    cardBlurb: 'Already written it? Get a professional second opinion.',
    cardImage: '/images/card-speech-review.webp',
    title: 'Speech Review Service | Professional Feedback on Your Speech',
    meta: "Already written your speech? Get professional feedback from the UK's most-reviewed speechwriter — structure, jokes, timing and delivery, fast and affordable.",
    h1: 'Speech Review Service',
    serviceType: 'Speech review and feedback',
    withPrice: false,
    heroImage: '/images/card-speech-review.webp',
    ctaLabel: 'Send me your speech',
    intro: [
      "Written your own speech and want to know if it's any good before you stand up? Send it to me. I'll give you honest, professional feedback — what's working, what isn't, and exactly how to make it better. It's the reassurance of a second opinion from someone who does this for a living.",
    ],
    whatYouGet: {
      heading: 'What you get back',
      items: [
        '<strong>Honest, constructive feedback</strong> on structure, content and tone.',
        '<strong>Specific suggestions</strong> — which jokes land, which to cut, where to add warmth.',
        '<strong>Notes on length, timing and delivery</strong>, so it works out loud, not just on paper.',
        '<strong>Clear, friendly guidance</strong> you can act on straight away.',
      ],
    },
    howItWorks: [
      '<strong>Send me your speech</strong> and tell me about the occasion.',
      '<strong>I review it</strong> and write up my feedback.',
      '<strong>You refine it</strong> with confidence.',
    ],
    guidePath: null,
    guideLabel: null,
    faqs: [
      { q: 'What do I get back?', a: 'Written, structured feedback with specific, actionable suggestions.' },
      { q: 'How fast?', a: `Usually within ${T} days — tell me your date if it’s tight.` },
      { q: 'Will you rewrite it or just advise?', a: 'The review service is feedback and guidance; if you’d like me to write or substantially rewrite it, I can do that as a full speech instead.' },
      { q: 'What do you check?', a: 'Structure, content, humour, tone, length, timing and delivery.' },
      { q: 'How do I send it?', a: 'Just get in touch and I’ll tell you where to send it.' },
    ],
  },
  {
    slug: '/after-dinner-speeches/',
    key: 'after-dinner',
    nav: 'After-Dinner',
    cardTitle: 'After-Dinner Speech',
    cardBlurb: 'Original, genuinely funny, built to hold a room.',
    cardImage: '/images/card-after-dinner.webp',
    title: 'After-Dinner Speech Writer | Original Speeches That Actually Land',
    meta: "A professional after-dinner speech writer for dinners, clubs, awards and events. Original, genuinely funny, written around you and your audience — never circuit gags. UK's most-reviewed.",
    h1: 'After-Dinner Speech Writer',
    serviceType: 'After-dinner speech writing',
    withPrice: true,
    priceValue: '499',
    priceFrom: true,
    heroImage: '/images/card-after-dinner.webp',
    ctaLabel: 'Get my after-dinner speech written',
    intro: [
      'The after-dinner speech is a different animal. There’s no running order of thank-yous to get through, no bride to toast, no safety net. The room has been fed, watered and seated for an hour — and now they want to be entertained. That’s the whole job, and it’s a hard one. Get it right and you’re the best part of the night.',
      'I write after-dinner speeches that are original, genuinely funny and built to hold a room — pitched for your audience, in your voice, around your material. You stand up with something worth saying; I take care of getting it there.',
    ],
    whatYouGet: {
      heading: 'What makes mine different',
      items: [
        '<strong>No circuit gags.</strong> Every line is written for you and your room — not lifted from the same tired routine everyone’s heard at the last three dinners.',
        '<strong>Built to be heard, not read.</strong> Decades writing for broadcast means it’s shaped for the ear: rhythm, set-ups, pauses, the lot.',
        '<strong>Pitched for the actual audience.</strong> A rugby club and a livery company want very different evenings. The speech is tuned to yours.',
        `<strong>Yours, start to finish.</strong> Your stories, your voice, unlimited revisions — delivered in ${T} days, last-minute possible.`,
      ],
    },
    howItWorks: [
      '<strong>Tell me about the night.</strong> The event, the crowd, the tone they’re expecting — and your material, your angle, the thing you want them talking about afterwards.',
      '<strong>I write the speech.</strong> A complete, structured, genuinely entertaining draft, built around all of it.',
      '<strong>We sharpen it together.</strong> You read it, we cut, we tighten, we time it — until it lands.',
    ],
    guidePath: null,
    guideLabel: null,
    faqs: [
      { q: 'What makes an after-dinner speech different from a wedding speech?', a: 'Everything except the nerves. There’s no running order of thank-yous to hit — the whole job is to entertain a well-fed, well-watered room for ten or twenty minutes, so it has to be funnier, tighter and built entirely around holding their attention.' },
      { q: 'What kinds of events do you write for?', a: 'Charity and gala dinners, sports and social clubs, corporate awards, retirements, and association or society dinners — anywhere someone’s been handed the after-dinner slot and told to be good.' },
      { q: 'How long should an after-dinner speech be?', a: 'Usually ten to twenty minutes, depending on the event and your billing. I’ll help you pitch the length to the room.' },
      { q: 'Will it actually be funny?', a: 'That’s the entire point — original, well-timed humour written for your specific audience, never the recycled circuit gags everyone’s heard.' },
      { q: 'How does it work?', a: 'You tell me about the event, the audience and your material; I write the speech; we refine it together until it’s exactly right.' },
      { q: 'How quickly can you turn it around?', a: `Usually within ${T} days, and I can work to a tight deadline when the date’s looming.` },
    ],
  },
];

export function getService(key: string) {
  return services.find((s) => s.key === key);
}
