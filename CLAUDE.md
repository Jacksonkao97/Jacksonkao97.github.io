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
npm run resume:pdf   # generate public/docs/Resume.pdf from src/constants/resume.js (needs Chrome, or CHROME_PATH)
npx prettier --write <paths>   # no npm script; prettier-plugin-tailwindcss sorts classes, including inside cn()/clsx()/cva()
npx shadcn@latest add <name>   # add a shadcn/ui component (components.json: style radix-vega, JSX, aliases under @/)
```

There is no test suite.

Use Node 24 / npm 11 to match CI. When changing dependencies, use npm 11 (`npx npm@11 install ...` if the local npm is 10). npm 10 fails with ERESOLVE on `@vitejs/plugin-react`'s optional-peer chain: `@rolldown/plugin-babel` → `@babel/plugin-transform-runtime@8` → `@babel/core@8`, which clashes with the Babel 7 used by shadcn and eslint-plugin-react-hooks. npm 11 resolves this chain, and the resulting lockfile works with `npm ci` on both versions.

`npm run lint` and `npx prettier --check .` both pass, and CI fails the build if either one fails. Run both before pushing.

ESLint (`globalIgnores` in `eslint.config.js`) and Prettier (`.prettierignore`) skip the shadcn-generated code in `src/components/ui/`. `shadcn add` regenerates these files, so leave their style as generated. Files under `scripts/` are linted with Node globals.

## Deployment

`.github/workflows/deploy.yml` runs on every push to any branch, using Node 24.

- The `build` job runs `npm ci`, lint, `prettier --check`, `npm run resume:pdf` and `npm run build`, then uploads the PDF as the `resume-pdf` artifact.
- The resume step uses the Google Chrome preinstalled on GitHub's Ubuntu runners.
- The `deploy` job publishes `dist/` to GitHub Pages and runs only on `main`.
- `dist/` and `public/docs/Resume.pdf` are gitignored and must never be committed.

The build reads two env vars, which come from repo secrets in CI. Locally, put them in a gitignored `.env.local`:

- `VITE_GA_ID`: Google Analytics 4 ID. `src/lib/analytics.js` does nothing unless this is a production build and `VITE_GA_ID` is set. All three helpers (`initGA`, `trackPage`, `trackEvent`) share that `isEnabled` guard, so analytics never fires under `npm run dev` or in a local build without the ID.
- `VITE_WEB3FORMS_KEY`: access key for the contact form, which POSTs directly to `api.web3forms.com` from `Contact.jsx`.

## Architecture

**Routing.** `src/App.jsx` uses `createHashRouter`, which suits GitHub Pages because it has no SPA fallback. Real URLs therefore look like `/#/projects`. `public/sitemap.xml` uses the same hash URLs and must be updated by hand when routes change.

Every page loads lazily through `src/utils/lazyLoad.js`. That helper expects each page module to export a default component plus a named `loader`, which is why each page carries an `eslint-disable-next-line react-refresh/only-export-components` comment. On a stale-chunk import error after a deploy, it reloads the page once, using a `sessionStorage` flag to avoid looping.

**Routes and errors.** Page routes live under a pathless child route in `App.jsx`. That route's `errorElement` (`RouteError`) renders inside the Layout, so the navbar and footer stay visible.

- The final `path: "*"` route throws a 404 `Response`, which `RouteError` shows as "Page not found".
- Any other error, such as a failed chunk load, shows as "Something went wrong".
- The root route has the same `errorElement` as a fallback in case the Layout itself throws.

**Layout.** The `Layout` in `App.jsx` is a plain flex column: `Navbar`, then `<main>` holding the `Outlet`, then `Footer`. It also includes `<ScrollRestoration />`, which resets scroll on navigation and restores it on Back, and `RouteTracker`, which sends a GA pageview on every pathname change.

- Desktop nav links live in `Navbar`.
- On mobile, `MobileNav` (a shadcn `Sheet` opened by the menu button, `md:hidden`) holds the links.
- Both read from `src/constants/navLinks.js` and mark the current page with `aria-current`.

**Dark mode.** `ThemeToggle` in the navbar toggles the `.dark` class on `<html>` and stores `"light"`/`"dark"` in `localStorage["theme"]`.

- An inline script at the top of `index.html` applies the saved theme, or the system preference, before first paint. Keep it there.
- Colours come from the tokens in `src/index.css`, whose `.dark` block overrides them.
- Avoid hard-coded colours. Use `currentColor` for inline SVG icons and a `dark:` variant where a fixed colour is needed. The tech-stack logos are monochrome black and use `dark:invert`.

**Adding or hiding a page** takes three changes:

1. Add the route in `App.jsx`, inside the pathless route's `children` and before the `*` catch-all.
2. Add the link in `constants/navLinks.js`.
3. Add the URL to `public/sitemap.xml`.

**Content is data-driven.** Site content lives in `src/constants/`, and components only render it:

- `projects.js`: `projects[0]` is automatically the "Featured Work" on Home, and `Projects` shows the first 3 projects with a "Show More" button. `ProjectCard` and `FeaturedWork` both use `ProjectImage`. It fetches a Microlink screenshot of `siteLink` at runtime, so `siteLink` must be a live public URL. If the fetch or the image fails, it shows a "Preview unavailable" placeholder.
- `techStack.js`: grouped tech lists. Entries with an `icon` (SVGs imported from `src/assets/icons/`) also appear in the Home marquee.
- `resume.js`: personal info, summary, experience, skills, education and languages for the `/resume` page and the footer links. Experience bullets are `{ lead, text }` objects, where `lead` is rendered bold.

**Resume PDF.** `resume.js` is the single source for both the `/resume` page and `Resume.pdf`.

- `scripts/resume/build-pdf.js` imports it, renders HTML styled by `scripts/resume/resume.css`, and prints `public/docs/Resume.pdf` (A4, one page) through `playwright-core`.
- It uses an installed Chrome via `channel: "chrome"`, or the binary in `CHROME_PATH`.
- It embeds Hanken Grotesk from `@fontsource-variable/hanken-grotesk`, so the output doesn't depend on system fonts.
- The PDF is gitignored and generated in CI. The navbar's "Download CV" serves `/docs/Resume.pdf`.
- `personalInfo.title`, `phone` and `location` only appear in the PDF header.
- After editing `resume.js`, regenerate the PDF and check it still fits on one page.

**Analytics.** Use `trackEvent(category, action, label)` from `@/lib/analytics` for outbound links and downloads. The existing calls use the categories `"Outbound"`, `"Resume"` and `"Project"` (`view_site`/`view_source`, labelled with the project name). react-ga4 capitalises the action, so GA4 shows event names like `View_site`.

Page views are sent only by `RouteTracker`, including the first one. `initGA` passes `send_page_view: false` so gtag's `config` call doesn't send its own automatic page view. Keep that option, or the landing page is counted twice.

## Conventions

- Use the `@/` import alias, which maps to `src/` (set in `vite.config.js` and `jsconfig.json`).
- Merge class names with `cn()` from `@/lib/utils`.
- Theme tokens are defined in `src/index.css` under `@theme inline`. There is no `tailwind.config.js`. The tokens include:
  - colours;
  - `font-display` = Libre Caslon Text and `font-sans`/`font-mono` = Hanken Grotesk Variable, both self-hosted via `@fontsource` imports at the top of `index.css`;
  - `animate-marquee`.
- The visual style uses square corners: buttons and inputs usually override with `rounded-none`.
- Prettier settings: double quotes, semicolons, 2-space indentation, `trailingComma: "es5"`, 80-column lines.
