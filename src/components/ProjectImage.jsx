import { cn } from "@/lib/utils";
import mql from "@microlink/mql";
import { ImageOff } from "lucide-react";
import { useEffect, useState } from "react";

export default function ProjectImage({ link, name, className }) {
  const [screenshot, setScreenshot] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const fetchScreenshot = async () => {
      try {
        const { data } = await mql(link, { screenshot: true });
        setScreenshot(data.screenshot.url);
        setStatus("loaded");
      } catch (error) {
        console.error("Failed to fetch screenshot:", error);
        setStatus("error");
      }
    };

    fetchScreenshot();
  }, [link]);

  if (status === "loading") {
    return <div className="bg-muted h-full min-h-48 w-full animate-pulse" />;
  }

  if (status === "error") {
    return (
      <div className="bg-muted text-foreground/70 flex h-full min-h-48 w-full flex-col items-center justify-center gap-2 font-mono text-xs">
        <ImageOff className="size-6" />
        Preview unavailable
      </div>
    );
  }

  return (
    <img
      src={screenshot}
      alt={name}
      onError={() => setStatus("error")}
      className={cn("h-full w-full object-cover", className)}
    />
  );
}
