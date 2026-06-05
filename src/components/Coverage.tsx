"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const routes = [
  { from: "São Paulo", to: "Rio de Janeiro", km: 430, hours: "5h" },
  { from: "São Paulo", to: "Belo Horizonte", km: 580, hours: "7h" },
  { from: "Rio de Janeiro", to: "Brasília", km: 1150, hours: "14h" },
  { from: "São Paulo", to: "Curitiba", km: 410, hours: "5h" },
  { from: "Rio de Janeiro", to: "Belo Horizonte", km: 440, hours: "5h" },
  { from: "São Paulo", to: "Florianópolis", km: 700, hours: "8h" },
];

const cityDots = [
  { name: "São Paulo", x: 63, y: 62, main: true, moves: "3.200+" },
  { name: "Rio de Janeiro", x: 69, y: 60, main: true, moves: "2.100+" },
  { name: "Belo Horizonte", x: 68, y: 52, main: false, moves: "890+" },
  { name: "Curitiba", x: 58, y: 70, main: false, moves: "720+" },
  { name: "Brasília", x: 57, y: 45, main: false, moves: "650+" },
  { name: "Porto Alegre", x: 53, y: 82, main: false, moves: "480+" },
  { name: "Salvador", x: 79, y: 39, main: false, moves: "410+" },
  { name: "Florianópolis", x: 59, y: 76, main: false, moves: "350+" },
  { name: "Recife", x: 86, y: 28, main: false, moves: "280+" },
  { name: "Fortaleza", x: 78, y: 20, main: false, moves: "220+" },
  { name: "Goiânia", x: 55, y: 47, main: false, moves: "190+" },
  { name: "Campinas", x: 61, y: 60, main: false, moves: "410+" },
];

export default function Coverage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const [hoveredRoute, setHoveredRoute] = useState<number | null>(null);

  // Helper to check if a city is part of the currently hovered route
  const isCityInActiveRoute = (cityName: string) => {
    if (hoveredRoute === null) return false;
    const activeRoute = routes[hoveredRoute];
    return activeRoute.from === cityName || activeRoute.to === cityName;
  };

  return (
    <section
      id="cobertura"
      className="bg-snow py-[120px] lg:py-[140px]"
      ref={ref}
    >
      <div className="max-w-[1120px] mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="block text-[13px] font-[family-name:var(--font-dm-mono)] uppercase tracking-[0.15em] text-violet mb-4">
            Cobertura
          </span>
          <h2 className="font-[family-name:var(--font-outfit)] text-[clamp(32px,5vw,44px)] font-bold text-near-black leading-[1.1] mb-4">
            De qualquer lugar,
            <br />
            para qualquer lugar.
          </h2>
          <p className="text-neutral-gray text-[17px] max-w-[500px]">
            Cobertura em todo o Brasil com rotas otimizadas e equipes regionais.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16 items-start">
          {/* Map Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative bg-cloud rounded-2xl p-8 lg:p-10 aspect-square max-w-[500px]"
          >
            {/* Realistic Brazil shape */}
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Background shape of Brazil (smooth curved outline) */}
              <path
                d="M 53 8 C 56 9, 59 10, 62 11 C 64 12, 66 12, 68 14 C 70 15, 72 15, 74 16 C 77 16, 79 17, 82 17 C 85 17, 87 19, 89 21 C 91 23, 91 24, 91 25 C 90 27, 88 29, 87 31 C 86 33, 84 36, 83 38 C 82 41, 81 44, 81 46 C 79 49, 77 52, 75 54 C 73 56, 71 58, 70 60 C 68 62, 66 64, 64 65 C 62 67, 61 68, 60 70 C 59 72, 59 74, 59 76 C 58 78, 56 80, 55 82 C 54 84, 53 87, 52 90 C 50 88, 48 86, 46 84 C 47 81, 48 78, 48 75 C 46 73, 44 72, 42 70 C 40 67, 38 63, 36 60 C 35 58, 34 55, 34 53 C 29 54, 25 54, 20 55 C 17 53, 14 51, 12 48 C 13 44, 14 40, 16 36 C 18 35, 20 34, 22 33 C 25 30, 29 27, 32 23 C 35 21, 39 18, 42 16 Z"
                fill="none"
                stroke="#D1D5DB"
                strokeWidth="0.5"
                opacity="0.6"
              />

              {/* Route lines */}
              {routes.map((route, i) => {
                const cityFrom = cityDots.find((c) => c.name === route.from);
                const cityTo = cityDots.find((c) => c.name === route.to);
                if (!cityFrom || !cityTo) return null;

                const isHovered = hoveredRoute === i;
                if (!isHovered) return null;

                return (
                  <g key={`${route.from}-${route.to}`}>
                    {/* Faint background glow line for hovered route */}
                    <motion.line
                      x1={cityFrom.x}
                      y1={cityFrom.y}
                      x2={cityTo.x}
                      y2={cityTo.y}
                      stroke="var(--color-violet)"
                      strokeWidth="1.2"
                      opacity="0.3"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    {/* Direct visible line */}
                    <motion.line
                      x1={cityFrom.x}
                      y1={cityFrom.y}
                      x2={cityTo.x}
                      y2={cityTo.y}
                      stroke="var(--color-violet)"
                      strokeWidth={0.8}
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5 }}
                      className="transition-all duration-300"
                    />
                  </g>
                );
              })}

              {/* City dots */}
              {cityDots.map((city, i) => {
                const isCityHoveredDirectly = hoveredCity === city.name;
                const isCityActive = hoveredRoute !== null && isCityInActiveRoute(city.name);
                const isDotActive = isCityActive || isCityHoveredDirectly;
                const showLabel = isCityActive || isCityHoveredDirectly;

                return (
                  <g key={city.name}>
                    {/* Pulse ring for active cities */}
                    {isDotActive && (
                      <motion.circle
                        cx={city.x}
                        cy={city.y}
                        r="3"
                        fill="none"
                        stroke="var(--color-violet)"
                        strokeWidth="0.5"
                        initial={{ opacity: 0, r: 2 }}
                        animate={
                          isInView
                            ? {
                                opacity: [0, 0.6, 0],
                                r: [2, 6, 2],
                              }
                            : {}
                        }
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3,
                        }}
                      />
                    )}
                    <motion.circle
                      cx={city.x}
                      cy={city.y}
                      r={isDotActive ? 2 : 1.2}
                      fill={isDotActive ? "var(--color-violet)" : "var(--color-indigo)"}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.5 + i * 0.05, type: "spring" }}
                      onMouseEnter={() => setHoveredCity(city.name)}
                      onMouseLeave={() => setHoveredCity(null)}
                      className="cursor-pointer transition-all duration-300"
                    />
                    {/* Label */}
                    {showLabel && (
                      <text
                        x={city.x + 3}
                        y={city.y + 0.5}
                        className={`text-[2.5px] font-[family-name:var(--font-dm-mono)] transition-colors duration-300 fill-violet font-bold`}
                      >
                        {city.name}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Tooltip */}
            {hoveredCity && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-4 left-4 right-4 bg-white rounded-xl p-4 shadow-lg border border-black/5"
              >
                <p className="font-[family-name:var(--font-outfit)] font-semibold text-near-black text-[14px]">
                  {hoveredCity}
                </p>
                <p className="text-neutral-gray text-[12px] font-[family-name:var(--font-dm-mono)]">
                  {cityDots.find((c) => c.name === hoveredCity)?.moves} mudanças realizadas
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Popular Routes */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="font-[family-name:var(--font-outfit)] text-[18px] font-semibold text-near-black mb-6">
              Rotas mais solicitadas
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {routes.map((route, i) => (
                <motion.div
                  key={`${route.from}-${route.to}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.08 }}
                  onMouseEnter={() => setHoveredRoute(i)}
                  onMouseLeave={() => setHoveredRoute(null)}
                  className={`flex flex-col gap-1.5 p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                    hoveredRoute === i
                      ? "bg-lavender-soft border-violet/20 shadow-md scale-[1.02]"
                      : "bg-cloud border-transparent hover:border-violet/10"
                  }`}
                >
                  <div className="flex items-center gap-2 text-[14px] font-medium text-near-black">
                    <span>{route.from}</span>
                    <svg className={`w-4 h-4 transition-all duration-300 ${hoveredRoute === i ? "text-violet translate-x-1 scale-x-110" : "text-neutral-gray"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                    <span>{route.to}</span>
                  </div>
                  <span className="text-[12px] font-[family-name:var(--font-dm-mono)] text-neutral-gray">
                    {route.km} km · ~{route.hours}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
