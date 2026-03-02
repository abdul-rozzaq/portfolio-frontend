import dbConnect from "@/lib/mongoose";
import { Profile } from "@/models/Profile";
import { Project } from "@/models/Project";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ContactSection } from "@/components/sections/ContactSection";

export const revalidate = 60; // Revalidate at most every minute

async function getData() {
  await dbConnect();

  const profile = await Profile.findOne().lean();

  // Sort by featured first, then by order
  const projects = await Project.find().sort({ featured: -1, order: 1 }).lean();

  return {
    profile: JSON.parse(JSON.stringify(profile)),
    projects: JSON.parse(JSON.stringify(projects)),
  };
}

export default async function Home() {
  const { profile, projects } = await getData();

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-brand-500/30">
      <Navbar />
      <HeroSection profile={profile} />
      <ProjectsSection projects={projects} />
      <SkillsSection projects={projects} />
      <ContactSection />

      <footer className="py-8 bg-background border-t border-white/5 text-center text-muted text-sm">
        <p>
          &copy; {new Date().getFullYear()} {profile?.fullName || "Portfolio"}. Built with Next.js
        </p>
      </footer>
    </main>
  );
}
