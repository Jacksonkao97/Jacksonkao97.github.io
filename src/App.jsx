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
import Sidebar from "./components/Sidebar";
import { SidebarInset, SidebarProvider } from "./components/ui/sidebar";
import lazyLoad from "./utils/lazyLoad";

const Layout = () => {
  return (
    <SidebarProvider defaultOpen={false} className="flex-1 flex-col">
      <ScrollRestoration />
      <RouteTracker />
      <Sidebar />
      <Navbar />
      <SidebarInset className="m-0! rounded-none! shadow-none!">
        <Outlet />
      </SidebarInset>
      <Footer />
    </SidebarProvider>
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
