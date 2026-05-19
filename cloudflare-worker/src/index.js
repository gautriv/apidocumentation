export default {
  async fetch(request, env) {
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }
    try {
      const { message, lessonSlug } = await request.json();
      
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-haiku-20240307',
          max_tokens: 1024,
          system: `You are Maya, an expert API documentation guide. Answer questions about the lesson context: ${lessonSlug}. Be concise, helpful, and friendly.`,
          messages: [{ role: 'user', content: message }],
          stream: true
        })
      });
      
      return new Response(response.body, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Access-Control-Allow-Origin': '*'
        }
      });
    } catch (err) {
      return new Response('Error', { status: 500 });
    }
  }
}
