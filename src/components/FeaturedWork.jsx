import { projects } from "@/constants/projects";
import mql from "@microlink/mql";
import { MoveRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

function ProjectImage({ link, name }) {
  const [screenshot, setScreenshot] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScreenshot = async () => {
      try {
        const { data } = await mql(link, { screenshot: true });
        setScreenshot(data.screenshot.url);
      } catch (error) {
        console.error("Failed to fetch screenshot:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchScreenshot();
  }, [link]);

  if (loading) {
    return <div className="bg-muted h-full w-full animate-pulse" />;
  }

  return (
    <img src={screenshot} alt={name} className="h-full w-full object-cover" />
  );
}

export default function FeaturedWork() {
  return (
    <section className="flex flex-col justify-center space-y-8 bg-transparent px-4 py-20 sm:px-0 md:space-y-10">
      <h2 className="text-muted-foreground text-start font-mono text-xs font-medium uppercase md:text-sm">
        Featured Work
      </h2>
      <div className="bg-muted/50 flex flex-col-reverse gap-8 border p-4 shadow-2xs sm:flex-row md:p-10">
        <div className="flex flex-1 flex-col space-y-4">
          <span className="flex gap-2">
            {projects[0].technologies.map((tech) => (
              <Badge
                variant="outline"
                className="bg-background rounded-sm"
                key={tech}
              >
                {tech}
              </Badge>
            ))}
          </span>
          <h3 className="font-display text-xl font-medium md:text-3xl">
            {projects[0].name}
          </h3>
          <p className="text-muted-foreground font-mono text-sm md:text-base">
            {projects[0].description}
          </p>
          <Button variant="outline" className="mt-4 w-max rounded-none" asChild>
            <a
              href={projects[0].link}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Project
              <MoveRight />
            </a>
          </Button>
        </div>
        <div className="flex w-full items-center justify-center border sm:w-[40%]">
          <ProjectImage link={projects[0].link} name={projects[0].name} />
        </div>
      </div>
    </section>
  );
}
