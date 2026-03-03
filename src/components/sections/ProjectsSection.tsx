"use client";

import { useState, useMemo, useCallback, useEffect, useRef, type ChangeEvent } from "react";
import Image from "next/image";
import {
  ArrowTopRightOnSquareIcon,
  CodeBracketIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import type { Project } from "@/lib/types";
import { CustomReactMarkdown } from "../ui/custom-react-markdown";
import { buildAbsoluteUrl } from "@/lib/api/axios";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex flex-col rounded-2xl border border-white/8 bg-white/2 overflow-hidden hover:border-white/18 hover:bg-white/4 transition-all duration-300">
      {/* Cover image */}
      <div className="relative aspect-video bg-brand-950 overflow-hidden">
        {project.preview_image ? (
          <Image
            src={buildAbsoluteUrl(project.preview_image.url)}
            alt={`${project.title} preview`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            unoptimized
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <CodeBracketIcon className="w-12 h-12 text-white/10" />
          </div>
        )}
        {project.featured && (
          <span className="absolute top-3 left-3 px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-brand-500/20 text-brand-300 border border-brand-500/30 rounded-full backdrop-blur-sm">
            Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <h3 className="text-base font-bold text-white mb-2">{project.title}</h3>

        <CustomReactMarkdown>{project.description}</CustomReactMarkdown>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mb-5" role="list" aria-label="Tech stack">
          {project.technologies.map((tech) => (
            <span
              key={tech.id}
              role="listitem"
              className="px-2.5 py-0.5 bg-white/5 border border-white/10 text-white/70 rounded-full text-xs font-medium"
            >
              {tech.title}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-5 text-sm">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-white font-semibold hover:text-brand-300 transition-colors"
              aria-label={`View live site for ${project.title}`}
            >
              Live Site
              <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5" />
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-muted hover:text-white transition-colors"
              aria-label={`View source code for ${project.title}`}
            >
              <CodeBracketIcon className="w-4 h-4" />
              Source
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function EmptyState({ query }: { query: string }) {
  return (
    <div className="col-span-full py-24 flex flex-col items-center text-center gap-4" role="status">
      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
        <MagnifyingGlassIcon className="w-6 h-6 text-muted/50" />
      </div>
      <p className="text-muted font-medium">No projects match &ldquo;{query}&rdquo;</p>
      <p className="text-muted/50 text-sm">Try a different keyword or tech stack name.</p>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "featured">("all");
  const debouncedQuery = useDebounce(query, 280);
  const inputRef = useRef<HTMLInputElement>(null);

  // Derive unique techs for filter chips
  const allTechs = useMemo(() => {
    const set = new Set<string>();

    projects.forEach((p) => p.technologies.forEach((t) => set.add(t.title)));

    return Array.from(set).sort();
  }, [projects]);

  const [techFilter, setTechFilter] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let result = projects;

    if (activeFilter === "featured") {
      result = result.filter((p) => p.featured);
    }

    if (techFilter) {
      result = result.filter((p) => p.technologies.some((t) => t.title === techFilter));
    }

    if (debouncedQuery.trim()) {
      const q = debouncedQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.technologies.some((t) => t.title.toLowerCase().includes(q)),
      );
    }

    return result;
  }, [projects, debouncedQuery, activeFilter, techFilter]);

  const handleQueryChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);

  const clearFilters = useCallback(() => {
    setQuery("");
    setActiveFilter("all");
    setTechFilter(null);
    inputRef.current?.focus();
  }, []);

  if (!projects || projects.length === 0) return null;

  return (
    <section id="projects" className="py-28 relative z-10">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <div className="mb-12">
          <p className="text-brand-400 text-sm font-semibold tracking-widest uppercase mb-3">
            Portfolio
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-3">Selected Work</h2>
          <p className="text-muted text-base max-w-md">
            A collection of projects reflecting my focus on architecture, performance, and craft.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <MagnifyingGlassIcon
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/50 pointer-events-none"
              aria-hidden="true"
            />
            <input
              ref={inputRef}
              id="project-search"
              type="search"
              value={query}
              onChange={handleQueryChange}
              placeholder="Search by title or tech…"
              aria-label="Search projects"
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500/40 transition-colors"
            />
          </div>

          {/* Filter tabs */}
          <div
            className="flex items-center gap-2 text-sm font-medium"
            role="group"
            aria-label="Filter projects"
          >
            {(["all", "featured"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                aria-pressed={activeFilter === f}
                className={`px-4 py-2 rounded-xl border transition-colors capitalize ${
                  activeFilter === f
                    ? "bg-brand-500/20 border-brand-500/40 text-brand-300"
                    : "bg-white/5 border-white/10 text-muted hover:text-white hover:bg-white/8"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Tech filter pills */}
        <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Filter by technology">
          <button
            onClick={() => setTechFilter(null)}
            aria-pressed={techFilter === null}
            className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
              techFilter === null
                ? "bg-white/10 border-white/20 text-white"
                : "bg-white/4 border-white/8 text-muted hover:text-white"
            }`}
          >
            All Tech
          </button>
          {allTechs.map((tech) => (
            <button
              key={tech}
              onClick={() => setTechFilter(techFilter === tech ? null : tech)}
              aria-pressed={techFilter === tech}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                techFilter === tech
                  ? "bg-brand-500/20 border-brand-500/40 text-brand-300"
                  : "bg-white/4 border-white/8 text-muted hover:text-white"
              }`}
            >
              {tech}
            </button>
          ))}
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" role="list" aria-label="Projects">
          {filtered.length > 0 ? (
            filtered.map((project) => (
              <div key={project.id} role="listitem">
                <ProjectCard project={project} />
              </div>
            ))
          ) : (
            <EmptyState query={debouncedQuery || techFilter || ""} />
          )}
        </div>

        {/* Results count + clear */}
        {(debouncedQuery || techFilter || activeFilter !== "all") && filtered.length > 0 && (
          <div className="mt-8 flex items-center justify-between text-sm text-muted/60">
            <span>
              {filtered.length} project{filtered.length !== 1 ? "s" : ""} found
            </span>
            <button
              onClick={clearFilters}
              className="hover:text-white transition-colors"
              aria-label="Clear all filters"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
