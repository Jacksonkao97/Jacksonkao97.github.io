import { projects } from "@/constants/projects";
import { MoveRight } from "lucide-react";
import ProjectImage from "./ProjectImage";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export default function FeaturedWork() {
  const featured = projects[0];

  return (
    <section className="flex flex-col justify-center space-y-8 bg-transparent px-4 py-20 sm:px-0 md:space-y-10">
      <h2 className="text-muted-foreground text-start font-mono text-xs font-medium uppercase md:text-sm">
        Featured Work
      </h2>

      {featured ? (
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
            <h3 className="font-display text-foreground text-xl font-medium md:text-3xl">
              {projects[0].name}
            </h3>
            <p className="text-muted-foreground font-mono text-sm md:text-base">
              {projects[0].description}
            </p>
            <div className="flex gap-8">
              <Button
                variant="outline"
                className="mt-4 w-max rounded-none"
                asChild
              >
                <a
                  href={projects[0].siteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Site
                  <MoveRight />
                </a>
              </Button>
              <Button
                variant="link"
                className="mt-4 w-max rounded-none"
                asChild
              >
                <a
                  href={projects[0].githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Source Code
                  <MoveRight />
                </a>
              </Button>
            </div>
          </div>
          <div className="flex w-full items-center justify-center border sm:w-[40%]">
            <ProjectImage link={projects[0].siteLink} name={projects[0].name} />
          </div>
        </div>
      ) : (
        <div className="bg-muted/50 flex flex-col items-center justify-center gap-3 border p-4 py-40 shadow-2xs md:p-10 md:py-40">
          <p className="text-muted-foreground font-mono text-sm">
            No featured projects yet — check back soon.
          </p>
        </div>
      )}
    </section>
  );
}
