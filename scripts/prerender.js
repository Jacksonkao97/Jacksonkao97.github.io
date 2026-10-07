// Prerenders every page listed in src/constants/pageMeta.js to static HTML
// and writes dist/sitemap.xml. Run after `npm run build` with
// `npm run prerender` (CI does this before deploying).
//
// Each page is loaded in headless Chrome from a local server over dist/ and
// the rendered DOM is saved as dist/<page>.html and dist/<page>/index.html,
// so GitHub Pages serves real content and per-page meta tags at /<page> and
// /<page>/. dist/404.html stays the plain app shell for unknown URLs.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import { dirname, extname, join, normalize, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { pageMeta, SITE_URL } from "../src/constants/pageMeta.js";
import { launchChrome } from "./lib/chrome.js";

const dist = join(dirname(fileURLToPath(import.meta.url)), "../dist");

const contentTypes = {
  ".css": "text/css",
  ".ico": "image/x-icon",
  ".js": "text/javascript",
  ".json": "application/json",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain",
  ".webmanifest": "application/manifest+json",
  ".woff2": "font/woff2",
  ".xml": "application/xml",
};

// Serves files from dist/, and the app shell for every page URL.
function startServer(shell) {
  const server = createServer(async (req, res) => {
    const { pathname } = new URL(req.url, "http://localhost");
    if (!extname(pathname)) {
      res.writeHead(200, { "Content-Type": "text/html" });
      return res.end(shell);
    }
    const file = normalize(join(dist, decodeURIComponent(pathname)));
    try {
      if (!file.startsWith(dist + sep)) throw new Error("outside dist");
      const body = await readFile(file);
      res.writeHead(200, {
        "Content-Type":
          contentTypes[extname(file)] ?? "application/octet-stream",
      });
      res.end(body);
    } catch {
      res.writeHead(404);
      res.end();
    }
  });
  return new Promise((resolve) =>
    server.listen(0, "127.0.0.1", () => resolve(server))
  );
}

async function snapshot(browser, origin, path, { title }) {
  const context = await browser.newContext({ colorScheme: "light" });
  // Keep third parties out of the snapshot: analytics never loads, and
  // Microlink requests stay pending so project previews are captured in
  // their loading state, which is also what the app renders first.
  await context.route(/googletagmanager\.com|google-analytics\.com/, (route) =>
    route.abort()
  );
  await context.route(/api\.microlink\.io/, () => {});

  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));

  await page.goto(origin + path, { waitUntil: "load" });
  await page.waitForFunction(
    (expected) =>
      document.title === expected && document.querySelector("main h1"),
    title,
    { timeout: 20_000 }
  );
  await page.evaluate(() => document.fonts.ready);
  if (errors.length) {
    throw new Error(`Errors while rendering ${path}:\n${errors.join("\n")}`);
  }

  const html = await page.evaluate(() => {
    document
      .querySelectorAll('script[src*="googletagmanager.com"]')
      .forEach((node) => node.remove());
    // The theme is applied per visitor by the inline script in <head>
    document.documentElement.classList.remove("dark");
    if (!document.documentElement.classList.length) {
      document.documentElement.removeAttribute("class");
    }
    return `<!doctype html>\n${document.documentElement.outerHTML}\n`;
  });

  await context.close();
  return html;
}

const outputFiles = (path) =>
  path === "/"
    ? ["index.html"]
    : [`${path.slice(1)}.html`, `${path.slice(1)}/index.html`];

function sitemap(paths) {
  const urls = paths
    .map((path) => `  <url>\n    <loc>${SITE_URL}${path}</loc>\n  </url>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

async function main() {
  // 404.html is always the untouched shell, even if index.html was already
  // prerendered by an earlier run.
  const shell = await readFile(join(dist, "404.html"), "utf8");
  const server = await startServer(shell);
  const origin = `http://127.0.0.1:${server.address().port}`;
  const browser = await launchChrome();

  try {
    const pages = [];
    for (const [path, meta] of Object.entries(pageMeta)) {
      pages.push([path, await snapshot(browser, origin, path, meta)]);
    }

    for (const [path, html] of pages) {
      for (const output of outputFiles(path)) {
        const file = join(dist, output);
        await mkdir(dirname(file), { recursive: true });
        await writeFile(file, html);
        console.log(`Prerendered ${path} -> dist/${output}`);
      }
    }

    await writeFile(join(dist, "sitemap.xml"), sitemap(Object.keys(pageMeta)));
    console.log("Wrote dist/sitemap.xml");
  } finally {
    await browser.close();
    server.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
