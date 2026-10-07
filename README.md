# Jackson Kao — Portfolio

My personal portfolio site, with a home page, a projects showcase, an online resume with a downloadable PDF, and a light/dark theme.

**Live site:** https://jacksonkao97.github.io

## Tech stack

- [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) (Radix primitives, Lucide icons)
- [React Router](https://reactrouter.com/) (hash routing, so it works on GitHub Pages)
- Self-hosted fonts via [Fontsource](https://fontsource.org/) (Hanken Grotesk, Libre Caslon Text)
- [Microlink](https://microlink.io/) for live project screenshots
- [Web3Forms](https://web3forms.com/) for the contact form
- Google Analytics 4 via [react-ga4](https://github.com/codler/react-ga4)
- Resume PDF generated from the same data as the web resume, using headless Chrome via [playwright-core](https://playwright.dev/)
- Built, checked and deployed to GitHub Pages with GitHub Actions

## Getting started

Requires **Node.js 24**, the version CI uses.

```bash
npm install
npm run dev        # http://localhost:3000
```

### Environment variables

Create a `.env.local` in the project root. It is gitignored.

```bash
VITE_WEB3FORMS_KEY=your-web3forms-access-key   # contact form
VITE_GA_ID=G-XXXXXXXXXX                        # Google Analytics 4 measurement ID
```

Both are optional locally. Without `VITE_WEB3FORMS_KEY` the contact form can't send messages. Analytics only runs in production builds with `VITE_GA_ID` set; otherwise it's skipped.

### Scripts

| Command                  | Description                          |
| ------------------------ | ------------------------------------ |
| `npm run dev`            | Start the dev server on port 3000    |
| `npm run build`          | Production build to `dist/`          |
| `npm run preview`        | Serve the production build locally   |
| `npm run lint`           | Run ESLint                           |
| `npx prettier --write .` | Format code (sorts Tailwind classes) |
| `npm run resume:pdf`     | Generate `public/docs/Resume.pdf`    |

`npm run resume:pdf` needs Google Chrome installed. To use a different Chrome or Chromium binary, set `CHROME_PATH`. The PDF is generated rather than committed, so run this once if you want the "Download CV" button to work under `npm run dev`.

## Project structure

```
src/
├── pages/        Route pages (Home, Projects, Resume), lazy-loaded
├── components/   Site components (Navbar, Hero, ProjectCard, Contact, ...)
│   └── ui/       shadcn/ui components
├── constants/    Site content: projects, tech stack, resume, nav links
├── lib/          analytics helpers and the cn() class-name utility
└── utils/        lazyLoad (route loading with chunk-error recovery)
scripts/
└── resume/       build-pdf.js and resume.css: render resume.js to Resume.pdf
public/
├── docs/         Resume.pdf (generated, gitignored)
└── sitemap.xml
```

## Updating content

Most of the site's content lives in `src/constants/`:

- **Projects:** add an entry to `projects.js`. The first project is featured on the home page. `siteLink` must be a live public URL, because the preview image is a Microlink screenshot of it.
- **Tech stack:** edit `techStack.js`. Entries with an `icon` also appear in the scrolling logo strip.
- **Resume:** edit `resume.js`, the single source for both the `/resume` page and the PDF.
  - On deploy, CI generates the PDF served by the "Download CV" button, so never edit the PDF by hand.
  - To preview it, run `npm run resume:pdf`, or download the `resume-pdf` artifact from any workflow run.
- **New page:**
  1. Add a route in `src/App.jsx`.
  2. Add a link in `src/constants/navLinks.js`.
  3. Add the URL to `public/sitemap.xml`. Use the hash form, e.g. `https://jacksonkao97.github.io/#/projects`.

## Deployment

Every push, to any branch, runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). It:

1. Lints and checks formatting.
2. Generates the resume PDF and builds the site.
3. Attaches the PDF to the run as the `resume-pdf` artifact.
4. On `main` only, publishes `dist/` to GitHub Pages.

`VITE_WEB3FORMS_KEY` and `VITE_GA_ID` are read from the repository's Actions secrets.

## License

[MIT](LICENSE) © Jackson Kao
