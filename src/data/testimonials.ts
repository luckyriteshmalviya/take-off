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
    name: "Priya Sharma",
    role: "Parent",
    avatar: "👩",
    rating: 5,
    text: "My kids absolutely love Take Off! The safety measures are top-notch, and the staff is incredibly helpful. We've celebrated two birthday parties here already!",
  },
  {
    id: 2,
    name: "Rahul Verma",
    role: "Corporate HR Manager",
    avatar: "👨‍💼",
    rating: 5,
    text: "We hosted our team outing here and it was a blast! Great facilities, amazing food, and everyone had an unforgettable time. Highly recommend for corporate events!",
  },
  {
    id: 3,
    name: "Anjali Patel",
    role: "Fitness Enthusiast",
    avatar: "💪",
    rating: 5,
    text: "Best workout I've ever had while having fun! The variety of activities keeps things exciting. I come here every weekend now!",
  },
  {
    id: 4,
    name: "Vikram Singh",
    role: "Parent of 3",
    avatar: "👨‍👧‍👦",
    rating: 5,
    text: "Finding an activity all three kids enjoy is tough, but Take Off has something for everyone. From toddler zone to wall climbing - everyone's happy!",
  },
  {
    id: 5,
    name: "Neha Gupta",
    role: "Birthday Party Host",
    avatar: "🎂",
    rating: 5,
    text: "Threw my daughter's 8th birthday party here and it was magical! The party area is beautiful, and the kids are still talking about it weeks later!",
  },
  {
    id: 6,
    name: "Amit Joshi",
    role: "Regular Visitor",
    avatar: "🦸‍♂️",
    rating: 5,
    text: "The foam pit and basketball dunking are my favorites! Great stress buster after a long week. Clean facility and friendly staff make every visit enjoyable.",
  },
];
