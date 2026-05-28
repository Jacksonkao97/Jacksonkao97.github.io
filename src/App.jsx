import { createHashRouter, Outlet, RouterProvider } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { SidebarInset, SidebarProvider } from "./components/ui/sidebar";
import lazyLoad from "./utils/lazyLoad";

const Layout = () => {
  return (
    <SidebarProvider defaultOpen={false} className="flex-1 flex-col">
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
    children: [
      {
        index: true,
        lazy: () => lazyLoad(() => import("@/pages/Home"), "Home"),
      },
      // {
      //   path: "about",
      //   lazy: () => lazyLoad(() => import("@/pages/About"), "About"),
      // },
      // {
      //   path: "contact",
      //   lazy: () => lazyLoad(() => import("@/pages/Contact"), "Contact"),
      // },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
