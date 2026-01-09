export interface Facility {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export const facilities: Facility[] = [
  {
    id: 1,
    title: "Restaurant",
    description: "Delicious snacks and meals to fuel your fun!",
    icon: "🍕",
  },
  {
    id: 2,
    title: "Party Area",
    description: "Decorated spaces for unforgettable celebrations!",
    icon: "🎉",
  },
  {
    id: 3,
    title: "Meeting Room",
    description: "Professional space for corporate gatherings!",
    icon: "👔",
  },
  {
    id: 4,
    title: "Free Parking",
    description: "Ample parking space for all visitors!",
    icon: "🅿️",
  },
  {
    id: 5,
    title: "Birthday Parties",
    description: "Special packages for memorable birthdays!",
    icon: "🎂",
  },
  {
    id: 6,
    title: "Kitty Parties",
    description: "Fun gatherings for groups and friends!",
    icon: "☕",
  },
  {
    id: 7,
    title: "Secure Lockers",
    description: "Safe storage for your belongings!",
    icon: "🔐",
  },
  {
    id: 8,
    title: "Waiting Area",
    description: "Comfortable seating for parents and guardians!",
    icon: "🛋️",
  },
];
