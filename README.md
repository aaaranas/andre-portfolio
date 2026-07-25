# Andre Milan Arañas — Personal Portfolio


## Description

A modern, responsive portfolio showcasing web development skills — from layout and interactivity to GitHub API integration and dark/light mode. Built with Next.js 16, TypeScript, and Tailwind CSS v4.

## Technologies Used

| Layer | Tech |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + CSS Custom Properties |
| Fonts | Syne (display) · Space Mono (mono) |
| Animations | CSS Keyframes · Intersection Observer API |

## Features

- **Home** — name, profile avatar, typewriter animation, short bio
- **Projects** — 6 projects with title, description, tech stack, and GitHub links
- **Skills** — tabbed skill list with visual proficiency bars
- **Education** — timeline of academic background
- **Contact** — form with name / email / message and success state (no email sent)
- **GitHub API** — live public repos fetched from the GitHub API
- **Dark / Light mode** — toggle in the nav bar, preference saved to `localStorage`
- **Scroll animations** — fade-in via `IntersectionObserver` on each section
- **Responsive** — works on mobile and desktop; hamburger nav on small screens
- **Custom cursor** — accent-colored cursor with blend-mode effect (desktop only)

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Deploy

Ready for Vercel — connect the GitHub repo and deploy with zero config.

Live site: *(add URL after deployment)*
