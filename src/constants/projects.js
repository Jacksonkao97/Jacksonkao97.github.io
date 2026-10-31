export const projects = [
  {
    name: "Kathy Kao Interior Design",
    description:
      "A portfolio site for interior designer Kathy Kao. The home page shows her featured project as a turning clay 3D model, and she edits projects, photos and her About page herself through Pages CMS. Every page is a static export, built for SEO.",
    technologies: ["Next.js", "TypeScript", "React Three Fiber", "Firebase"],
    // Firebase Hosting's default URL until the site moves to its own domain.
    siteLink: "https://kathykao-personal-website.web.app/",
    githubLink:
      "https://github.com/Jacksonkao97/Kathykao-Interior-Design-Website",
  },
  {
    name: "C&K Trading",
    description:
      "A bilingual English and Chinese website for C & K Trading Enterprise, a building materials supplier and contractor in Sabah. Visitors browse products and services and enquire through WhatsApp, and office staff edit the catalogue and photos themselves in an admin panel backed by PostgreSQL.",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Firebase"],
    // Firebase App Hosting's default URL until the site moves to its own domain.
    siteLink:
      "https://ck-website--c-k-trading-website.asia-southeast1.hosted.app/",
    // No githubLink: the repo is private, so the card hides "View Source Code".
  },
  {
    name: "MediaLog",
    description:
      "A personal anime, manga and movie tracker with a Chinese UI. It installs as an app and works offline, syncs each user's list to their own Google Drive with a three-way merge, and shows airing schedules and trending titles from AniList.",
    technologies: ["Next.js", "TypeScript", "Google Drive API", "PWA"],
    siteLink: "https://media-log-seven.vercel.app/",
    // A new visitor's library is empty, so the preview shows a 发现 page.
    previewLink: "https://media-log-seven.vercel.app/discover/season",
    githubLink: "https://github.com/Jacksonkao97/media-log",
  },
  {
    name: "Endless Runner Game",
    description:
      "A simple endless runner game built with Phaser 4 and TypeScript. The game features a character that runs endlessly while avoiding obstacles and getting highest scores.",
    technologies: ["Phaser 4", "TypeScript"],
    siteLink: "https://jacksonkao97.github.io/endless-runner-phaser/",
    githubLink: "https://github.com/Jacksonkao97/endless-runner-phaser",
  },
];
