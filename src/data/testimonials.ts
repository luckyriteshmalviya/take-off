export interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  text: string;
  videoUrl?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sunita Malviya",
    role: "Parent",
    avatar: "👩",
    rating: 5,
    text: "My kids absolutely love Take Off! The safety measures are top-notch, and the staff is incredibly helpful. We've celebrated birthday party here also!",
  },
  {
    id: 2,
    name: "Yogesh Rai",
    role: "Corporate Manager",
    avatar: "👨‍💼",
    rating: 5,
    text: "We hosted our team outing here and it was a blast! Great facilities, amazing food, and everyone had an unforgettable time. Highly recommend for corporate events!",
  },
  {
    id: 3,
    name: "Madhuri Walia",
    role: "Fitness Enthusiast",
    avatar: "💪",
    rating: 5,
    text: "Best workout I've ever had while having fun! The variety of activities keeps things exciting. I'll come again definetly",
  },
  {
    id: 4,
    name: "Mayank Choksay",
    role: "Student",
    avatar: "👨‍👧‍👦",
    rating: 5,
    text: "Finding an exciting activity with adventurous experience is tough, but Take Off has something for everyone. From toddler zone to wall climbing - everyone's happy!",
  },
  {
    id: 5,
    name: "Md. Faizan Khan",
    role: "Birthday Party Host",
    avatar: "🎂",
    rating: 5,
    text: "Threw my daughter's 8th birthday party here and it was magical! The party area is beautiful, and the kids are still talking about it weeks later!",
  },
  
];
