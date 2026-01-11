import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const LaunchParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(25)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute bottom-0 w-[2px] h-12 bg-white/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
          }}
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: -window.innerHeight,
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            delay: Math.random() * 2,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-black via-slate-900 to-black">
      
      {/* Take-Off Particles */}
      <LaunchParticles />

      {/* Glow Core */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-accent/20 blur-[120px]"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4">
        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-block mb-6 px-5 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur"
        >
          Bhopal’s Ultimate Trampoline Experience
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight"
        >
          JUMP HIGH <br />
          <span className="text-accent">TAKE OFF</span>
        </motion.h1>

        {/* Divider */}
        <motion.div
          className="mx-auto my-8 h-[3px] w-24 bg-accent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6 }}
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-white/80"
        >
          Experience gravity-defying jumps, wall runs, and adrenaline-packed
          fun at <strong>Take Off Trampoline Park</strong>
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            size="lg"
            className="px-10 py-6 text-lg font-bold bg-accent hover:bg-accent/90"
          >
            Book Your Jump
            <ArrowRight className="ml-2" />
          </Button>

          <Link to="/contact">
            <Button
              size="lg"
              variant="outline"
              className="px-10 py-6 text-lg border-white/30 text-black hover:bg-white/10"
            >
              Contact Us
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Scroll Hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        ↓
      </motion.div>
    </section>
  );
};

export default HeroSection;
