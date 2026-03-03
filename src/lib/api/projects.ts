import type { Project } from "@/lib/types";
import { mockProjects } from "@/lib/mock/projects";
import apiClient from "./axios";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

/**
 * Fetch all projects, sorted by featured → order.
 * Falls back to mock data when no API_BASE is configured.
 */
export async function getProjects(): Promise<Project[]> {
    if (!API_BASE) {
        await new Promise((r) => setTimeout(r, 120));
        return mockProjects.sort((a, b) => {
            if (a.featured !== b.featured) return a.featured ? -1 : 1;
            return a.order - b.order;
        });
    }

    const { data } = await apiClient.get<{ data: Project[] }>("/projects?populate[preview_image][fields]=url&populate[technologies][fields]=id,title,type");

    return data.data;
}

/**
 * Fetch a single project by slug.
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
    if (!API_BASE) {
        await new Promise((r) => setTimeout(r, 80));
        return mockProjects.find((p) => p.slug === slug) ?? null;
    }

    try {
        const { data } = await apiClient.get<Project>(`/projects/${slug}`);
        return data;
    } catch (error: unknown) {
        if (
            typeof error === "object" &&
            error !== null &&
            "response" in error &&
            (error as { response?: { status?: number } }).response?.status === 404
        ) {
            return null;
        }
        throw error;
    }
}
