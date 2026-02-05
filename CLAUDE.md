# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

UIGen is an AI-powered React component generator. Users describe components in natural language, and Claude generates them with live preview. Components are rendered in a virtual file system using Babel standalone transpilation.

## Commands

```bash
npm run dev          # Start Next.js dev server with Turbopack (localhost:3000)
npm run build        # Production build
npm run test         # Run Vitest unit tests
npm run lint         # ESLint
npm run setup        # Install deps + Prisma generate + migrations
npm run db:reset     # Force reset database (wipes all data)
```

## Architecture

**Stack**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4, Prisma (SQLite), Anthropic Claude

**Key Directories**:
- `src/app/` - Next.js pages and API routes
- `src/components/` - React components (chat/, editor/, preview/, ui/)
- `src/lib/` - Business logic, utilities, AI tools, prompts
- `src/actions/` - Server actions for auth and projects
- `prisma/` - Database schema and migrations

## Core Flows

**AI Generation** (`src/app/api/chat/route.ts`):
1. User message → `/api/chat` POST endpoint
2. Claude receives system prompt from `src/lib/prompts/generation.tsx`
3. Claude uses tools: `str_replace_editor` (create/edit files), `file_manager` (list/delete)
4. VirtualFileSystem (`src/lib/file-system.ts`) tracks changes in memory
5. Preview renders components via Babel standalone

**Authentication** (`src/lib/auth.ts`, `src/actions/index.ts`):
- JWT tokens in HTTP-only cookies (7-day expiry)
- Middleware protects `/api/projects` and `/api/filesystem` routes
- Anonymous users can generate without saving

**Data Model** (`prisma/schema.prisma`):
- `User`: email/password auth
- `Project`: stores `messages` and `data` (virtual FS state) as JSON strings

## Key Files

- `src/app/[projectId]/page.tsx` - Main editor page
- `src/lib/provider.ts` - Language model setup (uses MockLanguageModel if no ANTHROPIC_API_KEY)
- `src/components/editor/CodeEditor.tsx` - Monaco editor wrapper
- `src/components/preview/` - Live component preview with Babel transpilation

## Path Alias

`@/*` maps to `./src/*`

## Database

The database schema is defined in `prisma/schema.prisma`. Reference it anytime you need to understand the structure of data stored in the database.

## Development Best Practices

Use comments sparingly. Only comment complex code.
