import { cn } from "@/lib/utils";
import mql from "@microlink/mql";
import { MoveRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

const isInverted = (index, enable) => {
  if (!enable) return false;
  return index % 2 === 0;
};

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
    <img
      src={screenshot}
      alt={name}
      className="border-muted-foreground/50 h-full w-full scale-95 border object-cover duration-200 group-hover:scale-100"
    />
  );
}

export default function ProjectCard({ index, project }) {
  return (
    <div
      className={cn(
        "group hover:bg-muted/80 flex flex-col gap-8 bg-transparent duration-200",
        isInverted(index, true) ? "md:flex-row-reverse" : "md:flex-row"
      )}
    >
      <div className="border-foreground aspect-square w-full border md:w-[40%]">
        <ProjectImage link={project.siteLink} name={project.name} />
      </div>
      <div className="flex h-fit flex-row">
        <Separator
          orientation="vertical"
          className="border-muted-foreground hidden md:mr-4 md:block"
        />
        <div className="space-y-2 py-0 md:py-2">
          <span className="flex gap-2">
            {project.technologies.map((tech) => (
              <Badge
                variant="outline"
                className="bg-background rounded-sm"
                key={tech}
              >
                {tech}
              </Badge>
            ))}
          </span>
          <h3 className="font-display text-foreground text-base font-medium md:text-2xl">
            {project.name}
          </h3>
          <p className="text-muted-foreground font-mono text-sm md:text-base">
            {project.description}
          </p>
          <div className="flex gap-8">
            <Button
              variant="outline"
              className="mt-4 w-max rounded-none"
              asChild
            >
              <a
                href={project.siteLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Site
                <MoveRight />
              </a>
            </Button>
            <Button variant="link" className="mt-4 w-max rounded-none" asChild>
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Source Code
                <MoveRight />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
