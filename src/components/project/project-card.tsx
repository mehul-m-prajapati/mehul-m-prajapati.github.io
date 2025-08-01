import { projects } from "#velite";
import { StepForward } from "lucide-react";
import Link from "next/link";
import Picture from "@/components/picture";
import { IconMap } from "@/components/icon-map";
import { z } from "velite";

type ProjectCardProps = {
  project: z.infer<typeof projects.schema>;
};

export default function ProjectCard({ project }: ProjectCardProps) {

  return (
    <div className="flex p-3 justify-between gap-2 rounded-xl border overflow-hidden">
      <div className="space-y-2 w-full tablet:w-3/5">
        {/* <Link href={`/projects/${project.slugAsParams}`} className="space-y-2 group/link"> */}
        <Link href={project?.homepage || '/'} className="space-y-2 group/link">
          <div className="inline-flex items-center gap-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl font-semibold font-heading">{project.name}</h1>
              <span className="text-xs px-2 py-1 rounded bg-secondary">
                {new Date(project.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </div>
            <span className="-translate-x-1 opacity-0 group-hover/link:translate-x-0 group-hover/link:opacity-100 transition-all duration-100 ease-in-out">
              <StepForward size={12} />
            </span>
          </div>
          <p className="text-sm text-secondary-foreground/80 font-light max-w-2xl">
            {project.description}
          </p>
        </Link>
        <div className="flex items-center gap-2 flex-wrap">
            {project?.topics?.map((tag) => (
                <p key={tag} className="px-2 py-1 rounded bg-muted text-muted-foreground text-xs cursor-pointer">
                    {tag}
                </p>
            ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
            <a
              href={project?.homepage}
              target="_blank"
              className="social-link"
            >
              {IconMap["website" as keyof typeof IconMap]}
              <span className="sr-only">
                {`website - ${project?.homepage}`}
              </span>
            </a>
            <a
                href={project?.html_url}
                target="_blank"
                className="social-link"
             >
              {IconMap["github" as keyof typeof IconMap]}
              <span className="sr-only">
                {`github - ${project?.html_url}`}
              </span>
            </a>
        </div>
      </div>
      <div className="w-2/5 aspect-video overflow-hidden hover:border duration-100 transition-all transform-gpu ease-in-out rounded-xl hidden tablet:block">
        <Link href={`${project?.homepage}`}>
          <Picture
            image={project.image}
            imageDark={project.imageDark}
            width={250}
            height={100}
            quality={100}
            alt={project?.name}
            className="w-full h-full object-cover scale-100 hover:scale-105 transition-all transform-gpu ease-in-out"
          />
        </Link>
      </div>
    </div>
  );
}
