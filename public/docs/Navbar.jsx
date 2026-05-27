import { navLinks } from "@/constants/navLinks";
import { cn } from "@/lib/utils";
import { Download } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../../src/components/ui/button";

export default function Navbar() {
  const { hash } = useLocation();

  const currentPath = hash.replace("#", "") || "/";

  return (
    <header className="border-border/40 bg-background/80 sticky top-0 z-50 w-full border-b backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link to="/" className="text-lg font-semibold tracking-tight">
          My Portfolio
        </Link>

        <nav className="flex items-center gap-1">
          {navLinks.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className={cn(
                "hover:text-foreground rounded-md px-4 py-2 text-sm transition-colors",
                currentPath === to
                  ? "text-foreground font-medium"
                  : "text-muted-foreground"
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        <Button size="sm" asChild>
          <a href="/cv.pdf" download>
            <Download className="mr-2 h-4 w-4" />
            Download CV
          </a>
        </Button>
      </div>
    </header>
  );
}
