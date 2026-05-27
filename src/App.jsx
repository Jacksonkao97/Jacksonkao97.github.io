import { createHashRouter, Outlet, RouterProvider } from "react-router-dom";
import Navbar from "../public/docs/Navbar";
import "./App.css";
import lazyLoad from "./utils/lazyLoad";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        lazy: () => lazyLoad(() => import("@/pages/Home"), "Home"),
      },
      {
        path: "about",
        lazy: () => lazyLoad(() => import("@/pages/About"), "About"),
      },
      {
        path: "contact",
        lazy: () => lazyLoad(() => import("@/pages/Contact"), "Contact"),
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
