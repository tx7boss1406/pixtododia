import premiumCardSales from "@/assets/premium-card-sales.png";
import premiumCardApp from "@/assets/premium-card-app.png";
import premiumCardSystem from "@/assets/premium-card-system.png";
import premiumCardCourses from "@/assets/premium-card-courses.png";
import premiumCardSaas from "@/assets/premium-card-saas.png";

export interface PremiumService {
  id: string;
  title: string;
  description: string;
  priceRange: string;
  benefits: string[];
  image: string;
  checkoutUrl: string;
  badge?: string;
}

export const premiumServices: PremiumService[] = [
  {
    id: "sales-page",
    title: "Página de Vendas Profissional",
    description:
      "Landing page de alta conversão com copywriting estratégico, design premium e otimização para resultados.",
    priceRange: "R$ 497 – R$ 1.497",
    benefits: [
      "Estrutura validada de conversão",
      "Design premium responsivo",
      "Integração com checkout",
      "SEO otimizado",
      "Deploy profissional",
      "Suporte inicial 30 dias",
    ],
    image: premiumCardSales,
    checkoutUrl: "https://pay.kirvano.com/pagina-de-vendas",
    badge: "Mais contratado",
  },
  {
    id: "mobile-app",
    title: "Aplicativo Android/iOS",
    description:
      "App nativo ou híbrido com UX impecável, performance otimizada e publicação nas lojas.",
    priceRange: "R$ 1.997 – R$ 4.997",
    benefits: [
      "UI/UX premium",
      "Performance nativa",
      "Push notifications",
      "Integração com APIs",
      "Publicação nas lojas",
      "Suporte inicial 60 dias",
    ],
    image: premiumCardApp,
    checkoutUrl: "https://pay.kirvano.com/aplicativo-mobile",
  },
  {
    id: "web-system",
    title: "Sistema Web Personalizado",
    description:
      "Plataforma web completa com painel administrativo, banco de dados e arquitetura escalável.",
    priceRange: "R$ 2.997 – R$ 8.000",
    benefits: [
      "Arquitetura escalável",
      "Painel administrativo",
      "Banco de dados robusto",
      "API RESTful",
      "Deploy profissional",
      "Suporte inicial 90 dias",
    ],
    image: premiumCardSystem,
    checkoutUrl: "https://pay.kirvano.com/sistema-web",
    badge: "Alta conversão",
  },
  {
    id: "course-platform",
    title: "Plataforma de Cursos",
    description:
      "Sistema completo de ensino online com área de membros, progresso do aluno e certificados.",
    priceRange: "R$ 1.997+",
    benefits: [
      "Área de membros",
      "Player de vídeo premium",
      "Controle de progresso",
      "Certificados automáticos",
      "Integração pagamento",
      "Suporte inicial 60 dias",
    ],
    image: premiumCardCourses,
    checkoutUrl: "https://pay.kirvano.com/plataforma-cursos",
  },
  {
    id: "saas-complete",
    title: "SaaS Completo",
    description:
      "Software como serviço personalizado com multi-tenancy, billing e infraestrutura cloud.",
    priceRange: "Sob consulta",
    benefits: [
      "Multi-tenancy",
      "Sistema de billing",
      "Dashboard analytics",
      "API documentada",
      "Infraestrutura cloud",
      "Suporte dedicado",
    ],
    image: premiumCardSaas,
    checkoutUrl: "https://pay.kirvano.com/saas-completo",
  },
];
