import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { initGA } from "./lib/analytics.js";
import { router } from "./router.jsx";

initGA();

// Pages are served as prerendered HTML. Render only after the router has
// loaded the current page's lazy route, so React's first commit replaces the
// static markup with the same content instead of a blank loading state.
const render = () =>
  createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
  );

if (router.state.initialized) {
  render();
} else {
  const unsubscribe = router.subscribe((state) => {
    if (state.initialized) {
      unsubscribe();
      render();
    }
  });
}
