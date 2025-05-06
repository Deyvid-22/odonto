export type PlanDetailsProps = {
  maxServices: number;
};

export type PlanProps = {
  BASIC: PlanDetailsProps;
  PROFESSIONAL: PlanDetailsProps;
};

export const PLANS: PlanProps = {
  BASIC: {
    maxServices: 3,
  },
  PROFESSIONAL: {
    maxServices: 5,
  },
};

export const subscriptionPlans = [
  {
    id: "BASIC",
    name: "Basic",
    description: "Perfeito para clinicas menores",
    oldPrice: "R$59,90",
    price: "R$38,90",
    features: [
      `Até ${PLANS["BASIC"].maxServices} serviços`,
      "Agendamentos ilimitados",
      "Suporte",
      "Relatorios",
    ],
  },
  {
    id: "PROFESSIONAL",
    name: "Profissional",
    description: "Ideal para clinicas grandes",
    oldPrice: "R$110,90",
    price: "R$98,90",

    features: [
      `Até ${PLANS["PROFESSIONAL"].maxServices} serviços`,
      "Agendamentos ilimitados",
      "Suporte prioritário",
      "Relatorios avançados",
    ],
  },
];
