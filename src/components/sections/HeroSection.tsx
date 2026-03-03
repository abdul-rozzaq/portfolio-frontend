"use client";

import { motion } from "framer-motion";

export function HeroSection({ profile }: { profile: any }) {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
      id="about"
    >
      {/* Background blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-600/20 mix-blend-screen filter blur-3xl animate-blob"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-accent/20 mix-blend-screen filter blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-1/3 w-96 h-96 bg-purple-500/20 mix-blend-screen filter blur-3xl animate-blob animation-delay-4000"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 p-1 rounded-full bg-gradient-to-r from-brand-500 to-accent"
          >
            <div className="bg-background rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide uppercase">
              Available for work
            </div>
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight leading-tight"
          >
            Hi, I'm {profile?.fullName || "Developer"}.<br />
            <span className="text-gradient leading-tight">
              {profile?.title || "Fullstack Engineer"}
            </span>
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-2xl text-muted max-w-2xl mb-12 font-light"
          >
            {profile?.bio || "Building beautiful, performant, and reliable web applications."}
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-6"
          >
            <a
              href="#projects"
              className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-white/90 transition-transform active:scale-95"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="px-8 py-4 bg-transparent border border-white/20 text-white font-semibold rounded-full hover:bg-white/5 transition-colors"
            >
              Get in touch
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
