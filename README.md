# Andre Milan Arañas — Personal Portfolio

Personal portfolio for Andre Milan A. Arañas — software engineer, data analyst, and AI automation
engineer from Cebu City, Philippines. Live at
[andre-milan-aranas.vercel.app](https://andre-milan-aranas.vercel.app/).

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| UI | React 19 |
| Styling | Tailwind CSS v4 + CSS custom properties |
| Animation | Framer Motion · CSS keyframes · IntersectionObserver |
| Email | Resend (`/api/contact`) |
| AI assistant | Google Gemini via `@google/genai` (`/api/chat`) |
| Analytics | Vercel Analytics |
| Hosting | Vercel |

## The shell

The header is a live prompt. Click it — or press `/` anywhere on the page, or `⌘K` / `Ctrl-K` — to open
`ama-shell`, a real terminal that queries this site's data.

```
~/ama $ ls projects          # id, category and name for every project
~/ama $ cat komyut-ta-bai    # metrics, stack, links and the full write-up
~/ama $ stack typescript     # which projects use a given technology
~/ama $ find offline         # search every project field at once
~/ama $ neofetch             # ASCII portrait beside the vitals
~/ama $ ask <question>       # routed to the Gemini assistant
~/ama $ goto experience      # scrolls the page and closes
```

Tab completes commands and project ids, `↑`/`↓` walk history, `esc` closes. `help` lists all 20
commands. Every one reads from [`src/lib/data.ts`](src/lib/data.ts) — there are no canned transcripts,
so the shell cannot drift from the rest of the page.

## Sections

- **Hero** — three-track switcher (software engineering / data analysis / AI automation), with headline
  stats derived from the project and experience data rather than hardcoded. The avatar flips to its
  ASCII rendering on hover or tap.
- **Projects** — every public repository on [github.com/aaaranas](https://github.com/aaaranas), filterable
  by category (product · civic tech · client · systems). Each card carries a live-site preview, three
  concrete metrics, the real stack read off that repo's manifest, and an expandable write-up. Projects
  with no deployment (DugOS) render a terminal preview instead.
- **Data Analyst** — spatial and analytical case studies with SQL snippets and charts.
- **AI Automation** — n8n workflow builds with step-by-step breakdowns.
- **Experience** — timeline; roles still running are marked live from an explicit `current` flag.
- **Education**, **Blog**, **Certifications**, **Skills**, **Contact**.

## The ASCII portrait

[`src/lib/ascii.ts`](src/lib/ascii.ts) holds `public/photo.jpg` mapped to characters: luminance onto
the ramp `" .:-=+*#%@"` at 42 columns, inverted so the white studio backdrop falls away and the subject
is what gets drawn. It renders in the hero avatar and in the shell's `neofetch` banner. Regenerate with
the same mapping if the photo changes.

## Content

All site content lives in [`src/lib/data.ts`](src/lib/data.ts) — `personal`, `projects`, `skills`,
`experience`, `education`, `blogPosts`, `dataAnalystProjects`, `automationProjects`, `certifications`.
Editing that one file changes the site; components read from it and never hardcode copy.

Availability messaging (hero status bar and contact blurb) is driven by `personal.availability`.

## Setup

```bash
npm install
npm run dev          # http://localhost:3000
```

Optional environment variables — see [`.env.example`](.env.example):

| Variable | Needed for |
|---|---|
| `RESEND_API_KEY` | Delivering contact-form messages |
| `GEMINI_API_KEY` | The AI assistant route |

## Checks

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Deploy

Connect the repository to Vercel — `vercel.json` pins the Next.js framework preset, no other config
needed.
