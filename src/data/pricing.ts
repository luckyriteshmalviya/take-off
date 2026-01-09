export interface PricingPlan {
  id: number;
  name: string;
  price: string;
  duration: string;
  features: string[];
  popular: boolean;
  cta: string;
  icon: string;
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 1,
    name: "Individual",
    price: "₹800",
    duration: "per person",
    features: [
      "2 hours of unlimited fun",
      "Access to all activities",
      "Free grip socks",
      "Locker access included",
      "Safety briefing",
    ],
    popular: false,
    cta: "Book Now",
    icon: "🎯",
  },
  {
    id: 2,
    name: "Group Package",
    price: "₹650",
    duration: "per person (min 10)",
    features: [
      "2 hours of unlimited fun",
      "Access to all activities",
      "Free grip socks",
      "Reserved group area",
      "Dedicated host",
      "10% food discount",
    ],
    popular: true,
    cta: "Book Group",
    icon: "👥",
  },
  {
    id: 3,
    name: "Corporate",
    price: "Custom",
    duration: "tailored package",
    features: [
      "Half/Full day options",
      "Exclusive access available",
      "Meeting room included",
      "Catering options",
      "Team building activities",
      "Customizable packages",
    ],
    popular: false,
    cta: "Contact Us",
    icon: "🏢",
  },
];
