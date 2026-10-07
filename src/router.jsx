import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import RouteError from "./components/RouteError";
import lazyLoad from "./utils/lazyLoad";

// Each page path also needs an entry in src/constants/pageMeta.js so it gets
// its title/description and is prerendered and listed in the sitemap.
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <RouteError />,
    children: [
      {
        // Pathless route so page errors and 404s render inside the Layout
        errorElement: <RouteError />,
        children: [
          {
            index: true,
            lazy: () => lazyLoad(() => import("@/pages/Home"), "Home"),
          },
          {
            path: "projects",
            lazy: () => lazyLoad(() => import("@/pages/Projects"), "Projects"),
          },
          {
            path: "resume",
            lazy: () => lazyLoad(() => import("@/pages/Resume"), "Resume"),
          },
          {
            path: "*",
            // Rendered by RouteError; null avoids React Router's empty-leaf warning
            element: null,
            loader: () => {
              throw new Response("Not Found", { status: 404 });
            },
          },
        ],
      },
    ],
  },
]);
