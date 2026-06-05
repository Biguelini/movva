"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const timelineSteps = [
  {
    day: "Dia 1",
    title: "Solicitação",
    description: "Você simula e solicita. Retornamos em até 2h com orçamento detalhado.",
  },
  {
    day: "Dia 2",
    title: "Vistoria virtual",
    description: "Videochamada rápida para confirmar volumes e detalhes especiais.",
  },
  {
    day: "Dia 3–5",
    title: "Preparação",
    description: "Equipe designada. Materiais de embalagem separados. Rota otimizada.",
  },
  {
    day: "Dia D",
    title: "Mudança",
    description: "Embalagem. Carregamento. Transporte. Tudo rastreado em tempo real.",
  },
  {
    day: "Dia D+1",
    title: "Entrega",
    description: "Descarregamento. Montagem. Checklist digital de conferência.",
  },
  {
    day: "Dia D+2",
    title: "Acompanhamento",
    description: "Ligamos para garantir que tudo está perfeito. Sua satisfação é nossa métrica.",
  },
];

export default function ProcessTimeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-cloud py-[120px] lg:py-[140px]" ref={ref}>
      <div className="max-w-[900px] mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 lg:mb-20"
        >
          <span className="block text-[13px] font-[family-name:var(--font-dm-mono)] uppercase tracking-[0.15em] text-violet mb-4">
            Processo
          </span>
          <h2 className="font-[family-name:var(--font-outfit)] text-[clamp(32px,5vw,44px)] font-bold text-near-black leading-[1.1]">
            Transparência em
            <br />
            cada etapa.
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-[19px] lg:left-[23px] top-0 bottom-0 w-[2px] bg-black/[0.06]">
            <motion.div
              className="w-full bg-gradient-to-b from-violet to-indigo rounded-full"
              initial={{ height: "0%" }}
              animate={isInView ? { height: "100%" } : {}}
              transition={{ duration: 2, ease: "easeInOut", delay: 0.3 }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-10">
            {timelineSteps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.15 }}
                className="relative flex items-start"
              >
                {/* Dot */}
                <div className="w-10 lg:w-12 flex-shrink-0 flex justify-center relative z-10 mt-1.5">
                  <div className="relative">
                    <motion.div
                      className="w-[10px] h-[10px] lg:w-[12px] lg:h-[12px] rounded-full bg-violet"
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 25,
                        delay: 0.5 + i * 0.15,
                      }}
                    />
                    <motion.div
                      className="absolute -inset-1.5 rounded-full bg-violet/20"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={isInView ? { scale: 1, opacity: 1 } : {}}
                      transition={{ delay: 0.6 + i * 0.15, duration: 0.4 }}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="pb-2 pl-2 lg:pl-4">
                  <span className="block text-[12px] font-[family-name:var(--font-dm-mono)] text-violet mb-1 uppercase tracking-wide">
                    {step.day}
                  </span>
                  <h3 className="font-[family-name:var(--font-outfit)] text-[18px] lg:text-[20px] font-semibold text-near-black mb-2">
                    {step.title}
                  </h3>
                  <p className="text-neutral-gray text-[14px] lg:text-[15px] leading-relaxed max-w-[500px]">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
