import type { Experience } from "@/lib/types";
import { mockExperiences } from "@/lib/mock/experience";
import apiClient from "./axios";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

/**
 * Fetch all work experiences, sorted chronologically (newest first).
 * Falls back to mock data when no API_BASE is configured.
 */
export async function getExperiences(): Promise<Experience[]> {
    if (!API_BASE) {
        await new Promise((r) => setTimeout(r, 80));
        return mockExperiences;
    }

    const { data } = await apiClient.get<{ data: Experience[] }>("/experiences?populate=technologies");

    return data.data;
}
