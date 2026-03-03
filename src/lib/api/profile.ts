import type { Profile } from "@/lib/types";
import apiClient from "./axios";

export async function getProfile(): Promise<Profile> {
    const { data } = await apiClient.get<{ data: Profile }>("/meta");

    return data.data;
}
