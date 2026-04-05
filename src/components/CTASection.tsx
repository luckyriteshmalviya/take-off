import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight } from "lucide-react";

interface CTASectionProps {
  onBookNow?: () => void;
}

const CTASection = ({ onBookNow }: CTASectionProps) => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-hero" />
      
      {/* Floating decorations */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            {["🎈", "⭐", "✨", "🎉", "🎊"][Math.floor(Math.random() * 5)]}
          </motion.div>
        ))}
      </div>

      <div className="container-custom relative text-center text-primary-foreground">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Ready to Jump? 🦘
          </motion.h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Book your adventure today and create memories that'll last a lifetime. 
            Perfect for birthdays, team outings, or just a day of fun!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={onBookNow}
              className="btn-bounce bg-background text-primary hover:bg-background/90 shadow-button text-lg px-8 py-6 font-bold"
            >
              Book Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <a href="tel:9111385771">
              <Button
                size="lg"
                variant="outline"
                className="btn-bounce border-2 border-background text-background text-black hover:bg-background/10 text-lg px-8 py-6"
              >
                <Phone className="mr-2 w-5 h-5" />
                Call Us
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
