"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-white/5 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tighter">
          <span className="text-gradient">Portfolio.</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted">
          <Link href="#about" className="hover:text-foreground transition-colors">
            About
          </Link>
          <Link href="#projects" className="hover:text-foreground transition-colors">
            Projects
          </Link>
          <Link href="#skills" className="hover:text-foreground transition-colors">
            Skills
          </Link>
          <Link href="#contact" className="hover:text-foreground transition-colors">
            Contact
          </Link>
        </nav>
        <Link
          href="/admin/login"
          className="text-xs font-semibold px-4 py-2 rounded-full border border-white/10 hover:bg-white/5 transition-colors"
        >
          Admin
        </Link>
      </div>
    </motion.header>
  );
}
