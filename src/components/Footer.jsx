export default function Footer() {
  return (
    <footer className="bg-background border-border/40 w-full border-t">
      <div className="text-muted-foreground container mx-auto flex h-16 items-center justify-between px-2 sm:px-0">
        <p>&copy; {new Date().getFullYear()} Jackson. All rights reserved.</p>
      </div>
    </footer>
  );
}
