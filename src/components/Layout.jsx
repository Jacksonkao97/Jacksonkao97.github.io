import { Outlet, ScrollRestoration } from "react-router-dom";
import DocumentMeta from "./DocumentMeta";
import Footer from "./Footer";
import Navbar from "./Navbar";
import RouteTracker from "./RouteTracker";

export default function Layout() {
  return (
    <div className="flex min-h-svh w-full flex-col">
      <ScrollRestoration />
      <DocumentMeta />
      <RouteTracker />
      <Navbar />
      <main className="bg-background relative flex w-full flex-1 flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
