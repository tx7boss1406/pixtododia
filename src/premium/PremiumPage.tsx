import PremiumBackground from "./components/PremiumBackground";
import PremiumHero from "./components/PremiumHero";
import PremiumCarousel from "./components/PremiumCarousel";
import OrderBumpSection from "./components/OrderBumpSection";
import FinalCTA from "./components/FinalCTA";
import "@/premium/styles/premiumAnimations.css";

const PremiumPage = () => {
  return (
    <div className="relative min-h-screen bg-[hsl(225,50%,4%)] text-white overflow-x-hidden">
      <PremiumBackground />
      <div className="relative z-10">
        <PremiumHero />
        <PremiumCarousel />
        <OrderBumpSection />
        <FinalCTA />
      </div>
    </div>
  );
};

export default PremiumPage;
