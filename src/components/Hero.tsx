import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import heroImage from "@/assets/hero-trampoline.jpg";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Take-off Trampoline Park - Fun activities and trampolines"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-32 text-center">
        <div className="animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            Jump Into
            <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-bounce-in">
              Unlimited Fun!
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Experience Bhopal's most exciting trampoline park with thrilling activities for all ages at Misrod
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={() => scrollToSection("pricing")}
              className="bg-gradient-to-r from-primary to-secondary hover:shadow-2xl transition-all duration-300 text-lg px-8 py-6 animate-scale-in"
            >
              Book Your Jump - ₹800
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("activities")}
              className="border-2 border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-lg px-8 py-6 animate-scale-in"
            >
              Explore Activities
            </Button>
          </div>
          <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center text-foreground">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
              <span className="font-semibold">5+ Activities</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-secondary rounded-full animate-pulse"></div>
              <span className="font-semibold">Safe & Fun</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-bounce-yellow rounded-full animate-pulse"></div>
              <span className="font-semibold">All Ages Welcome</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={() => scrollToSection("about")}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float"
          aria-label="Scroll down"
        >
          <ChevronDown size={40} className="text-primary" />
        </button>
      </div>
    </section>
  );
};

export default Hero;