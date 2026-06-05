"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Simule",
    description:
      "Descreva sua mudança no simulador inteligente. Em 30 segundos você tem uma estimativa.",
    cta: "Simular agora",
    href: "#simulador",
  },
  {
    number: "02",
    title: "Confirme",
    description:
      "Receba seu orçamento detalhado em minutos. Transparente. Sem surpresas.",
  },
  {
    number: "03",
    title: "Rastreie",
    description:
      "Acompanhe cada etapa em tempo real. Cada item catalogado e rastreado.",
  },
  {
    number: "04",
    title: "Receba",
    description:
      "Seus pertences chegam no novo lar, na hora certa, no lugar certo.",
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="como-funciona"
      className="relative bg-snow py-[120px] lg:py-[160px]"
    >
      <div className="max-w-[1120px] mx-auto px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <span className="block text-[13px] font-[family-name:var(--font-dm-mono)] uppercase tracking-[0.15em] text-violet mb-4">
            Processo
          </span>
          <h2 className="font-[family-name:var(--font-outfit)] text-[clamp(32px,5vw,48px)] font-bold text-near-black leading-[1.1] mb-4">
            Quatro passos.
            <br />
            Zero estresse.
          </h2>
          <p className="text-neutral-gray text-[17px] lg:text-[18px] leading-relaxed max-w-[560px]">
            Da simulação à entrega, cada etapa é projetada para que você não
            precise se preocupar com nada.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {/* Connecting line (desktop only) */}
          <div className="hidden lg:block absolute top-[32px] left-[10%] right-[10%] h-[2px]">
            <motion.div
              className="h-full bg-gradient-to-r from-violet/30 via-indigo/20 to-lavender/10 rounded-full"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
              style={{ transformOrigin: "left" }}
            />
          </div>

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.4 + i * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="relative flex flex-col"
            >
              {/* Step Number Circle */}
              <div className="relative z-10 flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-lavender-soft flex items-center justify-center">
                  <span className="font-[family-name:var(--font-dm-mono)] text-[15px] font-medium text-violet">
                    {step.number}
                  </span>
                </div>
              </div>

              {/* Content */}
              <h3 className="font-[family-name:var(--font-outfit)] text-[24px] font-semibold text-near-black mb-3">
                {step.title}
              </h3>
              <p className="text-neutral-gray text-[15px] leading-relaxed mb-4">
                {step.description}
              </p>

              {/* CTA if exists */}
              {step.cta && (
                <a
                  href={step.href}
                  className="inline-flex items-center gap-1 text-violet text-[14px] font-medium hover:text-deep-purple transition-colors group"
                >
                  {step.cta}
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
