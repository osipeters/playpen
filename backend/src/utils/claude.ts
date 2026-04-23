import Anthropic from '@anthropic-ai/sdk';
import type { MessageParam } from '@anthropic-ai/sdk/resources/messages.mjs';
import dotenv from 'dotenv';

dotenv.config();

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const conversationContexts: Map<string, MessageParam[]> = new Map();

export async function callClaudeForRedesign(
  html: string,
  userPrompt: string,
  screenshot: string,
  history: MessageParam[],
  sessionId: string
): Promise<string> {
  const systemPrompt = `You are an expert web designer specializing in modern, visually appealing link-in-bio pages.
Your task is to redesign HTML pages based on user feedback while maintaining all links and functionality.

Important rules:
1. Return ONLY the complete HTML code, nothing else
2. All CSS must be inline or in <style> tags (no external stylesheets)
3. The HTML must be fully standalone and work without external dependencies
4. Keep all original links and interactive elements
5. Preserve any existing images/media or describe how they should be styled
6. Make the design mobile-responsive
7. Use modern design principles (good typography, spacing, color, contrast)`;

  const userContent = [
    {
      type: 'image' as const,
      source: {
        type: 'base64' as const,
        media_type: 'image/png' as const,
        data: screenshot.replace(/^data:image\/png;base64,/, ''),
      },
    },
    {
      type: 'text' as const,
      text: `Here is the current page design (shown above). The HTML is:

\`\`\`html
${html}
\`\`\`

User request: ${userPrompt}

Please redesign the page according to the user's request. Remember to consider any previous design changes in the conversation history. Return the complete HTML code only.`,
    },
  ];

  const messages: MessageParam[] = [...history];

  messages.push({
    role: 'user',
    content: userContent as MessageParam['content'],
  });

  const response = await client.messages.create({
    model: 'claude-opus-4-7',
    max_tokens: 10000,
    system: systemPrompt,
    messages,
  });

  const assistantMessage = response.content[0];
  if (assistantMessage.type !== 'text') {
    throw new Error('Unexpected response type from Claude');
  }

  const redesignedHtml = assistantMessage.text
    .replace(/^```html\n?/, '')
    .replace(/\n?```$/, '')
    .trim();

  messages.push({
    role: 'assistant',
    content: redesignedHtml,
  });

  conversationContexts.set(sessionId, messages);

  return redesignedHtml;
}

export async function callClaudeForSuggestions(
  html: string,
  screenshot: string,
  history: MessageParam[],
  sessionId: string
): Promise<string[]> {
  const systemPrompt = `You are an expert web designer specializing in link-in-bio pages.
Analyze the current page design and suggest 3-4 different design direction variations the user might want to explore.
Format your response as a JSON array of strings, where each string is a design direction suggestion (not code, just descriptions).

Example format: ["Modern minimalist with dark mode", "Vibrant gradient design", "Professional business style", "Fun playful aesthetic"]`;

  const userContent = [
    {
      type: 'image' as const,
      source: {
        type: 'base64' as const,
        media_type: 'image/png' as const,
        data: screenshot.replace(/^data:image\/png;base64,/, ''),
      },
    },
    {
      type: 'text' as const,
      text: `Here is the current link-in-bio page design (shown above). What are 3-4 different design directions we could explore for this page? Consider different styles, themes, and layouts that might appeal to different audiences.

Return only a valid JSON array of strings with your suggestions.`,
    },
  ];

  const messages: MessageParam[] = [...history];

  messages.push({
    role: 'user',
    content: userContent as MessageParam['content'],
  });

  const response = await client.messages.create({
    model: 'claude-opus-4-7',
    max_tokens: 1000,
    system: systemPrompt,
    messages,
  });

  const assistantMessage = response.content[0];
  if (assistantMessage.type !== 'text') {
    throw new Error('Unexpected response type from Claude');
  }

  try {
    const suggestions = JSON.parse(assistantMessage.text);
    return Array.isArray(suggestions) ? suggestions : [];
  } catch {
    console.error('Failed to parse suggestions:', assistantMessage.text);
    return ['Modern minimalist', 'Bold and vibrant', 'Professional and elegant', 'Playful and fun'];
  }
}
