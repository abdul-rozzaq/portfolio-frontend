"use client";

import { motion } from "framer-motion";
import { ArrowTopRightOnSquareIcon, CodeBracketIcon } from "@heroicons/react/24/outline";

export function ProjectsSection({ projects }: { projects: any[] }) {
  if (!projects || projects.length === 0) return null;

  return (
    <section id="projects" className="py-32 relative z-10 bg-background">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Selected Work</h2>
          <p className="text-muted text-lg max-w-xl">
            A showcase of my recent projects, highlighting my fullstack capabilities and focus on
            design and performance.
          </p>
        </div>

        <div className="space-y-32">
          {projects.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className={`flex flex-col md:flex-row gap-12 lg:gap-24 items-center ${
                index % 2 !== 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Image Container */}
              <div className="w-full md:w-1/2 group">
                <div className="relative aspect-video rounded-xl overflow-hidden bg-brand-900 border border-white/10 shadow-2xl">
                  {project.coverImage ? (
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-brand-800 to-background">
                      <CodeBracketIcon className="w-24 h-24 text-white/20" />
                    </div>
                  )}
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
              </div>

              {/* Content Container */}
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-4">
                  <h3 className="text-3xl font-bold">{project.title}</h3>
                  {project.featured && (
                    <span className="px-3 py-1 text-xs font-semibold bg-brand-500/20 text-brand-300 rounded-full border border-brand-500/30">
                      Featured
                    </span>
                  )}
                </div>

                <div className="bg-glass p-6 md:p-8 rounded-xl shadow-2xl -ml-0 md:-ml-12 lg:-ml-24 relative z-10 backdrop-blur-2xl mb-6">
                  <p className="text-muted text-base md:text-lg leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.techStack.map((tech: string, i: number) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-white/5 border border-white/10 text-white/80 rounded-full text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-6">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-white font-semibold hover:text-brand-300 transition-colors"
                    >
                      <span>Live Site</span>
                      <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-muted hover:text-white transition-colors"
                    >
                      <CodeBracketIcon className="w-5 h-5" />
                      <span>Source</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
