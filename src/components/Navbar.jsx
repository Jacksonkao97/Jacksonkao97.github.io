import { Button } from "@/components/ui/button";
import { navLinks } from "@/constants/navLinks";
import { cn } from "@/lib/utils";
import { Download, MenuIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useSidebar } from "./ui/sidebar";

export default function Navbar() {
  const { pathname: currentPath } = useLocation();
  const { toggleSidebar } = useSidebar();

  return (
    <header className="border-border/40 bg-background/80 sticky top-0 z-50 w-full border-b backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-2 sm:px-0">
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            className="md:hidden"
            onClick={toggleSidebar}
          >
            <MenuIcon />
          </Button>

          <Link
            to="/"
            className="font-display text-lg leading-tight tracking-tight uppercase"
          >
            My Portfolio
          </Link>
        </div>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className={cn(
                "hover:text-foreground relative rounded-md px-4 py-2 text-sm transition-colors",
                "after:bg-foreground after:absolute after:bottom-1 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:rounded-full after:transition-all after:duration-300 hover:after:w-[calc(100%-2rem)]",
                currentPath === to
                  ? "text-foreground font-medium after:w-[calc(100%-2rem)]"
                  : "text-muted-foreground"
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        <Button
          size="sm"
          className="border-foreground ring-background rounded-none border ring ring-offset-0 ring-inset"
          asChild
        >
          <a href="/docs/Resume.pdf" download>
            <Download className="mr-2 h-4 w-4" />
            Download CV
          </a>
        </Button>
      </div>
    </header>
  );
}
