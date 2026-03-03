import { useEffect, useRef } from "react";

const PremiumBackground = () => {
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!particlesRef.current) return;
    const container = particlesRef.current;
    const particles: HTMLDivElement[] = [];

    for (let i = 0; i < 40; i++) {
      const p = document.createElement("div");
      const size = Math.random() * 3 + 1;
      p.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(147, 197, 253, ${Math.random() * 0.3 + 0.1});
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: particleFloat ${Math.random() * 6 + 6}s ease-in-out infinite;
        animation-delay: ${Math.random() * 4}s;
      `;
      container.appendChild(p);
      particles.push(p);
    }

    return () => {
      particles.forEach((p) => p.remove());
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(225,50%,8%)] via-[hsl(225,55%,6%)] to-[hsl(220,60%,3%)]" />

      {/* Blue radial glow top-left */}
      <div className="absolute -top-1/4 -left-1/4 w-[60%] h-[60%] rounded-full bg-[radial-gradient(circle,hsl(217,91%,60%/0.12),transparent_70%)] animate-glow-pulse" />

      {/* Purple radial glow bottom-right */}
      <div className="absolute -bottom-1/4 -right-1/4 w-[50%] h-[50%] rounded-full bg-[radial-gradient(circle,hsl(270,60%,50%/0.08),transparent_70%)] animate-glow-pulse" style={{ animationDelay: "2s" }} />

      {/* Light beam */}
      <div className="absolute top-0 left-0 w-[200%] h-[1px] bg-gradient-to-r from-transparent via-[hsl(217,91%,60%/0.1)] to-transparent animate-light-beam origin-top-left" />

      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />

      {/* Particles */}
      <div ref={particlesRef} className="absolute inset-0" />
    </div>
  );
};

export default PremiumBackground;
