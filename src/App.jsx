import {
  createHashRouter,
  Outlet,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import RouteError from "./components/RouteError";
import RouteTracker from "./components/RouteTracker";
import lazyLoad from "./utils/lazyLoad";

const Layout = () => {
  return (
    <div className="flex min-h-svh w-full flex-col">
      <ScrollRestoration />
      <RouteTracker />
      <Navbar />
      <main className="bg-background relative flex w-full flex-1 flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

const router = createHashRouter([
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

export default function App() {
  return <RouterProvider router={router} />;
}
