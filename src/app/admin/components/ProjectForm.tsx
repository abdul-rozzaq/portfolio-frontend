"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IProject } from "@/models/Project";

export default function ProjectForm({ project }: { project?: Partial<IProject> }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: project?.title || "",
        slug: project?.slug || "",
        description: project?.description || "",
        techStack: project?.techStack || [],
        coverImage: project?.coverImage || "",
        liveUrl: project?.liveUrl || "",
        repoUrl: project?.repoUrl || "",
        featured: project?.featured || false,
        order: project?.order || 0,
    });
    const [techInput, setTechInput] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleAddTech = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && techInput.trim()) {
            e.preventDefault();
            if (!formData.techStack.includes(techInput.trim())) {
                setFormData({
                    ...formData,
                    techStack: [...formData.techStack, techInput.trim()],
                });
            }
            setTechInput("");
        }
    };

    const handleRemoveTech = (tech: string) => {
        setFormData({
            ...formData,
            techStack: formData.techStack.filter((t) => t !== tech),
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const url = project?._id ? `/api/admin/projects/${project._id}` : "/api/admin/projects";
            const method = project?._id ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                router.push("/admin/projects");
                router.refresh();
            } else {
                const data = await res.json();
                alert(data.error || "Failed to save project");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl bg-card border border-white/5 p-8 rounded-2xl shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium mb-2">Title <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors placeholder:text-muted"
                        placeholder="E.g. E-Commerce Platform"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Slug</label>
                    <input
                        type="text"
                        name="slug"
                        value={formData.slug}
                        onChange={handleChange}
                        className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors placeholder:text-muted"
                        placeholder="e-commerce-platform (optional)"
                    />
                    <p className="text-xs text-muted mt-1">Leave empty to auto-generate</p>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Description <span className="text-red-500">*</span></label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors placeholder:text-muted resize-none"
                    placeholder="Detailed description of the project..."
                ></textarea>
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Tech Stack</label>
                <div className="flex flex-wrap gap-2 mb-3">
                    {formData.techStack.map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-brand-500/10 text-brand-300 rounded-full text-sm border border-brand-500/20 flex items-center gap-2">
                            {tech}
                            <button
                                type="button"
                                onClick={() => handleRemoveTech(tech)}
                                className="text-brand-300 hover:text-brand-100 transition-colors"
                                title="Remove"
                            >
                                &times;
                            </button>
                        </span>
                    ))}
                </div>
                <input
                    type="text"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyDown={handleAddTech}
                    className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors placeholder:text-muted"
                    placeholder="Type a technology and press Enter..."
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium mb-2">Cover Image URL</label>
                    <input
                        type="text"
                        name="coverImage"
                        value={formData.coverImage}
                        onChange={handleChange}
                        className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors placeholder:text-muted"
                        placeholder="https://..."
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Order</label>
                    <input
                        type="number"
                        name="order"
                        value={formData.order}
                        onChange={handleChange}
                        className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
                    />
                    <p className="text-xs text-muted mt-1">Lower number = higher priority</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium mb-2">Live URL</label>
                    <input
                        type="text"
                        name="liveUrl"
                        value={formData.liveUrl}
                        onChange={handleChange}
                        className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors placeholder:text-muted"
                        placeholder="https://..."
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Repo URL</label>
                    <input
                        type="text"
                        name="repoUrl"
                        value={formData.repoUrl}
                        onChange={handleChange}
                        className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors placeholder:text-muted"
                        placeholder="https://github.com/..."
                    />
                </div>
            </div>

            <div className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
                <input
                    type="checkbox"
                    id="featured"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                    className="w-5 h-5 accent-brand-500 bg-background border-white/10 rounded focus:ring-1 focus:ring-brand-500 cursor-pointer"
                />
                <label htmlFor="featured" className="font-medium cursor-pointer flex-1">
                    Featured Project
                </label>
                <span className="text-sm text-muted">Show prominently on the homepage</span>
            </div>

            <div className="pt-4 border-t border-white/5 flex gap-4">
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-brand-500 hover:bg-brand-600 text-white font-medium px-8 py-3 rounded-lg transition-colors flex items-center justify-center min-w-[140px] shadow-lg shadow-brand-500/20"
                >
                    {loading ? "Saving..." : "Save Project"}
                </button>
                <button
                    type="button"
                    onClick={() => router.back()}
                    disabled={loading}
                    className="bg-white/5 hover:bg-white/10 text-foreground font-medium px-8 py-3 rounded-lg border border-white/10 transition-colors"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}
