import { useRef } from "react";
import PremiumCard from "./PremiumCard";
import { premiumServices } from "../data/premiumServices";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PremiumCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 480;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section id="premium-services" className="relative py-24 sm:py-32">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[radial-gradient(circle,hsl(217,91%,60%/0.06),transparent_70%)] blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 mb-12">
        <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-[hsl(217,91%,70%)] mb-3">
          Serviços Premium
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
          Projetos que geram{" "}
          <span className="bg-gradient-to-r from-[hsl(217,91%,60%)] to-[hsl(270,60%,60%)] bg-clip-text text-transparent">
            resultados reais
          </span>
        </h2>
      </div>

      {/* Carousel */}
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory px-6 lg:px-[max(1.5rem,calc((100vw-1280px)/2+1.5rem))] pb-4 premium-scroll-hide"
        >
          {premiumServices.map((service) => (
            <PremiumCard key={service.id} service={service} />
          ))}
        </div>

        {/* Nav arrows */}
        <button
          onClick={() => scroll("left")}
          className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center rounded-full border border-white/10 bg-[hsl(225,40%,10%/0.8)] backdrop-blur-md text-white/60 hover:text-white hover:border-white/20 transition-all duration-200 z-20"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => scroll("right")}
          className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center rounded-full border border-white/10 bg-[hsl(225,40%,10%/0.8)] backdrop-blur-md text-white/60 hover:text-white hover:border-white/20 transition-all duration-200 z-20"
          aria-label="Próximo"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};

export default PremiumCarousel;
