import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useState } from "react";

// The inline script in index.html applies the saved (or system) theme before
// first paint, so the initial state is read back from the <html> class.
export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains("dark")
  );

  const toggleTheme = () => {
    const next = !isDark;
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // Storage unavailable (e.g. blocked site data): theme lasts this visit
    }
    setIsDark(next);
  };

  return (
    <Button
      size="icon"
      variant="ghost"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggleTheme}
    >
      {isDark ? <Sun /> : <Moon />}
    </Button>
  );
}
