import type { Profile } from "@/lib/types";
import { mockProfile } from "@/lib/mock/profile";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

/**
 * Fetch the portfolio owner's profile.
 */
export async function getProfile(): Promise<Profile> {
    if (!API_BASE) {
        await new Promise((r) => setTimeout(r, 80));
        return mockProfile;
    }

    const res = await fetch(`${API_BASE}/profile`, {
        next: { revalidate: 3600 },
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch profile: ${res.status}`);
    }

    return res.json();
}
