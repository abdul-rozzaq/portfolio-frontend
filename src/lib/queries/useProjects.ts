"use client";

import { useQuery } from "@tanstack/react-query";
import type { Project } from "@/lib/types";
import { getProjects, getProjectBySlug } from "@/lib/api/projects";
import { queryKeys } from "./keys";

/**
 * Hook to fetch all projects.
 *
 * @example
 * const { data: projects, isLoading, error } = useProjects();
 */
export function useProjects() {
    return useQuery<Project[], Error>({
        queryKey: queryKeys.projects.all(),
        queryFn: getProjects,
        staleTime: 60 * 1000, // 1 minute
    });
}

/**
 * Hook to fetch a single project by its slug.
 *
 * @example
 * const { data: project } = useProject("my-project-slug");
 */
export function useProject(slug: string) {
    return useQuery<Project | null, Error>({
        queryKey: queryKeys.projects.bySlug(slug),
        queryFn: () => getProjectBySlug(slug),
        staleTime: 60 * 1000,
        enabled: Boolean(slug),
    });
}
