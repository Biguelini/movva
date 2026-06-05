"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const cities = [
  "São Paulo, SP",
  "Rio de Janeiro, RJ",
  "Belo Horizonte, MG",
  "Curitiba, PR",
  "Porto Alegre, RS",
  "Brasília, DF",
  "Salvador, BA",
  "Florianópolis, SC",
  "Campinas, SP",
  "Santos, SP",
  "Recife, PE",
  "Fortaleza, CE",
  "Goiânia, GO",
  "São José dos Campos, SP",
];

interface HeroProps {
  onEstimate: (origin: string, destination: string) => void;
}

export default function Hero({ onEstimate }: HeroProps) {
  const [origem, setOrigem] = useState("");
  const [destino, setDestino] = useState("");
  const [showOrigemDropdown, setShowOrigemDropdown] = useState(false);
  const [showDestDropdown, setShowDestDropdown] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!origem || !destino) return;
    onEstimate(origem, destino);
    const simulatorElement = document.getElementById("simulador");
    if (simulatorElement) {
      simulatorElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const filteredOrigemCities = cities.filter((c) =>
    c.toLowerCase().includes(origem.toLowerCase())
  );
  const filteredDestCities = cities.filter((c) =>
    c.toLowerCase().includes(destino.toLowerCase())
  );

  return (
    <section className="relative min-h-screen bg-ink overflow-hidden flex flex-col justify-center items-center pt-32 pb-16 lg:py-0">
      {/* Blueprint grid background */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none">
        <div className="w-full h-full" style={{
          backgroundImage: "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "80px 80px"
        }} />
      </div>

      {/* Sleek, soft light gradients aligned to transit theme */}
      <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[800px] h-[350px] rounded-full bg-violet/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] rounded-full bg-indigo/5 blur-[100px] pointer-events-none" />

      {/* Main Content Area */}
      <div className="relative z-10 max-w-[1020px] mx-auto px-6 lg:px-8 w-full text-center flex flex-col items-center gap-10 lg:gap-12">
        
        {/* Category Label */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-violet animate-pulse" />
          <span className="text-white/60 font-dm-mono text-[11px] uppercase tracking-[0.25em]">
            LOGÍSTICA RESIDENCIAL DE ALTA CURADORIA
          </span>
        </motion.div>

        {/* Central Giant Typography */}
        <div className="flex flex-col gap-6 max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-outfit text-[clamp(44px,7.5vw,90px)] font-black text-white leading-[0.98] tracking-tighter uppercase"
          >
            A MUDANÇA QUE O<br />
            SEU MUNDO MERECE.
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="text-white/50 text-[18px] lg:text-[21px] leading-relaxed max-w-[680px] mx-auto font-light"
          >
            Não transportamos apenas caixas. Nós organizamos a transição do seu lar com embalagens sob medida, inventário digital e cuidado curatorial absoluto.
          </motion.p>
        </div>

        {/* Quick Estimator Tool Belt */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full max-w-[760px] bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl p-2.5 rounded-2xl md:rounded-full flex flex-col md:flex-row gap-2 shadow-[0_30px_100px_rgba(0,0,0,0.8)] relative"
        >
          <div className="flex-1 relative flex items-center gap-3 px-4 py-2 border-b border-white/[0.04] md:border-b-0 md:border-r md:border-white/[0.06]">
            <svg className="w-5 h-5 text-violet flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            <input
              type="text"
              placeholder="Origem (ex: São Paulo, SP)"
              value={origem}
              onChange={(e) => {
                setOrigem(e.target.value);
                setShowOrigemDropdown(true);
              }}
              onFocus={() => setShowOrigemDropdown(true)}
              onBlur={() => setTimeout(() => setShowOrigemDropdown(false), 200)}
              className="w-full bg-transparent text-white placeholder-white/30 text-[14px] focus:outline-none"
            />
            {showOrigemDropdown && filteredOrigemCities.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-3 max-h-60 overflow-y-auto rounded-2xl bg-[#11100F] border border-white/[0.08] z-30 shadow-2xl p-1 text-left">
                {filteredOrigemCities.slice(0, 5).map((city) => (
                  <button
                    key={city}
                    type="button"
                    onClick={() => {
                      setOrigem(city);
                      setShowOrigemDropdown(false);
                    }}
                    className="w-full px-4 py-2.5 text-left text-white/70 hover:bg-white/[0.05] hover:text-white text-[13px] rounded-lg transition-colors"
                  >
                    {city}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="flex-1 relative flex items-center gap-3 px-4 py-2">
            <svg className="w-5 h-5 text-indigo flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 21v-19m0 0h14a2 2 0 012 2v8a2 2 0 01-2 2H3m0-12V14" />
            </svg>
            <input
              type="text"
              placeholder="Destino (ex: Rio de Janeiro, RJ)"
              value={destino}
              onChange={(e) => {
                setDestino(e.target.value);
                setShowDestDropdown(true);
              }}
              onFocus={() => setShowDestDropdown(true)}
              onBlur={() => setTimeout(() => setShowDestDropdown(false), 200)}
              className="w-full bg-transparent text-white placeholder-white/30 text-[14px] focus:outline-none"
            />
            {showDestDropdown && filteredDestCities.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-3 max-h-60 overflow-y-auto rounded-2xl bg-[#11100F] border border-white/[0.08] z-30 shadow-2xl p-1 text-left">
                {filteredDestCities.slice(0, 5).map((city) => (
                  <button
                    key={city}
                    type="button"
                    onClick={() => {
                      setDestino(city);
                      setShowDestDropdown(false);
                    }}
                    className="w-full px-4 py-2.5 text-left text-white/70 hover:bg-white/[0.05] hover:text-white text-[13px] rounded-lg transition-colors"
                  >
                    {city}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="px-8 py-3.5 rounded-xl md:rounded-full bg-gradient-to-r from-violet to-indigo text-white font-semibold text-[14px] hover:shadow-lg hover:shadow-violet/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 whitespace-nowrap cursor-pointer"
          >
            Calcular Orçamento
          </button>
        </motion.form>

        {/* Curatorial Pillars Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 pt-10 border-t border-white/10 w-full max-w-[800px] text-left md:text-center"
        >
          <div className="flex flex-col gap-2">
            <h3 className="text-white font-semibold text-[15px] font-outfit uppercase tracking-wider">01. Cuidado de Museu</h3>
            <p className="text-white/40 text-[13px] leading-relaxed">Embalagens customizadas em madeira e feltro agulhado para móveis de design.</p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-white font-semibold text-[15px] font-outfit uppercase tracking-wider">02. Allianz Integrado</h3>
            <p className="text-white/40 text-[13px] leading-relaxed">Apólice de seguro contra sinistros ativa desde o manuseio até a montagem final.</p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-white font-semibold text-[15px] font-outfit uppercase tracking-wider">03. Rastreamento Vital</h3>
            <p className="text-white/40 text-[13px] leading-relaxed">Telemetria de frota e inventário com lacres digitais atualizados em tempo real.</p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
