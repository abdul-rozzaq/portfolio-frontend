"use client";

import { useQuery } from "@tanstack/react-query";
import type { Experience } from "@/lib/types";
import { getExperiences } from "@/lib/api/experience";
import { queryKeys } from "./keys";

/**
 * Hook to fetch all work experiences.
 *
 * @example
 * const { data: experiences, isLoading } = useExperiences();
 */
export function useExperiences() {
    return useQuery<Experience[], Error>({
        queryKey: queryKeys.experiences.all(),
        queryFn: getExperiences,
        staleTime: 60 * 60 * 1000, // 1 hour — rarely changes
    });
}
