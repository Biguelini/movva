"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const items = [
  {
    icon: (
      <svg className="w-8 h-8 text-violet" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
    title: "Seguro total",
    description:
      "Cada item é catalogado e segurado. Se algo acontecer, repomos. Sem burocracia.",
    size: "large",
    bg: "bg-lavender-soft",
  },
  {
    icon: (
      <svg className="w-8 h-8 text-violet" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: "Resposta em 2 horas",
    description:
      "Do primeiro contato ao orçamento detalhado: máximo 2 horas. Sempre.",
    size: "medium",
    bg: "bg-violet/5",
  },
  {
    icon: (
      <svg className="w-8 h-8 text-violet" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    title: "Rastreio completo",
    description: "Acompanhe cada item in tempo real pelo celular. Sem ansiedade.",
    size: "small",
    bg: "bg-cloud",
  },
  {
    icon: (
      <svg className="w-8 h-8 text-violet" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.03 0 1.9.693 2.166 1.638m-7.377 0A48.536 48.536 0 0112 3m0 0c-1.135 0-2.098.845-2.192 1.976a48.411 48.411 0 01-.08 1.123m11.123 0c-.065-.21-.1-.433-.1-.664 0-.414-.336-.75-.75-.75h-4.5a.75.75 0 00-.75-.75c0 .232.035.454.1.664m9.022 0a2.25 2.25 0 00-2.25-2.25h-.384c-.162 0-.32-.015-.477-.03M6.75 6.108V19.5a2.25 2.25 0 002.25 2.25h8.25a2.25 2.25 0 002.25-2.25V6.108m-12 0a2.25 2.25 0 012.25-2.25h.384c.162 0 .32.015.477.03M12 3v18" />
      </svg>
    ),
    title: "Checklist digital",
    description: "Confira cada item na entrega. Tudo documentado e registrado.",
    size: "small",
    bg: "bg-indigo/5",
  },
  {
    icon: (
      <svg className="w-8 h-8 text-violet" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-6.75a1.125 1.125 0 00-1.125 1.125v3.375m9 0h-9m9-11.25H18a3.75 3.75 0 000 7.5h-.75m-9-7.5H6a3.75 3.75 0 000 7.5h.75m3.75-7.5V3m0 0h5.25m-5.25 0v10.5m5.25-10.5v10.5" />
      </svg>
    ),
    title: "+12.000 mudanças",
    description: "Nota 4.9 no Google. 98% de satisfação. Confiança comprovada.",
    size: "medium",
    bg: "bg-violet/5",
  },
];

export default function Differentials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="sobre" className="bg-snow py-[120px] lg:py-[160px]" ref={ref}>
      <div className="max-w-[1120px] mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="block text-[13px] font-[family-name:var(--font-dm-mono)] uppercase tracking-[0.15em] text-violet mb-4">
            Por que MOVVA
          </span>
          <h2 className="font-[family-name:var(--font-outfit)] text-[clamp(32px,5vw,48px)] font-bold text-near-black leading-[1.1]">
            Não é só mudança.
            <br />
            É a forma como fazemos.
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              className={`group relative rounded-2xl p-7 lg:p-8 ${item.bg} hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5 transition-all duration-400 cursor-default ${
                item.size === "large"
                  ? "md:col-span-2 lg:col-span-2"
                  : ""
              }`}
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="font-[family-name:var(--font-outfit)] text-[20px] lg:text-[22px] font-semibold text-near-black mb-3">
                {item.title}
              </h3>
              <p className="text-neutral-gray text-[15px] leading-relaxed max-w-[400px]">
                {item.description}
              </p>

              {/* Subtle corner accent on hover */}
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-violet/0 group-hover:bg-violet/10 transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
