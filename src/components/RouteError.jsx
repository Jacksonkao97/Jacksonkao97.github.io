import { Button } from "@/components/ui/button";
import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom";

export default function RouteError() {
  const error = useRouteError();
  const notFound = isRouteErrorResponse(error) && error.status === 404;

  return (
    <div className="container mx-auto flex min-h-[60svh] flex-col justify-center px-4 py-24 sm:px-0">
      <p className="text-muted-foreground font-mono text-xs uppercase md:text-sm">
        {notFound ? "404" : "Error"}
      </p>
      <h1 className="font-display text-foreground mt-2 text-2xl font-normal md:text-5xl">
        {notFound ? "Page not found" : "Something went wrong"}
      </h1>
      <p className="text-muted-foreground mt-4 max-w-xl text-sm md:text-base">
        {notFound
          ? "The page you're looking for doesn't exist or has moved."
          : "This page failed to load. Please try again."}
      </p>
      <div className="mt-8 flex gap-4">
        <Button className="h-10 w-40 rounded-none" asChild>
          <Link to="/">Back to Home</Link>
        </Button>
        {!notFound && (
          <Button
            variant="outline"
            className="h-10 w-40 rounded-none"
            onClick={() => window.location.reload()}
          >
            Reload Page
          </Button>
        )}
      </div>
    </div>
  );
}
