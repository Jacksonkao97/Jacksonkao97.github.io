import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/constants/projects";

// eslint-disable-next-line react-refresh/only-export-components
export const loader = async () => {
  return null;
};

export default function Projects() {
  return (
    <div className="container mx-auto bg-transparent px-4 py-6 sm:px-0 md:py-24">
      <h1 className="font-display text-foreground mb-2 text-lg font-normal md:text-3xl">
        All Projects
      </h1>
      <p className="text-muted-foreground mb-12 max-w-3xl text-xs md:text-base">
        Here are some of the projects I've worked on. Each project showcases my
        skills and experience in web development, design, and problem-solving.
      </p>

      {projects.map((project, index) => (
        <ProjectCard key={index} index={index + 1} project={project} />
      ))}
    </div>
  );
}
