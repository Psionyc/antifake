# AntiFake Documentation

## Overview
AntiFake is a Next.js 15 application built with React and TypeScript. It provides a chat interface that scores news articles for authenticity using an OpenAI powered agent. The project also includes a statistics dashboard and API endpoints for processing article text and performing credibility searches.

## Tech Stack
- **Next.js 15** with the App Router
- **React 19** and **TypeScript 5**
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **LangChain** and **OpenAI** for AI interaction
- **Recharts** for graphs
- Deployed via **Fly.io** (see `fly.toml`)

### What is Next.js?
Next.js is a React framework for building full-stack web apps. It provides server rendering, file-based routing, and bundling so you can write both pages and APIs in the same project.

### What is LangChain?
LangChain is a toolkit for orchestrating language-model pipelines. We use it with OpenAI to create an agent chain that evaluates news content.

### What is Fly.io?
Fly.io is a hosting platform that runs containers close to users around the world. The `fly.toml` file in this repo defines the deployment settings.

## Directory Structure
```
src/
  app/         # Next.js routes and pages
  components/  # Reusable React components
  lib/         # Utility and service modules
  types/       # Additional TypeScript declarations
```

### Components
- `ChatInput.tsx` – interactive form that lets users type messages, paste from the clipboard or upload an image for OCR before sending.
- `MessageList.tsx` – displays each message with icons, styling and basic Markdown support. Handles loading and error states.

## Files in `src/app`
- **layout.tsx** – application root layout that loads the Poppins font and applies global styles.
- **globals.css** – Tailwind base styles plus a custom animated background.
- **page.tsx** – animated landing page that links to the chat and stats sections.
- **chat/page.tsx** – interactive chat page that fetches article data and displays model responses.
- **stats/page.tsx** – demo statistics page showing fake vs real news counts using Recharts.
- **api/process/route.ts** – POST endpoint that extracts article text and performs a Google search for credible domains before returning both.
- **api/search/route.ts** – POST endpoint that finds credible sources from a text query.
- **favicon.ico** – Site icon.

## Files in `src/lib`
- **ai.ts** – sets up LangChain chat models and defines `initAntiFakeAgent` used by the chat page.
- **article.ts** – wrapper around `article-parser` to fetch and return article text from a URL.
- **googleSearch.ts** – uses `google-it` to look for credible domains in search results.
- **utils.ts** – merges CSS class names using `clsx` and `tailwind-merge`.

## Additional Notes
- `src/global.d.ts` and `src/types/google-it.d.ts` provide TypeScript declarations for external packages.
- The project is configured to build as a standalone Next.js application (`next.config.ts`).
- Deployment settings for Fly.io are in `fly.toml` and a Dockerfile is provided for container builds.


