"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminDashboard() {
  const { data: session } = useSession();
  const [stats, setStats] = useState({ projects: 0, messages: 0, unread: 0 });

  useEffect(() => {
    // We would fetch accurate stats here in a real app
    // For demo purposes, let's just use placeholder or simple fetch
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/admin/stats");
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome back!</h1>
        <p className="text-muted">Here's what's happening with your portfolio today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stat Cards */}
        <div className="bg-card border border-white/5 p-6 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-muted">Total Projects</h3>
            <span className="p-2 bg-brand-500/10 text-brand-300 rounded-lg">📋</span>
          </div>
          <p className="text-4xl font-black">{stats.projects}</p>
        </div>

        <div className="bg-card border border-white/5 p-6 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-muted">Total Messages</h3>
            <span className="p-2 bg-purple-500/10 text-purple-300 rounded-lg">✉️</span>
          </div>
          <p className="text-4xl font-black">{stats.messages}</p>
        </div>

        <div className="bg-card border border-white/5 p-6 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-muted">Unread Messages</h3>
            <span className="p-2 bg-red-500/10 text-red-300 rounded-lg">🔥</span>
          </div>
          <p className="text-4xl font-black">{stats.unread}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <div className="bg-card border border-white/5 rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
          <div className="space-y-4">
            <Link
              href="/admin/projects"
              className="group flex gap-4 items-center p-4 bg-background border border-white/5 rounded-xl hover:border-brand-500/30 transition-colors"
            >
              <div className="p-3 bg-brand-500/10 rounded-lg group-hover:bg-brand-500/20 text-brand-300 transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold group-hover:text-brand-300 transition-colors">
                  Add New Project
                </h4>
                <p className="text-sm text-muted">Create a new portfolio entry</p>
              </div>
            </Link>

            <Link
              href="/admin/profile"
              className="group flex gap-4 items-center p-4 bg-background border border-white/5 rounded-xl hover:border-brand-500/30 transition-colors"
            >
              <div className="p-3 bg-brand-500/10 rounded-lg group-hover:bg-brand-500/20 text-brand-300 transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold group-hover:text-brand-300 transition-colors">
                  Update Profile
                </h4>
                <p className="text-sm text-muted">Modify bio, titles, and links</p>
              </div>
            </Link>
          </div>
        </div>

        <div className="bg-card border border-white/5 rounded-2xl p-6 shadow-lg flex flex-col justify-center text-center items-center">
          <div className="w-24 h-24 bg-gradient-to-r from-brand-500 to-accent rounded-full mb-6 p-1">
            <div className="w-full h-full bg-background rounded-full flex items-center justify-center">
              <span className="text-3xl">🚀</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-2">Build amazing things!</h3>
          <p className="text-muted text-sm max-w-xs mb-6">
            Keep your portfolio updated with your latest and greatest achievements to impress
            clients and recruiters.
          </p>
          <Link
            href="/"
            target="_blank"
            className="px-6 py-2 bg-white text-black font-semibold rounded-full hover:bg-white/90 transition-colors"
          >
            View Live Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}
