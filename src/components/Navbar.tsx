"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Simulador", href: "#simulador" },
  { label: "Cobertura", href: "#cobertura" },
  { label: "Sobre", href: "#sobre" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 pointer-events-none">
        <motion.nav
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`w-full max-w-[840px] pointer-events-auto transition-all duration-500 rounded-full ${
            scrolled
              ? "bg-ink/80 backdrop-blur-xl border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.5)] py-2.5 px-6"
              : "bg-transparent py-4 px-6 border border-transparent"
          }`}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#"
              className="font-[family-name:var(--font-outfit)] text-[20px] font-black tracking-tighter text-white hover:text-violet transition-colors duration-300"
            >
              MOVVA<span className="text-violet">.</span>
            </a>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-[13px] font-medium text-white/70 hover:text-white transition-colors duration-200 py-1.5 px-3 rounded-lg hover:bg-white/[0.03]"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Action CTA */}
            <div className="hidden md:flex items-center">
              <a
                href="#simulador"
                className="px-4 py-2 rounded-full bg-violet hover:bg-deep-purple text-white text-[13px] font-semibold transition-all duration-300 hover:scale-[1.03]"
              >
                Orçamento rápido
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex flex-col gap-1.5 justify-center items-center w-8 h-8 rounded-full bg-white/[0.05] border border-white/10"
              aria-label="Menu"
            >
              <span className={`w-4 h-[1.5px] bg-white transition-transform ${mobileOpen ? "rotate-45 translate-y-[3.5px]" : ""}`} />
              <span className={`w-4 h-[1.5px] bg-white transition-transform ${mobileOpen ? "-rotate-45 -translate-y-[4px]" : ""}`} />
            </button>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-ink/98 backdrop-blur-2xl flex flex-col items-center justify-center gap-6 md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="text-white text-xl font-semibold font-[family-name:var(--font-outfit)] hover:text-violet transition-colors"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#simulador"
              onClick={() => setMobileOpen(false)}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 px-8 py-3 rounded-full bg-violet text-white font-bold text-[15px]"
            >
              Orçamento rápido
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
