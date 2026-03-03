type SkillGroup = {
  title: string;
  skills: string[];
};

const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "Frontend",
    skills: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "TanStack Query",
      "TanStack Table",
      "Framer Motion",
    ],
  },
  {
    title: "Backend",
    skills: ["Node.js", "NestJS", "ExpressJS", "FastAPI", "Django", "GraphQL", "REST API Design"],
  },
  {
    title: "Database & ORM",
    skills: ["MongoDB", "PostgreSQL", "MySQL", "Prisma", "Mongoose", "Query Optimization"],
  },
  {
    title: "DevOps & Infra",
    skills: ["Docker", "GitHub Actions", "CI/CD", "Linux", "Nginx", "Vercel"],
  },
  {
    title: "Architecture",
    skills: [
      "Clean Code",
      "SOLID",
      "DRY / KISS",
      "Refactoring",
      "N+1 Prevention",
      "Performance Optimization",
    ],
  },
  {
    title: "Integrations",
    skills: ["Telegram MTProto", "Webhooks", "REST Integrations", "Authentication Flows"],
  },
];

export function SkillsSection() {
  return (
    <section id="skills" className="py-28 relative z-10">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <div className="mb-14">
          <p className="text-brand-400 text-sm font-semibold tracking-widest uppercase mb-3">
            Expertise
          </p>
          <h2 className="text-4xl md:text-5xl font-bold">Tech Stack</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILL_GROUPS.map((group) => (
            <div
              key={group.title}
              className="rounded-2xl border border-white/8 bg-white/[0.02] p-6 hover:border-white/15 hover:bg-white/[0.035] transition-all duration-300"
            >
              <h3 className="text-sm font-semibold text-white/90 uppercase tracking-wider mb-4">
                {group.title}
              </h3>
              <div
                className="flex flex-wrap gap-2"
                role="list"
                aria-label={`${group.title} skills`}
              >
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    role="listitem"
                    className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-white/75 hover:bg-white/10 hover:text-white hover:border-white/20 transition-colors duration-200 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
