# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal portfolio site for Jackson Kao, served at https://jacksonkao97.github.io. It is a Vite + React 19 single-page app using Tailwind CSS v4 and shadcn/ui, written in plain JavaScript (JSX, no TypeScript).

## Commands

```bash
npm run dev       # Vite dev server on port 3000, bound to all interfaces
npm run build     # production build to dist/
npm run preview   # serve the built dist/
npm run lint      # ESLint (flat config, eslint.config.js)
npx prettier --write <paths>   # no npm script; prettier-plugin-tailwindcss sorts classes, including inside cn()/clsx()/cva()
npx shadcn@latest add <name>   # add a shadcn/ui component (components.json: style radix-vega, JSX, aliases under @/)
```

There is no test suite.

Use Node 24 / npm 11 to match CI. When changing dependencies, use npm 11 (`npx npm@11 install ...` if the local npm is 10). npm 10 fails with ERESOLVE on `@vitejs/plugin-react`'s optional-peer chain: `@rolldown/plugin-babel` → `@babel/plugin-transform-runtime@8` → `@babel/core@8`, which clashes with the Babel 7 used by shadcn and eslint-plugin-react-hooks. npm 11 resolves this chain, and the resulting lockfile works with `npm ci` on both versions.

`npm run lint` and `npx prettier --check .` both pass, and should stay clean. CI does not run either one.

Some files are deliberately excluded:

- ESLint (`globalIgnores` in `eslint.config.js`) and Prettier (`.prettierignore`) skip the shadcn-generated code in `src/components/ui/` and `src/hooks/use-mobile.js`. `shadcn add` regenerates these files, so leave their style as generated.
- Prettier also skips `public/docs/Resume.md`, so the PDF source stays as authored.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`. It runs `npm ci && npm run build` on Node 24 and publishes `dist/` to GitHub Pages. `dist/` is gitignored and must never be committed.

The build reads two env vars, which come from repo secrets in CI. Locally, put them in a gitignored `.env.local`:

- `VITE_GA_ID`: Google Analytics 4 ID. `src/lib/analytics.js` does nothing unless this is a production build and `VITE_GA_ID` is set. All three helpers (`initGA`, `trackPage`, `trackEvent`) share that `isEnabled` guard, so analytics never fires under `npm run dev` or in a local build without the ID.
- `VITE_WEB3FORMS_KEY`: access key for the contact form, which POSTs directly to `api.web3forms.com` from `Contact.jsx`.

## Architecture

**Routing.** `src/App.jsx` uses `createHashRouter`, which suits GitHub Pages because it has no SPA fallback. Real URLs therefore look like `/#/projects`. `public/sitemap.xml` uses the same hash URLs and must be updated by hand when routes change.

Every page loads lazily through `src/utils/lazyLoad.js`. That helper expects each page module to export a default component plus a named `loader`, which is why each page carries an `eslint-disable-next-line react-refresh/only-export-components` comment. On a stale-chunk import error after a deploy, it reloads the page once, using a `sessionStorage` flag to avoid looping.

**Layout.** The `Layout` in `App.jsx` wraps every route in the shadcn `SidebarProvider`. The sidebar is the mobile nav only (`md:hidden`, toggled from `Navbar`). Desktop nav links live in `Navbar`. Both read from `src/constants/navLinks.js`. `RouteTracker` sends a GA pageview on every pathname change.

**Adding or hiding a page** takes three changes:

1. Add the route in `App.jsx`.
2. Add the link in `constants/navLinks.js`.
3. Add the URL to `public/sitemap.xml`.

The About page exists but is disabled: it is commented out in both `App.jsx` and `navLinks.js`.

**Content is data-driven.** Site content lives in `src/constants/`, and components only render it:

- `projects.js`: `projects[0]` is automatically the "Featured Work" on Home, and `Projects` shows the first 3 projects with a "Show More" button. `ProjectCard` and `FeaturedWork` fetch each project's preview image at runtime from `siteLink` via `@microlink/mql` screenshots, so `siteLink` must be a live public URL.
- `techStack.js`: grouped tech lists. Entries with an `icon` (SVGs imported from `src/assets/icons/`) also appear in the Home marquee.
- `resume.js`: personal info, experience, education and languages for the `/resume` page and the footer links.

**The resume exists in three places, which must be kept in sync by hand:**

- `src/constants/resume.js`: the web resume page.
- `public/docs/Resume.md`: the source for the PDF, styled by `public/docs/resume.css` for markdown-pdf.
- `public/docs/Resume.pdf`: the file the navbar's "Download CV" button serves.

Editing one doesn't update the others. You can't regenerate the PDF in this repo, so flag it to the user when `Resume.md` changes.

**Analytics.** Use `trackEvent(category, action, label)` from `@/lib/analytics` for outbound links and downloads. The existing calls use the categories `"Outbound"` and `"Resume"`.

## Conventions

- Use the `@/` import alias, which maps to `src/` (set in `vite.config.js` and `jsconfig.json`).
- Merge class names with `cn()` from `@/lib/utils`.
- Theme tokens (colors, `font-display` = Libre Caslon Text, `font-sans`/`font-mono` = Hanken Grotesk, `animate-marquee`) are defined in `src/index.css` under `@theme inline`. There is no `tailwind.config.js`.
- The visual style uses square corners: buttons and inputs usually override with `rounded-none`.
- Prettier settings: double quotes, semicolons, 2-space indentation, `trailingComma: "es5"`, 80-column lines.
