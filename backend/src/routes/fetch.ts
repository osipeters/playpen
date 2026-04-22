import { Request, Response } from 'express';
import { fetchPageContent } from '../utils/pageClient.js';
import { takeScreenshot } from '../utils/screenshot.js';

export async function fetchPageRoute(req: Request, res: Response) {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    const html = await fetchPageContent(url);
    const screenshot = await takeScreenshot(html);

    res.json({
      html,
      screenshot,
      url,
    });
  } catch (error) {
    console.error('Error fetching page:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to fetch page',
    });
  }
}
