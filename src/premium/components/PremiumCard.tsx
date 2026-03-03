import { useState } from "react";
import type { PremiumService } from "../data/premiumServices";

interface PremiumCardProps {
  service: PremiumService;
}

const PremiumCard = ({ service }: PremiumCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative flex-shrink-0 w-[340px] sm:w-[420px] lg:w-[460px] h-[480px] sm:h-[520px] rounded-2xl overflow-hidden cursor-pointer snap-start transition-all duration-[350ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-[1.03] hover:-translate-y-1.5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow border on hover */}
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-[hsl(217,91%,60%)] to-[hsl(270,60%,55%)] opacity-0 group-hover:opacity-60 transition-opacity duration-300 blur-sm" />

      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[hsl(225,40%,12%)] to-[hsl(225,45%,6%)] border border-white/[0.06] group-hover:border-white/[0.12] transition-colors duration-300">
        {/* Image */}
        <div className="relative h-[60%] overflow-hidden">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover transition-transform duration-[500ms] group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(225,45%,6%)] via-[hsl(225,45%,6%/0.4)] to-transparent" />

          {/* Badge */}
          {service.badge && (
            <div className="absolute top-4 right-4 px-3 py-1 text-[11px] font-semibold tracking-wide uppercase rounded-full bg-gradient-to-r from-[hsl(217,91%,55%/0.9)] to-[hsl(270,60%,55%/0.9)] text-white backdrop-blur-md shadow-lg">
              {service.badge}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="relative h-[40%] p-5 sm:p-6 flex flex-col justify-between backdrop-blur-sm">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5 leading-tight">
              {service.title}
            </h3>
            <p className={`text-sm text-[hsl(220,20%,60%)] leading-relaxed transition-all duration-300 ${isHovered ? "opacity-100 max-h-20" : "opacity-70 max-h-10 overflow-hidden"}`}>
              {service.description}
            </p>
          </div>

          <div className="flex items-center justify-between mt-3">
            <span className="text-lg sm:text-xl font-bold text-white">
              {service.priceRange}
            </span>

            <a
              href={service.checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-[hsl(217,91%,55%)] to-[hsl(270,60%,55%)] transition-all duration-300 hover:scale-105 shadow-lg shadow-[hsl(217,91%,55%/0.2)] ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
              onClick={(e) => e.stopPropagation()}
            >
              Comprar Projeto
            </a>
          </div>
        </div>
      </div>

      {/* Deep shadow */}
      <div className="absolute -inset-4 -z-10 rounded-3xl bg-[radial-gradient(circle,hsl(217,91%,50%/0.06),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
    </div>
  );
};

export default PremiumCard;
