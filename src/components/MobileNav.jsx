import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navLinks } from "@/constants/navLinks";
import { cn } from "@/lib/utils";
import { MenuIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function MobileNav() {
  const { pathname: currentPath } = useLocation();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="md:hidden"
          aria-label="Open menu"
        >
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="gap-0 md:hidden">
        <SheetHeader>
          <SheetTitle className="font-display text-xl font-normal">
            <SheetClose asChild>
              <Link to="/">Jackson Kao</Link>
            </SheetClose>
          </SheetTitle>
          <SheetDescription className="sr-only">
            Site navigation
          </SheetDescription>
        </SheetHeader>
        <Separator />
        <nav className="flex flex-col gap-1 p-2">
          {navLinks.map(({ label, to }) => (
            <SheetClose key={to} asChild>
              <Link
                to={to}
                aria-current={currentPath === to ? "page" : undefined}
                className={cn(
                  "hover:bg-muted rounded-md px-2 py-2.5 text-sm transition-colors",
                  currentPath === to
                    ? "text-foreground font-medium"
                    : "text-muted-foreground"
                )}
              >
                {label}
              </Link>
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
