import { siteConfig } from "@/config/site.config";
import { portfolioConfig } from "@/config/portfolio.config";
import { Socials } from "@/components/socials";
import Link from "next/link";
import ThemeToggler from "@/components/theme/theme-toggler";
import { skillsConfig } from "@/config/skills.config";

export default function Hero() {
  return (
    <section className="w-full flex flex-col">
      <Link href="/">
        <span className="font-mono text-sm underline">{siteConfig.name}</span>
        <ThemeToggler />
      </Link>

      <div className="flex justify-between items-center mt-6">
        <h1 className="head-text-sm">{portfolioConfig.name}
        </h1>
      </div>

      <h3 className="mt-2 mb-4 text-lg">
        {portfolioConfig.tagline} <span className="sr-only">tagline</span>
      </h3>

      <p className="my-4 text-foreground/80 text-sm">
        I hold a Master’s degree in Computer Science from Concordia University, Montreal, Canada.
        I’m passionate about building innovative software products and continuously exploring new technologies.
      </p>

      <Socials />
      <div className="hidden md:flex flex-col text-sm space-y-2 rounded max-w-2xl text-foreground/70 my-7">
        {skillsConfig.map((skill) => (
          <p key={skill.category}>
            <span className="font-semibold text-primary/90">
              {skill.category}:
            </span>{" "}
            {skill.technologies.join(", ")}
          </p>
        ))}
      </div>
    </section>
  );
}
