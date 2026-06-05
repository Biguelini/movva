"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useState, useRef, useEffect } from "react";

const propertyTypes = [
  {
    id: "apt",
    icon: (
      <svg className="w-6 h-6 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-3 3H15m-3 3H15M9 15h1.5M12 15H15M9 18h1.5M12 18H15" />
      </svg>
    ),
    label: "Apartamento",
  },
  {
    id: "house",
    icon: (
      <svg className="w-6 h-6 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
    label: "Casa",
  },
  {
    id: "commercial",
    icon: (
      <svg className="w-6 h-6 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.015a2.993 2.993 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .414.336.75.75.75z" />
      </svg>
    ),
    label: "Comercial",
  },
  {
    id: "items",
    icon: (
      <svg className="w-6 h-6 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    ),
    label: "Apenas itens",
  },
];

const extras = [
  {
    id: "packing",
    icon: (
      <svg className="w-6 h-6 text-violet" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    ),
    label: "Embalagem profissional",
    price: 350,
  },
  {
    id: "cleaning",
    icon: (
      <svg className="w-6 h-6 text-violet" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21L14.096 20.187M9.813 15.904L19.462 6.255a2.625 2.625 0 10-3.712-3.712L6.096 12.192a4.5 4.5 0 00-1.255 2.18l-.75 3.75M9.813 15.904l-3.717-3.717M15.75 18H21M17.25 21H21M18.75 15H21" />
      </svg>
    ),
    label: "Limpeza pós-mudança",
    price: 280,
  },
  {
    id: "assembly",
    icon: (
      <svg className="w-6 h-6 text-violet" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.31-.374.711-.686 1.168-.902l.178-.084a2.25 2.25 0 012.903 2.903l-.084.178c-.216.457-.528.859-.902 1.169l-3.03 2.496M11.42 15.17a2.122 2.122 0 01-3.004 0L3 9.75m11.963-3.03a2.122 2.122 0 113.003 3.003L15 12" />
      </svg>
    ),
    label: "Montagem e desmontagem",
    price: 420,
  },
  {
    id: "insurance",
    icon: (
      <svg className="w-6 h-6 text-violet" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.03 0 1.9.693 2.166 1.638m-7.377 0A48.536 48.536 0 0112 3m0 0c-1.135 0-2.098.845-2.192 1.976a48.411 48.411 0 01-.08 1.123m11.123 0c-.065-.21-.1-.433-.1-.664 0-.414-.336-.75-.75-.75h-4.5a.75.75 0 00-.75-.75c0 .232.035.454.1.664m9.022 0a2.25 2.25 0 00-2.25-2.25h-.384c-.162 0-.32-.015-.477-.03M6.75 6.108V19.5a2.25 2.25 0 002.25 2.25h8.25a2.25 2.25 0 002.25-2.25V6.108m-12 0a2.25 2.25 0 012.25-2.25h.384c.162 0 .32.015.477.03M12 3v18" />
      </svg>
    ),
    label: "Seguro premium",
    price: 180,
  },
  {
    id: "hoisting",
    icon: (
      <svg className="w-6 h-6 text-violet" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21l3.75-3.75" />
      </svg>
    ),
    label: "Içamento de móveis",
    price: null,
  },
];

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

const stepLabels = [
  "Origem",
  "Destino",
  "Imóvel",
  "Detalhes",
  "Serviços",
  "Resultado",
];

function AnimatedNumber({ value, duration = 1.5 }: { value: number; duration?: number }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let start = 0;
    const increment = value / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [value, duration]);

  return (
    <span ref={ref}>
      {display.toLocaleString("pt-BR")}
    </span>
  );
}

const cityCoords: Record<string, { lat: number; lon: number }> = {
  "São Paulo, SP": { lat: -23.5505, lon: -46.6333 },
  "Rio de Janeiro, RJ": { lat: -22.9068, lon: -43.1729 },
  "Belo Horizonte, MG": { lat: -19.9167, lon: -43.9345 },
  "Curitiba, PR": { lat: -25.4284, lon: -49.2733 },
  "Porto Alegre, RS": { lat: -30.0346, lon: -51.2177 },
  "Brasília, DF": { lat: -15.7801, lon: -47.9292 },
  "Salvador, BA": { lat: -12.9777, lon: -38.5016 },
  "Florianópolis, SC": { lat: -27.5954, lon: -48.5480 },
  "Campinas, SP": { lat: -22.9056, lon: -47.0608 },
  "Santos, SP": { lat: -23.9608, lon: -46.3339 },
  "Recife, PE": { lat: -8.0578, lon: -34.8829 },
  "Fortaleza, CE": { lat: -3.7319, lon: -38.5267 },
  "Goiânia, GO": { lat: -16.6869, lon: -49.2648 },
  "São José dos Campos, SP": { lat: -23.1791, lon: -45.8872 },
};

function calculateHaversineDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Earth radius
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 1.15); // Approximate driving distance
}

interface SimulatorProps {
  initialOrigin?: string;
  initialDestination?: string;
}

export default function Simulator({ initialOrigin = "", initialDestination = "" }: SimulatorProps) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [currentStep, setCurrentStep] = useState(0);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [rooms, setRooms] = useState(2);
  const [hasHeavyItems, setHasHeavyItems] = useState(false);
  const [hasStairs, setHasStairs] = useState(false);
  const [needsPacking, setNeedsPacking] = useState(false);
  const [moveDate, setMoveDate] = useState("");
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [originSearch, setOriginSearch] = useState("");
  const [destSearch, setDestSearch] = useState("");
  const [showOriginDropdown, setShowOriginDropdown] = useState(false);
  const [showDestDropdown, setShowDestDropdown] = useState(false);

  // Dynamic Distance API States
  const [distance, setDistance] = useState<number | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [loadingDistance, setLoadingDistance] = useState(false);

  // Sync with props when populated
  useEffect(() => {
    if (initialOrigin) {
      setOrigin(initialOrigin);
      setOriginSearch("");
    }
  }, [initialOrigin]);

  useEffect(() => {
    if (initialDestination) {
      setDestination(initialDestination);
      setDestSearch("");
    }
  }, [initialDestination]);

  useEffect(() => {
    if (initialOrigin && initialDestination) {
      setCurrentStep(2);
    }
  }, [initialOrigin, initialDestination]);

  // Compute road distance via dynamic lookup & OSRM API integration
  useEffect(() => {
    if (!origin || !destination) {
      setDistance(null);
      setDuration(null);
      return;
    }

    const coordFrom = cityCoords[origin];
    const coordTo = cityCoords[destination];
    if (!coordFrom || !coordTo) return;

    // Offline math fallback
    const localDist = calculateHaversineDistance(
      coordFrom.lat,
      coordFrom.lon,
      coordTo.lat,
      coordTo.lon
    );
    const localDur = Math.max(1, Math.round(localDist / 75));
    setDistance(localDist);
    setDuration(localDur);

    // Call live API routing service
    setLoadingDistance(true);
    fetch(
      `https://router.project-osrm.org/route/v1/driving/${coordFrom.lon},${coordFrom.lat};${coordTo.lon},${coordTo.lat}?overview=false`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.routes && data.routes[0]) {
          const roadDistKm = Math.round(data.routes[0].distance / 1000);
          const roadDurHours = Math.round(data.routes[0].duration / 3600);
          setDistance(roadDistKm);
          setDuration(roadDurHours || 1);
        }
      })
      .catch((err) => {
        console.warn("API route fetch error, using local fallback", err);
      })
      .finally(() => {
        setLoadingDistance(false);
      });
  }, [origin, destination]);

  const filteredOriginCities = cities.filter((c) =>
    c.toLowerCase().includes(originSearch.toLowerCase())
  );
  const filteredDestCities = cities.filter((c) =>
    c.toLowerCase().includes(destSearch.toLowerCase())
  );

  const toggleExtra = (id: string) => {
    setSelectedExtras((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  // Pricing based on real distance (R$ 4.80/km + base logistics)
  const basePrice = 1200 + rooms * 350 + (hasHeavyItems ? 350 : 0) + (hasStairs ? 250 : 0);
  const distanceCost = (distance || 0) * 4.8;
  const extrasPrice = selectedExtras.reduce((sum, id) => {
    const extra = extras.find((e) => e.id === id);
    return sum + (extra?.price || 0);
  }, 0);
  const totalPrice = Math.round(basePrice + distanceCost + extrasPrice);

  const estimatedHours = Math.round((duration || 0) + 2 + rooms * 0.8 + (hasHeavyItems ? 1 : 0));
  const teamSize = Math.max(3, Math.round(rooms * 0.8 + 1));
  const itemCount = rooms * 15 + (hasHeavyItems ? 5 : 0);

  const canProceed = () => {
    switch (currentStep) {
      case 0: return origin !== "";
      case 1: return destination !== "";
      case 2: return propertyType !== "";
      case 3: return true;
      case 4: return true;
      default: return true;
    }
  };

  const nextStep = () => {
    if (currentStep < 5) {
      if (currentStep === 4) setShowResult(true);
      setCurrentStep((p) => p + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      if (currentStep === 5) setShowResult(false);
      setCurrentStep((p) => p - 1);
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({ x: direction > 0 ? 100 : -100, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction > 0 ? -100 : 100, opacity: 0 }),
  };

  return (
    <section
      id="simulador"
      className="relative bg-ink py-[100px] lg:py-[120px] overflow-hidden"
      ref={sectionRef}
    >
      {/* Subtle gradient orbs */}
      <div className="absolute w-[500px] h-[500px] rounded-full opacity-10 blur-[100px] bg-violet top-0 left-[-200px]" />
      <div className="absolute w-[400px] h-[400px] rounded-full opacity-10 blur-[80px] bg-indigo bottom-0 right-[-150px]" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="block text-[13px] font-[family-name:var(--font-dm-mono)] uppercase tracking-[0.15em] text-lavender mb-4">
            Simulador
          </span>
          <h2 className="font-[family-name:var(--font-outfit)] text-[clamp(32px,5vw,48px)] font-bold text-white leading-[1.1] mb-4">
            Descubra o valor da
            <br />
            sua mudança agora.
          </h2>
          <p className="text-white/50 text-[17px] lg:text-[18px]">
            Sem compromisso. Sem ligação. Resultado instantâneo.
          </p>
        </motion.div>

        {/* Simulator Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-[720px] mx-auto rounded-3xl glass p-1"
        >
          <div className="rounded-[20px] bg-white/[0.03] p-6 lg:p-10">
            {/* Progress Bar */}
            <div className="flex items-center gap-1 mb-10">
              {stepLabels.map((label, i) => (
                <div key={label} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full h-[3px] rounded-full overflow-hidden bg-white/[0.06]">
                    <motion.div
                      className="h-full bg-gradient-to-r from-violet to-indigo rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: i <= currentStep ? "100%" : "0%" }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  </div>
                  <span
                    className={`hidden sm:block text-[11px] font-[family-name:var(--font-dm-mono)] transition-colors duration-300 ${
                      i <= currentStep ? "text-white/70" : "text-white/20"
                    }`}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Step Content */}
            <div className="min-h-[300px] flex flex-col">
              <AnimatePresence mode="wait" custom={1}>
                {currentStep === 0 && (
                  <motion.div
                    key="step0"
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    custom={1}
                    transition={{ duration: 0.3 }}
                    className="flex-1"
                  >
                    <h3 className="font-[family-name:var(--font-outfit)] text-[22px] font-semibold text-white mb-6">
                      De onde você está saindo?
                    </h3>
                    <div className="relative">
                      <div className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-white/[0.06] border border-white/[0.08] focus-within:border-violet/50 focus-within:ring-2 focus-within:ring-violet/20 transition-all">
                        <svg className="w-5 h-5 text-white/40 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <input
                          type="text"
                          value={originSearch || origin}
                          onChange={(e) => {
                            setOriginSearch(e.target.value);
                            setOrigin("");
                            setShowOriginDropdown(true);
                          }}
                          onFocus={() => setShowOriginDropdown(true)}
                          onBlur={() => setTimeout(() => setShowOriginDropdown(false), 200)}
                          placeholder="Digite a cidade de origem..."
                          className="flex-1 bg-transparent text-white text-[15px] placeholder:text-white/30 outline-none"
                        />
                      </div>
                      <AnimatePresence>
                        {showOriginDropdown && (
                          <motion.div
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            className="absolute z-20 mt-2 w-full rounded-xl bg-[#1a1a2e] border border-white/[0.08] overflow-hidden shadow-2xl"
                          >
                            {filteredOriginCities.slice(0, 5).map((city) => (
                              <button
                                key={city}
                                onClick={() => {
                                  setOrigin(city);
                                  setOriginSearch("");
                                  setShowOriginDropdown(false);
                                }}
                                className="w-full px-4 py-3 text-left text-white/70 hover:bg-violet/10 hover:text-white text-[14px] transition-colors border-b border-white/[0.04] last:border-0"
                              >
                                {city}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    {origin && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-4 text-violet text-[14px] font-[family-name:var(--font-dm-mono)]"
                      >
                        ✓ {origin}
                      </motion.p>
                    )}
                  </motion.div>
                )}

                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    custom={1}
                    transition={{ duration: 0.3 }}
                    className="flex-1"
                  >
                    <h3 className="font-[family-name:var(--font-outfit)] text-[22px] font-semibold text-white mb-6">
                      Para onde você está indo?
                    </h3>
                    <div className="relative">
                      <div className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-white/[0.06] border border-white/[0.08] focus-within:border-violet/50 focus-within:ring-2 focus-within:ring-violet/20 transition-all">
                        <svg className="w-5 h-5 text-white/40 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <input
                          type="text"
                          value={destSearch || destination}
                          onChange={(e) => {
                            setDestSearch(e.target.value);
                            setDestination("");
                            setShowDestDropdown(true);
                          }}
                          onFocus={() => setShowDestDropdown(true)}
                          onBlur={() => setTimeout(() => setShowDestDropdown(false), 200)}
                          placeholder="Digite a cidade de destino..."
                          className="flex-1 bg-transparent text-white text-[15px] placeholder:text-white/30 outline-none"
                        />
                      </div>
                      <AnimatePresence>
                        {showDestDropdown && (
                          <motion.div
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            className="absolute z-20 mt-2 w-full rounded-xl bg-[#1a1a2e] border border-white/[0.08] overflow-hidden shadow-2xl"
                          >
                            {filteredDestCities.slice(0, 5).map((city) => (
                              <button
                                key={city}
                                onClick={() => {
                                  setDestination(city);
                                  setDestSearch("");
                                  setShowDestDropdown(false);
                                }}
                                className="w-full px-4 py-3 text-left text-white/70 hover:bg-violet/10 hover:text-white text-[14px] transition-colors border-b border-white/[0.04] last:border-0"
                              >
                                {city}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    {destination && origin && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 rounded-xl bg-white/[0.04] border border-white/[0.06] p-4"
                      >
                        <div className="flex items-center gap-3 text-[14px] font-[family-name:var(--font-dm-mono)]">
                          <span className="text-violet">{origin.split(",")[0]}</span>
                          <svg className="w-4 h-4 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                          <span className="text-indigo">{destination.split(",")[0]}</span>
                        </div>
                        <p className="text-white/30 text-[12px] mt-2 font-[family-name:var(--font-dm-mono)]">
                          {loadingDistance ? (
                            "Calculando distância e tempo de rota..."
                          ) : (
                            `~ ${distance || 0} km · Estimativa de ${duration || 0}h de transporte`
                          )}
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    custom={1}
                    transition={{ duration: 0.3 }}
                    className="flex-1"
                  >
                    <h3 className="font-[family-name:var(--font-outfit)] text-[22px] font-semibold text-white mb-6">
                      Qual o tipo do seu imóvel?
                    </h3>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
                      {propertyTypes.map((type) => (
                        <button
                          key={type.id}
                          onClick={() => setPropertyType(type.id)}
                          className={`flex flex-col items-center gap-2 py-5 px-3 rounded-xl border transition-all duration-300 ${
                            propertyType === type.id
                              ? "border-violet bg-violet/10 scale-[1.02]"
                              : "border-white/[0.08] bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]"
                          }`}
                        >
                          <div className="mb-2 text-white/80">{type.icon}</div>
                          <span className="text-white/80 text-[14px]">
                            {type.label}
                          </span>
                        </button>
                      ))}
                    </div>

                    <h4 className="text-white/70 text-[15px] mb-4">
                      Quantos cômodos?
                    </h4>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setRooms(Math.max(1, rooms - 1))}
                        className="w-10 h-10 rounded-lg bg-white/[0.06] border border-white/[0.08] text-white hover:bg-white/10 transition-colors flex items-center justify-center text-lg"
                      >
                        −
                      </button>
                      <span className="text-white font-[family-name:var(--font-dm-mono)] text-[20px] w-12 text-center">
                        {rooms}
                      </span>
                      <button
                        onClick={() => setRooms(Math.min(10, rooms + 1))}
                        className="w-10 h-10 rounded-lg bg-white/[0.06] border border-white/[0.08] text-white hover:bg-white/10 transition-colors flex items-center justify-center text-lg"
                      >
                        +
                      </button>
                      <span className="text-white/40 text-[14px]">cômodos</span>
                    </div>
                  </motion.div>
                )}

                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    custom={1}
                    transition={{ duration: 0.3 }}
                    className="flex-1"
                  >
                    <h3 className="font-[family-name:var(--font-outfit)] text-[22px] font-semibold text-white mb-6">
                      Algum detalhe importante?
                    </h3>

                    <div className="space-y-4 mb-8">
                      {[
                        {
                          label: "Tem itens pesados? (piano, cofre, mesa grande)",
                          value: hasHeavyItems,
                          setter: setHasHeavyItems,
                        },
                        {
                          label: "Tem escadas no local? (sem elevador)",
                          value: hasStairs,
                          setter: setHasStairs,
                        },
                        {
                          label: "Precisa de embalagem profissional?",
                          value: needsPacking,
                          setter: setNeedsPacking,
                        },
                      ].map((toggle) => (
                        <div
                          key={toggle.label}
                          className="flex items-center justify-between px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.06]"
                        >
                          <span className="text-white/70 text-[14px] pr-4">
                            {toggle.label}
                          </span>
                          <button
                            onClick={() => toggle.setter(!toggle.value)}
                            className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                              toggle.value ? "bg-violet" : "bg-white/10"
                            }`}
                          >
                            <motion.div
                              className="absolute top-[3px] w-[18px] h-[18px] rounded-full bg-white shadow-md"
                              animate={{ left: toggle.value ? "26px" : "3px" }}
                              transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 30,
                              }}
                            />
                          </button>
                        </div>
                      ))}
                    </div>

                    <h4 className="text-white/70 text-[15px] mb-3">
                      Data estimada da mudança
                    </h4>
                    <div className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-white/[0.06] border border-white/[0.08] focus-within:border-violet/50 transition-all">
                      <svg className="w-5 h-5 text-white/40 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      <input
                        type="month"
                        value={moveDate}
                        onChange={(e) => setMoveDate(e.target.value)}
                        className="flex-1 bg-transparent text-white text-[15px] outline-none [color-scheme:dark]"
                      />
                    </div>
                  </motion.div>
                )}

                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    custom={1}
                    transition={{ duration: 0.3 }}
                    className="flex-1"
                  >
                    <h3 className="font-[family-name:var(--font-outfit)] text-[22px] font-semibold text-white mb-6">
                      Serviços extras?
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {extras.map((extra) => (
                        <button
                          key={extra.id}
                          onClick={() => extra.price !== null && toggleExtra(extra.id)}
                          className={`flex flex-col items-start gap-2 p-4 rounded-xl border transition-all duration-300 text-left ${
                            selectedExtras.includes(extra.id)
                              ? "border-violet bg-violet/10 scale-[1.02]"
                              : "border-white/[0.08] bg-white/[0.03] hover:border-white/20"
                          }`}
                        >
                          <div className="mb-2 text-violet">{extra.icon}</div>
                          <span className="text-white/80 text-[14px] font-medium">
                            {extra.label}
                          </span>
                          <span className="text-white/40 text-[13px] font-[family-name:var(--font-dm-mono)]">
                            {extra.price
                              ? `+ R$ ${extra.price}`
                              : "Sob consulta"}
                          </span>
                          {selectedExtras.includes(extra.id) && (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute top-3 right-3 text-violet text-sm"
                            >
                              ✓
                            </motion.span>
                          )}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {currentStep === 5 && (
                  <motion.div
                    key="step5"
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    custom={1}
                    transition={{ duration: 0.3 }}
                    className="flex-1"
                  >
                    <div className="text-center">
                      <h3 className="font-[family-name:var(--font-outfit)] text-[20px] font-medium text-white/70 mb-2">
                        Sua mudança estimada
                      </h3>

                      <div className="py-8">
                        <div className="inline-flex items-baseline gap-1">
                          <span className="text-white/50 text-[20px]">R$</span>
                          <span className="font-[family-name:var(--font-dm-mono)] text-[clamp(40px,8vw,56px)] font-medium gradient-text">
                            {showResult ? (
                              <AnimatedNumber value={totalPrice} />
                            ) : (
                              "0"
                            )}
                          </span>
                        </div>
                        <p className="text-white/30 text-[13px] mt-1 font-[family-name:var(--font-dm-mono)]">
                          a partir de · inclui seguro básico
                        </p>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                        {[
                          {
                            icon: (
                              <svg className="w-5 h-5 text-violet" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            ),
                            value: `${estimatedHours}h`,
                            label: "duração",
                          },
                          {
                            icon: (
                              <svg className="w-5 h-5 text-violet" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                              </svg>
                            ),
                            value: `${teamSize} prof.`,
                            label: "equipe",
                          },
                          {
                            icon: (
                              <svg className="w-5 h-5 text-violet" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1-1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8h4l3 3v5a1 1 0 01-1 1h-1m-6 0h-2" />
                              </svg>
                            ),
                            value: rooms > 4 ? "Truck G" : "Truck M",
                            label: "veículo",
                          },
                          {
                            icon: (
                              <svg className="w-5 h-5 text-violet" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                              </svg>
                            ),
                            value: `${itemCount}`,
                            label: "itens est.",
                          },
                        ].map((stat) => (
                          <div
                            key={stat.label}
                            className="flex flex-col items-center gap-1 py-3 px-2 rounded-xl bg-white/[0.04] border border-white/[0.06]"
                          >
                            <div className="mb-1">{stat.icon}</div>
                            <span className="text-white font-[family-name:var(--font-dm-mono)] text-[15px] font-medium">
                              {stat.value}
                            </span>
                            <span className="text-white/30 text-[11px]">
                              {stat.label}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="text-white/40 text-[13px] font-[family-name:var(--font-dm-mono)] mb-6">
                        {origin} → {destination} ({distance} km)
                        <br />
                        {propertyTypes.find((t) => t.id === propertyType)?.label} · {rooms} cômodos
                      </div>

                      <a
                        href="#contato"
                        className="inline-flex w-full items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-violet to-indigo text-white text-[16px] font-semibold hover:shadow-xl hover:shadow-violet/30 hover:scale-[1.02] transition-all duration-300"
                      >
                        Solicitar orçamento definitivo
                      </a>

                      <p className="text-white/30 text-[12px] mt-4 flex items-start gap-1.5 justify-center">
                        <svg className="w-4 h-4 text-white/40 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Este valor é uma estimativa. O orçamento definitivo será enviado em até 2 horas após sua solicitação.</span>
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation */}
              {currentStep < 5 && (
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/[0.06]">
                  {currentStep > 0 ? (
                    <button
                      onClick={prevStep}
                      className="flex items-center gap-2 text-white/50 text-[14px] hover:text-white transition-colors"
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M13 7H1m0 0l5-5M1 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Voltar
                    </button>
                  ) : (
                    <div />
                  )}
                  <button
                    onClick={nextStep}
                    disabled={!canProceed()}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-[14px] font-medium transition-all duration-300 ${
                      canProceed()
                        ? "bg-gradient-to-r from-violet to-indigo text-white hover:shadow-lg hover:shadow-violet/25"
                        : "bg-white/[0.06] text-white/20 cursor-not-allowed"
                    }`}
                  >
                    {currentStep === 4 ? "Ver resultado" : "Próximo"}
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M1 7h12m0 0L8 2m5 5L8 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
