// Generates public/docs/Resume.pdf from src/constants/resume.js, the single
// source for the resume. Run with `npm run resume:pdf`.
//
// Uses an installed Google Chrome (see scripts/lib/chrome.js).
import { mkdir, readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  education,
  experiences,
  languages,
  personalInfo,
  skills,
  summary,
} from "../../src/constants/resume.js";
import { launchChrome } from "../lib/chrome.js";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "../..");
const outFile = join(root, "public/docs/Resume.pdf");
const require = createRequire(import.meta.url);

const escapeHtml = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[char]
  );

// Embed the site's body font so the PDF renders the same on every machine.
async function fontFace() {
  const file =
    require.resolve("@fontsource-variable/hanken-grotesk/files/hanken-grotesk-latin-wght-normal.woff2");
  const data = (await readFile(file)).toString("base64");
  return `@font-face {
  font-family: "Hanken Grotesk";
  font-weight: 100 900;
  src: url(data:font/woff2;base64,${data}) format("woff2");
}`;
}

function renderHtml(css) {
  const { name, title, email, phone, location, linkedin } = personalInfo;
  const e = escapeHtml;

  const jobs = experiences
    .map(
      (job) => `
      <article class="entry">
        <div class="entry-head">
          <h3>${e(job.role)}</h3>
          <span class="period">${e(job.period)}</span>
        </div>
        <p class="org"><strong>${e(job.company)}</strong>, ${e(job.location)}</p>
        <ul>
          ${job.description
            .map(
              (point) =>
                `<li><strong>${e(point.lead)}</strong> ${e(point.text)}</li>`
            )
            .join("\n")}
        </ul>
      </article>`
    )
    .join("\n");

  const skillItems = skills
    .map(
      (skill) =>
        `<li><strong>${e(skill.category)}:</strong> ${e(skill.items)}</li>`
    )
    .join("\n");

  const educationItems = education
    .map(
      (item) => `
      <article class="entry">
        <div class="entry-head">
          <h3>${e(item.degree)}</h3>
          <span class="period">${e(item.period)}</span>
        </div>
        <p class="org">${e(item.institution)}, ${e(item.location)}</p>
      </article>`
    )
    .join("\n");

  const languageList = languages
    .map((language) => `${e(language.name)} (${e(language.level)})`)
    .join(", ");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>${e(name)} — Resume</title>
    <style>${css}</style>
  </head>
  <body>
    <header>
      <h1>${e(name.toUpperCase())}</h1>
      <p class="title">${e(title)}</p>
      <p class="contact">
        <a href="mailto:${e(email)}">${e(email)}</a> | ${e(phone)} |
        ${e(location)} | <a href="${e(linkedin)}">LinkedIn</a>
      </p>
    </header>

    <section>
      <h2>Professional Summary</h2>
      <p>${e(summary)}</p>
    </section>

    <section>
      <h2>Work Experience</h2>
      ${jobs}
    </section>

    <section>
      <h2>Technical Skills</h2>
      <ul>${skillItems}</ul>
    </section>

    <section>
      <h2>Education &amp; Languages</h2>
      ${educationItems}
      <p class="languages"><strong>Languages:</strong> ${languageList}</p>
    </section>
  </body>
</html>`;
}

async function main() {
  const css = (await fontFace()) + (await readFile(join(here, "resume.css")));
  const html = renderHtml(css);

  const browser = await launchChrome();

  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);
    await mkdir(dirname(outFile), { recursive: true });
    await page.pdf({
      path: outFile,
      format: "A4",
      printBackground: true,
      tagged: true,
      margin: { top: "14mm", bottom: "14mm", left: "16mm", right: "16mm" },
    });
  } finally {
    await browser.close();
  }

  console.log(`Wrote ${outFile}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
