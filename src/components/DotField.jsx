import { useEffect, useRef } from "react";
import { createDotField } from "@/lib/dotField";
import { cn } from "@/lib/utils";

export default function DotField({ className }) {
  const canvasRef = useRef(null);

  useEffect(() => createDotField(canvasRef.current), []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("text-foreground block", className)}
    />
  );
}
