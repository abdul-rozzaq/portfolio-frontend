import { getProfile } from "@/lib/api/profile";
import { getProjects } from "@/lib/api/projects";
import { getExperiences } from "@/lib/api/experience";
import { BackgroundPattern } from "@/components/ui/background-pattern";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ContactSection } from "@/components/sections/ContactSection";

// Revalidate every 60 seconds (ISR)
export const revalidate = 60;

export default async function Home() {
  const [profile, projects, experiences] = await Promise.all([
    getProfile(),
    getProjects(),
    getExperiences(),
  ]);

  return (
    <>
      <BackgroundPattern />

      <main className="relative z-10 min-h-screen">
        <Navbar />

        <HeroSection profile={profile} />

        {/* Subtle divider */}
        <div className="container mx-auto px-6 max-w-4xl">
          <hr className="border-white/5" />
        </div>

        <ExperienceSection experiences={experiences} />

        <div className="container mx-auto px-6 max-w-6xl">
          <hr className="border-white/5" />
        </div>

        <ProjectsSection projects={projects} />

        <div className="container mx-auto px-6 max-w-6xl">
          <hr className="border-white/5" />
        </div>

        <SkillsSection />

        <div className="container mx-auto px-6 max-w-6xl">
          <hr className="border-white/5" />
        </div>

        <ContactSection />

        <footer className="py-10 border-t border-white/5 text-center text-muted/50 text-xs">
          <div className="container mx-auto px-6">
            <p>
              © {new Date().getFullYear()} {profile.fullName}. Designed & built with Next.js.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
