import {
  backendTech,
  devOpsTech,
  frameworkTech,
  frontendTech,
  toolsTech,
} from "@/constants/techStack";
import { Separator } from "./ui/separator";

export default function TechStack() {
  const icons =
    [
      ...frontendTech,
      ...backendTech,
      ...frameworkTech,
      ...toolsTech,
      ...devOpsTech,
    ].filter((tech) => tech.icon) ?? [];

  const duplicated = [...icons, ...icons];

  return (
    <section className="flex flex-col justify-center space-y-8 bg-transparent px-4 py-20 sm:px-0 md:space-y-16">
      <h2 className="font-display text-start text-lg font-medium md:text-3xl">
        What I Work With
      </h2>
      <div className="flex flex-wrap gap-4">
        <div className="flex min-w-40 flex-1 flex-col gap-2">
          <h3 className="font-mono text-sm font-medium md:text-lg">Frontend</h3>
          <div className="flex">
            <Separator orientation="vertical" className="mr-4 ml-2 h-auto" />
            <ul className="flex flex-col gap-1">
              {frontendTech.map((tech) => (
                <li key={tech.name}>
                  <a
                    href={tech.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:underline"
                  >
                    {tech.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex min-w-40 flex-1 flex-col gap-2">
          <h3 className="font-mono text-sm font-medium md:text-lg">Backend</h3>
          <div className="flex">
            <Separator orientation="vertical" className="mr-4 ml-2 h-auto" />
            <ul className="flex flex-col gap-1">
              {backendTech.map((tech) => (
                <li key={tech.name}>
                  <a
                    href={tech.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:underline"
                  >
                    {tech.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex min-w-40 flex-1 flex-col gap-2">
          <h3 className="font-mono text-sm font-medium md:text-lg">
            Frameworks
          </h3>
          <div className="flex">
            <Separator orientation="vertical" className="mr-4 ml-2 h-auto" />
            <ul className="flex flex-col gap-1">
              {frameworkTech.map((tech) => (
                <li key={tech.name}>
                  <a
                    href={tech.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:underline"
                  >
                    {tech.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex min-w-40 flex-1 flex-col gap-2">
          <h3 className="font-mono text-sm font-medium md:text-lg">Tools</h3>
          <div className="flex">
            <Separator orientation="vertical" className="mr-4 ml-2 h-auto" />
            <ul className="flex flex-col gap-1">
              {toolsTech.map((tech) => (
                <li key={tech.name}>
                  <a
                    href={tech.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:underline"
                  >
                    {tech.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex min-w-40 flex-1 flex-col gap-2">
          <h3 className="font-mono text-sm font-medium md:text-lg">DevOps</h3>
          <div className="flex">
            <Separator orientation="vertical" className="mr-4 ml-2 h-auto" />
            <ul className="flex flex-col gap-1">
              {devOpsTech.map((tech) => (
                <li key={tech.name}>
                  <a
                    href={tech.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:underline"
                  >
                    {tech.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="pointer-events-none relative mt-8 overflow-hidden select-none md:mt-0">
        <div className="from-background pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-linear-to-r to-transparent" />
        <div className="from-background pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-linear-to-l to-transparent" />
        <div className="animate-marquee flex w-max">
          {duplicated.map((tech, index) => (
            <div
              key={index}
              className="mx-6 flex flex-col items-center sm:mx-12 md:mx-18 lg:mx-28"
            >
              <img
                src={tech.icon}
                alt={tech.name}
                className="h-12 w-12 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
