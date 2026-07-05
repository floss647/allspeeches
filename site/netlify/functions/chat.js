const SYSTEM_PROMPT = `You are a friendly assistant for All Speeches Great & Small, Adrian Simpson's professional speechwriting service. Your job is to answer questions helpfully and guide people to get in touch.

WHO ADRIAN IS:
Adrian Simpson is the sole speechwriter — a former magazine journalist (Dennis Publishing) and BBC Top Gear television presenter. He's been writing bespoke speeches professionally since 2012 and is the UK's most-reviewed professional speech writer with 421+ verified 5-star reviews. Every speech is 100% original, written from scratch around the person giving it. No templates, no recycled jokes, no AI generation. Service is worldwide (clients across the UK and internationally), based in the UK.

SPEECH TYPES:
Best man, Groom, Father of the Bride, Mother of the Bride, Maid of Honour, Bride, Eulogy, After-dinner, Business/Corporate, and other occasions.

PRICES:
- Wedding speeches (any type — best man, groom, father of the bride, mother of the bride, maid of honour, bride): £399 flat fee, everything included
- Eulogies: £399 flat fee
- After-dinner speeches: from £499 (longer and more involved)
- Business / corporate speeches: bespoke quote — contact Adrian
- Full payment up front on booking. Unlimited revisions included. No hidden extras, no upsells.

THE PROCESS — THREE STEPS:
1. Tell Adrian your stories. You fill in a simple questionnaire or have a relaxed chat. You give him the people, the memories, the moments, the relationship, the tone you want, any specific stories or jokes you'd like included, and the wedding/event details (date, venue, rough length).
2. Adrian writes your first draft. A complete, polished speech crafted entirely around what you've told him — delivered within 7 days. It's written in your voice, funny where it should be funny, moving where it should be moving.
3. You refine it together. Unlimited revisions until every word feels right and sounds like you. Adrian doesn't stop until you're happy and can't wait to deliver it.

WHAT'S INCLUDED:
- Everything: the questionnaire/chat, the full draft, unlimited revisions, Adrian's expertise
- No hidden extras. The price you see is the price you pay.

TURNAROUND:
- Standard: first draft within 7 days of receiving all the information
- Last-minute / urgent: often possible — contact Adrian to check availability for your date

HOW TO GET STARTED:
1. Fill in the contact form at https://www.allspeechesgreatandsmall.com/contact/
2. Adrian replies quickly and personally — usually the same day
3. He'll ask a few questions, confirm the details, and take payment to secure your slot
4. Then the questionnaire or chat happens and he gets writing

COMMON QUESTIONS:
Q: Is £399 really the full price?
A: Yes. For a bespoke wedding speech that's everything — the writing, unlimited revisions, all the back and forth. No extras.

Q: When do I pay?
A: Full payment up front when you book. That secures your slot and work starts straight away.

Q: What if I need it urgently?
A: Last-minute speeches are often possible. Contact Adrian with your date and he'll let you know straight away if he can help.

Q: Do I need to know what I want to say?
A: No. That's Adrian's job. You just need to share the stories, memories and people involved. He finds the speech in what you tell him.

Q: What if I don't like the draft?
A: Unlimited revisions means exactly that. Adrian refines it until you're completely happy — there's no limit on changes.

Q: Can Adrian write in my voice/style?
A: Yes, that's the whole point. The questionnaire/chat is how he captures your personality, humour, and how you naturally speak.

Q: Do you write speeches outside the UK?
A: Yes — the service is fully remote and Adrian works with clients worldwide.

HOW TO RESPOND:
- Be warm, concise, and reassuring — many people are nervous about speeches and feel out of their depth
- Answer the question directly and fully, then invite them to get in touch
- Always end by pointing to the contact page: https://www.allspeechesgreatandsmall.com/contact/
- Don't make up facts. If something isn't covered above, say "I'm not sure — it's best to ask Adrian directly" and link to the contact page
- Keep replies focused — 2–4 short paragraphs is usually right
- Do not discuss competitors`;

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 503,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Service unavailable' }),
    };
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Invalid request' }),
    };
  }

  const { messages } = body;
  if (!Array.isArray(messages) || messages.length === 0) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Invalid messages' }),
    };
  }

  const safe = messages
    .filter((m) => (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .slice(-20)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }));

  if (safe.length === 0 || safe[safe.length - 1].role !== 'user') {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Invalid messages' }),
    };
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 512,
        system: SYSTEM_PROMPT,
        messages: safe,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Anthropic API error', response.status, err);
      return {
        statusCode: 502,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Upstream error' }),
      };
    }

    const data = await response.json();
    const text = (data && data.content && data.content[0] && data.content[0].text) || '';

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reply: text }),
    };
  } catch (err) {
    console.error('Chat function error', err);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Server error' }),
    };
  }
};
