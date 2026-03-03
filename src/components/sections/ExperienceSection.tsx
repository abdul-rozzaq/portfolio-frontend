import type { Experience } from "@/lib/types";

interface ExperienceSectionProps {
  experiences: Experience[];
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  if (!experiences || experiences.length === 0) return null;

  return (
    <section id="experience" className="py-28 relative z-10">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <div className="mb-16">
          <p className="text-brand-400 text-sm font-semibold tracking-widest uppercase mb-3">
            Career
          </p>
          <h2 className="text-4xl md:text-5xl font-bold">Work Experience</h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-0 top-2 bottom-2 w-px bg-white/10 hidden md:block"
            aria-hidden="true"
          />

          <div className="space-y-12">
            {experiences.map((exp, idx) => (
              <article key={exp.id} className="relative md:pl-10 group">
                {/* Timeline dot */}
                <div
                  className="hidden md:block absolute left-[-4px] top-1.5 w-2 h-2 rounded-full bg-brand-500 ring-4 ring-background"
                  aria-hidden="true"
                />

                {/* Card */}
                <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-7 hover:border-white/15 hover:bg-white/[0.035] transition-all duration-300">
                  {/* Top row */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                      {exp.companyUrl ? (
                        <a
                          href={exp.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand-400 text-sm font-medium hover:text-brand-300 transition-colors"
                        >
                          {exp.company} ↗
                        </a>
                      ) : (
                        <p className="text-brand-400 text-sm font-medium">{exp.company}</p>
                      )}
                    </div>
                    <span className="text-xs font-mono text-muted/70 bg-white/5 border border-white/8 px-3 py-1 rounded-full whitespace-nowrap">
                      {exp.period}
                    </span>
                  </div>

                  {/* Impact bullets */}
                  <ul className="space-y-2 mb-5" role="list">
                    {exp.bullets.map((bullet, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-sm text-muted/80 leading-relaxed"
                      >
                        <span
                          className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-brand-500/60"
                          aria-hidden="true"
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  {/* Tech chips */}
                  <div
                    className="flex flex-wrap gap-1.5"
                    role="list"
                    aria-label="Technologies used"
                  >
                    {exp.techUsed.map((tech) => (
                      <span
                        key={tech}
                        role="listitem"
                        className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-brand-500/10 text-brand-300 border border-brand-500/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
