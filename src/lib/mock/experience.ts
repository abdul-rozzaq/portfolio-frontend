import type { Experience } from "@/lib/types";

export const mockExperiences: Experience[] = [
    {
        id: "1",
        company: "Vitalis Health",
        role: "Lead Fullstack Engineer",
        period: "2024 – Present",
        started_at: "2024-01",
        ended_at: undefined,
        description:
            "Leading the engineering effort for a healthcare SaaS platform covering patient management, departments, payments, and access control.",
        bullets: [
            "Designed and implemented a role-based permissions system with per-route API access control and caching",
            "Built a multi-module admin dashboard reducing internal reporting time by 60%",
            "Architected PostgreSQL schema migrations with Prisma, cutting query latency by 40%",
            "Established CI/CD pipeline with Docker and GitHub Actions for zero-downtime deployments",
        ],
        techUsed: ["Next.js", "NestJS", "PostgreSQL", "Prisma", "Docker", "TypeScript"],
    },
    {
        id: "2",
        company: "Freelance / Contract",
        role: "Backend & Integration Engineer",
        period: "2022 – 2024",
        started_at: "2022-06",
        ended_at: "2024-01",
        description:
            "Delivered backend services and third-party integrations for startups across healthcare, logistics, and CRM domains.",
        bullets: [
            "Built AmoCRM webhook integration handling 10k+ lead events per day with reliable retry queues",
            "Created a Telegram MTProto bridge for automated campaign messaging and session management",
            "Developed REST APIs consumed by mobile and web clients with full OpenAPI documentation",
            "Reduced server response time by 35% through query optimization and strategic caching with Redis",
        ],
        techUsed: ["Node.js", "NestJS", "ExpressJS", "MongoDB", "Redis", "Telegram API"],
    },
    {
        id: "3",
        company: "Personal Projects & OSS",
        role: "Solo Developer",
        period: "2020 – 2022",
        started_at: "2020-01",
        ended_at: "2022-06",
        description:
            "Built and shipped personal projects to sharpen fullstack skills across frontend, backend, and DevOps.",
        bullets: [
            "Shipped 5+ production web apps covering e-commerce, SaaS tools, and developer utilities",
            "Containerized all projects with Docker and configured Nginx reverse proxy for VPS deployments",
            "Explored GraphQL, FastAPI, and Django for polyglot API design experience",
        ],
        techUsed: ["React", "Next.js", "FastAPI", "Django", "GraphQL", "Docker", "Nginx"],
    },
];
