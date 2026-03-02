"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface ProjectData {
    _id: string;
    title: string;
    featured: boolean;
    order: number;
}

export default function ProjectsAdmin() {
    const [projects, setProjects] = useState<ProjectData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await fetch("/api/admin/projects");
            if (res.ok) {
                const data = await res.json();
                setProjects(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string | undefined) => {
        if (!id || !confirm("Are you sure you want to delete this project?")) return;

        try {
            const res = await fetch(`/api/admin/projects/${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                setProjects(projects.filter((p) => p._id !== id));
            } else {
                alert("Failed to delete project");
            }
        } catch (error) {
            console.error(error);
            alert("Failed to delete project");
        }
    };

    if (loading) {
        return <div>Loading projects...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
                <Link
                    href="/admin/projects/new"
                    className="px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors"
                >
                    Add New Project
                </Link>
            </div>

            <div className="bg-card border border-white/5 rounded-xl shadow-lg overflow-hidden">
                {projects.length === 0 ? (
                    <div className="p-8 text-center text-muted">No projects found. Add one!</div>
                ) : (
                    <table className="w-full text-left">
                        <thead className="bg-white/5 border-b border-white/5">
                            <tr>
                                <th className="p-4 font-medium">Title</th>
                                <th className="p-4 font-medium">Featured</th>
                                <th className="p-4 font-medium">Order</th>
                                <th className="p-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((project) => (
                                <tr key={project._id as string} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="p-4 font-medium">{project.title}</td>
                                    <td className="p-4">{project.featured ? "Yes" : "No"}</td>
                                    <td className="p-4">{project.order}</td>
                                    <td className="p-4 text-right space-x-3">
                                        <Link
                                            href={`/admin/projects/${project._id}`}
                                            className="text-brand-400 hover:text-brand-300 transition-colors"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(project._id as string)}
                                            className="text-red-400 hover:text-red-300 transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
