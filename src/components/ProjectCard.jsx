import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import { MoveRight } from "lucide-react";
import ProjectImage from "./ProjectImage";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

const isInverted = (index, enable) => {
  if (!enable) return false;
  return index % 2 === 0;
};

export default function ProjectCard({ index, project }) {
  return (
    <div
      className={cn(
        "group hover:bg-muted/80 flex flex-col gap-8 bg-transparent duration-200",
        isInverted(index, true) ? "md:flex-row-reverse" : "md:flex-row"
      )}
    >
      <div className="border-foreground aspect-square w-full border md:w-[40%]">
        <ProjectImage
          link={project.previewLink ?? project.siteLink}
          name={project.name}
          className="border-muted-foreground/50 scale-95 border duration-200 group-hover:scale-100"
        />
      </div>
      <div className="flex h-fit flex-row">
        <Separator
          orientation="vertical"
          className="border-muted-foreground hidden md:mr-4 md:block"
        />
        <div className="space-y-2 py-0 md:py-2">
          <span className="flex flex-wrap gap-2">
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
          <h2 className="font-display text-foreground text-base font-medium md:text-2xl">
            {project.name}
          </h2>
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
                onClick={() => trackEvent("Project", "view_site", project.name)}
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
                onClick={() =>
                  trackEvent("Project", "view_source", project.name)
                }
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
