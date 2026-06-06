import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

// eslint-disable-next-line react-refresh/only-export-components
export const loader = async () => {
  return null;
};

export default function Resume() {
  return (
    <div className="py-24">
      <div className="container mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-lg font-medium md:text-3xl">
            Resume
          </h2>
          <Button
            size="sm"
            className="border-accent-foreground ring-background rounded-none border ring ring-offset-0 ring-inset"
            asChild
          >
            <a href="/docs/Resume.pdf" download>
              <Download className="mr-2 h-4 w-4" />
              Download CV
            </a>
          </Button>
        </div>

        {/* PDF Preview */}
        <iframe
          src="/docs/Resume.pdf"
          className="h-[80vh] w-full rounded-none border"
          title="Resume"
        />
      </div>
    </div>
  );
}
