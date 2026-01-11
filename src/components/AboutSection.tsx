import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Users, Clock } from "lucide-react";

const AboutSection = () => {
  const features = [
    {
      icon: Shield,
      title: "Safety First",
      description: "International safety standards with trained staff & safety briefings",
    },
    {
      icon: Users,
      title: "All Ages Welcome",
      description: "Dedicated zones for toddlers, kids, teens, and adults",
    },
    {
      icon: Clock,
      title: "Non-Stop Fun",
      description: "16+ exciting activities to keep you entertained for hours",
    },
  ];

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Decorative Background */}
      <motion.div
        className="absolute top-20 -left-20 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="container-custom relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <motion.span
              className="inline-block text-4xl mb-4"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              🎪
            </motion.span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6">
              About <span className="gradient-text">Take Off</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Welcome to <strong>Take Off Trampoline Park</strong> — Bhopal's premier 
              destination for family fun and adventure! Spread across a massive indoor 
              arena, we offer the perfect blend of excitement, fitness, and safety.
            </p>
            <p className="text-muted-foreground mb-8">
              Whether you're a kid looking to bounce around, a teen seeking thrills, 
              an adult wanting a unique workout, or a corporate team building 
              memories — Take Off has something special for everyone!
            </p>

            {/* Features */}
            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-foreground">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* <Link to="/">
              <Button className="btn-bounce gradient-primary text-primary-foreground shadow-button">
                Learn More About Us
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link> */}
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Main circle */}
              <motion.div
                className="absolute inset-0 gradient-hero rounded-full opacity-20"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              
              {/* Floating icons */}
              <motion.div
                className="absolute top-10 left-10 text-6xl"
                animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                🦘
              </motion.div>
              <motion.div
                className="absolute top-20 right-10 text-5xl"
                animate={{ y: [0, -15, 0], rotate: [0, -10, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
              >
                🎈
              </motion.div>
              <motion.div
                className="absolute bottom-20 left-20 text-5xl"
                animate={{ y: [0, -18, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, delay: 1 }}
              >
                ⭐
              </motion.div>
              <motion.div
                className="absolute bottom-10 right-20 text-6xl"
                animate={{ y: [0, -20, 0], rotate: [0, 15, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.3 }}
              >
                🎪
              </motion.div>
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🎢
              </motion.div>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
