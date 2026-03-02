"use client";

import { motion } from "framer-motion";

export function SkillsSection({ projects }: { projects: any[] }) {
  // Extract unique tech stack from projects if any
  let skills = [
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "MongoDB",
    "Tailwind CSS",
    "Framer Motion",
    "PostgreSQL",
    "GraphQL",
  ];

  if (projects && projects.length > 0) {
    const projectSkills = projects.flatMap((p) => p.techStack);
    if (projectSkills.length > 0) {
      skills = Array.from(new Set([...skills, ...projectSkills])).slice(0, 15);
    }
  }

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-background snap-start">
      <div className="container mx-auto px-6 max-w-5xl text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-16">Tools & Technologies</h2>

        <div className="flex flex-wrap justify-center gap-4">
          {skills.map((skill, index) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="px-6 py-3 bg-white/5 border border-white/10 rounded-full text-foreground/90 font-medium hover:bg-white/10 hover:border-white/20 transition-all cursor-default"
            >
              {skill}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
