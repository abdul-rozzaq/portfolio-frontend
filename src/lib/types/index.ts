// ─── Project ──────────────────────────────────────────────────────────────────
export interface Project {
    id: string;
    title: string;
    slug: string;
    description: string;
    technologies: Technology[];
    preview_image: { url: string };
    liveUrl?: string;
    repoUrl?: string;
    featured: boolean;
    order: number;
}


export interface Profile {
    id: string;
    name: string;
    title: string;
    bio: string;
    avatarUrl?: string;
    location?: string;
    availableForWork: boolean;

    github_link?: string;
    linkedin_link?: string;
    twitter_link?: string;
    email_link?: string;
}

// ─── Experience ───────────────────────────────────────────────────────────────
export interface Experience {
    id: string;
    company: string;
    role: string;
    // period: string;
    started_at: string;
    ended_at?: string;
    description: string;
    bullets: string[];
    technologies: Technology[];
    logo?: { url: string };
    companyUrl?: string;
}

export interface Technology {
    id: string;
    title: string;
    type: string;
}


/*
"id": 77,
"documentId": "fg7pia34q6d5pkw0610cvcvw",
"title": "Flutter",
"createdAt": "2026-03-03T15:19:01.733Z",
"updatedAt": "2026-03-03T15:19:01.733Z",
"publishedAt": "2026-03-03T15:19:01.730Z",
"type": "frontend"
*/