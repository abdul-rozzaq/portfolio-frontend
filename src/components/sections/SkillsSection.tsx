"use client";

import { motion } from "framer-motion";

type SkillGroup = {
  title: string;
  skills: string[];
};

export function SkillsSection({ projects }: { projects: any[] }) {
  const groups: SkillGroup[] = [
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
      title: "Architecture & Principles",
      skills: [
        "Clean Code",
        "DRY",
        "KISS",
        "Refactoring",
        "SOLID",
        "N+1 Prevention",
        "Performance Optimization",
      ],
    },
    {
      title: "Integrations & Realtime",
      skills: ["Telegram MTProto", "Webhooks", "REST Integrations", "Authentication Flows"],
    },
  ];

  return (
    <section id="skills" className="py-28 relative overflow-hidden bg-background">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-3xl md:text-5xl font-bold mb-20"
        >
          Tech Stack
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {groups.map((group, gi) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: gi * 0.1 }}
              className="relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 hover:border-white/20 transition-all"
            >
              {/* group title */}
              <h3 className="text-xl font-semibold mb-6 text-white/90">{group.title}</h3>

              {/* skills */}
              <div className="flex flex-wrap gap-3">
                {group.skills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    // whileHover={{ scale: 1.06 }}
                    className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/80 hover:bg-white/10 hover:border-white/20 transition-all"
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
