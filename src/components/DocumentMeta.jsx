import { notFoundMeta, pageMeta, SITE_URL } from "@/constants/pageMeta";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const setContent = (selector, value) =>
  document.querySelector(selector)?.setAttribute("content", value);

// Updates the head tags declared in index.html (title, description,
// canonical, Open Graph, Twitter) for the current page. The prerender
// script captures the result, so each static page ships its own tags.
export default function DocumentMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : "/";
    const meta = pageMeta[path];
    const { title, description } = meta ?? notFoundMeta;
    const url = SITE_URL + path;

    document.title = title;
    setContent('meta[name="description"]', description);
    setContent('meta[property="og:title"]', title);
    setContent('meta[property="og:description"]', description);
    setContent('meta[property="og:url"]', url);
    setContent('meta[name="twitter:title"]', title);
    setContent('meta[name="twitter:description"]', description);
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", url);

    // Keep unknown URLs (served by 404.html) out of search results
    let robots = document.querySelector('meta[name="robots"]');
    if (meta) {
      robots?.remove();
    } else {
      if (!robots) {
        robots = document.createElement("meta");
        robots.name = "robots";
        document.head.append(robots);
      }
      robots.content = "noindex";
    }
  }, [pathname]);

  return null;
}
