"use client";

import { useQuery } from "@tanstack/react-query";
import type { Profile } from "@/lib/types";
import { getProfile } from "@/lib/api/profile";
import { queryKeys } from "./keys";

/**
 * Hook to fetch the portfolio owner's profile.
 *
 * @example
 * const { data: profile, isLoading } = useProfile();
 */
export function useProfile() {
    return useQuery<Profile, Error>({
        queryKey: queryKeys.profile.single(),
        queryFn: getProfile,
        staleTime: 60 * 60 * 1000, // 1 hour — very stable data
    });
}
