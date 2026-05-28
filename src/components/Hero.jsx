import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

export default function Hero() {
  return (
    <section className="flex min-h-[calc(100svh-4rem-1px)] flex-col justify-center bg-transparent px-4 sm:px-0">
      <h1 className="font-display text-2xl leading-snug font-normal sm:text-5xl">
        Hi, I'm Jackson Kao <br /> Full-Stack Software Engineer
      </h1>

      <Separator className="bg-foreground my-4 w-20! sm:my-6 sm:w-30!" />

      <p className="text-muted-foreground max-w-3xl text-sm leading-relaxed sm:text-lg">
        I’m a Software Engineer specializing in building full-stack web
        applications. I combine modern frontend frameworks like Next.js and
        Tailwind CSS with a robust backend foundation in API design and database
        management—all while occasionally integrating intelligent AI automation
        to streamline complex workflows.
      </p>

      <div className="mt-6 flex gap-4">
        <Button asChild>
          <Link to="/projects" className="h-10 w-40" viewTransition>
            View Projects
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/contact" className="h-10 w-40" viewTransition>
            Contact Me
          </Link>
        </Button>
      </div>
    </section>
  );
}
