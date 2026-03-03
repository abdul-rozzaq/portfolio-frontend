import type { Project } from "@/lib/types";
import { mockProjects } from "@/lib/mock/projects";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

/**
 * Fetch all projects, sorted by featured → order.
 * Falls back to mock data when no API_BASE is configured.
 */
export async function getProjects(): Promise<Project[]> {
    if (!API_BASE) {
        // Simulate network latency in development
        await new Promise((r) => setTimeout(r, 120));
        return mockProjects.sort((a, b) => {
            if (a.featured !== b.featured) return a.featured ? -1 : 1;
            return a.order - b.order;
        });
    }

    const res = await fetch(`${API_BASE}/projects`, {
        next: { revalidate: 60 },
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch projects: ${res.status}`);
    }

    return res.json();
}

/**
 * Fetch a single project by slug.
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
    if (!API_BASE) {
        await new Promise((r) => setTimeout(r, 80));
        return mockProjects.find((p) => p.slug === slug) ?? null;
    }

    const res = await fetch(`${API_BASE}/projects/${slug}`, {
        next: { revalidate: 60 },
    });

    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`Failed to fetch project: ${res.status}`);

    return res.json();
}
