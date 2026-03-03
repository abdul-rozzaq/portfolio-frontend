import type { Experience } from "@/lib/types";
import apiClient from "./axios";

export async function getExperiences(): Promise<Experience[]> {
    const { data } = await apiClient.get<{ data: Experience[] }>("/experiences?populate=technologies&sort=id:desc");

    return data.data;
}
