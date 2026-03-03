import type { Project } from "@/lib/types";
import apiClient from "./axios";


export async function getProjects(): Promise<Project[]> {
    const { data } = await apiClient.get<{ data: Project[] }>("/projects?populate[preview_image][fields]=url&populate[technologies][fields]=id,title,type");

    return data.data;
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {

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
