# UIGen

AI-powered React component generator with live preview. Describe a component in natural language and watch it render instantly.

## Prerequisites

- Node.js 18+
- npm

## Setup

1. Copy `.env.example` to `.env` and add your Anthropic API key:

```
ANTHROPIC_API_KEY=your-api-key-here
```

> Without an API key the app falls back to a mock model that returns static code.

2. Install dependencies and initialize the database:

```bash
npm run setup
```

This will install dependencies, generate the Prisma client, and run database migrations.

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> **Note:** Requires Node.js 18+. If your default `node` is older, run with:
> ```bash
> PATH=~/.nvm/versions/node/v20.20.0/bin:$PATH npm run dev
> ```

## Usage

1. Sign up or continue as an anonymous user
2. Describe a component in the chat — e.g. *"a kanban board with drag and drop"*
3. Watch it render in the live preview panel
4. Switch to Code view to inspect or edit the generated files
5. Keep iterating with the AI to refine the result

## Features

- AI-powered generation using Claude (Haiku by default, configurable)
- Live preview with Babel standalone transpilation — no build step
- Virtual file system — nothing written to disk
- Any npm package available automatically via [esm.sh](https://esm.sh)
- Monaco code editor with syntax highlighting
- Project persistence for registered users

## Tech Stack

- [Next.js 15](https://nextjs.org) (App Router, Turbopack)
- [React 19](https://react.dev)
- TypeScript
- [Tailwind CSS v4](https://tailwindcss.com)
- [Prisma](https://prisma.io) with SQLite
- [Anthropic Claude](https://anthropic.com)
- [Vercel AI SDK v6](https://sdk.vercel.ai)

## Commands

```bash
npm run dev        # Start dev server (localhost:3000)
npm run build      # Production build
npm run test       # Run Vitest unit tests
npm run lint       # ESLint
npm run setup      # Install deps + Prisma generate + migrations
npm run db:reset   # Reset database (wipes all data)
```
