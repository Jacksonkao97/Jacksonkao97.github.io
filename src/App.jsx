import { createHashRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import lazyLoad from "./utils/lazyLoad";

const router = createHashRouter([
  {
    path: "/",
    lazy: () => lazyLoad(() => import("@/pages/Home"), "Home"),
  },
  {
    path: "/about",
    lazy: () => lazyLoad(() => import("@/pages/About"), "About"),
  },
  {
    path: "/contact",
    lazy: () => lazyLoad(() => import("@/pages/Contact"), "Contact"),
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
