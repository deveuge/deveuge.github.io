# Deveuge - Personal portfolio

[![View portfolio](https://img.shields.io/badge/View%20portfolio-181717?style=for-the-badge&logo=github&logoColor=white)](https://deveuge.github.io)

Personal portfolio and project showcase, built as a static site.

## Stack

- [Astro](https://astro.build) with React islands for interactive widgets (project search, skills filter, image slideshow, tech radar, an in-browser terminal, a hidden dino game)
- [Tailwind CSS v4](https://tailwindcss.com) (via `@tailwindcss/vite`) for styling, with design tokens in `src/styles/global.css`
- TypeScript in strict mode
- Content Collections with Zod schemas for project data (`src/content/projects/*/index.md`)
- Shiki for syntax highlighting in project write-ups

## Features

- Changelog-inspired design: projects as entries, the CV as a commit log, skills as a capability matrix
- Project search, tag pages, image slideshow and a real table of contents on project detail pages
- Tech radar and a decorative commit-activity graph derived from real career dates
- Keyboard shortcuts (press <kbd>?</kbd> on the site) and a small in-browser terminal (`>` to toggle) with its own commands and a hidden dino game
- Dark mode with `localStorage` persistence, reading-progress bar, and scroll-reveal animations (respecting `prefers-reduced-motion`)

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build     # type-check (astro check) + production build
npm run preview   # preview the production build locally
npm run lint      # eslint
npm run format    # prettier
```

Requires Node >= 24.18 and npm >= 11.16 (see `engines` in `package.json`).

## Project structure

```
src/
  components/       Static Astro components (Navbar, Footer, ProjectCard, Timeline, CommitGraph, TerminalModal, KeyboardShortcuts, ...)
  components/islands/  Interactive React islands (search, skills filter, slideshow, tech radar, terminal, dino game)
  content/projects/    One folder per project, Markdown + frontmatter + images
  content.config.ts    Zod schema for the projects content collection
  lib/                 Typed content: experience/education/certifications, skills, site metadata, metrics, tech radar
  pages/               Routes: home, projects, project detail, tags, about, 404
  styles/              Global tokens and per-page CSS
```

Editable content that doesn't require touching design or markup:

| Content                          | File                     |
| --------------------------------- | ------------------------ |
| Experience / companies             | `src/lib/timeline.ts`    |
| Certifications & education         | `src/lib/timeline.ts`    |
| Technologies + years of experience | `src/lib/skills.ts`      |
| Social links / email               | `src/lib/site.ts`        |
| Projects                           | `src/content/projects/*` |

## Architecture notes

- Content Collections + Zod validate every project's frontmatter at build time.
- Interactivity that doesn't need component state (mobile menu, theme toggle, reading progress) is implemented with plain `<script>`/CSS rather than React islands, to keep client-side JS minimal.
- Dark mode uses a `data-theme` attribute on `<html>` with an inline anti-flash script, persisted to `localStorage`.
