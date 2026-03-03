import type { Experience } from "@/lib/types";
import { mockExperiences } from "@/lib/mock/experience";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

/**
 * Fetch all work experiences, sorted chronologically (newest first).
 */
export async function getExperiences(): Promise<Experience[]> {
    if (!API_BASE) {
        await new Promise((r) => setTimeout(r, 80));
        return mockExperiences;
    }

    const res = await fetch(`${API_BASE}/experiences`, {
        next: { revalidate: 3600 },
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch experiences: ${res.status}`);
    }

    return res.json();
}
