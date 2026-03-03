import type { Project } from "@/lib/types";

export const mockProjects: Project[] = [
    {
        id: "1",
        title: "Vitalis Health Platform",
        slug: "vitalis",
        description:
            "A full-featured healthcare management system supporting departments, patient records, payments, and role-based access control. Built for medical teams with real-time updates and audit trails.",
        technologies: ["Next.js", "NestJS", "PostgreSQL", "Prisma", "TanStack Query", "TypeScript"],
        coverImage: undefined,
        liveUrl: undefined,
        repoUrl: "https://github.com",
        featured: true,
        order: 0,
    },
    {
        id: "2",
        title: "AmoCRM Integration Layer",
        slug: "amo-crm-integration",
        description:
            "A webhook-driven CRM integration service that syncs leads, contacts, and pipelines from AmoCRM with an internal backend. Includes retry logic, event queuing, and structured logging.",
        technologies: ["NestJS", "TypeScript", "Webhooks", "REST API", "Docker"],
        coverImage: undefined,
        liveUrl: undefined,
        repoUrl: "https://github.com",
        featured: true,
        order: 1,
    },
    {
        id: "3",
        title: "Telegram MTProto Bridge",
        slug: "telegram-bridge",
        description:
            "A service bridging Telegram's MTProto API with a custom backend, enabling message automation, user session management, and event-driven notification pipelines.",
        technologies: ["Node.js", "Telegram MTProto", "Redis", "PostgreSQL", "TypeScript"],
        coverImage: undefined,
        liveUrl: undefined,
        repoUrl: "https://github.com",
        featured: false,
        order: 2,
    },
    {
        id: "4",
        title: "Admin Dashboard Framework",
        slug: "admin-dashboard",
        description:
            "A reusable admin dashboard foundation with role-based permissions, data tables, modal pages, and REST-connected modules. Designed for rapid internal tool development.",
        technologies: ["Next.js", "TypeScript", "TanStack Table", "Tailwind CSS", "Zod"],
        coverImage: undefined,
        liveUrl: undefined,
        repoUrl: "https://github.com",
        featured: false,
        order: 3,
    },
    {
        id: "5",
        title: "Developer Portfolio v2",
        slug: "portfolio-v2",
        description:
            "This very portfolio — rebuilt from the ground up with a clean API layer, externalized data fetching, reduced motion, and a production-grade architecture.",
        technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
        coverImage: undefined,
        liveUrl: "https://portfolio.dev",
        repoUrl: "https://github.com",
        featured: false,
        order: 4,
    },
];
