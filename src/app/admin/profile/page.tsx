"use client";

import { useState, useEffect } from "react";

export default function ProfileAdmin() {
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [formData, setFormData] = useState({
        fullName: "",
        title: "",
        bio: "",
        avatarUrl: "",
        adminEmail: "",
        adminPassword: "",
        socialLinks: {
            github: "",
            linkedin: "",
            twitter: "",
        },
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await fetch("/api/admin/profile");

            if (res.ok) {
                const data = await res.json();

                if (data) {
                    setFormData({
                        fullName: data.fullName || "",
                        title: data.title || "",
                        bio: data.bio || "",
                        avatarUrl: data.avatarUrl || "",
                        adminEmail: data.adminEmail || "",
                        adminPassword: "", // Don't fetch password
                        socialLinks: {
                            github: data.socialLinks?.github || "",
                            linkedin: data.socialLinks?.linkedin || "",
                            twitter: data.socialLinks?.twitter || "",
                        },
                    });
                }
            }
        } catch (error) {
            console.error(error);
        } finally {
            setFetching(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (name.startsWith("social_")) {
            const socialKey = name.split("_")[1];
            setFormData({
                ...formData,
                socialLinks: {
                    ...formData.socialLinks,
                    [socialKey]: value,
                },
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/admin/profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setFormData(prev => ({ ...prev, adminPassword: "" })); // Clear password physically
                alert("Profile & account settings updated successfully");
            } else {
                const data = await res.json();
                alert(data.error || "Failed to update profile");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return <div>Loading profile data...</div>;
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Profile & Account Settings</h1>

            <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl bg-card border border-white/5 p-8 rounded-2xl shadow-lg">
                <h3 className="text-xl font-semibold mb-4 border-b border-white/5 pb-2">Account Login Info</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Login Email <span className="text-red-500">*</span></label>
                        <input
                            type="email"
                            name="adminEmail"
                            value={formData.adminEmail}
                            onChange={handleChange}
                            required
                            className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors placeholder:text-muted"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">New Password</label>
                        <input
                            type="password"
                            name="adminPassword"
                            value={formData.adminPassword}
                            onChange={handleChange}
                            className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors placeholder:text-muted"
                            placeholder="Leave blank to keep current password"
                        />
                    </div>
                </div>

                <h3 className="text-xl font-semibold mb-4 border-b border-white/5 pb-2">Public Profile</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Full Name <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors placeholder:text-muted"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Job Title <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors placeholder:text-muted"
                            placeholder="e.g. Full Stack Developer"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Bio <span className="text-red-500">*</span></label>
                    <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors placeholder:text-muted resize-none"
                    ></textarea>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Avatar URL</label>
                    <input
                        type="text"
                        name="avatarUrl"
                        value={formData.avatarUrl}
                        onChange={handleChange}
                        className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors placeholder:text-muted"
                        placeholder="https://..."
                    />
                </div>

                <h3 className="text-xl font-semibold mt-8 mb-4 border-b border-white/5 pb-2">Social Links</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">GitHub URL</label>
                        <input
                            type="text"
                            name="social_github"
                            value={formData.socialLinks.github}
                            onChange={handleChange}
                            className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors placeholder:text-muted"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">LinkedIn URL</label>
                        <input
                            type="text"
                            name="social_linkedin"
                            value={formData.socialLinks.linkedin}
                            onChange={handleChange}
                            className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors placeholder:text-muted"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Twitter URL</label>
                        <input
                            type="text"
                            name="social_twitter"
                            value={formData.socialLinks.twitter}
                            onChange={handleChange}
                            className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors placeholder:text-muted"
                        />
                    </div>
                </div>

                <div className="pt-4 border-t border-white/5">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-brand-500 hover:bg-brand-600 text-white font-medium px-8 py-3 rounded-lg transition-colors flex items-center justify-center min-w-[140px] shadow-lg shadow-brand-500/20"
                    >
                        {loading ? "Saving..." : "Save Settings"}
                    </button>
                </div>
            </form>
        </div>
    );
}
