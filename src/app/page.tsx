"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Simulator from "@/components/Simulator";
import Differentials from "@/components/Differentials";
import ProcessTimeline from "@/components/ProcessTimeline";
import Testimonials from "@/components/Testimonials";
import Coverage from "@/components/Coverage";

export default function Home() {
  const [initialOrigin, setInitialOrigin] = useState("");
  const [initialDestination, setInitialDestination] = useState("");

  const handleEstimate = (origin: string, destination: string) => {
    setInitialOrigin(origin);
    setInitialDestination(destination);
  };

  return (
    <div className="relative min-h-screen bg-snow text-near-black font-sans selection:bg-lavender selection:text-ink overflow-x-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 left-0 right-0 h-[100vh] bg-ink -z-10" />

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <Hero onEstimate={handleEstimate} />

      {/* How It Works Section */}
      <div id="como-funciona">
        <HowItWorks />
      </div>

      {/* Simulator Section */}
      <div id="simulador">
        <Simulator initialOrigin={initialOrigin} initialDestination={initialDestination} />
      </div>

      {/* Differentials Section */}
      <div id="sobre">
        <Differentials />
      </div>

      {/* Process Timeline Section */}
      <ProcessTimeline />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Coverage Section */}
      <div id="cobertura">
        <Coverage />
      </div>

      {/* Contact Section / Call to Action */}
      <section className="py-24 bg-ink text-white relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh-bg opacity-10" />
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="font-dm-mono text-[13px] uppercase tracking-wider text-lavender">
              CONTATO
            </span>
            <h2 className="font-outfit text-4xl sm:text-5xl font-bold mt-4 mb-6">
              Pronto para uma mudança sem estresse?
            </h2>
            <p className="text-white/70 text-lg sm:text-xl mb-10 max-w-2xl mx-auto">
              Fale com um de nossos especialistas em logística residencial ou tire suas dúvidas diretamente no WhatsApp.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#simulador"
                className="px-8 py-4 rounded-[12px] bg-gradient-to-r from-violet to-indigo text-white font-medium hover:shadow-lg hover:shadow-violet/20 hover:scale-[1.02] transition-all duration-300"
              >
                Iniciar Simulação
              </a>
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-[12px] bg-white/10 hover:bg-white/15 text-white font-medium backdrop-blur-md border border-white/10 hover:scale-[1.02] transition-all duration-300 inline-flex items-center justify-center gap-2"
              >
                Falar no WhatsApp
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-ink border-t border-white/[0.06] py-12 text-white/50 text-[14px]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col gap-2 items-center md:items-start">
              <span className="font-outfit text-white font-bold text-[20px] tracking-tight">
                MOVVA
              </span>
              <p className="text-center md:text-left text-white/40">
                © {new Date().getFullYear()} MOVVA Logística Residencial Ltda. Todos os direitos reservados.
              </p>
            </div>
            <div className="flex gap-8">
              <a href="#como-funciona" className="hover:text-white transition-colors">
                Como funciona
              </a>
              <a href="#simulador" className="hover:text-white transition-colors">
                Simulador
              </a>
              <a href="#cobertura" className="hover:text-white transition-colors">
                Cobertura
              </a>
              <a href="#sobre" className="hover:text-white transition-colors">
                Sobre
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
