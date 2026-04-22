import puppeteer from 'puppeteer';

let browser: Awaited<ReturnType<typeof puppeteer.launch>> | null = null;

async function getBrowser() {
  if (!browser) {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
  }
  return browser;
}

export async function takeScreenshot(html: string): Promise<string> {
  try {
    const b = await getBrowser();
    const page = await b.newPage();

    // Set viewport to typical desktop size
    await page.setViewport({ width: 1280, height: 720 });

    // Load HTML content
    await page.setContent(html, { waitUntil: 'networkidle2' });

    // Take screenshot and convert to base64
    const screenshot = await page.screenshot({ type: 'png' });
    const base64 = screenshot.toString('base64');

    await page.close();

    return `data:image/png;base64,${base64}`;
  } catch (error) {
    console.error('Error taking screenshot:', error);
    throw new Error(
      `Failed to generate screenshot: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

export async function closeBrowser() {
  if (browser) {
    await browser.close();
    browser = null;
  }
}
