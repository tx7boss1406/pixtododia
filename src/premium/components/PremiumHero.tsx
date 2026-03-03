import { useEffect, useRef, useState } from "react";
import PremiumBackground from "./PremiumBackground";
import notebookImg from "@/assets/premium-notebook.png";
import mobileImg from "@/assets/premium-mobile.png";
import "@/premium/styles/premiumAnimations.css";

const PremiumHero = () => {
  const mockupRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!mockupRef.current) return;
      const rect = mockupRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const maxDeg = 5;
      const x = ((e.clientY - cy) / (window.innerHeight / 2)) * -maxDeg;
      const y = ((e.clientX - cx) / (window.innerWidth / 2)) * maxDeg;
      setRotation({ x: Math.max(-maxDeg, Math.min(maxDeg, x)), y: Math.max(-maxDeg, Math.min(maxDeg, y)) });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <PremiumBackground />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Block */}
          <div className="space-y-8">
            <div className="animate-fade-in-hero">
              <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-[hsl(217,91%,70%)] mb-4">
                Desenvolvimento sob medida
              </span>
            </div>

            <h1 className="animate-fade-in-hero-delay-1 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-white">
              Transformamos sua ideia em uma{" "}
              <span className="bg-gradient-to-r from-[hsl(217,91%,60%)] to-[hsl(270,60%,60%)] bg-clip-text text-transparent">
                Plataforma Profissional
              </span>
            </h1>

            <p className="animate-fade-in-hero-delay-2 text-lg text-[hsl(220,20%,70%)] max-w-xl leading-relaxed">
              Sites, aplicativos e sistemas completos criados com arquitetura
              escalável, design premium e foco total em conversão.
            </p>

            <div className="animate-fade-in-hero-delay-3 flex flex-wrap gap-4">
              {/* Primary Button */}
              <a
                href="#premium-services"
                className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[hsl(217,91%,55%)] to-[hsl(270,60%,55%)] rounded-2xl" />
                <div className="absolute inset-0 bg-gradient-to-r from-[hsl(217,91%,60%)] to-[hsl(270,60%,65%)] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute -inset-1 bg-gradient-to-r from-[hsl(217,91%,55%/0.4)] to-[hsl(270,60%,55%/0.4)] rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10">Quero meu projeto</span>
              </a>

              {/* Secondary Button */}
              <a
                href="https://wa.me/5500000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white/80 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-white/25 hover:text-white transition-all duration-300"
              >
                Falar com desenvolvedor
              </a>
            </div>
          </div>

          {/* Mockup Block */}
          <div className="relative flex justify-center lg:justify-end animate-fade-in-hero-delay-2">
            <div
              ref={mockupRef}
              className="relative premium-perspective animate-float-premium"
              style={{
                transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                transition: "transform 0.15s ease-out",
              }}
            >
              {/* Glow behind mockup */}
              <div className="absolute inset-0 -m-8 bg-[radial-gradient(circle,hsl(217,91%,60%/0.15),transparent_60%)] animate-glow-pulse blur-2xl" />

              {/* Notebook */}
              <div className="relative w-[340px] sm:w-[460px] lg:w-[520px] rounded-xl overflow-hidden shadow-2xl shadow-[hsl(217,91%,60%/0.1)]">
                <img
                  src={notebookImg}
                  alt="Dashboard profissional em notebook"
                  className="w-full h-auto object-cover"
                  loading="eager"
                />
                {/* Screen reflection */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Mobile phone */}
              <div className="absolute -bottom-4 -left-6 sm:-left-10 w-[90px] sm:w-[120px] lg:w-[140px] rounded-2xl overflow-hidden shadow-2xl shadow-[hsl(270,60%,50%/0.15)] border border-white/10"
                style={{ animation: "floatPremium 8s ease-in-out infinite", animationDelay: "1s" }}
              >
                <img
                  src={mobileImg}
                  alt="App mobile profissional"
                  className="w-full h-auto object-cover"
                  loading="eager"
                />
                {/* Screen glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(270,60%,50%/0.1)] to-transparent pointer-events-none" />
              </div>

              {/* Floor reflection */}
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-3/4 h-12 bg-[radial-gradient(ellipse,hsl(217,91%,60%/0.08),transparent_70%)] blur-xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumHero;
