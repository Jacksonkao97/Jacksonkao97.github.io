import { Separator } from "@/components/ui/separator";
import {
  education,
  experiences,
  languages,
  personalInfo,
} from "@/constants/resume";

// eslint-disable-next-line react-refresh/only-export-components
export const loader = async () => {
  return null;
};

export default function Resume() {
  return (
    <div className="container mx-auto w-full px-4 py-8 sm:px-0 md:py-24">
      <div className="mx-auto flex w-full max-w-4xl flex-col">
        <div className="mb-6 flex flex-col space-y-2">
          <h2 className="font-display text-foreground text-2xl font-medium md:text-4xl">
            Resume
          </h2>
          <p className="text-muted-foreground max-w-2xl font-mono text-sm md:text-base">
            Full Stack Engineer specializing in React, Next.js, and Cloud
            Infrastructure. Building scalable web experiences, cloud solutions,
            and AI-driven applications. Based in Malaysia.
          </p>
          <span className="mt-2 mr-auto flex items-center justify-center gap-2">
            <svg
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
            >
              <title>Mail.Ru</title>
              <path d="M15.61 12c0 1.99-1.62 3.61-3.61 3.61-1.99 0-3.61-1.62-3.61-3.61 0-1.99 1.62-3.61 3.61-3.61 1.99 0 3.61 1.62 3.61 3.61M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12c2.424 0 4.761-.722 6.76-2.087l.034-.024-1.617-1.879-.027.017A9.494 9.494 0 0 1 12 21.54c-5.26 0-9.54-4.28-9.54-9.54 0-5.26 4.28-9.54 9.54-9.54 5.26 0 9.54 4.28 9.54 9.54a9.63 9.63 0 0 1-.225 2.05c-.301 1.239-1.169 1.618-1.82 1.568-.654-.053-1.42-.52-1.426-1.661V12A6.076 6.076 0 0 0 12 5.93 6.076 6.076 0 0 0 5.93 12 6.076 6.076 0 0 0 12 18.07a6.02 6.02 0 0 0 4.3-1.792 3.9 3.9 0 0 0 3.32 1.805c.874 0 1.74-.292 2.437-.821.719-.547 1.256-1.336 1.553-2.285.047-.154.135-.504.135-.507l.002-.013c.175-.76.253-1.52.253-2.457 0-6.617-5.383-12-12-12" />
            </svg>
            :
            <a
              href={`mailto:${personalInfo.email}`}
              className="text-muted-foreground hover:text-foreground transition-colors hover:underline"
            >
              {personalInfo.email}
            </a>
          </span>
          <span className="mr-auto flex items-center justify-center gap-2">
            <svg viewBox="0 0 128 128" className="h-4 w-4">
              <path
                fill="#0076b2"
                d="M116 3H12a8.91 8.91 0 00-9 8.8v104.42a8.91 8.91 0 009 8.78h104a8.93 8.93 0 009-8.81V11.77A8.93 8.93 0 00116 3z"
              ></path>
              <path
                fill="#fff"
                d="M21.06 48.73h18.11V107H21.06zm9.06-29a10.5 10.5 0 11-10.5 10.49 10.5 10.5 0 0110.5-10.49M50.53 48.73h17.36v8h.24c2.42-4.58 8.32-9.41 17.13-9.41C103.6 47.28 107 59.35 107 75v32H88.89V78.65c0-6.75-.12-15.44-9.41-15.44s-10.87 7.36-10.87 15V107H50.53z"
              ></path>
            </svg>
            :
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors hover:underline"
            >
              {personalInfo.linkedin}
            </a>
          </span>
        </div>

        <Separator className="mb-16" />

        <section className="mb-16 space-y-6 md:space-y-10">
          <h4 className="text-muted-foreground font-mono text-sm font-medium md:text-lg">
            Professional Experience
          </h4>
          {experiences.map((data, index) => (
            <div key={index} className="space-y-2">
              <h3 className="font-display text-foreground flex text-lg font-medium md:text-2xl">
                {data.role}
                <span className="text-muted-foreground ml-auto self-center font-mono text-xs font-normal md:text-sm">
                  {data.period}
                </span>
              </h3>
              <p className="text-foreground font-mono text-xs font-normal md:text-base">
                {data.company}
              </p>
              <ul className="flex list-disc flex-col gap-2 pl-4">
                {data.description.map((point, index) => (
                  <li
                    key={index}
                    className="text-muted-foreground text-xs md:text-base"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="mb-16 space-y-6 md:space-y-10">
          <h4 className="text-muted-foreground font-mono text-sm font-medium md:text-lg">
            Education
          </h4>
          {education.map((data, index) => (
            <div key={index} className="space-y-px md:space-y-2">
              <h3 className="font-display text-foreground flex text-sm font-medium md:text-xl">
                {data.degree}
                <span className="text-muted-foreground ml-auto self-center font-mono text-xs font-normal md:text-sm">
                  {data.period}
                </span>
              </h3>
              <p className="text-foreground font-mono text-xs font-light md:text-base">
                {data.institution}
              </p>
            </div>
          ))}
        </section>

        <section className="mb-16 space-y-6 md:space-y-10">
          <h4 className="text-muted-foreground font-mono text-sm font-medium md:text-lg">
            Languages
          </h4>
          <ul className="flex list-disc flex-col gap-2 pl-4">
            {languages.map((data, index) => (
              <li key={index} className="text-xs md:text-base">
                {data.name}: {data.level}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
