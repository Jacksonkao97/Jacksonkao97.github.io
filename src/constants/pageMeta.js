export const SITE_URL = "https://jacksonkao97.github.io";

// One entry per page. DocumentMeta applies these on navigation, and
// scripts/prerender.js renders each path to static HTML and lists it in
// the generated sitemap.xml.
export const pageMeta = {
  "/": {
    title: "Jackson Kao | Full Stack Software Engineer",
    description:
      "I’m a Software Engineer specializing in building full-stack web applications. I have experience working with a variety of technologies, including React, Node.js, and Python. I’m passionate about creating efficient and scalable solutions to complex problems.",
  },
  "/projects": {
    title: "Projects | Jackson Kao",
    description:
      "Projects by Jackson Kao, a full-stack software engineer, with links to each live site and its source code.",
  },
  "/resume": {
    title: "Resume | Jackson Kao",
    description:
      "Resume of Yee Tsung (Jackson) Kao, a Full Stack Developer in Kuala Lumpur with experience in React, Next.js, Node.js, AWS, GCP and Firebase.",
  },
};

export const notFoundMeta = {
  title: "Page not found | Jackson Kao",
  description: "The page you're looking for doesn't exist or has moved.",
};
