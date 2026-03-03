// ─── Project ──────────────────────────────────────────────────────────────────
export interface Project {
    id: string;
    title: string;
    slug: string;
    description: string;
    techStack: string[];
    coverImage?: string;
    liveUrl?: string;
    repoUrl?: string;
    featured: boolean;
    order: number;
}

// ─── Profile ──────────────────────────────────────────────────────────────────
export interface SocialLinks {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
}

export interface Profile {
    id: string;
    fullName: string;
    title: string;
    bio: string;
    avatarUrl?: string;
    location?: string;
    availableForWork: boolean;
    socialLinks: SocialLinks;
}

// ─── Experience ───────────────────────────────────────────────────────────────
export interface Experience {
    id: string;
    company: string;
    role: string;
    period: string;
    startDate: string;
    endDate?: string; // undefined = present
    description: string;
    bullets: string[];
    techUsed: string[];
    logoUrl?: string;
    companyUrl?: string;
}
