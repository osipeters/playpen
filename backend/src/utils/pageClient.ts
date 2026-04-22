export async function fetchPageContent(url: string): Promise<string> {
  try {
    // Validate URL
    const urlObj = new URL(url);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch page: ${response.statusText}`);
    }

    const html = await response.text();

    if (!html) {
      throw new Error('Page returned empty content');
    }

    return html;
  } catch (error) {
    throw new Error(
      `Failed to fetch page from ${url}: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}
