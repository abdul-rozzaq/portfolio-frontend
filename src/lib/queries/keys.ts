/**
 * Centralised query-key factory.
 * Use this everywhere to avoid key typos and to enable targeted invalidation.
 *
 * Usage:
 *   queryClient.invalidateQueries({ queryKey: queryKeys.projects.all() })
 */
export const queryKeys = {
    projects: {
        all: () => ["projects"] as const,
        bySlug: (slug: string) => ["projects", slug] as const,
    },
    experiences: {
        all: () => ["experiences"] as const,
    },
    profile: {
        single: () => ["profile"] as const,
    },
} as const;
