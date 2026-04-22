import { Request, Response } from 'express';
import { callClaudeForRedesign, callClaudeForSuggestions } from '../utils/claude.js';
import { takeScreenshot } from '../utils/screenshot.js';

interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
}

const conversationHistory: Map<string, ConversationMessage[]> = new Map();

export async function redesignRoute(req: Request, res: Response) {
  try {
    const { html, userPrompt, sessionId } = req.body;

    if (!html || !userPrompt) {
      return res.status(400).json({ error: 'HTML and userPrompt are required' });
    }

    const session = sessionId || 'default';
    const history = conversationHistory.get(session) || [];

    const screenshot = await takeScreenshot(html);

    const redesignedHtml = await callClaudeForRedesign(
      html,
      userPrompt,
      screenshot,
      history,
      session
    );

    history.push({
      role: 'user',
      content: userPrompt,
    });

    history.push({
      role: 'assistant',
      content: redesignedHtml,
    });

    conversationHistory.set(session, history);

    const newScreenshot = await takeScreenshot(redesignedHtml);

    res.json({
      html: redesignedHtml,
      screenshot: newScreenshot,
      sessionId: session,
    });
  } catch (error) {
    console.error('Error redesigning page:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to redesign page',
    });
  }
}

export async function suggestRoute(req: Request, res: Response) {
  try {
    const { html, sessionId } = req.body;

    if (!html) {
      return res.status(400).json({ error: 'HTML is required' });
    }

    const session = sessionId || 'default';
    const history = conversationHistory.get(session) || [];

    const screenshot = await takeScreenshot(html);

    const suggestions = await callClaudeForSuggestions(html, screenshot, history, session);

    res.json({
      suggestions,
      sessionId: session,
    });
  } catch (error) {
    console.error('Error generating suggestions:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to generate suggestions',
    });
  }
}
