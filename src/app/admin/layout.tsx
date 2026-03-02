"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const links = [
    { name: "Dashboard", href: "/admin" },
    { name: "Projects", href: "/admin/projects" },
    { name: "Profile", href: "/admin/profile" },
    { name: "Messages", href: "/admin/messages" },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-white/5 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-xl font-bold tracking-tight">
            Admin<span className="text-brand-500">Panel</span>
          </h2>
          <p className="text-xs text-muted mt-1">{session?.user?.email}</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {links.map((link) => {
            const isActive =
              pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-brand-500/10 text-brand-300 border border-brand-500/20"
                    : "text-muted hover:bg-white/5 hover:text-foreground"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full px-4 py-2 text-sm text-left font-medium text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
          >
            Log Out
          </button>

          <Link
            href="/"
            target="_blank"
            className="mt-2 block w-full px-4 py-2 text-sm text-left font-medium text-muted hover:bg-white/5 rounded-lg transition-colors"
          >
            Go to Live Site &rarr;
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col bg-background overflow-y-auto">
        <header className="md:hidden p-4 border-b border-white/5 flex items-center justify-between">
          <h2 className="text-xl font-bold">AdminPanel</h2>
          <button onClick={() => signOut()} className="text-xs text-red-400">
            Logout
          </button>
        </header>

        <div className="p-6 md:p-10 flex-1">{children}</div>
      </main>
    </div>
  );
}
