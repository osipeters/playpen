# Link in Bio Redesign Tool

An AI-powered web application that helps you iterate on redesigns of your link-in-bio pages with live preview. Use Claude AI to suggest design variations and get instant feedback before publishing.

## Features

- 📱 **Live Preview**: Side-by-side comparison of original and redesigned pages
- 🤖 **AI-Powered Redesigns**: Use Claude API to intelligently redesign pages
- 💡 **Design Suggestions**: Get multiple design direction suggestions from the AI
- 🎨 **Full HTML+CSS Redesigns**: Complete layout, styling, and copy iterations
- 📥 **One-Click Export**: Download your final redesigned page as a standalone HTML file
- 🔄 **Iterative Workflow**: Maintain conversation history across multiple redesign iterations

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite + TailwindCSS
- **Backend**: Node.js + Express + TypeScript
- **AI**: Claude 3 (Opus) API with Vision capability
- **Screenshot**: Puppeteer for rendering HTML to images

## Prerequisites

- Node.js 18+ and npm 9+
- Claude API key (get one at https://console.anthropic.com)

## Setup

### 1. Clone and Install

```bash
git clone <repo-url>
cd link-bio-redesign-tool
npm install
```

### 2. Configure Environment

Create a `.env` file in the `backend` directory:

```bash
cd backend
cp .env.example .env
```

Then edit `.env` and add your Claude API key:

```
ANTHROPIC_API_KEY=your_actual_api_key_here
PORT=3001
```

### 3. Start Development

From the root directory, run both frontend and backend concurrently:

```bash
npm run dev
```

This will start:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3001

## Usage

1. **Load a Page**: Paste a link-in-bio URL (e.g., a Linktree clone or any HTML page)
2. **Request Redesigns**: 
   - Type a design direction like "make it more modern" or "dark theme"
   - Click "Redesign" to generate a new version
3. **Get Suggestions**: Click "Get Design Suggestions" to see 3-4 design directions the AI recommends
4. **Iterate**: Continue refining with more prompts - the AI remembers previous changes
5. **Export**: Once happy with the design, click "Export as HTML" to download

## Project Structure

```
.
├── backend/
│   ├── src/
│   │   ├── server.ts              # Express server entry point
│   │   ├── routes/
│   │   │   ├── fetch.ts           # Page fetching endpoint
│   │   │   └── redesign.ts        # Redesign and suggest endpoints
│   │   └── utils/
│   │       ├── pageClient.ts      # URL fetching utility
│   │       ├── screenshot.ts      # Puppeteer screenshot utility
│   │       └── claude.ts          # Claude API integration
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── URLInput.tsx       # URL input form
│   │   │   ├── PreviewPane.tsx    # Side-by-side preview
│   │   │   └── DesignControls.tsx # Redesign and suggestion controls
│   │   ├── api/
│   │   │   └── client.ts          # API client
│   │   ├── App.tsx                # Main app component
│   │   ├── main.tsx               # React entry point
│   │   └── index.css              # Tailwind CSS imports
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── index.html
├── package.json
└── README.md
```

## API Endpoints

### POST /api/fetch-page
Fetch and screenshot a page from a URL.

**Request:**
```json
{
  "url": "https://example.com/linkbio"
}
```

**Response:**
```json
{
  "html": "...",
  "screenshot": "data:image/png;base64,...",
  "url": "https://example.com/linkbio"
}
```

### POST /api/redesign
Generate a redesign based on user prompt with conversation history.

**Request:**
```json
{
  "html": "...",
  "userPrompt": "make it more modern",
  "sessionId": "optional-session-id"
}
```

**Response:**
```json
{
  "html": "...",
  "screenshot": "data:image/png;base64,...",
  "sessionId": "session-id"
}
```

### POST /api/suggest
Get design suggestions from Claude.

**Request:**
```json
{
  "html": "...",
  "sessionId": "optional-session-id"
}
```

**Response:**
```json
{
  "suggestions": ["Modern minimalist", "Bold vibrant", "Professional elegant"],
  "sessionId": "session-id"
}
```

## Building for Production

```bash
npm run build
```

This creates production builds for both frontend and backend in their respective `dist/` directories.

## Troubleshooting

### Puppeteer browser download fails
The backend uses Puppeteer to take screenshots. If you see download errors:

```bash
PUPPETEER_SKIP_DOWNLOAD=true npm install
```

The browser will be downloaded on first use or you can manually download it.

### CORS errors
Make sure the backend is running on port 3001 and the frontend proxy is configured correctly in `vite.config.ts`.

### Claude API errors
- Verify your API key is correct in `.env`
- Check that you have credits available in your Anthropic account
- Ensure the model name matches your API plan (currently using `claude-opus-4-7`)

## Future Enhancements

- Template library with pre-made designs
- Multi-device preview (mobile/tablet/desktop)
- Version history and comparison
- Share redesign links with team members
- Direct publishing to Linktree, Beacons, etc.

## License

MIT
