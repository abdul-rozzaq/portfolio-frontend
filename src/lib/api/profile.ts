import type { Profile } from "@/lib/types";
import { mockProfile } from "@/lib/mock/profile";
import apiClient from "./axios";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

/**
 * Fetch the portfolio owner's profile.
 * Falls back to mock data when no API_BASE is configured.
 */
export async function getProfile(): Promise<Profile> {
    if (!API_BASE) {
        await new Promise((r) => setTimeout(r, 80));
        return mockProfile;
    }

    const { data } = await apiClient.get<{ data: Profile }>("/meta");

    return data.data;
}
