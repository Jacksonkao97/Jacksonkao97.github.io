import { trackPage } from "@/lib/analytics";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function RouteTracker() {
  const { pathname } = useLocation();

  useEffect(() => {
    trackPage(pathname);
  }, [pathname]);

  return null;
}
