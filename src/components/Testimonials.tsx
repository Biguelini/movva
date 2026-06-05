"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const testimonials = [
  {
    quote:
      "A MOVVA fez em 4 horas o que eu achei que levaria o dia inteiro. Cada caixa chegou no lugar certo. Inacreditável.",
    name: "Marina Costa",
    route: "São Paulo → Campinas",
    date: "Março 2026",
    items: 42,
    rooms: 3,
    price: "R$ 2.100",
    rating: 5,
  },
  {
    quote:
      "Mudei de escritório com 80 estações de trabalho. A equipe da MOVVA montou tudo antes do expediente começar no dia seguinte.",
    name: "Carlos Henrique",
    route: "São Paulo → São Paulo",
    date: "Janeiro 2026",
    items: 156,
    rooms: 8,
    price: "R$ 8.400",
    rating: 5,
  },
  {
    quote:
      "Interestadual com dois pets e plantas. Achei que seria impossível, mas a MOVVA cuidou de absolutamente tudo.",
    name: "Juliana Rios",
    route: "Rio de Janeiro → Florianópolis",
    date: "Fevereiro 2026",
    items: 67,
    rooms: 4,
    price: "R$ 5.200",
    rating: 5,
  },
  {
    quote:
      "O rastreio em tempo real me deixou tranquila. Sabia exatamente onde cada caixa estava. Muito acima do esperado.",
    name: "Fernanda Lima",
    route: "Belo Horizonte → Brasília",
    date: "Abril 2026",
    items: 53,
    rooms: 3,
    price: "R$ 4.800",
    rating: 5,
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((p) => (p + 1) % testimonials.length);
  const prev = () =>
    setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length);

  const t = testimonials[current];

  return (
    <section className="bg-ink py-[120px] lg:py-[140px] overflow-hidden" ref={ref}>
      <div className="max-w-[1000px] mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="block text-[13px] font-[family-name:var(--font-dm-mono)] uppercase tracking-[0.15em] text-lavender mb-4">
            Experiências
          </span>
          <h2 className="font-[family-name:var(--font-outfit)] text-[clamp(32px,5vw,48px)] font-bold text-white leading-[1.1]">
            Quem mudou com a MOVVA
            <br />
            não volta atrás.
          </h2>
        </motion.div>

        {/* Testimonial Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          {/* Giant decorative quote */}
          <span className="absolute -top-8 -left-4 font-[family-name:var(--font-outfit)] text-[180px] lg:text-[220px] font-bold text-violet/[0.06] leading-none select-none pointer-events-none">
            &ldquo;
          </span>

          <div className="relative z-10 glass rounded-2xl p-8 lg:p-12">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
            >
              {/* Quote */}
              <p className="text-white/90 text-[18px] lg:text-[22px] leading-relaxed font-[family-name:var(--font-outfit)] font-light mb-8 max-w-[700px]">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-6">
                <div>
                  <p className="text-white font-semibold text-[16px]">
                    — {t.name}
                  </p>
                  <p className="text-white/40 text-[14px] font-[family-name:var(--font-dm-mono)]">
                    {t.route} · {t.date}
                  </p>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-4 text-[13px] font-[family-name:var(--font-dm-mono)] text-white/30">
                <span>{t.items} itens</span>
                <span>·</span>
                <span>{t.rooms} cômodos</span>
                <span>·</span>
                <span>{t.price}</span>
              </div>
            </motion.div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === current
                      ? "bg-violet w-6"
                      : "bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/25 transition-all"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/25 transition-all"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
