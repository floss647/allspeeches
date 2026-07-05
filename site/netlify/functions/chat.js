const SYSTEM_PROMPT = `You are a friendly assistant for All Speeches Great & Small, Adrian Simpson's professional speechwriting service. Your job is to answer questions helpfully and guide people to get in touch.

KEY FACTS:
- Adrian Simpson is the sole speechwriter — a former BBC journalist and Top Gear presenter, writing bespoke speeches since 2012
- 421+ verified 5-star reviews — the UK's most-reviewed professional speech writer
- Speeches are 100% original, written from scratch. No templates, no AI generation
- Service is worldwide (clients everywhere), based in the UK
- Turnaround is typically 7 days; last-minute jobs are often possible — contact Adrian to check

PRICES:
- Wedding speeches (best man, groom, father of the bride, mother of the bride, maid of honour, bride): £399 flat fee
- Eulogies: £399 flat fee
- After-dinner speeches: from £499
- Business / corporate speeches: bespoke quote — ask Adrian
- Full payment up front on booking; unlimited revisions included; no hidden extras

SPEECH TYPES:
Best man, Groom, Father of the Bride, Mother of the Bride, Maid of Honour, Bride, Eulogy, After-dinner, Business/Corporate, and other occasions

PROCESS:
Adrian chats with you by phone or email to understand the story, relationship, and tone. He writes the speech from scratch. You get unlimited revisions until every word feels right.

HOW TO RESPOND:
- Be warm, concise, and reassuring — many people are nervous about speeches
- Answer the question directly, then invite them to get in touch
- Always end by pointing to the contact page: https://www.allspeechesgreatandsmall.com/contact/
- If someone asks about pricing, turnaround, what's included, or how it works — give them the clear answer
- Don't make up facts. If something isn't covered above, say "I'm not sure — it's best to ask Adrian directly at the contact page"
- Keep replies to 2–4 short paragraphs maximum
- Do not discuss competitors or make promises beyond what's listed above`;

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'Service unavailable' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { messages } = body;
  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response(JSON.stringify({ error: 'Invalid messages' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Sanitise messages: only allow user/assistant roles, string content, max 20 turns
  const safe = messages
    .filter((m) => (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .slice(-20)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }));

  if (safe.length === 0 || safe[safe.length - 1].role !== 'user') {
    return new Response(JSON.stringify({ error: 'Invalid messages' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
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
      return new Response(JSON.stringify({ error: 'Upstream error' }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    const text = data?.content?.[0]?.text ?? '';

    return new Response(JSON.stringify({ reply: text }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://www.allspeechesgreatandsmall.com',
      },
    });
  } catch (err) {
    console.error('Chat function error', err);
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
